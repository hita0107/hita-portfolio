"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/portfolio";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons = {
  top: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <path d="M4 10.5 12 4l8 6.5V20H4z" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <rect x="4" y="4" width="6.5" height="9" />
      <rect x="13.5" y="4" width="6.5" height="5" />
      <rect x="4" y="16" width="6.5" height="4" />
      <rect x="13.5" y="12" width="6.5" height="8" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <path d="M4 20V5l15 15z" />
      <path d="M8 16v-3.5l3.5 3.5z" />
      <path d="M4 9h2M4 13h1.5" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <rect x="3.5" y="6" width="17" height="12" rx="1" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17 7.1v.1" />
    </svg>
  ),
};

const sections = [
  { key: "top", label: "Home" },
  { key: "about", label: "About" },
  { key: "work", label: "Work" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact" },
] as const;

type Key = (typeof sections)[number]["key"];

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <span className="t-label pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[10px] text-sage-50 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
      {children}
    </span>
  );
}

export function Dock() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<Key>(onHome ? "top" : "work");

  useEffect(() => {
    if (!onHome) {
      setActive("work");
      return;
    }
    const els = sections.map((s) => document.getElementById(s.key)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as Key);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const item =
    "group relative grid h-10 w-10 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5";

  return (
    <nav
      aria-label="Site"
      className="dock-in fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-ink/92 p-1.5 shadow-[0_18px_40px_-18px_rgb(30_37_27/0.55)] backdrop-blur-md md:bottom-6"
    >
      <ul className="flex items-center gap-1">
        {sections.map((s) => {
          const isActive = active === s.key;
          return (
            <li key={s.key}>
              <Link
                href={onHome ? `#${s.key}` : `/#${s.key}`}
                aria-label={s.label}
                aria-current={isActive ? "true" : undefined}
                className={`${item} ${isActive ? "bg-sage-500 text-white" : "text-sage-100 hover:bg-white/10"}`}
              >
                {icons[s.key]}
                <Tip>{s.label}</Tip>
              </Link>
            </li>
          );
        })}
        <li aria-hidden className="mx-1 h-5 w-px bg-white/15" />
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${item} text-sage-100 hover:bg-white/10`}>
            {icons.linkedin}
            <Tip>LinkedIn</Tip>
          </a>
        </li>
        <li>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${item} text-sage-100 hover:bg-white/10`}>
            {icons.instagram}
            <Tip>Instagram</Tip>
          </a>
        </li>
      </ul>
    </nav>
  );
}
