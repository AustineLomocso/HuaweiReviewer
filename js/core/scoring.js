(function (root) {
  const POINTS = { single: 16, multi: 18, tf: 16 };
  const PASS_PCT = 60;

  // A question with no agreed answer (for example a disputed key) is shown but never scored.
  function isGraded(q) {
    return Array.isArray(q.answer) && q.answer.length > 0;
  }

  function isCorrect(q, selected) {
    if (!isGraded(q) || !selected || selected.length === 0) return false;
    return [...q.answer].sort().join('|') === [...selected].sort().join('|');
  }

  // Result of one question for colouring and labelling. Unanswered counts as incorrect.
  function itemStatus(q, selected) {
    if (!isGraded(q)) return 'ungraded';
    return isCorrect(q, selected) ? 'correct' : 'incorrect';
  }

  // In Practice, single-answer and True/False questions are revealed the moment an option is chosen.
  // Multiple-answer questions wait for an explicit "Submit answer".
  function revealsOnSelect(q) {
    return q.type !== 'multi';
  }

  // The status shown in the Practice navigator: null until the question has been revealed, and always null in Exam mode.
  function revealedStatus(q, selected, mode, revealed) {
    return mode === 'practice' && revealed ? itemStatus(q, selected) : null;
  }

  function navLabel(number, status) {
    return `Question ${number}, ${status === 'ungraded' ? 'not graded' : status}`;
  }

  function scoreAttempt(questions, answers) {
    const byType = {};
    const correctIds = [];
    let earned = 0;
    let total = 0;
    let ungraded = 0;
    for (const q of questions) {
      if (!isGraded(q)) { ungraded += 1; continue; }
      const pts = POINTS[q.type];
      const t = (byType[q.type] = byType[q.type] || { correct: 0, count: 0, earned: 0, total: 0 });
      t.count += 1;
      t.total += pts;
      total += pts;
      if (isCorrect(q, answers[q.id])) {
        t.correct += 1;
        t.earned += pts;
        earned += pts;
        correctIds.push(q.id);
      }
    }
    const pct = total ? Math.round((earned / total) * 1000) / 10 : 0;
    return { earned, total, pct, passed: total > 0 && earned * 100 >= PASS_PCT * total, byType, correctIds, ungraded };
  }

  root.HR = root.HR || {};
  root.HR.scoring = { POINTS, PASS_PCT, isGraded, isCorrect, itemStatus, revealsOnSelect, revealedStatus, navLabel, scoreAttempt };
})(globalThis);
