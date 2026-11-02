"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/SiteImage";
import { Picture } from "@/components/Picture";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { WorksWall } from "@/components/home/WorksWall";
import { projects, type Project } from "@/content/portfolio";

const ordered = projects;
type View = "gallery" | "list" | "grid";

function Cover({ project, className }: { project: Project; className: string }) {
  return project.indexSrc ? (
    <Image src={project.indexSrc} alt="" fill unoptimized sizes="(min-width: 1024px) 50vw, 100vw" className={className} />
  ) : (
    <Picture id={project.indexImage} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className={className} />
  );
}

function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <li className={`md:w-[68%] md:odd:ml-auto ${className}`}>
      <SectionReveal>
      <Link href={`/work/${project.slug}/`} className="group block focus-visible:outline-offset-4">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Cover project={project} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transition-none" />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          <span className="absolute bottom-5 right-5 translate-y-3 text-[12px] uppercase tracking-[.14em] text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">View project ↗</span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-6 text-[12px] leading-snug md:min-h-[68px] md:text-[13px]">
          <div><span className="block">{project.title}</span><span className="mt-0.5 block text-ink-soft">{project.subtitle}</span></div>
          <span className="shrink-0 text-ink-soft">{project.years}</span>
        </div>
      </Link>
      </SectionReveal>
    </li>
  );
}

export function WorksIndex() {
  const [view, setView] = useState<View>("gallery");
  const [gridPage, setGridPage] = useState(0);
  const gridPages = Math.ceil(ordered.length / 4);
  const changeGridPage = (page: number) => {
    setGridPage(page);
    window.requestAnimationFrame(() => document.getElementById("project-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <section id="work" aria-labelledby="work-title" className={`min-h-screen bg-white pb-28 ${view === "gallery" ? "pt-32 md:pt-36" : "pt-32 md:pt-40"}`}>
      <div className="shell">
        {view === "gallery" ? (
          <div className="text-[11px] uppercase tracking-[.16em] text-ink-soft">
            <h1 id="work-title" className="font-sans text-[11px] font-normal">Projects</h1>
          </div>
        ) : <SectionReveal className="grid gap-6 border-b editorial-line pb-10 md:grid-cols-[1fr_1fr] md:gap-14 md:pb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[.2em] text-ink-soft">Portfolio / 2022–2026</p>
            <h1 id="work-title" className="mt-5 font-display text-[clamp(4.5rem,9vw,10rem)] leading-[.78] tracking-[-.06em]">Projects</h1>
          </div>
          <p className="max-w-xl self-end text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-ink-soft">
            A curated selection of my architectural and design work, from studio projects at the University of Dundee to commercial work developed during my placement at Design Concepts in Dubai.
          </p>
        </SectionReveal>}

        <div className="mb-8 mt-5 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[.16em] text-ink-soft md:mb-10">
          <span>{String(ordered.length).padStart(2, "0")} projects</span>
          <div className="flex items-center gap-1" role="group" aria-label="Project view">
              {(["gallery", "list", "grid"] as const).map((option) => (
                <button key={option} type="button" aria-pressed={view === option} onClick={() => { setView(option); window.scrollTo({ top: 0, behavior: "instant" }); }} className={`min-h-9 px-3 py-2 transition-colors hover:text-ink ${view === option ? "bg-ink text-white hover:text-white" : ""}`}>
                  {option}
                </button>
              ))}
          </div>
        </div>

        {view === "gallery" ? <WorksWall projects={ordered} /> : view === "list" ? (
          <ol className="border-t editorial-line">
            {ordered.map((project, index) => (
              <li key={project.slug} className="border-b editorial-line">
                <SectionReveal>
                <Link href={`/work/${project.slug}/`} className="group relative grid items-center gap-4 py-5 transition-[background-color,padding] duration-500 hover:bg-cream hover:px-4 focus-visible:bg-cream focus-visible:px-4 md:grid-cols-[4rem_1fr_9rem_2rem] md:py-7">
                  <span className="text-[12px] text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
                  <span className="block">
                    <span className="block font-display text-[clamp(2rem,3.3vw,4.25rem)] leading-[.92] tracking-[-.04em]">{project.title}</span>
                    <span className="mt-2 block text-[11px] uppercase tracking-[.1em] text-ink-soft md:text-[12px]">{project.location}</span>
                  </span>
                  <span className="text-[12px] text-ink-soft">{project.years}</span>
                  <span aria-hidden className="text-xl transition-transform duration-500 group-hover:translate-x-2">↗</span>
                  <span className="pointer-events-none absolute right-[17%] z-20 hidden h-44 w-64 overflow-hidden opacity-0 shadow-2xl transition-[opacity,transform] duration-500 group-hover:-translate-y-2 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
                    <span className="relative block h-full w-full"><Cover project={project} className="absolute inset-0 h-full w-full object-cover" /></span>
                  </span>
                </Link>
                </SectionReveal>
              </li>
            ))}
          </ol>
          ) : (
          <>
            <ol id="project-grid" key={gridPage} className="grid scroll-mt-32 gap-x-4 gap-y-12 md:grid-cols-2 md:gap-x-20 md:gap-y-0">
              {ordered.map((project, index) => <ProjectCard key={project.slug} project={project} className={index < gridPage * 4 || index >= (gridPage + 1) * 4 ? "hidden md:block" : ""} />)}
            </ol>
            <nav aria-label="Grid pages" className="mt-12 flex items-center justify-center gap-5 md:hidden">
              <button type="button" onClick={() => changeGridPage(Math.max(0, gridPage - 1))} disabled={gridPage === 0} className="min-h-11 min-w-11 disabled:opacity-30" aria-label="Previous projects">←</button>
              <span className="font-mono text-[11px] text-ink-soft">{String(gridPage + 1).padStart(2, "0")} / {String(gridPages).padStart(2, "0")}</span>
              <button type="button" onClick={() => changeGridPage(Math.min(gridPages - 1, gridPage + 1))} disabled={gridPage === gridPages - 1} className="min-h-11 min-w-11 disabled:opacity-30" aria-label="Next projects">→</button>
            </nav>
          </>
          )}
      </div>
    </section>
  );
}
