# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session continuity

- **At the start of every session, read [docs/PROGRESS.md](docs/PROGRESS.md).** It holds the current state, what is waiting on the user, and the next steps.
- **Before ending a session, and after any milestone or usage-limit stop, update it:** refresh "Current state" and "Next steps", and add a dated entry to the session log. Commit it with the work it describes.

## Project

An offline, no-login study webapp for Huawei HCIA-AI Solution V1.0 and HCIA-Cloud Service V3.5. The user opens `index.html` by double-clicking it, so everything must work from `file://`, with no server, build step, or network request. Progress lives in the browser's `localStorage`.

- Requirements: [docs/superpowers/specs/2026-11-05-huawei-reviewer-design.md](docs/superpowers/specs/2026-11-05-huawei-reviewer-design.md)
- Task-by-task plan: [docs/superpowers/plans/2026-11-05-huawei-reviewer.md](docs/superpowers/plans/2026-11-05-huawei-reviewer.md). The code has since moved on from the plan's listings through review fixes, so trust the code over the plan's code blocks.
- Rules for writing questions and notes: [docs/content-brief.md](docs/content-brief.md)

## Commands

```bash
npm test                               # Unit tests
node --test tests/scoring.test.js      # A single test file
npm run check                          # Validate all content
node tools/check-content.js --strict   # Also fail on unwritten sections (final run)
npm run manifest                       # Rebuild data/manifest.js after a question count changes
node tools/sample-review.js <id-prefix> <count> <seed>   # Random questions to fact-check

# Browser checks (needs Edge). node_modules is git-ignored.
npm install --no-save playwright
node tests/e2e/e2e-full.js             # Screenshots and results go to work/e2e
```

Rerun `npm run manifest` after adding a section file, or the app shows that section as unwritten.

Rebuilding past exam data needs the untracked `work/` folder and is run with `node tools/write-past.js`.

## Architecture

**Classic scripts on a shared namespace.** ES modules and `fetch` fail from `file://`, so every file attaches to `globalThis.HR`, and `index.html` loads them in dependency order. Node tests `require()` the same files and read `globalThis.HR`.

- `js/core/`: pure logic with unit tests: `scoring`, `paper` (seeded shuffling and test sessions), `storage`, `progress`, `loader`.
- `js/ui/`: one file per screen, plus `dom.js` with the `h()` element helper. `js/app.js` is the hash router and startup.
- `data/`: content, loaded on demand through injected `<script>` tags:
  - `structure.js`: courses, chapters, subchapters and their physical PDF page ranges.
  - `sections/<id>.js`: notes and generated tests for one course, chapter, or subchapter.
  - `past/<mock>.js`: past exam questions for one mock.
  - `manifest.js`: generated counts, so progress can be calculated without loading every section.

**Test keys** tie everything together: `<nodeId>:<kind>`, where kind is `pre`, `post`, `summative` or `past`; plus `<mockId>:full` and `retry:all`. `HR.tests` in `loader.js` turns a key into questions and titles. Attempts and in-progress sessions in storage use the same keys.

**Question IDs are permanent**, because stored attempts refer to them: `<nodeId>-<kind>-NN` and `m2526-07`. `HR.tests.sectionOfQid` parses them to find which file to load. Options have fixed keys (A-D, T/F), and each attempt stores its own shuffled order, so display letters come from position. Explanations must never mention option letters.

**Past exam questions.** Full mocks keep all 180 questions as photographed. Repeats across mocks point to one canonical question with `mergedInto`. Topic sets show only canonical questions and roll up from subchapter to chapter to course.

**Past exam data is generated.** `tools/write-past.js` builds `data/past/*.js` from the untracked `work/` folder. To correct a past question after generation, edit the `data/past` file directly, and also update `work/past-answered` so a rebuild keeps the change.

## Rules that are easy to break

- **Do not call `el.append()` with a value that can be `false`, `null`, or an array:** it prints them as text. Wrap them in `h()`, which filters them out.
- **Do not hold a state object across `store.update()`.** Storage can replace it when another tab has saved, so read the session inside the update callback. `submit` in `js/ui/test.js` shows the pattern.
- **Pass or fail comes from raw points, never the rounded percent:** use `attempt.passed`, not `pct >= 60`.
- **Multiple-answer questions are all-or-nothing.** Points are single 16, multiple 18, True/False 16.
- **The test script pattern stays `tests/*.test.js`.** Plain `node --test` would run `js/ui/test.js` as a test.
- **`source: {kind: 'material'}` is only for pages someone read that support the answer.** Otherwise use `{kind: 'inferred'}`. Generated questions must cite pages inside their section's range.
- **`note` shows before submit; `flag` shows only in results**, because a flag can reveal the answer.

## Tooling notes

- The Playwright MCP browser tools block `file://`, so use the Node library script above rather than switching to a local server.
- Python scripts that read `HUAWEI PAST EXAMS/` need `pillow-heif` from `work/pylib`.
- On Windows with `python -I`, call `sys.stdout.reconfigure(encoding='utf-8')` before printing PDF text.
- Source material (`HUAWEI PAST EXAMS/`) and `work/` are git-ignored and exist only on this machine. Never modify the source folder.
