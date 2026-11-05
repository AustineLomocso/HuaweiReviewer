(function (root) {
  const HR = root.HR;
  const TYPE_NAME = { single: 'Single-Answer Question', multi: 'Multiple-Answer Question', tf: 'True or False' };

  function startScreen(el, key, questions, failed) {
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
      store.update((st) => {
        st.inProgress[key] = session;
        st.last = { hash: `#/test/${encodeURIComponent(key)}`, label: HR.tests.title(key), at: Date.now() };
      });
      HR.app.rerender();
    };

    el.append(h('section', { class: 'card' },
      h('h1', null, HR.tests.title(key)),
      h('p', null, `${questions.length} questions · ${totalPoints} points · pass mark 60%`),
      failed > 0 && h('p', { class: 'warned' }, `${failed} section${failed === 1 ? '' : 's'} could not be loaded, so some questions are missing.`),
      h('p', { class: 'small muted' }, 'Multiple-answer questions earn points only if you select exactly the correct options.'),
      practice && h('div', { style: 'margin-bottom:.75rem' },
        h('label', { class: 'row' }, h('input', { type: 'radio', name: 'mode', checked: true, onchange: () => setMode('exam') }), 'Exam mode: answers shown after you submit'),
        h('label', { class: 'row' }, h('input', { type: 'radio', name: 'mode', onchange: () => setMode('practice') }), 'Practice mode: check each answer as you go, no timer')),
      timerRow,
      h('div', { class: 'row', style: 'margin-top:1rem' },
        h('button', { class: 'btn primary', onclick: begin, disabled: questions.length === 0 }, 'Start'))));
  }

  // Everything is read from the stored session inside one update, so a sitting can only be recorded once
  // and the answers scored are always the latest ones, even if another tab changed them.
  function submit(key) {
    const store = HR.app.store;
    let index = -1;
    store.update((st) => {
      const session = st.inProgress[key];
      if (!session) return;
      const questions = session.paper.map((p) => HR.tests.findQuestion(p.id)).filter(Boolean);
      const r = HR.scoring.scoreAttempt(questions, session.answers);
      const now = Date.now();
      const end = session.deadline === null ? now : Math.min(now, session.deadline);
      const list = (st.attempts[key] = st.attempts[key] || []);
      list.push({
        at: now, mode: session.mode, pct: r.pct, earned: r.earned, total: r.total, passed: r.passed,
        secs: Math.max(0, Math.round((end - session.startedAt) / 1000)), paper: session.paper,
        answers: session.answers, uncertain: session.uncertain,
      });
      index = list.length - 1;
      HR.progress.applyRetry(st.retry, questions, session.answers, session.uncertain, now);
      delete st.inProgress[key];
    });
    location.hash = index >= 0 ? `#/results/${encodeURIComponent(key)}/${index}` : HR.ui.backHref(key);
  }

  function examScreen(el, key, questions) {
    const { h, sourceBadge } = HR.ui;
    const store = HR.app.store;
    const session = () => store.get().inProgress[key];
    const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
    const startedAt = session().startedAt;
    const usable = session().paper.filter((p) => byId[p.id]);

    if (usable.length === 0) {
      el.append(h('section', { class: 'card' },
        h('h1', null, HR.tests.title(key)),
        h('p', null, 'None of the questions in this saved attempt exist any more, so it cannot be resumed.'),
        h('button', {
          class: 'btn primary',
          onclick: () => { store.update((st) => { delete st.inProgress[key]; }); HR.app.rerender(); },
        }, 'Discard')));
      return null;
    }

    const main = h('div', { class: 'grow' });
    const nav = h('div', { class: 'nav-panel' });
    const clock = h('strong');
    const answeredCount = h('span');
    let timerId = null;
    let advanceId = null;

    const curOf = (s) => Math.min(Math.max(s.cur || 0, 0), usable.length - 1);

    // Runs fn on the stored session. If the session is gone (another tab submitted or discarded it), leaves the screen.
    function edit(fn) {
      let found = false;
      store.update((st) => {
        const s = st.inProgress[key];
        if (s) { fn(s); found = true; }
      });
      if (!found) HR.app.rerender();
      return found;
    }

    edit((s) => { s.cur = curOf(s); });

    // Options added since the attempt began go at the end; removed ones are dropped.
    function orderOf(p, q) {
      const have = q.options.map((o) => o.key);
      const kept = p.optionOrder.filter((k) => have.includes(k));
      return [...kept, ...have.filter((k) => !kept.includes(k))];
    }

    const finish = () => submit(key);

    function confirmSubmit() {
      const s = session();
      if (!s) { HR.app.rerender(); return; }
      const blank = usable.filter((p) => !(s.answers[p.id] || []).length).length;
      const msg = blank ? `${blank} question${blank === 1 ? ' is' : 's are'} unanswered. Submit anyway?` : 'Submit this test?';
      if (confirm(msg)) finish();
    }

    function go(i) {
      clearTimeout(advanceId);
      if (i < 0 || i >= usable.length) return;
      if (!edit((s) => { s.cur = i; })) return;
      draw();
    }

    function select(q, optKey) {
      const before = session();
      if (!before) { HR.app.rerender(); return; }
      if (before.checked[q.id]) return;
      if (!edit((s) => {
        const cur = s.answers[q.id] || [];
        s.answers[q.id] = q.type === 'multi'
          ? (cur.includes(optKey) ? cur.filter((k) => k !== optKey) : [...cur, optKey])
          : [optKey];
        // Practice shows the verdict as soon as a single-answer or True/False option is chosen, and locks the question.
        if (s.mode === 'practice' && HR.scoring.revealsOnSelect(q)) s.checked[q.id] = true;
      })) return;
      draw();
      const input = [...main.querySelectorAll('input[data-key]')].find((i) => i.dataset.key === optKey);
      if (input) input.focus();
      const s = session();
      if (s.checked[q.id]) {
        const fb = main.querySelector('.feedback');
        if (fb && fb.scrollIntoView) fb.scrollIntoView({ block: 'nearest' });
      }
      // Exam only: in Practice the student must see the feedback, so nothing jumps ahead.
      if (s.autoAdvance && q.type !== 'multi' && s.mode === 'exam' && curOf(s) < usable.length - 1) {
        clearTimeout(advanceId);
        advanceId = setTimeout(() => { const now = session(); if (now) go(curOf(now) + 1); }, 250);
      }
    }

    function drawNav() {
      const s = session();
      if (!s) return;
      nav.replaceChildren();
      ['single', 'multi', 'tf'].forEach((t) => {
        const items = usable.map((p, i) => ({ p, i })).filter(({ p }) => byId[p.id].type === t);
        if (!items.length) return;
        nav.append(h('div', { class: 'small' }, h('strong', null, TYPE_NAME[t]), ` (${items.length})`),
          h('div', { class: 'nav-grid' }, items.map(({ p, i }) => {
            const cls = ['nav-q'];
            if ((s.answers[p.id] || []).length) cls.push('answered');
            if (s.uncertain[p.id]) cls.push('uncertain');
            if (i === curOf(s)) cls.push('current');
            // Green or red only once a Practice question has been revealed. Exam mode never shows a verdict.
            const status = HR.scoring.revealedStatus(byId[p.id], s.answers[p.id], s.mode, s.checked[p.id]);
            if (status) cls.push(status);
            return h('button', {
              class: cls.join(' '), onclick: () => go(i),
              'aria-label': status ? HR.scoring.navLabel(i + 1, status) : null,
            }, i + 1);
          })));
      });
      const uncertain = usable.filter((p) => s.uncertain[p.id]).length;
      const blank = usable.filter((p) => !(s.answers[p.id] || []).length).length;
      nav.append(h('div', { class: 'small muted' }, `Uncertain ${uncertain} · Unanswered ${blank}`),
        h('label', { class: 'row small', style: 'margin-top:.5rem' },
          h('input', {
            type: 'checkbox', checked: s.autoAdvance,
            onchange: (e) => { const on = e.target.checked; edit((x) => { x.autoAdvance = on; }); },
          }), 'Jump to the next question automatically'));
      answeredCount.textContent = `Answered ${usable.length - blank}/${usable.length}`;
    }

    function drawQuestion() {
      const s = session();
      if (!s) return;
      const cur = curOf(s);
      const p = usable[cur];
      const q = byId[p.id];
      const chosen = s.answers[q.id] || [];
      const checked = s.mode === 'practice' && !!s.checked[q.id];
      const ok = HR.scoring.isCorrect(q, chosen);
      main.replaceChildren(h('section', { class: 'card' },
        h('div', { class: 'small muted row spread' },
          h('span', null, `${TYPE_NAME[q.type]} · Question ${cur + 1}/${usable.length} · ${HR.scoring.POINTS[q.type]} points`),
          h('span', null, 'Use arrow keys to switch questions')),
        h('p', { class: 'stem' }, `${cur + 1}. ${q.stem}`),
        q.note && h('p', { class: 'small warned' }, q.note),
        q.appearsIn && h('p', { class: 'small muted' }, `Appeared in: ${q.appearsIn.join(', ')}`),
        orderOf(p, q).map((k, i) => {
          const opt = q.options.find((o) => o.key === k);
          const isAns = q.answer.includes(k);
          const cls = ['option'];
          if (checked && isAns) cls.push('right');
          if (checked && !isAns && chosen.includes(k)) cls.push('wrong');
          return h('label', { class: cls.join(' ') },
            h('input', {
              type: q.type === 'multi' ? 'checkbox' : 'radio', name: 'opt', 'data-key': k, checked: chosen.includes(k),
              disabled: checked, onclick: () => select(q, k),
            }),
            h('span', null, q.type === 'tf' ? opt.text : `${HR.paper.label(i)}. ${opt.text}`));
        }),
        checked && h('div', { class: 'card feedback', style: 'margin-top:.75rem', role: 'status' },
          h('strong', { class: ok ? 'good' : 'bad' }, ok ? 'Correct' : 'Incorrect'),
          h('p', null, q.explanation), q.flag && h('p', { class: 'warned small' }, q.flag), sourceBadge(q)),
        h('div', { class: 'row', style: 'margin-top:1rem' },
          cur > 0 && h('button', { class: 'btn', onclick: () => go(cur - 1) }, 'Previous'),
          cur < usable.length - 1 && h('button', { class: 'btn primary', onclick: () => go(cur + 1) }, 'Next'),
          h('button', {
            class: s.uncertain[q.id] ? 'btn on' : 'btn warn',
            onclick: () => {
              if (edit((x) => { if (x.uncertain[q.id]) delete x.uncertain[q.id]; else x.uncertain[q.id] = true; })) draw();
            },
          }, 'Uncertain'),
          s.mode === 'practice' && !checked && q.type === 'multi' && h('button', {
            class: 'btn', disabled: chosen.length === 0,
            onclick: () => { if (edit((x) => { x.checked[q.id] = true; })) draw(); },
          }, 'Submit answer'),
          cur === usable.length - 1 && h('button', { class: 'btn primary', onclick: confirmSubmit }, 'Submit'))));
    }

    function draw() { drawNav(); drawQuestion(); }

    function tick() {
      const s = session();
      if (!s) { clearInterval(timerId); HR.app.rerender(); return; }
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
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      // Stops a focused radio group from changing its selection.
      e.preventDefault();
      const s = session();
      if (!s) { HR.app.rerender(); return; }
      go(curOf(s) + (e.key === 'ArrowLeft' ? -1 : 1));
    };

    // Another tab changed this test's saved state.
    const onStorage = () => {
      store.sync();
      const s = session();
      if (!s || s.startedAt !== startedAt) HR.app.rerender();
      else draw();
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
    root.addEventListener('storage', onStorage);
    return () => {
      clearInterval(timerId);
      clearTimeout(advanceId);
      document.removeEventListener('keydown', onKey);
      root.removeEventListener('storage', onStorage);
    };
  }

  async function render(el, key) {
    const store = HR.app.store;
    const session = store.get().inProgress[key];
    if (key === 'retry:all' && !session) {
      // Questions from a section that no longer exists can never load, so forget them up front.
      const gone = Object.keys(store.get().retry).filter((id) => {
        const sec = HR.tests.sectionOfQid(id);
        return sec && !HR.data.manifest[sec];
      });
      if (gone.length) store.update((st) => { gone.forEach((id) => { delete st.retry[id]; }); });
    }
    const paperIds = session ? Object.fromEntries(session.paper.map((p) => [p.id, {}])) : {};
    const { failed } = await HR.tests.ensureLoaded(key, { ...store.get().retry, ...paperIds });
    if (session) {
      const fromPaper = session.paper.map((p) => HR.tests.findQuestion(p.id)).filter(Boolean);
      return examScreen(el, key, fromPaper);
    }
    if (key === 'retry:all' && failed === 0) {
      const stale = Object.keys(store.get().retry).filter((id) => !HR.tests.findQuestion(id));
      if (stale.length) store.update((st) => { stale.forEach((id) => { delete st.retry[id]; }); });
    }
    startScreen(el, key, HR.tests.resolve(key, store.get().retry), failed);
    return null;
  }

  HR.ui.test = { render };
})(globalThis);
