"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { label: "Site", id: "elysian-site" },
  { label: "Exploration", id: "elysian-exploration" },
  { label: "Outcomes", id: "elysian-outcomes" },
] as const;

type ProgressState = { active: number; fills: number[] };

export function ElysianProgress() {
  const [state, setState] = useState<ProgressState>({ active: 0, fills: [0, 0, 0] });
  const pendingStage = useRef<number | null>(null);
  const pendingTimer = useRef<number | null>(null);

  const selectStage = (index: number) => {
    pendingStage.current = index;
    setState({ active: index, fills: stages.map((_, stageIndex) => (stageIndex < index ? 100 : 0)) });
    if (pendingTimer.current !== null) window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => {
      pendingStage.current = null;
      window.dispatchEvent(new Event("scroll"));
    }, 1800);
  };

  useEffect(() => {
    let frame = 0;
    let trackingFrames = window.location.hash ? 120 : 0;
    const update = () => {
      frame = 0;
      const sections = stages.map((stage) => document.getElementById(stage.id));
      if (sections.some((section) => !section)) return;
      const pageTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
      const starts = [0, pageTop(sections[1]!), pageTop(sections[2]!)];
      const last = sections[2]!;
      const lastEnd = Math.max(starts[2] + 1, pageTop(last) + last.offsetHeight - window.innerHeight * 0.65);
      const ends = [starts[1], starts[2], lastEnd];
      // Anchor targets settle 152px below the viewport top beneath the fixed header.
      const position = window.scrollY + 160;
      let active = position >= starts[2] ? 2 : position >= starts[1] ? 1 : 0;
      let fills = starts.map((start, index) =>
        Math.max(0, Math.min(100, Math.round(((position - start) / Math.max(1, ends[index] - start)) * 100))),
      );
      if (pendingStage.current !== null) {
        const target = sections[pendingStage.current];
        if (target && Math.abs(target.getBoundingClientRect().top - 152) < 20) {
          pendingStage.current = null;
        } else {
          active = pendingStage.current;
          fills = stages.map((_, index) => (index < active ? 100 : 0));
        }
      }
      setState((previous) => previous.active === active && previous.fills.every((fill, index) => fill === fills[index])
        ? previous : { active, fills });
      if (trackingFrames > 0) {
        trackingFrames -= 1;
        frame = window.requestAnimationFrame(update);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const trackAnchor = () => { trackingFrames = 120; schedule(); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", trackAnchor);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", trackAnchor);
      if (frame) window.cancelAnimationFrame(frame);
      if (pendingTimer.current !== null) window.clearTimeout(pendingTimer.current);
    };
  }, []);

  return <nav aria-label="Elysian Arcadia project sections" className="shell grid h-12 grid-cols-3 items-end gap-2 pb-2 sm:gap-6">
    {stages.map((stage, index) => <a key={stage.id} href={`#${stage.id}`} onClick={() => selectStage(index)} aria-current={state.active === index ? "step" : undefined} className={`group block min-w-0 font-mono text-[8px] uppercase tracking-[.05em] transition-colors sm:text-[11px] sm:tracking-[.14em] ${state.active === index ? "text-ink" : state.active > index ? "text-sage-700" : "text-ink-soft/65"}`}>
      <span className="block truncate leading-5 group-hover:text-ink">{stage.label}</span>
      <span className="mt-1 block h-[2px] overflow-hidden bg-sage-300/45"><span className="block h-full bg-sage-700 transition-[width] duration-150 ease-linear motion-reduce:transition-none" style={{ width: `${state.fills[index]}%` }} /></span>
    </a>)}
  </nav>;
}
