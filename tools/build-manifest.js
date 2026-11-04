const fs = require('fs');
const path = require('path');
const { loadAll, ROOT } = require('./lib-load.js');

const HR = loadAll();
const manifest = {};
HR.progress.allNodes(HR.data.structure).forEach(({ node }) => {
  const s = HR.data.sections[node.id];
  if (!s) return;
  const past = HR.tests.resolve(`${node.id}:past`, {}).length;
  manifest[node.id] = {
    notes: !!(s.notes && s.notes.length),
    pre: s.tests.pre.length,
    post: s.tests.post.length,
    summative: s.tests.summative.length,
    past,
  };
});
fs.writeFileSync(
  path.join(ROOT, 'data/manifest.js'),
  'HR.registerManifest(' + JSON.stringify(manifest, null, 1) + ');\n',
);
console.log(`Wrote manifest for ${Object.keys(manifest).length} sections`);
