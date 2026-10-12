(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = motionPreference.matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  const textNode = el => { const n = document.createTextNode(el.textContent); el.textContent = ''; el.append(n); return n; };
  const NS = 'http://www.w3.org/2000/svg';

  $('#year').textContent = new Date().getFullYear();
  const oldCases = { psyche: 'psyche.html', solarsense: 'solarsense.html', shadeshift: 'shadeshift.html', microgrid: '#microgrid' };
  function forwardLegacyCase() {
    const legacy = location.hash.match(/^#case\/([a-z-]+)$/i);
    if (!legacy) return false;
    const slug = legacy[1].toLowerCase();
    const target = Object.hasOwn(oldCases, slug) ? oldCases[slug] : '#work';
    if (target.startsWith('#')) {
      history.replaceState(history.state, '', target);
      document.getElementById(target.slice(1)).scrollIntoView({ behavior: 'instant' });
      return false;
    }
    location.replace(target);
    return true;
  }
  addEventListener('hashchange', forwardLegacyCase);
  addEventListener('pageshow', forwardLegacyCase);
  if (forwardLegacyCase()) return;

  /* Navigation and contact must work even when canvas is unavailable. */
  const menu = $('#mobileMenu');
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });

  const form = $('#contactForm'), note = $('#formNote'), submitLbl = $('.submit-label', form);
  const NOTE = note.textContent;
  const FIELDS = [
    { el: form.elements.name, err: $('#senderError'), empty: 'Enter your name.' },
    { el: form.elements.email, err: $('#senderEmailError'), empty: 'Enter your email.', type: 'Enter a valid email address.' },
    { el: form.elements.message, err: $('#messageError'), empty: 'Enter your message.' }
  ];
  function fieldMessage(f) {
    if (f.el.validity.valueMissing || !f.el.value.trim()) return f.empty;
    if (f.type && f.el.validity.typeMismatch) return f.type;
    return '';
  }
  function validateField(f) {
    const msg = fieldMessage(f);
    f.err.textContent = msg;
    if (msg) f.el.setAttribute('aria-invalid', 'true'); else f.el.removeAttribute('aria-invalid');
    return !msg;
  }
  FIELDS.forEach(f => {
    f.el.addEventListener('input', () => { if (f.el.getAttribute('aria-invalid') === 'true') validateField(f); });
    f.el.addEventListener('blur', () => validateField(f));
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = FIELDS.map(validateField);
    if (valid.includes(false)) {
      note.textContent = 'Fix the fields with error messages, then try again.';
      FIELDS[valid.indexOf(false)].el.focus();
      return;
    }
    const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), message = form.elements.message.value.trim();
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
    submitLbl.textContent = 'Opening your email app...'; note.textContent = NOTE;
    setTimeout(() => { submitLbl.textContent = 'Compose email'; }, 2600);
    window.location.href = 'mailto:uriah.villa2023@gmail.com?subject=' + subject + '&body=' + body;
  });
  form.hidden = false;

  /* ---------------- Nav scroll spy ---------------- */
  const nav = $('.nav'), links = $$('.nav-links a[href^="#"], .mobile-panel a[href^="#"]'), ind = $('.nav-ind');
  const SPY = [['work', '#work'], ['about', '#about'], ['experience', '#experience'], ['education', '#experience'], ['contact', '#contact']];
  let spyCur = undefined;
  function spy(force) {
    let cur = null;
    for (const [id, href] of SPY) { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top <= innerHeight * .4) cur = href; }
    if (cur === spyCur && !force) return;
    spyCur = cur;
    let target = null;
    links.forEach(a => { const on = a.getAttribute('href') === cur; if (on) { a.setAttribute('aria-current', 'true'); if (a.closest('.nav-links')) target = a; } else a.removeAttribute('aria-current'); });
    if (target && target.offsetParent) {
      const pr = target.parentElement.getBoundingClientRect(), r = target.getBoundingClientRect();
      ind.style.transform = `translateX(${r.left - pr.left}px) scaleX(${r.width})`; ind.style.opacity = '1';
    } else ind.style.opacity = '0';
  }
  const syncOffset = () => { root.style.setProperty('--scroll-offset', nav.getBoundingClientRect().height + 16 + 'px'); spy(true); };
  new ResizeObserver(syncOffset).observe(nav, { box: 'border-box' });
  syncOffset();
  let spyTicking = false;
  addEventListener('scroll', () => { if (spyTicking) return; spyTicking = true; requestAnimationFrame(() => { spyTicking = false; if (menu.open) menu.open = false; spy(); }); }, { passive: true });
  addEventListener('resize', () => spy(true));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncOffset);

  /* ---------------- Seven-segment meters ---------------- */
  const DIGITS = [[1,1,1,1,1,1,0],[0,1,1,0,0,0,0],[1,1,0,1,1,0,1],[1,1,1,1,0,0,1],[0,1,1,0,0,1,1],[1,0,1,1,0,1,1],[1,0,1,1,1,1,1],[1,1,1,0,0,0,0],[1,1,1,1,1,1,1],[1,1,1,1,0,1,1]];
  const hSeg = y => `3.5,${y} 6,${y - 2.5} 24,${y - 2.5} 26.5,${y} 24,${y + 2.5} 6,${y + 2.5}`;
  const vSeg = (x, a, b) => `${x},${a} ${x + 2.5},${a + 2.5} ${x + 2.5},${b - 2.5} ${x},${b} ${x - 2.5},${b - 2.5} ${x - 2.5},${a + 2.5}`;
  const SEG_POINTS = [hSeg(2.5), vSeg(27.5, 3.5, 26), vSeg(27.5, 28, 50.5), hSeg(51.5), vSeg(2.5, 28, 50.5), vSeg(2.5, 3.5, 26), hSeg(27)];

  function makeMeter(el) {
    const value = parseFloat(el.dataset.value), digits = +el.dataset.digits, dec = +(el.dataset.dec || 0), plus = el.hasAttribute('data-plus');
    const pitch = 40, width = digits * pitch + (plus ? 26 : 0) + 6;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} 54`); svg.setAttribute('class', 'seg-svg'); svg.setAttribute('aria-hidden', 'true');
    const g = document.createElementNS(NS, 'g'); g.setAttribute('transform', 'translate(6 0) skewX(-6)'); svg.append(g);
    const slots = [];
    for (let i = 0; i < digits; i++) {
      const dg = document.createElementNS(NS, 'g'); dg.setAttribute('transform', `translate(${i * pitch} 0)`);
      slots.push(SEG_POINTS.map(p => { const q = document.createElementNS(NS, 'polygon'); q.setAttribute('points', p); dg.append(q); return q; }));
      if (dec && i === digits - dec - 1) { const dp = document.createElementNS(NS, 'circle'); dp.setAttribute('cx', '34'); dp.setAttribute('cy', '51'); dp.setAttribute('r', '2.8'); dp.setAttribute('data-on', '1'); dg.append(dp); }
      g.append(dg);
    }
    if (plus) {
      const pg = document.createElementNS(NS, 'g'); pg.setAttribute('transform', `translate(${digits * pitch} 0)`);
      [[2, 22, 20, 5], [9.5, 14.5, 5, 20]].forEach(([x, y, w, h]) => { const r = document.createElementNS(NS, 'rect'); r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('data-on', '1'); pg.append(r); });
      g.append(pg);
    }
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = el.textContent;
    el.textContent = ''; el.append(svg, sr);
    const set = v => {
      const s = String(Math.max(0, Math.round(v * 10 ** dec))).padStart(dec + 1, '0');
      for (let i = 0; i < digits; i++) {
        const ci = s.length - digits + i, bits = ci >= 0 ? DIGITS[+s[ci]] : [0,0,0,0,0,0,0];
        slots[i].forEach((q, k) => q.setAttribute('data-on', bits[k]));
      }
    };
    let ran = false;
    set(reduce ? value : 0);
    return {
      run() {
        if (ran) return; ran = true;
        if (reduce) { set(value); return; }
        const t0 = performance.now(), dur = 1600, unit = 1 / 10 ** dec;
        const tick = now => {
          const p = clamp((now - t0) / dur, 0, 1);
          let v = value * (1 - Math.pow(2, -10 * p));
          if (p > .7 && p < .95 && Math.random() < .4) v += Math.random() < .5 ? -unit : unit;
          set(clamp(v, 0, value + unit));
          if (p < 1) requestAnimationFrame(tick); else set(value);
        };
        requestAnimationFrame(tick);
      }
    };
  }
  const meters = $$('.seg').map(makeMeter);
  const runMeters = () => meters.forEach(m => m.run());

  /* ---------------- Oscilloscope ---------------- */
  const hero = $('.hero'), band = $('.scope-band'), trace = $('.scope-trace'), gridCv = $('.scope-grid');
  const scan = $('.scope-scan'), title = $('.hero-title');
  const ctx = trace.getContext('2d'), gctx = gridCv.getContext('2d');
  if (!ctx || !gctx) {
    root.classList.remove('js-boot');
    hero.classList.add('is-booted');
    runMeters();
    return;
  }
  hero.classList.add('scope-ready');
  $('.scope-status').hidden = false;
  band.tabIndex = 0;
  $('.trig-handle').hidden = false;
  const chEls = $$('.ch', band), probeEl = $('.probe', band), probeTxt = textNode($('.probe-text', band));
  const out = {};
  ['vdiv', 'vunit', 'tlabel', 'tdiv', 'tunit', 'triglabel', 'trig', 'caption', 'ca', 'cb', 'dl', 'cd', 'cf'].forEach(k => { out[k] = textNode($(`[data-out="${k}"]`)); });
  const keys = $$('.scope-keys [data-mode]'), runBtn = $('.key-run'), runLbl = $('.run-label');
  const fftBtn = $('[data-tool="fft"]'), curBtn = $('[data-tool="cursors"]');
  const curRead = $('.cursor-read', band), curHandles = $$('.cursor-handle', band), trigHandle = $('.trig-handle', band);
  const live = $('#scopeLive');
  const MODES = [
    { f: 1000, cap: 'Sense · analog sensor input' },
    { f: 20000, cap: 'Control · PWM drive output' },
    { f: 250, cap: 'Motion · three-channel Hall feedback' }
  ];
  const STEP = 2, PAD = 30, CYC = 3.2, AMP = 1.15, VREF = 1.65;
  const FN = 1024, FP = 8, FH = 20, FK = FP * FH;
  const S = { W: 1, H: 1, bandH: 190, D: 48, cy: 125, N: 0, dpr: 1, m: 0, mT: 0, cyc: CYC, cycT: CYC, amp: AMP, ampT: AMP,
    head: 0, headF: 0, period: 2.6, curP: 1.3, time: 0, sweeps: 0, running: !reduce, visible: true, booting: !reduce,
    probeX: -1, probeOn: false, probeA: 0, last: 0, raf: 0, tL: 0, tW: 1, bootT: 0,
    view: 0, viewA: 0, cursors: false, cu: [.5, .8], trigL: 0, trigShow: 0, trigHold: 0, trigHover: false,
    phase: 0, untrig: false, drag: null, focusProbe: false };
  let buf = [new Float32Array(0), new Float32Array(0), new Float32Array(0)];

  /* Signal model: one function feeds the trace, the trigger search, and the FFT. */
  function pulse(f, d) {
    const r = .022; f -= Math.floor(f); let v;
    if (f < r) v = f / r;
    else if (f < d) v = 1 + .1 * Math.exp(-(f - r) / .02) * Math.sin((f - r) / .02 * 2.4);
    else if (f < d + r) v = 1 - (f - d) / r;
    else v = -.1 * Math.exp(-(f - d - r) / .02) * Math.sin((f - d - r) / .02 * 2.4);
    return v * 2 - 1;
  }
  let sOff = 0, sAmp = AMP;
  function sig(ch, t) {
    const m = S.m;
    const sine = Math.sin(6.2832 * t) * .9 + .1 * Math.sin(12.566 * t + .6);
    const pw = pulse(t, .5 + .28 * Math.sin(6.2832 * t / 6.5 + S.time * .8));
    if (m <= 1) { sOff = 0; sAmp = S.amp; return lerp(sine, pw, ease(m)); }
    const e = ease(m - 1); sOff = (ch - 1) * 1.3 * e; sAmp = lerp(S.amp, .36, e);
    return lerp(pw, pulse(t * .5 + ch / 3, .5), e);
  }
  const noise = i => { const s = Math.sin(i * 12.9898 + S.sweeps * 78.233) * 43758.5453; return s - Math.floor(s) - .5; };
  const tAt = i => (i * STEP / S.W - .5) * S.cyc + S.phase;
  function sampleY(ch, i) { const v = sig(ch, tAt(i)); return S.cy + sOff * S.D - v * sAmp * S.D + noise(i + ch * 997) * .7; }
  const writeSample = i => { for (let ch = 0; ch < 3; ch++) buf[ch][i] = sampleY(ch, i); };
  const fillAll = () => { for (let i = 0; i < S.N; i++) writeSample(i); };

  /* Trigger: find the rising crossing of CH1 through the trigger level and pin it to the centre graticule line.
     No crossing (level outside the signal) means the scope free-runs and the trace rolls, like a real instrument. */
  function trigger(dt) {
    const L = S.trigL; let prev = sig(0, 0), found = -1;
    for (let k = 1; k <= 256; k++) {
      const t = k / 256, v = sig(0, t);
      if (prev < L && v >= L) { found = (k - 1 + (L - prev) / (v - prev)) / 256; break; }
      prev = v;
    }
    if (found >= 0) { S.untrig = false; S.phase = found; }
    else { S.untrig = true; S.phase = (S.phase + dt * .45) % 1000; }
  }
  const trigY = () => { sig(0, S.phase); return S.cy + sOff * S.D - S.trigL * sAmp * S.D; };
  const trigV = () => VREF + S.trigL * VREF;

  /* FFT of CH1 over eight fundamental periods, Hann window. */
  const fre = new Float32Array(FN), fim = new Float32Array(FN), spec = new Float32Array(FK + 1).fill(-70);
  const hann = new Float32Array(FN).map((_, i) => .5 - .5 * Math.cos(6.283185307 * i / (FN - 1)));
  function fft(re, im) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; }
    }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = -6.283185307179586 / len, wr = Math.cos(ang), wi = Math.sin(ang), half = len >> 1;
      for (let i = 0; i < n; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < half; k++) {
          const a = i + k, b = a + half, xr = re[b] * cr - im[b] * ci, xi = re[b] * ci + im[b] * cr;
          re[b] = re[a] - xr; im[b] = im[a] - xi; re[a] += xr; im[a] += xi;
          const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
        }
      }
    }
  }
  function computeSpectrum(k) {
    for (let i = 0; i < FN; i++) { fre[i] = sig(0, i / FN * FP) * hann[i]; fim[i] = 0; }
    fft(fre, fim);
    for (let b = 0; b <= FK; b++) {
      const a = 4 * Math.hypot(fre[b], fim[b]) / FN + 7e-4 * (1 + .7 * Math.random());
      spec[b] += (Math.max(-70, 20 * Math.log10(a)) - spec[b]) * k;
    }
  }
  const dbY = db => PAD + clamp((10 - db) / 80, 0, 1) * S.bandH;
  const specAt = u => spec[clamp(Math.round(u * FK), 0, FK)];

  /* Formatting */
  const fmtTime = s => s < 1e-3 ? (s * 1e6).toFixed(s * 1e6 < 10 ? 2 : 1) + ' µs' : (s * 1e3).toFixed(2) + ' ms';
  const fmtSignedTime = s => (s < 0 ? '−' : '+') + fmtTime(Math.abs(s));
  const fmtHz = (hz, short) => {
    if (!isFinite(hz) || hz <= 0) return '—';
    if (hz >= 1e6) return short ? +(hz / 1e6).toPrecision(3) + 'M' : (hz / 1e6).toFixed(2) + ' MHz';
    if (hz >= 1e3) { const k = hz / 1e3; return short ? +k.toPrecision(3) + 'k' : (k >= 100 ? k.toFixed(0) : k >= 10 ? k.toFixed(1) : k.toFixed(2)) + ' kHz'; }
    return short ? String(Math.round(hz)) : hz.toFixed(0) + ' Hz';
  };
  const fmtDb = db => (db < 0 ? '−' : '+') + Math.abs(db).toFixed(1) + ' dB';
  const fmtV = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2) + ' V';
  const spoken = s => s.replace(/−/g, 'minus ').replace(/ µs/g, ' microseconds').replace(/ ms/g, ' milliseconds')
    .replace(/ kHz/g, ' kilohertz').replace(/ MHz/g, ' megahertz').replace(/ Hz/g, ' hertz').replace(/ dB/g, ' decibels').replace(/ V\b/g, ' volts');
  const caption = () => (S.view ? 'FFT · ' : '') + MODES[S.mT].cap;

  function drawGrid() {
    const hr = hero.getBoundingClientRect(), br = band.getBoundingClientRect(), d = S.dpr;
    const w = Math.round(hr.width), h = Math.round(hr.height);
    gridCv.width = w * d; gridCv.height = h * d;
    const g = gctx; g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, w, h);
    const D = S.D, cy = br.top - hr.top + br.height / 2, cx = w / 2, px = v => Math.round(v) + .5;
    g.lineWidth = 1; g.strokeStyle = 'rgba(236,224,208,.055)'; g.beginPath();
    for (let x = cx % D; x < w; x += D) { g.moveTo(px(x), 0); g.lineTo(px(x), h); }
    for (let y = cy % D; y < h; y += D) { g.moveTo(0, px(y)); g.lineTo(w, px(y)); }
    g.stroke();
    g.strokeStyle = 'rgba(236,224,208,.15)'; g.beginPath();
    const Yc = px(cy), Xc = px(cx), top = cy - 2 * D, bot = cy + 2 * D;
    g.moveTo(0, Yc); g.lineTo(w, Yc); g.moveTo(Xc, top); g.lineTo(Xc, bot);
    for (let x = cx % (D / 5); x < w; x += D / 5) { g.moveTo(px(x), Yc - 4); g.lineTo(px(x), Yc + 4); }
    for (let y = top; y <= bot + .1; y += D / 5) { g.moveTo(Xc - 4, px(y)); g.lineTo(Xc + 4, px(y)); }
    g.stroke();
  }

  function resize() {
    const br = band.getBoundingClientRect(), hr = hero.getBoundingClientRect();
    S.dpr = Math.min(window.devicePixelRatio || 1, 2);
    S.W = Math.max(1, Math.round(br.width)); S.bandH = br.height; S.H = Math.round(br.height + PAD * 2);
    S.D = S.bandH / 4; S.cy = PAD + S.bandH / 2;
    trace.width = Math.round(S.W * S.dpr); trace.height = Math.round(S.H * S.dpr);
    trace.style.width = S.W + 'px'; trace.style.height = S.H + 'px';
    const N = Math.floor(S.W / STEP) + 1;
    if (N !== S.N) { S.N = N; buf = [0, 1, 2].map(() => new Float32Array(N).fill(NaN)); S.head = Math.min(S.head, N - 1); S.headF = S.head; }
    if (!S.booting) { trigger(0); fillAll(); }
    const tr = title.getBoundingClientRect(); S.tL = tr.left - hr.left; S.tW = tr.width;
    drawGrid();
    readouts(true);
    if (!S.raf) draw(!S.running);
  }

  const HOT = [255, 240, 224], WARM = [255, 170, 112], OLD = [222, 116, 64];
  function col(age, mul) {
    let c;
    if (age < .3) { const k = age / .3; c = HOT.map((h, j) => lerp(h, WARM[j], k)); }
    else { const k = Math.min(1, (age - .3) / Math.max(.01, S.curP - .3)); c = WARM.map((h, j) => lerp(h, OLD[j], k)); }
    const a = Math.max(.34, Math.exp(-age / 1.5)) * mul;
    return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;
  }
  function gradient(mul, still) {
    if (still) return col(.9, mul);
    const W = S.W, bx = S.head * STEP, v = W / S.curP, g = ctx.createLinearGradient(0, 0, W, 0);
    const ageAt = x => ((((bx - x) % W) + W) % W) / v;
    for (let j = 0; j <= 10; j++) g.addColorStop(j / 10, col(ageAt(j / 10 * W), mul));
    for (const dx of [0, .012, .035, .08, .16]) { const x = bx - dx * W; g.addColorStop((((x % W) + W) % W) / W, col(dx * S.curP, mul)); }
    g.addColorStop(Math.min(1, bx / W + .002), col(S.curP * .995, mul));
    return g;
  }

  function drawTime(still, fade) {
    const hi = S.head, split = ease(S.m - 1);
    for (let ch = 0; ch < 3; ch++) {
      const alpha = (ch === 0 ? 1 : split) * fade;
      if (alpha < .02) continue;
      const b = buf[ch], p = new Path2D(); let pen = false, any = false;
      for (let i = 0; i < S.N; i++) {
        const y = b[i];
        if (y !== y) { pen = false; continue; }
        const x = i * STEP;
        if (!pen || (!still && i === hi + 1)) { p.moveTo(x, y); pen = true; } else { p.lineTo(x, y); any = true; }
      }
      if (!any) continue;
      ctx.lineWidth = 14; ctx.strokeStyle = gradient(.09 * alpha, still); ctx.stroke(p);
      ctx.lineWidth = 4.5; ctx.strokeStyle = gradient(.3 * alpha, still); ctx.stroke(p);
      ctx.lineWidth = 1.6; ctx.strokeStyle = gradient(alpha, still); ctx.stroke(p);
      const hy = b[hi];
      if (!still && hy === hy) {
        const x = hi * STEP, rg = ctx.createRadialGradient(x, hy, 0, x, hy, 18);
        rg.addColorStop(0, `rgba(255,244,232,${.9 * alpha})`); rg.addColorStop(.25, `rgba(255,180,120,${.35 * alpha})`); rg.addColorStop(1, 'rgba(255,150,90,0)');
        ctx.fillStyle = rg; ctx.fillRect(x - 18, hy - 18, 36, 36);
      }
    }
  }

  function drawSpectrum(alpha) {
    const W = S.W, bottom = PAD + S.bandH, p = new Path2D();
    for (let b = 0; b <= FK; b++) { const x = b / FK * W, y = dbY(spec[b]); if (b) p.lineTo(x, y); else p.moveTo(x, y); }
    const area = new Path2D(p); area.lineTo(W, bottom); area.lineTo(0, bottom); area.closePath();
    const g = ctx.createLinearGradient(0, PAD, 0, bottom);
    g.addColorStop(0, `rgba(239,138,76,${.26 * alpha})`); g.addColorStop(1, 'rgba(239,138,76,0)');
    ctx.fillStyle = g; ctx.fill(area);
    ctx.lineWidth = 12; ctx.strokeStyle = col(.2, .09 * alpha); ctx.stroke(p);
    ctx.lineWidth = 4; ctx.strokeStyle = col(.2, .3 * alpha); ctx.stroke(p);
    ctx.lineWidth = 1.5; ctx.strokeStyle = col(.2, alpha); ctx.stroke(p);
    ctx.globalCompositeOperation = 'source-over';
    const f0 = MODES[Math.round(S.m)].f, peaks = [], placed = [], maxN = W < 600 ? 3 : 7;
    for (let b = 1; b < FK; b++) if (spec[b] > -36 && spec[b] >= spec[b - 1] && spec[b] > spec[b + 1]) peaks.push(b);
    peaks.sort((a, b) => spec[b] - spec[a]);
    ctx.font = '500 11px "Plex Mono", ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = `rgba(241,232,220,${.8 * alpha})`;
    for (const b of peaks) {
      const x = b / FK * W;
      if (x < 16 || x > W - 30 || placed.some(px => Math.abs(px - x) < 58)) continue;
      placed.push(x); ctx.fillText(fmtHz(b / FP * f0, true), x, Math.max(PAD + 8, dbY(spec[b]) - 10));
      if (placed.length >= maxN) break;
    }
    ctx.globalCompositeOperation = 'lighter';
  }

  function draw(still) {
    const { W, H, dpr } = S;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter'; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const tFade = 1 - S.viewA;
    if (tFade > .01) drawTime(still, tFade);
    if (S.viewA > .01) drawSpectrum(S.viewA);
    ctx.globalCompositeOperation = 'source-over';
    const top = PAD - 8, bot = S.H - PAD + 8;
    if (S.trigShow > .01 && tFade > .01) {
      const y = Math.round(trigY()) + .5;
      ctx.setLineDash([6, 6]); ctx.lineWidth = 1; ctx.strokeStyle = `rgba(244,237,227,${.5 * S.trigShow * tFade})`;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); ctx.setLineDash([]);
    }
    if (S.cursors) {
      const xa = Math.round(S.cu[0] * W) + .5, xb = Math.round(S.cu[1] * W) + .5;
      ctx.fillStyle = 'rgba(239,173,131,.06)'; ctx.fillRect(Math.min(xa, xb), top, Math.abs(xb - xa), bot - top);
      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(244,237,227,.72)';
      ctx.beginPath(); ctx.moveTo(xa, top); ctx.lineTo(xa, bot); ctx.moveTo(xb, top); ctx.lineTo(xb, bot); ctx.stroke();
    } else if (S.probeA > .01 && S.probeX >= 0) {
      const x = Math.round(S.probeX) + .5;
      ctx.setLineDash([3, 5]); ctx.lineWidth = 1; ctx.strokeStyle = `rgba(244,237,227,${.35 * S.probeA})`;
      ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bot); ctx.stroke(); ctx.setLineDash([]);
      const y = S.view ? dbY(specAt(S.probeX / W)) : buf[0][clamp(Math.round(S.probeX / STEP), 0, S.N - 1)];
      if (y === y) { ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.2832); ctx.strokeStyle = `rgba(255,240,224,${.9 * S.probeA})`; ctx.lineWidth = 1.5; ctx.stroke(); }
    }
  }

  const last = { ch: [] };
  const put = (k, v) => { if (last[k] !== v) { out[k].data = v; last[k] = v; } };
  const attr = (el, k, v) => { if (el.getAttribute(k) !== v) el.setAttribute(k, v); };
  function cursorText() {
    const f0 = MODES[Math.round(S.m)].f, [a, b] = S.cu;
    if (S.view) {
      const fa = a * FH * f0, fb = b * FH * f0;
      return { ca: `${fmtHz(fa)} ${fmtDb(specAt(a))}`, cb: `${fmtHz(fb)} ${fmtDb(specAt(b))}`, dl: 'f', cd: fmtHz(Math.abs(fb - fa)), cf: '' };
    }
    const ta = (a - .5) * S.cyc / f0, tb = (b - .5) * S.cyc / f0, dt = Math.abs(tb - ta);
    return { ca: fmtSignedTime(ta), cb: fmtSignedTime(tb), dl: 't', cd: fmtTime(dt), cf: dt > 0 ? fmtHz(1 / dt) : '—' };
  }
  function readouts(force) {
    if (force) Object.keys(last).forEach(k => { if (k !== 'ch') last[k] = undefined; });
    const mode = MODES[Math.round(S.m)], isFft = S.view === 1;
    put('vdiv', isFft ? '20' : (VREF / S.amp).toFixed(2));
    put('vunit', isFft ? '\u00a0dB/div' : '\u00a0V/div');
    put('tlabel', isFft ? 'Span' : 'Time');
    put('tdiv', isFft ? fmtHz(FH * mode.f) : fmtTime(S.cyc / mode.f / (S.W / S.D)));
    put('tunit', isFft ? '' : '/div');
    put('triglabel', isFft ? 'Window' : 'Trig');
    const tv = fmtV(trigV());
    put('trig', isFft ? 'Hann · 1024 pt' : S.untrig ? 'Auto · untriggered' : `CH1 rising · ${tv}`);
    hero.classList.toggle('untrig', !isFft && S.untrig);
    const e = ease(S.m - 1), fade = 1 - S.viewA;
    chEls.forEach((el, ch) => {
      const y = Math.round((S.bandH / 2 + (ch - 1) * 1.3 * e * S.D) * 2) / 2, o = ((ch === 0 ? 1 : e) * fade).toFixed(2);
      const key = y + '|' + o;
      if (force || last.ch[ch] !== key) { el.style.transform = `translateY(${y}px) translateY(-50%)`; el.style.opacity = o; last.ch[ch] = key; }
    });
    if (!isFft) {
      const ty = Math.round(clamp(trigY() - PAD, -12, S.bandH + 12));
      if (force || last.ty !== ty) { trigHandle.style.transform = `translateY(${ty}px)`; last.ty = ty; }
      attr(trigHandle, 'aria-valuenow', trigV().toFixed(2));
      attr(trigHandle, 'aria-valuetext', spoken(tv) + (S.untrig ? ', untriggered' : ', triggered'));
    }
    if (S.cursors) {
      const t = cursorText();
      ['ca', 'cb', 'dl', 'cd', 'cf'].forEach(k => put(k, t[k]));
      curHandles.forEach((h, i) => {
        const x = Math.round(S.cu[i] * S.W);
        if (force || last['hx' + i] !== x) { h.style.transform = `translateX(${x}px)`; last['hx' + i] = x; }
        attr(h, 'aria-valuenow', String(Math.round(S.cu[i] * 100)));
        attr(h, 'aria-valuetext', spoken(i ? t.cb : t.ca));
      });
    }
    if (S.probeA > .01 && S.probeX >= 0 && !S.cursors) {
      const u = S.probeX / S.W, tt = (u - .5) * S.cyc + S.phase, i = clamp(Math.round(S.probeX / STEP), 0, S.N - 1), y = buf[0][i];
      let str, py;
      if (isFft) { str = `${fmtHz(u * FH * mode.f)}  ${fmtDb(specAt(u))}`; py = dbY(specAt(u)); }
      else if (Math.round(S.m) === 2) { str = [0, 1, 2].map(k => `H${k + 1} ${pulse(tt * .5 + k / 3, .5) > 0 ? 1 : 0}`).join('  '); py = y; }
      else { str = `${fmtSignedTime((u - .5) * S.cyc / mode.f)}  ${(((S.cy - y) / (S.amp * S.D)) * VREF + VREF).toFixed(2)} V`; py = y; }
      if (str !== last.p) { probeTxt.data = str; last.p = str; }
      const flip = S.probeX > S.W - 190, ty = clamp((py === py ? py : S.cy) - PAD - 40, -22, S.bandH - 12);
      probeEl.style.transform = `translate(${Math.round(S.probeX) + (flip ? -12 : 12)}px, ${Math.round(ty)}px)${flip ? ' translateX(-100%)' : ''}`;
    }
    const po = S.cursors ? '0' : S.probeA.toFixed(2);
    if (last.po !== po) { probeEl.style.opacity = po; last.po = po; }
  }

  function finishBoot() {
    S.booting = false;
    title.style.clipPath = '';
    scan.style.opacity = '0';
    hero.classList.add('is-booted');
    runMeters();
  }

  function frame(now) {
    S.raf = 0;
    if (!S.running || !S.visible) { S.last = 0; return; }
    const dt = S.last ? Math.min(.05, (now - S.last) / 1000) : 1 / 60; S.last = now; S.time += dt;
    const kf = 1 - Math.exp(-dt * 7);
    S.m += (S.mT - S.m) * (1 - Math.exp(-dt * 3)); if (Math.abs(S.mT - S.m) < .002) S.m = S.mT;
    S.cyc += (S.cycT - S.cyc) * kf; S.amp += (S.ampT - S.amp) * kf;
    S.viewA += (S.view - S.viewA) * (1 - Math.exp(-dt * 6)); if (Math.abs(S.view - S.viewA) < .003) S.viewA = S.view;
    S.probeA += ((S.probeOn ? 1 : 0) - S.probeA) * (1 - Math.exp(-dt * 10));
    S.trigHold = Math.max(0, S.trigHold - dt);
    const showT = S.trigHover || S.drag === trigHandle || document.activeElement === trigHandle || S.trigHold > 0 ? 1 : 0;
    S.trigShow += (showT - S.trigShow) * (1 - Math.exp(-dt * 8));
    trigger(dt);
    if (S.booting) {
      S.bootT += dt;
      if (S.bootT > .35) {
        S.curP = 1.3; scan.style.opacity = '1';
        S.headF += S.N / S.curP * dt;
        while (S.head < Math.floor(S.headF) && S.head < S.N - 1) { S.head++; writeSample(S.head); }
        const x = S.head * STEP;
        scan.style.transform = `translateX(${x}px)`;
        title.style.clipPath = `inset(-0.3em ${Math.max(0, S.tW - (x - S.tL))}px -0.3em -0.3em)`;
        if (S.head >= S.N - 1) { S.head = 0; S.headF = 0; S.sweeps++; writeSample(0); finishBoot(); }
      }
    } else {
      S.curP += (S.period - S.curP) * (1 - Math.exp(-dt * 2));
      S.headF += S.N / S.curP * dt;
      while (S.head < Math.floor(S.headF)) {
        S.head++;
        if (S.head >= S.N) { S.head = 0; S.headF -= S.N; S.sweeps++; }
        writeSample(S.head);
      }
    }
    if (S.viewA > .01) computeSpectrum(.3);
    draw(false);
    readouts(false);
    S.raf = requestAnimationFrame(frame);
  }

  function renderStill() {
    S.m = S.mT; S.cyc = S.cycT; S.amp = S.ampT; S.viewA = S.view; S.probeA = S.probeOn ? 1 : 0;
    S.trigShow = S.trigHold > 0 || document.activeElement === trigHandle || S.drag === trigHandle ? 1 : 0;
    trigger(0); fillAll(); if (S.view) computeSpectrum(1);
    draw(true); readouts(true);
  }
  function wake() {
    if (S.running && S.visible) { if (!S.raf) S.raf = requestAnimationFrame(frame); }
    else if (!S.running && !S.booting) renderStill();
  }

  let annT = 0;
  const announce = fn => { clearTimeout(annT); annT = setTimeout(() => { live.textContent = fn(); }, 450); };
  function setMode(n, byUser) {
    S.mT = n; hero.dataset.mode = n; put('caption', caption());
    keys.forEach(k => k.setAttribute('aria-pressed', String(+k.dataset.mode === n)));
    wake();
    if (byUser) announce(() => MODES[n].cap);
  }
  keys.forEach(k => k.addEventListener('click', () => setMode(+k.dataset.mode, true)));

  function placeCursors() {
    S.cu = S.view ? [1 / FH, 3 / FH] : [.5, clamp(.5 + (S.mT === 2 ? 2 : 1) / S.cyc, 0, 1)];
  }
  function setView(v) {
    S.view = v; hero.dataset.view = v ? 'fft' : 'time';
    fftBtn.setAttribute('aria-pressed', String(!!v));
    trigHandle.hidden = !!v;
    put('caption', caption());
    if (S.cursors) placeCursors();
    if (v && !S.viewA) computeSpectrum(1);
    readouts(true); wake();
    announce(() => v ? 'FFT view. Spectrum of channel 1, span ' + spoken(fmtHz(FH * MODES[S.mT].f)) : 'Time view');
  }
  function setCursors(on) {
    S.cursors = on; curBtn.setAttribute('aria-pressed', String(on));
    curRead.hidden = !on; curHandles.forEach(h => { h.hidden = !on; });
    hero.classList.toggle('tools-on', on);
    if (on) { placeCursors(); S.probeOn = false; }
    readouts(true); wake();
    announce(() => on ? 'Cursors on. ' + cursorSpeech() : 'Cursors off');
  }
  function cursorSpeech() {
    const t = cursorText();
    return spoken(`Cursor A ${t.ca}, cursor B ${t.cb}, delta ${t.cd}` + (t.cf ? `, one over delta ${t.cf}` : ''));
  }
  fftBtn.addEventListener('click', () => setView(S.view ? 0 : 1));
  curBtn.addEventListener('click', () => setCursors(!S.cursors));

  function setRunning(on) {
    S.running = on;
    runBtn.dataset.state = on ? 'running' : 'paused';
    runLbl.textContent = on ? 'Running' : 'Paused';
    runBtn.setAttribute('aria-label', on ? 'Running: pause scope animation' : 'Paused: resume scope animation');
    hero.classList.toggle('is-paused', !on);
    if (!on && S.booting) { finishBoot(); fillAll(); }
    if (on) { S.last = 0; wake(); } else if (!S.raf) renderStill();
  }
  runBtn.addEventListener('click', () => setRunning(!S.running));

  /* Pointer: the cursor is the probe (time view: timebase + amplitude; FFT view: frequency readout). */
  hero.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || S.drag || S.cursors) return;
    const br = band.getBoundingClientRect(), hr = hero.getBoundingClientRect();
    const u = clamp((e.clientX - br.left) / br.width, 0, 1), v = clamp((e.clientY - hr.top) / hr.height, 0, 1);
    S.probeX = u * S.W; S.probeOn = true;
    if (!S.view) { S.cycT = lerp(1.6, 6.4, u); S.ampT = lerp(1.7, .6, v); }
    wake();
  });
  hero.addEventListener('pointerleave', e => {
    if (e.pointerType === 'touch' || S.drag || S.cursors) return;
    if (!S.focusProbe) S.probeOn = false;
    if (!S.view) { S.cycT = CYC; S.ampT = AMP; }
    wake();
  });
  let touchTimer = 0;
  const touchProbe = e => {
    if (e.pointerType !== 'touch' || S.cursors || e.target.closest('.handle')) return;
    const br = band.getBoundingClientRect(), u = clamp((e.clientX - br.left) / br.width, 0, 1);
    S.probeX = u * S.W; S.probeOn = true; if (!S.view) S.cycT = lerp(1.6, 6.4, u);
    clearTimeout(touchTimer); wake();
  };
  band.addEventListener('pointerdown', touchProbe);
  band.addEventListener('pointermove', touchProbe);
  ['pointerup', 'pointercancel'].forEach(t => band.addEventListener(t, e => {
    if (e.pointerType !== 'touch' || S.cursors) return;
    clearTimeout(touchTimer); touchTimer = setTimeout(() => { S.probeOn = false; if (!S.view) S.cycT = CYC; wake(); }, 1800);
  }));

  /* Draggable handles: cursors A/B and trigger level. */
  function bindDrag(el, move) {
    el.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      el.setPointerCapture(e.pointerId); S.drag = el; el.classList.add('is-drag');
      el.focus({ preventScroll: true }); move(e);
    });
    el.addEventListener('pointermove', e => { if (S.drag === el) move(e); });
    const end = () => { if (S.drag === el) { S.drag = null; el.classList.remove('is-drag'); wake(); } };
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => el.addEventListener(t, end));
  }
  const bandX = e => clamp((e.clientX - band.getBoundingClientRect().left) / S.W, 0, 1);
  curHandles.forEach((h, i) => {
    bindDrag(h, e => { S.cu[i] = bandX(e); wake(); announce(cursorSpeech); });
    h.addEventListener('keydown', e => {
      const step = e.shiftKey ? .025 : .005; let u = S.cu[i];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') u -= step;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') u += step;
      else if (e.key === 'Home') u = 0; else if (e.key === 'End') u = 1; else return;
      e.preventDefault(); S.cu[i] = clamp(u, 0, 1); wake(); announce(cursorSpeech);
    });
  });
  const trigSpeech = () => 'Trigger level ' + spoken(fmtV(trigV())) + (S.untrig ? ', no trigger, trace rolling' : ', triggered');
  function setTrigFromY(yCanvas) {
    sig(0, S.phase);
    S.trigL = clamp((S.cy + sOff * S.D - yCanvas) / (sAmp * S.D), -1.3, 1.3);
    S.trigHold = 1.5; wake(); announce(trigSpeech);
  }
  bindDrag(trigHandle, e => setTrigFromY(e.clientY - band.getBoundingClientRect().top + PAD));
  trigHandle.addEventListener('pointerenter', () => { S.trigHover = true; wake(); });
  trigHandle.addEventListener('pointerleave', () => { S.trigHover = false; wake(); });
  trigHandle.addEventListener('blur', () => { S.trigHold = 0; wake(); });
  trigHandle.addEventListener('keydown', e => {
    const step = e.shiftKey ? .2 : .05; let L = S.trigL;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') L += step;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') L -= step;
    else if (e.key === 'Home') L = -1.3;
    else if (e.key === 'End') L = 1.3; else return;
    e.preventDefault(); S.trigL = clamp(L, -1.3, 1.3); S.trigHold = 1.5; wake(); announce(trigSpeech);
  });

  /* Keyboard on the screen itself. */
  band.addEventListener('keydown', e => {
    if (e.target !== band) return;
    if (S.view) {
      const st = S.W / FK * (e.shiftKey ? FP : 1); let x = S.probeX < 0 ? S.W / FH : S.probeX;
      if (e.key === 'ArrowLeft') x -= st; else if (e.key === 'ArrowRight') x += st; else return;
      e.preventDefault(); S.probeX = clamp(x, 0, S.W); S.probeOn = !S.cursors; wake();
      announce(() => spoken(`${fmtHz(S.probeX / S.W * FH * MODES[S.mT].f)}, ${fmtDb(specAt(S.probeX / S.W))}`));
      return;
    }
    let c = S.cycT, a = S.ampT;
    if (e.key === 'ArrowLeft') c /= 1.12; else if (e.key === 'ArrowRight') c *= 1.12;
    else if (e.key === 'ArrowUp') a += .08; else if (e.key === 'ArrowDown') a -= .08;
    else if (e.key === 'Home') { c = CYC; a = AMP; } else return;
    e.preventDefault();
    S.cycT = clamp(c, 1.6, 6.4); S.ampT = clamp(a, .6, 1.7);
    if (!S.cursors) { S.probeX = S.W / 2; S.probeOn = true; }
    wake();
    announce(() => spoken(`Time ${fmtTime(S.cycT / MODES[S.mT].f / (S.W / S.D))} per division, ${(VREF / S.ampT).toFixed(2)} V per division`));
  });
  band.addEventListener('focus', e => { if (e.target === band) S.focusProbe = true; });
  band.addEventListener('blur', e => { if (e.target === band) { S.focusProbe = false; S.probeOn = false; wake(); } });

  let heroVisible = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; S.visible = heroVisible && !document.hidden; hero.classList.toggle('is-paused', !S.visible || !S.running); wake(); }).observe(hero);
  document.addEventListener('visibilitychange', () => { S.visible = heroVisible && !document.hidden; wake(); });


  /* ---------------- Project rigs ---------------- */
  const ticks = $('.rig[data-rig="lander"] .ticks');
  if (ticks) {
    let d = '';
    for (let a = 0; a < 360; a += 10) {
      const r = a * Math.PI / 180, r1 = a % 30 === 0 ? 136 : 141;
      d += `M${(320 + r1 * Math.sin(r)).toFixed(1)} ${(200 - r1 * Math.cos(r)).toFixed(1)}L${(320 + 146 * Math.sin(r)).toFixed(1)} ${(200 - 146 * Math.cos(r)).toFixed(1)}`;
    }
    const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('class', 'st'); ticks.append(p);
  }
  const later = (st, fn, ms) => st.timers.push(setTimeout(() => { if (st.alive) fn(); }, ms));
  const moveBar = (svg, k) => {
    const lbl = svg.querySelectorAll('.mode-lbl')[k]; if (!lbl) return;
    const bb = lbl.getBBox();
    if (bb.width) svg.querySelector('.mode-bar').style.transform = `translate(${bb.x.toFixed(1)}px,${(bb.y + bb.height + 5).toFixed(1)}px) scaleX(${bb.width.toFixed(1)})`;
  };
  const fitBars = () => $$('.rig[data-rig="optics"]').forEach(svg => moveBar(svg, ['tint', 'hue', 'strobe', 'occlusion'].indexOf(svg.dataset.mode || 'tint')));
  const RIGS = {
    lander: {
      start(svg, st) {
        const rotor = svg.querySelector('.rotor'), halls = $$('.hall', svg), pos = svg.querySelector('[data-out="pos"]');
        const step = () => {
          const idx = +(svg.dataset.idx || 0), from = idx * 60, to = from + 60, next = (idx + 1) % 6;
          halls.forEach(h => h.removeAttribute('data-on'));
          const a = rotor.animate([
            { transform: `rotate(${from}deg)`, easing: 'cubic-bezier(.5,0,.2,1)' },
            { transform: `rotate(${to + 1.6}deg)`, offset: .74, easing: 'cubic-bezier(.3,0,.3,1)' },
            { transform: `rotate(${to}deg)` }
          ], { duration: 1000, fill: 'forwards' });
          a.onfinish = () => {
            if (!st.alive) return;
            rotor.style.transform = `rotate(${next * 60}deg)`; a.cancel();
            svg.dataset.idx = next; halls[next].setAttribute('data-on', '1');
            pos.textContent = `D${next + 1} · ${String(next * 60).padStart(3, '0')}°`;
          };
        };
        later(st, step, 250);
      },
      stop(svg) {
        const idx = +(svg.dataset.idx || 0);
        svg.querySelector('.rotor').style.transform = `rotate(${idx * 60}deg)`;
        $$('.hall', svg).forEach((h, i) => { if (i === idx) h.setAttribute('data-on', '1'); else h.removeAttribute('data-on'); });
        svg.querySelector('[data-out="pos"]').textContent = `D${idx + 1} · ${String(idx * 60).padStart(3, '0')}°`;
      }
    },
    soil: {
      start(svg, st) {
        const out = svg.querySelector('[data-out="infer"]');
        const run = () => {
          svg.dataset.phase = 'sense'; out.textContent = 'Sampling…';
          later(st, () => { svg.dataset.phase = 'send'; out.textContent = 'Classifying…'; }, 1300);
          later(st, () => { svg.dataset.phase = 'show'; out.textContent = 'Example'; }, 2300);
        };
        run();
      },
      stop(svg) { svg.dataset.phase = 'idle'; svg.querySelector('[data-out="infer"]').textContent = 'Example'; }
    },
    optics: {
      start(svg, st) {
        const out = svg.querySelector('[data-out="mode"]'), labels = ['Tint', 'Hue', 'Strobe', 'Occlusion'], names = ['tint', 'hue', 'strobe', 'occlusion'];
        svg.querySelector('.pod').animate([{ transform: 'translateX(28px)', opacity: .3 }, { transform: 'translateX(-2px)', opacity: 1, offset: .8 }, { transform: 'translateX(0)' }], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' });
        let k = 0;
        const cycle = () => { svg.dataset.mode = names[k]; out.textContent = labels[k]; moveBar(svg, k); k++; if (k < names.length) later(st, cycle, 1300); };
        later(st, cycle, 450);
      },
      stop(svg) { svg.dataset.mode = 'tint'; svg.querySelector('[data-out="mode"]').textContent = 'Tint'; moveBar(svg, 0); }
    },
    grid: {
      start(svg, st) {
        const out = svg.querySelector('[data-out="scenario"]'), cells = $$('.cell', svg);
        const lv = n => cells.forEach((c, j) => c.toggleAttribute('data-on', j < n));
        const run = () => {
          svg.dataset.state = 'normal'; out.textContent = 'Grid-tied'; lv(4);
          later(st, () => { svg.dataset.state = 'outage'; out.textContent = 'Grid outage · islanded'; }, 2200);
          [3, 2, 1].forEach((n, j) => later(st, () => lv(n), 3100 + j * 900));
          later(st, () => { svg.dataset.state = 'normal'; out.textContent = 'Grid restored'; }, 6000);
          [2, 3, 4].forEach((n, j) => later(st, () => lv(n), 6500 + j * 450));
          later(st, run, 8600);
        };
        run();
      },
      stop(svg) {
        svg.dataset.state = 'outage'; svg.querySelector('[data-out="scenario"]').textContent = 'Grid outage · islanded';
        $$('.cell', svg).forEach((c, j) => c.toggleAttribute('data-on', j < 3));
      }
    }
  };
  const rigState = new WeakMap();
  const cards = $$('.project').filter(c => c.querySelector('.rig'));
  let hovered = null, activeCard = null;
  function startRig(card) {
    const svg = card.querySelector('.rig'), st = { timers: [], alive: true };
    rigState.set(svg, st); svg.classList.add('is-live'); card.classList.add('is-live');
    RIGS[svg.dataset.rig].start(svg, st);
  }
  function stopRig(card) {
    const svg = card.querySelector('.rig'), st = rigState.get(svg);
    if (st) { st.alive = false; st.timers.forEach(clearTimeout); }
    svg.getAnimations({ subtree: true }).forEach(a => a.cancel());
    svg.classList.remove('is-live'); card.classList.remove('is-live');
    RIGS[svg.dataset.rig].stop(svg);
    svg.getAnimations({ subtree: true }).forEach(a => a.cancel());
  }
  function pickCard() {
    if (document.hidden) { if (activeCard) stopRig(activeCard); activeCard = null; return; }
    if (reduce) return;
    let best = null; const vh = innerHeight;
    if (hovered) {
      const r = hovered.querySelector('.art').getBoundingClientRect();
      const vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (vis >= Math.min(r.height, vh) * .55) best = hovered;
    }
    if (!best) {
      let bd = Infinity;
      for (const c of cards) {
        const r = c.querySelector('.art').getBoundingClientRect();
        const vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (vis < Math.min(r.height, vh) * .55) continue;
        const d = Math.abs((r.top + r.bottom) / 2 - vh / 2);
        if (d < bd - 1) { bd = d; best = c; }
      }
    }
    if (best !== activeCard) { if (activeCard) stopRig(activeCard); activeCard = best; if (best) startRig(best); }
  }
  document.addEventListener('visibilitychange', pickCard);
  cards.forEach(c => {
    c.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && canHover.matches) { hovered = c; pickCard(); } });
    c.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && hovered === c) { hovered = null; pickCard(); } });
    c.addEventListener('focusin', () => { hovered = c; pickCard(); });
    c.addEventListener('focusout', e => { if (!c.contains(e.relatedTarget) && hovered === c) { hovered = null; pickCard(); } });
  });
  motionPreference.addEventListener('change', e => {
    reduce = e.matches;
    if (reduce) {
      if (S.booting) finishBoot();
      setRunning(false);
      cards.forEach(card => {
        stopRig(card);
        card.querySelector('.rig').getAnimations({ subtree: true }).forEach(a => a.cancel());
      });
      activeCard = null;
    }
  });

  /* ---------------- Scroll-driven signal morph ---------------- */
  let scrollMode = -1;
  function scrollMorph() {
    const r = band.getBoundingClientRect(), q = (r.top + r.height / 2) / innerHeight;
    const sm = q > .4 ? 0 : q > .2 ? 1 : 2;
    if (sm !== scrollMode) { const first = scrollMode === -1; scrollMode = sm; if (!first || sm !== 0) setMode(sm); }
  }

  let ticking = false;
  const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; scrollMorph(); pickCard(); }); };
  addEventListener('scroll', onScroll, { passive: true });
  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); fitBars(); pickCard(); }, 120); });

  /* ---------------- Init ---------------- */
  const init = () => {
    resize();
    if (reduce) { setRunning(false); hero.classList.add('is-booted'); runMeters(); }
    else wake();
    fitBars(); scrollMorph(); pickCard();
    setTimeout(() => { if (S.booting) { finishBoot(); trigger(0); fillAll(); } }, 3400);
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(init); else init();
})();
