const SIZES = {
  sub: { pre: 5, post: 5, summative: 10 },
  chapter: { pre: 10, post: 10, summative: 20 },
  course: { pre: 60, post: 60, summative: 60 },
};
const MIX = { 5: [2, 2, 1], 10: [4, 3, 3], 20: [8, 7, 5], 60: [25, 20, 15] };
const expectedSize = (level, kind) => SIZES[level][kind];

function checkQuestion(q, pageCounts) {
  const e = [];
  if (!q.stem || !q.stem.trim()) e.push('missing stem');
  if (!q.explanation || !q.explanation.trim()) e.push('missing explanation');
  else if (/\b(option|choice|answer)\s+[A-D]\b/i.test(q.explanation)) e.push('explanation refers to option letters');
  const keys = (q.options || []).map((o) => o.key);
  if (q.type === 'tf') {
    if (keys.join() !== 'T,F') e.push('True/False options must be T and F');
    if ((q.answer || []).length !== 1) e.push('True/False needs exactly one answer');
  } else if (q.type === 'single' || q.type === 'multi') {
    if (keys.join() !== 'A,B,C,D') e.push('needs four options keyed A-D');
    if (new Set((q.options || []).map((o) => o.text)).size !== keys.length) e.push('duplicate option text');
    if (q.type === 'single' && (q.answer || []).length !== 1) e.push('single needs exactly one answer');
    if (q.type === 'multi' && (q.answer || []).length < 2) e.push('multi needs at least two answers');
  } else {
    e.push('unknown type ' + q.type);
  }
  (q.answer || []).forEach((a) => { if (!keys.includes(a)) e.push(`answer ${a} is not an option`); });
  const s = q.source;
  if (!s || !['material', 'inferred'].includes(s.kind)) e.push('missing source');
  else if (s.kind === 'material') {
    if (!pageCounts[s.pdf]) e.push('unknown source pdf');
    if (!s.pages || !s.pages.length || s.pages.some((p) => p < 1 || p > pageCounts[s.pdf])) e.push('bad source page');
  }
  return e;
}

function checkMix(questions) {
  const want = MIX[questions.length];
  if (!want) return [];
  const got = ['single', 'multi', 'tf'].map((t) => questions.filter((q) => q.type === t).length);
  return got.join() === want.join() ? [] : [`mix is ${got.join('/')}, expected ${want.join('/')}`];
}

const tokens = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean));
function similarity(a, b) {
  let shared = 0;
  a.forEach((t) => { if (b.has(t)) shared += 1; });
  return shared / (a.size + b.size - shared || 1);
}

function run() {
  const { loadAll } = require('./lib-load.js');
  const HR = loadAll();
  const errors = [];
  const warnings = [];
  const seen = new Map();
  const generated = [];
  const counts = { material: 0, inferred: 0, generated: 0, past: 0, shortfalls: 0, missing: 0 };
  const pageCounts = Object.fromEntries(HR.data.structure.courses.filter((c) => c.pdf).map((c) => [c.pdf, c.pageCount]));
  const nodeIds = new Set();

  const addId = (id, where) => {
    if (seen.has(id)) errors.push(`${where}: duplicate ID ${id}`);
    seen.set(id, where);
  };
  const tally = (q) => { counts[q.source && q.source.kind === 'material' ? 'material' : 'inferred'] += 1; };

  HR.progress.allNodes(HR.data.structure).forEach(({ node, level }) => {
    nodeIds.add(node.id);
    const s = HR.data.sections[node.id];
    if (!s) { counts.missing += 1; warnings.push(`${node.id}: not yet written`); return; }
    if (!s.notes || !s.notes.length) errors.push(`${node.id}: no notes`);
    (s.notes || []).forEach((n, i) => {
      if (!n.heading || !n.bullets || !n.bullets.length) errors.push(`${node.id}: note ${i} incomplete`);
    });
    for (const kind of ['pre', 'post', 'summative']) {
      const qs = (s.tests && s.tests[kind]) || [];
      const want = expectedSize(level, kind);
      const reason = s.shortfall && s.shortfall[kind];
      if (qs.length !== want) {
        if (reason) { counts.shortfalls += 1; warnings.push(`${node.id}:${kind}: ${qs.length}/${want}. ${reason}`); }
        else errors.push(`${node.id}:${kind}: ${qs.length} questions, expected ${want}, with no shortfall reason`);
      } else {
        checkMix(qs).forEach((m) => errors.push(`${node.id}:${kind}: ${m}`));
      }
      qs.forEach((q, i) => {
        const wantId = `${node.id}-${kind}-${String(i + 1).padStart(2, '0')}`;
        if (q.id !== wantId) errors.push(`${node.id}:${kind}: ID ${q.id}, expected ${wantId}`);
        addId(q.id, node.id);
        checkQuestion(q, pageCounts).forEach((m) => errors.push(`${q.id}: ${m}`));
        tally(q);
        generated.push({ id: q.id, t: tokens(q.stem + ' ' + (q.options || []).map((o) => o.text).join(' ')) });
        counts.generated += 1;
      });
    }
  });

  HR.data.structure.mocks.forEach((m) => {
    const mock = HR.data.mocks[m.id];
    if (!mock) { warnings.push(`${m.id}: not yet transcribed`); return; }
    const types = mock.questions.map((q) => q.type);
    const expected = [...Array(25).fill('single'), ...Array(20).fill('multi'), ...Array(15).fill('tf')];
    if (types.join() !== expected.join()) errors.push(`${m.id}: not 25 single, 20 multi, 15 True/False in order`);
    mock.questions.forEach((q, i) => {
      const wantId = `${m.id}-${String(i + 1).padStart(2, '0')}`;
      if (q.id !== wantId) errors.push(`${m.id}: ID ${q.id}, expected ${wantId}`);
      addId(q.id, m.id);
      checkQuestion(q, pageCounts).forEach((x) => errors.push(`${q.id}: ${x}`));
      if (!q.mergedInto && !nodeIds.has(q.sectionId)) errors.push(`${q.id}: unknown section ${q.sectionId}`);
      if (q.mergedInto && !HR.tests.findQuestion(q.mergedInto)) errors.push(`${q.id}: merged into unknown ${q.mergedInto}`);
      if (!q.mergedInto && (!q.appearsIn || !q.appearsIn.includes(m.year))) errors.push(`${q.id}: appearsIn lacks ${m.year}`);
      tally(q);
      counts.past += 1;
    });
  });

  for (let i = 0; i < generated.length; i++) {
    for (let j = i + 1; j < generated.length; j++) {
      const sim = similarity(generated[i].t, generated[j].t);
      if (sim === 1) errors.push(`duplicate question: ${generated[i].id} and ${generated[j].id}`);
      else if (sim >= 0.85) warnings.push(`near-duplicate (${sim.toFixed(2)}): ${generated[i].id} and ${generated[j].id}`);
    }
  }

  warnings.forEach((w) => console.log('WARN  ' + w));
  errors.forEach((e) => console.log('ERROR ' + e));
  console.log(JSON.stringify(counts));
  console.log(`${errors.length} errors, ${warnings.length} warnings`);
  process.exitCode = errors.length ? 1 : 0;
}

if (require.main === module) run();
module.exports = { checkQuestion, checkMix, expectedSize };
