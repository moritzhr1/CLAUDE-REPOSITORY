// Automated checks for the Goldschild Private static site.
// Serves ../site like Cloudflare Pages (applies _headers incl. CSP, serves
// /company -> company.html, 404.html for unknown paths), then uses Playwright to
// check links, images, favicons, the mailto link, layout widths and focus styles.
//
// Usage: node tools/check_site.mjs [screenshot-dir]
//        SITE_DIR=/path/to/unzipped node tools/check_site.mjs   (test another copy)
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(process.env.SITE_DIR || join(here, '..', 'site'));
const SHOTS = process.argv[2] ? resolve(process.argv[2]) : null;
const EMAIL = 'contact@goldschildprivate.com';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
};

// Parse the "/*" block of _headers.
const globalHeaders = {};
{
  const lines = (await readFile(join(SITE, '_headers'), 'utf8')).split('\n');
  let inBlock = false;
  for (const line of lines) {
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) { inBlock = line.trim() === '/*'; continue; }
    if (inBlock) {
      const i = line.indexOf(':');
      globalHeaders[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
}

async function exists(p) { try { return (await stat(p)).isFile(); } catch { return false; } }

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = decodeURIComponent(url.pathname);
  let file = join(SITE, p);
  if (p.endsWith('/')) file = join(file, 'index.html');
  else if (!extname(p) && await exists(file + '.html')) file += '.html';
  let status = 200;
  if (!file.startsWith(SITE) || !(await exists(file)) || p.startsWith('/_headers')) {
    file = join(SITE, '404.html'); status = 404;
  }
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', ...globalHeaders });
  res.end(await readFile(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const failures = [];
const fail = (msg) => { failures.push(msg); console.log('  FAIL ' + msg); };
const ok = (msg) => console.log('  ok   ' + msg);

const browser = await chromium.launch();
if (SHOTS) await mkdir(SHOTS, { recursive: true });

const PAGES = ['/index.html', '/company.html', '/contact.html'];
const titles = new Set(), descriptions = new Set();
const internalTargets = new Set();

// ---------- Per-page content checks ----------
for (const path of PAGES) {
  console.log(`\n${path}`);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push('request failed ' + r.url()));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  const resp = await page.goto(BASE + path, { waitUntil: 'load' });
  resp.status() === 200 ? ok('status 200') : fail(`${path} status ${resp.status()}`);
  await page.waitForTimeout(200);
  errors.length ? fail(`${path} console/network errors: ${errors.join(' | ')}`) : ok('no console, CSP or network errors');

  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content || '',
    lang: document.documentElement.lang,
    h1: document.querySelectorAll('h1').length,
    imgs: [...document.images].map(i => ({ src: i.currentSrc || i.src, alt: i.getAttribute('alt'), ok: i.complete && i.naturalWidth > 0 })),
    links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
    mailtos: [...document.querySelectorAll('a[href^="mailto:"]')].map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() })),
    icons: [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')].map(l => l.href),
    css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href),
    scripts: document.scripts.length,
    current: [...document.querySelectorAll('.site-nav a[aria-current="page"]')].map(a => a.textContent.trim()),
    footerName: document.querySelector('.footer__name')?.textContent.trim(),
    bodyText: document.body.innerText,
  }));
  info.title && !titles.has(info.title) ? ok(`title: ${info.title}`) : fail(`${path} missing/duplicate title`);
  titles.add(info.title);
  info.desc.length > 50 && !descriptions.has(info.desc) ? ok(`meta description (${info.desc.length} chars)`) : fail(`${path} missing/duplicate description`);
  descriptions.add(info.desc);
  info.lang === 'en' ? ok('lang=en') : fail(`${path} lang`);
  info.h1 === 1 ? ok('exactly one h1') : fail(`${path} has ${info.h1} h1`);
  info.scripts === 0 ? ok('no JavaScript') : fail(`${path} has ${info.scripts} scripts`);
  info.current.length === 1 ? ok(`nav marks current page: ${info.current[0]}`) : fail(`${path} aria-current count ${info.current.length}`);
  info.footerName === 'GOLDSCHILD PRIVATE LLC' ? ok('footer name exact: GOLDSCHILD PRIVATE LLC') : fail(`${path} footer name "${info.footerName}"`);
  for (const img of info.imgs) {
    img.ok ? ok(`image loaded ${img.src.replace(BASE, '')}`) : fail(`${path} image not loaded ${img.src}`);
    if (img.alt === null) fail(`${path} image without alt ${img.src}`);
  }
  for (const m of info.mailtos) {
    m.href === `mailto:${EMAIL}` && m.text === EMAIL ? ok(`mailto link "${m.text}"`) : fail(`${path} bad mailto ${m.href} "${m.text}"`);
  }
  if (!info.mailtos.length) fail(`${path} has no mailto link`);
  for (const href of info.links) {
    if (/^(https?:|mailto:)/.test(href)) continue;
    internalTargets.add(new URL(href, BASE + path).pathname);
  }
  for (const u of [...info.icons, ...info.css]) internalTargets.add(new URL(u).pathname);
  for (const word of ['GOLDSCHILD', 'PRIVATE']) {
    if (!info.bodyText.includes(word)) fail(`${path} wordmark text ${word} missing`);
  }
  // Wording guard: no tax ID, no shop calls-to-action, no office claims, no pre-launch wording.
  // (The company page mentions banking/investment only to say it offers neither.)
  const banned = [/\bEIN\b/, /\bour office\b/i, /\bshop now\b/i, /\bbuy now\b/i, /\badd to cart\b/i,
    /prepar/i, /not yet/i, /\bwill be\b/i, /\blaunch/i];
  if (path !== '/company.html') banned.push(/\bbank\b/i, /\bwealth\b/i, /\binvest/i);
  for (const bad of banned) if (bad.test(info.bodyText)) fail(`${path} contains ${bad}`);
  await ctx.close();
}

// ---------- Internal link / asset targets ----------
console.log('\nInternal links, favicons and stylesheets');
for (const p of [...internalTargets].sort()) {
  const r = await fetch(BASE + p);
  const type = r.headers.get('content-type');
  r.status === 200 ? ok(`${p} -> 200 ${type}`) : fail(`${p} -> ${r.status}`);
}
for (const p of ['/favicon.ico', '/', '/company', '/contact']) {
  const r = await fetch(BASE + p);
  r.status === 200 ? ok(`${p} -> 200 ${r.headers.get('content-type')}`) : fail(`${p} -> ${r.status}`);
}
{
  const r = await fetch(BASE + '/does-not-exist');
  const t = await r.text();
  r.status === 404 && t.includes('Page not found') ? ok('/does-not-exist -> 404 page') : fail('404 handling');
}

// ---------- 404 page renders with absolute asset paths ----------
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/deep/missing')) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  await page.goto(BASE + '/deep/missing/page');
  const imgs = await page.evaluate(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
  const styled = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  imgs && styled === 'rgb(250, 248, 243)' && !errors.length ? ok('nested 404 page loads CSS and images') : fail(`nested 404: imgs=${imgs} bg=${styled} ${errors.join('|')}`);
  await ctx.close();
}

// ---------- Responsive layout ----------
console.log('\nLayout');
const WIDTHS = [320, 375, 414, 768, 1024, 1440, 1920];
for (const path of PAGES) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + path);
    const m = await page.evaluate(() => {
      const words = [...document.querySelectorAll('.wordmark__word')].map(e => e.getBoundingClientRect());
      const shield = document.querySelector('.wordmark__shield').getBoundingClientRect();
      const mark = document.querySelector('.wordmark').getBoundingClientRect();
      return {
        scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth,
        words: words.map(r => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })),
        shield: { l: shield.left, r: shield.right },
        mark: { l: mark.left, r: mark.right },
        fontSize: parseFloat(getComputedStyle(document.querySelector('.wordmark__word')).fontSize),
      };
    });
    const problems = [];
    if (m.scroll > m.client) problems.push(`horizontal overflow ${m.scroll}>${m.client}`);
    const [a, b] = m.words;
    if (a.l < 0 || b.r > m.client) problems.push('wordmark outside viewport');
    if (!(a.r <= m.shield.l && m.shield.r <= b.l)) problems.push('wordmark order/overlap wrong');
    if (Math.abs(a.t - b.t) > 1) problems.push('wordmark wraps');
    const centre = (m.mark.l + m.mark.r) / 2;
    if (Math.abs(centre - m.client / 2) > 2) problems.push(`wordmark off-centre by ${(centre - m.client / 2).toFixed(1)}px`);
    problems.length ? fail(`${path} @${width}: ${problems.join(', ')}`)
      : ok(`${path} @${width}px: no overflow; wordmark ${Math.round(m.mark.r - m.mark.l)}px wide, ${m.fontSize}px type, margins ${Math.round(m.mark.l)}px`);
    if (SHOTS && (width === 375 || width === 1440)) {
      await page.screenshot({ path: join(SHOTS, `${path.slice(1, -5)}-${width}.png`), fullPage: true });
    }
    await ctx.close();
  }
}

// ---------- Keyboard focus ----------
console.log('\nKeyboard focus');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/contact.html');
  const seen = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return { tag: el.tagName, text: (el.getAttribute('aria-label') || el.textContent).trim().replace(/\s+/g, ' ').slice(0, 40),
        outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2, visible: el.getBoundingClientRect().width > 0 };
    });
    seen.push(f);
    if (SHOTS && i === 0) await page.screenshot({ path: join(SHOTS, 'focus-skip-link.png'), clip: { x: 0, y: 0, width: 1280, height: 200 } });
    if (SHOTS && i === 3) await page.screenshot({ path: join(SHOTS, 'focus-nav.png'), clip: { x: 0, y: 0, width: 1280, height: 220 } });
  }
  for (const f of seen) {
    if (f.tag === 'BODY') continue; // focus has left the page for the browser UI
    f.outline && f.visible ? ok(`focus visible on ${f.tag} "${f.text}"`) : fail(`no visible focus on ${f.tag} "${f.text}"`);
  }
  await ctx.close();
}

await browser.close();
server.close();
console.log(failures.length ? `\n${failures.length} FAILURE(S)` : '\nALL CHECKS PASSED');
process.exit(failures.length ? 1 : 0);
