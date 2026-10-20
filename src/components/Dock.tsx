"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Index" },
  { href: "/about/", label: "About" },
  { href: "/work/", label: "Work" },
] as const;

export function Dock() {
  const pathname = usePathname();
  const onProject = pathname?.startsWith("/work/") && pathname !== "/work/";
  const darkOpening = pathname === "/" || onProject;
  const onVerdant = pathname?.startsWith("/work/verdant-theatre");
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight * .72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  const transparent = darkOpening && !pastHero && !onVerdant;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-[11px] leading-none transition-colors duration-300 ${transparent ? "text-white" : onVerdant ? "bg-white text-ink" : "bg-white/95 text-ink backdrop-blur-sm"}`}>
      <nav aria-label="Main navigation" className="shell relative flex min-h-16 items-start justify-between gap-5 py-4 md:min-h-20 md:py-5">
        <Link href="/" className="group shrink-0 font-sans text-[19px] font-normal leading-[.92] tracking-[-.06em] md:text-[25px]" aria-label="Hita Shah, home">
          <span className="block">Hita Shah</span>
          <span className="mt-1.5 block text-[10px] font-normal uppercase leading-none tracking-[.12em] opacity-75 md:text-[11px]">Architecture portfolio</span>
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 pt-1.5 text-[11px] font-medium tracking-[-.02em] sm:gap-x-6 md:gap-x-8 md:text-[13px]">
          {links.map((link) => {
            const current = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link href={link.href} aria-current={current ? "page" : undefined} className="editorial-link py-1 transition-opacity hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
