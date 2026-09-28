"""Render every catalogued figure out of the portfolio PDF as a lossless PNG master.

usage: py -3 scripts/extract_figures.py <portfolio.pdf> <out_dir>

Each figure is rendered from a fresh copy of its page with the other images
deleted, so overlapping neighbours and callout boxes never bleed into a crop.
"""
import json
import sys
from pathlib import Path

import pymupdf
from PIL import Image

from figures import F


def iou(a, b):
    ix = max(0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    union = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / union


def trim_white(im, pad_ratio=0.02):
    ink = im.convert("L").point(lambda v: 255 if v < 246 else 0)
    box = ink.getbbox()
    pad = round(max(im.size) * pad_ratio)
    return im.crop((max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad)))


def render(pdf, page_no, rect, keep, text, vector, dpi):
    doc = pymupdf.open(pdf)
    page = doc[page_no - 1]
    clip = pymupdf.Rect(rect)
    densities = []
    doomed = set()
    for info in page.get_image_info(xrefs=True):
        b = tuple(info["bbox"])
        centre = pymupdf.Point((b[0] + b[2]) / 2, (b[1] + b[3]) / 2)
        if keep == "all":
            kept = True
        elif keep == "inside":
            kept = clip.contains(centre)
        else:
            kept = any(iou(b, k) >= 0.8 for k in keep)
        if kept:
            if clip.intersects(pymupdf.Rect(b)):
                densities.append(max(info["width"], info["height"]) / max(b[2] - b[0], b[3] - b[1]))
        else:
            doomed.add(info["xref"])
    for xref in doomed:
        if xref == 0:
            raise ValueError(f"page {page_no}: inline image cannot be isolated")
        page.delete_image(xref)
    if text == "strip" or vector == "strip":
        page.add_redact_annot(clip, fill=False, cross_out=False)
        page.apply_redactions(
            images=pymupdf.PDF_REDACT_IMAGE_NONE,
            graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED if vector == "strip" else pymupdf.PDF_REDACT_LINE_ART_NONE,
            text=pymupdf.PDF_REDACT_TEXT_REMOVE if text == "strip" else pymupdf.PDF_REDACT_TEXT_NONE,
        )
    if dpi == "native":
        if not densities:
            raise ValueError(f"page {page_no} {rect}: native dpi needs at least one kept image")
        dpi = round(72 * max(densities))
    pix = page.get_pixmap(clip=clip, dpi=dpi, alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples), dpi


def main():
    pdf, out = sys.argv[1], Path(sys.argv[2])
    out.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for f in F:
        im, dpi = render(pdf, f["page"], f["rect"], f["keep"], f["text"], f["vector"], f["dpi"])
        if f["stitch"]:
            s = f["stitch"]
            part, _ = render(pdf, s["page"], s["rect"], s["keep"], f["text"], f["vector"], dpi)
            joined = Image.new("RGB", (im.width + part.width, max(im.height, part.height)), "white")
            joined.paste(im, (0, 0))
            joined.paste(part, (im.width, 0))
            im = joined
        if f["trim"]:
            im = trim_white(im)
        im.save(out / f"{f['id']}.png", optimize=True)
        manifest[f["id"]] = dict(w=im.width, h=im.height, dpi=dpi, kind=f["kind"], page=f["page"])
        print(f"{f['id']:24s} p{f['page']:<3d} {im.width}x{im.height} @{dpi}dpi")
    (out / "manifest.json").write_text(json.dumps(manifest, indent=1))


if __name__ == "__main__":
    main()
