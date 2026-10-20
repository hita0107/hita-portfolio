"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/portfolio";
import assets from "@/content/villaAssets.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StackedDrawingBrowser, type DrawingGroup } from "@/components/project/StackedDrawingBrowser";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

type VillaImage = (typeof assets)["renders"][number];

const planGroups: DrawingGroup[] = [{ label: "Floor plans", items: assets.plans }];
const drawingGroups: DrawingGroup[] = [
  { label: "Elevations", items: assets.elevations },
  { label: "Sections", items: assets.sections },
];

function SectionHeading({ label, title, text }: { label: string; title: string; text: string }) {
  return <SectionReveal className="mb-10">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">{title}</h2>
    <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">{text}</p>
  </SectionReveal>;
}

function VillaRender({ image, onOpen, wide = false }: { image: VillaImage; onOpen: (image: SiteImage) => void; wide?: boolean }) {
  return <figure>
    <button
      type="button"
      aria-label={`Enlarge ${image.title}`}
      onClick={() => onOpen({ src: image.full, title: image.title, alt: image.alt })}
      className={`group relative block w-full overflow-hidden bg-cream focus-visible:outline-offset-4 ${wide ? "aspect-[2.15]" : "aspect-[16/9]"}`}
    >
      <Image src={image.src} alt={image.alt} fill unoptimized sizes={wide ? "90vw" : "(min-width: 768px) 45vw, 90vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
    </button>
    <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{image.title}</figcaption>
  </figure>;
}

export function LuxuryVilla({ project }: { project: Project }) {
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return <>
    <Opener project={project} introduction={project.paragraphs} />

    <section aria-label="Luxury Villa visualisations" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Visualisations" title="Arrival to courtyard" text="Views move from the street-facing elevation and entrance through to the garden side, courtyard and sheltered outdoor room." />
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
          {assets.renders.map((image, index) => <SectionReveal key={image.src} className={index === 0 ? "md:col-span-2" : ""}>
            <VillaRender image={image} onOpen={setViewer} wide={index === 0} />
          </SectionReveal>)}
        </div>
      </div>
    </section>

    <section aria-label="Luxury Villa floor plans" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Drawings / 01" title="Across two levels" text="Explore the ground and first floors to see how the rooms and courtyard connect." />
        <SectionReveal><StackedDrawingBrowser groups={planGroups} name="floor plan" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section aria-label="Luxury Villa elevations and sections" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Drawings / 02" title="Elevations and sections" text="The elevations and building sections show the villa's proportions, openings and relationship between the two floors." />
        <SectionReveal><StackedDrawingBrowser groups={drawingGroups} name="elevation or section" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
