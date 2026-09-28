"use client";

import { createContext, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/SectionLabel";

export type Beat = { text: string; visual: React.ReactNode };

/**
 * Tells a visual whether it is showing. Inside the sticky stage a visual is mounted
 * (and invisible) long before its beat arrives, so position-based triggers would
 * fire too early; "inline" means the visual sits in normal flow (phones).
 */
export const BeatContext = createContext<"inline" | boolean>("inline");

type Props = {
  label: string;
  beats: Beat[];
  side?: "left" | "right";
};

export function Story({ label, beats, side = "right" }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-beat]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: root },
  );

  const textCol = side === "right" ? "md:col-span-5" : "md:col-span-5 md:col-start-8";
  const stageCol = side === "right" ? "md:col-span-7" : "md:col-span-7 md:col-start-1 md:row-start-1";

  return (
    <section ref={root} className="bg-paper py-20 md:py-10">
      <div className="shell">
        <div className="md:hidden">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="grid md:grid-cols-12 md:gap-x-12">
          <div className={textCol}>
            {beats.map((b, i) => (
              <div key={i} data-beat className="py-12 md:flex md:min-h-[92vh] md:flex-col md:justify-center md:py-0">
                <div className="mb-8 md:hidden">
                  <BeatContext.Provider value="inline">{b.visual}</BeatContext.Provider>
                </div>
                {i === 0 && (
                  <div className="mb-10 hidden md:block">
                    <SectionLabel>{label}</SectionLabel>
                  </div>
                )}
                <p className="t-label text-sage-700">
                  {String(i + 1).padStart(2, "0")} <span className="text-sage-300">/ {String(beats.length).padStart(2, "0")}</span>
                </p>
                <p
                  className={`mt-5 text-[1.08rem] leading-[1.8] text-ink-soft transition-opacity duration-700 md:text-[1.16rem] motion-reduce:transition-none ${
                    active === i ? "md:opacity-100" : "md:opacity-25"
                  }`}
                >
                  {b.text}
                </p>
              </div>
            ))}
          </div>
          <div className={`hidden md:block ${stageCol}`}>
            <div className="sticky top-0 flex h-screen items-center pt-14">
              <div className="grid w-full items-center">
                {beats.map((b, i) => (
                  <div
                    key={i}
                    aria-hidden={active !== i}
                    className={`[grid-area:1/1] transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)] motion-reduce:transition-none ${
                      active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <BeatContext.Provider value={active === i}>{b.visual}</BeatContext.Provider>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
