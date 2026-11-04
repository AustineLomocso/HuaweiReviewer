const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const raw = JSON.parse(fs.readFileSync(path.join(root, 'work/past-raw.json'), 'utf8'));
const groups = JSON.parse(fs.readFileSync(path.join(root, 'work/past-groups.json'), 'utf8'));
const beyond = JSON.parse(fs.readFileSync(path.join(root, 'work/beyond-map.json'), 'utf8'));
const answered = {};
const dir = path.join(root, 'work/past-answered');
for (const f of fs.readdirSync(dir)) {
  for (const a of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))) answered[a.id] = a;
}
const YEAR = { m2324: '2023-24', m2425: '2024-25', m2526: '2025-26' };
const canonicalOf = (id) => groups[id] || id;
const appears = {};
for (const id of Object.keys(raw)) {
  const c = canonicalOf(id);
  (appears[c] = appears[c] || new Set()).add(YEAR[id.slice(0, 5)]);
}
for (const m of Object.keys(YEAR)) {
  const questions = [];
  for (let n = 1; n <= 60; n++) {
    const id = `${m}-${String(n).padStart(2, '0')}`;
    if (!raw[id]) throw new Error('Missing ' + id);
    const canon = canonicalOf(id);
    if (!answered[canon]) throw new Error('Unanswered ' + canon);
    // A merged question with reordered options has its own entry that overrides the answer.
    const a = { ...answered[canon], ...(answered[id] || {}) };
    let sectionId = a.sectionId;
    if (sectionId.startsWith('beyond:')) {
      sectionId = beyond[sectionId];
      if (!sectionId) throw new Error('No Course 3 mapping for ' + a.sectionId);
    }
    const q = {
      id, type: raw[id].type, stem: raw[id].stem, options: raw[id].options,
      answer: a.answer, explanation: a.explanation, source: a.source, sectionId,
      mergedInto: canon === id ? null : canon,
    };
    if (canon === id) q.appearsIn = [...appears[id]].sort();
    if (a.flag) q.flag = a.flag;
    if (raw[id].note) q.note = raw[id].note;
    questions.push(q);
  }
  fs.writeFileSync(path.join(root, `data/past/${m}.js`), `HR.registerMock(${JSON.stringify({ id: m, questions }, null, 1)});\n`);
}
console.log('Wrote 3 mocks');
