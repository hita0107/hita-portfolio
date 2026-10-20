"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Picture } from "@/components/Picture";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { education, experience, profile, type TimelineItem } from "@/content/portfolio";

function Row({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  const expandable = Boolean(item.detail);
  const head = (
    <>
      <span className="min-w-0">
        <span className="block text-[17px] leading-snug text-ink">{item.title}</span>
        <span className="mt-1 block text-[13px] text-ink-soft">
          {item.org}, {item.place}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-[12px] text-ink-soft">{item.years}</span>
        {expandable && (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={`text-sage-500 transition-transform duration-500 ease-[var(--ease-expo)] ${open ? "rotate-45" : ""}`}>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        )}
      </span>
    </>
  );
  return (
    <li className="border-b editorial-line">
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-sage-700"
        >
          {head}
        </button>
      ) : (
        <div className="flex items-start justify-between gap-6 py-5">{head}</div>
      )}
      {expandable && (
        <div id={panel} className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="pb-6 pr-10">
              {item.detail && <p className="t-body">{item.detail}</p>}
            </div>
          </div>
        </div>
      )}
      {item.links && (
        <ul className="-mt-2 flex flex-wrap gap-2 pb-5">
          {item.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="editorial-link inline-flex items-center gap-2 pb-1 text-[12px] text-ink">
                {l.label}
                <svg width="12" height="9" viewBox="0 0 14 10" aria-hidden>
                  <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white pb-24 pt-32 md:pb-36 md:pt-40">
      <div className="shell">
        <SectionReveal className="border-b editorial-line pb-16 md:pb-20">
          <div className="flex flex-wrap items-end gap-6 sm:gap-10">
            <Picture id="portrait" alt="Portrait of Hita Shah" sizes="246px" className="block h-auto w-full max-w-[246px] grayscale" />
            <div className="pb-1">
              <h1 id="about-title" className="font-display font-normal text-[clamp(2.7rem,4vw,3.7rem)] leading-[.9] tracking-[-.045em]">
                Hita Shah
              </h1>
              <p className="mt-4 text-[clamp(1rem,1.6vw,1.35rem)] text-ink-soft">{profile.role}</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-16 grid gap-x-12 gap-y-14 md:mt-24 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="mb-6 text-[11px] uppercase tracking-[.2em] text-ink-soft">01 / Profile</h2>
            {profile.about.map((p, i) => (
              <p key={p.slice(0, 24)} className={`max-w-xl text-[15px] leading-[1.75] text-ink-soft ${i === 0 ? "" : "mt-5"}`}>
                {p}
              </p>
            ))}
            <a href="#contact" className="editorial-link mt-8 inline-block pb-1 text-[12px] uppercase tracking-[.15em]">Contact me ↗</a>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-6 text-[11px] uppercase tracking-[.2em] text-ink-soft">02 / Education</h2>
            <ul className="border-t editorial-line">
              {education.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-6 text-[11px] uppercase tracking-[.2em] text-ink-soft">03 / Experience</h2>
            <ul className="border-t editorial-line">
              {experience.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </ul>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
