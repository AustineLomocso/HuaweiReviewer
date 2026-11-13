const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Maps each registered section id to the file that registered it, so the
// checker can confirm every file registers the id its name promises.
const sectionFiles = {};

function loadAll() {
  for (const f of ['scoring', 'paper', 'storage', 'progress', 'loader']) {
    require(path.join(ROOT, 'js/core', f + '.js'));
  }
  require(path.join(ROOT, 'data/structure.js'));
  require(path.join(ROOT, 'data/source-inventory.js'));
  require(path.join(ROOT, 'data/exam-inventory.js'));
  const HR = globalThis.HR;
  const original = HR.registerSection;
  let current = null;
  HR.registerSection = (s) => {
    if (current && s && s.id) sectionFiles[s.id] = sectionFiles[s.id] ? `${sectionFiles[s.id]},${current}` : current;
    original(s);
  };
  try {
    for (const dir of ['data/sections', 'data/past']) {
      const full = path.join(ROOT, dir);
      if (!fs.existsSync(full)) continue;
      for (const f of fs.readdirSync(full)) {
        if (!f.endsWith('.js')) continue;
        current = dir === 'data/sections' ? f : null;
        require(path.join(full, f));
      }
    }
  } finally {
    HR.registerSection = original;
  }
  return HR;
}

module.exports = { loadAll, sectionFiles, ROOT };
