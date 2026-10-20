"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/portfolio";
import submissions from "@/content/submissions.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StackedDrawingBrowser, type DrawingGroup } from "@/components/project/StackedDrawingBrowser";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

type SubmissionImage = (typeof submissions)["jss-private-school"][number];

const multistorey = submissions["furjan-residential"];
const furjanDrawings: DrawingGroup[] = [{
  label: "Floor plans",
  items: multistorey.slice(4).map((image) => ({ title: image.label, alt: image.alt, src: image.src, full: image.full })),
}];

function SubmissionFigure({ image, onOpen, contain = false, sizes = "(min-width: 768px) 46vw, 94vw" }: {
  image: SubmissionImage;
  onOpen: (image: SiteImage) => void;
  contain?: boolean;
  sizes?: string;
}) {
  return <figure>
    <button
      type="button"
      onClick={() => onOpen({ src: image.full, title: image.label, alt: image.alt })}
      aria-label={`Enlarge ${image.label}`}
      className={`group relative block w-full overflow-hidden bg-white focus-visible:outline-offset-4 ${contain ? "aspect-[1600/1130]" : "aspect-[16/9]"}`}
    >
      <Image src={image.src} alt={image.alt} fill unoptimized sizes={sizes} className={`${contain ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none`} />
    </button>
    <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{image.label}</figcaption>
  </figure>;
}

function PracticeHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <SectionReveal className="mb-10 border-t border-sage-300/60 pt-6">
    <SectionLabel>{eyebrow}</SectionLabel>
    <h2 className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">{title}</h2>
    {description && <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">{description}</p>}
  </SectionReveal>;
}

export function ConceptualMultistorey({ project }: { project: Project }) {
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  return <>
    <Opener project={project} introduction={project.paragraphs} />

    <section aria-label="Furjan Residences visualisations" className="bg-white py-20 md:py-28">
      <div className="shell">
        <PracticeHeading eyebrow="Concept views" title="A new street presence" />
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {[multistorey[1], multistorey[0], multistorey[2], multistorey[3]].map((image) => <SectionReveal key={image.id}><SubmissionFigure image={image} onOpen={setViewer} /></SectionReveal>)}
        </div>
      </div>
    </section>

    <section aria-label="Furjan Residences floor plans" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <PracticeHeading eyebrow="Drawings" title="From ground to skyline" description="Explore the ground floor, parking podiums, amenities and residential levels. Select a drawing to enlarge it, or open the full-resolution sheet to inspect its details." />
        <SectionReveal><StackedDrawingBrowser groups={furjanDrawings} name="floor plan" onOpen={setViewer} compact /></SectionReveal>
      </div>
    </section>
    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
