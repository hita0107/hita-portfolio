"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/SiteImage";
import { Picture } from "@/components/Picture";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { projects, type Project } from "@/content/portfolio";

const sorted = [...projects].sort((a, b) => Number(b.years.slice(0, 4)) - Number(a.years.slice(0, 4)));
type View = "gallery" | "list" | "grid";

const galleryLayout = [
  { place: "w-[94%] sm:col-span-7 sm:col-start-1 sm:mt-5", shape: "aspect-[5/4]", tilt: "sm:-rotate-[1.2deg]" },
  { place: "ml-auto w-[78%] sm:col-span-4 sm:col-start-9 sm:mt-32 sm:w-auto", shape: "aspect-[3/4]", tilt: "sm:rotate-[1.5deg]" },
  { place: "ml-[5%] w-[78%] sm:col-span-4 sm:col-start-2 sm:mt-3 sm:w-auto", shape: "aspect-square", tilt: "sm:rotate-[1deg]" },
  { place: "ml-auto w-[92%] sm:col-span-6 sm:col-start-7 sm:mt-28 sm:w-auto", shape: "aspect-[6/4]", tilt: "sm:-rotate-[.8deg]" },
  { place: "w-[90%] sm:col-span-6 sm:col-start-1 sm:mt-10 sm:w-auto", shape: "aspect-[4/3]", tilt: "sm:rotate-[.7deg]" },
  { place: "ml-auto w-[76%] sm:col-span-4 sm:col-start-9 sm:mt-36 sm:w-auto", shape: "aspect-[4/5]", tilt: "sm:-rotate-[1.4deg]" },
  { place: "ml-[4%] w-[87%] sm:col-span-5 sm:col-start-2 sm:mt-8 sm:w-auto", shape: "aspect-[5/4]", tilt: "sm:-rotate-[.7deg]" },
  { place: "ml-auto w-[82%] sm:col-span-5 sm:col-start-8 sm:mt-24 sm:w-auto", shape: "aspect-[4/3]", tilt: "sm:rotate-[1.1deg]" },
] as const;

function Cover({ project, className }: { project: Project; className: string }) {
  return project.indexSrc ? (
    <Image src={project.indexSrc} alt="" fill unoptimized sizes="(min-width: 1024px) 50vw, 100vw" className={className} />
  ) : (
    <Picture id={project.indexImage} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className={className} />
  );
}

function ProjectCard({ project, index, gallery = false }: { project: Project; index: number; gallery?: boolean }) {
  const wall = gallery ? galleryLayout[index % galleryLayout.length] : null;
  return (
    <li className={wall?.place ?? ""}>
      <SectionReveal>
      <Link href={`/work/${project.slug}/`} className={`group block transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0 hover:scale-[1.025] focus-visible:rotate-0 focus-visible:scale-[1.025] focus-visible:outline-offset-4 motion-reduce:transition-none ${wall?.tilt ?? ""}`}>
        <div className={`relative overflow-hidden bg-cream ${wall?.shape ?? "aspect-[4/3]"}`}>
          <Cover project={project} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transition-none" />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          <span className="absolute bottom-5 right-5 translate-y-3 text-[12px] uppercase tracking-[.14em] text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">View project ↗</span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-6 text-[12px] leading-snug md:text-[13px]">
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

  return (
    <section id="work" aria-labelledby="work-title" className="min-h-screen bg-white pb-28 pt-32 md:pt-40">
      <div className="shell">
        <SectionReveal className="grid gap-6 border-b editorial-line pb-10 md:grid-cols-[1fr_1fr] md:gap-14 md:pb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[.2em] text-ink-soft">Portfolio / 2022–2026</p>
            <h1 id="work-title" className="mt-5 font-display text-[clamp(4.5rem,9vw,10rem)] leading-[.78] tracking-[-.06em]">Projects</h1>
          </div>
          <p className="max-w-xl self-end text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-ink-soft">
            A curated selection of my architectural and design work, from studio projects at the University of Dundee to commercial work developed during my placement at Design Concepts in Dubai.
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="mb-10 mt-5 flex items-center justify-between text-[11px] uppercase tracking-[.16em] text-ink-soft">
            <span>{String(sorted.length).padStart(2, "0")} projects</span>
            <div className="flex items-center gap-1" role="group" aria-label="Project view">
              {(["gallery", "list", "grid"] as const).map((option) => (
                <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)} className={`min-h-9 px-3 py-2 transition-colors hover:text-ink ${view === option ? "bg-ink text-white hover:text-white" : ""}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

          {view === "list" ? (
          <ol className="border-t editorial-line">
            {sorted.map((project, index) => (
              <li key={project.slug} className="border-b editorial-line">
                <SectionReveal>
                <Link href={`/work/${project.slug}/`} className="group relative grid items-center gap-4 py-5 transition-[background-color,padding] duration-500 hover:bg-cream hover:px-4 focus-visible:bg-cream focus-visible:px-4 md:grid-cols-[4rem_1fr_9rem_2rem] md:py-7">
                  <span className="text-[12px] text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(2.5rem,5vw,6rem)] leading-[.86] tracking-[-.05em]">{project.title}</span>
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
          <ol className={`grid ${view === "gallery" ? "grid-cols-1 gap-y-14 sm:grid-cols-12 sm:gap-x-6 sm:gap-y-24 lg:gap-y-32" : "gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-20"}`}>
            {sorted.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} gallery={view === "gallery"} />)}
          </ol>
          )}
      </div>
    </section>
  );
}
