"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function GalleryReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-gallery-reveal]", root.current).forEach((card, index) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 32 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: (index % 2) * 0.28,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
