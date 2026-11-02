"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Section = { id: string; label: string };

export function MobileSectionRail() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section, main footer, main + footer, main ~ footer"))
      .filter((node) => !node.parentElement?.closest("section"))
      .filter((node) => node.offsetHeight > 120 && (node.querySelector("h1, h2") || node.tagName === "FOOTER"));
    const entries = nodes.map((node, index) => {
      if (!node.id) node.id = `project-section-${index}`;
      const heading = node.querySelector("h2");
      const firstLabel = pathname === "/" ? "Index" : pathname.startsWith("/about") ? "About" : pathname === "/work" || pathname === "/work/" ? "Projects" : "Introduction";
      const label = node.tagName === "FOOTER" ? "Contact" : index === 0 ? firstLabel : node.getAttribute("aria-label") || heading?.textContent?.trim() || `Part ${index + 1}`;
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

  if (sections.length < 2) return null;
  const go = (index: number) => {
    const next = Math.max(0, Math.min(sections.length - 1, index));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    document.getElementById(sections[next].id)?.scrollIntoView({ behavior, block: "start" });
    setActive(next);
    setOpen(false);
  };

  return <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 lg:hidden">
    <nav aria-label="Page section navigation" className="flex items-stretch rounded-l-xl border border-r-0 border-sage-300/70 bg-white/95 shadow-lg backdrop-blur-md">
      {open && <div className="max-h-[65svh] w-[min(70vw,250px)] overflow-y-auto p-3">
        <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">On this page</p>
        {sections.map((section, index) => <button key={section.id} type="button" onClick={() => go(index)} aria-current={active === index ? "step" : undefined} className={`block min-h-11 w-full border-b border-sage-300/40 px-2 py-2 text-left text-xs leading-snug ${active === index ? "text-ink" : "text-ink-soft"}`}>
          <span className="mr-2 font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>{section.label}
        </button>)}
      </div>}
      <div className="flex w-11 flex-col border-l border-sage-300/50">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous section" className="min-h-11 disabled:opacity-30">↑</button>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close page sections" : "Show page sections"} className="flex min-h-14 flex-col items-center justify-center border-y border-sage-300/50 font-mono text-[10px]">
          <span>{String(active + 1).padStart(2, "0")}</span><span className="text-ink-soft">/{String(sections.length).padStart(2, "0")}</span>
        </button>
        <button type="button" onClick={() => go(active + 1)} disabled={active === sections.length - 1} aria-label="Next section" className="min-h-11 disabled:opacity-30">↓</button>
      </div>
    </nav>
  </div>;
}
