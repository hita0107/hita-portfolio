"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { projects, type Project } from "@/content/portfolio";

type Props = {
  project: Project;
  hero: React.ReactNode;
};

export function Opener({ project, hero }: Props) {
  const root = useRef<HTMLElement>(null);
  const sheetNo = project.number.padStart(2, "0");

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-numeral]", { yPercent: 40, opacity: 0, duration: 1.6, ease: "expo.out", delay: 0.05 });
        gsap.from("[data-sheet] > *", { opacity: 0, y: 12, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.45 });
        gsap.fromTo(
          "[data-hero]",
          { clipPath: "inset(18% 8% 0% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top 95%", end: "top 25%", scrub: 0.6 } },
        );
        gsap.fromTo("[data-hero-inner]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper pt-28 md:pt-36">
      <div className="shell grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="t-label text-sage-700">{project.stage}</p>
          <div className="mt-5 flex items-start gap-[0.06em] text-[clamp(3.3rem,8.4vw,8.2rem)]">
            <span data-numeral aria-hidden className="t-display shrink-0 font-extralight text-sage-300">
              {project.number}
            </span>
            <SplitReveal as="h1" onScroll={false} delay={0.15} className="t-display text-ink">
              {project.title}
            </SplitReveal>
          </div>
          <div>
            <SplitReveal as="p" onScroll={false} delay={0.35} className="mt-6 max-w-2xl font-display text-[clamp(1.25rem,2vw,1.9rem)] font-light leading-snug text-sage-700">
              {project.subtitle}
            </SplitReveal>
          </div>
        </div>
        <dl data-sheet className="self-end border border-sage-300 text-[14px] md:col-span-4">
          {project.sheet.map((row) => (
            <div key={row.label} className="grid grid-cols-[7.5rem_1fr] border-b border-sage-300/70">
              <dt className="t-label border-r border-sage-300/70 px-3 py-2.5 text-sage-700">{row.label}</dt>
              <dd className="px-3 py-2.5 text-ink">{row.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[7.5rem_1fr] bg-sage-100/70">
            <dt className="t-label border-r border-sage-300/70 px-3 py-2.5 text-sage-700">Sheet</dt>
            <dd className="flex justify-between px-3 py-2.5 font-mono text-[12px] text-ink">
              <span>
                {sheetNo} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="text-sage-700">Hita Shah</span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="shell mt-16 md:mt-24">
        <div data-hero className="overflow-hidden">
          <div data-hero-inner className="origin-center">
            {hero}
          </div>
        </div>
      </div>
    </section>
  );
}
