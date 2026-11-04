const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function loadAll() {
  for (const f of ['scoring', 'paper', 'storage', 'progress', 'loader']) {
    require(path.join(ROOT, 'js/core', f + '.js'));
  }
  require(path.join(ROOT, 'data/structure.js'));
  for (const dir of ['data/sections', 'data/past']) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full)) {
      if (f.endsWith('.js')) require(path.join(full, f));
    }
  }
  return globalThis.HR;
}

module.exports = { loadAll, ROOT };
