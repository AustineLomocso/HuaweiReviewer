"""Convert exam photos to JPG in work/photos. Long edge 2400px keeps text readable."""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "work" / "pylib"))
import pillow_heif  # noqa: E402
from PIL import Image, ImageOps  # noqa: E402

pillow_heif.register_heif_opener()
out = ROOT / "work" / "photos"
out.mkdir(parents=True, exist_ok=True)
files = sorted((ROOT / "HUAWEI PAST EXAMS").glob("*.HEIC"))
for f in files:
    target = out / (f.stem + ".jpg")
    if target.exists():
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    im.thumbnail((2400, 2400))
    im.save(target, quality=85)
print(f"{len(files)} photos ready in {out}")
