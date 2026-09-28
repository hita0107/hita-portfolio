"use client";

import { useContext, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { srcFor, largestWidth } from "@/components/Picture";
import { figures } from "@/content/figures";
import { BeatContext } from "./Story";

// Coordinates are PDF points on page 6 of the portfolio; the SVG viewBox uses the same space.
const VIEW = { x: 395, y: 318, w: 424, h: 254 };
const IMG = { x: 452, y: 341, w: 317, h: 205 };

type Label = { text: string[]; x: number; y: number; anchor?: "end"; leader: [number, number][] };

const LABELS: Label[] = [
  { text: ["Nursery"], x: 404, y: 367.2, leader: [[404, 369.3], [560.9, 369.3]] },
  { text: ["Storage"], x: 404.4, y: 408.2, leader: [[404, 411.1], [515.9, 411.1]] },
  { text: ["Washroom + Changing", "Rooms"], x: 404.6, y: 434.3, leader: [[404, 427.5], [515.9, 427.5]] },
  { text: ["Dressing Room"], x: 403.6, y: 507.2, leader: [[404, 509.2], [475.9, 509.2], [475.9, 465.5]] },
  { text: ["Multipurpose Hall"], x: 542.8, y: 564.4, anchor: "end", leader: [[545.6, 566.3], [545.6, 483.5]] },
  { text: ["Foyer"], x: 592.3, y: 564.4, leader: [[590.3, 566.3], [590.3, 497.4]] },
  { text: ["Library"], x: 631.7, y: 564.4, leader: [[629.7, 566.3], [629.7, 483.5]] },
  { text: ["Workshop"], x: 730.6, y: 564.4, leader: [[728.8, 566.3], [728.8, 531.1], [666.6, 531.1]] },
  { text: ["Community Kitchen"], x: 606.9, y: 333.4, leader: [[605, 327.3], [605, 387.3]] },
  { text: ["Greenhouse"], x: 712.6, y: 333.4, leader: [[710.5, 327.3], [710.5, 408]] },
  { text: ["Elderly Daycare"], x: 815.8, y: 378.4, anchor: "end", leader: [[815.8, 380.9], [739.9, 380.9], [739.9, 425.1]] },
  { text: ["Sensory Room"], x: 813.8, y: 452.6, anchor: "end", leader: [[813.8, 454.8], [727, 454.8]] },
  { text: ["Staff Room"], x: 810.4, y: 470.3, anchor: "end", leader: [[810.4, 472.5], [674.3, 472.5]] },
  { text: ["Meeting Rooms"], x: 812.8, y: 505.8, anchor: "end", leader: [[812.8, 497.8], [647, 497.8]] },
];

const ARROWS: [number, number, number, number][] = [
  [677.6, 371.4, 662.2, 388.3],
  [736.1, 396.6, 720.7, 413.5],
  [554.3, 527.3, 570.5, 511],
  [565.9, 533.5, 582, 517.2],
  [503.6, 372.8, 523.2, 384.4],
];

const points = (pts: [number, number][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");

export function AnnotatedAxo() {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const w = largestWidth("cg-axo");
  const beat = useContext(BeatContext);

  useGSAP(
    () => {
      if (beat === false) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        const lines = gsap.utils.toArray<SVGPolylineElement>("[data-leader]");
        lines.forEach((l) => {
          const len = l.getTotalLength();
          gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
        });
        const tl = gsap.timeline({ scrollTrigger: beat === "inline" ? { trigger: root.current, start: "top 75%", once: true } : undefined });
        tl.from("[data-axo-img]", { opacity: 0, scale: 0.96, transformOrigin: "50% 50%", duration: 1.2, ease: "expo.out" })
          .to(lines, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.05 }, 0.3)
          .from("[data-label]", { opacity: 0, duration: 0.6, stagger: 0.05 }, 0.7)
          .from("[data-dot]", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)", stagger: 0.05 }, 0.9);
      });
    },
    { scope: root, dependencies: [beat === false] },
  );

  return (
    <div ref={root}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="block h-auto w-full" role="group" aria-label={figures["cg-axo"].alt}>
        <image
          data-axo-img
          href={srcFor("cg-axo", w, "webp")}
          x={IMG.x}
          y={IMG.y}
          width={IMG.w}
          height={IMG.h}
          preserveAspectRatio="none"
        />
        {ARROWS.map(([x1, y1, x2, y2], i) => {
          const a = Math.atan2(y2 - y1, x2 - x1);
          const h = 3.2;
          const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
          const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
          return (
            <g key={i} stroke="#758965" strokeWidth="0.7" fill="none" strokeLinecap="round">
              <path d={`M${x1} ${y1}L${x2} ${y2}M${p1[0]} ${p1[1]}L${x2} ${y2}L${p2[0]} ${p2[1]}`} />
            </g>
          );
        })}
        {LABELS.map((l, i) => {
          const on = hover === i;
          const dim = hover !== null && !on;
          const [dx, dy] = l.leader[l.leader.length - 1];
          return (
            <g
              key={l.text[0]}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              opacity={dim ? 0.35 : 1}
              style={{ transition: "opacity 200ms" }}
              className="cursor-default"
            >
              <polyline data-leader points={points(l.leader)} fill="none" stroke={on ? "#1e251b" : "#758965"} strokeWidth={on ? 0.9 : 0.55} />
              <polyline points={points(l.leader)} fill="none" stroke="transparent" strokeWidth="8" />
              <circle data-dot cx={dx} cy={dy} r={on ? 2.2 : 1.3} fill={on ? "#1e251b" : "#56684a"} />
              {on && <circle cx={dx} cy={dy} r="2.2" fill="none" stroke="#1e251b" strokeWidth="0.5" className="axo-ping" />}
              <text
                data-label
                x={l.x}
                y={l.y}
                textAnchor={l.anchor ?? "start"}
                fontSize="7.4"
                fontFamily="var(--font-sans)"
                fill={on ? "#1e251b" : "#56684a"}
              >
                {l.text.map((t, k) => (
                  <tspan key={t} x={l.x} dy={k === 0 ? 0 : 7.6}>
                    {t}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="t-label mt-4 text-ink-soft">{figures["cg-axo"].caption}</p>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-ink-soft sm:hidden">
        {LABELS.map((l) => (
          <li key={l.text[0]}>{l.text.join(" ")}</li>
        ))}
      </ul>
    </div>
  );
}
