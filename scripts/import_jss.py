"""Prepare the supplied JSS Private School drawings and renders for the site."""

import json
from pathlib import Path

from PIL import Image, ImageOps


SOURCE = Path(r"C:\Users\hita0\Desktop\portfolio images\JSS Private School")
ROOT = Path(__file__).parents[1]
TARGET = ROOT / "public" / "jss-private-school"
MANIFEST = ROOT / "src" / "content" / "jssAssets.json"

# These are trusted local submission sheets; some exceed Pillow's default warning size.
Image.MAX_IMAGE_PIXELS = None

GROUPS = {
    "renders": [
        ("Renders/0_4.1.jpg", "entrance", "Main entrance"),
        ("Renders/0_3.1.jpg", "sports-field", "Sports field and running track"),
        ("Renders/0_2.1.jpg", "arrival", "School building and arrival"),
    ],
    "campusPlans": [
        ("Floor Plans/BASEMENT PLAN.png", "basement", "Basement plan"),
        ("Floor Plans/GROUND FLOOR PLAN.png", "ground", "Ground-floor plan"),
        ("Floor Plans/FIRST FLOOR PLAN.png", "first", "First-floor plan"),
        ("Floor Plans/SECOND FLOOR PLAN.png", "second", "Second-floor plan"),
        ("Floor Plans/THIRD FLOOR PLAN.png", "third", "Third-floor plan"),
        ("Floor Plans/ROOF PLAN.png", "roof", "Roof plan"),
    ],
    "blockPlans": [
        ("Floor Plans/Block B/SCHOOL BUILDING - BASEMENT FLOOR PLAN.png", "basement", "Block B / basement"),
        ("Floor Plans/Block B/SCHOOL BUILDING - GROUND FLOOR PLAN.png", "ground", "Block B / ground floor"),
        ("Floor Plans/Block B/SCHOOL BUILDING - FIRST FLOOR PLAN.png", "first", "Block B / first floor"),
        ("Floor Plans/Block B/SCHOOL BUILDING - SECOND FLOOR PLAN.png", "second", "Block B / second floor"),
        ("Floor Plans/Block B/SCHOOL BUILDING - THIRD FLOOR PLAN.png", "third", "Block B / third floor"),
    ],
    "sections": [
        ("Elevations and sections/SECTIONS AA,CC,DD.png", "sections-a-c-d", "Sections AA, CC and DD"),
        ("Elevations and sections/SECTIONS BB,FF,EE.png", "sections-b-f-e", "Sections BB, FF and EE"),
        ("Elevations and sections/WALL SECTIONS 01 - BLOCK B.png", "wall-section-01", "Block B / wall sections 01"),
        ("Elevations and sections/WALL SECTION 02 - BLOCK B.png", "wall-section-02", "Block B / wall section 02"),
        ("Elevations and sections/WALL SECTION 03 - BLOCK B.png", "wall-section-03", "Block B / wall section 03"),
    ],
    "elevations": [
        ("Elevations and sections/ELEVATIONS 1,2,3,4.png", "elevations", "Elevations 1–4"),
    ],
    "landscape": [
        ("Landscape details/LANDSCAPE DETAILS 01.png", "landscape-01", "Landscape details 01"),
        ("Landscape details/LANDSCAPE DETAILS 02.png", "landscape-02", "Landscape details 02"),
        ("Landscape details/LANDSCAPE DETAILS 03.png", "landscape-03", "Landscape details 03"),
        ("Landscape details/LANDSCAPE DETAILS 04.png", "landscape-04", "Landscape details 04"),
    ],
}


def convert(group: str, relative_source: str, name: str, title: str) -> dict:
    source = SOURCE / relative_source
    if not source.is_file():
        raise FileNotFoundError(source)
    output = TARGET / group
    output.mkdir(parents=True, exist_ok=True)
    is_render = group == "renders"

    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        full = image.copy()
        full.thumbnail((3840 if is_render else 6000, 6000), Image.Resampling.LANCZOS)
        full_path = output / f"{name}-full.webp"
        full.save(full_path, "WEBP", quality=90, method=6)

        preview = full.copy()
        preview.thumbnail((1600 if is_render else 2200, 2200), Image.Resampling.LANCZOS)
        preview_path = output / f"{name}.webp"
        preview.save(preview_path, "WEBP", quality=88, method=6)

    print(f"{group}/{name}: {preview.size} / {full.size}")
    return {
        "title": title,
        "alt": f"JSS Private School — {title.lower()}",
        "src": f"/jss-private-school/{group}/{name}.webp",
        "full": f"/jss-private-school/{group}/{name}-full.webp",
    }


def main() -> None:
    manifest = {
        group: [convert(group, *entry) for entry in entries]
        for group, entries in GROUPS.items()
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Prepared {sum(map(len, manifest.values()))} JSS images")


if __name__ == "__main__":
    main()
