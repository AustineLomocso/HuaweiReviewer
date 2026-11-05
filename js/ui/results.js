(function (root) {
  const HR = root.HR;
  const TYPE_NAME = { single: 'Single-answer', multi: 'Multiple-answer', tf: 'True/False' };

  // Answers are listed in the letter order the student saw. An option missing from the order gets no letter.
  function letters(q, order, keys) {
    if (!keys || !keys.length) return 'No answer';
    const pos = (k) => { const i = order.indexOf(k); return i < 0 ? Infinity : i; };
    return [...keys].sort((a, b) => pos(a) - pos(b)).map((k) => {
      const opt = q.options.find((o) => o.key === k);
      const text = opt ? opt.text : k;
      const i = order.indexOf(k);
      return q.type === 'tf' || i < 0 || i >= 8 ? text : `${HR.paper.label(i)}. ${text}`;
    }).join('; ');
  }

  async function render(el, key, index) {
    const { h, sourceBadge } = HR.ui;
    const store = HR.app.store;
    const attempt = (store.get().attempts[key] || [])[index];
    if (!attempt) throw new Error('This result no longer exists.');
    await HR.tests.ensureLoaded(key, Object.fromEntries(attempt.paper.map((p) => [p.id, {}])));
    const rows = attempt.paper.map((p) => ({ p, q: HR.tests.findQuestion(p.id) }));
    const live = rows.filter((r) => r.q);
    const r = HR.scoring.scoreAttempt(live.map((x) => x.q), attempt.answers);
    const back = HR.ui.backHref(key);

    el.append(
      h('section', { class: 'card' },
        h('h1', null, `${HR.tests.title(key)}: results`),
        h('p', { style: 'font-size:1.4rem;margin:.25rem 0' },
          h('strong', null, `${attempt.earned} / ${attempt.total} points (${attempt.pct}%)`), ' ',
          h('span', { class: attempt.passed ? 'badge good' : 'badge bad' }, attempt.passed ? 'Passed' : 'Not passed')),
        h('p', { class: 'small muted' }, `${attempt.mode === 'practice' ? 'Practice' : 'Exam'} mode · ${HR.ui.duration(attempt.secs)} · Pass mark 60%`),
        (r.total !== attempt.total || r.earned !== attempt.earned) && h('p', { class: 'small warned' }, 'Some questions have since been corrected, so the score below may differ from the recorded score.'),
        live.length < rows.length && h('p', { class: 'small warned' }, `${rows.length - live.length} question${rows.length - live.length === 1 ? ' is' : 's are'} no longer available and not shown below.`),
        h('ul', { class: 'list' }, Object.entries(r.byType).map(([t, b]) =>
          h('li', null, `${TYPE_NAME[t]}: ${b.correct}/${b.count} correct, ${b.earned}/${b.total} points`))),
        h('div', { class: 'row' },
          h('a', { class: 'btn primary', href: `#/test/${encodeURIComponent(key)}` }, 'Retake'),
          h('a', { class: 'btn', href: back }, 'Back'))),
      h('section', { class: 'card' }, h('h2', null, 'Review'),
        live.map(({ p, q }, i) => {
          const chosen = attempt.answers[q.id];
          const ok = HR.scoring.isCorrect(q, chosen);
          return h('div', { class: 'review' },
            h('div', { class: 'row spread' },
              h('strong', { class: ok ? 'good' : 'bad' }, ok ? 'Correct' : 'Incorrect'),
              attempt.uncertain[q.id] && h('span', { class: 'badge warned' }, 'Marked Uncertain')),
            h('p', { class: 'stem' }, `${i + 1}. ${q.stem}`),
            q.note && h('p', { class: 'small warned' }, q.note),
            q.appearsIn && h('p', { class: 'small muted' }, `Appeared in: ${q.appearsIn.join(', ')}`),
            h('p', { class: 'small' }, h('strong', null, 'Your answer: '), letters(q, p.optionOrder, chosen)),
            h('p', { class: 'small' }, h('strong', null, 'Correct answer: '), letters(q, p.optionOrder, q.answer)),
            h('p', { class: 'small' }, q.explanation),
            q.flag && h('p', { class: 'small warned' }, q.flag),
            sourceBadge(q));
        })),
    );
  }

  HR.ui.results = { render };
})(globalThis);
