"""Prepare the supplied villa renders and drawing sheets for the portfolio."""

import json
from pathlib import Path

from PIL import Image, ImageOps


SOURCE = Path(r"C:\Users\hita0\Desktop\portfolio images\Villa")
ROOT = Path(__file__).parents[1]
TARGET = ROOT / "public" / "luxury-villa"
MANIFEST = ROOT / "src" / "content" / "villaAssets.json"
Image.MAX_IMAGE_PIXELS = None

GROUPS = {
    "renders": [
        ("render/20.2.png", "front-elevation", "Front elevation"),
        ("render/17.1.png", "entrance", "Entrance"),
        ("render/18.1.png", "arrival", "Arrival"),
        ("render/25.2.png", "side-elevation", "Side elevation"),
        ("render/5.5.png", "rear-elevation", "Garden elevation"),
        ("render/23.2.png", "courtyard", "Courtyard"),
        ("render/22.1.png", "outdoor-room", "Outdoor room"),
    ],
    "plans": [
        ("floor plan GRound floor.png", "ground-floor", "Ground-floor plan"),
        ("floor plan First floor.png", "first-floor", "First-floor plan"),
    ],
    "sections": [
        ("Sections.png", "sections", "Building sections"),
    ],
    "elevations": [
        ("Elevation.png", "elevation-01", "Elevation 01"),
        ("Elevation 2.png", "elevation-02", "Elevation 02"),
    ],
}


def convert(group: str, relative_source: str, name: str, title: str) -> dict:
    source = SOURCE / relative_source
    if not source.is_file():
        raise FileNotFoundError(source)
    output = TARGET / group
    output.mkdir(parents=True, exist_ok=True)
    render = group == "renders"

    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        full = image.copy()
        full.thumbnail((3840 if render else 6000, 6000), Image.Resampling.LANCZOS)
        full.save(output / f"{name}-full.webp", "WEBP", quality=90, method=6)

        preview = full.copy()
        preview.thumbnail((1600 if render else 2200, 2200), Image.Resampling.LANCZOS)
        preview.save(output / f"{name}.webp", "WEBP", quality=88, method=6)

    print(f"{group}/{name}: {preview.size} / {full.size}", flush=True)
    return {
        "title": title,
        "alt": f"Luxury Villa — {title.lower()}",
        "src": f"/luxury-villa/{group}/{name}.webp",
        "full": f"/luxury-villa/{group}/{name}-full.webp",
    }


def main() -> None:
    manifest = {
        group: [convert(group, *entry) for entry in entries]
        for group, entries in GROUPS.items()
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Prepared {sum(map(len, manifest.values()))} villa images")


if __name__ == "__main__":
    main()
