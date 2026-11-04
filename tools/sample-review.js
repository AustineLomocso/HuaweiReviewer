// Usage: node tools/sample-review.js <node-id-prefix> <count> <seed>
require('../js/core/paper.js');
const USAGE = 'Usage: node tools/sample-review.js <node-id-prefix> <count> <seed>';

// Seeded Fisher-Yates over every question under the prefix: generated tests
// plus canonical past questions filed under a matching section.
function sample(HR, prefix, count, seed) {
  const n = Number(count);
  const s = Number(seed);
  if (!prefix || !Number.isInteger(n) || n < 1 || seed === undefined || seed === '' || !Number.isInteger(s)) {
    throw new Error(USAGE);
  }
  const inScope = (id) => typeof id === 'string' && (id === prefix || id.startsWith(prefix + '-'));
  const pool = [];
  Object.values(HR.data.sections)
    .filter((sec) => inScope(sec.id))
    .forEach((sec) => Object.values(sec.tests || {}).forEach((list) => pool.push(...list)));
  Object.values(HR.data.mocks).forEach((mock) => {
    mock.questions.filter((q) => !q.mergedInto && inScope(q.sectionId)).forEach((q) => pool.push(q));
  });
  const rand = globalThis.HR.paper.rng(s);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

if (require.main === module) {
  const { loadAll } = require('./lib-load.js');
  const HR = loadAll();
  const [prefix, count, seed] = process.argv.slice(2);
  try {
    console.log(JSON.stringify(sample(HR, prefix, count, seed), null, 1));
  } catch (err) {
    console.error(err.message);
    process.exitCode = 2;
  }
}

module.exports = { sample };
