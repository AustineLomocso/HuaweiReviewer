const fs = require('fs');
const path = require('path');
require('../js/core/loader.js');
require('../data/exam-inventory.js');
const output = path.join(__dirname, '../NationalsQuestionnaires');
fs.mkdirSync(output, { recursive: true });
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const sourceHref = (image) => '../' + image.split('/').map(encodeURIComponent).join('/');
const labels = { single: 'Choose one answer', multi: 'Select all that apply', tf: 'Choose True or False' };
const years = { n2324: '2023–24', n2425: '2024–25', n2526: '2025–26' };
const style = `
*{box-sizing:border-box}body{font:17px/1.6 system-ui,sans-serif;color:#18283d;background:#f4f6fa;margin:0}
main{max-width:960px;margin:auto;padding:30px 20px}h1{font-size:1.8rem;line-height:1.25}h2{font-size:1.2rem}
a{color:#1556b5}nav,.toolbar{display:flex;gap:18px;flex-wrap:wrap;align-items:center}article,.paper{background:white;border:1px solid #d6dce5;border-radius:10px;padding:24px;margin:22px 0}
fieldset{border:0;padding:0;margin:16px 0}legend{font-size:1.05rem;font-weight:650;width:100%}label{display:flex;align-items:flex-start;gap:12px;padding:12px 8px;border-radius:6px;cursor:pointer}label:hover{background:#eef3fc}input{flex:0 0 auto;margin-top:7px;width:18px;height:18px;accent-color:#1556b5}
.small{font-size:.88rem;color:#48596e}.gap{border-left:5px solid #a86100}.type{margin-bottom:8px;font-weight:600;color:#48596e}button{font:inherit;cursor:pointer;padding:8px 14px;background:white;border:1px solid #9cacc1;border-radius:6px}details{margin-top:16px}summary{cursor:pointer}table{border-collapse:collapse;width:100%}td,th{padding:8px;border-bottom:1px solid #d6dce5;text-align:left}.status{font-weight:600}#save-status{min-height:1.5em}.print-name{display:none}legend,.stem{overflow-wrap:anywhere}
@media(max-width:500px){main{padding:18px 12px}article{padding:16px}h1{font-size:1.5rem}}
@media print{body{background:white;font-size:11pt}main{max-width:none;padding:0}nav,.toolbar,.source,.answer-key,#save-status,.intro{display:none!important}.print-name{display:block}article{border:0;border-bottom:1px solid #bbb;border-radius:0;padding:12px 0;margin:8px 0;break-inside:avoid}label{padding:5px}input{width:12px;height:12px;margin-top:4px}h1{font-size:18pt}.gap{border-left:0}}
`;
function document(title, content, script = '') {
  return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><style>${style}</style></head><body><main>${content}</main>${script ? `<script>${script}</script>` : ''}</body></html>\n`;
}
function questionMarkup(number, captures) {
  if (!captures.length) return `<article id="q${number}" class="gap"><h2>Question ${number}</h2><p>Source screenshot missing.</p><p class="small">This question was absent from the supplied captures.</p></article>`;
  const question = captures[0];
  const options = question.options.map((option) => `<label><input type="${question.type === 'multi' ? 'checkbox' : 'radio'}" name="q${number}" value="${escape(option.key)}"><span>${escape(option.key)}. ${escape(option.text)}</span></label>`).join('\n');
  return `<article id="q${number}" data-question="${number}"><div class="type">Question ${number} · ${labels[question.type]}</div><fieldset><legend>${escape(question.stem)}</legend>${options}</fieldset>
  <div class="source small">${captures.map((capture, i) => `<a href="${sourceHref(capture.image)}" target="_blank" rel="noopener">${captures.length > 1 ? `Source screenshot ${i + 1}` : 'Source screenshot'}</a>`).join(' · ')}${question.reviewNotes && question.reviewNotes.includes('Bracketed') ? `<p>${escape(question.reviewNotes)}</p>` : ''}</div></article>`;
}
const script = (id) => `
const storageKey = 'huawei-nationals-questionnaire-${id}-v1';
const inputs = [...document.querySelectorAll('input[name]')];
const progress = document.getElementById('progress');
const status = document.getElementById('save-status');
function updateProgress() {
  const answered = new Set(inputs.filter(input => input.checked).map(input => input.name));
  progress.textContent = answered.size + ' / ' + document.querySelectorAll('[data-question]').length + ' available questions answered';
}
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  for (const input of inputs) input.checked = Array.isArray(saved[input.name]) && saved[input.name].includes(input.value);
} catch (error) { status.textContent = 'Saved responses could not be loaded. You can still use this questionnaire.'; }
for (const input of inputs) input.addEventListener('change', () => {
  updateProgress();
  const answers = {};
  for (const item of inputs.filter(item => item.checked)) (answers[item.name] ||= []).push(item.value);
  try { localStorage.setItem(storageKey, JSON.stringify(answers)); status.textContent = 'Responses saved in this browser.'; }
  catch (error) { status.textContent = 'Browser storage unavailable. Keep this page open to retain responses.'; }
});
document.getElementById('print').addEventListener('click', () => window.print());
document.getElementById('reset').addEventListener('click', () => {
  if (!confirm('Clear all responses for this paper?')) return;
  for (const input of inputs) input.checked = false;
  try { localStorage.removeItem(storageKey); status.textContent = 'Responses cleared for this paper.'; }
  catch (error) { status.textContent = 'Responses cleared on this page. Browser storage could not be updated.'; }
  updateProgress();
});
updateProgress();`;

const papers = HR.data.examInventory.papers;
for (const paper of papers) {
  const groups = Array.from({ length: paper.expectedQuestions }, (_, index) => paper.captures.filter((capture) => capture.number === index + 1));
  for (const captures of groups) {
    if (!captures.length) continue;
    const q = captures[0];
    const expected = q.type === 'tf' ? 'T,F' : 'A,B,C,D';
    if (q.options.map((option) => option.key).join() !== expected) throw new Error(`Incomplete choices in ${paper.id} question ${q.number}`);
  }
  const keyRows = groups.filter((group) => group.length && group[0].suppliedKey).map(([q]) => `<tr><td>${q.number}</td><td>${escape(q.suppliedKey)}</td><td>${q.status === 'answer-review' ? escape(q.reviewNotes) : 'Supplied exam key'}</td></tr>`).join('');
  const title = `${years[paper.id]} Nationals questionnaire`;
  const content = `<nav><a href="index.html">All Nationals papers</a><a href="../index.html">Reviewer</a></nav><h1>${title}</h1><p>${escape(paper.title)}</p>
  <p class="intro">${paper.uniqueNumbers} available questions. Original numbering and option order are retained. Text was extracted from screenshots and may contain transcription errors. Use each question’s source link to check the original.</p>
  ${paper.missingNumbers.length ? `<p class="intro">Missing source questions ${paper.missingNumbers.join(' and ')}.</p>` : ''}
  <p class="print-name">Name _________________________________ Date _________________</p>
  <div class="toolbar"><button id="print" type="button">Print questionnaire / Save PDF</button><button id="reset" type="button">Clear this paper’s responses</button><span id="progress" class="status" aria-live="polite"></span></div><p id="save-status" class="small" role="status">Choose your responses below. Responses save in this browser.</p>
  ${groups.map((captures, index) => questionMarkup(index + 1, captures)).join('\n')}
  <details class="answer-key"><summary>Supplied answer key</summary>${keyRows ? `<p>Answers transcribed from the supplied answer screenshots. Source verification is ongoing.</p><table><thead><tr><th>Question</th><th>Answer</th><th>Note</th></tr></thead><tbody>${keyRows}</tbody></table>` : '<p>The supplied screenshots do not show an answer key for this paper.</p>'}</details>`;
  fs.writeFileSync(path.join(output, `${paper.id}.html`), document(title, content, script(paper.id)));
}
const links = papers.map((paper) => `<section class="paper"><h2><a href="${paper.id}.html">${years[paper.id]} Nationals questionnaire</a></h2><p>${paper.uniqueNumbers} available questions${paper.missingNumbers.length ? ` · Missing ${paper.missingNumbers.join(', ')}` : ''}</p><p>${escape(paper.title)}</p></section>`).join('');
fs.writeFileSync(path.join(output, 'index.html'), document('Past Nationals questionnaires', `<nav><a href="../index.html">Back to reviewer</a></nav><h1>Past Nationals questionnaires</h1><p>Open a paper to answer or print it. All 328 available questions from the three supplied Nationals papers are included.</p>${links}`));
console.log('Built three questionnaires with 328 available questions and two missing-source placeholders.');
