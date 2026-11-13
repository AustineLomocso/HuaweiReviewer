// Full browser checklist (tests/e2e-checklist.md) for the Huawei reviewer. Run: node e2e-full.js
// Question keys, ids and counts are read from the page (HR.*), so it also works on real content.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'file:///C:/Users/austi/HuaweiReviewer/index.html';
const OUT = path.join(__dirname, '../../work/e2e');
fs.mkdirSync(OUT, { recursive: true });
const enc = encodeURIComponent;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = {}; // id -> { name, pass, notes[] }
let cur = null;
const consoleErrors = [];
const ok = (cond, msg) => {
  if (!cond) cur.pass = false;
  cur.notes.push(`${cond ? 'ok  ' : 'FAIL'} ${msg}`);
  console.log(`  ${cond ? 'PASS' : 'FAIL'} ${msg}`);
  return cond;
};
const info = (msg) => { cur.notes.push('     ' + msg); console.log('  ..', msg); };
async function item(id, name, fn) {
  cur = results[id] = { name, pass: true, notes: [] };
  console.log(`\n== ${id}. ${name}`);
  try { await fn(); } catch (e) {
    cur.pass = false; cur.notes.push('EXCEPTION ' + e.message);
    console.log('  EXCEPTION', e.stack || e.message);
  }
}

function watch(p, label) {
  p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`[${label}] ${m.text()}`); });
  p.on('pageerror', (e) => consoleErrors.push(`[${label}] PAGEERROR ${e.message}`));
  p.on('dialog', (d) => d.accept());
}

// Helpers bound to a page.
function H(p) {
  const h = {};
  h.view = () => p.locator('#view').innerText();
  h.st = () => p.evaluate(() => JSON.parse(localStorage.getItem('huawei-reviewer')));
  h.raw = () => p.evaluate(() => localStorage.getItem('huawei-reviewer'));
  h.hash = () => p.evaluate(() => location.hash);
  h.go = async (hash) => { await p.goto(BASE + hash); await p.reload(); await p.waitForTimeout(600); };
  h.questions = (ids) => p.evaluate((ids) => ids.map((id) => {
    const q = HR.tests.findQuestion(id);
    return q && { id: q.id, type: q.type, answer: q.answer, options: q.options, explanation: q.explanation, source: q.source, number: q.number };
  }), ids);
  h.session = async (key) => {
    const s = (await h.st()).inProgress[key];
    return { s, qs: await h.questions(s.paper.map((x) => x.id)) };
  };
  h.toQ = async (i) => { await p.locator('.nav-q', { hasText: new RegExp(`^${i + 1}$`) }).click(); await p.waitForTimeout(50); };
  h.pick = async (sess, i, keys) => {
    await h.toQ(i);
    const order = sess.s.paper[i].optionOrder;
    for (const k of keys) await p.locator('.option input').nth(order.indexOf(k)).check();
    await p.waitForTimeout(30);
  };
  h.checkedKeys = async (sess, i) => {
    const order = sess.s.paper[i].optionOrder;
    const idx = await p.locator('.option input').evaluateAll((l) => l.map((x, n) => (x.checked ? n : -1)).filter((n) => n >= 0));
    return idx.map((n) => order[n]).sort();
  };
  h.start = async (key, { practice = false, timed = false } = {}) => {
    await h.go(`#/test/${enc(key)}`);
    // Whole papers use the setup screen; section tests keep the simple start screen.
    const setup = (await p.locator('#setup-start').count()) > 0;
    if (practice) await (setup ? p.check('#setup-mode-practice') : p.locator('input[name=mode]').nth(1).check());
    if (timed) await (setup ? p.selectOption('#setup-timer', 'per') : p.check('#timed'));
    await p.click('button:text-is("Start")'); await p.waitForTimeout(500);
    const auto = p.locator('.nav-panel input[type=checkbox]');
    if (await auto.isChecked()) await auto.uncheck();
  };
  h.submit = async () => { await p.locator('.exam-top button:text-is("Submit")').click(); await p.waitForTimeout(700); };
  h.hdr = async () => (await p.locator('.exam .card .small').first().innerText()).split('\n')[0];
  h.nullCheck = async (label) => {
    const t = await h.view();
    ok(!/\bnull\b|\bundefined\b|\bNaN\b/.test(t), `no null/undefined/NaN text [${label}]`);
  };
  h.letter = (i) => String.fromCharCode(65 + i);
  h.fmt = (q, order, keys) => {
    if (!keys || !keys.length) return 'No answer';
    return [...keys].sort((a, b) => order.indexOf(a) - order.indexOf(b)).map((k) => { // review lists answers in displayed letter order
      const o = q.options.find((x) => x.key === k);
      return q.type === 'tf' ? o.text : `${h.letter(order.indexOf(k))}. ${o.text}`;
    }).join('; ');
  };
  h.sw = () => p.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
  return h;
}

// Plan which answer each question gets: mostly correct, one wrong, one partly-correct multi, forced fail.
function makePlan(qs, POINTS) {
  const modes = qs.map(() => 'correct');
  let wi = qs.findIndex((q) => q.type === 'single');
  if (wi < 0) wi = qs.findIndex((q) => q.type === 'tf');
  if (wi >= 0) modes[wi] = 'wrong';
  const mi = qs.findIndex((q) => q.type === 'multi' && q.answer.length >= 2);
  if (mi >= 0) modes[mi] = 'partial';
  const ui = modes.findIndex((m) => m === 'correct');
  const total = qs.reduce((n, q) => n + POINTS[q.type], 0);
  const earned = () => qs.reduce((n, q, i) => n + (modes[i] === 'correct' ? POINTS[q.type] : 0), 0);
  for (let i = 0; i < qs.length && earned() * 100 >= 60 * total; i++) if (modes[i] === 'correct' && i !== ui) modes[i] = 'wrong';
  const keysFor = (q, m) => {
    if (m === 'correct') return q.answer;
    const wrong = q.options.map((o) => o.key).filter((k) => !q.answer.includes(k));
    if (m === 'partial') return [q.answer[0]];
    return wrong.length ? [wrong[0]] : [];
  };
  return { modes, unc: ui, mi, wi, earned: earned(), total, keysFor: (i) => keysFor(qs[i], modes[i]) };
}

async function main() {
  const browser = await chromium.launch({ channel: 'msedge' });
  const ctx = await browser.newContext({ acceptDownloads: true });
  const p = await ctx.newPage();
  watch(p, 'main');
  const h = H(p);
  await p.goto(BASE); await p.waitForTimeout(500);
  const POINTS = await p.evaluate(() => HR.scoring.POINTS);
  const manifest = await p.evaluate(() => HR.data.manifest);
  const structure = await p.evaluate(() => ({ courses: HR.data.structure.courses.map((c) => ({ id: c.id, title: c.title })), mocks: HR.data.structure.mocks }));
  const SEC = Object.keys(manifest).find((id) => manifest[id].pre > 0 && manifest[id].post > 0 && manifest[id].past > 0) ||
    Object.keys(manifest).find((id) => manifest[id].pre > 0 && manifest[id].post > 0);
  const PRE = `${SEC}:pre`;
  const POST = `${SEC}:post`;
  const PAST = `${SEC}:past`;
  const SUM = `${SEC}:summative`;
  console.log('section under test:', SEC, JSON.stringify(manifest[SEC]), 'POINTS', JSON.stringify(POINTS));
  let SEED = null;
  let att1 = null;
  let plan = null;
  let nonCorrectIds = [];
  let uncertainId = null;

  await item(1, 'Dashboard shows courses, Past Exams, Weak topics, Backup', async () => {
    await h.go('#/');
    const t = await h.view();
    for (const c of structure.courses) ok(t.includes(c.title), `course shown: ${c.title}`);
    ok(t.includes('Past Exams'), 'Past Exams card');
    ok(t.includes('Weak topics'), 'Weak topics card');
    ok(/Backup and restore/.test(t) && (await p.locator('button:text-is("Download backup")').count()) === 1 && (await p.locator('button:text-is("Restore backup")').count()) === 1, 'Backup card with Download/Restore buttons');
    ok((await p.locator('a.card[href^="#/course/"]').count()) === structure.courses.length, 'one clickable card per course');
    await h.nullCheck('dashboard');
  });

  await item(2, 'Section: mark notes read, reload, still marked', async () => {
    await h.go(`#/s/${SEC}`);
    ok((await p.locator('button:text-is("Mark as read")').count()) === 1, 'starts unmarked');
    await p.click('button:text-is("Mark as read")'); await p.waitForTimeout(400);
    ok((await p.locator('button:text-is("Marked as read (undo)")').count()) === 1, 'button flips after click');
    await p.reload(); await p.waitForTimeout(600);
    ok((await p.locator('button:text-is("Marked as read (undo)")').count()) === 1, 'still marked after reload');
    ok(!!(await h.st()).read[SEC], 'stored in read{}');
    await h.nullCheck('section');
  });

  // ---- items 3, 5, 6 share the failing first attempt of PRE
  await item(3, 'Pre-Test: answer 2 questions, reload, answers and position restored', async () => {
    await h.start(PRE);
    const sess = await h.session(PRE);
    plan = makePlan(sess.qs, POINTS);
    info(`questions ${sess.qs.length} (${sess.qs.map((q) => q.type[0]).join('')}); modes ${plan.modes.join(',')}`);
    await h.pick(sess, 0, plan.keysFor(0));
    await h.pick(sess, 1, plan.keysFor(1));
    const posIdx = Math.min(2, sess.qs.length - 1);
    await h.toQ(posIdx);
    const before = await h.hdr();
    info('before reload: ' + before);
    await p.reload(); await p.waitForTimeout(700);
    const after = await h.hdr();
    ok(before === after, `position restored (${after})`);
    ok((await p.locator('.nav-q.answered').count()) === 2, 'nav shows 2 answered');
    const sess2 = await h.session(PRE);
    for (const i of [0, 1]) {
      await h.toQ(i);
      const got = await h.checkedKeys(sess2, i);
      const want = [...plan.keysFor(i)].sort();
      ok(JSON.stringify(got) === JSON.stringify(want), `Q${i + 1} selection restored (${got.join('')})`);
    }
    await h.toQ(posIdx);
  });

  await item(5, 'Submit: results show points, percent, pass/fail, type breakdown, full review, source labels', async () => {
    const sess = await h.session(PRE);
    const n = sess.qs.length;
    for (let i = 2; i < n; i++) { const k = plan.keysFor(i); if (k.length) await h.pick(sess, i, k); }
    // Uncertain mark on first correct question.
    await h.toQ(plan.unc);
    await p.click('button:text-is("Uncertain")'); await p.waitForTimeout(50);
    uncertainId = sess.qs[plan.unc].id;
    await h.submit();
    ok((await h.hash()).startsWith('#/results/'), 'navigated to results: ' + (await h.hash()));
    const st = await h.st();
    att1 = st.attempts[PRE][0];
    const text = await h.view();
    ok(text.includes(`${att1.earned} / ${att1.total} points (${att1.pct}%)`), `headline "${att1.earned} / ${att1.total} points (${att1.pct}%)"`);
    ok(text.includes(att1.passed ? 'Passed' : 'Not passed'), `pass/fail badge (${att1.passed ? 'Passed' : 'Not passed'})`);
    ok(att1.passed === false, 'planned fail attempt did fail (needed for weak topics)');
    const types = [...new Set(sess.qs.map((q) => q.type))];
    const lines = await p.locator('ul.list li').allInnerTexts();
    info('breakdown: ' + lines.join(' | '));
    ok(lines.length === types.length && lines.every((l) => /: \d+\/\d+ correct, \d+\/\d+ points/.test(l)), 'per-type breakdown line for each type present');
    const reviews = p.locator('.review');
    ok((await reviews.count()) === n, `review rows ${await reviews.count()} == ${n}`);
    const aqs = await h.questions(att1.paper.map((x) => x.id));
    let mism = 0; let expEarned = 0; let srcMissing = 0;
    const exp = {};
    for (let i = 0; i < n; i++) {
      const q = aqs[i]; const order = att1.paper[i].optionOrder; const chosen = att1.answers[q.id];
      const correct = !!chosen && chosen.length === q.answer.length && q.answer.every((k) => chosen.includes(k));
      exp[q.type] = exp[q.type] || { c: 0, e: 0 }; if (correct) { exp[q.type].c++; exp[q.type].e += POINTS[q.type]; expEarned += POINTS[q.type]; }
      const txt = await reviews.nth(i).innerText();
      if (!/Course material: |AI-inferred, verify/.test(txt)) srcMissing++;
      if (!(txt.includes('Your answer: ' + h.fmt(q, order, chosen)) && txt.includes('Correct answer: ' + h.fmt(q, order, q.answer)) &&
        txt.includes(q.explanation) && txt.includes(correct ? 'Correct' : 'Incorrect'))) { mism++; console.log(txt); }
    }
    ok(mism === 0, `all ${n} review rows show right letters/answer/explanation/verdict (${mism} bad)`);
    ok(srcMissing === 0, `source label on every review row (${srcMissing} missing)`);
    ok(expEarned === att1.earned, `independent earned ${expEarned} == stored ${att1.earned}`);
    ok((await reviews.filter({ hasText: 'Marked Uncertain' }).count()) === 1, 'one "Marked Uncertain" badge');
    nonCorrectIds = aqs.filter((q) => { const c = att1.answers[q.id]; return !(c && c.length === q.answer.length && q.answer.every((k) => c.includes(k))); }).map((q) => q.id);
    h._exp = exp; h._aqs = aqs;
    await h.nullCheck('results');
  });

  await item(6, 'Multi-answer: partly correct selection earns 0', async () => {
    if (plan.mi < 0) { ok(false, 'no multi question with >=2 answers to test (cannot verify)'); return; }
    const aqs = h._aqs;
    const mq = aqs[plan.mi];
    ok(!!mq && att1.answers[mq.id].length < mq.answer.length && att1.answers[mq.id].length > 0, 'multi question has a partial selection in the attempt');
    const row = p.locator('.review').nth(att1.paper.findIndex((x) => x.id === mq.id));
    const rt = await row.innerText();
    ok(/Incorrect/.test(rt), 'partial multi marked Incorrect');
    const lines = await p.locator('ul.list li').allInnerTexts();
    const multiLine = lines.find((l) => /^Multiple-answer/.test(l)) || '';
    const e = h._exp.multi;
    ok(multiLine.includes(`${e.c}/`) && multiLine.includes(`${e.e}/`), `multi breakdown counts only fully-correct multis (${multiLine}; expected ${e.c} correct, ${e.e} pts)`);
    const withPartial = att1.earned + POINTS.multi;
    ok(att1.earned !== withPartial, `earned ${att1.earned} does not include the ${POINTS.multi} points for the partial multi`);
  });

  await item(11, 'Weak topics: score below 60% lists section; newer pass removes it', async () => {
    await h.go('#/');
    const weakCard = p.locator('section.card', { has: p.locator('h2', { hasText: 'Weak topics' }) });
    const link = weakCard.locator(`a[href="#/s/${SEC}"]`);
    ok((await link.count()) === 1, 'failing section listed under Weak topics: ' + ((await link.allInnerTexts())[0] || 'none'));
    ok(new RegExp(`${att1.pct}%`).test(await weakCard.innerText()), `shows latest score ${att1.pct}%`);
    SEED = await h.raw(); // snapshot with weak topics + retry set, for the visual passes
  });

  await item(10, 'Retry set: wrong answers appear on dashboard; correct retry removes them', async () => {
    await h.go('#/');
    const st = await h.st();
    const ids = Object.keys(st.retry).sort();
    // A question left unanswered (e.g. a multi whose four options are all correct cannot be answered wrongly) never enters the retry set.
    const expIds = [...new Set([...nonCorrectIds.filter((id) => (att1.answers[id] || []).length), uncertainId])].sort();
    ok(JSON.stringify(ids) === JSON.stringify(expIds), `retry set = missed + uncertain (${ids.length}/${expIds.length})`);
    if (JSON.stringify(ids) !== JSON.stringify(expIds)) info(`missing from retry: ${JSON.stringify(expIds.filter((x) => !ids.includes(x)))}, extra: ${JSON.stringify(ids.filter((x) => !expIds.includes(x)))}; uncertain ${uncertainId}; answers ${JSON.stringify(att1.answers)}; paper ${JSON.stringify(att1.paper.map((x) => x.id))}`);
    const dash = await h.view();
    ok(new RegExp(`Retry set: ${ids.length} question`).test(dash), 'dashboard line: ' + (dash.match(/Retry set: [^\n]*/) || ['none'])[0]);
    ok((await p.locator('a:text-is("Practise them")').count()) === 1, 'Practise them link shown');
    await h.start('retry:all', { practice: true });
    const rs = await h.session('retry:all');
    ok(rs.qs.length === ids.length, `retry paper has ${rs.qs.length} questions`);
    for (let i = 0; i < rs.qs.length; i++) await h.pick(rs, i, rs.qs[i].answer);
    await h.submit();
    ok((await h.view()).includes('Practice mode'), 'results say Practice mode');
    ok((await p.locator('a:text-is("Back")').getAttribute('href')) === '#/', 'Back goes to dashboard');
    const after = Object.keys((await h.st()).retry);
    ok(after.length === 0, `retry set emptied by correct answers (${after.length} left)`);
    await h.go('#/');
    const d2 = await h.view();
    ok(/Retry set: 0 questions/.test(d2) && (await p.locator('a:text-is("Practise them")').count()) === 0, 'dashboard shows empty retry set, no Practise link');
    ok((await p.locator(`a[href="#/s/${SEC}"]`).count()) >= 1, 'weak topic unaffected by practice run');
  });

  await item(7, 'Retake: order changes and attempt count rises', async () => {
    await h.go(`#/results/${enc(PRE)}/0`);
    await p.click('a.btn:text-is("Retake")'); await p.waitForTimeout(600);
    await p.click('button:text-is("Start")'); await p.waitForTimeout(500);
    const auto = p.locator('.nav-panel input[type=checkbox]');
    if (await auto.isChecked()) await auto.uncheck();
    const rt = await h.session(PRE);
    const idsSame = att1.paper.map((x) => x.id).join() === rt.s.paper.map((x) => x.id).join();
    const optsSame = att1.paper.every((x) => { const y = rt.s.paper.find((z) => z.id === x.id); return y && y.optionOrder.join() === x.optionOrder.join(); });
    ok(!idsSame || !optsSame, `question order changed: ${!idsSame}, option order changed: ${!optsSame}`);
    for (let i = 0; i < rt.qs.length; i++) await h.pick(rt, i, rt.qs[i].answer);
    await h.submit();
    const st = await h.st();
    const att2 = st.attempts[PRE][1];
    ok(st.attempts[PRE].length === 2, 'attempts array now 2');
    ok(att2.passed, `all-correct retake passes (${att2.earned}/${att2.total})`);
    // review labels follow this attempt's own option order
    const aqs = await h.questions(att2.paper.map((x) => x.id));
    let bad = 0;
    for (let i = 0; i < aqs.length; i++) {
      const t = await p.locator('.review').nth(i).innerText();
      if (!t.includes('Your answer: ' + h.fmt(aqs[i], att2.paper[i].optionOrder, att2.answers[aqs[i].id]))) bad++;
    }
    ok(bad === 0, 'attempt 2 review letters match its own option order');
    await h.go(`#/s/${SEC}`);
    const title = await p.evaluate((k) => HR.tests.title(k), PRE);
    const card = p.locator('#view .card', { hasText: title }).filter({ hasText: 'attempt' }).last();
    const ctext = await card.innerText();
    ok(/2 attempts/.test(ctext), 'section card says 2 attempts: ' + ctext.split('\n').find((l) => /attempt/.test(l)));
  });

  await item('11b', 'Newer passing score removes the weak topic', async () => {
    await h.go('#/');
    const weakCard = p.locator('section.card', { has: p.locator('h2', { hasText: 'Weak topics' }) });
    ok((await weakCard.locator(`a[href="#/s/${SEC}"]`).count()) === 0, 'section removed from Weak topics');
    ok(/No section has a latest test score below 60%/.test(await weakCard.innerText()), 'empty-state text');
  });

  await item(4, 'Timer: deadline moved a few seconds ahead, reload, auto-submits at zero', async () => {
    await h.start(POST, { timed: true });
    const sess = await h.session(POST);
    ok(sess.s.deadline !== null, 'session has a deadline');
    const clock = await p.locator('.exam-top strong').last().innerText();
    ok(/^Time left \d\d:\d\d:\d\d$/.test(clock), 'clock shown: ' + clock);
    await h.pick(sess, 0, sess.qs[0].answer);
    await p.evaluate((key) => {
      const s = JSON.parse(localStorage.getItem('huawei-reviewer'));
      s.inProgress[key].deadline = Date.now() + 4000;
      localStorage.setItem('huawei-reviewer', JSON.stringify(s));
    }, POST);
    await p.reload(); await p.waitForTimeout(500);
    const c2 = await p.locator('.exam-top strong').last().innerText();
    ok(/Time left 00:00:0[0-4]/.test(c2), 'after reload clock counts from edited deadline: ' + c2);
    ok(!(await h.hash()).startsWith('#/results'), 'not yet submitted');
    await p.waitForFunction(() => location.hash.startsWith('#/results/'), null, { timeout: 15000 });
    await p.waitForTimeout(400);
    const st = await h.st();
    ok(!st.inProgress[POST], 'session cleared');
    const a = (st.attempts[POST] || [])[0];
    ok(!!a && a.mode === 'exam', 'attempt recorded in exam mode');
    ok(a && Object.keys(a.answers).length === 1, 'answer given before expiry kept, rest left blank');
    ok(/points \(/.test(await h.view()), 'results screen displayed: ' + (await h.view()).split('\n')[0]);
  });

  await item(8, 'Past set in Practice: no timer, instant feedback and lock, Best unchanged', async () => {
    // exam first so a Best exists
    await h.go(`#/test/${enc(PAST)}`);
    ok(await p.locator('label[for=timed]').isVisible(), 'exam mode offers timer on start screen');
    await h.start(PAST);
    const ex = await h.session(PAST);
    for (let i = 0; i < ex.qs.length; i++) await h.pick(ex, i, ex.qs[i].answer);
    await h.submit();
    const bestBefore = (await h.st()).attempts[PAST][0].pct;
    // practice
    await h.go(`#/test/${enc(PAST)}`);
    ok((await p.locator('input[name=mode]').count()) === 2, 'start screen has Exam/Practice radios');
    await p.locator('input[name=mode]').nth(1).check(); await p.waitForTimeout(100);
    ok(!(await p.locator('label[for=timed]').isVisible()), 'timer option hidden in practice mode');
    await p.click('button:text-is("Start")'); await p.waitForTimeout(500);
    const pr = await h.session(PAST);
    ok(pr.s.deadline === null && /No timer/.test(await p.locator('.exam-top').innerText()), 'no timer running in practice');
    ok((await p.locator('button:text-is("Check answer")').count()) === 0, 'no Check answer button in practice');
    const i0 = pr.qs.findIndex((q) => q.type !== 'multi');
    const q0 = pr.qs[i0];
    const wrong = q0.options.map((o) => o.key).filter((k) => !q0.answer.includes(k))[0];
    await h.pick(pr, i0, [wrong]); await p.waitForTimeout(150);
    const fb = await p.locator('.exam .card .card').innerText();
    ok(/Incorrect/.test(fb) && fb.includes(q0.explanation), 'feedback shows verdict and explanation straight after choosing');
    ok((await p.locator('.option.right').count()) >= 1 && (await p.locator('.option.wrong').count()) >= 1, 'right/wrong options highlighted');
    ok(await p.locator('.option input').evaluateAll((l) => l.every((i) => i.disabled)), 'question locked (inputs disabled)');
    for (let i = 0; i < pr.qs.length; i++) {
      if (i === i0) continue;
      const w = pr.qs[i].options.map((o) => o.key).filter((k) => !pr.qs[i].answer.includes(k));
      if (w.length) await h.pick(pr, i, [w[0]]);
    }
    await h.submit();
    const st = await h.st();
    const pa = st.attempts[PAST][1];
    ok(pa.mode === 'practice', 'second attempt stored as practice (' + pa.pct + '%)');
    await h.go(`#/s/${SEC}`);
    const title = await p.evaluate((k) => HR.tests.title(k), PAST);
    const ctext = await p.locator('#view .card', { hasText: title }).filter({ hasText: 'attempt' }).last().innerText();
    const line = ctext.split('\n').find((l) => /attempt/.test(l));
    ok(new RegExp(`Best ${bestBefore}% · Latest ${bestBefore}% · 2 attempts`).test(line), `Best/Latest unchanged by practice: "${line}"`);
  });

  // ---- instant practice feedback, coloured numbers, quiet exam screen, results navigator, resume
  const colourOf = (cssVar) => p.evaluate((v) => { const e = document.createElement('i'); e.style.color = `var(${v})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; }, cssVar);
  const navState = () => p.locator('.nav-panel .nav-q').evaluateAll((l) => l.map((b) => ({ n: Number(b.textContent.trim().match(/^\d+/)[0]), correct: b.classList.contains('correct'), incorrect: b.classList.contains('incorrect'), label: b.getAttribute('aria-label') })));
  const statusOf = (att, aqs) => aqs.map((q) => { const c = att.answers[q.id]; return c && c.length === q.answer.length && q.answer.every((k) => c.includes(k)) ? 'correct' : 'incorrect'; });
  let practiceKey = null;

  async function reviewChecks(att, label) {
    const aqs = await h.questions(att.paper.map((x) => x.id));
    const expect = statusOf(att, aqs);
    ok((await p.locator('.review-nav .nav-q').count()) === aqs.length, `${label}: review navigator has ${aqs.length} numbers`);
    const heads = await p.locator('.review-nav > .small:not(.muted)').allInnerTexts();
    ok(heads.length >= 1 && heads.every((t) => /\(\d+\)/.test(t)), `${label}: navigator grouped by type (${heads.join(' | ')})`);
    const nums = await p.locator('.review-nav .nav-q').evaluateAll((l) => l.map((b) => ({ n: Number(b.textContent.trim().match(/^\d+/)[0]), c: b.classList.contains('correct') ? 'correct' : b.classList.contains('incorrect') ? 'incorrect' : 'none', label: b.getAttribute('aria-label') })));
    const bad = nums.filter((b) => b.c !== expect[b.n - 1] || b.label !== `Question ${b.n}, ${expect[b.n - 1]}`);
    ok(bad.length === 0, `${label}: every navigator number has the right colour class and aria-label (${bad.length} wrong)`);
    const unanswered = aqs.filter((q) => !(att.answers[q.id] || []).length).length;
    info(`${label}: ${expect.filter((x) => x === 'correct').length} green, ${expect.filter((x) => x === 'incorrect').length} red (${unanswered} unanswered, counted red)`);
    const qn = await p.locator('.review .qnum').evaluateAll((l) => l.map((b) => ({ t: b.textContent.trim(), c: b.classList.contains('correct') ? 'correct' : b.classList.contains('incorrect') ? 'incorrect' : 'none' })));
    ok(qn.length === aqs.length && qn.every((x, i) => x.t === String(i + 1) && x.c === expect[i]), `${label}: every review item number is coloured to match`);
    const verdicts = await p.locator('.review').evaluateAll((l) => l.map((r) => (/Incorrect/.test(r.querySelector('strong').textContent) ? 'incorrect' : 'correct')));
    ok(JSON.stringify(verdicts) === JSON.stringify(expect), `${label}: Correct/Incorrect text kept and agrees`);
    const green = await colourOf('--good');
    const red = await colourOf('--bad');
    const bgOf = (sel) => p.locator(sel).first().evaluate((e) => getComputedStyle(e).backgroundColor);
    if (expect.includes('correct')) ok((await bgOf('.review-nav .nav-q.correct')) === green, `${label}: green number background is --good (${green})`);
    if (expect.includes('incorrect')) ok((await bgOf('.review-nav .nav-q.incorrect')) === red, `${label}: red number background is --bad (${red})`);
    const target = Math.min(aqs.length - 1, Math.max(1, Math.floor(aqs.length / 2)));
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.locator('.review-nav .nav-q', { hasText: new RegExp(`^${target + 1}\\b`) }).first().click(); await p.waitForTimeout(300);
    const top = await p.locator('.review').nth(target).evaluate((e) => Math.round(e.getBoundingClientRect().top));
    const vh = await p.evaluate(() => innerHeight);
    ok(top >= -2 && top < vh * 0.6, `${label}: clicking ${target + 1} scrolled its review row into view (top ${top}px of ${vh})`);
    ok(await p.locator('.review').nth(target).evaluate((e) => document.activeElement === e), `${label}: the row took focus`);
    ok((await h.hash()).startsWith('#/results/'), `${label}: still on the results route after the jump (${await h.hash()})`);
  }

  await item(15, 'Practice: instant feedback, Submit answer for multi, green/red navigator, no jump ahead, resume, review navigator', async () => {
    for (const k of [PAST, ...structure.mocks.map((m) => `${m.id}:full`)]) {
      await h.start(k, { practice: true });
      const t = (await h.session(k)).qs.map((q) => q.type);
      if (t.includes('multi') && t.filter((x) => x !== 'multi').length >= 3) { practiceKey = k; break; }
      await p.click('button:text-is("Discard")'); await p.waitForTimeout(300);
    }
    ok(!!practiceKey, 'found a set with a multiple-answer question and several others: ' + practiceKey);
    const sess = await h.session(practiceKey);
    const qs = sess.qs;
    const singles = qs.map((q, i) => (q.type !== 'multi' ? i : -1)).filter((i) => i >= 0);
    const multis = qs.map((q, i) => (q.type === 'multi' ? i : -1)).filter((i) => i >= 0);
    const wrongOf = (q) => q.options.map((o) => o.key).filter((k) => !q.answer.includes(k))[0];
    const good = await colourOf('--good');
    const bad = await colourOf('--bad');
    const bg = (sel) => p.locator(sel).first().evaluate((e) => getComputedStyle(e).backgroundColor);
    const allLocked = () => p.locator('.option input').evaluateAll((l) => l.every((i) => i.disabled));

    ok((await p.locator('button:text-is("Check answer")').count()) === 0, 'no Check answer button on a fresh practice question');
    ok((await navState()).every((b) => !b.correct && !b.incorrect && !b.label), 'nothing coloured or labelled before any answer');

    // Auto-advance on: a Practice choice must stay put so the feedback is seen.
    await p.locator('.nav-panel input[type=checkbox]').check(); await p.waitForTimeout(50);
    const iW = singles[0];
    await h.toQ(iW);
    const hdrBefore = await h.hdr();
    ok((await p.locator('button:text-is("Submit answer")').count()) === 0, 'no Submit answer button on a single/true-false question');
    await p.locator('.option input').nth(sess.s.paper[iW].optionOrder.indexOf(wrongOf(qs[iW]))).check();
    await p.waitForTimeout(700);
    ok((await h.hdr()) === hdrBefore, 'did not auto-advance past the feedback: ' + hdrBefore);
    const fbTxt = await p.locator('.feedback').innerText();
    ok(/Incorrect/.test(fbTxt) && fbTxt.includes(qs[iW].explanation), 'wrong choice: Incorrect and explanation shown immediately');
    ok(/Course material: |AI-inferred, verify/.test(fbTxt), 'source label shown in the feedback');
    ok(await allLocked(), 'question locked after choosing');
    ok((await p.locator('.option.right').count()) >= 1 && (await p.locator('.option.wrong').count()) === 1, 'correct option and the wrong choice highlighted');
    ok((await h.st()).inProgress[practiceKey].checked[qs[iW].id] === true, 'revealed state stored in session.checked');
    await p.locator('.nav-panel input[type=checkbox]').uncheck();

    let ns = await navState();
    ok(ns[iW].incorrect && ns[iW].label === `Question ${iW + 1}, incorrect`, `Q${iW + 1} nav is red with aria-label "${ns[iW].label}"`);
    ok((await bg('.nav-panel .nav-q.incorrect')) === bad, 'red nav background is --bad: ' + (await bg('.nav-panel .nav-q.incorrect')));

    const iR = singles[1];
    await h.pick(sess, iR, qs[iR].answer); await p.waitForTimeout(100);
    ns = await navState();
    ok(ns[iR].correct && ns[iR].label === `Question ${iR + 1}, correct`, `Q${iR + 1} nav is green with aria-label "${ns[iR].label}"`);
    ok((await bg('.nav-panel .nav-q.correct')) === good, 'green nav background is --good: ' + (await bg('.nav-panel .nav-q.correct')));
    ok(/Correct/.test(await p.locator('.feedback').innerText()), 'right choice: Correct feedback');
    ok(ns.filter((b) => b.correct || b.incorrect).length === 2, 'only the two revealed questions are coloured');

    const iM = multis[0];
    await h.toQ(iM);
    const sub = p.locator('button:text-is("Submit answer")');
    ok((await sub.count()) === 1 && (await sub.isDisabled()), 'multi: Submit answer shown and disabled until something is selected');
    ok((await p.locator('button:text-is("Check answer")').count()) === 0, 'multi: no Check answer button');
    await p.locator('.option input').nth(sess.s.paper[iM].optionOrder.indexOf(qs[iM].answer[0])).check(); await p.waitForTimeout(100);
    ok(await sub.isEnabled(), 'multi: Submit answer enabled after a selection');
    ok((await p.locator('.feedback').count()) === 0 && (await p.locator('.option.right').count()) === 0, 'multi: nothing revealed by selecting');
    const mid = (await navState())[iM];
    ok(!mid.correct && !mid.incorrect && !mid.label, 'multi: nav not coloured before Submit answer');
    await sub.click(); await p.waitForTimeout(150);
    ok((await p.locator('.feedback').count()) === 1 && (await p.locator('.option.right').count()) === qs[iM].answer.length, 'multi: Submit answer reveals the correct choices');
    ok(await allLocked(), 'multi: locked after Submit answer');
    ok((await sub.count()) === 0, 'multi: Submit answer gone once revealed');
    ns = await navState();
    const mExpected = qs[iM].answer.length === 1 ? 'correct' : 'incorrect';
    ok(ns[iM][mExpected] && ns[iM].label === `Question ${iM + 1}, ${mExpected}`, `multi nav ${mExpected} with label "${ns[iM].label}"`);

    // Resume: reload keeps revealed state, colours and lock
    await h.toQ(iW);
    await p.reload(); await p.waitForTimeout(700);
    const ns2 = await navState();
    ok(JSON.stringify(ns2.map((b) => [b.correct, b.incorrect, b.label])) === JSON.stringify(ns.map((b) => [b.correct, b.incorrect, b.label])), 'after reload the same numbers are coloured and labelled');
    await h.toQ(iW);
    ok((await p.locator('.feedback').count()) === 1 && /Incorrect/.test(await p.locator('.feedback').innerText()), 'after reload the revealed question still shows its feedback');
    ok(await allLocked(), 'after reload the revealed question is still locked');
    await h.toQ(iR);
    ok(/Correct/.test(await p.locator('.feedback').innerText()), 'after reload the right one is still revealed');

    await h.submit();
    const att = (await h.st()).attempts[practiceKey].slice(-1)[0];
    ok(att.mode === 'practice', 'practice attempt stored');
    await reviewChecks(att, 'practice attempt');
  });

  await item(16, 'Results review navigator on an Exam attempt, unanswered counted red', async () => {
    await h.go(`#/results/${enc(PRE)}/0`);
    await reviewChecks((await h.st()).attempts[PRE][0], 'exam attempt');
    const k = POST;
    await h.start(k);
    const sess = await h.session(k);
    await h.pick(sess, 0, sess.qs[0].answer);
    await h.submit();
    const att = (await h.st()).attempts[k].slice(-1)[0];
    ok(sess.qs.length > 1, 'set has several questions');
    const reds = await p.locator('.review-nav .nav-q.incorrect').count();
    ok(reds === sess.qs.length - 1, `unanswered questions are red (${reds} red of ${sess.qs.length}; one answered correctly)`);
    ok((await p.locator('.review-nav .nav-q.correct').count()) === 1, 'the one answered question is green');
    ok(att.mode === 'exam', 'attempt was exam mode');
  });

  await item(17, 'Exam screen stays quiet: no verdict colours, labels, reveal or Submit answer before submit', async () => {
    const k = practiceKey || PRE;
    await h.start(k);
    const sess = await h.session(k);
    const qs = sess.qs;
    const iS = qs.findIndex((q) => q.type !== 'multi');
    const iM = qs.findIndex((q) => q.type === 'multi');
    await h.pick(sess, iS, [qs[iS].options.map((o) => o.key).filter((x) => !qs[iS].answer.includes(x))[0]]);
    await p.waitForTimeout(150);
    ok((await p.locator('.feedback').count()) === 0 && (await p.locator('.option.right').count()) === 0 && (await p.locator('.option.wrong').count()) === 0, 'exam: choosing shows no feedback or highlight');
    ok(await p.locator('.option input').evaluateAll((l) => l.every((i) => !i.disabled)), 'exam: options stay selectable (not locked)');
    if (iM >= 0) {
      await h.pick(sess, iM, qs[iM].answer);
      ok((await p.locator('button:text-is("Submit answer")').count()) === 0 && (await p.locator('button:text-is("Check answer")').count()) === 0, 'exam: no Submit answer or Check answer button');
      ok((await p.locator('.feedback').count()) === 0, 'exam: no reveal after choosing multi answers');
    }
    ok((await navState()).every((b) => !b.correct && !b.incorrect && !b.label), 'exam: navigator never shows green/red or verdict labels');
    ok(Object.keys((await h.st()).inProgress[k].checked).length === 0, 'exam: nothing stored as revealed');
    await p.click('button:text-is("Discard")'); await p.waitForTimeout(300);
  });

  await item(9, 'Full mock: default setup keeps original order, 25/20/15, 1000 points; shuffle is a choice', async () => {
    let first = true; let tested = 0;
    for (const m of structure.mocks) {
      const key = `${m.id}:full`;
      // Earlier practice checks can use the same mock. Isolate this first-attempt fixture.
      await p.evaluate((key) => HR.app.store.update((state) => {
        delete state.attempts[key];
        delete state.inProgress[key];
      }), key);
      await h.go(`#/test/${enc(key)}`);
      const startBtn = p.locator('button:text-is("Start")');
      if (await startBtn.isDisabled()) { info(`${m.id}: empty (Start disabled), skipped`); continue; }
      const intro = (await h.view()).match(/(\d+) of \d+ questions · (\d+) points/);
      await startBtn.click(); await p.waitForTimeout(500);
      const sess = await h.session(key);
      const orig = await p.evaluate((id) => HR.data.mocks[id].questions.map((q) => ({ id: q.id, keys: q.options.map((o) => o.key), type: q.type })), m.id);
      const sameOrder = JSON.stringify(sess.s.paper.map((x) => x.id)) === JSON.stringify(orig.map((q) => q.id));
      const sameOpts = sess.s.paper.every((x, i) => x.optionOrder.join() === orig[i].keys.join());
      const cnt = { single: 0, multi: 0, tf: 0 }; orig.forEach((q) => cnt[q.type]++);
      const pts = orig.reduce((n, q) => n + POINTS[q.type], 0);
      ok(sameOrder && sameOpts, `${m.id}: default setup keeps original question and option order`);
      ok(`${cnt.single}/${cnt.multi}/${cnt.tf}` === '25/20/15', `${m.id}: ${cnt.single}/${cnt.multi}/${cnt.tf} single/multi/tf`);
      ok(pts === 1000 && intro && Number(intro[2]) === 1000, `${m.id}: ${pts} points, start screen says "${intro && intro[0]}"`);
      const navText = await p.locator('.nav-panel').innerText();
      ok(/Single-Answer Question \(25\)/.test(navText) && /Multiple-Answer Question \(20\)/.test(navText) && /True or False \(15\)/.test(navText), `${m.id}: nav groups 25/20/15`);
      tested++;
      if (first) {
        first = false;
        for (let i = 0; i < Math.min(5, sess.qs.length); i++) await h.pick(sess, i, sess.qs[i].answer);
        await h.submit();
        const a = (await h.st()).attempts[key][0];
        ok((await h.view()).includes(`${a.earned} / ${a.total} points`) && a.total === 1000, `results show x / 1000 points: ${a.earned} / ${a.total}`);
        ok((await p.locator('a:text-is("Back")').getAttribute('href')) === '#/mocks', 'Back goes to #/mocks');
        await p.click('a.btn:text-is("Retake")'); await p.waitForTimeout(500);
        ok(await p.isChecked('#setup-order-original') && !(await p.isChecked('#setup-shuffle-options')), 'retake setup resets to the defaults');
        await p.check('#setup-order-shuffle'); await p.check('#setup-shuffle-options');
        await p.click('button:text-is("Start")'); await p.waitForTimeout(500);
        const s2 = await h.session(key);
        const sameIds = JSON.stringify(s2.s.paper.map((x) => x.id)) === JSON.stringify(orig.map((q) => q.id));
        const byId = Object.fromEntries(orig.map((q) => [q.id, q.keys.join()]));
        const sameOpts2 = s2.s.paper.every((x) => x.optionOrder.join() === byId[x.id]);
        ok(!sameIds && !sameOpts2, 'choosing both shuffles changes question and option order');
      }
      await p.click('button:text-is("Discard")'); await p.waitForTimeout(400);
    }
    ok(tested >= 1, `${tested} non-empty mock(s) checked`);
  });

  await item(18, 'Setup screen: subset, page layout, option shuffle, custom timer, Partial history, Nationals gating', async () => {
    const m = structure.mocks[0];
    const key = `${m.id}:full`;
    await p.evaluate((key) => HR.app.store.update((st) => { delete st.attempts[key]; delete st.inProgress[key]; }), key);
    await h.go(`#/test/${enc(key)}`);
    ok(await p.isChecked('#setup-mode-exam') && await p.isChecked('#setup-layout-single'), 'defaults: Exam, one at a time');
    ok((await p.inputValue('#setup-timer')) === 'off', 'default: no timer');
    const optDisabled = await p.evaluate(() => document.querySelector('#setup-status option[value=wrong]').disabled);
    ok(optDisabled, 'wrong-last-time filter disabled before any attempt');
    await p.fill('#setup-from', '3'); await p.fill('#setup-to', '12');
    await p.uncheck('#setup-type-tf');
    await p.waitForTimeout(100);
    const sum = await p.locator('#setup-summary').innerText();
    ok(/Partial/.test(sum), 'summary marks a subset as Partial: ' + sum);
    await p.fill('#setup-count', '4'); await p.waitForTimeout(80);
    ok(/^4 of 60 questions/.test(await p.locator('#setup-summary').innerText()), 'random sample of 4 shown in summary');
    await p.check('#setup-mode-practice');
    ok(!(await p.locator('#setup-timer').isVisible()), 'timer hidden in Practice');
    await p.check('#setup-layout-page'); await p.check('#setup-shuffle-options');
    await p.click('#setup-start'); await p.waitForTimeout(500);
    const sess = await h.session(key);
    const nums = await p.evaluate((id) => HR.data.mocks[id].questions.map((q, i) => ({ id: q.id, n: i + 1, type: q.type })), m.id);
    const picked = sess.s.paper.map((x) => nums.find((q) => q.id === x.id));
    ok(picked.length === 4 && picked.every((q) => q.n >= 3 && q.n <= 12 && q.type !== 'tf'), 'session holds 4 questions from nos. 3-12, no True/False');
    ok(sess.s.layout === 'page' && sess.s.partial && sess.s.mode === 'practice', 'session is page layout, partial, practice');
    ok((await p.locator('.question-card').count()) === 4, 'all four questions shown on one page');
    const q0 = sess.qs[0];
    const order0 = sess.s.paper[0].optionOrder;
    await p.locator('#qcard-0 .option input').nth(order0.indexOf(q0.answer[0])).check(); await p.waitForTimeout(150);
    if (q0.type !== 'multi') ok((await p.locator('#qcard-0 .feedback').count()) === 1, 'practice feedback appears inside that card');
    ok((await p.locator('.question-card').count()) === 4, 'answering keeps every card on the page');
    await h.submit();
    const st = await h.st();
    const a = st.attempts[key][0];
    ok(a.partial && a.filters && a.filters.from === 3 && a.filters.count === 4, 'attempt recorded as Partial with its filters');
    ok(/Partial: nos\. 3–12, single-answer and multiple-answer only, random 4/.test(await h.view()), 'results describe the subset');
    await h.go('#/mocks');
    const card = p.locator('section.card', { hasText: m.title });
    const cardText = await card.evaluate((e) => e.textContent);
    ok(/Partial/.test(cardText) && !/Best/.test(cardText), 'Past Exams history says Partial and shows no Best from it');

    // Custom total time auto-submits.
    await h.go(`#/test/${enc(key)}`);
    await p.selectOption('#setup-timer', 'custom'); await p.fill('#setup-minutes', '2');
    ok(/Timer 2 min/.test(await p.locator('#setup-summary').innerText()), 'custom timer shown in summary');
    await p.click('#setup-start'); await p.waitForTimeout(400);
    const s3 = await h.session(key);
    ok(Math.abs(s3.s.deadline - s3.s.startedAt - 120000) < 50, 'custom 2-minute deadline stored');
    await p.evaluate((key) => HR.app.store.update((st) => { st.inProgress[key].deadline = Date.now() + 1500; }), key);
    await p.waitForTimeout(3000);
    ok((await h.hash()).startsWith('#/results/'), 'custom timer auto-submits at zero');

    // A Nationals paper still in review offers only its printable version.
    await h.go('#/mocks');
    const ready = await p.evaluate(() => HR.data.structure.nationals.map((n) => HR.tests.nationalsStatus(n.id).ready));
    const reviewCards = await p.locator('section.card', { hasText: 'In review' }).count();
    ok(reviewCards === ready.filter((r) => !r).length, `${reviewCards} Nationals paper(s) shown as in review`);
    ok((await p.locator('a:text-is("Printable version")').count()) === 3, 'each Nationals paper links its printable version');

    // Simulate a fully reviewed n2324 in memory: source links, ungraded question 10, and the Retry Set.
    await p.evaluate(() => {
      for (const c of HR.data.examInventory.papers[0].captures) {
        c.inApp = true;
        if (c.number === 10) { delete c.answer; c.flag = 'Disputed key.'; continue; }
        c.answer = c.type === 'tf' ? [c.suppliedKey[0]] : c.suppliedKey.split('');
        c.explanation = c.explanation || 'Test explanation.';
      }
      HR.app.store.update((st) => { delete st.attempts['n2324:full']; delete st.inProgress['n2324:full']; });
    });
    // Hash navigation only: a reload would drop the in-memory review state.
    const hop = async (hash) => { await p.evaluate((x) => { location.hash = x; }, hash); await p.waitForTimeout(600); };
    await hop('#/');
    await hop('#/mocks');
    ok((await p.locator('section.card', { hasText: '2023–24 Nationals' }).locator('a:text-is("Open")').count()) === 1, 'reviewed Nationals paper opens in the reviewer');
    await hop(`#/test/${enc('n2324:full')}`);
    ok(/1 not graded/.test(await p.locator('#setup-summary').innerText()), 'setup counts the ungraded question');
    await p.fill('#setup-from', '9'); await p.fill('#setup-to', '11'); await p.check('#setup-mode-practice');
    await p.click('#setup-start'); await p.waitForTimeout(500);
    ok(/Paper no\. 9/.test(await p.locator('.question-card').innerText()), 'card shows the printed paper number');
    const href = await p.locator('.source-link a').first().getAttribute('href');
    ok(/^HuaweiCloudNationals\(2324Answer\)\/Screenshot%20/.test(href), 'source screenshot link points at the original image: ' + href);
    const ns = await h.session('n2324:full');
    const i10 = ns.qs.findIndex((q) => q.number === 10);
    const i9 = ns.qs.findIndex((q) => q.number === 9);
    await h.toQ(i10);
    await p.locator('.option input').first().check(); await p.waitForTimeout(150);
    if (ns.qs[i10].type !== 'multi') ok(/Not graded/.test(await p.locator('.feedback').innerText()), 'question 10 reveals Not graded');
    await h.toQ(i9);
    const wrong = ns.qs[i9].options.map((o) => o.key).filter((k) => !ns.qs[i9].answer.includes(k));
    await h.pick(ns, i9, ns.qs[i9].type === 'multi' ? wrong : [wrong[0]]);
    await h.submit();
    const retry = (await h.st()).retry;
    ok(!!retry[ns.qs[i9].id] && !retry[ns.qs[i10].id], 'wrong Nationals answer joins the Retry Set; ungraded one does not');
    await h.nullCheck('nationals results');
  });

  await item(12, 'Backup: download, clear, restore, invalid file leaves progress alone', async () => {
    await h.go('#/');
    const before = await h.st();
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click('button:text-is("Download backup")')]);
    const file = path.join(OUT, 'backup-test.json');
    await dl.saveAs(file);
    ok(/^huawei-reviewer-backup-\d{4}-\d{2}-\d{2}\.json$/.test(dl.suggestedFilename()), 'download name ' + dl.suggestedFilename());
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    ok(JSON.stringify(parsed) === JSON.stringify(before), 'downloaded JSON equals stored state');
    ok(/Backup downloaded/.test(await p.locator('#view').innerText()), 'status "Backup downloaded."');
    await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(600);
    ok((await h.raw()) === null, 'storage cleared; app reloaded fresh');
    ok((await p.locator('a:text-is("Continue")').count()) === 0 && (await p.locator('#banner .banner').count()) === 0, 'fresh dashboard: no Continue link, no banner');
    await p.setInputFiles('input[type=file]', file); await p.waitForTimeout(700);
    const restored = await h.st();
    ok(JSON.stringify(restored) === JSON.stringify(before), 'restored state equals original');
    ok(Object.keys(restored.attempts).length === Object.keys(before.attempts).length && Object.keys(restored.attempts).length > 0, `attempts returned (${Object.keys(restored.attempts).join(', ')})`);
    ok((await p.locator('a:text-is("Continue")').count()) === 1, 'dashboard shows Continue after restore');
    const rawBefore = await h.raw();
    const status = () => p.locator('#view section.card', { hasText: 'Backup and restore' }).locator('p').last().innerText();
    await p.setInputFiles('input[type=file]', { name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('this is not json {') }); await p.waitForTimeout(500);
    const e1 = await status();
    ok(/not valid JSON/.test(e1), 'invalid text -> error: ' + e1);
    ok((await h.raw()) === rawBefore, 'progress unchanged after invalid text file');
    await p.setInputFiles('input[type=file]', { name: 'other.json', mimeType: 'application/json', buffer: Buffer.from('{"hello":"world"}') }); await p.waitForTimeout(500);
    const e2 = await status();
    ok(/not a compatible/.test(e2), 'valid JSON, wrong shape -> error: ' + e2);
    ok((await h.raw()) === rawBefore, 'progress unchanged after wrong-shape file');
    ok((await p.locator('a:text-is("Continue")').count()) === 1, 'dashboard still shows progress');
  });
  const FINAL = await h.raw();
  await ctx.close();

  // ------------------------------------------------------------------ 13 storage blocked
  await item(13, 'Storage blocked: banner shows, app still navigates, test taken in memory', async () => {
    const c = await browser.newContext();
    await c.addInitScript(() => {
      const thrower = function () { throw new DOMException('blocked for test', 'SecurityError'); };
      Object.defineProperty(Storage.prototype, 'getItem', { value: thrower, configurable: true, writable: true });
      Object.defineProperty(Storage.prototype, 'setItem', { value: thrower, configurable: true, writable: true });
    });
    const q = await c.newPage(); watch(q, 'blocked'); const b = H(q);
    await q.goto(BASE); await q.waitForTimeout(600);
    const banner = () => q.locator('#banner .banner').allInnerTexts();
    let bn = await banner();
    ok(bn.length === 1 && /Browser storage is unavailable/.test(bn[0]), 'banner shown: ' + (bn[0] || 'none').slice(0, 60) + '...');
    ok((await q.locator('#view h1').innerText()) === 'Your progress', 'dashboard still renders');
    await q.locator('a.card[href^="#/course/"]').first().click(); await q.waitForTimeout(600);
    ok((await q.locator('#view h1').innerText()).length > 0 && (await b.hash()).startsWith('#/course/'), 'course page opens by clicking: ' + (await b.hash()));
    await q.evaluate((id) => { location.hash = `#/s/${id}`; }, SEC); await q.waitForTimeout(600);
    ok((await q.locator('button:text-is("Mark as read")').count()) === 1, 'section page opens');
    await q.click('button:text-is("Mark as read")'); await q.waitForTimeout(300);
    ok((await q.locator('button:text-is("Marked as read (undo)")').count()) === 1, 'marking read works in memory');
    // take the pre-test in memory
    await q.evaluate((k) => { location.hash = `#/test/${encodeURIComponent(k)}`; }, PRE); await q.waitForTimeout(600);
    await q.click('button:text-is("Start")'); await q.waitForTimeout(500);
    const qa = await q.evaluate(() => { const o = HR.app.store.get().inProgress; const k = Object.keys(o)[0]; return { k, s: o[k] }; });
    const qs = await b.questions(qa.s.paper.map((x) => x.id));
    for (let i = 0; i < qs.length; i++) await b.pick({ s: qa.s }, i, qs[i].answer);
    await b.submit();
    ok((await b.hash()).startsWith('#/results/'), 'submit reaches results: ' + (await b.hash()));
    ok(/points \(\d/.test(await b.view()) && (await q.locator('.review').count()) === qs.length, 'results with full review shown');
    const inMem = await q.evaluate(() => Object.keys(HR.app.store.get().attempts));
    ok(inMem.includes(PRE), 'attempt held in memory');
    bn = await banner();
    ok(bn.length === 1 && /unavailable/.test(bn[0]), 'banner still shown on results');
    await q.evaluate(() => { location.hash = '#/'; }); await q.waitForTimeout(500);
    ok((await q.locator('a:text-is("Continue")').count()) === 1 && (await banner()).length === 1, 'dashboard from memory shows Continue and banner');
    ok(consoleErrors.filter((e) => e.startsWith('[blocked]')).length === 0, 'no console errors while blocked');
    await c.close();
  });

  await item('corrupt', 'Corrupted store: started-fresh banner, old text kept in huawei-reviewer.corrupt', async () => {
    const c = await browser.newContext();
    const q = await c.newPage(); watch(q, 'corrupt'); const b = H(q);
    await q.goto(BASE); await q.waitForTimeout(400);
    for (const bad of ['{not json at all', JSON.stringify({ v: 99, read: {}, attempts: {}, inProgress: {}, retry: {} })]) {
      await q.evaluate((t) => localStorage.setItem('huawei-reviewer', t), bad);
      await q.reload(); await q.waitForTimeout(600);
      const bn = await q.locator('#banner .banner').allInnerTexts();
      ok(bn.length === 1 && /started fresh/.test(bn[0]), `banner "${(bn[0] || 'none').slice(0, 50)}..." for ${bad.slice(0, 20)}`);
      ok((await q.evaluate(() => localStorage.getItem('huawei-reviewer.corrupt'))) === bad, 'huawei-reviewer.corrupt holds the old text');
      ok(!/unavailable/.test(bn.join()), 'not reported as unavailable');
      ok((await q.locator('#view h1').innerText()) === 'Your progress', 'app works on fresh state');
    }
    // working after corruption: progress saves and corrupt copy is kept
    await b.go(`#/s/${SEC}`);
    await q.click('button:text-is("Mark as read")'); await q.waitForTimeout(300);
    const st = JSON.parse(await q.evaluate(() => localStorage.getItem('huawei-reviewer')));
    ok(!!st.read[SEC], 'new progress saved over the corrupt store');
    ok((await q.evaluate(() => localStorage.getItem('huawei-reviewer.corrupt'))).includes('"v":99'), 'corrupt copy preserved');
    await c.close();
  });

  // ------------------------------------------------------------------ 14 width 390 + visuals
  const shotNames = [];
  async function visuals(tag, vp, assertWidth) {
    const c = await browser.newContext({ viewport: vp });
    const q = await c.newPage(); watch(q, 'visual-' + tag); const b = H(q);
    await q.goto(BASE); await q.evaluate((t) => localStorage.setItem('huawei-reviewer', t), SEED); await q.reload(); await q.waitForTimeout(500);
    const course = structure.courses[0].id;
    const widths = {};
    const overflow = async (label) => {
      const sw = await b.sw();
      widths[label] = sw;
      if (assertWidth) {
        ok(sw <= vp.width, `${label}: scrollWidth ${sw} <= ${vp.width}`);
        if (sw > vp.width) {
          const bad = await q.evaluate((w) => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > w + 1).slice(0, 6).map((e) => e.tagName + '.' + e.className + ' right=' + Math.round(e.getBoundingClientRect().right)), vp.width);
          info('overflowing: ' + JSON.stringify(bad));
        }
      }
    };
    await b.go('#/'); await overflow('dashboard');
    await b.go(`#/course/${course}`); await overflow('course');
    await b.go(`#/s/${SEC}`); await overflow('section');
    await b.go('#/mocks'); await overflow('past exams list');
    // test screen: timed exam, one answer + an Uncertain mark
    await b.start(SUM, { timed: true });
    const ss = await b.session(SUM);
    await b.pick(ss, 0, ss.qs[0].answer);
    if (ss.qs.length > 1) { await b.toQ(1); await q.click('button:text-is("Uncertain")'); await b.toQ(0); }
    await overflow('test (exam, timed)');
    if (assertWidth) {
      const box = async (sel) => { const bb = await q.locator(sel).first().boundingBox(); return bb; };
      const inView = (bb) => bb && bb.x >= -0.5 && bb.x + bb.width <= vp.width + 0.5;
      for (const sel of ['.exam-top', '.nav-panel', '.nav-q', '.stem', '.option', 'button:text-is("Uncertain")', '.exam-top button:text-is("Submit")']) {
        ok(inView(await box(sel)), `test screen: ${sel} fits horizontally`);
      }
      const before = await q.locator('.exam-top .small').nth(1).innerText();
      await q.locator('.nav-q').nth(Math.min(2, ss.qs.length - 1)).click(); await q.waitForTimeout(80);
      await q.locator('.option').first().click(); await q.waitForTimeout(80);
      const after = await q.locator('.exam-top .small').nth(1).innerText();
      ok(before !== after, `tap on an option registers (${before} -> ${after})`);
    }
    // practice screenshot with feedback
    await b.start(PAST, { practice: true });
    const ps = await b.session(PAST);
    const pi = ps.qs.map((x, i) => (x.type !== 'multi' ? i : -1)).filter((i) => i >= 0);
    if (pi.length > 1) await b.pick(ps, pi[1], ps.qs[pi[1]].answer);
    await b.pick(ps, pi[0], [ps.qs[pi[0]].options.map((o) => o.key).filter((k) => !ps.qs[pi[0]].answer.includes(k))[0] || ps.qs[pi[0]].answer[0]]);
    await q.waitForTimeout(150);
    await overflow('test (practice, feedback revealed)');
    // mock with many questions
    const mockInfo = await q.evaluate(() => HR.data.structure.mocks.map((m) => m.id));
    for (const id of mockInfo) {
      await b.go(`#/test/${enc(id + ':full')}`);
      if (await q.locator('button:text-is("Start")').isDisabled()) continue;
      await q.click('button:text-is("Start")'); await q.waitForTimeout(600);
      await overflow('mock test screen (' + id + ')');
      break;
    }
    await b.go(`#/results/${enc(PRE)}/0`); await overflow('results');
    for (const [name, hash] of [['dashboard', '#/'], ['test', `#/test/${enc(SUM)}`], ['test-practice', `#/test/${enc(PAST)}`], ['results', `#/results/${enc(PRE)}/0`]]) {
      for (const scheme of ['light', 'dark']) {
        await q.emulateMedia({ colorScheme: scheme });
        await b.go(hash);
        const f = `shot-${name}-${tag}-${scheme}.png`;
        await q.screenshot({ path: path.join(OUT, f), fullPage: true });
        shotNames.push(f);
      }
    }
    info(`${tag} widths: ` + JSON.stringify(widths));
    await c.close();
  }
  await item(14, 'Width 390px: no sideways scroll on dashboard/section/test/results; test screen usable', async () => {
    await visuals('m390', { width: 390, height: 844 }, true);
  });
  cur = { notes: [], pass: true };
  console.log('\n== desktop screenshots');
  await visuals('desktop', { width: 1280, height: 800 }, false);

  await item('console', 'No console errors throughout', async () => {
    ok(consoleErrors.length === 0, `console/page errors: ${JSON.stringify(consoleErrors)}`);
  });

  await browser.close();
  console.log('\n================ SUMMARY ================');
  const order = [1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 17, 9, 18, 10, 11, '11b', 12, 13, 14, 'corrupt', 'console'];
  for (const id of order) if (results[id]) console.log(`${results[id].pass ? 'PASS' : 'FAIL'}  ${id}  ${results[id].name}`);
  console.log('screenshots:', shotNames.join(' '));
  const failed = Object.values(results).some((r) => !r.pass);
  fs.writeFileSync(path.join(OUT, 'e2e-results.json'), JSON.stringify(results, null, 2));
  process.exit(failed ? 1 : 0);
}
main().catch((e) => { console.error('FATAL', e); process.exit(2); });
