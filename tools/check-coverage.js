const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('./lib-load.js');
require('../js/core/loader.js');
require('../data/source-inventory.js');
require('../data/exam-inventory.js');

const inventory = HR.data.inventory;
const exams = HR.data.examInventory;
const errors = [];

function checkFiles(records) {
  const seen = new Set();
  records.forEach((record) => {
    if (seen.has(record.id)) errors.push(`Duplicate source ID ${record.id}`);
    seen.add(record.id);
    const full = path.resolve(ROOT, record.path);
    const relative = path.relative(ROOT, full);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      errors.push(`Source path escapes project ${record.path}`);
      return;
    }
    if (!fs.existsSync(full)) {
      errors.push(`Missing source ${record.path}`);
      return;
    }
    const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
    if (hash !== record.sha256) errors.push(`Source changed since inventory ${record.path}`);
  });
}

checkFiles(inventory.sources);
checkFiles(inventory.images);
inventory.sources.forEach((source) => {
  const expected = Array.from({ length: source.pageCount }, (_, i) => i + 1);
  if (source.pages.map((page) => page.page).join() !== expected.join()) errors.push(`${source.id}: incomplete page inventory`);
  [...source.outline, ...source.contentsPages, ...source.objectivePages].forEach((entry) => {
    if (!Number.isInteger(entry.page) || entry.page < 1 || entry.page > source.pageCount) errors.push(`${source.id}: invalid page ${entry.page}`);
  });
});
const imagePaths = new Set(inventory.images.map((image) => image.path));
const imageHashes = new Map(inventory.images.map((image) => [image.path, image.sha256]));
const reviews = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/exam-key-reviews.json'), 'utf8')).reviews;
const reviewedKeys = new Map();
const contentReviews = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/nationals-reviews.json'), 'utf8')).reviews;
const contentReviewIds = new Set();
require('../js/core/progress.js');
require('../data/structure.js');
const lessonIds = new Set(HR.progress.allNodes(HR.data.structure).map(({ node }) => node.id));
const pageCounts = Object.fromEntries(inventory.sources.map((source) => [source.id, source.pageCount]));
const { checkQuestion } = require('./check-content.js');
for (const review of contentReviews) {
  if (contentReviewIds.has(review.captureId)) errors.push(`Duplicate content review ${review.captureId}`);
  contentReviewIds.add(review.captureId);
  if (imageHashes.get(review.image) !== review.sha256) errors.push(`${review.captureId}: reviewed image changed`);
  const capture = exams.papers.find((p) => p.id === review.paperId)?.captures.find((c) => c.id === review.captureId);
  if (!capture || capture.number !== review.questionNumber || capture.image !== review.image
      || capture.stem !== review.stem || JSON.stringify(capture.options) !== JSON.stringify(review.options)
      || capture.status !== review.status) errors.push(`${review.captureId}: generated content differs from review`);
}
reviews.forEach((review) => {
  const id = `${review.paperId}/${review.questionNumber}`;
  if (reviewedKeys.has(id)) errors.push(`Duplicate supplied-key review ${id}`);
  reviewedKeys.set(id, review);
  if (imageHashes.get(review.image) !== review.sha256) errors.push(`${id}: supplied-key review image changed`);
});
exams.papers.forEach((paper) => {
  const ids = new Set();
  const numbers = new Set();
  const counts = new Map();
  paper.captures.forEach((capture) => {
    if (ids.has(capture.id)) errors.push(`${paper.id}: duplicate capture ID ${capture.id}`);
    ids.add(capture.id);
    if (!imagePaths.has(capture.image)) errors.push(`${capture.id}: unknown image ${capture.image}`);
    if (!Number.isInteger(capture.number) || capture.number < 1 || capture.number > paper.expectedQuestions) errors.push(`${capture.id}: invalid question number`);
    numbers.add(capture.number);
    counts.set(capture.number, (counts.get(capture.number) || 0) + 1);
    if (capture.paperTotal !== paper.expectedQuestions) errors.push(`${capture.id}: contradictory paper total`);
    if (capture.status === 'verified') {
      if (!contentReviewIds.has(capture.id)) errors.push(`${capture.id}: missing content review`);
      checkQuestion(capture, pageCounts).forEach((error) => errors.push(`${capture.id}: ${error}`));
      const targets = [capture.sectionId, ...(capture.secondarySectionIds || [])];
      for (const id of targets) {
        if (!lessonIds.has(id)) errors.push(`${capture.id}: unknown mapped lesson ${id}`);
        if (!capture.mappingEvidence?.some((e) => e.sectionId === id)) errors.push(`${capture.id}: missing mapping evidence for ${id}`);
      }
    }
    if (capture.suppliedKeyStatus === 'visually-reviewed') {
      const review = reviewedKeys.get(`${paper.id}/${capture.number}`);
      if (!review || review.image !== capture.image || review.suppliedKey !== capture.suppliedKey) errors.push(`${capture.id}: supplied-key review does not match`);
    }
  });
  const missing = Array.from({ length: paper.expectedQuestions }, (_, i) => i + 1).filter((number) => !numbers.has(number));
  const repeated = [...counts].filter(([, count]) => count > 1).map(([number]) => number).sort((a, b) => a - b);
  if (paper.uniqueNumbers !== numbers.size) errors.push(`${paper.id}: incorrect unique question count`);
  if (missing.join() !== paper.missingNumbers.join()) errors.push(`${paper.id}: incorrect missing number report`);
  if (repeated.join() !== paper.duplicateNumbers.join()) errors.push(`${paper.id}: incorrect repeated number report`);
});

const pendingSources = inventory.sources.filter((source) => !source.reviewed).length;
const pendingCaptures = exams.papers.flatMap((paper) => paper.captures).filter((capture) => capture.status !== 'verified').length;
const missingNumbers = exams.papers.reduce((sum, paper) => sum + paper.missingNumbers.length, 0);
if (process.argv.includes('--strict')) {
  if (pendingSources) errors.push(`${pendingSources} source documents await instructional coverage verification`);
  if (pendingCaptures) errors.push(`${pendingCaptures} captures await transcription and answer verification`);
  if (missingNumbers) errors.push(`${missingNumbers} exam question numbers have no capture`);
}
console.log(JSON.stringify({ sources: inventory.sources.length, pages: inventory.sources.reduce((sum, source) => sum + source.pageCount, 0),
  images: inventory.images.length, reviewedSourceKeys: reviews.length, reviewedTranscriptions: contentReviews.length,
  verifiedNationals: exams.papers.flatMap((p) => p.captures).filter((q) => q.status === 'verified').length,
  pendingSources, pendingCaptures, missingNumbers }));
errors.forEach((error) => console.log('ERROR ' + error));
console.log(`${errors.length} coverage validation errors`);
process.exitCode = errors.length ? 1 : 0;
