"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import type { Project } from "@/content/portfolio";
import assets from "@/content/villaAssets.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StackedDrawingBrowser, type DrawingGroup } from "@/components/project/StackedDrawingBrowser";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

const planGroups: DrawingGroup[] = [{ label: "Floor plans", items: assets.plans }];
const sectionPositions = ["center 0%", "center 50%", "center 100%"];
const sections = ["Section AA", "Section BB", "Section CC"].map((title) => ({
  ...assets.sections[0],
  title,
  alt: `Luxury Villa — ${title}`,
}));

function SectionHeading({ label, title, text }: { label: string; title: string; text: string }) {
  return <SectionReveal className="mb-10">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">{title}</h2>
    <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">{text}</p>
  </SectionReveal>;
}

function VillaDrawingBrowser({ onOpen }: { onOpen: (image: SiteImage) => void }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const groups = [
    { label: "Elevations", images: assets.elevations },
    { label: "Sections", images: sections },
  ];
  const group = groups[groupIndex];
  const image = group.images[imageIndex];
  const isElevation = groupIndex === 0;

  return <>
    <div role="group" aria-label="Choose drawing type" className="mb-8 flex gap-7 border-b border-sage-300/60">
      {groups.map((option, index) => <button
        key={option.label}
        type="button"
        aria-pressed={groupIndex === index}
        onClick={() => { setGroupIndex(index); setImageIndex(0); }}
        className={`border-b-2 py-3 text-[12px] uppercase tracking-[.12em] transition-colors ${groupIndex === index ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}
      >{option.label}</button>)}
    </div>
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(210px,.25fr)] lg:gap-12">
      <button
        type="button"
        aria-label={`Enlarge ${image.title}`}
        onClick={() => onOpen({
          src: image.full,
          title: image.title,
          alt: image.alt,
          crop: { aspectRatio: isElevation ? 3.25 : 4, objectPosition: isElevation ? (imageIndex === 0 ? "center 15%" : "center 83%") : sectionPositions[imageIndex] },
        })}
        className={`relative block w-full overflow-hidden border border-sage-300/50 bg-white focus-visible:outline-offset-4 ${isElevation ? "aspect-[3.25]" : "aspect-[4]"}`}
      >
        {isElevation ? assets.elevations.map((elevation, index) => <Image
          key={elevation.src}
          src={elevation.src}
          alt={imageIndex === index ? elevation.alt : ""}
          fill
          unoptimized
          sizes="(min-width: 1024px) 70vw, 92vw"
          className={`object-cover transition-opacity duration-400 ${imageIndex === index ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: index === 0 ? "center 15%" : "center 83%" }}
        />) : sections.map((section, index) => <Image
          key={section.title}
          src={section.src}
          alt={imageIndex === index ? section.alt : ""}
          fill
          unoptimized
          sizes="(min-width: 1024px) 70vw, 92vw"
          className={`object-cover transition-opacity duration-400 ${imageIndex === index ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: sectionPositions[index] }}
        />)}
      </button>
      <div className="self-start border-t border-sage-300/60 pt-4">
        <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">{group.label} / {String(imageIndex + 1).padStart(2, "0")}</p>
        <h3 className="mt-3 grid min-h-10 font-display text-[clamp(1.55rem,2vw,2rem)] text-ink">
          {group.images.map((option, index) => <span
            key={option.title}
            aria-hidden={imageIndex !== index}
            className={`col-start-1 row-start-1 transition-opacity duration-400 motion-reduce:transition-none ${imageIndex === index ? "opacity-100" : "opacity-0"}`}
          >{option.title}</span>)}
        </h3>
        <div role="group" aria-label={`Choose ${group.label.toLowerCase()}`} className="mt-3 grid border-t border-sage-300/60">
          {group.images.map((option, index) => <button
            key={option.title}
            type="button"
            aria-pressed={imageIndex === index}
            onMouseEnter={() => setImageIndex(index)}
            onFocus={() => setImageIndex(index)}
            onClick={() => setImageIndex(index)}
            className={`border-b border-sage-300/60 py-3 text-left text-sm transition-colors ${imageIndex === index ? "text-ink" : "text-ink-soft hover:text-ink"}`}
          >{String(index + 1).padStart(2, "0")} &nbsp; {option.title}</button>)}
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[.12em] text-ink-soft">Select the drawing for a larger view</p>
      </div>
    </div>
  </>;
}

export function LuxuryVilla({ project }: { project: Project }) {
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const [selectedRender, setSelectedRender] = useState(0);
  const featuredRender = assets.renders[selectedRender];

  return <>
    <Opener project={project} introduction={project.paragraphs} />

    <section aria-label="Luxury Villa visualisations" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Visualisations" title="Arrival to courtyard" text="Views move from the street-facing elevation and entrance through to the garden side, courtyard and sheltered outdoor room." />
        <SectionReveal className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(220px,290px)] lg:gap-10">
          <div>
            <button
              type="button"
              aria-label={`Enlarge ${featuredRender.title}`}
              onClick={() => setViewer({ src: featuredRender.full, title: featuredRender.title, alt: featuredRender.alt })}
              className="relative block aspect-[3/2] w-full overflow-hidden bg-cream focus-visible:outline-offset-4"
            >
              {assets.renders.map((image, index) => <Image
                key={image.src}
                src={image.src}
                alt={selectedRender === index ? image.alt : ""}
                fill
                unoptimized
                sizes="(min-width: 1024px) 70vw, 94vw"
                className={`pointer-events-none object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${selectedRender === index ? "opacity-100" : "opacity-0"}`}
              />)}
            </button>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-sage-300/60 pt-3 text-[11px] uppercase tracking-[.14em] text-ink-soft">
              <span>{featuredRender.title}</span>
              <span>{String(selectedRender + 1).padStart(2, "0")} / {String(assets.renders.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div role="group" aria-label="Select a Luxury Villa render" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
            {assets.renders.map((image, index) => <button
              key={image.src}
              type="button"
              aria-pressed={selectedRender === index}
              onMouseEnter={() => setSelectedRender(index)}
              onFocus={() => setSelectedRender(index)}
              onClick={() => setSelectedRender(index)}
              className={`flex min-w-0 items-center gap-3 border-b border-sage-300/60 py-2 text-left transition-opacity focus-visible:outline-offset-4 ${selectedRender === index ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
            >
              <span className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden bg-cream sm:w-20">
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

    <section aria-label="Luxury Villa floor plans" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Drawings / 01" title="Across two levels" text="Explore the ground and first floors to see how the rooms and courtyard connect." />
        <SectionReveal><StackedDrawingBrowser groups={planGroups} name="floor plan" onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <section aria-label="Luxury Villa elevations and sections" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHeading label="Drawings / 02" title="Elevations and sections" text="The elevations and building sections show the villa's proportions, openings and relationship between the two floors." />
        <SectionReveal><VillaDrawingBrowser onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
