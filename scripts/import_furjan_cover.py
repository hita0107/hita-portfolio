"""Prepare the supplied Furjan Residences cover render."""

from pathlib import Path

from PIL import Image, ImageOps


SOURCE = Path(r"C:\Users\hita0\Desktop\portfolio images\Furjan Residences\Renders\9.1.png")
TARGET = Path(__file__).parents[1] / "public" / "furjan-residences"
TARGET.mkdir(parents=True, exist_ok=True)

with Image.open(SOURCE) as original:
    full = ImageOps.exif_transpose(original)
    full.thumbnail((3840, 3840), Image.Resampling.LANCZOS)
    full.save(TARGET / "cover-full.webp", "WEBP", quality=90, method=6)
    preview = full.copy()
    preview.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    preview.save(TARGET / "cover.webp", "WEBP", quality=88, method=6)

print(f"Furjan cover: {preview.size} / {full.size}")
