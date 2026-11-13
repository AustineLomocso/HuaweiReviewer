const test = require('node:test');
const assert = require('node:assert/strict');
const HR = require('../tools/lib-load').loadAll();

test('verified Nationals enter lesson practice and retry resolution', () => {
  const questions = HR.tests.resolve('ai-2-1:past');
  for (const number of ['007', '009']) {
    const id = `n2324-capture-${number}`;
    assert.ok(questions.some((q) => q.id === id));
    assert.equal(HR.tests.findQuestion(id).status, 'verified');
    assert.equal(HR.tests.resolve('retry:all', { [id]: { at: 1 } })[0].id, id);
  }
  assert.ok(!questions.some((q) => q.id === 'n2324-capture-010'));
  // Question 10 is in the app but ungraded, so it never enters lesson past sets or scoring.
  assert.equal(HR.scoring.isGraded(HR.tests.findQuestion('n2324-capture-010')), false);
});

test('reviewed Nationals preserve supplied keys and corrected transcription separately', () => {
  const captures = HR.data.examInventory.papers[0].captures;
  assert.match(captures[5].options[1].text, /UDMF/);
  assert.match(captures[5].ocrOriginal.options[1].text, /IJDMF/);
  assert.equal(captures[9].suppliedKey, 'C');
  assert.equal(captures[9].status, 'answer-review');
  assert.equal(captures[9].answer, undefined);
});

// Rules for every Nationals question that has been admitted to the in-app test engine.
test('in-app Nationals questions are reviewed, complete, letter-free and properly sourced', () => {
  const pdfPages = Object.fromEntries((HR.data.inventory?.sources || []).map((s) => [s.id, s.pageCount || s.pages]));
  for (const paper of HR.data.examInventory.papers) {
    for (const q of paper.captures.filter((c) => c.inApp)) {
      const where = `${q.id} (paper no. ${q.number})`;
      assert.equal(q.transcriptionStatus, 'visually-reviewed', `${where}: transcription not reviewed`);
      const keys = q.options.map((o) => o.key).join();
      assert.equal(keys, q.type === 'tf' ? 'T,F' : 'A,B,C,D', `${where}: incomplete options`);
      assert.ok(q.options.every((o) => o.text && o.text.trim()), `${where}: empty option text`);
      if (q.answer === undefined) {
        assert.ok(q.flag, `${where}: ungraded question needs a flag explaining why`);
      } else {
        assert.ok(Array.isArray(q.answer) && q.answer.length && q.answer.every((k) => keys.split(',').includes(k)), `${where}: bad answer`);
        if (q.type !== 'multi') assert.equal(q.answer.length, 1, `${where}: single/TF needs one answer`);
        if (q.type === 'multi') assert.ok(q.answer.length >= 2, `${where}: multiple-answer needs two or more`);
      }
      assert.ok(q.explanation && q.explanation.trim(), `${where}: missing explanation`);
      assert.ok(!/\boptions?\s*[A-D]\b|\b[A-D][.)]\s|\(\s*[A-D]\s*\)/.test(q.explanation), `${where}: explanation mentions an option letter`);
      assert.ok(q.source && ['material', 'inferred'].includes(q.source.kind), `${where}: missing source`);
      if (q.source.kind === 'material') {
        assert.ok(q.source.pdf && Array.isArray(q.source.pages) && q.source.pages.length, `${where}: material source needs pdf and pages`);
        const max = pdfPages[q.source.pdf];
        if (max) assert.ok(q.source.pages.every((pg) => pg >= 1 && pg <= max), `${where}: page outside ${q.source.pdf}`);
      } else {
        assert.ok(q.flag, `${where}: inferred answer needs a caution flag`);
      }
    }
  }
});
