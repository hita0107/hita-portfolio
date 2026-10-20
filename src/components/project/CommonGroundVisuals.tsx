"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { commonGroundAnatomy } from "@/content/buildups";
import { CommonGroundImage } from "./CommonGroundPlate";
import { CommonGroundSiteAnalysis } from "./CommonGroundSiteAnalysis";
import { BuildUpDiagram } from "./BuildUpDiagram";

export const CommonGroundSite = CommonGroundSiteAnalysis;

const details = [
  { step: "clt-wall", title: "CLT external wall", x: 11.9, y: 64 },
  { step: "ground", title: "Ground floor", x: 44.8, y: 83.2 },
  { step: "sprung", title: "Sprung floor", x: 63.9, y: 85.1 },
  { step: "green-roof", title: "Green roof", x: 80.3, y: 33.7 },
] as const;

export function CommonGroundConstruction() {
  const [active, setActive] = useState(1);
  const selected = details[active];
  const buildUp = commonGroundAnatomy.find((step) => step.id === selected.step)?.buildUps[0];

  return (
    <section id="cg-construction" aria-labelledby="cg-construction-title" className="scroll-mt-28 bg-white pb-6 pt-12 md:pb-8 md:pt-16">
      <div className="shell">
        <div data-cg-heading>
          <SectionLabel>Long section + construction details</SectionLabel>
          <h2 id="cg-construction-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">Long section</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            The section traces the hall, courtyard, library and landscape. Select a square to examine its construction detail and material layers.
          </p>
        </div>

        <div data-cg-media className="relative mt-10 w-full">
          <CommonGroundImage
            id="long-section"
            alt="Long section through Common Ground, showing the hall, courtyard, library and landscape with four construction detail locations."
            sizes="(min-width: 1280px) 1200px, 94vw"
            className="block h-auto w-full"
          />
          {details.map((detail, index) => (
            <button
              key={detail.step}
              type="button"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-label={`Show ${detail.title} construction detail`}
              aria-pressed={active === index}
              aria-controls="cg-construction-detail"
              style={{ left: `${detail.x}%`, top: `${detail.y}%` }}
              className={`absolute grid aspect-square w-[3.2%] min-w-6 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${active === index ? "z-10 scale-110 border-sage-700 bg-sage-100/65 text-ink" : "border-sage-700/70 bg-white/35 text-sage-700 hover:scale-110 hover:bg-sage-100/65"}`}
            >
              <span className="font-mono text-[clamp(9px,1vw,13px)] leading-none">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div id="cg-construction-detail" aria-live="polite" className="mt-10 border-t border-sage-300/70 pt-7 md:mt-14">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-sage-700">{String(active + 1).padStart(2, "0")} / 04</span>
              <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.3rem)] font-light text-ink">{selected.title}</h3>
            </div>
            <span className="t-label text-sage-700">Construction detail</span>
          </div>
          <div className="mx-auto max-w-3xl">
            {buildUp && <BuildUpDiagram key={buildUp.id} data={buildUp} active tone="light" height={260} />}
          </div>
        </div>
      </div>
    </section>
  );
}
