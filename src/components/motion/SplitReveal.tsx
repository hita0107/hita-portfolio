"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
  delay?: number;
  onScroll?: boolean;
  id?: string;
};

export function SplitReveal({ as: Tag = "h2", className, children, delay = 0, onScroll = true, id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const el = ref.current!;
        gsap.set(el, { visibility: "visible" });
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.15,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: onScroll ? { trigger: el, start: "top 88%", once: true } : undefined,
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={(el: HTMLElement | null) => void (ref.current = el)} id={id} data-reveal className={className}>
      {children}
    </Tag>
  );
}
