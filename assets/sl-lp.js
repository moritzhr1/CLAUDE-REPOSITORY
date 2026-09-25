/*
 * SICHERLUFT Landingpage-Kit (sl-lp-*) – Interaktion & Tracking-Vorbereitung.
 * Keine externen Libraries. Wird von jeder sl-lp-Section eingebunden und initialisiert sich nur einmal.
 *
 * Tracking-Events (Name jeweils mit Präfix "sl_"):
 *   hero_cta_click, hero_trust_click, alert_cta_click, alert_more_click, cta_box_click,
 *   cta_box_more_click, contrast_cta_click, steps_cta_click, product_cta_click, placement_cta_click,
 *   proof_link_click, card_link_click, source_link_click, set_select, offer_cta_click, add_to_cart,
 *   price_mismatch, sticky_cta_click, faq_open, lead_submit, lead_success, video_play, video_complete,
 *   section_view
 *
 * price_mismatch: Nach dem Hinzufügen vergleicht die Seite den Zeilenpreis im Warenkorb mit dem
 * angezeigten Angebotspreis (data-sl-price-cents). Weicht er ab – z. B. weil der Kaching-Deal geändert
 * wurde –, wird das Event gesendet (sl_expected / sl_cart in Cent). Der Kunde sieht davon nichts.
 *
 * A/B-Test Hero-Button: ?sl_cta=b oder ?sl_cta=c in der Anzeigen-URL (siehe sections/sl-lp-hero.liquid).
 * Die aktive Variante (a/b/c) steht in jedem Event als sl_variant.
 *
 * Jedes Event wird ausgegeben an:
 *   1. window.dataLayer            → Google Tag Manager / GA4   ({ event: 'sl_<name>', ... })
 *   2. Shopify.analytics.publish   → Shopify Kundenereignisse / Custom Pixel (z. B. Meta, GA4)
 *   3. document 'sl:track'          → CustomEvent für eigene Skripte
 * Debug: window.SLLP.debug = true  (oder ?sl_debug=1) schreibt alle Events in die Konsole.
 */
(function () {
  if (window.SLLP && window.SLLP.initialized) return;

  var SLLP = (window.SLLP = window.SLLP || {});
  SLLP.initialized = true;
  SLLP.version = '1.2.0';
  SLLP.debug = SLLP.debug || /[?&]sl_debug=1/.test(window.location.search);

  function pageName() {
    var el = document.querySelector('[data-sl-page]');
    return (el && el.getAttribute('data-sl-page')) || window.location.pathname;
  }

  function variant() {
    return document.documentElement.getAttribute('data-sl-variant') || 'a';
  }

  function track(name, detail) {
    var payload = Object.assign({ sl_event: name, sl_page: pageName(), sl_variant: variant() }, detail || {});
    Object.keys(payload).forEach(function (key) {
      if (payload[key] === undefined || payload[key] === '') delete payload[key];
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: 'sl_' + name }, payload));

    try {
      if (window.Shopify && window.Shopify.analytics && typeof window.Shopify.analytics.publish === 'function') {
        window.Shopify.analytics.publish('sl_' + name, payload);
      }
    } catch (error) {
      /* Tracking darf die Seite nie blockieren */
    }

    document.dispatchEvent(new CustomEvent('sl:track', { detail: payload }));
    if (SLLP.debug) console.info('[SICHERLUFT]', 'sl_' + name, payload);
  }
  SLLP.track = track;

  function sectionOf(el) {
    var section = el.closest('[data-sl-section]');
    return section ? section.getAttribute('data-sl-section') : undefined;
  }

  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }

  /* ---------- Klicks auf markierte Elemente ---------- */
  document.addEventListener('click', function (event) {
    var el = event.target.closest('[data-sl-track]');
    if (!el || el.tagName === 'BUTTON' && el.type === 'submit') return;
    track(el.getAttribute('data-sl-track'), {
      sl_id: el.id || undefined,
      sl_label: el.getAttribute('data-sl-label') || clean(el.textContent),
      sl_section: sectionOf(el),
      sl_href: el.getAttribute('href') || undefined,
    });
  });

  /* ---------- FAQ ---------- */
  document.addEventListener(
    'toggle',
    function (event) {
      var details = event.target;
      if (!details.matches || !details.matches('details[data-sl-faq]') || !details.open) return;
      track('faq_open', {
        sl_id: details.id,
        sl_faq: details.getAttribute('data-sl-faq'),
        sl_label: clean(details.querySelector('summary') && details.querySelector('summary').textContent),
        sl_section: sectionOf(details),
      });
    },
    true
  );

  /* ---------- Angebot: Auswahl, Button-Text, Variante ---------- */
  function updateOffer(radio) {
    var form = radio.form;
    if (!form) return;
    var variantInput = form.querySelector('[data-sl-offer-variant]');
    if (variantInput && radio.getAttribute('data-variant-id')) {
      variantInput.value = radio.getAttribute('data-variant-id');
    }
    var label = form.querySelector('[data-sl-offer-label]');
    if (label && radio.getAttribute('data-sl-cta-label')) {
      label.textContent = radio.getAttribute('data-sl-cta-label');
    }
    var summary = form.querySelector('[data-sl-offer-summary]');
    if (summary) {
      summary.textContent =
        (radio.getAttribute('data-sl-option-title') || '') + ' · ' + (radio.getAttribute('data-sl-price') || '');
    }
    form.querySelectorAll('.sl-lp-option').forEach(function (option) {
      option.classList.toggle('is-selected', option.contains(radio));
    });
    var submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = radio.disabled;
  }

  function selectedOffer(form) {
    return form ? form.querySelector('input[data-sl-offer]:checked') : null;
  }

  /* Buttons mit data-sl-select-offer="<Tracking-ID>" wählen das Angebot aus (Sprung per href) */
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-sl-select-offer]');
    if (!trigger) return;
    var id = trigger.getAttribute('data-sl-select-offer');
    var radios = document.querySelectorAll('input[data-sl-offer]');
    for (var i = 0; i < radios.length; i++) {
      var radio = radios[i];
      if (radio.getAttribute('data-sl-offer') !== id || radio.disabled) continue;
      if (!radio.checked) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      break;
    }
  });

  document.addEventListener('change', function (event) {
    var radio = event.target;
    if (!radio.matches || !radio.matches('input[data-sl-offer]')) return;
    updateOffer(radio);
    track('set_select', {
      sl_offer: radio.getAttribute('data-sl-offer'),
      sl_qty: Number(radio.getAttribute('data-sl-qty')) || undefined,
      sl_price: radio.getAttribute('data-sl-price'),
      sl_section: sectionOf(radio),
    });
  });

  /* ---------- Formulare: Angebot und Lead ---------- */
  document.addEventListener(
    'submit',
    function (event) {
      var form = event.target;
      if (!form || !form.closest) return;

      if (form.closest('[data-sl-offer-form]')) {
        var offer = selectedOffer(form);
        var submit = form.querySelector('button[type="submit"]');
        track('offer_cta_click', {
          sl_id: submit ? submit.id : undefined,
          sl_offer: offer ? offer.getAttribute('data-sl-offer') : undefined,
          sl_qty: offer ? Number(offer.getAttribute('data-sl-qty')) : undefined,
          sl_price: offer ? offer.getAttribute('data-sl-price') : undefined,
          sl_section: sectionOf(form),
        });
      }

      if (form.matches('[data-sl-lead-form]')) {
        track('lead_submit', { sl_id: form.id, sl_section: sectionOf(form) });
      }
    },
    true
  );

  /* Erfolgreich in den Warenkorb gelegt (Event des Theme-Warenkorbs, siehe assets/pubsub.js) */
  function listenForCart() {
    if (typeof window.subscribe !== 'function') return;
    /* PUB_SUB_EVENTS ist im Theme als top-level const deklariert (kein window-Property) */
    var cartUpdate = typeof PUB_SUB_EVENTS !== 'undefined' ? PUB_SUB_EVENTS.cartUpdate : 'cart-update';
    window.subscribe(cartUpdate, function (event) {
      if (!event || event.source !== 'product-form') return;
      var forms = document.querySelectorAll('[data-sl-offer-form] form');
      forms.forEach(function (form) {
        var variantInput = form.querySelector('[data-sl-offer-variant]');
        if (!variantInput || String(variantInput.value) !== String(event.productVariantId)) return;
        var offer = selectedOffer(form);
        track('add_to_cart', {
          sl_offer: offer ? offer.getAttribute('data-sl-offer') : undefined,
          sl_qty: offer ? Number(offer.getAttribute('data-sl-qty')) : undefined,
          sl_variant_id: String(event.productVariantId),
          sl_section: sectionOf(form),
        });
        checkCartPrice(form, offer);
      });
    });
  }

  /* Angezeigter Preis = Preis im Warenkorb? Nur prüfen, wenn die Warenkorbzeile genau die gewählte Menge hat. */
  function checkCartPrice(form, offer) {
    if (!offer || !window.fetch) return;
    var expected = Number(offer.getAttribute('data-sl-price-cents'));
    var qty = Number(offer.getAttribute('data-sl-qty'));
    var variantId = String(offer.getAttribute('data-variant-id'));
    if (!expected || !qty) return;
    var bundleInput = form.querySelector('input[name="properties[__kaching_bundles]"]');
    var bundle = bundleInput ? bundleInput.value : null;
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    fetch(root + 'cart.js', { headers: { Accept: 'application/json' } })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (cart) {
        if (!cart || !cart.items) return;
        var line = null;
        cart.items.forEach(function (item) {
          if (line || String(item.variant_id) !== variantId) return;
          var itemBundle = item.properties ? item.properties.__kaching_bundles : undefined;
          if ((bundle || null) === (itemBundle || null)) line = item;
        });
        if (!line || line.quantity !== qty || line.final_line_price === expected) return;
        track('price_mismatch', {
          sl_offer: offer.getAttribute('data-sl-offer'),
          sl_qty: qty,
          sl_expected: expected,
          sl_cart: line.final_line_price,
          sl_section: sectionOf(form),
        });
      })
      .catch(function () {
        /* Prüfung ist optional */
      });
  }

  /* ---------- Video ---------- */
  document.addEventListener(
    'play',
    function (event) {
      var wrapper = event.target.closest && event.target.closest('[data-sl-video]');
      if (!wrapper || event.target.dataset.slPlayed) return;
      event.target.dataset.slPlayed = '1';
      track('video_play', { sl_video: wrapper.getAttribute('data-sl-video'), sl_section: sectionOf(wrapper) });
    },
    true
  );

  document.addEventListener(
    'ended',
    function (event) {
      var wrapper = event.target.closest && event.target.closest('[data-sl-video]');
      if (!wrapper) return;
      track('video_complete', { sl_video: wrapper.getAttribute('data-sl-video'), sl_section: sectionOf(wrapper) });
    },
    true
  );

  /* YouTube/Vimeo erst nach Klick laden */
  document.addEventListener('click', function (event) {
    var facade = event.target.closest('[data-sl-video-embed]');
    if (!facade) return;
    var wrapper = facade.closest('[data-sl-video]');
    var iframe = document.createElement('iframe');
    iframe.src = facade.getAttribute('data-sl-video-embed');
    iframe.title = facade.getAttribute('data-sl-video-title') || 'Video';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    facade.replaceWith(iframe);
    track('video_play', {
      sl_video: wrapper ? wrapper.getAttribute('data-sl-video') : undefined,
      sl_section: wrapper ? sectionOf(wrapper) : undefined,
      sl_player: 'embed',
    });
  });

  /* ---------- Sichtbarkeit der Sections (einmal pro Section) ---------- */
  function observeSections() {
    if (!('IntersectionObserver' in window)) return;
    var seen = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var name = entry.target.getAttribute('data-sl-view');
          observer.unobserve(entry.target);
          if (seen[name]) return;
          seen[name] = true;
          track('section_view', { sl_section: name });
        });
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll('[data-sl-view]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Mobile Sticky-Leiste ---------- */
  /* Sichtbar nach dem Hero; ausgeblendet, solange Angebot oder Seitenfuß im Bild sind (verdeckt keine Links). */
  function initSticky() {
    var sticky = document.querySelector('[data-sl-sticky]');
    if (!sticky || !('IntersectionObserver' in window)) return;
    var hero = document.querySelector('.sl-lp-hero');
    var offer = sticky.closest('[data-sl-offer-section]');
    var footer = document.querySelector('.shopify-section-group-footer-group, footer');
    var heroVisible = !!hero;
    var offerVisible = false;
    var footerVisible = false;
    var mobile = window.matchMedia('(max-width: 989px)');

    function render() {
      var show = mobile.matches && !heroVisible && !offerVisible && !footerVisible;
      sticky.hidden = !show;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === offer) offerVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      });
      render();
    });
    if (hero) observer.observe(hero);
    if (offer) observer.observe(offer);
    if (footer) observer.observe(footer);
    if (mobile.addEventListener) mobile.addEventListener('change', render);
    render();
  }

  /* ---------- Theme-Editor: Übersicht über live ausgeblendete Inhalte ---------- */
  function initDevBar() {
    if (!(window.Shopify && window.Shopify.designMode)) return;
    var bar = document.querySelector('.sl-lp-devbar');
    var count = document.querySelectorAll('.sl-lp [data-sl-unverified]').length;
    if (!count) {
      if (bar) bar.remove();
      return;
    }
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'sl-lp-devbar';
      bar.setAttribute('role', 'status');
      bar.innerHTML = '<span data-sl-devbar-text></span><button type="button" data-sl-devbar-toggle></button>';
      document.body.appendChild(bar);
      bar.querySelector('[data-sl-devbar-toggle]').addEventListener('click', function () {
        document.documentElement.classList.toggle('sl-lp-simulate-live');
        initDevBar();
      });
    }
    var simulating = document.documentElement.classList.contains('sl-lp-simulate-live');
    bar.querySelector('[data-sl-devbar-text]').textContent =
      count + ' Inhalt' + (count === 1 ? '' : 'e') + ' live ausgeblendet (Claim/Link fehlt)';
    bar.querySelector('[data-sl-devbar-toggle]').textContent = simulating ? 'Alles zeigen' : 'Live-Ansicht';
  }

  function init() {
    document.querySelectorAll('input[data-sl-offer]:checked').forEach(updateOffer);
    observeSections();
    initSticky();
    listenForCart();
    initDevBar();
    if (document.querySelector('[data-sl-lead-success]')) {
      track('lead_success', { sl_section: sectionOf(document.querySelector('[data-sl-lead-success]')) });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function () {
    document.querySelectorAll('input[data-sl-offer]:checked').forEach(updateOffer);
    initDevBar();
  });
  document.addEventListener('shopify:section:unload', function () {
    window.setTimeout(initDevBar, 0);
  });
})();
