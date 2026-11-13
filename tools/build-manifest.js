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
  if (s.objectives) {
    manifest[node.id].coverageStatus = s.coverageStatus || 'review-pending';
    manifest[node.id].objectives = s.objectives.map((objective) => {
      const countLinks = (items) => items.filter((item) => (item.objectiveIds || []).includes(objective.id)).length;
      return {
        id: objective.id, description: objective.description,
        notes: countLinks(s.notes), pre: countLinks(s.tests.pre),
        post: countLinks(s.tests.post), summative: countLinks(s.tests.summative),
      };
    });
  }
});
fs.writeFileSync(
  path.join(ROOT, 'data/manifest.js'),
  'HR.registerManifest(' + JSON.stringify(manifest, null, 1) + ');\n',
);
console.log(`Wrote manifest for ${Object.keys(manifest).length} sections`);
