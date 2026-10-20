"""Convert the supplied Rooms + Cities studio drawings for the portfolio.

Usage: python scripts/import_rooms_cities.py SOURCE_DIRECTORY OUTPUT_DIRECTORY
"""

import sys
from pathlib import Path

from PIL import Image


TOPICS = {
    "Building Use": "building-use",
    "Character": "character",
    "Greenspace": "green-space",
    "History": "history",
    "Neighbourhood": "neighbourhood",
    "Room": "room",
    "Transport": "transport",
    "Location": "location",
    "Population": "population",
}

CITIES = {
    "Berlin, Germany": "berlin",
    "Freiburg, Germany": "freiburg",
    "Glasgow, Scotland": "glasgow",
    "London, United Kingdom": "london",
    "Lucca, Italy": "lucca",
    "Plock, Poland": "plock",
    "Tokyo, Japan": "tokyo",
    "Zaragoza, Spain": "zaragoza",
}


def encode(source: Path, destination: Path, max_width: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            image.thumbnail((max_width, max_width), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=88, method=6)
    print(destination.relative_to(output), destination.stat().st_size)


source = Path(sys.argv[1])
output = Path(sys.argv[2])
for directory, city in CITIES.items():
    for title, slug in TOPICS.items():
        original = source / directory / f"{title}.png"
        if original.is_file():
            encode(original, output / "neighbourhoods" / city / f"{slug}.webp", 2400)
