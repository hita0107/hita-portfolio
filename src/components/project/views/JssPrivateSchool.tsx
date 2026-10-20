"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/portfolio";
import assets from "@/content/jssAssets.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StackedDrawingBrowser, type DrawingGroup } from "@/components/project/StackedDrawingBrowser";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

type JssImage = (typeof assets)["renders"][number];

const planGroups: DrawingGroup[] = [
  { label: "Whole school", items: assets.campusPlans },
  { label: "Block B", items: assets.blockPlans },
];

const constructionGroups: DrawingGroup[] = [
  { label: "Elevations", items: assets.elevations },
  { label: "Building sections", items: assets.sections.slice(0, 2) },
  { label: "Wall sections", items: assets.sections.slice(2) },
];

const landscapeGroups: DrawingGroup[] = [
  { label: "Landscape details", items: assets.landscape },
];

function SectionHeading({ label, title, text }: { label: string; title: string; text: string }) {
  return <SectionReveal className="mb-10">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">{title}</h2>
    <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">{text}</p>
  </SectionReveal>;
}

function RenderCard({ image, onOpen, wide = false }: { image: JssImage; onOpen: (image: SiteImage) => void; wide?: boolean }) {
  return <figure className={wide ? "md:col-span-2" : ""}>
    <button
      type="button"
      aria-label={`Enlarge ${image.title}`}
      onClick={() => onOpen({ src: image.full, title: image.title, alt: image.alt })}
      className={`group relative block w-full overflow-hidden bg-cream focus-visible:outline-offset-4 ${wide ? "aspect-[2.25]" : "aspect-[16/9]"}`}
    >
      <Image src={image.src} alt={image.alt} fill unoptimized sizes={wide ? "90vw" : "(min-width: 768px) 45vw, 90vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
    </button>
    <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{image.title}</figcaption>
  </figure>;
}

export function JssPrivateSchool({ project }: { project: Project }) {
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return <>
    <Opener project={project} introduction={project.paragraphs} />

    <section aria-label="JSS Private School visualisations" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Visualisations" title="The school in context" text="Views of the main arrival, the school frontage and its outdoor sports facilities." />
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
          {assets.renders.map((image, index) => <SectionReveal key={image.src} className={index === 0 ? "md:col-span-2" : ""}>
            <RenderCard image={image} onOpen={setViewer} wide={index === 0} />
          </SectionReveal>)}
        </div>
      </div>
    </section>

    <section aria-label="JSS Private School floor plans" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Tender drawings / 01" title="Floor by floor" text="The overall school plans and the corresponding Block B sheets can be explored level by level." />
        <SectionReveal><StackedDrawingBrowser groups={planGroups} name="floor plan" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section aria-label="JSS Private School elevations and sections" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Tender drawings / 02" title="Elevations and sections" text="Building sections, elevations and enlarged wall sections describe the school from its overall form to the construction of Block B." />
        <SectionReveal><StackedDrawingBrowser groups={constructionGroups} name="elevation or section" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section aria-label="JSS Private School landscape details" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Tender drawings / 03" title="Landscape details" text="The landscape sheets resolve the external levels, access, planting and edge conditions around the school." />
        <SectionReveal><StackedDrawingBrowser groups={landscapeGroups} onOpen={setViewer} name="landscape drawing" /></SectionReveal>
      </div>
    </section>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
