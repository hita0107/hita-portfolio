"""Prepare the supplied Faithlie Centre submission images for the website."""

from pathlib import Path
from PIL import Image, ImageOps

SOURCE = Path(r"C:\Users\hita0\Desktop\portfolio images\Faithlie Centre")
TARGET = Path(__file__).parents[1] / "public" / "faithlie" / "submission"

DIAGRAMS = {
    "Location.png": "context/location.webp",
    "conservation area.png": "context/conservation-area.webp",
    "Conservation.png": "context/conservation.webp",
    "fire strat.png": "context/fire-strategy.webp",
    "health & safety.png": "context/health-safety.webp",
    "Procurement.png": "context/procurement.webp",
    "facade.png": "context/facade.webp",
    "exploded facade structure.png": "context/exploded-facade.webp",
    "Cover img.png": "context/cover-drawing.webp",
}

for source_name, target_name in DIAGRAMS.items():
    image = Image.open(SOURCE / source_name).convert("RGB")
    image.thumbnail((3000, 3000), Image.Resampling.LANCZOS)
    target = TARGET / target_name
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=88, method=6)
    print(target.relative_to(TARGET), image.size)

for folder, prefix, count in (("Model images", "model", 10), ("Process pics", "process", 6)):
    for number in range(1, count + 1):
        name = "1..png" if folder == "Process pics" and number == 1 else f"{number}.png"
        image = Image.open(SOURCE / folder / name).convert("RGB")
        image.thumbnail((2600, 2600), Image.Resampling.LANCZOS)
        target = TARGET / prefix / f"{number:02d}.webp"
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, "WEBP", quality=86, method=6)
        print(target.relative_to(TARGET), image.size)

image = Image.open(SOURCE / "Process pics" / "process.png").convert("RGB")
target = TARGET / "process" / "group.webp"
image.save(target, "WEBP", quality=88, method=6)

construction = Image.open(SOURCE / "construction zoomed in.png").convert("RGB")
for name, top, bottom in (("parapet", 0, 1500), ("floor", 1500, 2850), ("foundation", 2850, construction.height)):
    detail = construction.crop((0, top, construction.width, bottom))
    target = TARGET / "construction" / f"{name}.webp"
    target.parent.mkdir(parents=True, exist_ok=True)
    detail.save(target, "WEBP", quality=90, method=6)
    print(target.relative_to(TARGET), detail.size)
