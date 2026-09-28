"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";
import { profile } from "@/content/portfolio";

const EMPHASIS = "people-centred, sustainable and environmentally responsive architecture.";

export function Statement() {
  const root = useRef<HTMLElement>(null);
  const [lead, tail] = profile.approach.split(EMPHASIS);
  const words = [
    ...lead.trim().split(" ").map((w) => ({ w, em: false })),
    ...EMPHASIS.split(" ").map((w) => ({ w, em: true })),
  ];
  if (tail !== "") throw new Error("Approach text no longer ends with the emphasised phrase");

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo("[data-strip]", { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Approach" className="relative overflow-hidden bg-paper py-28 md:py-40">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-2">
          <SectionLabel>Approach</SectionLabel>
          <p data-statement className="t-display mt-10 text-[clamp(2rem,4.4vw,4.3rem)] leading-[1.08] text-ink">
            {words.map(({ w, em }, i) => (
              <span key={i} data-word className={em ? "text-sage-500" : undefined}>
                {w}{" "}
              </span>
            ))}
          </p>
          <p className="t-label mt-12 text-sage-700">Hita Shah, {profile.role}</p>
        </div>
        <div className="hidden justify-end md:col-span-2 md:flex">
          <div data-strip className="w-[158px] shrink-0">
            <Picture id="cover-strip" sizes="158px" className="block h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
