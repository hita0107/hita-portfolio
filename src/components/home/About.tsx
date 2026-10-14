"use client";

import Link from "next/link";
import { useId, useState, type MouseEvent } from "react";
import { Picture } from "@/components/Picture";
import { education, experience, profile, type TimelineItem } from "@/content/portfolio";

function Row({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  const expandable = Boolean(item.detail);
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
            </div>
          </div>
        </div>
      )}
      {item.links && (
        <ul className="-mt-2 flex flex-wrap gap-2 pb-5">
          {item.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex items-center gap-2 rounded-full border border-sage-300 px-3.5 py-1.5 text-[13px] text-ink transition-colors hover:bg-sage-100">
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

function scrollToSkills(event: MouseEvent<HTMLAnchorElement>) {
  const skills = document.getElementById("skills");
  if (!skills) return;

  event.preventDefault();
  event.stopPropagation();
  window.history.pushState(null, "", "#skills");
  skills.scrollIntoView({ behavior: "smooth" });
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-cream paper-grain pb-16 pt-20 md:pb-24 md:pt-28">
      <div className="shell">
        <div className="border-t border-sage-300/60 pt-8">
          <p className="flex items-center gap-3 font-mono text-lg uppercase tracking-[0.14em] text-sage-700 sm:text-xl">
            <span aria-hidden className="h-px w-12 bg-sage-500" />
            About me
          </p>
        </div>

        <div className="mt-8 flex items-end gap-6 sm:gap-8">
          <div className="w-28 shrink-0 bg-sage-100 sm:w-40 lg:w-48">
            <Picture id="portrait" sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 112px" className="block h-auto w-full grayscale" />
          </div>
          <div className="min-w-0 pb-1">
            <h2 id="about-title" className="t-display text-[clamp(2.5rem,4.5vw,4.5rem)] text-ink">
              {profile.name}
            </h2>
            <p className="mt-3 font-display text-[clamp(1.15rem,2.1vw,1.6rem)] font-light leading-snug text-sage-700">{profile.role}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-4">
            {profile.about.map((p, i) => (
              <p key={p.slice(0, 24)} className={`t-body max-w-xl ${i === 0 ? "" : "mt-5"}`}>
                {p}
              </p>
            ))}
            <a href="#contact" className="group mt-8 inline-flex items-center gap-3 text-ink">
              <span className="border-b border-ink pb-0.5 transition-colors group-hover:border-sage-500 group-hover:text-sage-700">Contact me</span>
              <svg width="16" height="10" viewBox="0 0 14 10" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-4">
            <h3 className="t-label text-sage-700">Education</h3>
            <ul className="mt-2 border-t border-sage-300/60">
              {education.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="t-label text-sage-700">Experience</h3>
            <ul className="mt-2 border-t border-sage-300/60">
              {experience.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <a href="#skills" onClick={scrollToSkills} className="inline-flex items-center gap-3 border-b border-sage-500 pb-1 font-display text-xl text-sage-700 transition-colors hover:text-ink">
            Explore skills
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
