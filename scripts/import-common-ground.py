"""Prepare portfolio-sized WebP files from Hita's Common Ground export.

Usage: python scripts/import-common-ground.py "C:/path/to/common ground"
"""

import json
import re
import sys
from pathlib import Path

from PIL import Image


source = Path(sys.argv[1])
project = Path(__file__).resolve().parents[1]
destination = project / "public" / "common-ground" / "submission"
manifest_path = project / "src" / "content" / "commonGroundSubmission.json"


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


manifest = {}
for file in sorted(source.rglob("*.png")):
    parts = file.relative_to(source).with_suffix("").parts
    key = "/".join(slug(part) for part in parts)
    relative_output = Path(*[slug(part) for part in parts[:-1]]) / f"{slug(parts[-1])}.webp"
    output = destination / relative_output
    output.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(file) as original:
        max_width = 4200 if parts[-1].lower() == "long section" else 3200 if "GARDEN RENDERS" in parts else 2600
        image = original.copy()
        image.thumbnail((max_width, 4800), Image.Resampling.LANCZOS)
        if image.mode == "RGBA":
            background = Image.new("RGB", image.size, "white")
            background.paste(image, mask=image.getchannel("A"))
            image = background
        else:
            image = image.convert("RGB")
        image.save(output, "WEBP", quality=88, method=6)
        manifest[key] = {
            "src": "/common-ground/submission/" + relative_output.as_posix(),
            "width": image.width,
            "height": image.height,
            "label": parts[-1].replace(".2", " II").replace("KITCHEN OUTLINE", "Community kitchen").replace("MPH", "Multipurpose hall").replace("bb", "Basketball").replace("mat plan", "Mat plan").replace("edi park", "Edinburgh Park").replace("aessibility", "accessibility").strip().title(),
        }
        print(f"{key}: {image.width}x{image.height}")

manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
