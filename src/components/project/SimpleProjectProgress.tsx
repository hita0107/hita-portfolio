"use client";

import { useEffect, useState } from "react";

type Stage = { readonly label: string; readonly id: string };

export function SimpleProjectProgress({ stages }: { stages: readonly Stage[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nodes = stages.map((stage) => document.getElementById(stage.id));
        const position = window.scrollY + 152;
        let current = 0;
        nodes.forEach((node, index) => {
          if (node && node.getBoundingClientRect().top + window.scrollY <= position) current = index;
        });
        const start = nodes[current]?.getBoundingClientRect().top ?? 0;
        const end = nodes[current + 1]?.getBoundingClientRect().top ?? ((nodes[current]?.getBoundingClientRect().bottom ?? window.innerHeight) - window.innerHeight * 0.4);
        setActive(current);
        setProgress(Math.max(0, Math.min(100, ((152 - start) / Math.max(1, end - start)) * 100)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.cancelAnimationFrame(frame);
    };
  }, [stages]);

  return <nav aria-label="Project sections" className="shell h-12">
    <div className="flex h-full items-end gap-2 pb-2 sm:gap-6">
      {stages.map((stage, index) => <a key={stage.id} href={`#${stage.id}`} aria-current={active === index ? "step" : undefined} className={`group block min-w-0 flex-1 font-mono text-[8px] uppercase tracking-[.02em] transition-colors sm:text-[10px] sm:tracking-[.08em] ${active === index ? "text-ink" : "text-ink-soft/65"}`}>
        <span className="flex min-h-6 items-end leading-[1.1] group-hover:text-ink">{stage.label}</span>
        <span className="mt-1 block h-[2px] overflow-hidden bg-sage-300/45"><span className="block h-full bg-sage-700 transition-[width] duration-150 motion-reduce:transition-none" style={{ width: `${index < active ? 100 : index === active ? progress : 0}%` }} /></span>
      </a>)}
    </div>
  </nav>;
}
