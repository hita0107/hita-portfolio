"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";
import { education, experience, profile, type TimelineItem } from "@/content/portfolio";

function Row({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  const expandable = Boolean(item.detail || item.links);
  const head = (
    <>
      <span className="min-w-0">
        <span className="block font-display text-[1.2rem] font-normal leading-snug text-ink">{item.title}</span>
        <span className="mt-1 block text-[15px] text-ink-soft">
          {item.org}, {item.place}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-mono text-[13px] text-ink">{item.years}</span>
        {expandable && (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={`text-sage-500 transition-transform duration-500 ease-[var(--ease-expo)] ${open ? "rotate-45" : ""}`}>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        )}
      </span>
    </>
  );
  return (
    <li className="border-b border-sage-300/60">
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
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
              {item.links && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-2 rounded-full border border-sage-300 px-3.5 py-1.5 text-[13px] text-ink transition-colors hover:bg-sage-100">
                        {l.label}
                        <svg width="12" height="9" viewBox="0 0 14 10" aria-hidden>
                          <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-cream paper-grain py-28 md:py-40">
      <div className="shell grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel>About Me</SectionLabel>
          <div className="mt-10 flex items-end gap-6">
            <div className="w-[46%] max-w-[246px] shrink-0 bg-sage-100">
              <Picture id="portrait" sizes="246px" className="block h-auto w-full grayscale" />
            </div>
            <p className="t-label pb-1 text-sage-700">{profile.role}</p>
          </div>
          <h2 id="about-title" className="t-display mt-10 text-[clamp(3rem,6.5vw,5.6rem)] text-ink">
            {profile.name}
          </h2>
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)} className="t-body mt-6 max-w-xl">
              {p}
            </p>
          ))}
          <a href={`mailto:${profile.email}`} className="group mt-9 inline-flex items-center gap-3 text-ink">
            <span className="border-b border-ink pb-0.5 transition-colors group-hover:border-sage-500 group-hover:text-sage-700">Contact me</span>
            <svg width="16" height="10" viewBox="0 0 14 10" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
              <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h3 className="t-label text-sage-700">Experience</h3>
          <ul className="mt-2 border-t border-sage-300/60">
            {experience.map((item) => (
              <Row key={item.title} item={item} />
            ))}
          </ul>
          <h3 className="t-label mt-14 text-sage-700">Education</h3>
          <ul className="mt-2 border-t border-sage-300/60">
            {education.map((item) => (
              <Row key={item.title} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
