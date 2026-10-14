"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { projects, type Project } from "@/content/portfolio";

type Props = {
  project: Project;
  hero?: React.ReactNode;
  introduction?: string[];
  sideImage?: React.ReactNode;
  alignSheetWithTitle?: boolean;
  white?: boolean;
  compactSubtitle?: boolean;
  progressBar?: boolean;
};

export function Opener({ project, hero, introduction, sideImage, alignSheetWithTitle = false, white = false, compactSubtitle = false, progressBar = false }: Props) {
  const root = useRef<HTMLElement>(null);
  const sheetNo = project.number.padStart(2, "0");

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-sheet] > *", { opacity: 0, y: 12, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.45 });
        if (hero) {
          gsap.fromTo(
            "[data-hero]",
            { clipPath: "inset(18% 8% 0% 8%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top 95%", end: "top 25%", scrub: 0.6 } },
          );
          gsap.fromTo("[data-hero-inner]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top bottom", end: "bottom top", scrub: true } });
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${white ? "bg-white" : "bg-paper"} ${progressBar ? "pt-32 md:pt-40" : "pt-20 md:pt-28"}`}>
      <div className="shell grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="flex items-center gap-3 border-t border-sage-300/60 pt-8 font-mono text-lg uppercase tracking-[0.14em] text-sage-700 sm:text-xl">
            <span aria-hidden className="h-px w-12 shrink-0 bg-sage-500" />
            {project.title}
          </h1>
          <p className="t-label mt-8 text-sage-700">{project.stage}</p>
          {compactSubtitle ? (
            <p className="mt-5 max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-[0.14em] text-sage-700 sm:text-base">
              {project.subtitle}
            </p>
          ) : (
            <SplitReveal as="p" onScroll={false} delay={0.25} className="mt-5 max-w-2xl font-display text-[clamp(1.25rem,2vw,1.9rem)] font-light leading-snug text-sage-700">
              {project.subtitle}
            </SplitReveal>
          )}
          {introduction && (
            <div className="mt-10 max-w-2xl space-y-5 text-[15px] leading-[1.75] text-ink-soft md:text-base">
              {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
        </div>
        <div className={`${alignSheetWithTitle ? "self-start md:mt-8" : "self-end"} md:col-span-4`}>
          <dl data-sheet className="border border-sage-300 text-[14px]">
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
                {project.slug !== "common-ground" && <span className="text-sage-700">Hita Shah</span>}
              </dd>
            </div>
          </dl>
          {sideImage && <div className="mt-6">{sideImage}</div>}
        </div>
      </div>
      {hero && (
        <div className="shell mt-16 md:mt-24">
          <div data-hero className="overflow-hidden">
            <div data-hero-inner className="origin-center">
              {hero}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
