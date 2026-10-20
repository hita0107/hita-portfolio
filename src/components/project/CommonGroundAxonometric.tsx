"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { CommonGroundScrollStory } from "./CommonGroundScrollStory";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";

const layers = [
  {
    title: "Roof",
    material: "Green roof",
    description: "Planted roof surfaces extend the landscape across the building, supporting biodiversity and helping to moderate rainwater and heat.",
    image: "/common-ground/exploded-axon/roof.png",
    width: 5314,
    height: 3671,
  },
  {
    title: "External walls",
    material: "CLT + glazing",
    description: "CLT forms the enclosing walls. Glazing acts as a transparent barrier, holding the rooms while keeping visual connections to the gardens and shared spaces.",
    image: "/common-ground/exploded-axon/walls.png",
    width: 5314,
    height: 3483,
  },
  {
    title: "Structure",
    material: "Glulam",
    description: "A glulam frame gives open spaces the additional structural support needed to carry the roof without dividing their flexible floor areas.",
    image: "/common-ground/exploded-axon/structure.png",
    width: 5314,
    height: 3294,
  },
  {
    title: "Floor plans",
    material: "Rooms + thresholds",
    description: "The plan resolves the layers into rooms, gardens and thresholds. Follow the outward connections to see how the interior spaces meet the landscape.",
    image: "/common-ground/submission/final-outcome/layout-of-rooms.webp",
    width: 2600,
    height: 1840,
  },
] as const;

export function CommonGroundAxonometric() {
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return (
    <section id="cg-axonometric" aria-labelledby="cg-axo-title" className="scroll-mt-28 bg-white pb-16 pt-6 md:pb-24 md:pt-8">
      <div className="shell">
        <CommonGroundScrollStory progressPlacement="left" heading={
          <div>
            <SectionLabel>Exploded axonometric</SectionLabel>
            <h2 id="cg-axo-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">From roof to rooms</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">Scroll through the four layers, from the planted roof to the rooms and thresholds below.</p>
          </div>
        }>
          {layers.map((layer, index) => (
            <article key={layer.title} data-cg-story-panel className="cg-scroll-panel grid items-center gap-8 border-t border-sage-300/60 py-10 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-14 lg:border-0 lg:py-0">
              <div className="max-w-md">
                <p className="t-label text-sage-700">Layer 0{index + 1} / 04</p>
                <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.7rem)] font-light leading-tight text-ink">{layer.title}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[.13em] text-sage-700">{layer.material}</p>
                <p className="mt-6 text-base leading-relaxed text-ink-soft">{layer.description}</p>
              </div>
              <div className="min-w-0">
                <button type="button" onClick={() => setViewer({ src: layer.image, title: layer.title, alt: `${layer.title} layer of the Common Ground exploded axonometric` })} aria-label={`Enlarge ${layer.title} axonometric drawing`} className="flex h-[320px] w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:outline-offset-4 sm:h-[400px] lg:h-[min(47svh,440px)]">
                  <Image src={layer.image} width={layer.width} height={layer.height} alt={`${layer.title} layer of the Common Ground exploded axonometric`} unoptimized sizes="(min-width: 1024px) 58vw, 92vw" className="h-full w-full object-contain" />
                </button>
              </div>
            </article>
          ))}
        </CommonGroundScrollStory>
      </div>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
