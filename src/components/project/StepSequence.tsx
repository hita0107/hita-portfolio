"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ImageId } from "@/content/images";
import { figures } from "@/content/figures";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";

type Props = {
  label: string;
  title: string;
  items: ImageId[];
};

export function StepSequence({ label, title, items }: Props) {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        setPinned(true);
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.round(items.length * window.innerHeight * 0.55)}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setStep(Math.min(items.length - 1, Math.floor(self.progress * items.length))),
        });
        return () => setPinned(false);
      });
    },
    { scope: root, dependencies: [items.length] },
  );

  const current = items[step];
  const n = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section ref={root} aria-label={title} className="bg-paper">
      <div className={`shell ${pinned ? "flex h-screen flex-col justify-center" : "py-24"}`}>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="t-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)] text-ink">{title}</h2>

        {pinned ? (
          <div className="mt-12 grid grid-cols-12 items-center gap-10">
            <div className="col-span-5">
              <p className="font-mono text-sm text-sage-700">
                {n(step)} <span className="text-sage-300">/ {n(items.length - 1)}</span>
              </p>
              <div className="relative mt-4 h-[clamp(6rem,11vw,10rem)] overflow-hidden">
                {items.map((id, i) => (
                  <p
                    key={id}
                    aria-hidden={i !== step}
                    className={`t-display absolute inset-x-0 top-0 text-[clamp(2.2rem,3.6vw,3.6rem)] text-ink transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] ${
                      i === step ? "translate-y-0 opacity-100" : i < step ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"
                    }`}
                  >
                    {figures[id].caption}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-span-7">
              <div className="grid place-items-center bg-white p-6 shadow-[0_24px_50px_-30px_rgb(30_37_27/0.35)]">
                <div className="grid w-full max-w-[320px]">
                  {items.map((id, i) => (
                    <div key={id} className={`[grid-area:1/1] transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-0"}`}>
                      <Picture id={id} sizes="320px" className="block h-auto w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <ol className="mt-6 grid grid-cols-5 gap-3" aria-label="Steps">
                {items.map((id, i) => (
                  <li key={id} className={`transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-40"}`}>
                    <Picture id={id} sizes="140px" alt="" className="block h-auto w-full" />
                    <span className={`mt-2 block h-px ${i <= step ? "bg-sage-700" : "bg-sage-300"}`} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((id, i) => (
              <li key={id}>
                <div className="bg-white p-3">
                  <Picture id={id} sizes="(min-width: 1024px) 18vw, 45vw" className="mx-auto block h-auto w-full" />
                </div>
                <p className="mt-3 font-mono text-xs text-sage-700">{n(i)}</p>
                <p className="mt-1 font-display text-lg leading-snug text-ink">{figures[id].caption}</p>
              </li>
            ))}
          </ol>
        )}
        <span className="sr-only" aria-live="polite">{figures[current].caption}</span>
      </div>
    </section>
  );
}
