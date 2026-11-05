// Usage: node tools/list-stems.js <node-id>
// Prints every generated question stem under a node, so higher levels can avoid repeating them.
const { loadAll } = require('./lib-load.js');
const HR = loadAll();
const id = process.argv[2];
if (!id) { console.error('Usage: node tools/list-stems.js <node-id>'); process.exit(2); }
HR.progress.descendantIds(HR.data.structure, id).forEach((nodeId) => {
  const s = HR.data.sections[nodeId];
  if (!s) return;
  Object.values(s.tests).flat().forEach((q) => console.log(`${q.id}\t${q.stem}`));
});
