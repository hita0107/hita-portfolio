"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function SectionReveal({ children, className = "", start = "top 72%" }: { children: ReactNode; className?: string; start?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.fromTo(root.current, { opacity: 0 }, {
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start, once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={className}>{children}</div>;
}
