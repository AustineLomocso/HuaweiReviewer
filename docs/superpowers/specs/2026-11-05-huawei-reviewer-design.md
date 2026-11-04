# Huawei ICT Reviewer: Design Spec

**Date:** 2026-11-05
**Status:** Awaiting user review

## 1. Purpose

A local, no-login study webapp for two Huawei courses: HCIA-AI Solution V1.0 and HCIA-Cloud Service V3.5. It tracks progress in the browser and offers pre, post and summative tests at every level, plus past exam questions sorted by topic.

## 2. Source material

| Source | Details |
|---|---|
| HCIA-AI Solution V1.0 PDF | 387 pages, 6 chapters |
| HCIA-Cloud Service V3.5 PDF | 404 pages, 6 chapters |
| Exam photos | 190 HEIC photos of 3 Cloud Track mock exams, 60 questions each |

The mocks are ICT Competition 2023-24 Practice, 2024-25 Preliminary and 2025-26 Preliminary.

**Known limits of the sources**

- The photos show no answer keys.
- Some exam topics are absent from or barely mentioned in both PDFs, such as Flink, YARN, Elasticsearch, Keras, k-fold, Naive Bayes, Spark, Kafka, Hive and HBase.
- The photos include repeated shots and near-duplicate questions across mocks.

## 3. Content structure

- **Course 1:** HCIA-AI Solution, with its chapters and subchapters.
- **Course 2:** HCIA-Cloud Service, with its chapters and subchapters.
- **Course 3:** Beyond the Course Material, grouped as Big Data and AI/ML Fundamentals & Frameworks. The topic list is finalised after transcription. Its groups act as chapters and its topics as subchapters.
- **Past Exams:** the 3 full mocks in their original question order.

Subchapters come from the numbered Contents lists in each PDF chapter.

Each course, chapter and subchapter has:

- Review notes. Notes for Courses 1 and 2 are written from the PDFs and give page numbers as plain text, with no clickable links. Course 3 notes are AI-written and labelled as not from the course material.
- Pre, Post and Summative tests.
- A Past Exam set.

Labels follow chapter numbering, for example "Post-Test 3.2". Questions are numbered 1, 2, 3 within each test.

## 4. Question bank

### 4.1 Test sizes

These apply to all three courses.

| Level | Pre | Post | Summative |
|---|---|---|---|
| Subchapter | 5 | 5 | 10 |
| Chapter | 10 | 10 | 20 |
| Course | 60 | 60 | 60 |

Expected total: about 2,400 new questions, plus about 180 past questions before merging repeats.

Generated questions do not repeat between sets. If a small subchapter cannot support its full count without trivial questions, it gets fewer questions and the shortfall is reported to the user.

### 4.2 Question mix and scoring

| Test size | Single-answer | Multiple-answer | True/False |
|---|---|---|---|
| 5 | 2 | 2 | 1 |
| 10 | 4 | 3 | 3 |
| 20 | 8 | 7 | 5 |
| 60 | 25 | 20 | 15 |

- Points: single-answer 16, multiple-answer 18, True/False 16. A 60-question exam totals 1000.
- Multiple-answer questions are all-or-nothing: full points only for exactly the correct options.
- Score percentage is points earned divided by points available. The pass mark is 60% at every level.

### 4.3 Question data

Each question has a permanent ID, type, stem, options, correct answer(s), short explanation, section, and source label:

- **Course material**, with a PDF page reference.
- **AI-inferred, verify**, when the PDFs do not settle the answer.

Past questions also record their mock year(s) and original question number(s).

### 4.4 Past exam questions

- Each unique past question goes in its best-matching subchapter. Chapter sets include all their subchapters' questions, and course sets include all their chapters' questions.
- Identical and near-identical questions appear once in topic sets, labelled with every year they appeared.
- Topics outside the PDFs go in Course 3. No question is forced into a loosely related section.
- Subchapters with no matches show "No past exam questions on this topic".
- The full mocks keep every question as photographed, including repeats.
- Answers are worked out from the PDFs where possible. Where a PDF and a mock conflict, the PDF wins and the question is flagged.
- Unclear words in photos are flagged for the user and not guessed.

## 5. Content production

1. Transcribe all 190 photos at full resolution, using parallel subagents.
2. Answer, sort and merge the past questions.
3. Write review notes.
4. Generate tests one section at a time, using parallel subagents.
5. Run the content checker on all output.
6. **Pilot gate:** build one complete chapter end to end and get user approval before producing the rest.

The content checker verifies format, counts, type mix, unique IDs, valid answers, duplicate detection, and required source labels and page references. It cannot prove every answer is factually right, so samples are also spot-checked against the PDFs. No guarantee of zero errors is made, and this is stated in the app.

## 6. App behaviour

### 6.1 Screens

1. **Dashboard:** progress per course, continue link, weak topics, backup and restore.
2. **Course:** collapsible chapter and subchapter list with progress and best scores, plus course-level content.
3. **Section:** notes, page references, mark as read, tests, past exam set, attempt history, pre-to-post gain.
4. **Test:** mirrors the mock exam's working layout in an original neutral style, with no Huawei logo or branding.
   - Left navigator grouped by question type, with Uncertain and Unanswered counts.
   - Top bar with total score, optional timer and Submit.
   - Previous, Next and Uncertain buttons, arrow keys and an auto-advance toggle.
5. **Results:** score, pass/fail, breakdown by type, and a review of every question showing the user's answer, correct answer, explanation and source label.

Navigation is unrestricted. The app suggests the order pre-test, notes, post-test, summative, but locks nothing.

### 6.2 Test modes

| Test | Answers shown |
|---|---|
| Pre, Post, Summative | After submit only |
| Past exam sets and full mocks | User chooses at start: Practice (instant feedback) or Exam (after submit) |

- **Timer:** optional and off by default, chosen at the start of any exam-mode test. It allows 90 seconds per question, so 5 questions get 7.5 minutes, 10 get 15, 20 get 30 and 60 get 90. The test submits automatically at zero. Practice mode has no timer.
- **Time spent** is recorded for every attempt.
- **Retakes:** unlimited, with questions and options reshuffled and A-D labels reassigned. A full mock uses its original order on the first attempt and reshuffles on retakes.
- **Saving:** an in-progress test saves on every change and can be resumed after a refresh or closed tab, with the timer based on its real end time.

### 6.3 Progress tracking

- Every submitted attempt is kept. Best and latest scores are both shown, and a passed status stays once earned.
- **Subchapter complete:** notes marked read and every test attempted at least once. A past exam set counts only if the section has past questions.
- **Chapter complete:** the same for its own content, plus all its subchapters complete. **Course complete** follows the same rule.
- **Pre-to-post gain:** best post-test percentage minus first pre-test percentage.
- **Weak topics:** sections whose latest test score is below 60%.
- **Retry set:** questions most recently answered wrong or marked Uncertain. Answering one correctly removes it.
- Practice attempts count toward completion of past exam sets, but not toward best exam scores.

### 6.4 Storage and backup

- All progress lives in one versioned `localStorage` key and is tied to permanent question IDs, so correcting a question does not erase history.
- Export downloads a JSON file. Import validates the file and asks for confirmation before overwriting.
- If storage is unavailable, the app shows a clear warning that progress will not be saved.

## 7. Technical design

- **Stack:** plain HTML, CSS and JavaScript with no runtime dependencies, no build step and no network requests.
- **Running:** double-click `index.html`. It works offline and is designed for desktop, while remaining usable on a phone.
- **Data loading:** `data/*.js` files are loaded on demand through injected `<script>` tags because `fetch` is unreliable from `file://`.

```
index.html
css/app.css
js/     router, storage, scoring, test engine, one file per screen
data/   course structure, plus notes and questions per section
tools/  content checker
tests/  unit tests
```

## 8. Testing

- Unit tests for scoring, shuffling, completion rules and backup/restore.
- Content checker across all data.
- Browser run through the main flows opened from `file://`: taking a test, refreshing mid-test and resuming, Practice mode, timer expiry, retry set, and backup and restore.

## 9. Out of scope

Accounts, servers, cloud sync, live AI generation in the app, in-app PDF or slide viewing, clickable PDF links, and publishing to the web.

## 10. Known risks

- Some AI-inferred answers may be wrong. They are labelled so the user can check them.
- The mock-exam timing and multiple-answer scoring are not confirmed Huawei rules. The timer and scoring here are chosen by the user for practice.
- Generation at this scale runs in batches over a long period and uses significant plan usage.
