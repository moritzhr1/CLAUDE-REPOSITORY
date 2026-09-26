/*
 * SICHERLUFT Heizsaison-Check (sl-hc-*) – Haus-Check, Set-Empfehlung, Sticky-Leiste, Tracking-Namen.
 * Ergänzt assets/sl-lp.js (Tracking über window.SLLP.track, Angebotslogik dort). Keine externen Libraries.
 * Wird nur von sl-hc-Sections geladen und betrifft damit nur Seiten mit diesen Sections.
 *
 * Tracking (Präfix "sl_" wie im Landingpage-Kit):
 *   quiz_start            erste Antwort im Haus-Check
 *   quiz_step_1 … _4      Frage beantwortet (sl_answer)
 *   quiz_complete         alle vier Fragen beantwortet
 *   quiz_result           Empfehlung (sl_qty = Anzahl Messpunkte)
 *   bundle_1 … bundle_4   Set im Angebot gewählt (sl_source = user | haus_check)
 *   sticky_cta_click      Sticky-Leiste (über data-sl-track, wie im Kit)
 * Buttons wiederverwendeter Sections bekommen die Tracking-Namen dieser Seite (CTA_NAMES, gesucht über
 * den Tracking-Namen der Section): emergency_cta, product_cta, final_cta – als data-sl-track und ID;
 * die Set-Karten im Angebot bekommen ihren Tracking-Namen (bundle_1 … bundle_4) als ID.
 * Die Kit-Sections schreiben Tracking-Namen mit „handleize“ (final_cta → final-cta); normalizeNames()
 * stellt auf dieser Seite die Schreibweise mit Unterstrich wieder her (final_cta, green_light_section,
 * bundle_1 … bundle_4).
 *
 * Empfehlung (siehe sections/sl-hc-quiz.liquid): ein Messpunkt pro relevantem Bereich,
 * mindestens die Zahl aus Frage 2, mindestens die Bereiche aus Frage 3 und 4, höchstens 4.
 * Das Ergebnis bleibt für die Sitzung gespeichert (sessionStorage), damit Angebot, Sticky-Leiste und
 * Schluss-Button nach einem Neuladen dazu passen.
 */
(function () {
  'use strict';
  if (window.SLHC && window.SLHC.initialized) return;

  var SLHC = (window.SLHC = window.SLHC || {});
  SLHC.initialized = true;

  var STORE_KEY = 'sl_hc_haus_check_v1';
  var CTA_NAMES = { emergency: 'emergency_cta', product: 'product_cta', final_cta: 'final_cta' };
  var MAX = 4;
  var result = null;
  var programmatic = false;

  function track(name, detail) {
    if (window.SLLP && typeof window.SLLP.track === 'function') window.SLLP.track(name, detail);
  }

  function save(value) {
    try {
      if (value) window.sessionStorage.setItem(STORE_KEY, JSON.stringify(value));
      else window.sessionStorage.removeItem(STORE_KEY);
    } catch (error) {
      /* Speicher gesperrt (z. B. privater Modus) – die Seite funktioniert trotzdem */
    }
  }

  function load() {
    try {
      var data = JSON.parse(window.sessionStorage.getItem(STORE_KEY) || 'null');
      return data && data.n >= 1 && data.n <= MAX && data.answers ? data : null;
    } catch (error) {
      return null;
    }
  }

  /* ---------- Empfehlung berechnen ---------- */
  var HEAT = {
    gas: { area: 'Gastherme', burns: true },
    kamin: { area: 'Kamin/Ofen', burns: true },
    pellet: { area: 'Heizung', burns: true },
    wp: { area: '', burns: false },
    mix: { area: 'Heizung', burns: true },
  };
  var NUM_WORDS = ['', 'einen', 'zwei', 'drei', 'vier'];

  function areasText(count) {
    if (count === 1) return 'einen Bereich';
    return (NUM_WORDS[count] || String(count)) + ' Bereiche';
  }

  function joinList(items) {
    if (items.length < 2) return items.join('');
    return items.slice(0, -1).join(', ') + ' und ' + items[items.length - 1];
  }

  function recommend(answers) {
    var heat = HEAT[answers.heizung] || HEAT.mix;
    var extras = answers.extras || [];
    var wanted = Math.min(Math.max(parseInt(answers.bereiche, 10) || 1, 1), MAX);
    var areas = [];

    if (answers.getrennt === 'nein') {
      areas.push(heat.burns ? heat.area + ' und Schlafplatz' : 'Wohn- und Schlafbereich');
    } else {
      if (heat.burns) areas.push(heat.area);
      areas.push('Schlafbereich');
      if (answers.getrennt === 'mehrere') areas.push('zweiter Schlafbereich');
    }
    if (extras.indexOf('ofen') > -1 && answers.heizung !== 'kamin') areas.push('Kamin/Ofen');
    if (extras.indexOf('keller') > -1) areas.push('Keller/Heizraum');
    if (extras.indexOf('garage') > -1) areas.push('Garage');
    if (extras.indexOf('schlaf2') > -1 && answers.getrennt !== 'mehrere') areas.push('weiterer Schlafbereich');

    var found = Math.max(areas.length, 1);
    var n = Math.min(Math.max(wanted, found), MAX);
    var why = [];

    if (found > wanted) {
      why.push(
        'Du wolltest ' + areasText(wanted) + ' im Blick behalten. Nach deinen Angaben sind es ' +
          (found > MAX ? 'mehr als vier' : NUM_WORDS[found] || found) + ' getrennte Bereiche: ' + joinList(areas) + '.'
      );
    } else if (answers.bereiche === '4') {
      why.push('Du willst vier oder mehr Bereiche im Blick behalten' + (areas.length ? ', zum Beispiel ' + joinList(areas) : '') + '.');
    } else {
      why.push('Du willst ' + areasText(wanted) + ' im Blick behalten' + (areas.length ? ', zum Beispiel ' + joinList(areas) : '') + '.');
    }
    why.push('Ein Gerät misst dort, wo es steht – deshalb ein Messpunkt pro Bereich.');
    if (n === MAX && (answers.bereiche === '4' || found > MAX)) {
      why.push('Das 4er-Set deckt vier Bereiche ab; für weitere Bereiche lassen sich zusätzliche Geräte ergänzen.');
    }
    if (answers.heizung === 'wp') {
      why.push('Deine Wärmepumpe verbrennt nichts. Kohlenmonoxid entsteht dort, wo etwas verbrannt wird – etwa in Kamin, Ofen, Gasherd oder durch Abgase in der Garage.');
    }

    return { n: n, wanted: wanted, found: found, why: why.join(' '), answers: answers };
  }
  SLHC.recommend = recommend;

  /* ---------- Angebot ---------- */
  function offerRoot() {
    var quiz = document.querySelector('[data-sl-hc-quiz]');
    var selector = quiz && quiz.getAttribute('data-offer');
    var root = null;
    try {
      root = selector ? document.querySelector(selector) : null;
    } catch (error) {
      root = null;
    }
    return root || document.querySelector('[data-sl-offer-section]');
  }

  function offerRadio(n) {
    var root = offerRoot();
    if (!root) return null;
    var radio = root.querySelector('input[data-sl-offer][data-sl-qty="' + n + '"]');
    return radio && !radio.disabled ? radio : null;
  }

  function badgeText() {
    var quiz = document.querySelector('[data-sl-hc-quiz]');
    return (quiz && quiz.getAttribute('data-badge')) || 'Empfehlung aus deinem Haus-Check';
  }

  function markRecommended(radio) {
    document.querySelectorAll('[data-sl-hc-reco]').forEach(function (option) {
      var badge = option.querySelector('.sl-hc-reco-badge');
      if (badge) badge.remove();
      (option.getAttribute('data-sl-hc-reco') || '').split(' ').forEach(function (cls) {
        if (cls) option.classList.remove(cls);
      });
      option.removeAttribute('data-sl-hc-reco');
    });
    if (!radio) return;
    var option = radio.closest('.sl-lp-option');
    if (!option) return;
    var added = ['sl-hc-reco'];
    ['sl-lp-option--highlight', 'sl-lp-option--badge'].forEach(function (cls) {
      if (!option.classList.contains(cls)) added.push(cls);
    });
    added.forEach(function (cls) {
      option.classList.add(cls);
    });
    option.setAttribute('data-sl-hc-reco', added.join(' '));
    var existing = option.querySelector('.sl-lp-option__badge');
    if (existing) existing.hidden = true;
    var badge = document.createElement('p');
    badge.className = 'sl-lp-option__badge sl-hc-reco-badge';
    badge.textContent = badgeText();
    option.insertBefore(badge, option.firstChild);
  }

  /* Wie updateOffer in sl-lp.js, aber ohne Event – für das stille Wiederherstellen nach einem Neuladen */
  function selectSilently(radio) {
    var form = radio.form;
    radio.checked = true;
    if (!form) return;
    var variantInput = form.querySelector('[data-sl-offer-variant]');
    if (variantInput && radio.getAttribute('data-variant-id')) variantInput.value = radio.getAttribute('data-variant-id');
    var label = form.querySelector('[data-sl-offer-label]');
    if (label && radio.getAttribute('data-sl-cta-label')) label.textContent = radio.getAttribute('data-sl-cta-label');
    var summary = form.querySelector('[data-sl-offer-summary]');
    if (summary) {
      summary.textContent = (radio.getAttribute('data-sl-option-title') || '') + ' · ' + (radio.getAttribute('data-sl-price') || '');
    }
    form.querySelectorAll('.sl-lp-option').forEach(function (option) {
      option.classList.toggle('is-selected', option.contains(radio));
    });
    var submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = radio.disabled;
  }

  function applyRecommendation(n, silent) {
    var radio = offerRadio(n);
    if (!radio) return null;
    if (!radio.checked) {
      if (silent) {
        selectSilently(radio);
      } else {
        programmatic = true;
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        programmatic = false;
      }
    }
    markRecommended(radio);
    return radio;
  }

  function offerInfo(n) {
    var radio = offerRadio(n);
    if (!radio) return null;
    var option = radio.closest('.sl-lp-option');
    var saving = option && option.querySelector('.sl-lp-option__save');
    var unit = option && option.querySelector('.sl-lp-option__unit');
    return {
      title: radio.getAttribute('data-sl-option-title') || '',
      price: radio.getAttribute('data-sl-price') || '',
      deal: [saving && saving.textContent.trim(), unit && unit.textContent.trim()].filter(Boolean).join(' · '),
    };
  }

  document.addEventListener('change', function (event) {
    var radio = event.target;
    if (!radio.matches || !radio.matches('input[data-sl-offer]')) return;
    var qty = Number(radio.getAttribute('data-sl-qty'));
    if (!qty) return;
    track('bundle_' + qty, {
      sl_offer: radio.getAttribute('data-sl-offer'),
      sl_qty: qty,
      sl_price: radio.getAttribute('data-sl-price'),
      sl_source: programmatic ? 'haus_check' : 'user',
    });
  });

  /* ---------- Sticky-Leiste und Schluss-Button ---------- */
  function quizData(name) {
    var quiz = document.querySelector('[data-sl-hc-quiz]');
    return (quiz && quiz.getAttribute('data-' + name)) || '';
  }

  function offerHref() {
    return quizData('offer') || '#angebot';
  }

  function updateSticky() {
    var sticky = document.querySelector('[data-sl-hc-sticky]');
    if (!sticky) return;
    var text = sticky.querySelector('[data-sl-hc-sticky-text]');
    var cta = sticky.querySelector('[data-sl-hc-sticky-cta]');
    if (!text || !cta) return;
    if (!sticky.hasAttribute('data-orig')) {
      sticky.setAttribute('data-orig', '1');
      text.setAttribute('data-orig-html', text.innerHTML);
      cta.setAttribute('data-orig-label', cta.textContent.trim());
      cta.setAttribute('data-orig-href', cta.getAttribute('href') || '');
    }
    var info = result ? offerInfo(result.n) : null;
    if (result && info) {
      text.innerHTML = '';
      var prefix = document.createElement('span');
      prefix.textContent = quizData('sticky-after-prefix') || 'Empfohlen:';
      var strong = document.createElement('strong');
      strong.textContent = info.title + ' · ' + info.price;
      text.appendChild(prefix);
      text.appendChild(document.createTextNode(' '));
      text.appendChild(strong);
      var label = quizData('sticky-after-label') || 'Jetzt absichern';
      cta.textContent = label;
      cta.setAttribute('data-sl-label', label);
      cta.setAttribute('href', offerHref());
      sticky.classList.add('sl-hc-sticky--result');
    } else {
      text.innerHTML = text.getAttribute('data-orig-html');
      cta.textContent = cta.getAttribute('data-orig-label');
      cta.setAttribute('data-sl-label', cta.getAttribute('data-orig-label'));
      cta.setAttribute('href', cta.getAttribute('data-orig-href'));
      sticky.classList.remove('sl-hc-sticky--result');
    }
  }

  function finalCta() {
    return document.querySelector('[data-sl-section="final_cta"] a.sl-lp-cta');
  }

  function updateFinalCta() {
    var link = finalCta();
    if (!link) return;
    var span = link.querySelector('span') || link;
    if (!link.hasAttribute('data-orig-label')) {
      link.setAttribute('data-orig-label', span.textContent.trim());
      link.setAttribute('data-orig-href', link.getAttribute('href') || '');
    }
    var after = quizData('final-after');
    if (result && after) {
      span.textContent = after;
      link.setAttribute('data-sl-label', after);
      link.setAttribute('href', offerHref());
    } else {
      span.textContent = link.getAttribute('data-orig-label');
      link.setAttribute('data-sl-label', link.getAttribute('data-orig-label'));
      link.setAttribute('href', link.getAttribute('data-orig-href'));
    }
  }

  function setResult(value, silent) {
    result = value;
    save(value ? { n: value.n, answers: value.answers } : null);
    if (value) applyRecommendation(value.n, silent);
    else markRecommended(null);
    updateSticky();
    updateFinalCta();
  }

  document.addEventListener('click', function (event) {
    if (!result) return;
    var link = event.target.closest('[data-sl-hc-sticky-cta], [data-sl-hc-apply], [data-sl-section="final_cta"] a.sl-lp-cta');
    if (link) applyRecommendation(result.n, false);
  });

  function initSticky() {
    var sticky = document.querySelector('[data-sl-hc-sticky]');
    if (!sticky || !('IntersectionObserver' in window)) return;
    var watched = [
      document.querySelector('.sl-hc-article'),
      document.querySelector('[data-sl-hc-quiz]'),
      offerRoot(),
      document.querySelector('.shopify-section-group-footer-group') || document.querySelector('footer'),
    ].filter(Boolean);
    var visible = new Map();
    var mobile = window.matchMedia('(max-width: 989px)');

    function render() {
      var blocked = false;
      visible.forEach(function (isVisible) {
        if (isVisible) blocked = true;
      });
      sticky.hidden = !(mobile.matches && !blocked);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible.set(entry.target, entry.isIntersecting);
      });
      render();
    });
    watched.forEach(function (el) {
      visible.set(el, el === watched[0]);
      observer.observe(el);
    });
    if (mobile.addEventListener) mobile.addEventListener('change', render);
    render();
  }

  /* ---------- Haus-Check ---------- */
  function initQuiz(root) {
    if (!root || root.hasAttribute('data-sl-hc-ready')) return;
    root.setAttribute('data-sl-hc-ready', '');
    root.classList.add('is-ready');

    var form = root.querySelector('[data-sl-hc-form]');
    var steps = Array.prototype.slice.call(root.querySelectorAll('.sl-hc-quiz__step'));
    var nav = root.querySelector('[data-sl-hc-nav]');
    var next = root.querySelector('[data-sl-hc-next]');
    var nextText = root.querySelector('[data-sl-hc-next-text]');
    var back = root.querySelector('[data-sl-hc-back]');
    var count = root.querySelector('[data-sl-hc-count]');
    var bar = root.querySelector('[data-sl-hc-bar]');
    var box = root.querySelector('[data-sl-hc-result]');
    var total = steps.length;
    var current = 1;
    var started = false;
    var pointerPick = false;
    var advanceTimer = null;
    if (!form || !total) return;

    function stepEl(k) {
      return steps[k - 1];
    }

    function valueOf(k) {
      var step = stepEl(k);
      var checked = step ? step.querySelectorAll('input:checked') : [];
      if (step && step.hasAttribute('data-multi')) {
        return Array.prototype.map.call(checked, function (input) {
          return input.value;
        });
      }
      return checked.length ? checked[0].value : '';
    }

    function answers() {
      return { heizung: valueOf(1), bereiche: valueOf(2), getrennt: valueOf(3), extras: valueOf(4) };
    }

    function hasValue(k) {
      var v = valueOf(k);
      return Array.isArray(v) ? v.length > 0 : v !== '';
    }

    function progress(k, done) {
      if (count) count.textContent = done ? 'Ergebnis' : k + ' / ' + total;
      if (bar) bar.style.width = (done ? 100 : (k / total) * 100) + '%';
    }

    function syncChecks() {
      root.querySelectorAll('.sl-hc-opt').forEach(function (opt) {
        var input = opt.querySelector('input');
        opt.classList.toggle('is-checked', !!(input && input.checked));
      });
    }

    function show(k, focus) {
      current = k;
      steps.forEach(function (step, i) {
        var active = i + 1 === k;
        step.classList.toggle('is-active', active);
        step.hidden = !active;
      });
      if (box) box.hidden = true;
      if (nav) nav.hidden = false;
      if (back) back.hidden = k === 1;
      if (nextText) {
        nextText.textContent = k === total ? next.getAttribute('data-label-finish') : next.getAttribute('data-label-next');
      }
      next.disabled = !hasValue(k);
      progress(k, false);
      if (focus && stepEl(k)) stepEl(k).focus({ preventScroll: true });
    }

    function renderResult(value) {
      steps.forEach(function (step) {
        step.classList.remove('is-active');
        step.hidden = true;
      });
      if (nav) nav.hidden = true;
      progress(total, true);
      if (!box) return;
      var nEl = box.querySelector('[data-sl-hc-n]');
      if (nEl) nEl.textContent = value.n + (value.n === 1 ? ' Messpunkt' : ' Messpunkte');
      var why = box.querySelector('[data-sl-hc-why]');
      if (why) why.textContent = value.why;
      var pick = box.querySelector('[data-sl-hc-pick]');
      var info = offerInfo(value.n);
      if (pick) {
        pick.hidden = !info;
        if (info) {
          pick.querySelector('[data-sl-hc-pick-name]').textContent = info.title + ' · ' + info.price;
          pick.querySelector('[data-sl-hc-pick-deal]').textContent = info.deal;
        }
      }
      box.hidden = false;
    }

    function complete(k) {
      var v = valueOf(k);
      track('quiz_step_' + k, { sl_step: k, sl_answer: Array.isArray(v) ? v.join(',') : v, sl_section: root.getAttribute('data-sl-section') });
    }

    function finish() {
      var value = recommend(answers());
      track('quiz_complete', { sl_section: root.getAttribute('data-sl-section') });
      track('quiz_result', {
        sl_qty: value.n,
        sl_areas: value.found,
        sl_wanted: value.wanted,
        sl_heating: value.answers.heizung,
        sl_section: root.getAttribute('data-sl-section'),
      });
      setResult(value, false);
      renderResult(value);
      if (box) box.focus({ preventScroll: true });
    }

    function advance() {
      window.clearTimeout(advanceTimer);
      if (!hasValue(current)) return;
      complete(current);
      if (current < total) show(current + 1, true);
      else finish();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    form.addEventListener('pointerdown', function (event) {
      pointerPick = !!event.target.closest('.sl-hc-opt');
    });
    form.addEventListener('keydown', function () {
      pointerPick = false;
    });

    form.addEventListener('change', function (event) {
      var input = event.target;
      if (!input.matches || !input.matches('.sl-hc-opt__input')) return;
      if (!started) {
        started = true;
        track('quiz_start', { sl_section: root.getAttribute('data-sl-section') });
      }
      if (input.type === 'checkbox' && input.checked) {
        var group = input.closest('.sl-hc-quiz__step');
        group.querySelectorAll('input[type="checkbox"]').forEach(function (other) {
          if (other === input) return;
          if (input.hasAttribute('data-exclusive') || other.hasAttribute('data-exclusive')) other.checked = false;
        });
      }
      syncChecks();
      next.disabled = !hasValue(current);
      if (input.type === 'radio' && pointerPick) {
        window.clearTimeout(advanceTimer);
        advanceTimer = window.setTimeout(advance, 280);
      }
      pointerPick = false;
    });

    next.addEventListener('click', advance);
    if (back) {
      back.addEventListener('click', function () {
        window.clearTimeout(advanceTimer);
        if (current > 1) show(current - 1, true);
      });
    }
    var restart = root.querySelector('[data-sl-hc-restart]');
    if (restart) {
      restart.addEventListener('click', function () {
        form.reset();
        syncChecks();
        setResult(null);
        show(1, true);
      });
    }

    steps.forEach(function (step, i) {
      step.hidden = i !== 0;
    });

    var saved = load();
    if (saved) {
      Object.keys(saved.answers).forEach(function (name) {
        var values = [].concat(saved.answers[name]);
        form.querySelectorAll('input[name="' + name + '"]').forEach(function (input) {
          input.checked = values.indexOf(input.value) > -1;
        });
      });
      syncChecks();
      var value = recommend(saved.answers);
      setResult(value, true);
      renderResult(value);
    } else {
      show(1, false);
    }
  }

  /* ---------- Überschriften satzweise umbrechen (wie im Briefing, ohne <br> in inline_richtext) ---------- */
  var SENTENCE_LINES = ['[data-sl-section="emergency"] h2', '[data-sl-section="final_cta"] h2'];

  function splitSentences() {
    SENTENCE_LINES.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (heading) {
        if (heading.hasAttribute('data-sl-hc-lines') || heading.children.length) return;
        var text = heading.textContent.trim();
        var parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
        parts = parts.map(function (part) {
          return part.trim();
        }).filter(Boolean);
        if (parts.length < 2) return;
        heading.setAttribute('data-sl-hc-lines', '');
        heading.textContent = '';
        parts.forEach(function (part, i) {
          if (i) heading.appendChild(document.createTextNode(' '));
          var line = document.createElement('span');
          line.className = 'sl-hc-line';
          line.textContent = part;
          heading.appendChild(line);
        });
      });
    });
  }

  /* ---------- Tracking-Namen der wiederverwendeten Sections ---------- */
  function normalizeNames() {
    ['data-sl-section', 'data-sl-view', 'data-sl-offer', 'data-sl-select-offer'].forEach(function (attr) {
      document.querySelectorAll('[' + attr + '*="-"]').forEach(function (el) {
        el.setAttribute(attr, el.getAttribute(attr).replace(/-/g, '_'));
      });
    });
  }

  function renameTracking() {
    Object.keys(CTA_NAMES).forEach(function (section) {
      var link = document.querySelector('[data-sl-section="' + section + '"] a.sl-lp-cta');
      if (!link) return;
      link.setAttribute('data-sl-track', CTA_NAMES[section]);
      if (!document.getElementById(CTA_NAMES[section])) link.id = CTA_NAMES[section];
    });
    /* Set-Karten bekommen ihren Tracking-Namen als ID (bundle_1 … bundle_4) */
    document.querySelectorAll('input[data-sl-offer]').forEach(function (radio) {
      var option = radio.closest('.sl-lp-option');
      var name = radio.getAttribute('data-sl-offer');
      if (option && name && !option.id && !document.getElementById(name)) option.id = name;
    });
  }

  function init() {
    normalizeNames();
    renameTracking();
    splitSentences();
    document.querySelectorAll('[data-sl-hc-quiz]').forEach(initQuiz);
    updateSticky();
    updateFinalCta();
    initSticky();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function () {
    normalizeNames();
    renameTracking();
    splitSentences();
    document.querySelectorAll('[data-sl-hc-quiz]').forEach(initQuiz);
    if (result) applyRecommendation(result.n, true);
    updateSticky();
    updateFinalCta();
  });
})();
