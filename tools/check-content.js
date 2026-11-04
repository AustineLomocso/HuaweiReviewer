
const SIZES = {
  sub: { pre: 5, post: 5, summative: 10 },
  chapter: { pre: 10, post: 10, summative: 20 },
  course: { pre: 60, post: 60, summative: 60 },
};
const MIX = { 5: [2, 2, 1], 10: [4, 3, 3], 20: [8, 7, 5], 60: [25, 20, 15] };
const KINDS = ['pre', 'post', 'summative'];
const TYPES = ['single', 'multi', 'tf'];
const MIN_REASON = 15;
const expectedSize = (level, kind) => SIZES[level][kind];

// Case-sensitive on purpose: only capital A-D count as option letters.
const LETTER_REFS = [
  /\b(?:[Oo]ptions?|[Cc]hoices?|[Aa]nswers?|[Ss]tatements?)\s*(?:is\s+)?:?\s*\(?[A-D]\b(?![a-z'])/,
  /\b(?:[Bb]oth|and|or)\s+[A-D]\b(?![a-z'])/,
  /\([A-D]\)/,
  /(?:^|[.!?]\s+)[A-D]\s+(?:is|are)\b/,
];

const normText = (t) => String(t).trim().toLowerCase();
const isInts = (a) => Array.isArray(a) && a.length > 0 && a.every(Number.isInteger);
const isObj = (x) => x !== null && typeof x === 'object';

/**
 * ctx (all optional): { pdf, range: [a, b], external }.
 *   pdf/range: generated questions must cite this pdf and these pages.
 *   external: the section's course has no PDF, so only inferred sources are allowed.
 */
function checkQuestion(q, pageCounts, ctx = {}) {
  const e = [];
  if (typeof q.stem !== 'string' || !q.stem.trim()) e.push('missing stem');
  if (typeof q.explanation !== 'string' || !q.explanation.trim()) e.push('missing explanation');
  else if (LETTER_REFS.some((re) => re.test(q.explanation))) e.push('explanation refers to option letters');

  const options = Array.isArray(q.options) ? q.options : null;
  if (!options) e.push('options must be an array');
  const opts = options || [];
  const keys = opts.map((o) => (isObj(o) ? o.key : undefined));
  const answer = Array.isArray(q.answer) ? q.answer : null;
  if (!answer) e.push('answer must be an array');
  const ans = answer || [];

  if (q.type === 'tf') {
    if (keys.join() !== 'T,F') e.push('True/False options must be T and F');
    if (ans.length !== 1) e.push('True/False needs exactly one answer');
  } else if (q.type === 'single' || q.type === 'multi') {
    if (keys.join() !== 'A,B,C,D') e.push('needs four options keyed A-D');
    if (q.type === 'single' && ans.length !== 1) e.push('single needs exactly one answer');
    if (q.type === 'multi' && ans.length < 2) e.push('multi needs at least two answers');
  } else {
    e.push('unknown type ' + q.type);
  }
  const texts = opts.map((o) => (isObj(o) ? o.text : undefined));
  if (texts.some((t) => typeof t !== 'string' || !t.trim())) e.push('empty option text');
  const real = texts.filter((t) => typeof t === 'string' && t.trim()).map(normText);
  if (new Set(real).size !== real.length) e.push('duplicate option text');
  if (new Set(ans).size !== ans.length) e.push('duplicate answer keys');
  ans.forEach((a) => { if (!keys.includes(a)) e.push(`answer ${a} is not an option`); });

  const s = q.source;
  if (!isObj(s) || !['material', 'inferred'].includes(s.kind)) e.push('missing source');
  else if (ctx.external && s.kind !== 'inferred') e.push('external course questions must have an inferred source');
  else if (s.kind === 'material') {
    let pdfOk = true;
    if (ctx.pdf && s.pdf !== ctx.pdf) { e.push(`source pdf ${s.pdf} is not the course pdf ${ctx.pdf}`); pdfOk = false; }
    else if (!pageCounts[s.pdf]) { e.push('unknown source pdf'); pdfOk = false; }
    if (!isInts(s.pages)) e.push('source pages must be a non-empty array of integers');
    else if (pdfOk) {
      if (s.pages.some((p) => p < 1 || p > pageCounts[s.pdf])) e.push('bad source page');
      else if (ctx.range && s.pages.some((p) => p < ctx.range[0] || p > ctx.range[1])) {
        e.push(`source page outside section pages ${ctx.range[0]}-${ctx.range[1]}`);
      }
    }
  }
  return e;
}

const typeCounts = (questions) => TYPES.map((t) => questions.filter((q) => q.type === t).length);

function checkMix(questions) {
  const want = MIX[questions.length];
  if (!want) return [];
  const got = typeCounts(questions);
  return got.join() === want.join() ? [] : [`mix is ${got.join('/')}, expected ${want.join('/')}`];
}

// A short test should stay within one question of the proportional mix.
function checkShortMix(questions, expected) {
  const share = MIX[expected];
  if (!share || !questions.length) return [];
  const ideal = share.map((x) => (questions.length * x) / expected);
  const got = typeCounts(questions);
  if (got.every((g, i) => Math.abs(g - ideal[i]) <= 1)) return [];
  return [`mix is ${got.join('/')}, proportional would be about ${ideal.map((x) => x.toFixed(1)).join('/')}`];
}

const words = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
function fingerprint(q) {
  const list = words(q.stem + ' ' + q.options.map((o) => o.text).join(' '));
  return { norm: list.join(' '), t: new Set(list) };
}
function similarity(a, b) {
  let shared = 0;
  a.forEach((t) => { if (b.has(t)) shared += 1; });
  return shared / (a.size + b.size - shared || 1);
}

const correctTexts = (q) => new Set(q.answer.map((k) => {
  const o = q.options.find((x) => x.key === k);
  return o ? normText(o.text) : `?${k}`;
}));
const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

function checkAll(HR, { strict = false, sectionFiles = null } = {}) {
  const errors = [];
  const warnings = [];
  const counts = { material: 0, inferred: 0, generated: 0, past: 0, shortfalls: 0, missing: 0 };
  const structure = HR.data.structure;
  const P = HR.progress;
  const pageCounts = Object.fromEntries(structure.courses.filter((c) => c.pdf).map((c) => [c.pdf, c.pageCount]));
  const nodes = P.allNodes(structure);
  const nodeIds = new Set(nodes.map((x) => x.node.id));
  const unwritten = (msg) => (strict ? errors : warnings).push(msg);
  const seen = new Map();
  const generated = [];

  const addId = (id, where) => {
    if (seen.has(id)) errors.push(`${where}: duplicate ID ${id}`);
    seen.set(id, where);
  };
  const tally = (q) => { counts[q.source && q.source.kind === 'material' ? 'material' : 'inferred'] += 1; };

  // Registered section ids and their files.
  Object.keys(HR.data.sections).forEach((id) => {
    if (!nodeIds.has(id)) errors.push(`${id}: section id not in structure`);
  });
  Object.entries(sectionFiles || {}).forEach(([id, file]) => {
    if (file !== `${id}.js`) errors.push(`file ${file} registered section id ${id}, expected ${id}.js`);
  });

  nodes.forEach(({ node, level, path: trail }) => {
    nodeIds.add(node.id);
    const s = HR.data.sections[node.id];
    if (!s) { counts.missing += 1; unwritten(`${node.id}: not yet written`); return; }
    const course = trail[0];
    const range = course.pdf ? (node.pages || [1, course.pageCount]) : null;
    const ctx = { pdf: course.pdf, range, external: !!course.external };

    if (!Array.isArray(s.notes) || !s.notes.length) errors.push(`${node.id}: no notes`);
    (Array.isArray(s.notes) ? s.notes : []).forEach((n, i) => {
      try {
        if (!isObj(n) || !n.heading || !Array.isArray(n.bullets) || !n.bullets.length) {
          errors.push(`${node.id}: note ${i} incomplete`);
          return;
        }
        if (n.bullets.some((b) => typeof b !== 'string' || !b.trim())) errors.push(`${node.id}: note ${i}: empty bullet`);
        if (course.external) {
          if (n.pages !== undefined) errors.push(`${node.id}: note ${i}: external course notes must not have pages`);
        } else if (course.pdf) {
          const ok = Array.isArray(n.pages) && n.pages.length === 2 && n.pages.every(Number.isInteger)
            && n.pages[0] <= n.pages[1] && n.pages[0] >= range[0] && n.pages[1] <= range[1];
          if (!ok) errors.push(`${node.id}: note ${i}: pages must be [a,b] with a<=b inside ${range[0]}-${range[1]}`);
        }
      } catch (err) {
        errors.push(`${node.id}: note ${i}: malformed record (${err.message})`);
      }
    });

    Object.keys(s.shortfall || {}).forEach((k) => {
      if (!KINDS.includes(k)) errors.push(`${node.id}: shortfall for unknown test ${k}`);
    });
    for (const kind of KINDS) {
      const raw = s.tests && s.tests[kind];
      if (raw !== undefined && !Array.isArray(raw)) errors.push(`${node.id}:${kind}: tests must be an array`);
      const qs = Array.isArray(raw) ? raw : [];
      const want = expectedSize(level, kind);
      const reason = s.shortfall && s.shortfall[kind];
      if (qs.length === want) {
        if (reason !== undefined) errors.push(`${node.id}:${kind}: shortfall given but the test is complete`);
        else checkMix(qs.filter(isObj)).forEach((m) => errors.push(`${node.id}:${kind}: ${m}`));
      } else if (reason === undefined) {
        errors.push(`${node.id}:${kind}: ${qs.length} questions, expected ${want}, with no shortfall reason`);
      } else if (!(qs.length > 0 && qs.length < want)) {
        errors.push(`${node.id}:${kind}: shortfall only valid for 0 < count < ${want}, found ${qs.length}`);
      } else if (typeof reason !== 'string' || reason.trim().length < MIN_REASON) {
        errors.push(`${node.id}:${kind}: shortfall reason must be at least ${MIN_REASON} characters`);
      } else {
        counts.shortfalls += 1;
        warnings.push(`${node.id}:${kind}: ${qs.length}/${want}. ${reason}`);
        checkShortMix(qs.filter(isObj), want).forEach((m) => warnings.push(`${node.id}:${kind}: ${m}`));
      }
      qs.forEach((q, i) => {
        const where = `${node.id}:${kind}[${i}]`;
        try {
          if (!isObj(q)) { errors.push(`${where}: malformed question record`); return; }
          const wantId = `${node.id}-${kind}-${String(i + 1).padStart(2, '0')}`;
          if (q.id !== wantId) errors.push(`${node.id}:${kind}: ID ${q.id}, expected ${wantId}`);
          addId(q.id, node.id);
          const found = checkQuestion(q, pageCounts, ctx);
          found.forEach((m) => errors.push(`${q.id}: ${m}`));
          tally(q);
          counts.generated += 1;
          if (!found.length) generated.push({ id: q.id, ...fingerprint(q) });
        } catch (err) {
          errors.push(`${(isObj(q) && q.id) || where}: malformed record (${err.message})`);
        }
      });
    }
  });

  // Past exams.
  const mockQuestions = new Map();
  const mockYear = {};
  structure.mocks.forEach((m) => { mockYear[m.id] = m.year; });
  Object.values(HR.data.mocks).forEach((mock) => {
    (Array.isArray(mock.questions) ? mock.questions : []).forEach((q) => {
      if (isObj(q) && q.id) mockQuestions.set(q.id, { q, mockId: mock.id });
    });
  });
  Object.keys(HR.data.mocks).forEach((id) => {
    if (!(id in mockYear)) errors.push(`${id}: mock not in structure`);
  });

  structure.mocks.forEach((m) => {
    const mock = HR.data.mocks[m.id];
    if (!mock) { unwritten(`${m.id}: not yet transcribed`); return; }
    if (!Array.isArray(mock.questions)) { errors.push(`${m.id}: questions must be an array`); return; }
    const types = mock.questions.map((q) => (isObj(q) ? q.type : undefined));
    const expected = [...Array(25).fill('single'), ...Array(20).fill('multi'), ...Array(15).fill('tf')];
    if (types.join() !== expected.join()) errors.push(`${m.id}: not 25 single, 20 multi, 15 True/False in order`);
    mock.questions.forEach((q, i) => {
      const where = `${m.id}[${i}]`;
      try {
        if (!isObj(q)) { errors.push(`${where}: malformed question record`); return; }
        const wantId = `${m.id}-${String(i + 1).padStart(2, '0')}`;
        if (q.id !== wantId) errors.push(`${m.id}: ID ${q.id}, expected ${wantId}`);
        addId(q.id, m.id);
        const hasSection = typeof q.sectionId === 'string' && q.sectionId !== '';
        if (!hasSection) errors.push(`${q.id}: missing sectionId`);
        const located = hasSection ? P.findNode(structure, q.sectionId) : null;
        const ctx = { external: !!(located && located.path[0].external) };
        checkQuestion(q, pageCounts, ctx).forEach((x) => errors.push(`${q.id}: ${x}`));

        if (q.mergedInto) {
          const target = mockQuestions.get(q.mergedInto);
          if (q.mergedInto === q.id) errors.push(`${q.id}: mergedInto points to itself`);
          else if (!target) errors.push(`${q.id}: mergedInto ${q.mergedInto} is not a mock question`);
          else if (target.q.mergedInto) errors.push(`${q.id}: mergedInto ${q.mergedInto} is itself merged`);
          else if (target.q.type !== q.type) errors.push(`${q.id}: mergedInto ${q.mergedInto} has a different type`);
          else {
            const year = mockYear[m.id];
            if (!Array.isArray(target.q.appearsIn) || !target.q.appearsIn.includes(year)) {
              errors.push(`${target.q.id}: appearsIn lacks ${year} (repeated in ${q.id})`);
            }
            const mine = new Set(q.options.map((o) => normText(o.text)));
            const theirs = new Set(target.q.options.map((o) => normText(o.text)));
            if (sameSet(mine, theirs)) {
              if (!sameSet(correctTexts(q), correctTexts(target.q))) {
                errors.push(`${q.id}: correct options differ from ${target.q.id}`);
              }
            } else {
              warnings.push(`${q.id}: option wording differs from ${target.q.id}, check the answer still applies`);
            }
          }
        } else {
          if (hasSection && !nodeIds.has(q.sectionId)) errors.push(`${q.id}: unknown section ${q.sectionId}`);
          if (!Array.isArray(q.appearsIn) || !q.appearsIn.includes(m.year)) errors.push(`${q.id}: appearsIn lacks ${m.year}`);
        }
        tally(q);
        counts.past += 1;
      } catch (err) {
        errors.push(`${(isObj(q) && q.id) || where}: malformed record (${err.message})`);
      }
    });
  });

  for (let i = 0; i < generated.length; i++) {
    for (let j = i + 1; j < generated.length; j++) {
      const a = generated[i];
      const b = generated[j];
      if (a.norm === b.norm) { errors.push(`duplicate question: ${a.id} and ${b.id}`); continue; }
      const sim = similarity(a.t, b.t);
      if (sim === 1) warnings.push(`near-duplicate (same words in a different order): ${a.id} and ${b.id}`);
      else if (sim >= 0.85) warnings.push(`near-duplicate (${sim.toFixed(2)}): ${a.id} and ${b.id}`);
    }
  }
  return { errors, warnings, counts };
}

function run() {
  const lib = require('./lib-load.js');
  const HR = lib.loadAll();
  const strict = process.argv.includes('--strict');
  const { errors, warnings, counts } = checkAll(HR, { strict, sectionFiles: lib.sectionFiles });
  warnings.forEach((w) => console.log('WARN  ' + w));
  errors.forEach((e) => console.log('ERROR ' + e));
  console.log(JSON.stringify(counts));
  console.log(`${errors.length} errors, ${warnings.length} warnings`);
  process.exitCode = errors.length ? 1 : 0;
}

if (require.main === module) run();
module.exports = { checkQuestion, checkMix, checkShortMix, checkAll, expectedSize };
