"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { images, type ImageId } from "@/content/images";
import { Figure } from "@/components/Figure";
import { SectionLabel } from "@/components/SectionLabel";

type Group = { label: string; items: ImageId[] };

// Screen-resolution sources get soft beyond roughly twice their pixel size.
const MAX_UPSCALE = 2.2;

type Props = {
  label: string;
  title: string;
  intro?: string;
  groups: Group[];
  height?: number;
};

export function HGallery({ label, title, intro, groups, height = 300 }: Props) {
  const root = useRef<HTMLElement>(null);
  const all = groups.flatMap((g) => g.items);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label={title} className="overflow-hidden bg-cream paper-grain">
      <div
        data-track
        className="flex snap-x snap-mandatory items-center gap-12 overflow-x-auto px-[var(--gutter)] py-20 md:w-max md:gap-20 md:py-0 md:motion-safe:h-screen md:motion-safe:snap-none md:motion-safe:overflow-visible md:motion-safe:pr-[18vw]"
      >
        <div className="w-[min(78vw,360px)] shrink-0 snap-start">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="t-display mt-8 text-[clamp(2.4rem,4.6vw,4.2rem)] text-ink">{title}</h2>
          {intro && <p className="t-body mt-6">{intro}</p>}
          <p className="t-label mt-10 hidden items-center gap-3 text-sage-700 md:motion-safe:flex">
            Scroll
            <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden>
              <path d="M25 1l4 4-4 4M29 5H1" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.label} className="shrink-0 snap-start">
            <p className="t-label flex items-center gap-3 text-sage-700">
              <span aria-hidden className="h-px w-8 bg-sage-500" />
              {g.label}
            </p>
            <div className="mt-5 flex items-end gap-5 md:gap-7">
              {g.items.map((id) => {
                const im = images[id];
                const h = Math.min(height, Math.round(im.h * MAX_UPSCALE));
                const w = Math.round((h * im.w) / im.h);
                return (
                  <div key={id} className="shrink-0" style={{ width: `${w}px`, maxWidth: "82vw" }}>
                    <Figure id={id} group={all} sizes={`${w}px`} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
