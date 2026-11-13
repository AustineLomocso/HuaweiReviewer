"""Reconcile screenshot OCR into traceable draft occurrences for human review."""
import collections
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAPERS = {
    "n2324": "ICT Competition 2023-2024 Practice Competition Cloud Track - Written Exam of National Stage",
    "n2425": "Huawei ICT Competition 2024-2025 National Stage - Cloud Track Mock Exam",
    "n2526": "Huawei ICT 2025-2026 National Mock Exam - Cloud Track",
}


def read_lines(record):
    lines = []
    for line in record["lines"]:
        words = [w for w in line["words"] if w["x"] >= 290]
        if not words:
            continue
        lines.append({"text": " ".join(w["text"] for w in words),
                      "y": min(w["y"] for w in words), "x": min(w["x"] for w in words)})
    return sorted(lines, key=lambda line: (round(line["y"] / 10), line["x"]))


def parse_image(path):
    raw = json.loads(path.read_text(encoding="utf-8-sig"))
    lines = read_lines(raw)
    header = " ".join(line["text"] for line in lines if 155 <= line["y"] < 205)
    match = re.search(r"Question\s*([\dIOlo ]+)[ ,]*[/]\s*([\dIOlo ]+)", header, re.I)
    normalize = lambda value: int(re.sub(r"\s", "", value).translate(str.maketrans("IOlo", "1010")))
    number, total = map(normalize, match.groups()) if match else (None, None)
    issues = []
    if not match:
        issues.append("Question number/header requires visual review")
    kind = "multi" if "Multiple-Answer" in header else "single" if "Single-Answer" in header else "tf"
    body = [line for line in lines if 215 <= line["y"] < 950]
    answer_line = next((line for line in body if re.search(r"\bAnswer\s*:", line["text"])), None)
    supplied_key = None
    if answer_line:
        key_text = " ".join(line["text"] for line in body
                            if abs(line["y"] - answer_line["y"]) < 10 and line["x"] >= answer_line["x"])
        key_match = re.search(r"Answer\s*:\s*(True|False|[A-D](?:[ ,]*[A-D])*)\b", key_text, re.I)
        if key_match:
            supplied_key = key_match.group(1).strip()
        else:
            issues.append("Visible answer label has an unread key")
    key_crop = ROOT / "work" / "exam-key-ocr" / path.parent.name / path.name
    if key_crop.exists():
        crop = json.loads(key_crop.read_text(encoding="utf-8-sig"))
        crop_text = " ".join(line["text"] for line in crop["lines"])
        crop_match = re.search(r"Answer\s*:\s*(True|False|[A-D](?:[ ,]*[A-D])*)\b", crop_text, re.I)
        if crop_match:
            supplied_key = crop_match.group(1).strip()
            issues = [issue for issue in issues if issue != "Visible answer label has an unread key"]
    boundary = next((line["y"] for line in body if line["text"] == "Answer Explanations"), None)
    explanation = " ".join(line["text"] for line in body if boundary is not None and line["y"] > boundary + 10)
    controls = [line["y"] for line in body if line["text"] in {"Previous", "Next", "Submit", "Uncertain", "IJncertain"}]
    cutoff = min(controls) - 5 if controls else (answer_line["y"] - 10 if answer_line else 950)
    content = [line for line in body if line["y"] < cutoff]
    stem = []
    options = []
    for line in content:
        text = line["text"]
        if text in {"O", "0", "Previous", "Next", "Submit", "Uncertain", "IJncertain"}:
            continue
        if line["x"] > 1700:
            continue
        if kind == "tf" and text in {"True", "False"}:
            options.append({"key": "T" if text == "True" else "F", "text": text})
            continue
        option = re.match(r"^([A-Da-d])\s*[.．]\s*(.+)", text)
        if option:
            label = option.group(1).upper()
            # OCR occasionally reads the second option's B as a lowercase a.
            if options and label == "A" and len(options) == 1:
                label = "B"
                issues.append("Second option label normalized from OCR; review image")
            options.append({"key": label, "text": option.group(2)})
        elif options:
            options[-1]["text"] += " " + text
        else:
            stem.append(text)
    stem_text = re.sub(r"^\d+\s*[.]\s*", "", " ".join(stem))
    expected = ["T", "F"] if kind == "tf" else ["A", "B", "C", "D"]
    if [option["key"] for option in options] != expected:
        issues.append("Option segmentation requires visual review")
    return {"image": raw["path"], "number": number, "paperTotal": total,
            "type": kind, "stem": stem_text, "options": options,
            "suppliedKey": supplied_key, "suppliedExplanation": explanation or None,
            "status": "ocr-draft", "issues": issues}


def main():
    papers = []
    review_path = ROOT / "data" / "exam-key-reviews.json"
    key_reviews = json.loads(review_path.read_text(encoding="utf-8"))["reviews"] if review_path.exists() else []
    reviewed_keys = {(review["paperId"], review["image"]): review for review in key_reviews}
    review_file = ROOT / 'data' / 'nationals-reviews.json'
    content_reviews = json.loads(review_file.read_text(encoding='utf-8'))['reviews'] if review_file.exists() else []
    reviewed_content = {review['captureId']: review for review in content_reviews}
    for paper_id, title in PAPERS.items():
        folder = ROOT / "work" / "exam-ocr" / paper_id
        images = [parse_image(path) for path in sorted(folder.glob("*.json"))]
        if not images:
            raise ValueError(f"No OCR available for {paper_id}; run extract-exam-text.ps1")
        totals = sorted({image["paperTotal"] for image in images if image["paperTotal"]})
        if len(totals) != 1:
            raise ValueError(f"Inconsistent paper totals for {paper_id}: {totals}")
        total = totals[0]
        numbers = collections.Counter(image["number"] for image in images if image["number"])
        for index, image in enumerate(images, 1):
            image["id"] = f"{paper_id}-capture-{index:03d}"
            review = reviewed_keys.get((paper_id, image["image"]))
            image["suppliedKeyStatus"] = "ocr-draft" if image["suppliedKey"] else "not-extracted"
            if review:
                current_hash = hashlib.sha256((ROOT / image["image"]).read_bytes()).hexdigest()
                if current_hash != review["sha256"] or image["number"] != review["questionNumber"]:
                    raise ValueError(f"Source-key review no longer matches image {image['image']}")
                image["suppliedKey"] = review["suppliedKey"]
                image["suppliedKeyStatus"] = "visually-reviewed"
            content_review = reviewed_content.get(image['id'])
            if content_review:
                current_hash = hashlib.sha256((ROOT / image['image']).read_bytes()).hexdigest()
                if (content_review['sha256'] != current_hash or content_review['image'] != image['image']
                        or content_review['paperId'] != paper_id or content_review['questionNumber'] != image['number']):
                    raise ValueError(f"Content review no longer matches {image['id']}")
                image['ocrOriginal'] = {'stem': image['stem'], 'options': image['options'], 'issues': image['issues']}
                for field in ['stem', 'options', 'transcriptionStatus', 'status', 'proposedSectionId',
                              'reviewNotes', 'answer', 'explanation', 'source', 'sectionId',
                              'secondarySectionIds', 'mappingEvidence', 'inApp', 'flag']:
                    if field in content_review:
                        image[field] = content_review[field]
                image['issues'] = []
        papers.append({"id": paper_id, "title": title, "expectedQuestions": total,
                       "captures": images, "uniqueNumbers": len(numbers),
                       "missingNumbers": sorted(set(range(1, total + 1)) - set(numbers)),
                       "duplicateNumbers": [number for number, count in sorted(numbers.items()) if count > 1],
                       "status": "ocr-draft"})
    output = {"schemaVersion": 1, "papers": papers}
    (ROOT / "data" / "exam-inventory.js").write_text(
        "HR.data.examInventory = " + json.dumps(output, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    report = ["# Source and exam reconciliation", "", "This report is generated by `python tools/reconcile-exams.py`.", "",
              "Capture review status is recorded per question. Verified questions are available in lesson practice.", "",
              "| Paper | Expected | Captures | Unique numbers | Keys extracted / visually checked | Missing | Repeated numbers |",
              "| --- | --- | --- | --- | --- | --- | --- |"]
    for paper in papers:
        keys = sum(bool(capture["suppliedKey"]) for capture in paper["captures"])
        reviewed = sum(capture["suppliedKeyStatus"] == "visually-reviewed" for capture in paper["captures"])
        report.append(f"| {paper['id']} | {paper['expectedQuestions']} | {len(paper['captures'])} | "
                      f"{paper['uniqueNumbers']} | {keys} / {reviewed} | {paper['missingNumbers']} | {paper['duplicateNumbers']} |")
    report.extend(["", "The national-stage papers are distinct from the three existing 60-question mock papers. "
                   "Keep existing mock IDs and their attempts intact when adding these occurrences.", "",
                   "Image references, supplied keys, and supplied explanations are retained in `data/exam-inventory.js`. "
                   "Material-verified answers are stored separately from supplied keys. Unresolved records remain outside graded lesson sets.", "",
                   f"Reviewed transcriptions: {len(content_reviews)}. Verified answers: "
                   f"{sum(c['status'] == 'verified' for p in papers for c in p['captures'])}.", ""])
    (ROOT / "docs" / "source-reconciliation.md").write_text("\n".join(report), encoding="utf-8")
    for paper in papers:
        print(f"{paper['id']}: {paper['uniqueNumbers']}/{paper['expectedQuestions']} unique numbers, "
              f"missing {paper['missingNumbers']}, repeated {paper['duplicateNumbers']}")


if __name__ == "__main__":
    main()
