"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import images from "@/content/commonGroundSubmission.json";

type ImageKey = keyof typeof images;
const drawings: { key: ImageKey; title: string; description: string }[] = [
  { key: "final-outcome/mat-plan", title: "Mat plan", description: "A courtyard-based arrangement lets the programme grow as a connected field of rooms and gardens." },
  { key: "final-outcome/suburban-plan", title: "Suburban plan", description: "The same spatial framework adapts to a different suburban setting." },
];
export function CommonGroundFinal() {
  return (
    <section id="cg-floor-plans" aria-labelledby="cg-final-title" className="scroll-mt-28 bg-white py-16 md:py-24">
      <div className="shell">
        <div data-cg-heading>
          <SectionLabel>Floor plans</SectionLabel>
          <h2 id="cg-final-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">A framework for everyday life</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">The proposal brings adaptable rooms around a shared courtyard. Glulam timber, planted roofs and a greenhouse help the building and landscape work as one system.</p>
        </div>
        <div data-cg-gallery className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {drawings.map((drawing) => {
            const asset = images[drawing.key];
            return <figure key={drawing.key} data-cg-card className="min-w-0">
              <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${drawing.title} in full resolution`} className="group flex h-[360px] items-center justify-center overflow-hidden bg-sage-50/30 p-3 md:h-[490px]">
                <Image src={asset.src} width={asset.width} height={asset.height} alt={`${drawing.title} for Common Ground`} unoptimized sizes="(min-width: 768px) 46vw, 92vw" className="max-h-[620px] h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              </a>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-sage-300/60 pt-3">
                <span className="font-display text-lg text-ink">{drawing.title}</span><span className="max-w-sm text-sm leading-relaxed text-ink-soft">{drawing.description}</span>
              </figcaption>
            </figure>;
          })}
        </div>
      </div>
    </section>
  );
}
