"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";
import { CommonGroundScrollStory } from "./CommonGroundScrollStory";

const base = "/faithlie/submission";

const studies = [
  {
    title: "Conservation",
    image: `${base}/context/conservation.webp`,
    description: "The study tracks what could be retained, repaired and connected. Keeping Saltoun Chambers and the former police station protected the town centre's historic fabric while allowing new civic uses.",
    detail: "The new circulation route links the existing buildings across their different floor levels, with the extension set back so it does not dominate Saltoun Square.",
  },
  {
    title: "Fire strategy",
    image: `${base}/context/fire-strategy.webp`,
    description: "The ground floor provides multiple escape routes. At upper levels, the retained protected stairs work with the new link to support evacuation through the joined buildings.",
    detail: "The diagrams test how the extension changes circulation and the location of protected routes across the three floors.",
  },
  {
    title: "Health & safety",
    image: `${base}/context/health-safety.webp`,
    description: "Construction planning had to account for two listed buildings that would remain in place. The study identifies a dedicated work area and routes that reduce disruption to the retained fabric.",
    detail: "The constraints of an occupied town-centre site shaped access, sequencing and temporary separation during the works.",
  },
  {
    title: "Procurement",
    image: `${base}/context/procurement.webp`,
    description: "The submission examines a traditional procurement structure, with the design team and contractor separately accountable to Aberdeenshire Council as client.",
    detail: "Mapping the roles makes the relationship between architectural decisions, specialist consultants, cost and delivery easier to read.",
  },
  {
    title: "Façade & structure",
    image: `${base}/context/exploded-facade.webp`,
    description: "An exploded drawing separates the glazed enclosure, support and weathering-steel screen. The layers form a new civic face while remaining visibly distinct from the historic masonry.",
    detail: "The screen filters sunlight and gives the extension its material character; the physical model tests how that assembly reads at different scales.",
  },
] as const;

const portraitModelImages = [1, 2, 4, 10, 5, 6, 7, 9].map((number) => `${base}/model/${String(number).padStart(2, "0")}.webp`);
const landscapeModelImages = [3, 8].map((number) => `${base}/model/${String(number).padStart(2, "0")}.webp`);
const modelImages = [...portraitModelImages, ...landscapeModelImages];
const processImages = Array.from({ length: 6 }, (_, index) => `${base}/process/${String(index + 1).padStart(2, "0")}.webp`);

function ImageButton({ src, alt, title, className, imageClassName = "object-contain", onOpen }: { src: string; alt: string; title: string; className: string; imageClassName?: string; onOpen: (image: SiteImage) => void }) {
  return <button type="button" onClick={() => onOpen({ src, title, alt })} aria-label={`Enlarge ${title}`} className={`group relative block overflow-hidden focus-visible:outline-offset-4 ${className}`}>
    <Image src={src} fill alt={alt} unoptimized sizes="(min-width: 1024px) 48vw, 92vw" className={`${imageClassName} transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none`} />
  </button>;
}

export function FaithlieSections({ construction, carbon }: { construction: ReactNode; carbon: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState(0);
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return <>
    <section id="faithlie-context" aria-labelledby="faithlie-context-title" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Context</SectionLabel>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_.85fr] md:gap-16">
            <h2 id="faithlie-context-title" className="font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">Two civic buildings, one public centre</h2>
            <p className="max-w-xl self-end text-base leading-[1.75] text-ink-soft">This Year 4 precedent study examines Moxon Architects’ Faithlie Centre in Fraserburgh. Saltoun Chambers and the former police station are retained and connected by a contemporary extension, bringing council services and community uses together within the historic town centre.</p>
          </div>
        </SectionReveal>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          <SectionReveal>
            <ImageButton src={`${base}/context/location.webp`} title="Fraserburgh location study" alt="Map locating Fraserburgh and Faithlie Centre" className="aspect-[5/4] w-full bg-cream" onOpen={setViewer} />
            <p className="mt-3 text-xs uppercase tracking-[.12em] text-ink-soft">Fraserburgh / location</p>
          </SectionReveal>
          <SectionReveal>
            <ImageButton src={`${base}/context/conservation-area.webp`} title="Faithlie conservation area" alt="Map showing the conservation area around Faithlie Centre" className="aspect-[5/4] w-full bg-cream" onOpen={setViewer} />
            <p className="mt-3 text-xs uppercase tracking-[.12em] text-ink-soft">Saltoun Square / conservation area</p>
          </SectionReveal>
        </div>
      </div>
    </section>

    <section id="faithlie-study" aria-labelledby="faithlie-study-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <div className="faithlie-design-story">
          <CommonGroundScrollStory progressPlacement="left" heading={<div data-cg-heading>
            <SectionLabel>Design & Delivery</SectionLabel>
            <h2 id="faithlie-study-title" className="mt-5 font-display text-[clamp(2.2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">Design & delivery</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">The study follows the decisions behind the adaptation, from conservation and access to safety, procurement and the new façade.</p>
          </div>}>
            {studies.map((study, index) => <article key={study.title} data-cg-story-panel className="cg-scroll-panel grid items-center gap-8 border-t border-sage-300/60 py-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:border-0 lg:py-0">
              <div className="max-w-xl">
                <p className="t-label text-sage-700">{String(index + 1).padStart(2, "0")} / {String(studies.length).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.6rem)] font-light leading-tight text-ink">{study.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">{study.description}</p>
                <p className="mt-5 text-sm leading-[1.7] text-ink-soft">{study.detail}</p>
              </div>
              <ImageButton src={study.image} title={study.title} alt={`${study.title} drawing from the Faithlie Centre study`} className="h-[340px] w-full bg-white sm:h-[440px] lg:h-[min(43svh,390px)]" onOpen={setViewer} />
            </article>)}
          </CommonGroundScrollStory>
        </div>
      </div>
    </section>

    {construction}
    {carbon}

    <section id="faithlie-model" aria-labelledby="faithlie-model-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Physical model</SectionLabel>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_.85fr] md:gap-16">
            <h2 id="faithlie-model-title" className="font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">The physical model</h2>
            <p className="max-w-xl self-end text-base leading-[1.75] text-ink-soft">The model turns the façade and circulation drawings into an assembled object. Move through the views to see the Corten screen, retained stone, internal stairs and the spaces between the old and new structures.</p>
          </div>
        </SectionReveal>
        <SectionReveal className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:gap-10">
          <div>
            <ImageButton src={modelImages[selectedModel]} title={`Faithlie model view ${selectedModel + 1}`} alt={`Physical model of Faithlie Centre, view ${selectedModel + 1}`} className="h-[min(62svh,600px)] w-full bg-white" onOpen={setViewer} />
          </div>
          <div className="grid grid-cols-4 gap-2 self-start sm:gap-3" role="group" aria-label="Select a model view">
            {modelImages.map((src, index) => <button key={src} type="button" onMouseEnter={() => setSelectedModel(index)} onFocus={() => setSelectedModel(index)} onClick={() => setSelectedModel(index)} aria-label={`Show model view ${index + 1}`} aria-pressed={selectedModel === index} className={`relative overflow-hidden border-2 bg-white transition-[border-color,opacity] ${index >= portraitModelImages.length ? "col-span-2 aspect-[3/2]" : "aspect-[2/3]"} ${selectedModel === index ? "border-ink opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}><Image src={src} fill alt="" unoptimized sizes="(min-width: 1024px) 200px, 25vw" className="object-cover" /></button>)}
          </div>
        </SectionReveal>

      </div>
    </section>

    <section id="faithlie-process" aria-labelledby="faithlie-process-title" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <div className="flex flex-wrap items-end justify-between gap-5 border-b editorial-line pb-5">
            <div><SectionLabel>Making process</SectionLabel><h2 id="faithlie-process-title" className="mt-3 font-display text-[clamp(2rem,3.5vw,3.5rem)] font-light text-ink">From drawing to assembly</h2></div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {processImages.map((src, index) => <ImageButton key={src} src={src} title={`Model-making process ${index + 1}`} alt={`Faithlie Centre model-making process photograph ${index + 1}`} className="aspect-square w-full bg-cream" imageClassName="object-cover" onOpen={setViewer} />)}
          </div>
        </SectionReveal>
      </div>
    </section>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
