"use client";

import { useRef, useState } from "react";
import Image from "@/components/SiteImage";
import { SectionLabel } from "@/components/SectionLabel";
import images from "@/content/commonGroundSubmission.json";
import { gsap, useGSAP } from "@/lib/gsap";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";

const gardenViews = [
  { name: "Supervised Play", key: "final-outcome/garden-renders/children", left: "7%", top: "20%", width: "18.4%", height: "18.3%", captionLeft: "7%", captionTop: "39.8%", captionWidth: "22%", caption: "Supervised Play", details: ["Soft Surfaces (Sand)", "Clear Sightlines"] },
  { name: "Growing", key: "final-outcome/garden-renders/growing", left: "55.3%", top: "8.8%", width: "18.4%", height: "18.3%", captionLeft: "74%", captionTop: "9%", captionWidth: "20%", caption: "Growing", details: ["Gravel Paving", "Raised Beds"] },
  { name: "Sensory Garden", key: "final-outcome/garden-renders/sensory", left: "75.2%", top: "37.1%", width: "18.4%", height: "18.3%", captionLeft: "75.2%", captionTop: "57%", captionWidth: "23%", caption: "Sensory Garden", details: ["Fragrant Planting Edge", "Partial Pergola", "Rock Garden"] },
  { name: "Community Garden", key: "final-outcome/garden-renders/community", left: "8.3%", top: "56.9%", width: "18.4%", height: "18.3%", captionLeft: "8.3%", captionTop: "76.3%", captionWidth: "22%", caption: "Community Garden", details: ["Cobblestone Paving", "Bench Edge"] },
  { name: "Active Play", key: "final-outcome/garden-renders/active", left: "56.9%", top: "73.9%", width: "18.4%", height: "18.3%", captionLeft: "75.7%", captionTop: "78%", captionWidth: "23%", caption: "Active Play", details: ["Softer Lawn", "Exercise Area"] },
] as const;

export function CommonGroundGardenDiagram() {
  const stageRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  useGSAP(() => {
    const stage = stageRef.current;
    const base = baseRef.current;
    const drawing = drawingRef.current;
    if (!stage || !base || !drawing) return;

    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(base, { autoAlpha: 0 });
      gsap.set(drawing, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=130",
          end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(base, { autoAlpha: 1, duration: 0.55, ease: "none" });
      timeline.to({}, { duration: 0.3 });
      timeline.to(drawing, { autoAlpha: 1, duration: 1.15, ease: "none" });
      timeline.to({}, { duration: 0.35 });
    });
    match.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(drawing, { autoAlpha: 1 });
    });
    return () => match.revert();
  }, { scope: stageRef });

  return (
    <div ref={stageRef} className="relative flex h-[calc(100svh-150px)] min-h-[500px] w-full flex-col bg-white sm:min-h-[600px]">
      <div data-cg-heading className="relative z-10 shrink-0 bg-white">
        <SectionLabel>Gardens as connectors</SectionLabel>
        <h2 id="cg-gardens-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">Gardens as shared rooms</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">Different gardens support growing, play, movement and rest. Their relationship to the interior rooms gives people more ways to meet.</p>
      </div>
      <div className="relative mt-7 min-h-0 flex-1 overflow-hidden bg-white [container-type:size] sm:mt-9">
        <div className="absolute left-1/2 top-1/2 aspect-[2000/1414] w-[min(100cqw,141.44cqh)] -translate-x-1/2 -translate-y-1/2 scale-[1.18]">
        <div ref={baseRef} className="absolute inset-0">
          <Image
            src="/common-ground/submission/final-outcome/gardens-base.png"
            width={2000}
            height={1414}
            alt="Base floor plan showing the gardens within the shared rooms"
            unoptimized
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-full w-full object-contain"
          />
        </div>
        <div ref={drawingRef} className="absolute inset-0 opacity-0" onMouseLeave={() => setActive(null)}>
          <svg aria-hidden="true" viewBox="0 0 2000 1414" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full fill-none stroke-[#8b9d83] stroke-[2]">
            <path d="M 140 548 H 746" />
            <path d="M 1098 125 V 550" />
            <path d="M 1248 792 H 1870" />
            <path d="M 542 1138 V 730 H 986" />
            <path d="M 1128 1305 V 878" />
            <g className="fill-[#7e9275] stroke-none">
              <circle cx="746" cy="548" r="3" />
              <circle cx="1098" cy="550" r="3" />
              <circle cx="1248" cy="792" r="3" />
              <circle cx="986" cy="730" r="3" />
              <circle cx="1128" cy="878" r="3" />
            </g>
          </svg>
          {gardenViews.map((garden, index) => {
            const asset = images[garden.key];
            return <button
              key={garden.key}
              type="button"
              aria-label={`Enlarge ${garden.name} render`}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => {
                setActive(index);
                setViewer({ src: asset.src, title: garden.name, alt: `${garden.name} at Common Ground` });
              }}
              className={`absolute overflow-hidden rounded-[7%] transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-700 ${active !== null && active !== index ? "opacity-40" : "opacity-100"}`}
              style={{ left: garden.left, top: garden.top, width: garden.width, height: garden.height }}
            >
              <Image src={asset.src} width={asset.width} height={asset.height} alt="" unoptimized sizes="(min-width: 1024px) 250px, 20vw" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${active === index ? "scale-[1.12]" : "scale-100"}`} />
            </button>;
          })}
          {gardenViews.map((garden, index) => <div
            key={`${garden.key}-caption`}
            className={`pointer-events-none absolute font-sans text-[12px] leading-relaxed transition-transform duration-300 ${active === index ? "z-10 scale-[1.08]" : "scale-100"}`}
            style={{ left: garden.captionLeft, top: garden.captionTop, width: garden.captionWidth, transformOrigin: "left top" }}
          >
            <p className="font-medium text-sage-700">{garden.caption}</p>
            {garden.details.map((detail) => <p key={detail} className="text-[10px] leading-snug text-ink-soft/65">{detail}</p>)}
          </div>)}
        </div>
        </div>
      </div>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </div>
  );
}
