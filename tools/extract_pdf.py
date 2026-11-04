"""Write each PDF page's text to work/pdf/<course>/p0001.txt."""
import pathlib
import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = {
    "ai": "HCIA-AI Solution V1.0 Training Material.pdf",
    "cloud": "HCIA-Cloud Service V3.5 Training Material.pdf",
}
for key, name in SOURCES.items():
    out = ROOT / "work" / "pdf" / key
    out.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(ROOT / "HUAWEI PAST EXAMS" / name)
    for i, page in enumerate(doc, start=1):
        (out / f"p{i:04d}.txt").write_text(page.get_text(), encoding="utf-8")
    print(key, doc.page_count)
