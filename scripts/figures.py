"""Figure catalogue for Portfolio_Hita_Shah.pdf.

Every rect is in PDF points (842 x 595 page). Crops were measured against the
2026-09-25 Affinity export. A re-export with the same layout keeps these rects
valid; only the pixel density changes, and "native" dpi follows it.

keep:
  "inside"        keep images whose centre lies inside rect (default)
  "all"           keep every image on the page
  [bbox, ...]     keep only images whose bbox matches one of these (IoU >= 0.8)
text:   "keep" | "strip"        vector text inside the rect
vector: "keep" | "strip"        vector line art touching the rect
dpi:    "native" | int          native = the kept images' own pixel density
kind:   "photo" | "drawing"     picks encoder quality in build_images.py
trim:   drawings are trimmed to content by default; figures with overlay
        coordinates (hotspots, labels) set trim=False to keep their frame
"""

F = []


def fig(id, page, rect, keep="inside", text="strip", vector="keep", dpi="native", kind="photo", stitch=None, trim=None):
    F.append(dict(id=id, page=page, rect=rect, keep=keep, text=text, vector=vector, dpi=dpi, kind=kind, stitch=stitch,
                  trim=(kind == "drawing") if trim is None else trim))


# Profile
fig("cover-strip", 1, (683, 0, 841.9, 595.3), keep="all")
fig("portrait", 2, (34, 34, 280, 292), keep="all")

# 1 Common Ground
fig("cg-sitemap", 6, (414, 34, 808, 313), text="keep", dpi=216, kind="drawing")
fig("cg-axo", 6, (452, 341, 769, 546), vector="strip", trim=False)
fig("cg-plan-1", 7, (34, 34, 407, 561), kind="drawing")
fig("cg-plan-2", 7, (435, 34, 808, 561), kind="drawing")
fig("cg-section-hall", 8, (0, 215, 841.9, 595.3), keep=[(0, 215, 841, 595), (18, 247, 154, 343)], kind="drawing", trim=False)
fig("cg-detail-ground", 8, (50, 55, 210, 209), kind="drawing")
fig("cg-detail-sprung", 8, (455, 55, 615, 209), kind="drawing")
fig("cg-section-library", 9, (0, 229, 841.9, 595.3), keep=[(0, 229, 841, 595)], kind="drawing", trim=False)
fig("cg-detail-greenroof", 9, (57, 55, 224, 209), kind="drawing")
fig("cg-detail-cltwall", 9, (559, 55, 615, 209), kind="drawing")
fig("cg-study-1", 10, (42, 42, 237, 188))
fig("cg-staircase", 10, (42, 223, 240, 369))
fig("cg-study-2", 10, (42, 407, 240, 553))
fig("cg-plan-hall", 10, (281, 68, 568, 271), kind="drawing")
fig("cg-plan-library", 10, (245, 310, 578, 518), kind="drawing")
fig("cg-hall-1", 10, (601, 42, 800, 190))
fig("cg-hall-2", 10, (601, 223, 800, 371))
fig("cg-hall-3", 10, (601, 405, 800, 553))
fig("cg-yoga", 11, (42, 40, 241, 188))
fig("cg-art", 11, (42, 223, 241, 371))
fig("cg-aerial", 11, (42, 405, 241, 553))
fig("cg-plan-11a", 11, (274, 58, 567, 298), keep=[(274, 58, 567, 298)], kind="drawing")
fig("cg-plan-11b", 11, (290, 258, 574, 557), keep=[(290, 258, 574, 557)], kind="drawing")
fig("cg-greenhouse", 11, (600, 42, 800, 191))
fig("cg-kitchen", 11, (601, 223, 800, 371))
fig("cg-cooking", 11, (601, 405, 800, 553))

# 2 Faithlie Centre
fig("fc-photo", 12, (437, 34, 773, 561))
fig("fc-model-1", 13, (34, 34, 401, 560))
fig("fc-model-2", 13, (420, 34, 807, 284))
fig("fc-model-3", 13, (420, 304, 605, 562))
fig("fc-model-4", 13, (627, 304, 809, 562))
fig("fc-detail-parapet", 14, (30, 30, 272, 205), keep="all")
fig("fc-detail-floor", 14, (30, 212, 272, 350), keep="all")
fig("fc-detail-foundation", 14, (30, 360, 272, 570), keep="all")
fig("fc-corten", 14, (477, 34, 790, 560), keep=[(477, 34, 790, 560)])
fig("fc-exploded", 15, (36, 120, 809, 586))

# 3 Verdant Theatre
fig("vt-castle", 16, (407, 34, 808, 374))
fig("vt-auditorium", 17, (0, 0, 841.9, 595.3))
fig("vt-map-location", 18, (60, 38, 398, 306), text="keep", dpi=216, kind="drawing")
fig("vt-map-context", 18, (412, 30, 808, 312), text="keep", dpi=216, kind="drawing")
fig("vt-map-movement", 18, (58, 326, 388, 562), keep=[(64, 331, 386, 558)], text="keep", dpi=216, kind="drawing")
fig("vt-map-climate", 18, (382, 322, 760, 572), keep=[(382, 327, 755, 567), (417, 514, 476, 527), (417, 527, 477, 540)], text="keep", dpi=216, kind="drawing")
fig("vt-massing-1", 19, (30, 35, 169, 135), kind="drawing")
fig("vt-massing-2", 19, (187, 34, 332, 136), kind="drawing")
fig("vt-massing-3", 19, (354, 34, 499, 134), kind="drawing")
fig("vt-massing-4", 19, (504, 34, 650, 135), kind="drawing")
fig("vt-massing-5", 19, (664, 34, 806, 135), kind="drawing")
fig("vt-sketch", 19, (34, 214, 614, 536), kind="drawing")
fig("vt-form-1", 19, (625, 163, 804, 290), kind="drawing")
fig("vt-form-2", 19, (625, 293, 804, 408), kind="drawing")
fig("vt-form-3", 19, (631, 410, 810, 555), kind="drawing")
fig("vt-section", 20, (0, 36, 730, 595.3), keep="all", kind="drawing")
fig("vt-exploded", 21, (305, 4, 841, 581), kind="drawing")
fig("vt-foyer-1", 21, (34, 33, 288, 282))
fig("vt-foyer-2", 21, (34, 312, 288, 561))

# 4 Elysian Arcadia
fig("ea-siteplan", 22, (406, 142, 808, 453))
fig("ea-courtyard", 23, (0, 0, 841.9, 595.3))
fig("ea-plan-site", 24, (32, 38, 303, 556), keep=[(32, 38, 303, 556)], dpi=144, kind="drawing")
fig("ea-plan-a", 24, (306, 40, 585, 559), keep=[(277, 40, 585, 559)], kind="drawing")
fig("ea-plan-b", 24, (560, 42, 841.9, 557), keep=[(560, 42, 841, 557)], kind="drawing",
    stitch=dict(page=25, rect=(0, 42, 94, 557), keep=[(0, 42, 94, 557)]))
fig("ea-landscape", 25, (58, 38, 799, 557), keep=[(58, 38, 799, 557)], kind="drawing")
fig("ea-model-1", 26, (0, 0, 297, 595.3))
fig("ea-model-2", 26, (498, 42, 841.9, 553))
fig("ea-model-3", 26, (321, 26, 465, 217))
fig("ea-model-4", 26, (321, 242, 465, 433))
fig("ea-sketch", 26, (321, 451, 465, 572), kind="drawing")
fig("ea-elevation-1", 27, (42, 42, 511, 225), kind="drawing")
fig("ea-elevation-2", 27, (42, 225, 511, 408), kind="drawing")
fig("ea-wallsection", 27, (523, 0, 841.9, 595.3), kind="drawing")
fig("ea-detail-base", 27, (42, 430, 156, 553), kind="drawing")
fig("ea-detail-floor", 27, (276, 424, 385, 559), kind="drawing")
fig("ea-balconies", 28, (0, 0, 841.9, 595.3))
fig("ea-facade", 29, (0, 0, 279, 595.3))
fig("ea-bedroom", 29, (319, 42, 550, 288))
fig("ea-farm", 29, (318, 306, 549, 552))
fig("ea-concept", 29, (588, 38, 790, 262), text="keep", dpi=216, kind="drawing")
fig("ea-study-cafe", 29, (579, 277, 683, 373), keep=[(579, 277, 683, 373)], kind="drawing")
fig("ea-study-office", 29, (710, 277, 814, 373), keep=[(710, 277, 814, 373)], kind="drawing")
fig("ea-study-shared", 29, (579, 372, 683, 468), keep=[(579, 372, 683, 468)], kind="drawing")
fig("ea-study-private", 29, (706, 382, 819, 468), keep=[(706, 382, 819, 468)], kind="drawing")
fig("ea-study-glass", 29, (574, 470, 686, 566), keep=[(574, 470, 686, 566)], kind="drawing")
fig("ea-study-curved", 29, (708, 482, 820, 578), keep=[(708, 482, 820, 578)], kind="drawing")

# 5 Design Concepts
fig("dc-logo", 30, (91, 446, 276, 541))
fig("jss-logo", 30, (418, 57, 490, 134))
fig("jss-plan", 30, (415, 140, 812, 334), keep=[], text="keep", dpi=600, kind="drawing")
fig("jss-entrance", 30, (412, 337, 807, 561))
fig("jss-sheet-sections", 31, (39, 50, 371, 320), keep=[], text="keep", dpi=600, kind="drawing")
fig("jss-sheet-elevations", 31, (431, 50, 764, 320), keep=[], text="keep", dpi=600, kind="drawing")
fig("jss-field", 31, (36, 343, 420, 561))
fig("jss-facade", 31, (418, 343, 803, 561))
fig("villa-front", 32, (34, 90, 400, 303))
fig("villa-entrance", 32, (34, 348, 400, 561))
fig("villa-courtyard", 32, (441, 348, 807, 561))
fig("villa-plan", 32, (441, 78, 801, 307), kind="drawing")
fig("tower-render", 33, (33, 92, 396, 562))
fig("tower-plan", 33, (453, 78, 789, 337), kind="drawing")
fig("tower-street", 33, (433, 350, 807, 561))
