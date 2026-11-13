// Merges a batch of Nationals question reviews into data/nationals-reviews.json.
// Usage: node tools/apply-nationals-reviews.js <batch.json>
// Each batch entry names a captureId and the reviewed fields (stem, options, answer, explanation,
// source, flag, reviewNotes, sectionId, ...). Image, paper, number and sha256 come from the inventory,
// and the entry is marked visually reviewed and admitted to the app (inApp).
// Afterwards run `python tools/reconcile-exams.py` to rebuild data/exam-inventory.js.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
require('../js/core/loader.js');
require('../data/exam-inventory.js');

const batchFile = process.argv[2];
if (!batchFile) throw new Error('Usage: node tools/apply-nationals-reviews.js <batch.json>');
const batch = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
const reviewPath = path.join(ROOT, 'data/nationals-reviews.json');
const file = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
const captures = Object.fromEntries(globalThis.HR.data.examInventory.papers
  .flatMap((paper) => paper.captures.map((c) => [c.id, { ...c, paperId: paper.id }])));

let added = 0;
let updated = 0;
for (const entry of batch) {
  const capture = captures[entry.captureId];
  if (!capture) throw new Error(`Unknown capture ${entry.captureId}`);
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, capture.image))).digest('hex');
  const index = file.reviews.findIndex((r) => r.captureId === entry.captureId);
  const previous = index >= 0 ? file.reviews[index] : {};
  // The inventory's current text is the starting point; when it came from an earlier review it is already corrected.
  const record = {
    captureId: capture.id,
    paperId: capture.paperId,
    questionNumber: capture.number,
    image: capture.image,
    sha256,
    stem: capture.stem,
    options: capture.options,
    status: 'transcribed',
    ...previous,
    ...entry,
    transcriptionStatus: 'visually-reviewed',
    inApp: entry.inApp !== false,
  };
  if (record.answer === null) delete record.answer;
  if (index >= 0) { file.reviews[index] = record; updated += 1; } else { file.reviews.push(record); added += 1; }
}
file.reviews.sort((a, b) => a.captureId.localeCompare(b.captureId));
fs.writeFileSync(reviewPath, JSON.stringify(file, null, 1) + '\n');
console.log(`Reviews: ${added} added, ${updated} updated, ${file.reviews.length} total.`);
