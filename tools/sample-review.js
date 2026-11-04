// Usage: node tools/sample-review.js <node-id-prefix> <count> <seed>
const { loadAll } = require('./lib-load.js');
const HR = loadAll();
const [prefix, count, seed] = process.argv.slice(2);
const all = Object.values(HR.data.sections)
  .filter((s) => s.id.startsWith(prefix))
  .flatMap((s) => Object.values(s.tests).flat());
const paper = HR.paper.buildPaper(all, { seed: Number(seed) });
const pick = paper.map((p) => all.find((q) => q.id === p.id));
for (let i = pick.length - 1; i > 0; i--) {
  const j = (i * 7919 + Number(seed)) % (i + 1);
  [pick[i], pick[j]] = [pick[j], pick[i]];
}
console.log(JSON.stringify(pick.slice(0, Number(count)), null, 1));
