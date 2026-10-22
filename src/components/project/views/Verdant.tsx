"use client";

import { useRef, useState } from "react";
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
const drawingGroups: DrawingGroup[] = [
  { label: "Floor plans", items: assets.plans },
  { label: "Sections", items: assets.sections.slice(0, 2) },
  { label: "Elevations", items: assets.sections.slice(2, 3) },
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

function PrecedentCarousel({ onOpen }: { onOpen: (image: SiteImage) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const activeIndex = Math.round(focusIndex);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-precedent]")[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
    setFocusIndex(index);
  };

  const updateCenter = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    const cards = [...track.querySelectorAll<HTMLElement>("[data-precedent]")];
    const centers = cards.map((card) => card.offsetLeft + card.clientWidth / 2);
    const next = centers.findIndex((cardCenter) => cardCenter >= center);
    if (next <= 0) setFocusIndex(0);
    else if (next === -1) setFocusIndex(centers.length - 1);
    else setFocusIndex(next - 1 + (center - centers[next - 1]) / (centers[next] - centers[next - 1]));
  };

  return <div>
    <div
      ref={trackRef}
      onScroll={updateCenter}
      aria-label="Precedent studies, scroll horizontally"
      className="relative flex snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain py-16 md:py-24"
      style={{ "--precedent-width": "clamp(270px, 35vw, 470px)", "--precedent-overlap": "clamp(48px, 8vw, 110px)" } as React.CSSProperties}
    >
      <span aria-hidden="true" className="shrink-0" style={{ width: "calc(50% - var(--precedent-width) / 2)" }} />
      {assets.precedents.map((image, index) => {
        const distance = Math.min(Math.abs(index - focusIndex), 2);
        const direction = Math.sign(index - focusIndex);
        return <div
          key={image.src}
          data-precedent
          className="shrink-0 snap-center will-change-transform motion-reduce:transform-none"
          style={{
            width: "var(--precedent-width)",
            marginLeft: index === 0 ? 0 : "calc(-1 * var(--precedent-overlap))",
            transform: `perspective(1100px) rotateY(${-direction * distance * 23}deg) scale(${1.16 - distance * .32})`,
            opacity: 1 - distance * .18,
            zIndex: 10 - Math.round(distance * 3),
          }}
        >
          <button
            type="button"
            aria-label={activeIndex === index ? `Enlarge ${image.title}` : `View ${image.title}`}
            onClick={() => activeIndex === index ? onOpen({ src: image.full, title: image.title, alt: image.alt }) : goTo(index)}
            className="relative block aspect-[3/4] w-full overflow-hidden border border-sage-300/50 bg-white shadow-[0_18px_45px_rgba(48,54,39,.16)] focus-visible:outline-offset-4"
          >
            <Image src={image.src} alt={image.alt} fill unoptimized sizes="(min-width: 1024px) 45vw, 80vw" className="object-contain" />
          </button>
        </div>;
      })}
      <span aria-hidden="true" className="shrink-0" style={{ width: "calc(50% - var(--precedent-width) / 2)" }} />
    </div>
    <p className="text-center font-display text-[clamp(1.3rem,2.1vw,2rem)] text-ink">{assets.precedents[activeIndex].title}</p>
    <div className="mt-5 flex items-center justify-between border-t border-sage-300/60 pt-4 text-[12px] uppercase tracking-[.12em] text-ink-soft">
      <span>{String(activeIndex + 1).padStart(2, "0")} / {String(assets.precedents.length).padStart(2, "0")}</span>
      <span className="hidden sm:inline">Scroll to explore · select the center image to enlarge</span>
      <div className="flex gap-5">
        <button type="button" aria-label="Previous precedent" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)} className="text-ink transition-opacity disabled:opacity-30">←</button>
        <button type="button" aria-label="Next precedent" disabled={activeIndex === assets.precedents.length - 1} onClick={() => goTo(activeIndex + 1)} className="text-ink transition-opacity disabled:opacity-30">→</button>
      </div>
    </div>
  </div>;
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
        <SectionReveal><PrecedentCarousel onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section id="verdant-exploration" aria-label="Verdant Theatre exploration" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <Heading label="03 / Exploration" title="From programme to form" text="Diagrams, massing studies and early views trace the movement from a theatre brief to a building shaped by circulation, topography and views toward Edinburgh Castle." />
        <div className="space-y-20 md:space-y-28">
          <div>
            <SectionReveal className="mb-7 border-t border-sage-300/60 pt-5"><h3 className="font-display text-3xl text-ink">Programme and spatial relationships</h3></SectionReveal>
            <div className="grid gap-7 md:grid-cols-3">
              {assets.exploration.slice(0, 3).map((image) => <SectionReveal key={image.src}><ImageCard image={image} onOpen={setViewer} /></SectionReveal>)}
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
              <figure className="mx-auto max-w-[950px]">
                <button
                  type="button"
                  aria-label={`Enlarge ${earlyInterior.title}`}
                  onClick={() => setViewer({ src: earlyInterior.full, title: earlyInterior.title, alt: earlyInterior.alt })}
                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
                    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
                  }}
                  className="verdant-interior relative block aspect-[2200/1573] w-full overflow-hidden border border-sage-300/35 bg-white focus-visible:outline-offset-4"
                >
                  <Image src={earlyInterior.src} alt={earlyInterior.alt} fill unoptimized sizes="(min-width: 1024px) 950px, 92vw" className="object-contain opacity-30" />
                  <span aria-hidden="true" className="verdant-interior-reveal pointer-events-none absolute inset-0">
                    <Image src={earlyInterior.src} alt="" fill unoptimized sizes="(min-width: 1024px) 950px, 92vw" className="object-contain" />
                  </span>
                </button>
                <figcaption className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{earlyInterior.title}</figcaption>
              </figure>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>

    <section id="verdant-drawings" aria-label="Verdant Theatre architectural drawings" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <Heading label="04 / Drawings" title="Plans, sections & elevations" text="Explore the five floor plans, theatre sections, north-east elevation and exploded assembly together. Hover over a drawing title to change the sheet, or open it for detailed inspection." />
        <SectionReveal><StackedDrawingBrowser groups={drawingGroups} name="architectural drawing" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section id="verdant-renders" aria-label="Verdant Theatre renders" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <Heading label="05 / Renders" title="A public theatre" text="Select a view to move from Castle Terrace through the auditorium, circulation, music room and public foyer." />
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
