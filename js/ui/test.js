(function (root) {
  const HR = root.HR;
  const TYPE_NAME = { single: 'Single-Answer Question', multi: 'Multiple-Answer Question', tf: 'True or False' };

  function startScreen(el, key, questions) {
    const { h } = HR.ui;
    const store = HR.app.store;
    const practice = HR.tests.allowsPractice(key);
    const isMock = HR.tests.parseKey(key).kind === 'full';
    const totalPoints = questions.reduce((n, q) => n + HR.scoring.POINTS[q.type], 0);
    let mode = 'exam';
    const timed = h('input', { type: 'checkbox', id: 'timed' });
    const timerRow = h('label', { class: 'row', for: 'timed' }, timed,
      `Use a timer (${HR.paper.timeLimitMs(questions.length) / 60000} minutes, submits automatically)`);
    const setMode = (m) => { mode = m; timerRow.hidden = m === 'practice'; };

    const begin = () => {
      const prior = (store.get().attempts[key] || []).length;
      const session = HR.paper.newSession(questions, {
        seed: Date.now() >>> 0, mode, timed: timed.checked, keepOrder: isMock && prior === 0, now: Date.now(),
      });
      store.update((st) => { st.inProgress[key] = session; });
      HR.app.rerender();
    };

    el.append(h('section', { class: 'card' },
      h('h1', null, HR.tests.title(key)),
      h('p', null, `${questions.length} questions · ${totalPoints} points · pass mark 60%`),
      h('p', { class: 'small muted' }, 'Multiple-answer questions earn points only if you select exactly the correct options.'),
      practice && h('div', { style: 'margin-bottom:.75rem' },
        h('label', { class: 'row' }, h('input', { type: 'radio', name: 'mode', checked: true, onchange: () => setMode('exam') }), 'Exam mode: answers shown after you submit'),
        h('label', { class: 'row' }, h('input', { type: 'radio', name: 'mode', onchange: () => setMode('practice') }), 'Practice mode: check each answer as you go, no timer')),
      timerRow,
      h('div', { class: 'row', style: 'margin-top:1rem' },
        h('button', { class: 'btn primary', onclick: begin, disabled: questions.length === 0 }, 'Start'))));
  }

  function submit(key, questions, session) {
    const store = HR.app.store;
    const r = HR.scoring.scoreAttempt(questions, session.answers);
    const now = Date.now();
    let index = 0;
    store.update((st) => {
      const list = (st.attempts[key] = st.attempts[key] || []);
      list.push({
        at: now, mode: session.mode, pct: r.pct, earned: r.earned, total: r.total, passed: r.passed,
        secs: Math.round((now - session.startedAt) / 1000), paper: session.paper,
        answers: session.answers, uncertain: session.uncertain,
      });
      index = list.length - 1;
      HR.progress.applyRetry(st.retry, questions, session.answers, session.uncertain, now);
      delete st.inProgress[key];
    });
    location.hash = `#/results/${encodeURIComponent(key)}/${index}`;
  }

  function examScreen(el, key, questions) {
    const { h, sourceBadge } = HR.ui;
    const store = HR.app.store;
    const session = () => store.get().inProgress[key];
    const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
    const usable = session().paper.filter((p) => byId[p.id]);
    const main = h('div', { class: 'grow' });
    const nav = h('div', { class: 'nav-panel' });
    const clock = h('strong');
    const answeredCount = h('span');
    let timerId = null;
    let advanceId = null;

    const finish = () => submit(key, questions, session());

    function confirmSubmit() {
      const s = session();
      const blank = usable.filter((p) => !(s.answers[p.id] || []).length).length;
      const msg = blank ? `${blank} question${blank === 1 ? ' is' : 's are'} unanswered. Submit anyway?` : 'Submit this test?';
      if (confirm(msg)) finish();
    }

    function go(i) {
      if (i < 0 || i >= usable.length) return;
      store.update(() => { session().cur = i; });
      draw();
    }

    function select(p, q, key2) {
      if (session().checked[q.id]) return;
      store.update(() => {
        const s = session();
        const cur = s.answers[q.id] || [];
        s.answers[q.id] = q.type === 'multi'
          ? (cur.includes(key2) ? cur.filter((k) => k !== key2) : [...cur, key2])
          : [key2];
      });
      draw();
      const s = session();
      if (s.autoAdvance && q.type !== 'multi' && s.mode === 'exam' && s.cur < usable.length - 1) {
        clearTimeout(advanceId);
        advanceId = setTimeout(() => go(session().cur + 1), 250);
      }
    }

    function drawNav() {
      const s = session();
      nav.replaceChildren();
      ['single', 'multi', 'tf'].forEach((t) => {
        const items = usable.map((p, i) => ({ p, i })).filter(({ p }) => byId[p.id].type === t);
        if (!items.length) return;
        nav.append(h('div', { class: 'small' }, h('strong', null, TYPE_NAME[t]), ` (${items.length})`),
          h('div', { class: 'nav-grid' }, items.map(({ p, i }) => {
            const cls = ['nav-q'];
            if ((s.answers[p.id] || []).length) cls.push('answered');
            if (s.uncertain[p.id]) cls.push('uncertain');
            if (i === s.cur) cls.push('current');
            return h('button', { class: cls.join(' '), onclick: () => go(i) }, i + 1);
          })));
      });
      const uncertain = usable.filter((p) => s.uncertain[p.id]).length;
      const blank = usable.filter((p) => !(s.answers[p.id] || []).length).length;
      nav.append(h('div', { class: 'small muted' }, `Uncertain ${uncertain} · Unanswered ${blank}`),
        h('label', { class: 'row small', style: 'margin-top:.5rem' },
          h('input', {
            type: 'checkbox', checked: s.autoAdvance,
            onchange: (e) => store.update(() => { session().autoAdvance = e.target.checked; }),
          }), 'Jump to the next question automatically'));
      answeredCount.textContent = `Answered ${usable.length - blank}/${usable.length}`;
    }

    function drawQuestion() {
      const s = session();
      const p = usable[s.cur];
      const q = byId[p.id];
      const chosen = s.answers[q.id] || [];
      const checked = !!s.checked[q.id];
      main.replaceChildren(h('section', { class: 'card' },
        h('div', { class: 'small muted row spread' },
          h('span', null, `${TYPE_NAME[q.type]} · Question ${s.cur + 1}/${usable.length} · ${HR.scoring.POINTS[q.type]} points`),
          h('span', null, 'Use arrow keys to switch questions')),
        h('p', { class: 'stem' }, `${s.cur + 1}. ${q.stem}`),
        q.appearsIn && h('p', { class: 'small muted' }, `Appeared in: ${q.appearsIn.join(', ')}`),
        p.optionOrder.map((k, i) => {
          const opt = q.options.find((o) => o.key === k);
          const isAns = q.answer.includes(k);
          const cls = ['option'];
          if (checked && isAns) cls.push('right');
          if (checked && !isAns && chosen.includes(k)) cls.push('wrong');
          return h('label', { class: cls.join(' ') },
            h('input', {
              type: q.type === 'multi' ? 'checkbox' : 'radio', name: 'opt', checked: chosen.includes(k),
              disabled: checked, onchange: () => select(p, q, k),
            }),
            h('span', null, q.type === 'tf' ? opt.text : `${HR.paper.label(i)}. ${opt.text}`));
        }),
        checked && h('div', { class: 'card', style: 'margin-top:.75rem' },
          h('strong', { class: HR.scoring.isCorrect(q, chosen) ? 'good' : 'bad' }, HR.scoring.isCorrect(q, chosen) ? 'Correct' : 'Incorrect'),
          h('p', null, q.explanation), q.flag && h('p', { class: 'warned small' }, q.flag), sourceBadge(q)),
        h('div', { class: 'row', style: 'margin-top:1rem' },
          s.cur > 0 && h('button', { class: 'btn', onclick: () => go(s.cur - 1) }, 'Previous'),
          s.cur < usable.length - 1 && h('button', { class: 'btn primary', onclick: () => go(s.cur + 1) }, 'Next'),
          h('button', {
            class: s.uncertain[q.id] ? 'btn on' : 'btn warn',
            onclick: () => { store.update(() => { const u = session().uncertain; if (u[q.id]) delete u[q.id]; else u[q.id] = true; }); draw(); },
          }, 'Uncertain'),
          s.mode === 'practice' && !checked && h('button', {
            class: 'btn', disabled: chosen.length === 0,
            onclick: () => { store.update(() => { session().checked[q.id] = true; }); draw(); },
          }, 'Check answer'),
          s.cur === usable.length - 1 && h('button', { class: 'btn primary', onclick: confirmSubmit }, 'Submit'))));
    }

    function draw() { drawNav(); drawQuestion(); }

    function tick() {
      const s = session();
      if (!s) return;
      if (s.deadline === null) { clock.textContent = 'No timer'; return; }
      const left = s.deadline - Date.now();
      if (left <= 0) { clearInterval(timerId); finish(); return; }
      const total = Math.ceil(left / 1000);
      const hh = String(Math.floor(total / 3600)).padStart(2, '0');
      const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      const ss = String(total % 60).padStart(2, '0');
      clock.textContent = `Time left ${hh}:${mm}:${ss}`;
    }

    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(session().cur - 1);
      if (e.key === 'ArrowRight') go(session().cur + 1);
    };

    const totalPoints = usable.reduce((n, p) => n + HR.scoring.POINTS[byId[p.id].type], 0);
    el.append(
      h('div', { class: 'exam-top row spread' },
        h('strong', { class: 'grow' }, HR.tests.title(key)),
        h('span', { class: 'small' }, `Total ${totalPoints} points`),
        h('span', { class: 'small' }, answeredCount),
        clock,
        h('button', {
          class: 'btn',
          onclick: () => {
            if (confirm('Discard this attempt? It will not be saved.')) {
              store.update((st) => { delete st.inProgress[key]; });
              HR.app.rerender();
            }
          },
        }, 'Discard'),
        h('button', { class: 'btn primary', onclick: confirmSubmit }, 'Submit')),
      h('div', { class: 'exam' }, nav, main),
    );
    draw();
    tick();
    timerId = setInterval(tick, 1000);
    document.addEventListener('keydown', onKey);
    return () => {
      clearInterval(timerId);
      clearTimeout(advanceId);
      document.removeEventListener('keydown', onKey);
    };
  }

  async function render(el, key) {
    const store = HR.app.store;
    const session = store.get().inProgress[key];
    const paperIds = session ? Object.fromEntries(session.paper.map((p) => [p.id, {}])) : {};
    await HR.tests.ensureLoaded(key, { ...store.get().retry, ...paperIds });
    if (session) {
      const fromPaper = session.paper.map((p) => HR.tests.findQuestion(p.id)).filter(Boolean);
      return examScreen(el, key, fromPaper);
    }
    startScreen(el, key, HR.tests.resolve(key, store.get().retry));
    return null;
  }

  HR.ui.test = { render };
})(globalThis);
