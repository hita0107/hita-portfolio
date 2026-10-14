"""Export Common Ground drawings and room views as responsive WebP images.

Usage:
  python scripts/build_common_ground_assets.py "<common ground folder>" "<final submission PDF>"

The first source is Hita's individual PDF/PNG drawing folder; the second contains
the four room-plan spreads and their renders. The generated images are the only
assets required by the site at runtime.
"""

import json
import sys
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


DRAWINGS = {
    "bubble-diagram": "Bubble diagram.png",
    "detail-section-zoomed": "DETAIL SECTION ZOOMED IN.png",
    "detailed-zoom-ins": "detailed zoom ins.pdf",
    "edi-periphery-map": "edi periphery map.pdf",
    "garden-layout": "garden layout.pdf",
    "hybrid-diagrams": "HYBRID DIAGRAMS.pdf",
    "intro-diagram": "intro.pdf",
    "layout-of-rooms": "layout of rooms.pdf",
    "light-proximity": "light proximity.png",
    "long-section": "long section.pdf",
    "contemporary-site-plan": "Plan integrated into a contemporary suburbia.pdf",
    "mat-site-plan": "Plan integrated into a matt plan.pdf",
    "sociable-activities": "sociable activities.png",
    "space-proximity-map": "proximity map.pdf",
}

ROOM_PAGES = {
    "hall": (31, (70, 55, 595, 730)),
    "sensory": (34, (120, 175, 630, 600)),
    "library": (36, (115, 107, 505, 702)),
    "kitchen": (38, (70, 315, 580, 512)),
}
RENDER_CROPS = [
    (729, 55, 1038, 283),
    (729, 308, 1038, 535),
    (729, 560, 1038, 790),
]
RENDER_NAMES = {
    "hall": ["sports", "performance", "events"],
    "sensory": ["yoga", "painting", "aerial"],
    "library": ["study", "staircase", "meeting"],
    "kitchen": ["growing", "cooking", "learning"],
}


def render_pdf(file: Path, scale: float) -> Image.Image:
    pdf = pdfium.PdfDocument(str(file))
    return pdf[0].render(scale=scale).to_pil().convert("RGB")


def save_variants(name: str, image: Image.Image, out: Path, manifest: dict, limits: list[int]):
    image = image.convert("RGB")
    widths = sorted({min(image.width, w) for w in limits})
    for width in widths:
        frame = image if width == image.width else image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        frame.save(out / f"{name}-{width}.webp", "WEBP", quality=88, method=6)
    manifest[name] = {
        "width": image.width,
        "height": image.height,
        "src": f"/common-ground/{name}-{widths[-1]}.webp",
        "full": f"/common-ground/{name}-{widths[-1]}.webp",
        "srcSet": ", ".join(f"/common-ground/{name}-{w}.webp {w}w" for w in widths),
    }
    print(name, f"{image.width}x{image.height}", widths)


def main():
    folder = Path(sys.argv[1])
    final_pdf = pdfium.PdfDocument(sys.argv[2])
    root = Path(__file__).resolve().parents[1]
    out = root / "public/common-ground"
    out.mkdir(parents=True, exist_ok=True)
    manifest = {}

    for name, filename in DRAWINGS.items():
        file = folder / filename
        if file.suffix.lower() == ".pdf":
            width = pdfium.PdfDocument(str(file))[0].get_width()
            target = 4200 if name == "long-section" else 2600
            image = render_pdf(file, target / width)
        else:
            image = Image.open(file).convert("RGB")
        save_variants(name, image, out, manifest, [800, 1600, 2400, 4200] if name == "long-section" else [800, 1600, 2400])
        if name == "long-section":
            save_variants("long-section-hall", image.crop((350, 255, 2150, 900)), out, manifest, [600, 1000, 1600, 1800])
            save_variants("long-section-library", image.crop((2490, 255, 3700, 900)), out, manifest, [600, 1000, 1210])

    for room, (page_number, plan_crop) in ROOM_PAGES.items():
        page = final_pdf[page_number].render(scale=2.5).to_pil().convert("RGB")
        def crop(rect):
            return page.crop(tuple(round(n * 2.5) for n in rect))
        save_variants(f"{room}-plan", crop(plan_crop), out, manifest, [480, 800, 1200])
        for label, rect in zip(RENDER_NAMES[room], RENDER_CROPS):
            save_variants(f"{room}-{label}", crop(rect), out, manifest, [400, 800])

    (root / "src/content/commonGroundAssets.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
