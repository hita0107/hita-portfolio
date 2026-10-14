"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  email: (
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
  { key: "top", label: "Home", href: "/" },
  { key: "about", label: "About me", href: "/about/" },
  { key: "work", label: "Projects", href: "/work/" },
] as const;

export function Dock() {
  const pathname = usePathname();
  const active = pathname?.startsWith("/work") ? "work" : pathname?.startsWith("/contact") ? "about" : sections.find((s) => s.href === pathname || s.href.slice(0, -1) === pathname)?.key ?? "top";

  const item =
    "group inline-flex min-h-12 min-w-11 flex-col items-center justify-center gap-0.5 rounded-2xl px-1.5 py-1 text-[9px] leading-tight transition-[background-color,color,transform] duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5 sm:min-w-0 sm:flex-row sm:gap-2 sm:px-3 sm:text-xs";

  return (
    <nav
      aria-label="Site"
      className="dock-in fixed bottom-3 left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2 overflow-x-auto rounded-3xl border border-white/10 bg-ink/92 p-1.5 shadow-[0_18px_40px_-18px_rgb(30_37_27/0.55)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:bottom-6"
    >
      <ul className="flex w-max items-center gap-0.5 sm:gap-1">
        {sections.map((s) => {
          const isActive = active === s.key;
          return (
            <li key={s.key}>
              <Link
                href={s.href}
                aria-label={s.label}
                aria-current={isActive ? "true" : undefined}
                className={`${item} ${isActive ? "bg-sage-500 text-white" : "text-sage-100 hover:bg-white/10"}`}
              >
                {icons[s.key]}
                <span className="whitespace-nowrap">{s.label}</span>
              </Link>
            </li>
          );
        })}
        <li aria-hidden className="mx-0.5 h-6 w-px shrink-0 bg-white/15 md:mx-1" />
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${item} text-sage-100 hover:bg-white/10`}>
            {icons.linkedin}
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${item} text-sage-100 hover:bg-white/10`}>
            {icons.instagram}
            <span>Instagram</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={`${item} text-sage-100 hover:bg-white/10`}>
            {icons.email}
            <span>Email</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
