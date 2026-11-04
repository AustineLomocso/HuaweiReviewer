const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../work/transcripts');
const merged = {};
const unclear = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (!r.mock) { console.log('Not a question: ' + f); continue; }
  const k = `${r.mock}-${String(r.num).padStart(2, '0')}`;
  const words = (x) => JSON.stringify(x.options) + x.stem;
  if (merged[k] && words(merged[k]) !== words(r)) unclear.push(`${k}: shots differ (${merged[k].photo}, ${r.photo})`);
  // Prefer the shot with fewer unclear words.
  if (!merged[k] || (r.unclear || []).length < (merged[k].unclear || []).length) merged[k] = r;
}
Object.entries(merged).forEach(([k, r]) => (r.unclear || []).forEach((u) => unclear.push(`${k} (${r.photo}): ${u}`)));
for (const m of ['m2324', 'm2425', 'm2526']) {
  const missing = [];
  for (let n = 1; n <= 60; n++) if (!merged[`${m}-${String(n).padStart(2, '0')}`]) missing.push(n);
  console.log(`${m}: ${60 - missing.length}/60${missing.length ? ', missing ' + missing.join(', ') : ''}`);
}
console.log(`${unclear.length} unclear items`);
unclear.forEach((u) => console.log('  ' + u));
fs.writeFileSync(path.join(__dirname, '../work/past-raw.json'), JSON.stringify(merged, null, 1));
