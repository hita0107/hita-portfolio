"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { ImageId } from "@/content/images";
import { figures } from "@/content/figures";
import { Picture } from "@/components/Picture";
import { useLightbox } from "@/components/Lightbox";

type Props = {
  id: ImageId;
  label?: string;
  note?: string;
};

export function FullBleed({ id, label, note }: Props) {
  const root = useRef<HTMLElement>(null);
  const open = useLightbox();

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo("[data-bleed]", { scale: 1.16 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from("[data-bleed-copy]", { opacity: 0, y: 20, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 55%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[92vh] min-h-[520px] overflow-hidden bg-ink">
      <button type="button" onClick={() => open([id], 0)} aria-label={`Enlarge: ${figures[id].alt}`} className="absolute inset-0 block cursor-zoom-in">
        <span data-bleed className="block h-full w-full">
          <Picture id={id} sizes="100vw" className="h-full w-full object-cover" />
        </span>
      </button>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent pb-10 pt-32">
        <div data-bleed-copy className="shell flex flex-wrap items-end justify-between gap-6 text-sage-50">
          {label && <p className="t-display text-[clamp(2rem,4.5vw,4rem)]">{label}</p>}
          {note && <p className="t-label max-w-sm text-sage-100">{note}</p>}
        </div>
      </div>
    </section>
  );
}
