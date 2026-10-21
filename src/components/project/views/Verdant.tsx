"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import type { Project } from "@/content/portfolio";
import assets from "@/content/verdantAssets.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StackedDrawingBrowser, type DrawingGroup } from "@/components/project/StackedDrawingBrowser";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

type VerdantImage = (typeof assets)["renders"][number];
const earlyInterior = assets.exploration[5];

const siteGroups: DrawingGroup[] = [
  { label: "Setting", items: assets.site.slice(0, 4) },
  { label: "Site layers", items: assets.site.slice(4, 9) },
  { label: "Context", items: assets.site.slice(9) },
];
const planGroups: DrawingGroup[] = [{ label: "Floor plans", items: assets.plans }];
const sectionGroups: DrawingGroup[] = [
  { label: "Sections", items: assets.sections.slice(0, 2) },
  { label: "Elevation", items: assets.sections.slice(2, 3) },
  { label: "Assembly", items: assets.sections.slice(3) },
];

function Heading({ label, title, text }: { label: string; title: string; text: string }) {
  return <SectionReveal className="mb-10 md:mb-14">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="mt-5 font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">{title}</h2>
    <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">{text}</p>
  </SectionReveal>;
}

function ImageCard({ image, onOpen, aspect = "aspect-[4/3]", contain = true }: {
  image: VerdantImage;
  onOpen: (image: SiteImage) => void;
  aspect?: string;
  contain?: boolean;
}) {
  return <figure>
    <button
      type="button"
      aria-label={`Enlarge ${image.title}`}
      onClick={() => onOpen({ src: image.full, title: image.title, alt: image.alt })}
      className={`group relative block w-full overflow-hidden border border-sage-300/35 bg-white focus-visible:outline-offset-4 ${aspect}`}
    >
      <Image src={image.src} alt={image.alt} fill unoptimized sizes="(min-width: 1024px) 45vw, 92vw" className={`${contain ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none`} />
    </button>
    <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{image.title}</figcaption>
  </figure>;
}

function SpotlightImageCard({ image, onOpen, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 30vw, 92vw" }: {
  image: VerdantImage;
  onOpen: (image: SiteImage) => void;
  aspect?: string;
  sizes?: string;
}) {
  return <figure>
    <button
      type="button"
      aria-label={`Enlarge ${image.title}`}
      onClick={() => onOpen({ src: image.full, title: image.title, alt: image.alt })}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      }}
      className={`verdant-interior relative block w-full overflow-hidden border border-sage-300/35 bg-white focus-visible:outline-offset-4 ${aspect}`}
    >
      <Image src={image.src} alt={image.alt} fill unoptimized sizes={sizes} className="object-contain opacity-30" />
      <span aria-hidden="true" className="verdant-interior-reveal pointer-events-none absolute inset-0">
        <Image src={image.src} alt="" fill unoptimized sizes={sizes} className="object-contain" />
      </span>
    </button>
    <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{image.title}</figcaption>
  </figure>;
}

export function Verdant({ project }: { project: Project }) {
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const [selectedRender, setSelectedRender] = useState(0);
  const featuredRender = assets.renders[selectedRender];

  return <>
    <Opener project={project} introduction={[project.paragraphs[0], project.paragraphs[3]]} />

    <section id="verdant-site" aria-label="Verdant Theatre site analysis" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <Heading label="01 / Site analysis" title="A theatre within the city" text="The site study reads Edinburgh's urban level, green space, movement, building use and dramatic topography before locating the theatre within its wider context." />
        <SectionReveal><StackedDrawingBrowser groups={siteGroups} name="site analysis drawing" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section id="verdant-brief" aria-label="Verdant Theatre brief" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <Heading label="02 / Brief" title="A place for performance" text="A 480-seat theatre sits alongside rehearsal, recording, dressing, café and public foyer spaces. The programme separates theatre, front of house and backstage functions while connecting them through shared circulation." />
        <div className="grid items-center gap-10 border-t border-sage-300/60 pt-9 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <SectionReveal className="max-w-lg">
            <p className="font-display text-[clamp(1.75rem,2.7vw,2.75rem)] leading-[1.15] text-ink">The building is organised around the experience of arriving, gathering and watching.</p>
            <p className="mt-6 text-[15px] leading-[1.75] text-ink-soft">{project.paragraphs[1]}</p>
          </SectionReveal>
          <SectionReveal><ImageCard image={assets.brief[0]} onOpen={setViewer} aspect="aspect-[4/3]" /></SectionReveal>
        </div>
        <SectionReveal className="mb-7 mt-20 border-t border-sage-300/60 pt-6">
          <SectionLabel>Precedent studies</SectionLabel>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-ink-soft">Five cultural buildings informed the study of public approaches, landscape, structure and performance space.</p>
        </SectionReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {assets.precedents.map((image) => <SectionReveal key={image.src}><ImageCard image={image} onOpen={setViewer} aspect="aspect-[3/4]" /></SectionReveal>)}
        </div>
      </div>
    </section>

    <section id="verdant-exploration" aria-label="Verdant Theatre exploration" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <Heading label="03 / Exploration" title="From programme to form" text="Diagrams, massing studies and early views trace the movement from a theatre brief to a building shaped by circulation, topography and views toward Edinburgh Castle." />
        <div className="space-y-20 md:space-y-28">
          <div>
            <SectionReveal className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-sage-300/60 pt-5">
              <h3 className="font-display text-3xl text-ink">Programme and spatial relationships</h3>
              <p className="text-[11px] uppercase tracking-[.14em] text-ink-soft">Hover over a sketch to reveal its detail</p>
            </SectionReveal>
            <div className="grid gap-7 md:grid-cols-3">
              {assets.exploration.slice(0, 3).map((image) => <SectionReveal key={image.src}><SpotlightImageCard image={image} onOpen={setViewer} /></SectionReveal>)}
            </div>
          </div>
          <div>
            <SectionReveal className="mb-7 border-t border-sage-300/60 pt-5"><h3 className="font-display text-3xl text-ink">Massing and concept</h3></SectionReveal>
            <div className="grid gap-7 md:grid-cols-2">
              {assets.exploration.slice(3, 5).map((image) => <SectionReveal key={image.src}><ImageCard image={image} onOpen={setViewer} /></SectionReveal>)}
            </div>
          </div>
          <div>
            <SectionReveal className="mb-7 border-t border-sage-300/60 pt-5"><h3 className="font-display text-3xl text-ink">Early spatial view</h3></SectionReveal>
            <SectionReveal>
              <div className="mx-auto max-w-[950px]">
                <SpotlightImageCard image={earlyInterior} onOpen={setViewer} aspect="aspect-[2200/1573]" sizes="(min-width: 1024px) 950px, 92vw" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>

    <section id="verdant-plans" aria-label="Verdant Theatre floor plans" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <Heading label="04 / Floor plans" title="Five levels of theatre" text="Move from the public ground floor through the auditorium, studios and upper rooms. Hover over a level to change the drawing, or open a sheet for detailed inspection." />
        <SectionReveal><StackedDrawingBrowser groups={planGroups} name="floor plan" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section id="verdant-sections" aria-label="Verdant Theatre sections and elevations" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <Heading label="05 / Sections and elevations" title="Theatre in section" text="A long section, an enlarged auditorium section, the north-east elevation and an exploded assembly show how the proposal meets the slope and frames its performance spaces." />
        <SectionReveal><StackedDrawingBrowser groups={sectionGroups} name="section or elevation" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section id="verdant-renders" aria-label="Verdant Theatre renders" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <Heading label="06 / Renders" title="A public theatre" text="Select a view to move from Castle Terrace through the auditorium, circulation, music room and public foyer." />
        <SectionReveal className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(235px,290px)] lg:gap-10">
          <div>
            <button
              type="button"
              aria-label={`Enlarge ${featuredRender.title}`}
              onClick={() => setViewer({ src: featuredRender.full, title: featuredRender.title, alt: featuredRender.alt })}
              className="group relative block aspect-[3/2] w-full overflow-hidden border border-sage-300/45 bg-white focus-visible:outline-offset-4"
            >
              {assets.renders.map((image, index) => <Image
                key={image.src}
                src={image.src}
                alt={selectedRender === index ? image.alt : ""}
                fill
                unoptimized
                loading="eager"
                sizes="(min-width: 1024px) 70vw, 94vw"
                className={`pointer-events-none object-contain transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${selectedRender === index ? "opacity-100" : "opacity-0"}`}
              />)}
            </button>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-sage-300/60 pt-3 text-[11px] uppercase tracking-[.14em] text-ink-soft">
              <span>{featuredRender.title}</span>
              <span>{String(selectedRender + 1).padStart(2, "0")} / {String(assets.renders.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div role="group" aria-label="Select a Verdant Theatre render" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
            {assets.renders.map((image, index) => <button
              key={image.src}
              type="button"
              aria-pressed={selectedRender === index}
              onMouseEnter={() => setSelectedRender(index)}
              onFocus={() => setSelectedRender(index)}
              onClick={() => setSelectedRender(index)}
              className={`flex min-w-0 items-center gap-3 border-b border-sage-300/60 py-3 text-left transition-opacity focus-visible:outline-offset-4 lg:py-4 ${selectedRender === index ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
            >
              <span className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden bg-white sm:w-20">
                <Image src={image.src} alt="" fill unoptimized sizes="80px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] tracking-[.14em] text-sage-700">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block font-display text-[clamp(1rem,1.35vw,1.25rem)] leading-tight text-ink">{image.title}</span>
              </span>
            </button>)}
          </div>
        </SectionReveal>
      </div>
    </section>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
