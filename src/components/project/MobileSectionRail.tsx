"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Section = { id: string; label: string };

const shortTopics: Record<string, string> = {
  "cg-site-analysis": "Site analysis",
  "cg-peripheral-growth": "Peripheral growth",
  "cg-overview-map": "Overview map",
  "cg-exploration": "Exploration",
  "cg-final-drawings": "Rooms in use",
  "cg-gardens": "Gardens",
  "cg-floor-plans": "Floor plans",
  "cg-construction": "Long section + details",
  "cg-axonometric": "Exploded axonometric",
  "faithlie-context": "Context",
  "faithlie-study": "Design + delivery",
  "faithlie-carbon": "Carbon",
  "faithlie-model": "Physical model",
  "faithlie-process": "Making process",
  "elysian-site": "Site",
  "elysian-exploration": "Exploration",
  "elysian-plans": "Floor plans",
  "elysian-drawings": "Drawings",
  "elysian-renders": "Renders",
  "elysian-model": "Physical model",
};

export function MobileSectionRail() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section, main footer, main + footer, main ~ footer"))
      .filter((node) => !node.parentElement?.closest("section"))
      .filter((node) => node.offsetHeight > 120 && (node.querySelector("h1, h2") || node.tagName === "FOOTER"));
    const entries = nodes.map((node, index) => {
      if (!node.id) node.id = `project-section-${index}`;
      const heading = node.querySelector("h2");
      const firstLabel = pathname === "/" ? "Index" : pathname.startsWith("/about") ? "About" : pathname === "/work" || pathname === "/work/" ? "Projects" : "Introduction";
      const label = node.tagName === "FOOTER" ? "Contact" : index === 0 ? firstLabel : shortTopics[node.id] || node.getAttribute("aria-label")?.replace(/^(JSS Private School|Luxury Villa|Furjan Residences|Verdant Theatre)\s+/i, "") || heading?.textContent?.trim() || `Part ${index + 1}`;
      return { id: node.id, label: label.replace(/^(\d{2}\s*[\/·-]\s*)/, "") };
    });
    const setupFrame = window.requestAnimationFrame(() => setSections(entries));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const position = window.innerHeight * 0.38;
        let current = 0;
        entries.forEach((entry, index) => {
          const element = document.getElementById(entry.id);
          if (element && element.getBoundingClientRect().top <= position) current = index;
        });
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (sections.length < 2) return null;
  const go = (index: number) => {
    const next = Math.max(0, Math.min(sections.length - 1, index));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    document.getElementById(sections[next].id)?.scrollIntoView({ behavior, block: "start" });
    setActive(next);
    setOpen(false);
  };

  return <nav ref={menuRef} aria-label="Project topics" className="relative h-12">
    <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="project-topics-list" aria-label={`${String(active + 1).padStart(2, "0")} of ${String(sections.length).padStart(2, "0")}: ${sections[active].label}. ${open ? "Close" : "Open"} project topics`} className="flex h-full w-full items-center justify-center font-mono text-[10px] tracking-[.04em] text-ink">
      {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
    </button>
    {open && <div id="project-topics-list" className="absolute right-0 top-full w-[min(90vw,380px)] max-h-[70svh] overflow-y-auto bg-white p-3 shadow-xl">
      {sections.map((section, index) => <button key={section.id} type="button" onClick={() => go(index)} aria-current={active === index ? "step" : undefined} className={`block min-h-10 w-full px-2 py-2 text-left text-sm leading-snug ${active === index ? "text-ink" : "text-ink-soft"}`}>
        <span className="mr-3 font-mono text-[10px] text-sage-700">{String(index + 1).padStart(2, "0")}</span>{section.label}
      </button>)}
    </div>}
  </nav>;
}
