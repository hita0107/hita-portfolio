"use client";

import { useContext, useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { BeatContext } from "./Story";

// Block geometry in PDF points from page 16, origin at the diagram's top-left corner.
const ORIGIN = { x: 409.6, y: 408.7, w: 383, h: 149.7 };

type Block = { label: string; r: [number, number, number, number]; tone: 0 | 1 | 2 | 3; size: number; vertical?: boolean };

const BLOCKS: Block[] = [
  { label: "Rehearsal Space", r: [409.6, 408.7, 460.9, 536.4], tone: 0, size: 14.2, vertical: true },
  { label: "Foyer", r: [463.3, 408.7, 514.6, 536.4], tone: 0, size: 14.2, vertical: true },
  { label: "Bar + Cafe", r: [517.8, 408.7, 598.5, 445.9], tone: 0, size: 10 },
  { label: "Kitchen", r: [600.7, 408.7, 647.1, 445.9], tone: 3, size: 10 },
  { label: "Theatre", r: [517.8, 448.1, 730.2, 536.4], tone: 2, size: 18 },
  { label: "Control Room", r: [734.6, 448.1, 792.6, 481], tone: 3, size: 10 },
  { label: "Staff Office", r: [734.6, 482.2, 792.6, 506.4], tone: 3, size: 10 },
  { label: "Dressing Room", r: [734.6, 507.5, 792.6, 536.4], tone: 3, size: 10 },
  { label: "Recording Studios", r: [409.6, 538.7, 540.3, 558.4], tone: 1, size: 10 },
  { label: "Trap Room + Storage", r: [544.3, 538.7, 730.2, 558.4], tone: 1, size: 10 },
  { label: "Servicing", r: [733.7, 538.7, 792.6, 558.4], tone: 1, size: 10 },
];

const TONES = [
  "bg-sage-100 text-sage-900",
  "bg-sage-300 text-ink",
  "bg-sage-500 text-white",
  "bg-sage-700 text-white",
];

export function ProgrammeDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const beat = useContext(BeatContext);

  useGSAP(
    () => {
      if (beat === false) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-block]", {
          y: (i) => 40 + (i % 3) * 24,
          x: (i) => (i % 2 ? 1 : -1) * (10 + (i % 4) * 6),
          opacity: 0,
          scale: 0.9,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: beat === "inline" ? { trigger: root.current, start: "top 80%", once: true } : undefined,
        });
      });
    },
    { scope: root, dependencies: [beat === false] },
  );

  return (
    <div ref={root} className="[container-type:inline-size]">
      <div
        role="img"
        aria-label="Programme diagram: rehearsal space, foyer, bar and cafe, kitchen, the theatre at the centre, control room, staff office, dressing room, recording studios, trap room and storage, and servicing."
        className="relative w-full"
        style={{ aspectRatio: `${ORIGIN.w} / ${ORIGIN.h}` }}
      >
        {BLOCKS.map((b) => {
          const [x0, y0, x1, y1] = b.r;
          const w = x1 - x0;
          const h = y1 - y0;
          const radius = Math.min(13, Math.min(w, h) * 0.26);
          return (
            <div
              key={b.label}
              data-block
              className={`absolute grid place-items-center px-[0.6cqw] text-center font-display uppercase leading-[1.05] tracking-[0.02em] transition-transform duration-500 hover:-translate-y-0.5 ${TONES[b.tone]}`}
              style={{
                left: `${((x0 - ORIGIN.x) / ORIGIN.w) * 100}%`,
                top: `${((y0 - ORIGIN.y) / ORIGIN.h) * 100}%`,
                width: `${(w / ORIGIN.w) * 100}%`,
                height: `${(h / ORIGIN.h) * 100}%`,
                borderRadius: `${(radius / ORIGIN.w) * 100}cqw`,
                fontSize: `${(b.size / ORIGIN.w) * 100 * 0.92}cqw`,
              }}
            >
              <span className={b.vertical ? "[writing-mode:vertical-rl] rotate-180" : undefined}>{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
