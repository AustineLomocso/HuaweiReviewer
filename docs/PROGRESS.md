# Progress

Read this at the start of each session, and update it before ending one. Task numbers refer to [the plan](superpowers/plans/2026-11-05-huawei-reviewer.md).

## Current state

**Waiting on the user:** pilot approval (Task 21). Do not start bulk writing (Tasks 22-23) without it.

- **Branch:** `build/reviewer`, not merged to `main`.
- **Done:** Tasks 1-20. Core logic, all screens, past exam transcription and answers, and the pilot chapter.
- **Content so far:** Cloud Chapter 2 (7 section files, 160 questions) and all 3 mocks (180 questions, 173 unique). The other 57 sections are unwritten.
- **Tests at last run:** 91/91 unit tests and the full browser checklist pass.
- **Expected checker output:** 63 `unknown section beyond-pending` errors. These are past questions on outside topics, mapped to a placeholder in `work/beyond-map.json` until Course 3 exists. They appear in the full mocks but not in topic sets. Task 22 clears them.

## Next steps

1. Get the user's verdict on the pilot, and apply any feedback.
2. Fix the 7 questions the pilot fact-check found (below).
3. Add the pilot's lessons to `docs/content-brief.md` (below).
4. Task 22: propose Course 3 topics with question counts, and get the user's confirmation. Replace `work/beyond-map.json`, then run `node tools/write-past.js`.
5. Task 23: generate subchapters, then chapters, then courses, with each level given the existing stems so it does not repeat them. Run up to 5 subagents at a time, and pass each one its plan line range.
6. Tasks 24-25: final checks with `--strict`, a fact-check per chapter, a README, and a report to the user.

### Pilot fixes still to apply

| Question | Fix |
|---|---|
| `cloud-2-5-summative-07` | Replace option C (the "most recent Kubernetes and Docker releases" claim) with a durable fact. Cover option D in the explanation. |
| `cloud-2-5-summative-09` | Near-verbatim slide text. Plant a real error or make it a scenario. |
| `cloud-2-6-post-02` | Depends only on recalling 6 vs 60. Make the false statement conceptual. |
| `cloud-2-1-summative-07` | Tests console wizard layout. Test what the settings do instead. |
| `m2526-53` | Explanation only: a scheduled policy fires once at a set time, and a periodic one repeats. Update `work/past-answered` too. |
| `cloud-2-post-04` | Reword to "Which node type should it choose?", and make the wrong options more plausible. |
| `cloud-2-pre-01` | Reword to "Which of the following is not a Huawei Cloud computing service?" |

### Lessons for the content brief

- Vary multiple-answer sets, including all four correct. None of the 8 sampled pilot questions had all four correct, but about half of one mock's do, going by our own unconfirmed answers.
- Use subtle wrong options from the same domain, like reinstalling vs changing an OS. Avoid easily dismissed ones like "Disable RBAC".
- Keep True/False statements near the real length (a median of about 160 characters, against the pilot's 240), and avoid a repeated "true sentence, false ending" pattern.
- Avoid slide-recall trivia, and phrases like "listed in the course", which real exams do not use.

## Decisions

The spec records most decisions. These came later:

- **Hidden text:** 4 questions (`m2425-21`, `-22`, `-23`, `-40`) use a best reading in brackets with a visible `note`, as the user chose.
- **Merged repeats:** 7 pairs, listed in `work/past-groups.json`. Questions on the same topic with different options stay separate.
- **Past question citations:** must be valid pages, but need not sit in the section's range. Generated ones must.
- **Commit trailers:** each commit credits the model that wrote it.

## Review process

Each code task went through an implementer and an independent reviewer. Reviewers must show that each defect comes from a reachable input, because one early report's example could not actually occur. Check reviewer and implementer claims against the code before acting.

## Session log

### 2026-11-05 to 2026-11-06: Design through pilot

- Agreed the requirements with the user, and wrote the spec and plan.
- Built and reviewed the core logic and all screens. Reviews found real bugs, now fixed, including tabs overwriting each other's progress and stale answers being scored.
- Transcribed all 190 photos into 180 questions. Fact-checks: two runs of one batch agreed 24/24, and a blind check of 27 agreed 26/27. The disagreement (`m2324-49`) is flagged. 96 of 180 past answers are AI-inferred.
- Built the pilot. A fact-check of 25 sampled questions found 0 wrong answers and 7 with style, wording, or ambiguity problems.
- Hit the plan's 5-hour usage limit once and resumed safely. Expect more stops during bulk writing.
- Moved the browser test script into the repo, and added `CLAUDE.md` and this file.
