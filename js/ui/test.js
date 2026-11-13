(function (root) {
  const HR = root.HR;
  const TYPE_NAME = { single: 'Single-Answer Question', multi: 'Multiple-Answer Question', tf: 'True or False' };

  function startScreen(el, key, questions, failed) {
    const { h } = HR.ui;
    const store = HR.app.store;
    const practice = HR.tests.allowsPractice(key);
    const totalPoints = questions.reduce((n, q) => n + HR.scoring.POINTS[q.type], 0);
    let mode = 'exam';
    const timed = h('input', { type: 'checkbox', id: 'timed' });
    const timerRow = h('label', { class: 'row', for: 'timed' }, timed,
      `Use a timer (${HR.paper.timeLimitMs(questions.length) / 60000} minutes, submits automatically)`);
    const setMode = (m) => { mode = m; timerRow.hidden = m === 'practice'; };

    const begin = () => {
      const session = HR.paper.newSession(questions, {
        seed: Date.now() >>> 0, mode, timed: timed.checked, now: Date.now(),
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

  const TYPE_SHORT = { single: 'Single-answer', multi: 'Multiple-answer', tf: 'True/False' };

  // Pre-start choices for whole papers (earlier mocks and Nationals). Every visit starts from the defaults.
  function setupScreen(el, key, questions, failed) {
    const { h } = HR.ui;
    const store = HR.app.store;
    const attempts = store.get().attempts[key] || [];
    const numbers = questions.map((q, i) => HR.paper.originalNumber(q, i));
    const first = numbers.length ? Math.min(...numbers) : 1;
    const last = numbers.length ? Math.max(...numbers) : 1;
    const types = ['single', 'multi', 'tf'].filter((t) => questions.some((q) => q.type === t));
    const hasSources = questions.some((q) => HR.tests.sourceImages(q).length);
    const ungradedAll = questions.filter((q) => !HR.scoring.isGraded(q)).length;

    const radio = (name, id, label, checked) => h('label', { class: 'row', for: id },
      h('input', { type: 'radio', name, id, checked, onchange: () => refresh() }), label);
    const box = (id, label, checked) => h('label', { class: 'row', for: id },
      h('input', { type: 'checkbox', id, checked, onchange: () => refresh() }), label);
    const num = (id, value, min, max, placeholder) => h('input', {
      type: 'number', id, value, min, max, placeholder, class: 'num-input', oninput: () => refresh(),
    });

    const modeExam = radio('setup-mode', 'setup-mode-exam', 'Exam: answers shown after you submit', true);
    const modePractice = radio('setup-mode', 'setup-mode-practice', 'Practice: check each answer as you go, no timer', false);
    const timer = h('select', { id: 'setup-timer', onchange: () => refresh() },
      h('option', { value: 'off' }, 'No timer'),
      h('option', { value: 'per' }, '90 seconds per question'),
      h('option', { value: 'custom' }, 'Custom total time'));
    const minutes = num('setup-minutes', '30', 1, 600, 'minutes');
    const minutesRow = h('label', { class: 'row', for: 'setup-minutes' }, minutes, 'minutes in total');
    const timerBlock = h('div', null,
      h('label', { class: 'row', for: 'setup-timer' }, 'Timer', timer), minutesRow,
      h('p', { class: 'small muted' }, 'The test submits automatically when time runs out.'));

    const orderOriginal = radio('setup-order', 'setup-order-original', 'Original question order and numbering', true);
    const orderShuffle = radio('setup-order', 'setup-order-shuffle', 'Shuffle questions (grouped by question type)', false);
    const shuffleOpts = box('setup-shuffle-options', 'Shuffle the order of answer options', false);

    const from = num('setup-from', String(first), first, last, String(first));
    const to = num('setup-to', String(last), first, last, String(last));
    const typeBoxes = types.map((t) => box(`setup-type-${t}`, `${TYPE_SHORT[t]} (${questions.filter((q) => q.type === t).length})`, true));
    const statusCount = (st) => HR.paper.selectSubset(questions, { status: st }, attempts).questions.length;
    const status = h('select', { id: 'setup-status', onchange: () => refresh() },
      h('option', { value: 'all' }, 'All questions'),
      h('option', { value: 'wrong', disabled: !attempts.length }, `Answered wrong last time (${statusCount('wrong')})`),
      h('option', { value: 'uncertain', disabled: !attempts.length }, `Marked Uncertain last time (${statusCount('uncertain')})`),
      h('option', { value: 'unanswered' }, `Never answered (${statusCount('unanswered')})`));
    const count = num('setup-count', '', 1, questions.length, 'all');

    const layoutSingle = radio('setup-layout', 'setup-layout-single', 'One question at a time', true);
    const layoutPage = radio('setup-layout', 'setup-layout-page', 'All questions on one page', false);
    const autoAdvance = box('setup-autoadvance', 'Jump to the next question automatically after answering', false);
    const showSource = box('setup-source', 'Show a link to the original screenshot under each question', true);

    const summary = h('p', { id: 'setup-summary', class: 'status-line', 'aria-live': 'polite' });
    const start = h('button', { class: 'btn primary', id: 'setup-start', onclick: () => begin() }, 'Start');
    const on = (wrap) => wrap.querySelector('input').checked;
    const intOrNull = (input) => {
      const n = parseInt(input.value, 10);
      return Number.isFinite(n) ? n : null;
    };

    function read() {
      const practice = on(modePractice);
      const chosenTypes = types.filter((t, i) => on(typeBoxes[i]));
      const filters = {
        from: intOrNull(from), to: intOrNull(to),
        types: chosenTypes.length === types.length ? null : chosenTypes,
        status: status.value, count: intOrNull(count), seed: Date.now() >>> 0,
      };
      if (filters.from !== null && filters.from <= first) filters.from = null;
      if (filters.to !== null && filters.to >= last) filters.to = null;
      const { questions: picked, partial } = HR.paper.selectSubset(questions, filters, attempts);
      let limit = null;
      if (!practice && timer.value === 'per') limit = HR.paper.timeLimitMs(picked.length);
      if (!practice && timer.value === 'custom') limit = Math.max(1, intOrNull(minutes) || 0) * 60000;
      return { practice, filters, picked, partial, limit };
    }

    function refresh() {
      const r = read();
      timerBlock.hidden = r.practice;
      minutesRow.hidden = timer.value !== 'custom';
      autoAdvance.hidden = r.practice || on(layoutPage);
      const pts = r.picked.reduce((n, q) => n + (HR.scoring.isGraded(q) ? HR.scoring.POINTS[q.type] : 0), 0);
      const ungraded = r.picked.filter((q) => !HR.scoring.isGraded(q)).length;
      summary.textContent = [
        `${r.picked.length} of ${questions.length} questions`,
        `${pts} points`,
        ungraded && `${ungraded} not graded`,
        r.partial && 'Partial: not counted toward Best or Passed',
        r.limit ? `Timer ${Math.round(r.limit / 60000)} min` : 'No timer',
      ].filter(Boolean).join(' · ');
      start.disabled = r.picked.length === 0;
    }

    function begin() {
      const r = read();
      if (!r.picked.length) return;
      const page = on(layoutPage);
      const session = HR.paper.newSession(r.picked, {
        seed: Date.now() >>> 0,
        mode: r.practice ? 'practice' : 'exam',
        timeLimitMs: r.limit,
        shuffleQuestions: on(orderShuffle),
        shuffleOptions: on(shuffleOpts),
        layout: page ? 'page' : 'single',
        autoAdvance: !r.practice && !page && on(autoAdvance),
        showSource: hasSources && on(showSource),
        partial: r.partial,
        filters: r.partial ? r.filters : null,
        now: Date.now(),
      });
      store.update((st) => {
        st.inProgress[key] = session;
        st.last = { hash: `#/test/${encodeURIComponent(key)}`, label: HR.tests.title(key), at: Date.now() };
      });
      HR.app.rerender();
    }

    const group = (title, ...children) => h('fieldset', { class: 'setup-group' }, h('legend', null, title), children);
    el.append(h('section', { class: 'card setup' },
      h('h1', null, HR.tests.title(key)),
      h('p', null, `${questions.length} questions · pass mark 60%`, ungradedAll ? ` · ${ungradedAll} not graded` : ''),
      failed > 0 && h('p', { class: 'warned' }, `${failed} section${failed === 1 ? '' : 's'} could not be loaded, so some questions are missing.`),
      h('p', { class: 'small muted' }, 'Choose how to review this paper. Multiple-answer questions earn points only if you select exactly the correct options.'),
      group('Mode and timer', modeExam, modePractice, timerBlock),
      group('Order', orderOriginal, orderShuffle, shuffleOpts),
      group('Questions',
        h('div', { class: 'row' }, h('label', { for: 'setup-from' }, 'From number'), from, h('label', { for: 'setup-to' }, 'to'), to),
        h('div', { class: 'row' }, typeBoxes),
        h('label', { class: 'row', for: 'setup-status' }, 'Include', status),
        h('label', { class: 'row', for: 'setup-count' }, 'Random sample of', count, 'questions (blank for all)')),
      group('Navigation', layoutSingle, layoutPage, autoAdvance, hasSources && showSource),
      summary,
      h('div', { class: 'row' }, start)));
    refresh();
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
        partial: !!session.partial, filters: session.filters || null, ungraded: r.ungraded || 0,
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

    const pageLayout = () => { const s = session(); return !!s && s.layout === 'page'; };
    const cardOf = (i) => main.querySelector(`#qcard-${i}`);

    function go(i) {
      clearTimeout(advanceId);
      if (i < 0 || i >= usable.length) return;
      if (!edit((s) => { s.cur = i; })) return;
      if (pageLayout()) {
        drawNav();
        const card = cardOf(i);
        if (card) {
          if (card.scrollIntoView) card.scrollIntoView({ block: 'start' });
          const first = card.querySelector('input');
          if (first) first.focus({ preventScroll: true });
        }
        return;
      }
      draw();
    }

    // Redraws after an answer changes: the whole screen in single layout, only that card on the one-page layout.
    function redrawFor(i) {
      if (pageLayout()) { drawNav(); drawCard(i); } else draw();
    }

    function select(q, optKey, i) {
      const before = session();
      if (!before) { HR.app.rerender(); return; }
      if (before.checked[q.id]) return;
      if (!edit((s) => {
        const cur = s.answers[q.id] || [];
        s.answers[q.id] = q.type === 'multi'
          ? (cur.includes(optKey) ? cur.filter((k) => k !== optKey) : [...cur, optKey])
          : [optKey];
        s.cur = i;
        // Practice shows the verdict as soon as a single-answer or True/False option is chosen, and locks the question.
        if (s.mode === 'practice' && HR.scoring.revealsOnSelect(q)) s.checked[q.id] = true;
      })) return;
      redrawFor(i);
      const scope = cardOf(i) || main;
      const input = [...scope.querySelectorAll('input[data-key]')].find((x) => x.dataset.key === optKey);
      if (input) input.focus({ preventScroll: true });
      const s = session();
      if (s.checked[q.id]) {
        const fb = scope.querySelector('.feedback');
        if (fb && fb.scrollIntoView) fb.scrollIntoView({ block: 'nearest' });
      }
      // Exam only: in Practice the student must see the feedback, so nothing jumps ahead.
      if (s.autoAdvance && s.layout !== 'page' && q.type !== 'multi' && s.mode === 'exam' && curOf(s) < usable.length - 1) {
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
      // Wrapped in h(), which drops the false entry; append() would print it.
      nav.append(h('div', null, h('div', { class: 'small muted' }, `Uncertain ${uncertain} · Unanswered ${blank}`),
        s.layout !== 'page' && h('label', { class: 'row small', style: 'margin-top:.5rem' },
          h('input', {
            type: 'checkbox', checked: s.autoAdvance,
            onchange: (e) => { const on = e.target.checked; edit((x) => { x.autoAdvance = on; }); },
          }), 'Jump to the next question automatically')));
      answeredCount.textContent = `Answered ${usable.length - blank}/${usable.length}`;
    }

    // Links to the original exam screenshots, relative to index.html.
    function sourceLinks(q) {
      const images = HR.tests.sourceImages(q);
      if (!images.length) return null;
      return h('p', { class: 'small source-link' }, images.map((image, n) => [n ? ' · ' : '', h('a', {
        href: image.split('/').map(encodeURIComponent).join('/'), target: '_blank', rel: 'noopener',
      }, images.length > 1 ? `Original screenshot ${n + 1}` : 'Original screenshot')]));
    }

    function questionCard(i) {
      const s = session();
      const page = s.layout === 'page';
      const p = usable[i];
      const q = byId[p.id];
      const chosen = s.answers[q.id] || [];
      const checked = s.mode === 'practice' && !!s.checked[q.id];
      const graded = HR.scoring.isGraded(q);
      const answer = q.answer || [];
      const ok = HR.scoring.isCorrect(q, chosen);
      const last = i === usable.length - 1;
      return h('section', { class: 'card question-card', id: `qcard-${i}`, tabindex: '-1' },
        h('div', { class: 'small muted row spread' },
          h('span', null, [
            TYPE_NAME[q.type], `Question ${i + 1}/${usable.length}`,
            Number.isInteger(q.number) && `Paper no. ${q.number}`,
            graded ? `${HR.scoring.POINTS[q.type]} points` : 'Not graded',
          ].filter(Boolean).join(' · ')),
          !page && h('span', null, 'Use arrow keys to switch questions')),
        h('p', { class: 'stem' }, `${i + 1}. ${q.stem}`),
        q.note && h('p', { class: 'small warned' }, q.note),
        q.appearsIn && h('p', { class: 'small muted' }, `Appeared in: ${q.appearsIn.join(', ')}`),
        orderOf(p, q).map((k, n) => {
          const opt = q.options.find((o) => o.key === k);
          const isAns = answer.includes(k);
          const cls = ['option'];
          if (checked && isAns) cls.push('right');
          if (checked && graded && !isAns && chosen.includes(k)) cls.push('wrong');
          return h('label', { class: cls.join(' ') },
            h('input', {
              type: q.type === 'multi' ? 'checkbox' : 'radio', name: `opt-${i}`, 'data-key': k, checked: chosen.includes(k),
              disabled: checked, onclick: () => select(q, k, i),
            }),
            h('span', null, q.type === 'tf' ? opt.text : `${HR.paper.label(n)}. ${opt.text}`));
        }),
        s.showSource && sourceLinks(q),
        checked && h('div', { class: 'card feedback', style: 'margin-top:.75rem', role: 'status' },
          graded
            ? h('strong', { class: ok ? 'good' : 'bad' }, ok ? 'Correct' : 'Incorrect')
            : h('strong', { class: 'warned' }, 'Not graded: this question has no agreed answer'),
          q.explanation && h('p', null, q.explanation), q.flag && h('p', { class: 'warned small' }, q.flag), sourceBadge(q)),
        h('div', { class: 'row', style: 'margin-top:1rem' },
          !page && i > 0 && h('button', { class: 'btn', onclick: () => go(i - 1) }, 'Previous'),
          !page && !last && h('button', { class: 'btn primary', onclick: () => go(i + 1) }, 'Next'),
          h('button', {
            class: s.uncertain[q.id] ? 'btn on' : 'btn warn',
            onclick: () => {
              if (edit((x) => { x.cur = i; if (x.uncertain[q.id]) delete x.uncertain[q.id]; else x.uncertain[q.id] = true; })) redrawFor(i);
            },
          }, 'Uncertain'),
          s.mode === 'practice' && !checked && q.type === 'multi' && h('button', {
            class: 'btn', disabled: chosen.length === 0,
            onclick: () => { if (edit((x) => { x.cur = i; x.checked[q.id] = true; })) redrawFor(i); },
          }, 'Submit answer'),
          !page && last && h('button', { class: 'btn primary', onclick: confirmSubmit }, 'Submit')));
    }

    function drawCard(i) {
      const old = cardOf(i);
      if (old && session()) old.replaceWith(questionCard(i));
    }

    function drawQuestion() {
      const s = session();
      if (!s) return;
      if (s.layout === 'page') {
        main.replaceChildren(...usable.map((p, i) => questionCard(i)),
          h('div', { class: 'row', style: 'margin:1rem 0' },
            h('button', { class: 'btn primary', onclick: confirmSubmit }, 'Submit')));
        return;
      }
      main.replaceChildren(questionCard(curOf(s)));
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
      if (pageLayout()) return;
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

    const totalPoints = usable.reduce((n, p) => n + (HR.scoring.isGraded(byId[p.id]) ? HR.scoring.POINTS[byId[p.id].type] : 0), 0);
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
    const questions = HR.tests.resolve(key, store.get().retry);
    if (HR.tests.parseKey(key).kind === 'full') setupScreen(el, key, questions, failed);
    else startScreen(el, key, questions, failed);
    return null;
  }

  HR.ui.test = { render };
})(globalThis);
