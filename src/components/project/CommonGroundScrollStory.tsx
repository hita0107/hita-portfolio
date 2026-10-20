"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Keeps a sequence in one viewport while scroll moves each panel up and out. */
export function CommonGroundScrollStory({ children, heading, progressPlacement = "bottom" }: { children: ReactNode; heading?: ReactNode; progressPlacement?: "bottom" | "left" }) {
  const storyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

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
      {children}
      <div aria-hidden="true" className={`pointer-events-none absolute hidden bg-sage-300/60 lg:block ${progressPlacement === "left" ? "cg-scroll-story-progress-left" : "bottom-0 left-0 h-px w-full"}`}><span ref={progressRef} className={`block bg-sage-700 ${progressPlacement === "left" ? "h-full w-full origin-top" : "h-full w-full origin-left"}`} /></div>
    </div>
  );
}
