# Progress

Read this at the start of each session, and update it before ending one. Task numbers refer to [the plan](superpowers/plans/2026-11-05-huawei-reviewer.md).

## Current state

**Bulk writing in progress (Task 23).** Nothing is waiting on the user. The pilot, the practice-mode feedback changes, and the Course 3 topics are all approved and done.

- **Branch:** `build/reviewer`, not merged to `main`.
- **Done:** Tasks 1-22, practice-mode feedback, Cloud chapter 2 pilot, and all 30 Cloud subchapters.
- **Tests at last run:** 96/96 unit tests, full browser checklist passing, checker at 0 errors.
- **Find what's left:** `npm run check` lists each unwritten section as a "not yet written" warning.

## Next steps

Writing runs in this order, up to 5 subagents at a time, each told only "Your section is <id>. Follow docs/writer-prompt.md exactly." Commit finished section files in batches, and run `npm run manifest` after adding sections.

1. **AI subchapters:** `ai-1-1` to `ai-1-4`, `ai-2-1` to `ai-2-4`, `ai-3-1` to `ai-3-3`, `ai-4-1` to `ai-4-4`, `ai-5-1`, `ai-5-2`, `ai-6-1` to `ai-6-3`.
2. **Chapter files:** `cloud-1`, `cloud-3` to `cloud-6`, then `ai-1` to `ai-6`.
3. **Course files:** `cloud` and `ai`, 60 questions per test. Use one subagent per test, spread across chapters by page count.
4. **Course 3:** add this to the prompt: "This course is outside the PDFs. Write from accurate, well-established general knowledge. Every question's source is {kind:'inferred'}. Notes have no pages. Use past questions tagged to this topic as a guide to depth, but do not copy them." Order: `beyond-1-1` to `beyond-1-5`, `beyond-2-1` to `beyond-2-5`, `beyond-3-1`, then `beyond-1` to `beyond-3`, then `beyond`.
5. **Tasks 24-25:** `node tools/check-content.js --strict`, a fact-check per chapter with `tools/sample-review.js`, a README, the browser checklist, and a report to the user with every shortfall.

### Shortfalls so far

Thin sections have fewer questions rather than padding: `cloud-3-2` (summative 6/10), `cloud-4-4` (post 4/5, summative 6/10), `cloud-6-3` (summative 6/10), `cloud-6-4` (summative 7/10).

### Pilot fact-check caveat

The pilot's later rewrites (14 questions changed to all four correct, 7 replaced wrong options) have not had a second fact-check. Include `cloud-2` in the Task 24 fact-check.

## Decisions

The spec records most decisions. These came later:

- **Hidden text:** 4 questions (`m2425-21`, `-22`, `-23`, `-40`) use a best reading in brackets with a visible `note`, as the user chose.
- **Merged repeats:** 7 pairs, listed in `work/past-groups.json`. Questions on the same topic with different options stay separate.
- **Past question citations:** must be valid pages, but need not sit in the section's range. Generated ones must.
- **Commit trailers:** each commit credits the model that wrote it.
- **Practice feedback:** single-answer and True/False questions reveal immediately on choosing. Multiple-answer questions use a "Submit answer" button. Item numbers turn green or red once revealed, and in every results review.
- **Course 3:** 11 topics in 3 groups, with the third group (Cloud Data Center and Networking) added for 2 stray questions, as the user chose.

## Review process

Each code task went through an implementer and an independent reviewer. Reviewers must show that each defect comes from a reachable input, because one early report's example could not actually occur. Check reviewer and implementer claims against the code before acting.

## Session log

### First session, started 2026-11-04: Design through pilot

- Agreed the requirements with the user, and wrote the spec and plan.
- Built and reviewed the core logic and all screens. Reviews found real bugs, now fixed, including tabs overwriting each other's progress and stale answers being scored.
- Transcribed all 190 photos into 180 questions. Fact-checks: two runs of one batch agreed 24/24, and a blind check of 27 agreed 26/27. The disagreement (`m2324-49`) is flagged. 96 of 180 past answers are AI-inferred.
- Built the pilot. A fact-check of 25 sampled questions found 0 wrong answers and 7 with style, wording, or ambiguity problems.
- Hit the plan's 5-hour usage limit once and resumed safely. Expect more stops during bulk writing.
- Moved the browser test script into the repo, and added `CLAUDE.md` and this file.

### Pilot review fixes, 2026-11-05
- User approved the pilot (Task 21) and asked for practice-mode feedback changes, which another agent is making.
- Applied the 7 fact-check fixes, including the `m2526-53` explanation (also in `work/past-answered/b08.json`).
- Added "Quality rules learned from the pilot" to `docs/content-brief.md`.
- Reworked the pilot chapter against those rules: multiple-answer questions with all 4 correct went from 0 to 16 of 55, and obviously wrong distractors were replaced with plausible ones.
- Check result: 96/96 unit tests pass, and the checker reports only `unknown section beyond-pending`.

### 2026-11-06: Bulk writing

- The user approved the pilot and asked for instant practice feedback and coloured item numbers, now done.
- Added Course 3 (11 topics), mapped its 63 past questions, and wrote all 30 Cloud subchapters.
- Hit the 5-hour usage limit a second time, and resumed the interrupted AI sections.
