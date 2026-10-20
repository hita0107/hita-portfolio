"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function GalleryReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-gallery-reveal]", root.current).forEach((card) => {
        gsap.fromTo(card, { opacity: 0 }, {
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
