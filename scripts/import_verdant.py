"""Prepare the supplied Verdant Theatre portfolio images for the site."""

import json
from pathlib import Path

from PIL import Image, ImageOps


SOURCE = Path(r"C:\Users\hita0\Desktop\portfolio images\verdant theatre")
ROOT = Path(__file__).parents[1]
TARGET = ROOT / "public" / "verdant-theatre"
MANIFEST = ROOT / "src" / "content" / "verdantAssets.json"
Image.MAX_IMAGE_PIXELS = None

GROUPS = {
    "site": [
        ("site analysis/imgs_5.png", "site-location", "Site location"),
        ("site analysis/key locations.png", "key-locations", "Key locations"),
        ("site analysis/imgs_3.png", "urban-level", "Urban level"),
        ("site analysis/imgs_4.png", "green-space", "Green space"),
        ("site analysis/imgs_6.png", "environment", "Environmental analysis"),
        ("site analysis/imgs_7.png", "connections", "Connections to the city"),
        ("site analysis/building use.png", "building-use", "Building use"),
        ("site analysis/transport.png", "transport", "Transport and access"),
        ("site analysis/topoogy.png", "topography", "Topography"),
        ("site analysis/imgs_10.png", "site-context", "Site and surrounding context"),
        ("site analysis/imgs_11.png", "material-palette", "Material and landscape palette"),
    ],
    "brief": [
        ("breif/imgs_2.png", "programme", "Programme organisation"),
    ],
    "precedents": [
        ("breif/Precedent analysis/Bieshbosch museum island.png", "biesbosch", "Biesbosch Museum Island"),
        ("breif/Precedent analysis/Dunard Centre.png", "dunard", "Dunard Centre"),
        ("breif/Precedent analysis/Osla opera house.png", "oslo", "Oslo Opera House"),
        ("breif/Precedent analysis/Sydney Coliseum Thetre.png", "sydney", "Sydney Coliseum Theatre"),
        ("breif/Precedent analysis/Vltava Philharmonic Hall.png", "vltava", "Vltava Philharmonic Hall"),
    ],
    "exploration": [
        ("exp/imgs_23.png", "initial-study", "Initial ideas"),
        ("exp/division of space.png", "division", "Division of space"),
        ("exp/imgs_21.png", "adjacency", "Programme adjacency"),
        ("exp/massing.png", "massing", "Massing study"),
        ("exp/concept diagram.png", "concept", "Concept development"),
        ("exp/early visualisation.png", "early-view-01", "Early interior study"),
    ],
    "plans": [
        ("floor plans/imgs_29.png", "ground", "Ground floor"),
        ("floor plans/imgs_28.png", "first", "First floor"),
        ("floor plans/imgs_27.png", "second", "Second floor"),
        ("floor plans/imgs_26.png", "third", "Third floor"),
        ("floor plans/imgs_25.png", "fourth", "Fourth floor"),
    ],
    "sections": [
        ("Sections and elevations/imgs_30.png", "section-aa", "Section AA"),
        ("Sections and elevations/imgs_32.png", "detailed-section", "Detailed auditorium section"),
        ("Sections and elevations/imgs_31.png", "ne-elevation", "North-east elevation"),
        ("Sections and elevations/imgs_33.png", "exploded-axon", "Exploded axonometric"),
    ],
    "renders": [
        ("Renders/view from castle terrace.png", "castle-terrace", "View from Castle Terrace"),
        ("Renders/interior theatre view.png", "auditorium", "Auditorium"),
        ("Renders/division of spaces.png", "circulation", "Circulation between levels"),
        ("Renders/music room.png", "music-room", "Music room"),
        ("Renders/views.png", "foyer", "Public foyer"),
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
        "alt": f"Verdant Theatre — {title.lower()}",
        "src": f"/verdant-theatre/{group}/{name}.webp",
        "full": f"/verdant-theatre/{group}/{name}-full.webp",
    }


def main() -> None:
    manifest = {
        group: [convert(group, *entry) for entry in entries]
        for group, entries in GROUPS.items()
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Prepared {sum(map(len, manifest.values()))} Verdant images")


if __name__ == "__main__":
    main()
