(function (root) {
  const HR = root.HR;
  const TYPE_NAME = { single: 'Single-answer', multi: 'Multiple-answer', tf: 'True/False' };

  function letters(q, order, keys) {
    if (!keys || !keys.length) return 'No answer';
    return keys.map((k) => {
      const opt = q.options.find((o) => o.key === k);
      const text = opt ? opt.text : k;
      return q.type === 'tf' ? text : `${HR.paper.label(order.indexOf(k))}. ${text}`;
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
    const { id, kind } = HR.tests.parseKey(key);
    const back = kind === 'full' ? '#/mocks' : key === 'retry:all' ? '#/' : `#/s/${id}`;

    el.append(
      h('section', { class: 'card' },
        h('h1', null, `${HR.tests.title(key)}: results`),
        h('p', { style: 'font-size:1.4rem;margin:.25rem 0' },
          h('strong', null, `${attempt.earned} / ${attempt.total} points (${attempt.pct}%)`), ' ',
          h('span', { class: attempt.passed ? 'badge good' : 'badge bad' }, attempt.passed ? 'Passed' : 'Not passed')),
        h('p', { class: 'small muted' }, `${attempt.mode === 'practice' ? 'Practice' : 'Exam'} mode · ${Math.round(attempt.secs / 60)} min · Pass mark 60%`),
        r.total !== attempt.total && h('p', { class: 'small warned' }, 'Some questions have since been corrected, so the score below may differ from the recorded score.'),
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
