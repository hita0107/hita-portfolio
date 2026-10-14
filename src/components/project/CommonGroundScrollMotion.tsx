"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function CommonGroundScrollMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-cg-heading]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, x: -28 }, {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 91%", end: "top 68%", scrub: 0.8 },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-cg-media]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, y: 32, scale: 1.025, clipPath: "inset(7% 7% 7% 7%)" }, {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 96%", end: "top 56%", scrub: 0.9 },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-cg-gallery]").forEach((group) => {
          gsap.fromTo(group.querySelectorAll("[data-cg-card]"), { opacity: 0, y: 48 }, {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            ease: "none",
            scrollTrigger: { trigger: group, start: "top 94%", end: "top 42%", scrub: 0.9 },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-cg-rooms]").forEach((group) => {
          gsap.fromTo(group.querySelectorAll("[data-cg-room-column]"), { opacity: 0, y: 36 }, {
            opacity: 1,
            y: 0,
            stagger: 0.16,
            ease: "none",
            scrollTrigger: { trigger: group, start: "top 92%", end: "top 48%", scrub: 0.85 },
          });
        });
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
