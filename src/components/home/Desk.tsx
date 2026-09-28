"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, Draggable, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Picture } from "@/components/Picture";
import { BuildUpDiagram } from "@/components/project/BuildUpDiagram";
import { commonGroundAnatomy } from "@/content/buildups";
import { profile } from "@/content/portfolio";
import type { ImageId } from "@/content/images";

type Place = { x: number; y: number; w: number; r: number };

type Card = { key: string; lg: Place; sm?: Place; depth: number } & (
  | { kind: "image"; image: ImageId; label: string; tag: string; href: string }
  | { kind: "buildup"; href: string }
  | { kind: "note" }
);

const CARDS: Card[] = [
  { key: "auditorium", kind: "image", image: "vt-auditorium", label: "Verdant Theatre", tag: "Auditorium", href: "/work/verdant-theatre/", lg: { x: 3, y: 11, w: 300, r: -2.5 }, sm: { x: 3, y: 60, w: 172, r: -3 }, depth: 1.2 },
  { key: "greenhouse", kind: "image", image: "cg-greenhouse", label: "Common Ground", tag: "Greenhouse", href: "/work/common-ground/", lg: { x: 26.5, y: 7, w: 196, r: 3 }, depth: 0.6 },
  { key: "tower", kind: "image", image: "tower-render", label: "Design Concepts", tag: "Dubai", href: "/work/design-concepts/", lg: { x: 49, y: 5.5, w: 128, r: -3 }, depth: 0.9 },
  { key: "courtyard", kind: "image", image: "ea-courtyard", label: "Elysian Arcadia", tag: "Courtyard", href: "/work/elysian-arcadia/", lg: { x: 68.5, y: 8, w: 292, r: 2 }, sm: { x: 52, y: 64, w: 170, r: 3 }, depth: 1.1 },
  { key: "corten", kind: "image", image: "fc-corten", label: "Faithlie Centre", tag: "Corten facade", href: "/work/faithlie-centre/", lg: { x: 89, y: 40, w: 118, r: -4 }, depth: 0.7 },
  { key: "model", kind: "image", image: "fc-model-1", label: "Faithlie Centre", tag: "Physical model", href: "/work/faithlie-centre/", lg: { x: 5, y: 47, w: 168, r: 3 }, depth: 0.8 },
  { key: "axo", kind: "image", image: "cg-axo", label: "Common Ground", tag: "Layout", href: "/work/common-ground/", lg: { x: 18.5, y: 56, w: 250, r: -1.5 }, depth: 1 },
  { key: "sketch", kind: "image", image: "vt-sketch", label: "Verdant Theatre", tag: "Sketch", href: "/work/verdant-theatre/", lg: { x: 22, y: 78, w: 230, r: 1.2 }, depth: 0.5 },
  { key: "ea-model", kind: "image", image: "ea-model-2", label: "Elysian Arcadia", tag: "Model", href: "/work/elysian-arcadia/", lg: { x: 67, y: 54, w: 170, r: -2.5 }, depth: 0.9 },
  { key: "buildup", kind: "buildup", href: "/work/common-ground/", lg: { x: 83.5, y: 73, w: 176, r: 1.5 }, depth: 0.6 },
  { key: "note", kind: "note", lg: { x: 4, y: 81, w: 208, r: -1 }, depth: 0.4 },
];

const greenRoof = commonGroundAnatomy.find((s) => s.id === "green-roof")!.buildUps[0];

function width(w: number) {
  return `clamp(${Math.round(w * 0.68)}px, ${(w / 14.4).toFixed(2)}vw, ${Math.round(w * 1.18)}px)`;
}

function placeVars(c: Card): React.CSSProperties {
  const s = c.sm ?? c.lg;
  return {
    "--x": `${c.lg.x}%`,
    "--y": `${c.lg.y}%`,
    "--w": width(c.lg.w),
    "--xs": `${s.x}%`,
    "--ys": `${s.y}%`,
    "--ws": `${Math.round(s.w)}px`,
  } as React.CSSProperties;
}

function CardBody({ card }: { card: Card }) {
  if (card.kind === "image") {
    return (
      <Link href={card.href} data-link className="block" aria-label={`${card.label}: ${card.tag}`}>
        <span className="block bg-white p-1.5 shadow-[0_1px_0_rgb(30_37_27/0.04),0_14px_32px_-16px_rgb(30_37_27/0.35)]">
          <Picture id={card.image} sizes="(min-width: 768px) 22vw, 45vw" className="block h-auto w-full" />
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-none">
          <span className="whitespace-nowrap font-display text-[13px] text-ink">{card.label}</span>
          <span className="whitespace-nowrap rounded-full border border-sage-300 bg-paper/80 px-2 py-[3px] text-ink-soft">{card.tag}</span>
        </span>
      </Link>
    );
  }
  if (card.kind === "buildup") {
    return (
      <Link href={card.href} data-link className="block bg-white p-3 shadow-[0_14px_32px_-16px_rgb(30_37_27/0.35)]" aria-label="Common Ground: green roof build-up, 303 mm">
        <span className="t-label flex justify-between text-sage-700">
          <span>Green roof</span>
          <span className="text-ink">303 mm</span>
        </span>
        <span className="mt-2 block">
          <BuildUpDiagram data={greenRoof} active compact height={120} />
        </span>
        <span className="mt-2 block font-display text-[13px] text-ink">Common Ground</span>
      </Link>
    );
  }
  return (
    <div className="bg-sage-100 p-4 shadow-[0_14px_32px_-18px_rgb(30_37_27/0.35)]">
      <p className="t-label text-sage-700">Currently</p>
      <p className="mt-2 font-display text-lg leading-snug text-ink">{profile.status}</p>
      <p className="mt-2 text-[13px] leading-snug text-ink-soft">MArch / RIBA Part 2, University of Dundee, 2026</p>
    </div>
  );
}

export function Desk() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const intro = root.current!.querySelector<HTMLElement>("[data-intro]")!;
      cards.forEach((el) => gsap.set(el, { rotation: Number(el.dataset.r) }));

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set([intro, ...cards], { visibility: "visible" });
        gsap.from(intro, { y: 24, opacity: 0, scale: 0.97, duration: 1.2, ease: "expo.out", delay: 0.1 });
        cards.forEach((el, i) => {
          gsap.from(el, {
            y: -70 - (i % 3) * 20,
            opacity: 0,
            scale: 0.94,
            rotation: Number(el.dataset.r) + (i % 2 ? 9 : -9),
            duration: 1.3,
            ease: "expo.out",
            delay: 0.35 + i * 0.06,
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
          gsap.to(el, {
            yPercent: -Number(el.dataset.depth) * 38,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
      });

      mm.add("(pointer: fine)", () => {
        const draggables = [intro, ...cards].map((el) => {
          const link = el.querySelector<HTMLElement>("[data-link]");
          const base = Number(el.dataset.r);
          return Draggable.create(el, {
            type: "x,y",
            bounds: root.current,
            inertia: true,
            edgeResistance: 0.85,
            dragClickables: Boolean(link),
            onPress() {
              gsap.to(el, { scale: 1.035, duration: 0.3, ease: "power3.out", overwrite: "auto" });
            },
            onDragStart() {
              if (link) link.dataset.dragged = "1";
            },
            onDrag() {
              gsap.to(el, { rotation: base + gsap.utils.clamp(-7, 7, this.deltaX * 0.9), duration: 0.5, ease: "power3.out", overwrite: "auto" });
            },
            onRelease() {
              gsap.to(el, { scale: 1, rotation: base, duration: 0.8, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
              if (link) setTimeout(() => (link.dataset.dragged = "0"), 0);
            },
          })[0];
        });
        const guards = cards
          .map((el) => el.querySelector<HTMLElement>("[data-link]"))
          .filter((a): a is HTMLElement => a !== null)
          .map((a) => {
            const guard = (e: MouseEvent) => {
              if (a.dataset.dragged === "1") {
                e.preventDefault();
                e.stopPropagation();
              }
            };
            a.addEventListener("click", guard, true);
            return () => a.removeEventListener("click", guard, true);
          });
        return () => {
          draggables.forEach((d) => d.kill());
          guards.forEach((off) => off());
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} aria-label="Desk" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-cream dot-grid">
      <header className="shell pointer-events-none relative z-30 flex items-start justify-between pt-5 md:pt-7">
        <p className="pointer-events-auto">
          <span className="block font-display text-lg leading-none text-ink">Hita Shah</span>
          <span className="t-label mt-1.5 block text-sage-700">{profile.role}</span>
        </p>
        <p className="pointer-events-auto flex items-center gap-2.5 text-right">
          <span aria-hidden className="h-2 w-2 bg-sage-500" />
          <span className="t-label text-ink">{profile.status}</span>
        </p>
      </header>

      {CARDS.map((c) => (
        <div
          key={c.key}
          data-depth={c.depth}
          style={placeVars(c)}
          className={`absolute left-(--xs) top-(--ys) z-10 w-(--ws) md:left-(--x) md:top-(--y) md:w-(--w) ${c.sm ? "" : "hidden md:block"}`}
        >
          <div data-card data-reveal data-r={c.lg.r} className="cursor-grab select-none active:cursor-grabbing">
            <CardBody card={c} />
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 top-[14%] z-20 flex justify-center px-4 md:top-1/2 md:-translate-y-1/2">
        <div data-depth="0.25">
          <div
            data-intro
            data-reveal
            data-r="0"
            className="w-[min(92vw,410px)] cursor-grab border border-sage-300/70 bg-white/96 p-6 shadow-[0_30px_60px_-30px_rgb(30_37_27/0.4)] backdrop-blur-sm active:cursor-grabbing md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="block h-11 w-11 overflow-hidden bg-sage-100">
                <Picture id="portrait" sizes="44px" alt="" priority className="h-full w-full object-cover object-top" />
              </span>
              <span className="t-label text-sage-700">Selected works 2022-26</span>
            </div>
            <h1 className="t-display mt-5 text-[2.6rem] text-ink md:text-[3.1rem]">Hi, I&rsquo;m Hita.</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Master of Architecture graduate from the University of Dundee, with RIBA Part 1 and Part 2 qualifications.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              This desk holds four studio projects and my work in practice in Dubai. Drag the drawings around, or open whatever catches your eye.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-5 py-2.5 text-[14px] text-paper transition-colors hover:bg-sage-700">
                Get in touch
              </a>
              <a href="#about" className="rounded-full border border-sage-300 px-5 py-2.5 text-[14px] text-ink transition-colors hover:bg-sage-100">
                About me
              </a>
            </div>
          </div>
          <div aria-hidden className="cursor-chip pointer-events-none absolute -bottom-9 right-2 hidden items-start gap-1 md:flex">
            <svg width="14" height="16" viewBox="0 0 14 16">
              <path d="M1 1l11.5 6.3-5.2 1.3-2.4 5.1z" fill="#758965" stroke="#fcfbf7" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <span className="mt-3 bg-sage-500 px-2 py-0.5 font-mono text-[11px] text-white">Hita Shah</span>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-24 left-1/2 z-0 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="t-label text-sage-700">Scroll</span>
        <span className="scroll-cue block h-10 w-px bg-sage-500" />
      </div>
    </section>
  );
}
