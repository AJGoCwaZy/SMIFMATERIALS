/* ================================================================
   SMIF MATERIALS PITCH · deck runtime
   Fill the PITCH block once: company, ticker, price, target and the
   three reasons appear everywhere they are used. Each slide's data
   lives in DATA (widgets.js); a dataset marked sample:true shows a
   gold SAMPLE tag until the team replaces it.
   Keys: arrows / space move · N notes under the slide · P notes in their own window · G all slides · T team plan
         B build mode · S pitch timer · 0 reset timer · F full screen
   ================================================================ */
window.PITCH = {
  company: 'Linde plc',
  short: 'Linde',         // used inside sentences and chart labels
  ticker: 'LIN',
  exchange: 'NYSE',
  rating: null,           // 'BUY' or 'SELL'
  price: null,            // current share price, number
  target: null,           // price target, number
  growth: null,           // our expected free cash flow growth a year, e.g. '9%'
  horizon: '3+ years',
  position: null,         // e.g. '3% of the Materials sleeve'
  date: null,             // e.g. 'December 3, 2026'
  logo: 'vendor/logos/linde.png', // the Linde logo: a file in vendor/logos/ (built into the deck), a data URI or an image URL; null shows a placeholder
  orgLogo: null,          // our logo for white backgrounds (footers), e.g. vendor/logos/smif-club.png in quotes; until set, a serif FIU SMIF wordmark shows
  orgLogoLight: null,     // the white version for the brown band on the cover and closing slide, e.g. vendor/logos/smif-club-white.png in quotes
  /* the three reasons. tag: 2-3 words for the tracker chips. h: one-line headline.
     assume / see / worth: "market assumes, we see, worth $ per share".
     expect / signal / sell: the scorecard on the closing slide. go: the slide that proves it. */
  pillars: [
    { tag: null, h: null, assume: null, see: null, worth: null, expect: null, signal: null, sell: null, go: 'cmix' },
    { tag: null, h: null, assume: null, see: null, worth: null, expect: null, signal: null, sell: null, go: 'backlog' },
    { tag: null, h: null, assume: null, see: null, worth: null, expect: null, signal: null, sell: null, go: 'bridge' }
  ]
};

/* who owns what: names, roles, colours used in the team plan */
window.OWNERS = {
  G: { n: 'Gabriel Castillo', s: 'Gabriel', r: 'Co-lead · macro, the question, valuation', c: '#A57C61' },
  A: { n: 'Aaron', s: 'Aaron', r: 'Competition, durability, pre-mortem', c: '#2B5780', last: null },
  D: { n: 'Daniel Vazquez', s: 'Daniel', r: 'Products, customers, end markets', c: '#2E7D4F' },
  R: { n: 'Ryan Hernandez', s: 'Ryan', r: 'Next markets, market size, backlog', c: '#7B5EA7' },
  X: { n: 'Alexander Jovanovic', s: 'Alexander', r: 'Co-lead · profitability, cash flow bridge, coordination', c: '#B23A2E' },
  T: { n: 'Whole team', s: 'Team', r: 'Everyone', c: '#595959' }
};

/* the build plan: owner (o), seconds in the timed run (t), which of the three reasons the slide supports (r),
   what the slide must prove, and where the inputs come from. r is a first draft: change it when the reasons are written. */
window.PLAN = {
  cover: { o: 'G', t: 15, prove: 'Who we are and what we pitch, in fifteen seconds.', pull: 'Presentation date and Aaron’s last name for the team list. Company and ticker are set to Linde plc (NYSE: LIN).' },
  call: { o: 'G', t: 30, r: [1, 2, 3], prove: 'The rating, target, upside and the three reasons, before any detail.', pull: 'Price: Bloomberg GP. Target: the weighted value from the bear/base/bull slide. Reasons: one per pillar in "market assumes / we see / worth" form, plus a 2-3 word tag each.' },
  question: { o: 'G', t: 30, r: [1, 2, 3], prove: 'The one question the pitch answers, and the gap between what the price needs and what we expect. This is the hook: it turns the pitch into an argument.', pull: 'Our expected growth from Gabriel’s model (PITCH.growth). The other tiles are live from Bloomberg data already in the deck.' },
  macro: { o: 'G', t: 30, prove: 'The one or two macro forces that matter for this company and which way they push. Thirty seconds.', pull: 'ECST, GP on USGG10YR and DXY, NAPMPMI (ISM manufacturing), EIA industrial power prices.' },
  stab: { o: 'A', t: 30, r: [1], prove: 'Why this sub-industry inside Materials: its earnings hold up through cycles.', pull: 'Source register #1 and #2 (already loaded). Optional: FA EPS history for other Materials sub-industries.' },
  make: { o: 'A', t: 35, r: [1], prove: 'How the product is made (power is the cost that matters), then the three supply modes, their contract lengths and why density is a local moat. Two steps on one slide.', pull: 'Industrial Gases Primer and the Air Separation explainer for wording. Source register #1 (loaded). Company 10-K: sales by supply mode.' },
  moat: { o: 'A', t: 35, r: [1], prove: 'Why Linde wins against Air Products and Air Liquide, on the five measures that matter.', pull: 'Linde raw values are filled from the Bloomberg pull (Oct 8). Peers: FA and RV on APD US and AI FP, backlogs from their earnings releases.' },
  buyers: { o: 'D', t: 30, r: [1], prove: 'Who the customers are, and why gas is essential to them but a small share of their costs.', pull: 'Company 10-K end-market descriptions.' },
  snap: { o: 'D', t: 30, prove: 'Size, valuation and balance sheet at a glance.', pull: 'Filled from the Bloomberg FA pull (Oct 8, 2026). Refresh with FA and GP the week of the pitch.' },
  endm: { o: 'D', t: 30, r: [2], prove: 'Sales by end market, defensive vs cyclical, and which markets are growing.', pull: 'Mix is filled from register #7. Pull growth by end market from Linde’s Q3 2026 earnings slides (out late October).' },
  fcast: { o: 'D', t: 40, r: [2], prove: 'Our three-year view of each end market, and what it adds up to for Linde’s sales growth. The result feeds the cash flow bridge.', pull: 'One indicator per market (ACC chemical output, ISM, CMS home-oxygen rates, worldsteel, SEMI fab spending), management end-market commentary on calls, EE consensus revenue growth to compare against.' },
  cmix: { o: 'D', t: 25, r: [1], prove: 'How much revenue sits under long contracts, by supply mode, and how concentrated the customers are.', pull: 'Supply-mode mix is filled from Bloomberg FA segments (2025). Still needed: customer concentration from the 10-K.' },
  next: { o: 'R', t: 35, r: [2], prove: 'The new industries that run on gas (AI, quantum, robotics, bioengineering, space, clean energy), how each uses it, and which ones we would actually play.', pull: 'Source register #3 (helium), #4 (space, gas use per wafer), #6 (hydrogen caution), #7 (APD project exits). Company disclosures on electronics, space and healthcare.' },
  tam: { o: 'R', t: 45, r: [2], prove: 'For each theme: the headline market, the gas slice, the share we can serve, our revenue today. The advisor asked for this.', pull: 'Register #4, #5, #6. BI deep dives. Company electronics and space disclosures.' },
  backlog: { o: 'R', t: 35, r: [2], prove: 'Growth already signed: backlog size, start-up timing, end-market mix.', pull: 'Earnings releases (sale-of-gas backlog), call transcripts. Settle the $10B vs $8.1B definition first.' },
  money: { o: 'X', t: 25, r: [3], prove: 'How cash comes in, how energy costs pass through, and why new plants consume cash first.', pull: 'Nothing new: it sets up the next four slides.' },
  pass: { o: 'X', t: 30, r: [1], prove: 'Contract protections and their limits: pass-through keeps profit dollars, not the margin %.', pull: 'Earnings release sales bridge (price, volume, cost pass-through, FX). Energy cost as % of sales.' },
  marg: { o: 'X', t: 25, r: [3], prove: 'Linde’s margin and return trend vs the Materials sector (and Air Products once pulled), and what drives it.', pull: 'Filled from the Bloomberg pull: Linde vs the S&P 500 Materials sector. Add Air Products with FA on APD US.' },
  capex: { o: 'X', t: 30, r: [3], prove: 'Capex and financing needs: the plant J-curve and where Linde’s cash goes.', pull: 'CF (operating cash flow, capex, dividends, buybacks), capex guidance, DDIS (debt maturities).' },
  bridge: { o: 'X', t: 45, r: [3], prove: 'Everything before it, added up: free cash flow per share from 2025 to 2029 by driver, against the growth the price needs. The end-market driver comes from Daniel’s forecast.', pull: 'Model drivers: backlog start-up revenue, margin and productivity, capex plan (guidance), buybacks (CF: 2025 buybacks were about 2% of market cap).' },
  premortem: { o: 'A', t: 45, r: [1, 2, 3], prove: 'The three most plausible ways we lose money, the first warning sign of each, and the combined odds. Shows the committee we stress-tested our own idea.', pull: 'Alexander’s downside-risk work, call transcript Q&A, BI, register #3 and #6. Costs per share from the bear case.' },
  implied: { o: 'G', t: 35, r: [3], prove: 'What today’s price already assumes vs what we expect.', pull: 'Model FCF, WACC <GO>, EE consensus growth.' },
  surface: { o: 'G', t: 30, r: [3], prove: 'Value per share across discount rates and long-run growth: how robust the upside is.', pull: 'Model DCF (FCF path, net debt, share count), WACC <GO>.' },
  scen: { o: 'G', t: 40, r: [3], prove: 'Bear, base and bull values with probabilities; the weighted target vs other methods.', pull: 'Model, RV comps, ANR analyst targets, GP 52-week range.' },
  close: { o: 'G', t: 30, r: [1, 2, 3], prove: 'The call, then a scorecard: for each reason what we expect, the signal and its date, and when we would sell.', pull: 'Nothing new: it reuses the reasons, the catalyst dates and the pre-mortem tripwires.' },
  qa: { o: 'T', t: 10, prove: 'Whoever owns the slide answers the question.', pull: 'The slides themselves.' },
};

/* ---------------- shared helpers ---------------- */
(function(){
'use strict';
const RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const NS = 'http://www.w3.org/2000/svg';
function S(tag, a, p){ const e = document.createElementNS(NS, tag); if (a) for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
function T(tag, a, text, p){ const e = S(tag, a, p); e.textContent = text; return e; }
function H(tag, a, html, p){ const e = document.createElement(tag); if (a) for (const k in a){ if (k === 'class') e.className = a[k]; else e.setAttribute(k, a[k]); } if (html != null) e.innerHTML = html; if (p) p.appendChild(e); return e; }
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const lin = (d0, d1, r0, r1) => v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const MINUS = '−';
const usd = (v, d) => (v < 0 ? MINUS : '') + '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: d || 0, maximumFractionDigits: d || 0});
const sg = (v, d, suf) => (v > 0 ? '+' : v < 0 ? MINUS : '') + Math.abs(v).toFixed(d || 0) + (suf || '');
const pct = (v, d) => (v < 0 ? MINUS : '') + Math.abs(v).toFixed(d == null ? 1 : d) + '%';
const mmss = s => { s = Math.round(Math.abs(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function clear(el){ while (el.firstChild) el.removeChild(el.firstChild); }
/* a value or a gold placeholder */
const F = (v, label) => (v == null || v === '') ? '<span class="fill">[' + esc(label) + ']</span>' : esc(v);
function tween(from, to, ms, step, done){
  if (RM || ms <= 0){ step(to); if (done) done(); return; }
  const t0 = performance.now();
  (function f(now){ const k = Math.min(1, (now - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; step(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); else if (done) done(); })(t0);
}
function rng(id, cb, fmt){
  const e = document.getElementById(id), o = document.getElementById(id + 'o');
  const upd = () => { const p = (e.value - e.min) / (e.max - e.min) * 100; e.style.setProperty('--p', p + '%'); if (o && fmt) o.textContent = fmt(+e.value); if (cb) cb(+e.value); };
  e.addEventListener('input', upd);
  const p = (e.value - e.min) / (e.max - e.min) * 100; e.style.setProperty('--p', p + '%'); if (o && fmt) o.textContent = fmt(+e.value);
  return { el: e, get v(){ return +e.value; }, set(v){ e.value = v; upd(); } };
}
function pick(btns, attr, on){ btns.forEach(b => b.addEventListener('click', () => { btns.forEach(x => x.classList.toggle('on', x === b)); on(b.getAttribute(attr), b); })); }
function showTip(sl, ev, html){
  let t = sl.querySelector(':scope > .tip'); if (!t) t = H('div', {class: 'tip'}, '', sl);
  const r = sl.getBoundingClientRect(), s = r.width / 1600;
  t.innerHTML = html;
  t.style.left = clamp((ev.clientX - r.left) / s, 160, 1440) + 'px';
  t.style.top = Math.max(70, (ev.clientY - r.top) / s) + 'px';
  t.classList.add('show');
}
function hideTip(sl){ const t = sl.querySelector(':scope > .tip'); if (t) t.classList.remove('show'); }
function hov(el, sl, fn){ el.style.cursor = 'pointer'; el.addEventListener('pointermove', e => showTip(sl, e, fn())); el.addEventListener('pointerleave', () => hideTip(sl)); }
function gridY(g, x0, x1, y, ticks, fmt){ const gg = S('g', {class: 'grid'}, g); ticks.forEach(t => { S('line', {x1: x0, x2: x1, y1: y(t), y2: y(t)}, gg); T('text', {x: x0 - 10, y: y(t) + 5, 'text-anchor': 'end', class: 'ax'}, fmt(t), gg); }); }
const C = { navy: '#6B432B', rule: '#8E5939', steel: '#A57C61', light: '#C9B3A3', sky: '#EDDDD3', tint: '#F7F4EF', soft: '#F4EFE7', ink: '#1A1A1A', grey: '#595959', line: '#DDD6CE', white: '#FFFFFF', gold: '#2B5780', goldt: '#EEF2F7', good: '#2E7D4F', bad: '#B23A2E' };
/* mark a card's sample tag as replaced when its dataset is real */
function samp(sl, sample, sel){ const el = sel ? $(sel, sl) : $('.samp', sl); if (el) el.classList.toggle('hidden', sample === false); }
const INIT = {};
const A = { RM, $, $$, S, T, H, esc, lin, clamp, usd, sg, pct, mmss, clear, F, tween, rng, pick, showTip, hideTip, hov, gridY, C, samp, INIT };
window.__A = A;

/* notes panel styles, shared by the docked panel and the pop-out window */
function NCSS(fs, hs){
  return '.ncol{display:flex;flex-direction:column;gap:8px;min-width:0;overflow:auto;font-size:' + fs + '}.ncol.now{flex:1.5}.ncol.nxt{flex:1;opacity:.4;border-left:1px solid rgba(233,220,210,.22);padding-left:26px;transition:opacity .2s}.ncol.nxt:hover{opacity:.85}' +
    '.nh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:4px 14px;font:600 ' + hs + 'px/1.25 "Arial",Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#C9B3A3;margin-bottom:4px}.nh .nw{letter-spacing:.06em;text-transform:none;white-space:nowrap;display:flex;align-items:center;gap:8px}.nh .nw i{width:10px;height:10px;border-radius:50%;display:inline-block}' +
    '.nclock{margin-left:10px;letter-spacing:0;text-transform:none;color:#fff}.nclock .late{color:#FFB547}.nclock .early{color:#8FD6A8}.nclock em{font-style:normal;color:#C9B3A3}' +
    '.nrs{display:flex;flex-direction:column;gap:.42em}.nr{display:grid;grid-template-columns:4.7em 1fr;gap:.75em;align-items:start;font-size:1em}.ncol.nxt .nr{font-size:.86em}' +
    '.nt{font:700 .6em/1 "Arial",Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-align:center;padding:.6em 0;border-radius:3px;color:#1F1A17;margin-top:.15em}' +
    '.nt.t-cover{background:#FFFFFF}.nt.t-room{background:#8FD6A8}.nt.t-say{background:#FFFFFF}.nt.t-do{background:#C9B3A3}.nt.t-key{background:#8FD6A8}.nt.t-crowd{background:#F4A6C8}.nt.t-pass{background:#C9A27E}' +
    '.nx{font:500 1em/1.36 "Arial",Arial,sans-serif;color:#FFFFFF}.nr.t-key .nx{font-weight:700}.nx b{color:#FFFFFF}.nf{font-style:normal;color:#F6C77A}';
}

/* ---------------- deck core ---------------- */
const KL = { company: 'Company', ticker: 'TICKER', exchange: 'Exchange', rating: 'BUY', price: '$ price', target: '$ target', upside: 'x%', growth: 'x% a year', horizon: 'Horizon', position: 'x% of sleeve', date: 'Date' };
function kval(k){
  const P = window.PITCH;
  if (k === 'upside') return (P.price && P.target) ? sg((P.target / P.price - 1) * 100, 1) + '%' : null;
  if (k === 'price' || k === 'target') return P[k] != null ? usd(P[k], 2) : null;
  return P[k];
}
A.kval = kval;
function bindK(root){ $$('[data-k]', root).forEach(el => { const v = kval(el.dataset.k); if (v == null || v === '') el.innerHTML = '<span class="fill">[' + KL[el.dataset.k] + ']</span>'; else el.textContent = v; }); }

function boot(){
  const root = document.documentElement, stage = $('#stage');
  const slides = $$('#stage > section.slide'), N = slides.length;
  const ids = slides.map(s => s.dataset.id);
  A.idx = id => ids.indexOf(id);
  const meta = i => window.PLAN[ids[i]] || { o: 'T', t: 0, prove: '', pull: '' };
  A.meta = meta;
  // sections
  const SECS = [];
  slides.forEach((s, i) => { if (s.dataset.sec || !SECS.length) SECS.push({n: s.dataset.sec || 'Open', a: i + 1, b: i + 1}); else SECS[SECS.length - 1].b = i + 1; });
  A.SECS = SECS;
  // planned clock: seconds from the start of the pitch at which each slide begins
  const START = [], MAIN = [];
  { let acc = 0; slides.forEach((s, i) => { START[i] = acc; const t = meta(i).t || 0; MAIN[i] = t > 0; acc += t; }); A.TOTAL = acc; }
  A.START = START;
  bindK(document);
  // company logo: every [data-logo] slot, plus a small one in the footer of the company slides
  A.logo = cls => window.PITCH.logo ? '<img src="' + esc(window.PITCH.logo) + '" alt="' + esc(window.PITCH.short || window.PITCH.company) + ' logo" class="' + (cls || '') + '">' : '<span class="fill">[' + esc(window.PITCH.short || 'Company') + ' logo]</span>';
  $$('[data-logo]').forEach(el => { el.innerHTML = A.logo(); });
  // our own wordmark: footers, cover and closing band. Text until PITCH.orgLogo is set.
  A.org = light => { const P = window.PITCH, u = light ? (P.orgLogoLight || P.orgLogo) : P.orgLogo; return u ? '<img src="' + esc(u) + '" alt="FIU SMIF">' : 'FIU SMIF'; };
  $$('[data-orglogo]').forEach(el => { el.innerHTML = A.org(el.dataset.orglogo === 'light'); });
  $$('[data-owner]').forEach(el => { const m = window.PLAN[el.dataset.owner]; const o = m && window.OWNERS[m.o]; el.textContent = o ? o.n : ''; });
  const titles = [], notes = [];
  slides.forEach((s, i) => {
    const h = s.querySelector('h2');
    titles[i] = s.dataset.title || (h ? h.textContent : 'Slide ' + (i + 1));
    const nt = s.querySelector('.notes');
    notes[i] = !nt ? [] : $$('p[data-t]', nt).length ? $$('p[data-t]', nt).map(p => ({ t: p.dataset.t, h: p.innerHTML.trim() })) : (nt.textContent.trim() ? [{ t: 'say', h: esc(nt.textContent.trim()) }] : []);
    const slot = H('div', {class: 'slot', id: 'slot' + (i + 1)});
    s.parentNode.insertBefore(slot, s);
    const rh = H('div', {class: 'rhead'}); rh.textContent = (i + 1) + '. ' + titles[i];
    slot.appendChild(s); stage.insertBefore(rh, slot);
    if (s.classList.contains('content')){
      let f = s.querySelector('.sfoot'); if (!f) f = H('footer', {class: 'sfoot'}, '<span class="src"></span>', s);
      f.insertBefore(H('span', {class: 'pno num'}, String(i + 1)), f.firstChild);
      if (window.PITCH.logo && i >= ids.indexOf('buyers') && ids.indexOf('buyers') >= 0) H('span', {class: 'flogo'}, A.logo(), f);
      H('span', {class: 'brand'}, A.org(), f);
      if (nt) s.appendChild(nt);
    }
    const m = meta(i), o = window.OWNERS[m.o];
    H('div', {class: 'otag'}, esc(o.s) + (m.t ? ' · ' + mmss(m.t) : ' · backup'), s);
    if (m.r && m.r.length && s.classList.contains('content')) trk(s, m.r);
    s.setAttribute('aria-label', 'Slide ' + (i + 1) + ': ' + titles[i]);
  });
  A.titles = titles;
  // reason tracker: which of the three reasons this slide supports
  function trk(s, r){
    const P = window.PITCH.pillars, t = H('div', {class: 'rtrk', 'aria-label': 'Supports reason ' + r.join(', ')}, '<span class="rl">Reason</span>', s);
    P.forEach((p, k) => { const on = r.indexOf(k + 1) >= 0; const c = H('button', {type: 'button', class: 'rc' + (on ? ' on' : ''), title: (p.h || 'Reason ' + (k + 1)) + (p.go ? ' · evidence on slide ' + (ids.indexOf(p.go) + 1) : '')}, '<b>' + (k + 1) + '</b>' + (p.tag ? '<span>' + esc(p.tag) + '</span>' : ''), t); c.addEventListener('click', () => { const g = ids.indexOf(p.go); if (g >= 0) A.jump(g); }); });
  }

  // chrome
  const chrome = H('div', {id: 'chrome'}, null, document.body);
  const prog = H('div', {id: 'prog'}, null, chrome);
  const segs = SECS.map(sc => {
    const seg = H('div', {class: 'seg', title: sc.n}, '<i></i><span class="lbl">' + esc(sc.n) + '</span>', prog);
    seg.style.flex = String(sc.n === 'Backup' ? 3 : sc.b - sc.a + 1);
    seg.addEventListener('click', () => go(sc.a - 1));
    return seg;
  });
  const nav = H('div', {id: 'nav', role: 'toolbar', 'aria-label': 'Slide controls'}, null, chrome);
  const bPrev = H('button', {type: 'button', 'aria-label': 'Previous slide'}, '‹ Prev', nav);
  const cnt = H('span', {class: 'cnt'}, '', nav);
  const bNext = H('button', {type: 'button', 'aria-label': 'Next slide'}, 'Next ›', nav);
  const clock = H('span', {class: 'clock', 'aria-live': 'off'}, '', nav);
  const bTimer = H('button', {type: 'button', 'aria-pressed': 'false', title: 'Start or pause the 15-minute pitch timer'}, 'Timer · S', nav);
  const bReset = H('button', {type: 'button', title: 'Reset the timer', 'aria-label': 'Reset the timer'}, '↺', nav);
  const bNotes = H('button', {type: 'button', 'aria-pressed': 'false', title: 'Speaker notes under the slide: this slide on the left, the next one faded on the right'}, 'Notes · N', nav);
  const bPop = H('button', {type: 'button', title: 'Open the notes in their own window, for a second screen'}, 'Notes window · P', nav);
  const bGrid = H('button', {type: 'button'}, 'Slides · G', nav);
  const bPlan = H('button', {type: 'button'}, 'Team plan · T', nav);
  const bBuild = H('button', {type: 'button', 'aria-pressed': 'false'}, 'Build · B', nav);
  const bFs = H('button', {type: 'button'}, 'Full screen · F', nav);
  H('style', null, NCSS('clamp(15px, 1.22vw, 21px)', 13), document.head);
  const drawer = H('div', {id: 'notesd', 'aria-live': 'polite', 'aria-label': 'Speaker notes'}, null, document.body);
  const grid = H('div', {id: 'grid', role: 'dialog', 'aria-label': 'All slides'}, null, document.body); grid.hidden = true;
  H('h3', null, 'All slides · press G or Esc to close', grid);
  const gbtns = [];
  SECS.forEach(sc => {
    H('div', {class: 'gsec'}, esc(sc.n), grid);
    const gl = H('div', {class: 'gl'}, null, grid);
    for (let k = sc.a; k <= sc.b; k++){ const b = H('button', {type: 'button'}, '<b>' + k + '</b><span></span>', gl); b.lastChild.textContent = titles[k - 1]; b.addEventListener('click', () => { grid.hidden = true; go(k - 1); }); gbtns[k - 1] = b; }
  });
  const brief = H('aside', {id: 'brief', 'aria-label': 'Slide brief'}, '<header><span>Slide brief · build mode</span><button type="button" aria-label="Minimise brief">–</button></header><div class="bb"></div>', document.body);
  $('header', brief).addEventListener('click', () => brief.classList.toggle('min'));
  const plan = buildPlan();

  bPrev.onclick = () => adv(-1); bNext.onclick = () => adv(1);
  bNotes.onclick = () => setNotes(!root.classList.contains('notes-on'));
  bPop.onclick = popOut;
  bGrid.onclick = () => toggle(grid);
  bPlan.onclick = () => toggle(plan);
  bBuild.onclick = () => setBuild(!root.classList.contains('build'));
  bFs.onclick = toggleFs; bTimer.onclick = toggleTimer; bReset.onclick = resetTimer;
  let hideT = null;
  function poke(){ chrome.classList.add('show'); clearTimeout(hideT); hideT = setTimeout(() => chrome.classList.remove('show'), 2600); }
  document.addEventListener('mousemove', poke, {passive: true});
  poke();

  function toggle(ov){ const open = ov.hidden; grid.hidden = true; plan.hidden = true; ov.hidden = !open; if (open){ const c = ov.querySelector('.cur') || ov.querySelector('button'); if (c) { try { c.focus({preventScroll: false}); } catch (e) {} } } }

  // build mode
  function setBuild(on){
    root.classList.toggle('build', on); bBuild.setAttribute('aria-pressed', String(on));
    try { localStorage.setItem('smifBuild', on ? '1' : '0'); } catch (e) {}
    $$('.fill[data-f]').forEach(f => { if (on) f.title = 'Fill ID ' + f.dataset.f + ' (row in the fill sheet)'; else f.removeAttribute('title'); });
    paintBrief();
  }
  function counts(sl){ return { fills: $$('.fill', sl).length, samples: $$('.samp:not(.src-ok):not(.hidden)', sl).length }; }
  A.counts = counts;
  function paintBrief(){
    if (cur < 0) return;
    const m = meta(cur), o = window.OWNERS[m.o], c = counts(slides[cur]);
    const when = m.t ? mmss(START[cur]) + ' to ' + mmss(START[cur] + m.t) + ' of ' + mmss(A.TOTAL) : 'Backup, not in the timed run';
    $('.bb', brief).innerHTML =
      '<div><h5>Owner</h5><div class="ow">' + esc(o.n) + '</div><p>' + esc(o.r) + '</p></div>' +
      '<div><h5>Time</h5><p>' + (m.t ? mmss(m.t) + ' · plays ' + when : when) + '</p></div>' +
      (m.r && m.r.length ? '<div><h5>Supports</h5><p>' + m.r.map(k => { const p = window.PITCH.pillars[k - 1]; return 'Reason ' + k + (p && p.tag ? ' (' + esc(p.tag) + ')' : ''); }).join(', ') + '</p></div>' : '') +
      (m.prove ? '<div><h5>This slide must prove</h5><p>' + esc(m.prove) + '</p></div>' : '') +
      (m.pull ? '<div><h5>Pull and sources</h5><p>' + esc(m.pull) + '</p></div>' : '') +
      '<div><h5>Left to fill</h5><p style="margin:0 0 6px">Hover a dashed box for its fill ID: that is its row in the team fill sheet.</p><div class="st"><span>' + c.fills + ' placeholder' + (c.fills === 1 ? '' : 's') + '</span><span>' + c.samples + ' sample dataset' + (c.samples === 1 ? '' : 's') + '</span>' + (!c.fills && !c.samples ? '<span style="background:#2E7D4F">Ready</span>' : '') + '</div></div>';
  }

  // team plan overlay: the table of contents for delegating the work
  function buildPlan(){
    const ov = H('div', {id: 'plan', role: 'dialog', 'aria-label': 'Team plan'}, null, document.body); ov.hidden = true;
    const mainN = slides.filter((s, i) => MAIN[i]).length;
    const top = H('div', {class: 'ptop'}, null, ov);
    const tl = H('div', null, '<h3>Team plan · table of contents</h3><p>' + mainN + ' slides in a ' + mmss(A.TOTAL) + ' main run, leaving ' + mmss(900 - A.TOTAL) + ' of the 15 minutes as buffer, plus ' + (N - mainN) + ' backup slides. Click an owner to filter, click a row to open the slide. Press T or Esc to close.</p>', top);
    const btns = H('div', {class: 'pbtns'}, null, top);
    const bCopy = H('button', {type: 'button'}, 'Copy plan as text', btns);
    const bClose = H('button', {type: 'button'}, 'Close', btns);
    const msg = H('span', {class: 'copied'}, '', btns);
    bClose.onclick = () => { ov.hidden = true; };
    const ow = H('div', {class: 'owners'}, null, ov);
    let filt = null;
    const ocards = Object.keys(window.OWNERS).map(k => {
      const o = window.OWNERS[k];
      const secs = slides.reduce((a, s, i) => a + (meta(i).o === k ? (meta(i).t || 0) : 0), 0);
      const nS = slides.filter((s, i) => meta(i).o === k).length;
      const b = H('button', {type: 'button', class: 'own'}, '<span class="ochip" style="background:' + o.c + ';align-self:flex-start">' + esc(o.s) + '</span><b>' + esc(o.n) + '</b><span>' + esc(o.r) + '</span><span class="m">' + mmss(secs) + '</span><span>' + nS + ' slide' + (nS === 1 ? '' : 's') + ' · speaking time</span>', ow);
      b.addEventListener('click', () => { filt = filt === k ? null : k; ocards.forEach(x => x.b.classList.toggle('on', x.k === filt)); rows.forEach(r => { r.tr.hidden = !!filt && r.o !== filt; }); secRows.forEach(r => { r.hidden = !!filt && !rows.some(x => x.sec === r && !x.tr.hidden); }); });
      return { k, b };
    });
    const tw = H('div', {class: 'ptw'}, null, ov);
    const tb = H('table', null, '<thead><tr><th>#</th><th>Slide</th><th>Owner</th><th>Time</th><th>Plays at</th><th>Must prove</th><th>Pull and sources</th><th>Left to fill</th></tr></thead>', tw);
    const body = H('tbody', null, null, tb);
    const rows = [], secRows = [];
    let curSec = null;
    slides.forEach((s, i) => {
      if (s.dataset.sec || i === 0){ const sc = SECS.find(x => x.a === i + 1); const secSecs = slides.reduce((a, s2, j) => a + (j + 1 >= sc.a && j + 1 <= sc.b ? (meta(j).t || 0) : 0), 0); curSec = H('tr', {class: 'sec'}, '<td colspan="8">' + esc(sc.n) + (secSecs ? ' · ' + mmss(secSecs) : '') + '</td>', body); secRows.push(curSec); }
      const m = meta(i), o = window.OWNERS[m.o];
      const tr = H('tr', {class: 'sl'}, null, body);
      tr.innerHTML = '<td class="no">' + (i + 1) + '</td><td class="ti"></td><td class="ow"><span class="ochip" style="background:' + o.c + '">' + esc(o.s) + '</span></td><td class="tm">' + (m.t ? mmss(m.t) : '–') + '</td><td class="tm">' + (m.t ? mmss(START[i]) : 'backup') + '</td><td></td><td class="pu"></td><td class="lf"></td>';
      tr.children[1].textContent = titles[i]; tr.children[5].textContent = m.prove || ''; tr.children[6].textContent = m.pull || '';
      tr.addEventListener('click', () => { ov.hidden = true; go(i); });
      rows.push({ tr, o: m.o, sec: curSec, i });
    });
    function refreshLeft(){ rows.forEach(r => { const c = counts(slides[r.i]); r.tr.querySelector('.lf').textContent = (!c.fills && !c.samples) ? 'Ready' : [c.fills ? c.fills + ' fill' + (c.fills > 1 ? 's' : '') : '', c.samples ? 'sample data' : ''].filter(Boolean).join(' · '); r.tr.classList.toggle('cur', r.i === cur); }); }
    ov.refresh = refreshLeft;
    function text(){
      const L = ['SMIF Materials pitch · team plan', 'Main run ' + mmss(A.TOTAL) + ' of 15:00 · ' + mainN + ' slides + ' + (N - mainN) + ' backup', ''];
      Object.keys(window.OWNERS).forEach(k => { const o = window.OWNERS[k]; const secs = slides.reduce((a, s, i) => a + (meta(i).o === k ? (meta(i).t || 0) : 0), 0); const nS = slides.filter((s, i) => meta(i).o === k).length; L.push(o.n + ' (' + o.r + '): ' + mmss(secs) + ' speaking, ' + nS + ' slides'); });
      SECS.forEach(sc => {
        L.push(''); L.push(sc.n.toUpperCase());
        for (let i = sc.a - 1; i < sc.b; i++){ const m = meta(i); L.push((i + 1) + '. ' + titles[i] + ' · ' + window.OWNERS[m.o].s + ' · ' + (m.t ? mmss(m.t) : 'backup') + (m.prove ? ' · ' + m.prove : '')); }
      });
      return L.join('\n');
    }
    bCopy.addEventListener('click', () => {
      const t = text();
      const fallback = () => { let ta = ov.querySelector('textarea'); if (!ta) ta = H('textarea', {'aria-label': 'Plan as text'}, null, ov); ta.value = t; ta.focus(); ta.select(); msg.textContent = 'Select all and copy from the box below'; };
      try { navigator.clipboard.writeText(t).then(() => { msg.textContent = 'Copied'; setTimeout(() => { msg.textContent = ''; }, 2000); }, fallback); } catch (e) { fallback(); }
    });
    ov.addEventListener('click', e => { if (e.target === ov) ov.hidden = true; });
    const obs = new MutationObserver(() => { if (!ov.hidden) refreshLeft(); }); obs.observe(ov, {attributes: true, attributeFilter: ['hidden']});
    return ov;
  }

  // ---------- speaker notes: this slide on the left, the next slide faded on the right ----------
  const TAG = { cover: 'Cover', room: 'Room', say: 'Say', do: 'Do', key: 'Key', crowd: 'Crowd' };
  // a slide element's text with its gold placeholders kept visible
  function rich(el){ if (!el) return ''; const c = el.cloneNode(true); $$('.fill', c).forEach(f => { const e = document.createElement('em'); e.className = 'nf'; e.textContent = f.textContent; f.replaceWith(e); }); $$('[data-k]', c).forEach(k => k.removeAttribute('data-k')); return c.innerHTML; }
  function tok(h, i){
    const sl = slides[i];
    return h.replace(/\[([^\]<]*)\]/g, '<em class="nf">[$1]</em>').replace(/\{(\w+)(?::([\w.-]+))?\}/g, (m, k, a) => {
      if (k === 'h') return rich(sl.querySelector('.sh h2, h2'));
      if (k === 'f'){ const el = document.querySelector('[data-f="' + a + '"]'); return !el ? '' : el.classList.contains('fill') ? '<em class="nf">' + esc(el.textContent) + '</em>' : esc(el.textContent); }
      if (k === 'implied'){ const v = A.impliedNow ? A.impliedNow() : null; return v == null ? '<em class="nf">[x%]</em>' : v.toFixed(1) + '%'; }
      if (k in KL){ const v = kval(k); return v == null || v === '' ? '<em class="nf">[' + esc(KL[k]) + ']</em>' : esc(v); }
      return m;
    });
  }
  function col(i, which){
    if (i < 0 || i >= N) return '<div class="nh"><span>' + (which === 'now' ? 'Now' : 'Next') + ' · end of the deck</span></div>';
    const m = meta(i), o = window.OWNERS[m.o];
    let rows = notes[i].map(r => '<div class="nr t-' + esc(r.t) + '"><span class="nt t-' + esc(r.t) + '">' + (TAG[r.t] || esc(r.t)) + '</span><span class="nx">' + tok(r.h, i) + '</span></div>').join('');
    if (!rows) rows = '<div class="nr"><span class="nt t-cover">Cover</span><span class="nx">No notes for this slide yet.</span></div>';
    const when = m.t ? mmss(m.t) + ' · plays ' + mmss(START[i]) + '-' + mmss(START[i] + m.t) : 'backup';
    return '<div class="nh"><span>' + (which === 'now' ? 'Now' : 'Next') + ' · ' + (i + 1) + ' · ' + esc(titles[i]) + '</span><span class="nw"><i style="background:' + o.c + '"></i>' + esc(o.s) + ' · ' + when + (which === 'now' ? '<b class="nclock"></b>' : '') + '</span>' + (which === 'now' && backTo() != null ? '<span class="nw">Backspace: back to slide ' + (backTo() + 1) + '</span>' : '') + '</div><div class="nrs">' + rows + '</div>';
  }
  function notesHTML(){ return '<div class="ncol now">' + col(cur, 'now') + '</div><div class="ncol nxt">' + col(cur + 1, 'next') + '</div>'; }
  function paintNotes(){
    if (cur < 0) return;
    if (root.classList.contains('notes-on')) drawer.innerHTML = notesHTML();
    if (pop && !pop.closed){ const b = pop.document.getElementById('pn'); if (b){ b.innerHTML = notesHTML(); const c = pop.document.getElementById('pc'); if (c) c.textContent = (cur + 1) + ' / ' + N; } }
    paintClock();
  }
  function setNotes(on){
    if (on && document.fullscreenElement) flash('Notes shrink the slide on a mirrored screen. Use an extended display and press P on the laptop.');
    root.classList.toggle('notes-on', on); bNotes.setAttribute('aria-pressed', String(on));
    try { localStorage.setItem('smifNotes', on ? '1' : '0'); } catch (e) {}
    layout(true); paintNotes();
  }
  // pop-out window for a second screen: the projector shows the slides, the laptop shows this
  let pop = null;
  const POPCSS = 'html,body{margin:0;height:100%;background:#1F1A17;color:#fff;font-family:"Arial","Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased}' +
    '#pt{display:flex;align-items:center;gap:10px;padding:12px 22px;background:#141414;border-bottom:3px solid #A57C61}#pt b{font:700 20px/1 "Source Serif 4",Georgia,serif;margin-right:auto}#pt button{appearance:none;border:1px solid rgba(233,220,210,.4);background:transparent;color:#fff;font:600 15px/1 "Arial",Arial,sans-serif;padding:10px 14px;border-radius:5px;cursor:pointer}#pt button:hover{background:rgba(255,255,255,.1)}#pc{font:600 15px/1 "Arial",Arial,sans-serif;color:#C9B3A3;min-width:64px;text-align:center}' +
    '#pn{display:flex;gap:30px;padding:22px 26px;height:calc(100% - 64px);box-sizing:border-box}#pn .nh .nclock{display:none}' + NCSS('26px', 15);
  function popOut(){
    if (pop && !pop.closed){ try { pop.focus(); } catch (e) {} return; }
    let w = null; try { w = window.open('', 'smifNotes', 'width=1200,height=760'); } catch (e) { w = null; }
    if (!w || !w.document){ flash('The browser blocked the notes window. Press N for notes under the slide.'); return; }
    w.document.open();
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Speaker notes · SMIF Materials</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@700&display=swap"><style>' + POPCSS + '</style></head><body><div id="pt"><b>Speaker notes</b><button type="button" data-a="prev">‹ Prev</button><span id="pc"></span><button type="button" data-a="next">Next ›</button><button type="button" data-a="timer">Timer · S</button><span class="nclock" style="font:600 16px/1 \'Arial\',Arial,sans-serif;min-width:200px"></span></div><div id="pn"></div></body></html>');
    w.document.close();
    pop = w;
    w.document.addEventListener('keydown', onKey);
    w.document.getElementById('pt').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; if (e.detail > 0) b.blur(); if (a === 'prev') adv(-1); else if (a === 'next') adv(1); else toggleTimer(); });
    if (root.classList.contains('notes-on')) setNotes(false);
    paintNotes();
  }
  A.notesHTML = () => notesHTML();

  // pitch timer
  let tRun = false, tStart = 0, tAcc = 0, tIv = null;
  const elapsed = () => tAcc + (tRun ? (Date.now() - tStart) / 1000 : 0);
  function paintClock(){
    const e = elapsed(), m = cur >= 0 ? meta(cur) : null;
    let html = mmss(e) + ' <em>/ ' + mmss(A.TOTAL) + '</em>';
    if ((tRun || tAcc > 0) && m && m.t){
      const s0 = START[cur], s1 = s0 + m.t;
      if (e > s1 + 5) html += ' <span class="late">+' + mmss(e - s1) + ' behind</span>';
      else if (e < s0 - 5) html += ' <span class="early">' + mmss(s0 - e) + ' ahead</span>';
      else html += ' <em>on pace</em>';
    }
    clock.innerHTML = html;
    const nc = (tRun || tAcc > 0) ? html : mmss(A.TOTAL) + ' run · <em>S starts the timer</em>';
    $$('.nclock', drawer).forEach(x => { x.innerHTML = nc; });
    if (pop && !pop.closed) Array.prototype.forEach.call(pop.document.querySelectorAll('.nclock'), x => { x.innerHTML = nc; });
  }
  function toggleTimer(){ if (tRun){ tAcc = elapsed(); tRun = false; clearInterval(tIv); } else { tStart = Date.now(); tRun = true; tIv = setInterval(paintClock, 500); } bTimer.setAttribute('aria-pressed', String(tRun)); bTimer.textContent = tRun ? 'Pause · S' : (tAcc ? 'Resume · S' : 'Timer · S'); paintClock(); }
  function resetTimer(){ tRun = false; clearInterval(tIv); tAcc = 0; bTimer.setAttribute('aria-pressed', 'false'); bTimer.textContent = 'Timer · S'; paintClock(); }

  // lifecycle
  const hooks = [], inited = [];
  let cur = -1;
  // evidence jumps remember where they came from, so Backspace can go back (a short stack, for a jump made after a jump)
  const jumps = [];
  const backTo = () => jumps.length ? jumps[jumps.length - 1] : null;
  function ensure(i){
    if (inited[i]) return; inited[i] = true; hooks[i] = {};
    const k = slides[i].dataset.init;
    if (k && INIT[k]){ try { hooks[i] = INIT[k](slides[i]) || {}; } catch (err){ console.error('init ' + k, err); } }
  }
  function enter(i, dir){ ensure(i); const h = hooks[i]; if (h && h.enter) try { h.enter(dir || 1); } catch (e){ console.error(e); } }
  // a slide with steps (data-steps) takes the arrow keys first, then hands over to the next slide
  function adv(d){ const h = hooks[cur]; if (!reader && h && h.step){ try { if (h.step(d)) return; } catch (e){ console.error(e); } } go(cur + d); }
  function leave(i){ const h = hooks[i]; if (h && h.leave) try { h.leave(); } catch (e){ console.error(e); } hideTip(slides[i]); }
  function go(i, fromHash){
    i = clamp(i | 0, 0, N - 1);
    if (reader){ const sl = $('#slot' + (i + 1)); if (sl) sl.scrollIntoView({behavior: RM ? 'auto' : 'smooth', block: 'start'}); setHash(i); return; }
    if (i === cur) return;
    const dir = i < cur ? -1 : 1;
    if (cur >= 0){ slides[cur].classList.remove('active'); leave(cur); }
    cur = i; slides[i].classList.add('active'); enter(i, dir);
    if (!fromHash) setHash(i);
    cnt.textContent = (i + 1) + ' / ' + N + (backTo() != null ? ' \u00b7 Backspace: ' + (backTo() + 1) : '');
    SECS.forEach((sc, k) => { const n = i + 1, f = n > sc.b ? 1 : n < sc.a ? 0 : (n - sc.a + 1) / (sc.b - sc.a + 1); segs[k].firstChild.style.width = (f * 100) + '%'; segs[k].classList.toggle('cur', n >= sc.a && n <= sc.b); });
    gbtns.forEach((b, k) => b.classList.toggle('cur', k === i));
    paintBrief(); paintNotes();
  }
  A.go = i => go(i);
  A.jump = i => { i = clamp(i | 0, 0, N - 1); if (cur >= 0 && i !== cur && Math.abs(i - cur) > 1){ jumps.push(cur); if (jumps.length > 8) jumps.shift(); } go(i); };
  A.cur = () => cur;
  function setHash(i){ const h = '#' + (i + 1); if (location.hash === h) return; try { history.replaceState(null, '', h); } catch (e){ try { location.hash = h; } catch (e2){} } }
  function toggleFs(){
    try {
      if (document.fullscreenElement){ const p = document.exitFullscreen && document.exitFullscreen(); if (p && p.catch) p.catch(() => {}); }
      else { const el = document.documentElement; const p = el.requestFullscreen && el.requestFullscreen(); if (p && p.catch) p.catch(() => flash('Full screen is not available here')); else if (!el.requestFullscreen) flash('Full screen is not available here'); }
    } catch (e){ flash('Full screen is not available here'); }
  }
  let flashEl = null;
  function flash(msg){ if (!flashEl){ flashEl = H('div', null, '', document.body); flashEl.style.cssText = 'position:fixed;left:50%;top:18px;transform:translateX(-50%);background:#1A1A1A;color:#fff;font:500 14px/1 "Arial",Arial,sans-serif;padding:10px 14px;border-radius:6px;z-index:90;transition:opacity .3s'; } flashEl.textContent = msg; flashEl.style.opacity = '1'; setTimeout(() => { flashEl.style.opacity = '0'; }, 1800); }

  function onKey(e){
    if (e.defaultPrevented) return;
    const t = e.target, tag = t && t.tagName;
    const inCtl = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || (t && t.isContentEditable);
    if (e.key === 'Escape'){ if (!grid.hidden || !plan.hidden){ grid.hidden = true; plan.hidden = true; e.preventDefault(); return; } if (root.classList.contains('notes-on')){ setNotes(false); return; } if (inCtl) t.blur(); return; }
    if (inCtl && t.type !== 'range') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'n' || k === 'N'){ setNotes(!root.classList.contains('notes-on')); e.preventDefault(); return; }
    if (k === 'p' || k === 'P'){ popOut(); e.preventDefault(); return; }
    if (k === 'g' || k === 'G'){ toggle(grid); e.preventDefault(); return; }
    if (k === 't' || k === 'T'){ toggle(plan); e.preventDefault(); return; }
    if (k === 'b' || k === 'B'){ setBuild(!root.classList.contains('build')); e.preventDefault(); return; }
    if (k === 's' || k === 'S'){ toggleTimer(); e.preventDefault(); return; }
    if (k === '0'){ resetTimer(); e.preventDefault(); return; }
    if (k === 'f' || k === 'F'){ toggleFs(); e.preventDefault(); return; }
    if (t && t.type === 'range' && (k === 'PageDown' || k === 'PageUp') && !reader && grid.hidden && plan.hidden){ t.blur(); adv(k === 'PageDown' ? 1 : -1); e.preventDefault(); return; }
    if (inCtl) return;
    if (reader || !grid.hidden || !plan.hidden) return;
    if (k === 'Backspace' && jumps.length){ const j = jumps.pop(); go(j); e.preventDefault(); return; }
    if ((k === ' ' || k === 'Enter') && tag === 'BUTTON') return;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Spacebar'){ adv(1); e.preventDefault(); }
    else if (k === 'ArrowLeft' || k === 'PageUp'){ adv(-1); e.preventDefault(); }
    else if (k === 'Home'){ go(0); e.preventDefault(); }
    else if (k === 'End'){ go(N - 1); e.preventDefault(); }
  }
  document.addEventListener('keydown', onKey);
  // after a click, tap or drag (or a click on a slider label), give the arrow keys back to the deck
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('button'); if (b && e.detail > 0 && !b.closest('#grid') && !b.closest('#plan')) b.blur(); });
  document.addEventListener('pointerup', e => { const r = e.target; if (r && r.type === 'range') setTimeout(() => r.blur(), 0); });
  document.addEventListener('click', e => { const l = e.target.closest && e.target.closest('label'); if (l && l.control && l.control.type === 'range') setTimeout(() => l.control.blur(), 0); });
  window.addEventListener('hashchange', () => { const m = /^#(\d+)$/.exec(location.hash); if (m) go(+m[1] - 1, true); });

  // layout and reader mode
  let reader = null, io = null;
  function layout(force){
    const w = window.innerWidth, r = w < 700;
    const nh = Math.round(Math.min(430, Math.max(250, window.innerHeight * .38)));
    root.style.setProperty('--nh', nh + 'px');
    const h = window.innerHeight - (root.classList.contains('notes-on') && !r ? nh : 0);
    if (r !== reader){
      reader = r; root.classList.toggle('reader', r);
      if (r){
        if (cur >= 0) leave(cur);
        slides.forEach(s => s.classList.add('active'));
        io = new IntersectionObserver(ents => ents.forEach(en => { const i = slides.indexOf(en.target); if (en.isIntersecting) enter(i); else if (inited[i]) leave(i); }), {rootMargin: '60px 0px'});
        slides.forEach(s => io.observe(s));
      } else {
        if (io){ io.disconnect(); io = null; }
        slides.forEach((s, i) => { s.classList.remove('active'); if (inited[i]) leave(i); });
        const c = cur; cur = -1; go(c < 0 ? startIdx() : c, true);
      }
    }
    if (r){ const sw = stage.clientWidth || (w - 32); root.style.setProperty('--rs', String(sw / 1600)); }
    else root.style.setProperty('--s', String(Math.min(w / 1600, h / 900)));
  }
  function startIdx(){ const m = /^#(\d+)$/.exec(location.hash); return m ? clamp(+m[1] - 1, 0, N - 1) : 0; }
  let wantBuild = false;
  try { wantBuild = localStorage.getItem('smifBuild') === '1'; } catch (e) {}
  if (/^#build$/i.test(location.hash)) wantBuild = true;
  window.addEventListener('resize', () => layout());
  layout();
  if (wantBuild) setBuild(true);
  try { if (localStorage.getItem('smifNotes') === '1') setNotes(true); } catch (e) {}
  if (reader){ const i = startIdx(); if (i > 0) setTimeout(() => go(i), 60); }
  paintClock();
}
A.boot = boot;
})();

