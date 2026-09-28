# Hita Shah, architecture portfolio

Static Next.js site built from `Portfolio_Hita_Shah.pdf` (Selected Works 2022-26).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export in out/
```

## Images

Every figure comes out of the portfolio PDF through two scripts (Python 3.13 with PyMuPDF and Pillow):

```bash
py -3 scripts/extract_figures.py <portfolio.pdf> assets-src/figures
py -3 scripts/build_images.py assets-src/figures public/img src/content/images.ts
```

`scripts/figures.py` lists each figure: page, crop rectangle in PDF points, which embedded images to keep,
whether vector text or line art is stripped, and the render dpi. Each figure is rendered from a fresh copy of
its page with the other images deleted, so overlapping neighbours never bleed into a crop.

The current PDF embeds its images at 72 dpi, so renders and plans are soft on large screens. Re-exporting the
Affinity file with image downsampling turned off and re-running both commands sharpens every raster with no code
change, as long as the page layout stays the same. If pages move, update the rectangles in `scripts/figures.py`.

## Content

- `src/content/portfolio.ts`: all copy (profile, CV, project text)
- `src/content/figures.ts`: alt text and captions for every image
- `src/content/buildups.ts`: construction layers in mm for the to-scale build-up diagrams, plus the Verdant
  material lists and the Faithlie embodied carbon terms

## Deploying

Build on Linux (Vercel, Netlify or GitHub Actions). Next.js 16.3.6 static exports built on Windows write the
per-segment prefetch files with backslash paths, which become nested folders instead of the dotted file names
the client requests, so link prefetches return 404. Navigation still works, but deploy from a Linux build.
