"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { embodiedCarbon } from "@/content/buildups";

const fmt = (n: number) => n.toLocaleString("en-GB");

export function CarbonSum() {
  const root = useRef<HTMLDivElement>(null);
  const { terms, totalKg, approxTonnes } = embodiedCarbon;
  const sum = terms.reduce((a, b) => a + b, 0);
  if (sum !== totalKg) throw new Error(`Embodied carbon terms sum to ${sum}, not ${totalKg}`);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const totalEl = root.current!.querySelector<HTMLElement>("[data-total]")!;
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 65%", once: true } })
          .from("[data-term]", { opacity: 0, x: 24, duration: 0.7, ease: "expo.out", stagger: 0.12 })
          .from("[data-seg]", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.7, ease: "expo.out", stagger: 0.12 }, 0)
          .from("[data-rule]", { scaleX: 0, transformOrigin: "100% 50%", duration: 0.8, ease: "expo.inOut" }, ">-0.2")
          .to(counter, { v: totalKg, duration: 1.6, ease: "power3.out", onUpdate: () => void (totalEl.textContent = fmt(Math.round(counter.v))) }, "<")
          .from("[data-approx]", { opacity: 0, y: 26, duration: 1.2, ease: "expo.out" }, "-=0.6");
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="text-ink">
      <p className="t-label text-sage-700">Estimated total embodied carbon</p>
      <div className="mt-6 flex h-3 w-full overflow-hidden bg-sage-100" aria-hidden>
        {terms.map((t, i) => (
          <span key={i} data-seg className="h-full border-r border-paper" style={{ width: `${(t / totalKg) * 100}%`, backgroundColor: ["#a7b89a", "#758965", "#8fa182", "#667a58", "#a7b89a", "#56684a"][i] }} />
        ))}
      </div>
      <ol className="mt-8 space-y-1.5 font-mono text-[clamp(1.1rem,1.6vw,1.4rem)]">
        {terms.map((t, i) => (
          <li key={i} data-term className="flex justify-end gap-4 tabular-nums">
            <span className="text-sage-500">{i === 0 ? "" : "+"}</span>
            <span className="w-[7ch] text-right">{fmt(t)}</span>
          </li>
        ))}
      </ol>
      <div data-rule className="mt-4 h-px w-full bg-ink" />
      <p className="mt-4 flex justify-end gap-4 font-mono text-[clamp(1.1rem,1.6vw,1.4rem)] tabular-nums">
        <span className="text-sage-500">=</span>
        <span>
          <span data-total>{fmt(totalKg)}</span> kgCO₂e
        </span>
      </p>
      <p data-approx className="t-display mt-10 text-right text-[clamp(3.4rem,8vw,7rem)] text-sage-700">
        ~ {approxTonnes}
        <span className="ml-3 text-[0.42em] text-ink">tCO₂e</span>
      </p>
    </div>
  );
}
