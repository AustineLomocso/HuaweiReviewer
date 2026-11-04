(function (root) {
  const POINTS = { single: 16, multi: 18, tf: 16 };
  const PASS_PCT = 60;

  function isCorrect(q, selected) {
    if (!selected || selected.length === 0) return false;
    return [...q.answer].sort().join('|') === [...selected].sort().join('|');
  }

  function scoreAttempt(questions, answers) {
    const byType = {};
    const correctIds = [];
    let earned = 0;
    let total = 0;
    for (const q of questions) {
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
    return { earned, total, pct, passed: total > 0 && earned * 100 >= PASS_PCT * total, byType, correctIds };
  }

  root.HR = root.HR || {};
  root.HR.scoring = { POINTS, PASS_PCT, isCorrect, scoreAttempt };
})(globalThis);
