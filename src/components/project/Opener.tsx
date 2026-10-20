"use client";

import { useRef } from "react";
import Image from "@/components/SiteImage";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Picture } from "@/components/Picture";
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

function Cover({ project }: { project: Project }) {
  if (project.coverSrc) {
    return <Image src={project.coverSrc} alt={`${project.title} architectural drawing`} fill unoptimized priority sizes="100vw" className="editorial-image h-full w-full object-cover" />;
  }
  return <Picture id={project.cover} alt={`${project.title} architectural visual`} sizes="100vw" priority className="editorial-image absolute inset-0 h-full w-full object-cover" />;
}

export function Opener({ project, hero, introduction, sideImage }: Props) {
  const root = useRef<HTMLElement>(null);
  const sheetNo = project.number.padStart(2, "0");
  const paragraphs = introduction ?? [project.paragraphs[0]];

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to("[data-project-cover]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: "[data-project-hero]", start: "top top", end: "bottom top", scrub: true },
        });
        if (hero && project.slug !== "verdant-theatre" && project.slug !== "elysian-arcadia") {
          gsap.fromTo("[data-secondary-hero]", { clipPath: "inset(12% 5% 12% 5%)" }, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-secondary-hero]", start: "top 90%", end: "top 30%", scrub: .5 },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-white">
      <div data-project-hero className="relative flex min-h-[80svh] overflow-hidden bg-ink text-white md:min-h-[100svh]">
        <div data-project-cover className="absolute inset-0 -top-[10%] h-[110%] w-full"><Cover project={project} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/15" />
        <div className="shell relative flex flex-1 flex-col justify-end pb-10 pt-36 md:pb-14">
          <p className="editorial-rise text-[11px] uppercase tracking-[.2em] text-white/85">Project {sheetNo} / {String(projects.length).padStart(2, "0")} &nbsp; · &nbsp; {project.stage}</p>
          <h1 className="editorial-rise mt-5 max-w-[1250px] font-display text-[clamp(5rem,12vw,15rem)] leading-[.74] tracking-[-.065em]" style={{ animationDelay: "110ms" }}>{project.title}</h1>
          <div className="editorial-rise mt-8 flex flex-wrap items-end justify-between gap-6" style={{ animationDelay: "220ms" }}>
            <p className="max-w-xl text-[13px] leading-[1.5] text-white/85 md:text-[15px]">{project.subtitle}</p>
            <p className="text-[11px] uppercase tracking-[.2em] text-white/75">Scroll to explore ↓</p>
          </div>
        </div>
      </div>

      <div className="shell grid gap-12 py-20 md:grid-cols-[minmax(0,1.35fr)_minmax(0,.65fr)] md:gap-20 md:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[.2em] text-ink-soft">The project / {sheetNo}</p>
          <h2 className="mt-7 max-w-[900px] font-display text-[clamp(2.8rem,5.2vw,6rem)] leading-[.94] tracking-[-.045em]">{project.subtitle}</h2>
          <div className="mt-10 max-w-[760px] space-y-5 border-t editorial-line pt-7 text-[15px] leading-[1.75] text-ink-soft">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-4 text-[11px] uppercase tracking-[.2em] text-ink-soft">Project information</p>
          <dl className="border-t editorial-line">
            {project.sheet.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b editorial-line py-3.5 text-[13px] leading-snug">
                <dt className="text-ink-soft">{row.label}</dt><dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          {sideImage && <div className="mt-9">{sideImage}</div>}
        </div>
      </div>

      {hero && project.slug !== "verdant-theatre" && project.slug !== "elysian-arcadia" && (
        <div className="shell pb-20 md:pb-28">
          <div data-secondary-hero className="overflow-hidden">{hero}</div>
        </div>
      )}
    </section>
  );
}
