"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import { SectionLabel } from "@/components/SectionLabel";
import images from "@/content/commonGroundSubmission.json";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";
import { CommonGroundScrollStory } from "./CommonGroundScrollStory";

type ImageKey = keyof typeof images;
type DiagramKey = ImageKey | "existing-light-access";
type Diagram = { key: DiagramKey; title: string };
type Slide = { title: string; text: string; diagrams: Diagram[]; layout?: "stacked" | "pair" };

const getImage = (key: DiagramKey) => key === "existing-light-access"
  ? { src: "/common-ground/exploration/light-proximity.png", width: 3544, height: 3544 }
  : images[key];

const sociable: Slide[] = [
  { title: "Users", text: "Different age groups and needs inform the mix of spaces. The proposal is designed for people to use the same place in different ways throughout the day.", diagrams: [{ key: "exploration/users", title: "Users" }] },
  { title: "Third space", text: "Lived space emerges where the physical experience of a place meets the way people imagine and use it. This overlap makes room for informal social life.", diagrams: [{ key: "exploration/spaces-of-gathering-2", title: "Third space" }] },
  { title: "Spaces of gathering", text: "People, space and activity combine to create moments of encounter. Architecture gives those meetings a setting without prescribing exactly how they happen.", diagrams: [{ key: "exploration/spaces-of-gathering", title: "Spaces of gathering" }] },
  { title: "Sociable spaces + activities", text: "Learning, play, growing and shared work become a programme of sociable spaces that can change with their users. The two diagrams connect these activities with the places that host them.", diagrams: [{ key: "exploration/sociable-activities", title: "Sociable spaces" }, { key: "exploration/activities", title: "Activities" }], layout: "stacked" },
];

const biophilia: Slide[] = [
  { title: "Biophilia", text: "Contact with nature shapes wellbeing and the way people occupy shared spaces. Gardens, planting and views of the landscape become part of everyday life within the proposal.", diagrams: [{ key: "exploration/biophilia-and-human-behaviour", title: "Biophilia" }] },
  { title: "Light and access", text: "Daylight and access guide where each activity can sit as the spatial system adapts to different sites, from bright communal rooms to quieter enclosed spaces.", diagrams: [{ key: "existing-light-access", title: "Light and access" }] },
  { title: "Sensory intentions", text: "Light, material, sound and atmosphere translate the project’s phenomenological aims into design choices that can support different sensory needs.", diagrams: [{ key: "exploration/phenomenological-intentions-into-design", title: "Sensory intentions" }] },
];

const hybridity: Slide[] = [
  { title: "Proximity vs overlap as connectors", text: "Hybrid rooms can connect through proximity, with distinct spaces linked by a shared threshold, or through overlap, where two programmes use part of the same space. Both create opportunities for encounter.", diagrams: [{ key: "exploration/hybrid-connection-through-proximity", title: "Proximity" }, { key: "exploration/hybrid-connection-through-overlap", title: "Overlap" }], layout: "pair" },
  { title: "Proximity map", text: "The matrix tests which rooms should connect directly and which benefit from sitting near one another. It turns the idea of hybridity into a set of spatial relationships for the proposal.", diagrams: [{ key: "exploration/proximity-diagram", title: "Proximity map" }] },
];

function DiagramVisual({ diagram, onOpen, frameClass, showLabel = false, interactive = false }: { diagram: Diagram; onOpen: (image: SiteImage) => void; frameClass: string; showLabel?: boolean; interactive?: boolean }) {
  const asset = getImage(diagram.key);
  const visual = <Image src={asset.src} width={asset.width} height={asset.height} alt={`${diagram.title} exploration diagram`} unoptimized sizes="(min-width: 1024px) 45vw, 92vw" className={`h-full w-full object-contain ${diagram.key === "exploration/hybrid-connection-through-proximity" ? "-translate-x-[4%] scale-[1.08]" : ""}`} />;
  return (
    <figure className="min-w-0">
      {interactive ? (
        <button type="button" onClick={() => onOpen({ src: asset.src, title: diagram.title, alt: `${diagram.title} exploration diagram` })} aria-label={`Enlarge ${diagram.title}`} className={`flex w-full items-center justify-center overflow-hidden bg-transparent p-3 focus-visible:outline-offset-4 ${frameClass}`}>
          {visual}
        </button>
      ) : (
        <div className={`flex w-full items-center justify-center overflow-hidden bg-transparent p-3 ${frameClass}`}>
          {visual}
        </div>
      )}
      {showLabel && <figcaption className="mt-2 text-center font-display text-base text-ink-soft">{diagram.title}</figcaption>}
    </figure>
  );
}

function UsersDiagram() {
  const asset = getImage("exploration/users");
  return (
    <figure role="img" aria-label="User groups: children, elderly people, adults, students, athletes, gardeners and cultural communities" className="mx-auto grid w-full max-w-[440px] gap-2">
      <span className="relative block aspect-[2.63/1] overflow-hidden" aria-hidden="true">
        <Image src={asset.src} width={asset.width} height={asset.height} alt="" unoptimized sizes="(min-width: 1024px) 760px, 165vw" className="absolute left-0 top-0 h-auto w-[174%] max-w-none" />
      </span>
      <span className="relative mx-auto block aspect-[2/1] w-[76%] overflow-hidden" aria-hidden="true">
        <Image src={asset.src} width={asset.width} height={asset.height} alt="" unoptimized sizes="(min-width: 1024px) 760px, 165vw" className="absolute -left-[130%] top-0 h-auto w-[229%] max-w-none" />
      </span>
    </figure>
  );
}

function ExplorationStory({ slides, onOpen, number, title, subtitle, titleId }: { slides: Slide[]; onOpen: (image: SiteImage) => void; number: string; title: string; subtitle: string; titleId: string }) {
  return (
    <CommonGroundScrollStory progressPlacement="left" heading={
      <div>
        <SectionLabel>{number}</SectionLabel>
        <h3 id={titleId} className="mt-4 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-tight text-ink">{title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">{subtitle}</p>
      </div>
    }>
      {slides.map((slide, index) => (
        <article key={slide.title} data-cg-story-panel className="cg-scroll-panel grid items-center gap-8 border-t border-sage-300/60 py-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:border-0 lg:py-0">
          <div className="max-w-xl">
            <p className="t-label text-sage-700">0{index + 1} / 0{slides.length}</p>
            <h4 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.6rem)] font-light leading-tight text-ink">{slide.title}</h4>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{slide.text}</p>
          </div>
          {slide.title === "Users" ? (
            <UsersDiagram />
          ) : slide.layout === "stacked" ? (
            <div className="grid gap-4">
              <DiagramVisual diagram={slide.diagrams[0]} onOpen={onOpen} frameClass="h-[230px] lg:h-[min(31svh,270px)]" showLabel />
              <DiagramVisual diagram={slide.diagrams[1]} onOpen={onOpen} frameClass="h-[110px] lg:h-[min(13svh,110px)]" showLabel />
            </div>
          ) : slide.layout === "pair" ? (
            <div className="grid grid-cols-2 gap-4">
              {slide.diagrams.map((diagram) => <DiagramVisual key={diagram.key} diagram={diagram} onOpen={onOpen} frameClass="h-[230px] sm:h-[300px] lg:h-[min(40svh,350px)]" showLabel />)}
            </div>
          ) : (
            <DiagramVisual diagram={slide.diagrams[0]} onOpen={onOpen} interactive={slide.title === "Sensory intentions"} frameClass={slide.title === "Light and access" ? "h-[340px] sm:h-[460px] lg:h-[min(55svh,460px)]" : "h-[270px] sm:h-[420px] lg:h-[min(45svh,390px)]"} />
          )}
        </article>
      ))}
    </CommonGroundScrollStory>
  );
}

export function CommonGroundExploration() {
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return (
    <section id="cg-exploration" aria-labelledby="cg-exploration-title" className="scroll-mt-28 bg-white py-12 md:py-16">
      <div className="shell">
        <div data-cg-heading>
          <SectionLabel>Exploration</SectionLabel>
          <h2 id="cg-exploration-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">From encounter to programme</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">Three connected studies shape the proposal: sociable spaces, sensory experience, and the relationships between hybrid rooms. Scroll through each sequence to follow the design process.</p>
        </div>

        <section id="cg-hybrid-spaces" aria-labelledby="cg-hybrid-spaces-title" className="mt-16 scroll-mt-28 md:mt-24">
          <ExplorationStory slides={sociable} onOpen={setViewer} number="01 / 03" title="Hybrid / sociable spaces" titleId="cg-hybrid-spaces-title" subtitle="People, lived experience and shared activities shape the community centre's social life." />
        </section>

        <section id="cg-biophilia" aria-labelledby="cg-biophilia-title" className="mt-20 scroll-mt-28 md:mt-28">
          <ExplorationStory slides={biophilia} onOpen={setViewer} number="02 / 03" title="Biophilia and phenomenology" titleId="cg-biophilia-title" subtitle="Nature, daylight and sensory experience inform how each space feels as well as how it functions." />
        </section>

        <section id="cg-hybridity" aria-labelledby="cg-hybridity-title" className="mt-20 scroll-mt-28 md:mt-28">
          <ExplorationStory slides={hybridity} onOpen={setViewer} number="03 / 03" title="Hybridity / proximity" titleId="cg-hybridity-title" subtitle="Shared space and close relationships between rooms become two ways to connect the programme." />
        </section>
      </div>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
