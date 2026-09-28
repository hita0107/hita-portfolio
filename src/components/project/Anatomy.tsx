"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToY } from "@/lib/lenis";
import type { AnatomyStep } from "@/content/buildups";
import { images, type ImageId } from "@/content/images";
import { useLightbox } from "@/components/Lightbox";
import { figures } from "@/content/figures";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";
import { BuildUpDiagram } from "./BuildUpDiagram";

type Tone = "light" | "dark";

type Props = {
  label: string;
  title: string;
  intro?: string;
  steps: AnatomyStep[];
  tone?: Tone;
};

function useStackHeight(count: number) {
  const [h, setH] = useState(count > 1 ? 240 : 340);
  useEffect(() => {
    const compute = () => setH(Math.round(Math.min(count > 1 ? 240 : 400, window.innerHeight * (count > 1 ? 0.24 : 0.4))));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [count]);
  return h;
}

function Hotspot({
  onPick,
  label,
  pressed,
  className,
  style,
  children,
}: {
  onPick?: () => void;
  label: string;
  pressed: boolean;
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (!onPick) {
    return (
      <span aria-hidden className={className} style={style}>
        {children}
      </span>
    );
  }
  return (
    <button type="button" onClick={onPick} aria-label={label} aria-pressed={pressed} className={className} style={style}>
      {children}
    </button>
  );
}

function Drawing({ steps, active, onPick, tone }: { steps: AnatomyStep[]; active: number; onPick?: (i: number) => void; tone: Tone }) {
  const drawings = [...new Set(steps.map((s) => s.drawing))];
  const current = steps[active].drawing;
  return (
    <div className="grid">
      {drawings.map((d) => {
        const shown = d === current;
        return (
          <div
            key={d}
            aria-hidden={!shown}
            style={{ maxWidth: Math.round(images[d].w * 2.2) }}
            className={`relative w-full [grid-area:1/1] transition-opacity duration-700 motion-reduce:transition-none ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Picture id={d} sizes="(min-width: 1024px) 46vw, 92vw" className="block h-auto w-full" />
            {steps.map((s, i) =>
              s.drawing === d && s.hotspot ? (
                <Hotspot
                  key={s.id}
                  onPick={onPick && (() => onPick(i))}
                  label={`Show ${s.title} build-up`}
                  pressed={i === active}
                  className={`group absolute grid place-items-center border transition-colors ${
                    i === active ? "border-solid border-ink bg-sage-500/15" : "border-dashed border-sage-500 hover:bg-sage-500/10"
                  }`}
                  style={{ left: `${s.hotspot.x * 100}%`, top: `${s.hotspot.y * 100}%`, width: `${s.hotspot.w * 100}%`, height: `${s.hotspot.h * 100}%` }}
                >
                  <span
                    className={`absolute -top-3 left-1/2 grid h-6 min-w-6 -translate-x-1/2 place-items-center rounded-full px-1.5 font-mono text-[11px] ${
                      i === active ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-sage-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i === active && <span aria-hidden className="anatomy-ping absolute inset-0 border border-sage-500" />}
                </Hotspot>
              ) : null,
            )}
          </div>
        );
      })}
      <p className={`t-label mt-3 ${tone === "dark" ? "text-sage-300" : "text-ink-soft"}`}>{figures[current].caption ?? steps[active].title}</p>
    </div>
  );
}

function DetailThumb({ id }: { id: ImageId }) {
  const open = useLightbox();
  const im = images[id];
  const h = 84;
  const w = Math.min(150, Math.round((h * im.w) / im.h));
  return (
    <button
      type="button"
      onClick={() => open([id], 0)}
      aria-label={`Enlarge the original detail drawing: ${figures[id].alt}`}
      className="group shrink-0 cursor-zoom-in bg-white p-1.5 shadow-[0_8px_20px_-12px_rgb(30_37_27/0.4)]"
    >
      <span className="t-label block pb-1 text-left text-[9px] text-sage-700">Original detail</span>
      <span className="grid place-items-center" style={{ width: w, height: h }}>
        <Picture id={id} sizes={`${w * 2}px`} className="max-h-full w-auto max-w-full object-contain" />
      </span>
    </button>
  );
}

function StepPanel({ step, active, tone, height }: { step: AnatomyStep; active: boolean; tone: Tone; height: number }) {
  const stacked = step.buildUps.length > 1;
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h3 className={`font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-light leading-none ${tone === "dark" ? "text-sage-50" : "text-ink"}`}>{step.title}</h3>
        {step.detail && <DetailThumb id={step.detail} />}
      </div>
      <div className={`mt-5 grid gap-8 ${stacked ? "sm:grid-cols-2" : ""}`}>
        {step.buildUps.map((b) => (
          <BuildUpDiagram key={b.id} data={b} active={active} tone={tone} height={height} stacked={stacked} showTitle={b.title !== step.title} />
        ))}
      </div>
    </div>
  );
}

export function Anatomy({ label, title, intro, steps, tone = "light" }: Props) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);
  const maxStack = Math.max(...steps.map((s) => s.buildUps.length));
  const height = useStackHeight(maxStack);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        setPinned(true);
        trigger.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.round(steps.length * window.innerHeight * 0.85)}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
        });
        return () => {
          trigger.current = null;
          setPinned(false);
        };
      });
    },
    { scope: root, dependencies: [steps.length] },
  );

  const pick = (i: number) => {
    const st = trigger.current;
    if (st) scrollToY(st.start + ((i + 0.5) / steps.length) * (st.end - st.start));
    else setStep(i);
  };

  const dark = tone === "dark";
  const surface = dark ? "bg-ink text-sage-50" : "bg-cream paper-grain text-ink";

  return (
    <section ref={root} aria-label={title} className={surface}>
      <div className={`shell ${pinned ? "flex h-screen flex-col justify-center pb-8 pt-20" : "py-24"}`}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <SectionLabel tone={dark ? "dark" : "light"}>{label}</SectionLabel>
            <h2 className={`t-display mt-5 text-[clamp(2rem,3.4vw,3.2rem)] ${dark ? "text-sage-50" : "text-ink"}`}>{title}</h2>
            {intro && <p className={`mt-3 text-[14px] leading-relaxed ${dark ? "text-sage-100/80" : "text-ink-soft"}`}>{intro}</p>}
          </div>
          {pinned && (
            <ol className="flex flex-wrap gap-2" aria-label="Details">
              {steps.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                      i === step
                        ? dark
                          ? "border-sage-100 bg-sage-100 text-ink"
                          : "border-ink bg-ink text-paper"
                        : dark
                          ? "border-white/20 text-sage-100 hover:bg-white/10"
                          : "border-sage-300 text-ink hover:bg-sage-100"
                    }`}
                  >
                    <span className="mr-1.5 font-mono text-[11px] opacity-70">{i + 1}</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        {pinned ? (
          <div className="mt-8 grid grid-cols-12 items-start gap-10">
            <div className={maxStack > 1 ? "col-span-4" : "col-span-6"}>
              <Drawing steps={steps} active={step} onPick={pick} tone={tone} />
            </div>
            <div className={maxStack > 1 ? "col-span-8" : "col-span-6"}>
              <StepPanel key={steps[step].id} step={steps[step]} active tone={tone} height={height} />
            </div>
          </div>
        ) : (
          <div className="mt-14 space-y-24">
            {steps.map((s, i) => (
              <ListStep key={s.id} steps={steps} index={i} tone={tone} height={height} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ListStep({ steps, index, tone, height }: { steps: AnatomyStep[]; index: number; tone: Tone; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  const s = steps[index];
  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-2">
      <Drawing steps={steps} active={index} tone={tone} />
      <StepPanel step={s} active={seen} tone={tone} height={height} />
    </div>
  );
}
