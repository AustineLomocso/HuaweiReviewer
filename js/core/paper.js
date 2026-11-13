(function (root) {
  const TYPE_ORDER = ['single', 'multi', 'tf'];

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, rand) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Question order and option order shuffle independently. Without explicit choices,
  // keepOrder turns both off and its absence turns both on, as before.
  function buildPaper(questions, { seed, keepOrder = false, shuffleQuestions, shuffleOptions }) {
    const rand = rng(seed);
    const mixQuestions = shuffleQuestions === undefined ? !keepOrder : shuffleQuestions;
    const mixOptions = shuffleOptions === undefined ? !keepOrder : shuffleOptions;
    const ordered = mixQuestions
      ? TYPE_ORDER.flatMap((t) => shuffled(questions.filter((q) => q.type === t), rand))
      : questions;
    return ordered.map((q) => {
      const keys = q.options.map((o) => o.key);
      return { id: q.id, optionOrder: !mixOptions || q.type === 'tf' ? keys : shuffled(keys, rand) };
    });
  }

  function label(i) {
    return 'ABCDEFGH'[i];
  }

  const SECONDS_PER_QUESTION = 90;
  const timeLimitMs = (count) => count * SECONDS_PER_QUESTION * 1000;

  // The question's number on its original paper: Nationals keep their printed number, others their position.
  const originalNumber = (q, index) => (Number.isInteger(q.number) ? q.number : index + 1);

  // What earlier attempts of one test say about each question: the latest answered result and the latest Uncertain mark.
  function questionHistory(attempts) {
    const scoring = root.HR.scoring;
    const out = {};
    (attempts || []).forEach((a) => {
      (a.paper || []).forEach(({ id }) => {
        const entry = (out[id] = out[id] || { answered: false, wrong: false, uncertain: false });
        entry.uncertain = !!(a.uncertain && a.uncertain[id]);
        const chosen = (a.answers && a.answers[id]) || [];
        if (chosen.length) {
          entry.answered = true;
          entry.chosen = chosen;
        }
      });
    });
    return { entries: out, isWrong: (q) => {
      const e = out[q.id];
      return !!(e && e.answered && scoring.isGraded(q) && !scoring.isCorrect(q, e.chosen));
    } };
  }

  // Picks the questions for one sitting. Filters: from/to (original numbers), types, status
  // ('all' | 'wrong' | 'uncertain' | 'unanswered'), and an optional random count drawn with seed.
  function selectSubset(questions, filters = {}, attempts = []) {
    const { from = null, to = null, types = null, status = 'all', count = null, seed = 1 } = filters;
    const hist = questionHistory(attempts);
    let picked = questions.filter((q, i) => {
      const n = originalNumber(q, i);
      if (from !== null && n < from) return false;
      if (to !== null && n > to) return false;
      if (types && !types.includes(q.type)) return false;
      const e = hist.entries[q.id];
      if (status === 'wrong') return hist.isWrong(q);
      if (status === 'uncertain') return !!(e && e.uncertain);
      if (status === 'unanswered') return !(e && e.answered);
      return true;
    });
    if (count !== null && count > 0 && count < picked.length) {
      const keep = new Set(shuffled(picked, rng(seed)).slice(0, count).map((q) => q.id));
      picked = picked.filter((q) => keep.has(q.id));
    }
    return { questions: picked, partial: picked.length < questions.length };
  }

  function newSession(questions, opts) {
    const { seed, mode, timed, now, timeLimitMs: limit } = opts;
    const ms = limit !== undefined ? limit : (timed ? timeLimitMs(questions.length) : null);
    return {
      paper: buildPaper(questions, opts),
      answers: {},
      uncertain: {},
      checked: {},
      cur: 0,
      mode,
      autoAdvance: !!opts.autoAdvance,
      layout: opts.layout === 'page' ? 'page' : 'single',
      showSource: opts.showSource !== false,
      partial: !!opts.partial,
      filters: opts.filters || null,
      startedAt: now,
      deadline: mode === 'exam' && ms ? now + ms : null,
      seed,
    };
  }

  root.HR = root.HR || {};
  root.HR.paper = { rng, buildPaper, label, timeLimitMs, originalNumber, questionHistory, selectSubset, newSession };
})(globalThis);
