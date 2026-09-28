"use client";

import Link from "next/link";
import { useState } from "react";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/portfolio";

const SHADES = ["#758965", "#6c7f5d", "#627556", "#596b4e", "#4f6046"];

export function WorksIndex() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" aria-labelledby="work-title" className="bg-paper pb-28 pt-8 md:pb-40">
      <div className="shell">
        <div className="grid items-end gap-8 border-t border-sage-300/60 pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>Selected Works</SectionLabel>
            <h2 id="work-title" className="t-display mt-8 text-[clamp(3.2rem,9vw,8.5rem)] text-ink">
              Selected Works
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-sm text-sage-700">2022-26</p>
            <p className="t-body mt-3">
              Four studio projects from the University of Dundee, and tender and design work from a placement at Design Concepts in Dubai.
            </p>
          </div>
        </div>

        <ul className="mt-14 hidden h-[clamp(440px,70vh,660px)] gap-2.5 md:flex">
          {projects.map((p, i) => {
            const open = active === i;
            return (
              <li
                key={p.slug}
                className="relative min-w-0 transition-[flex-grow] duration-[900ms] ease-[var(--ease-expo)]"
                style={{ flexGrow: open ? 3.6 : 1, flexBasis: 0 }}
              >
                <Link
                  href={`/work/${p.slug}/`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block h-full overflow-hidden text-paper"
                  style={{ backgroundColor: SHADES[i] }}
                >
                  <span className={`absolute inset-0 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
                    <Picture id={p.indexImage} sizes="50vw" alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  </span>
                  <span className="t-label absolute left-5 top-5">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`absolute bottom-6 left-5 font-display text-[clamp(1.7rem,2.6vw,2.6rem)] font-light leading-none transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 ${open ? "opacity-0" : "opacity-100"}`}
                  >
                    {p.title}
                  </span>
                  <span
                    className={`absolute inset-x-6 bottom-6 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] ${open ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"}`}
                  >
                    <span className="t-label block text-sage-100">{p.stage}</span>
                    <span className="mt-2 block font-display text-[clamp(2rem,3.2vw,3.4rem)] font-light leading-none">{p.title}</span>
                    <span className="mt-3 block max-w-md text-[15px] leading-snug text-sage-50/90">{p.subtitle}</span>
                    <span className="t-label mt-5 inline-flex items-center gap-2 border-b border-sage-100/60 pb-1">
                      Open project
                      <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
                        <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="mt-12 space-y-10 md:hidden">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}/`} className="block">
                <span className="block aspect-[4/3] overflow-hidden" style={{ backgroundColor: SHADES[i] }}>
                  <Picture id={p.indexImage} sizes="92vw" alt="" className="h-full w-full object-cover" />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-3xl font-light text-ink">
                    <span className="mr-3 font-mono text-sm text-sage-700">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </span>
                  <span className="t-label shrink-0 text-sage-700">{p.years}</span>
                </span>
                <span className="t-body mt-2 block">{p.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
