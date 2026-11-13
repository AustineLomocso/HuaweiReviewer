"""Inventory the approved local sources and cache PDF text for source review."""
import hashlib
import json
import pathlib
import re
import sys

import pymupdf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.stdout.reconfigure(encoding="utf-8")

PDF_IDS = {
    "AI-Fundamentals-at-a-glance-1.pdf": "ai-fundamentals-1",
    "AI-Fundamentals-at-a-glance-2.pdf": "ai-fundamentals-2",
    "HCIA-AI Solution V1.0 Training Material.pdf": "ai",
    "HCIA-AI Solution V1.0 Version Instructions.pdf": "ai-version",
    "HCIA-AI V4.0 Training Material.pdf": "ai-v4",
    "HCIA-AI V4.0 Version Instruction.pdf": "ai-v4-version",
    "HCIA-Cloud Computing V5.5 Pre-Course.pdf": "cloud-computing-prerequisites",
    "HCIA-Cloud Computing V5.5 Training Material.pdf": "cloud-computing",
    "HCIA-Cloud Service V3.5 Training Material.pdf": "cloud",
    "HCIP-AI EI Developer V2.5 Version Instructions.pdf": "ei-developer-version",
    "HCIP-AI-EI Developer V2.5 Training Material.pdf": "ei-developer",
    "HCIP-Cloud Computing Solution Architect V1.0 Training Material.pdf": "cloud-computing-architect",
    "HCIP-Cloud Computing Solution Architect V1.0 Version Instructions.pdf": "cloud-computing-architect-version",
    "HCIP-Cloud Computing V5.0 Training Material.pdf": "cloud-computing-professional",
    "HCIP-Cloud Service Solutions Architect V3.0 Training Material.pdf": "cloud-service-architect",
}
EXAM_FOLDERS = {
    "HuaweiCloudNationals(2324Answer)": "n2324",
    "HuaweiCloudNationals(2425)": "n2425",
    "HuaweiCloudNationals(2526)": "n2526",
    "HUAWEI PAST EXAMS": "original",
}


def digest(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def page_heading(text):
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line and not re.fullmatch(r"\d+", line)]
    lines = [line for line in lines if not line.startswith(("Copyright", "Huawei Confidential"))]
    return lines[0] if lines else ""


def contents_entries(page, ocr):
    """Keep the source's numbered entries and bullets as review candidates."""
    spans = []
    if ocr:
        for line in ocr["lines"]:
            for word in line["words"]:
                spans.append({"text": word["text"], "x": word["x"] / 3,
                              "y": word["y"] / 3, "active": None})
    else:
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                for span in line["spans"]:
                    spans.append({"text": span["text"], "x": span["bbox"][0],
                                  "y": span["bbox"][1], "active": span["color"] in {0, 3355443}})
    groups = []
    # Huawei handout slides end above y=310; speaker notes follow beneath them.
    bottom = page.rect.height if page.rect.width > 800 else 280
    for span in sorted(spans, key=lambda item: (item["y"], item["x"])):
        if not 100 < span["y"] < bottom:
            continue
        if groups and abs(groups[-1][0]["y"] - span["y"]) < 3:
            groups[-1].append(span)
        else:
            groups.append([span])
    entries = []
    parent = None
    for group in groups:
        ordered = sorted(group, key=lambda item: item["x"])
        text = " ".join(item["text"] for item in ordered).strip()
        numbered = re.match(r"^[\uf076\u2605\s]*(\d+(?:\.\d+)*)[.]?\s+(.+)", text)
        bullet = re.match(r"^[\uf06e\uf070\u25ab\u25a0]\s*(.+)", text)
        if numbered:
            parent = numbered.group(1)
            entries.append({"number": parent, "title": numbered.group(2).strip(),
                            "level": 1, "active": any(item["active"] for item in group) if not ocr else None})
        elif bullet and parent:
            entries.append({"parentNumber": parent, "title": bullet.group(1).strip(),
                            "level": 2, "active": any(item["active"] for item in group) if not ocr else None})
    return entries


def inventory_pdf(path, source_id):
    document = pymupdf.open(path)
    text_dir = ROOT / "work" / "pdf" / source_id
    text_dir.mkdir(parents=True, exist_ok=True)
    pages = []
    objective_pages = []
    contents_pages = []
    candidates = {}
    outline = [{"level": level, "title": title, "page": page}
               for level, title, page in document.get_toc()]
    for number, page in enumerate(document, 1):
        native_text = page.get_text()
        text = native_text
        ocr_path = text_dir / "slide-ocr" / f"p{number:04d}.json"
        ocr = None
        if ocr_path.exists():
            ocr = json.loads(ocr_path.read_text(encoding="utf-8-sig"))
            lines = sorted(ocr["lines"], key=lambda line: min(w["y"] for w in line["words"]))
            slide_text = "\n".join(line["text"] for line in lines)
            text = slide_text + "\n\n[Native PDF text / speaker notes]\n" + native_text
        (text_dir / f"p{number:04d}.txt").write_text(text, encoding="utf-8")
        heading = page_heading(text)
        pages.append({"page": number, "heading": heading, "characters": len(text.strip()),
                      "nativeCharacters": len(native_text.strip()), "slideOcr": ocr_path.exists()})
        if heading.lower() in {"objectives", "learning objectives"}:
            objective_pages.append({"page": number, "text": text.strip()})
        if heading.lower() in {"contents", "content", "table of contents"}:
            entries = contents_entries(page, ocr)
            contents_pages.append({"page": number, "text": text.strip(), "entries": entries})
            chapter = next((entry for entry in reversed(outline) if entry["page"] <= number), None)
            for entry in entries:
                key = (chapter["page"] if chapter else 1, entry.get("parentNumber"),
                       entry.get("number"), re.sub(r"\s+", " ", entry["title"]).lower())
                if key not in candidates:
                    candidates[key] = {"title": entry["title"], "level": entry["level"],
                                       "number": entry.get("number"), "parentNumber": entry.get("parentNumber"),
                                       "chapterPage": key[0], "contentsPages": [], "activePages": [],
                                       "status": "hierarchy-review-pending"}
                candidate = candidates[key]
                candidate["contentsPages"].append(number)
                if entry["active"]:
                    candidate["activePages"].append(number)
    version = "version" in source_id
    return {
        "id": source_id,
        "title": path.stem,
        "path": path.relative_to(ROOT).as_posix(),
        "sha256": digest(path),
        "kind": "edition-context" if version else "instructional",
        "pageCount": len(document),
        "outline": outline,
        "objectivePages": objective_pages,
        "contentsPages": contents_pages,
        "lessonCandidates": list(candidates.values()),
        "pages": pages,
        "status": "text-extracted",
        "reviewed": False,
        "lowTextPages": [p["page"] for p in pages if p["characters"] < 40],
    }


def inventory_images():
    images = []
    for folder, paper in EXAM_FOLDERS.items():
        for path in sorted((ROOT / folder).iterdir()):
            if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".heic"}:
                continue
            record = {
                "id": f"{paper}/{path.stem}",
                "path": path.relative_to(ROOT).as_posix(),
                "collection": paper,
                "sha256": digest(path),
                "status": "inventoried",
            }
            if path.suffix.lower() != ".heic":
                with Image.open(path) as image:
                    record["width"], record["height"] = image.size
            images.append(record)
    return images


def main():
    source_dir = ROOT / "HuaweiStudyMaterial"
    included = []
    excluded = []
    for path in sorted(source_dir.glob("*.pdf")):
        if "lab guide" in path.name.lower():
            excluded.append({"path": path.relative_to(ROOT).as_posix(), "reason": "Lab guides excluded by user"})
            continue
        if path.name not in PDF_IDS:
            raise ValueError(f"Unregistered study document requires a stable ID: {path.name}")
        included.append(inventory_pdf(path, PDF_IDS[path.name]))
    missing = set(PDF_IDS) - {pathlib.Path(s["path"]).name for s in included}
    if missing:
        raise ValueError(f"Missing approved source files: {sorted(missing)}")
    aliases = []
    hashes = {s["sha256"]: s["id"] for s in included}
    for path in sorted((ROOT / "HUAWEI PAST EXAMS").glob("*.pdf")):
        aliases.append({"path": path.relative_to(ROOT).as_posix(), "sourceId": hashes.get(digest(path))})
    inventory = {
        "schemaVersion": 1,
        "pagination": "One-based physical PDF pages",
        "sources": included,
        "excluded": excluded,
        "aliases": aliases,
        "images": inventory_images(),
    }
    target = ROOT / "data" / "source-inventory.js"
    target.write_text("HR.data.inventory = " + json.dumps(inventory, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    report = ["# Curriculum source inventory", "",
              "Generated by `python tools/inventory-sources.py`. Lab guides are excluded by the user's instruction.", "",
              "| Source ID | Pages | PDF outline entries | Contents slides | Lesson title candidates | Objective slides | Slide OCR pages |",
              "| --- | --- | --- | --- | --- | --- | --- |"]
    for source in included:
        report.append(f"| {source['id']} | {source['pageCount']} | {len(source['outline'])} | "
                      f"{len(source['contentsPages'])} | {len(source['lessonCandidates'])} | "
                      f"{len(source['objectivePages'])} | {sum(page['slideOcr'] for page in source['pages'])} |")
    report.extend(["", "Numbered contents entries and their explicit bullets are candidates for hierarchy review. "
                   "Their repeated contents-page references and highlighted-page evidence are retained. "
                   "Candidate counts do not establish the final lesson count, page boundaries, or objective coverage.", "",
                   f"All {sum(source['pageCount'] for source in included):,} physical pages have an extraction record. "
                   "The Cloud Service Solutions Architect handout has slide-image OCR retained alongside its native speaker notes. "
                   "Diagrams and text require source review before teaching or assessment verification.", ""])
    (ROOT / "docs" / "curriculum-inventory.md").write_text("\n".join(report), encoding="utf-8")
    print(f"Inventoried {len(included)} PDFs, {sum(s['pageCount'] for s in included)} pages, "
          f"{len(inventory['images'])} exam images; excluded {len(excluded)} lab guides.")


if __name__ == "__main__":
    main()
