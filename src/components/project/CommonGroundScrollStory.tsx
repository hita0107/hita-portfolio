"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Keeps a sequence in one viewport while scroll moves each panel up and out. */
export function CommonGroundScrollStory({ children, heading, progressPlacement = "bottom" }: { children: ReactNode; heading?: ReactNode; progressPlacement?: "bottom" | "left" }) {
  const storyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [mobileStep, setMobileStep] = useState(0);
  const [mobileCount, setMobileCount] = useState(0);

  useEffect(() => {
    const panels = Array.from(storyRef.current?.querySelectorAll<HTMLElement>("[data-cg-story-panel]") || []);
    setMobileCount(panels.length);
    if (panels.length < 2) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setMobileStep(panels.indexOf(visible.target as HTMLElement));
    }, { rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.25, 0.5] });
    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const goMobileStep = (index: number) => {
    const panels = storyRef.current?.querySelectorAll<HTMLElement>("[data-cg-story-panel]");
    panels?.[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMobileStep(index);
  };

  useGSAP(() => {
    const match = gsap.matchMedia();
    match.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-cg-story-panel]", storyRef.current);
      if (panels.length < 2) return;
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 100 });
      const verticalProgress = progressPlacement === "left";
      gsap.set(progressRef.current, verticalProgress ? { scaleY: 0, transformOrigin: "center top" } : { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top top+=130",
          end: () => `+=${Math.round(window.innerHeight * panels.length * 0.55)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progressRef.current, verticalProgress ? { scaleY: self.progress } : { scaleX: self.progress }),
        },
      });
      timeline.to({}, { duration: 0.35 });
      for (let index = 0; index < panels.length - 1; index += 1) {
        timeline.to(panels[index], { autoAlpha: 0, y: -90, duration: 0.55, ease: "none" });
        timeline.to(panels[index + 1], { autoAlpha: 1, y: 0, duration: 0.55, ease: "none" }, "-=0.12");
        timeline.to({}, { duration: 0.35 });
      }
    });
    return () => match.revert();
  }, { scope: storyRef });

  return (
    <div ref={storyRef} className={`cg-scroll-story relative mt-10 lg:mt-14${heading ? " cg-scroll-story--headed" : ""}`}>
      {heading && <div className="cg-scroll-story-heading">{heading}</div>}
      {mobileCount > 1 && <nav aria-label="Steps in this section" className="sticky top-28 z-20 mt-5 flex items-center justify-between gap-3 border-y border-sage-300/60 bg-white/95 px-2 py-2 backdrop-blur-sm lg:hidden">
        <button type="button" onClick={() => goMobileStep(mobileStep - 1)} disabled={mobileStep === 0} aria-label="Previous step" className="min-h-11 min-w-11 disabled:opacity-30">←</button>
        <span className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-soft">{String(mobileStep + 1).padStart(2, "0")} / {String(mobileCount).padStart(2, "0")}</span>
        <button type="button" onClick={() => goMobileStep(mobileStep + 1)} disabled={mobileStep === mobileCount - 1} aria-label="Next step" className="min-h-11 min-w-11 disabled:opacity-30">→</button>
      </nav>}
      {children}
      <div aria-hidden="true" className={`pointer-events-none absolute hidden bg-sage-300/60 lg:block ${progressPlacement === "left" ? "cg-scroll-story-progress-left" : "bottom-0 left-0 h-px w-full"}`}><span ref={progressRef} className={`block bg-sage-700 ${progressPlacement === "left" ? "h-full w-full origin-top" : "h-full w-full origin-left"}`} /></div>
    </div>
  );
}
