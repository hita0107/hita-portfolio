"use client";

import { useId, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { BuildUp, Material } from "@/content/buildups";

type Tone = "light" | "dark";

const MEMBRANE_PX = 2.5;

type Swatch = { bg: string; line: string };

function swatches(tone: Tone): Record<Material, Swatch> {
  const L = tone === "light";
  const line = L ? "#56684a" : "#c9d3bd";
  const ink = L ? "#1e251b" : "#eef2e8";
  const paper = L ? "#fcfbf7" : "#232b20";
  const timber = L ? "#eadcc2" : "#5b4a35";
  const concrete = L ? "#e8e6df" : "#3b4237";
  const pale = L ? "#f1efe7" : "#2c3429";
  return {
    terrazzo: { bg: L ? "#f2eee5" : "#3a3f35", line },
    membrane: { bg: ink, line: ink },
    void: { bg: paper, line },
    insulation: { bg: L ? "#f4f3ea" : "#2e3829", line },
    concrete: { bg: concrete, line },
    sand: { bg: L ? "#efe9da" : "#3d3a30", line },
    lacquer: { bg: L ? "#a7b89a" : "#758965", line },
    hardwood: { bg: timber, line: L ? "#9a7d55" : "#c9ae86" },
    plywood: { bg: L ? "#efe2c8" : "#5f5039", line: L ? "#9a7d55" : "#c9ae86" },
    mounts: { bg: paper, line },
    ufh: { bg: paper, line },
    vegetation: { bg: "transparent", line: L ? "#758965" : "#a7b89a" },
    substrate: { bg: L ? "#e3dccb" : "#40392d", line },
    fleece: { bg: pale, line },
    drainage: { bg: paper, line },
    clt: { bg: timber, line: L ? "#9a7d55" : "#c9ae86" },
    timber: { bg: timber, line: L ? "#9a7d55" : "#c9ae86" },
    battens: { bg: paper, line: L ? "#9a7d55" : "#c9ae86" },
    cavity: { bg: paper, line },
    pir: { bg: L ? "#f0efe4" : "#30392c", line },
    xps: { bg: L ? "#e8eee0" : "#2f3b2d", line },
    steel: { bg: ink, line: ink },
    plasterboard: { bg: L ? "#f5f3ee" : "#353c31", line },
    osb: { bg: L ? "#e9dcc1" : "#57482f", line: L ? "#9a7d55" : "#c9ae86" },
    board: { bg: L ? "#efede6" : "#373e33", line },
    corten: { bg: "#9a5b34", line: "#6f3f22" },
    screed: { bg: L ? "#ecebe4" : "#3a4036", line },
    hardcore: { bg: L ? "#e7e3d8" : "#3c3a31", line },
    blockwork: { bg: L ? "#e8e4dc" : "#3a3d34", line },
  };
}

function Patterns({ p, sw }: { p: string; sw: Record<Material, Swatch> }) {
  const u = { patternUnits: "userSpaceOnUse" } as const;
  const S = (m: Material) => sw[m];
  return (
    <defs>
      <pattern id={`${p}-terrazzo`} width="14" height="14" {...u}>
        <rect width="14" height="14" fill={S("terrazzo").bg} />
        {[
          [2, 3, 0.9],
          [9, 2, 0.6],
          [6, 8, 1.1],
          [12, 10, 0.7],
          [3, 12, 0.6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={S("terrazzo").line} opacity={0.75} />
        ))}
      </pattern>
      <pattern id={`${p}-insulation`} width="16" height="10" {...u}>
        <rect width="16" height="10" fill={S("insulation").bg} />
        <path d="M0 5 Q4 0 8 5 T16 5" fill="none" stroke={S("insulation").line} strokeWidth="0.8" />
      </pattern>
      <pattern id={`${p}-concrete`} width="18" height="18" {...u}>
        <rect width="18" height="18" fill={S("concrete").bg} />
        <circle cx="3" cy="4" r="0.9" fill={S("concrete").line} />
        <circle cx="12" cy="11" r="0.7" fill={S("concrete").line} />
        <circle cx="6" cy="15" r="0.6" fill={S("concrete").line} />
        <path d="M13 2.5l2 3.2h-4z" fill="none" stroke={S("concrete").line} strokeWidth="0.6" />
        <path d="M2.5 9l1.6 2.6H.9z" fill="none" stroke={S("concrete").line} strokeWidth="0.6" />
      </pattern>
      <pattern id={`${p}-sand`} width="5" height="5" {...u}>
        <rect width="5" height="5" fill={S("sand").bg} />
        <circle cx="1.2" cy="1.5" r="0.45" fill={S("sand").line} />
        <circle cx="3.6" cy="3.8" r="0.4" fill={S("sand").line} />
      </pattern>
      <pattern id={`${p}-hardwood`} width="40" height="5" {...u}>
        <rect width="40" height="5" fill={S("hardwood").bg} />
        <path d="M0 2.5 C10 1.5 20 3.5 40 2.5" fill="none" stroke={S("hardwood").line} strokeWidth="0.5" />
      </pattern>
      <pattern id={`${p}-plywood`} width="20" height="3.2" {...u}>
        <rect width="20" height="3.2" fill={S("plywood").bg} />
        <path d="M0 3.2H20" stroke={S("plywood").line} strokeWidth="0.45" />
      </pattern>
      <pattern id={`${p}-mounts`} width="36" height="12" {...u}>
        <rect width="36" height="12" fill={S("mounts").bg} />
        <rect x="4" y="0" width="10" height="12" fill={S("timber").bg} stroke={S("mounts").line} strokeWidth="0.5" />
        <path d="M22 0v12M25 0v12" stroke={S("mounts").line} strokeWidth="0.4" strokeDasharray="1.5 1.5" />
      </pattern>
      <pattern id={`${p}-ufh`} width="12" height="20" {...u}>
        <rect width="12" height="20" fill={S("ufh").bg} />
        <circle cx="6" cy="10" r="2.6" fill="none" stroke={S("ufh").line} strokeWidth="0.7" />
      </pattern>
      <pattern id={`${p}-substrate`} width="10" height="10" {...u}>
        <rect width="10" height="10" fill={S("substrate").bg} />
        <circle cx="2" cy="3" r="0.8" fill={S("substrate").line} opacity="0.7" />
        <circle cx="7" cy="7" r="0.6" fill={S("substrate").line} opacity="0.7" />
        <circle cx="8" cy="2" r="0.4" fill={S("substrate").line} opacity="0.7" />
      </pattern>
      <pattern id={`${p}-fleece`} width="8" height="6" {...u}>
        <rect width="8" height="6" fill={S("fleece").bg} />
        <path d="M0 3h4" stroke={S("fleece").line} strokeWidth="0.5" />
      </pattern>
      <pattern id={`${p}-drainage`} width="12" height="30" {...u}>
        <rect width="12" height="30" fill={S("drainage").bg} />
        <path d="M0 22 L3 8 L6 22 L9 8 L12 22" fill="none" stroke={S("drainage").line} strokeWidth="0.7" />
      </pattern>
      <pattern id={`${p}-clt`} width="30" height="8" {...u}>
        <rect width="30" height="8" fill={S("clt").bg} />
        <path d="M0 8H30" stroke={S("clt").line} strokeWidth="0.6" />
        <path d="M10 0v8M24 0v8" stroke={S("clt").line} strokeWidth="0.35" opacity="0.7" />
      </pattern>
      <pattern id={`${p}-timber`} width="7" height="7" {...u} patternTransform="rotate(45)">
        <rect width="7" height="7" fill={S("timber").bg} />
        <path d="M0 0v7" stroke={S("timber").line} strokeWidth="0.55" />
      </pattern>
      <pattern id={`${p}-battens`} width="44" height="10" {...u}>
        <rect width="44" height="10" fill={S("battens").bg} />
        <rect x="6" y="0" width="9" height="10" fill={S("timber").bg} />
        <path d="M6 0v10M15 0v10" stroke={S("battens").line} strokeWidth="0.6" />
      </pattern>
      <pattern id={`${p}-void`} width="44" height="10" {...u}>
        <rect width="44" height="10" fill={S("void").bg} />
        <rect x="6" y="0" width="9" height="10" fill={S("timber").bg} opacity="0.85" />
        <path d="M6 0v10M15 0v10" stroke={S("battens").line} strokeWidth="0.5" />
      </pattern>
      <pattern id={`${p}-pir`} width="7" height="7" {...u} patternTransform="rotate(45)">
        <rect width="7" height="7" fill={S("pir").bg} />
        <path d="M0 0v7M0 0h7" stroke={S("pir").line} strokeWidth="0.45" opacity="0.8" />
      </pattern>
      <pattern id={`${p}-xps`} width="6" height="6" {...u} patternTransform="rotate(-45)">
        <rect width="6" height="6" fill={S("xps").bg} />
        <path d="M0 0v6" stroke={S("xps").line} strokeWidth="0.45" opacity="0.8" />
      </pattern>
      <pattern id={`${p}-plasterboard`} width="6" height="6" {...u}>
        <rect width="6" height="6" fill={S("plasterboard").bg} />
        <circle cx="3" cy="3" r="0.35" fill={S("plasterboard").line} />
      </pattern>
      <pattern id={`${p}-osb`} width="16" height="9" {...u}>
        <rect width="16" height="9" fill={S("osb").bg} />
        <path d="M1 2h4M8 5h5M3 7h3M11 1.5h3" stroke={S("osb").line} strokeWidth="0.7" />
      </pattern>
      <pattern id={`${p}-board`} width="12" height="12" {...u}>
        <rect width="12" height="12" fill={S("board").bg} />
        <path d="M0 6h12" stroke={S("board").line} strokeWidth="0.35" />
      </pattern>
      <pattern id={`${p}-screed`} width="8" height="8" {...u}>
        <rect width="8" height="8" fill={S("screed").bg} />
        <circle cx="2" cy="2" r="0.5" fill={S("screed").line} />
        <circle cx="6" cy="5.5" r="0.4" fill={S("screed").line} />
      </pattern>
      <pattern id={`${p}-hardcore`} width="22" height="16" {...u}>
        <rect width="22" height="16" fill={S("hardcore").bg} />
        <path d="M3 5l4-3 3 4-3 3zM13 9l5-2 2 5-5 2zM6 13l3-1 1 2-3 1z" fill="none" stroke={S("hardcore").line} strokeWidth="0.6" />
      </pattern>
      <pattern id={`${p}-blockwork`} width="26" height="14" {...u}>
        <rect width="26" height="14" fill={S("blockwork").bg} />
        <path d="M0 0h26M0 7h26M0 14h26M13 0v7M0 7v7M26 7v7" stroke={S("blockwork").line} strokeWidth="0.5" />
      </pattern>
    </defs>
  );
}

function fillFor(p: string, m: Material, sw: Record<Material, Swatch>) {
  switch (m) {
    case "membrane":
    case "steel":
    case "corten":
    case "lacquer":
    case "cavity":
      return sw[m].bg;
    case "vegetation":
      return "transparent";
    default:
      return `url(#${p}-${m})`;
  }
}

type Props = {
  data: BuildUp;
  active: boolean;
  tone?: Tone;
  height?: number;
  compact?: boolean;
  stacked?: boolean;
  showTitle?: boolean;
};

export function BuildUpDiagram({ data, active, tone = "light", height = 380, compact = false, stacked = false, showTitle = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const p = `bu${uid}`;
  const sw = swatches(tone);
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const STACK_W = compact ? 120 : 150;
  const DIM_X = compact ? 0 : 34;
  const X0 = DIM_X + (compact ? 0 : 20);
  const H = height;
  const numeric = data.layers.reduce((a, l) => a + (l.mm ?? 0), 0);
  const nullCount = data.layers.filter((l) => l.mm === null).length;
  const scale = (H - nullCount * MEMBRANE_PX) / numeric;
  let y = 0;
  const geo = data.layers.map((l) => {
    const h = l.mm === null ? MEMBRANE_PX : Math.max(l.mm * scale, l.material === "membrane" ? MEMBRANE_PX : 1.5);
    const g = { y, h, c: y + h / 2 };
    y += h;
    return g;
  });
  const drawnH = y;

  const GAP = 15;
  const tags = geo.map((g) => g.c);
  for (let i = 1; i < tags.length; i++) tags[i] = Math.max(tags[i], tags[i - 1] + GAP);
  const overflow = tags[tags.length - 1] - (drawnH - 4);
  if (overflow > 0) {
    tags[tags.length - 1] -= overflow;
    for (let i = tags.length - 2; i >= 0; i--) tags[i] = Math.min(tags[i], tags[i + 1] - GAP);
  }

  const counted = geo.filter((_, i) => !data.layers[i].outsideTotal);
  const dimTop = counted[0].y;
  const dimBot = counted[counted.length - 1].y + counted[counted.length - 1].h;
  const bar100 = 100 * scale;
  const ink = tone === "light" ? "#1e251b" : "#eef2e8";
  const soft = tone === "light" ? "#758965" : "#a7b89a";
  const width = compact ? STACK_W + 8 : X0 + STACK_W + 64;
  const viewH = drawnH + (compact ? 4 : 44);

  useGSAP(
    () => {
      if (!active) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-layer]", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.9, stagger: { each: 0.06, from: "end" } });
        if (compact) return;
        tl.from("[data-tag]", { opacity: 0, x: -6, duration: 0.5, stagger: 0.04 }, 0.25).from("[data-row]", { opacity: 0, y: 8, duration: 0.6, stagger: 0.04 }, 0.2);
        if (!data.total) return;
        const totalEl = root.current!.querySelector<HTMLElement>("[data-total]")!;
        const counter = { v: 0 };
        tl.from("[data-dim]", { scaleY: 0, transformOrigin: "50% 0%", duration: 1.1 }, 0.1).to(
          counter,
          { v: data.total, duration: 1.4, ease: "power3.out", onUpdate: () => void (totalEl.textContent = `${Math.round(counter.v)} mm`) },
          0.1,
        );
      });
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={compact ? "" : stacked ? "grid items-start gap-5" : "grid items-start gap-6 sm:grid-cols-[auto_1fr]"}>
      <svg
        viewBox={`0 ${compact ? -2 : -8} ${width} ${viewH + (compact ? 0 : 8)}`}
        width={width}
        className="block h-auto max-w-full overflow-visible"
        role="img"
        aria-label={`${data.title} build-up${data.total ? `, ${data.total} mm` : ""}`}
      >
        <Patterns p={p} sw={sw} />
        {!compact && data.total && (
          <g data-dim>
            <path d={`M${DIM_X} ${dimTop}V${dimBot}`} stroke={soft} strokeWidth="1" />
            <path d={`M${DIM_X - 5} ${dimTop + 5}l10 -10M${DIM_X - 5} ${dimBot + 5}l10 -10`} stroke={soft} strokeWidth="1" />
            <path d={`M${DIM_X - 8} ${dimTop}H${X0 - 4}M${DIM_X - 8} ${dimBot}H${X0 - 4}`} stroke={soft} strokeWidth="0.6" />
          </g>
        )}
        {data.layers.map((l, i) => {
          const g = geo[i];
          const dim = hover !== null && hover !== i;
          return (
            <g key={i} opacity={dim ? 0.35 : 1} style={{ transition: "opacity 200ms" }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {l.material === "vegetation" ? (
                <g data-layer>
                  <rect x={X0} y={g.y} width={STACK_W} height={g.h} fill="transparent" />
                  {Array.from({ length: Math.floor(STACK_W / 9) }, (_, k) => {
                    const bx = X0 + 4 + k * 9;
                    const by = g.y + g.h;
                    const th = g.h * (0.55 + ((k * 37) % 10) / 22);
                    return <path key={k} d={`M${bx} ${by}q-2 ${-th * 0.6} -4 ${-th}M${bx} ${by}q1 ${-th * 0.7} 3 ${-th * 0.95}M${bx} ${by}v${-th * 0.8}`} fill="none" stroke={sw.vegetation.line} strokeWidth="0.8" />;
                  })}
                </g>
              ) : (
                <rect
                  data-layer
                  x={X0}
                  y={g.y}
                  width={STACK_W}
                  height={g.h}
                  fill={fillFor(p, l.material, sw)}
                  stroke={l.material === "cavity" ? soft : "none"}
                  strokeWidth={l.material === "cavity" ? 0.6 : 0}
                  strokeDasharray={l.material === "cavity" ? "3 3" : undefined}
                />
              )}
              {!compact && (
                <g data-tag>
                  <path
                    d={`M${X0 + STACK_W + 3} ${g.c}H${X0 + STACK_W + 18}L${X0 + STACK_W + 30} ${tags[i]}H${X0 + STACK_W + 38}`}
                    fill="none"
                    stroke={hover === i ? ink : soft}
                    strokeWidth={hover === i ? 1.1 : 0.7}
                  />
                  <circle cx={X0 + STACK_W + 47} cy={tags[i]} r="7.5" fill={hover === i ? ink : "none"} stroke={hover === i ? ink : soft} strokeWidth="0.8" />
                  <text
                    x={X0 + STACK_W + 47}
                    y={tags[i] + 3.2}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fill={hover === i ? (tone === "light" ? "#fcfbf7" : "#1e251b") : ink}
                  >
                    {i + 1}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {!compact && <rect x={X0} y={0} width={STACK_W} height={drawnH} fill="none" stroke={ink} strokeWidth="1" />}
        {!compact && (
          <g transform={`translate(${X0} ${drawnH + 22})`} fontFamily="var(--font-mono)" fontSize="8" fill={soft}>
            <path d={`M0 0H${bar100}M0 -4V4M${bar100} -4V4`} stroke={soft} strokeWidth="1" />
            <text x={bar100 + 8} y="3">100 mm</text>
          </g>
        )}
        {!compact && data.ends && (
          <g fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill={soft}>
            <text x={X0} y={-4}>{data.ends[0].toUpperCase()}</text>
            <text x={X0} y={drawnH + 12}>{data.ends[1].toUpperCase()}</text>
          </g>
        )}
      </svg>
      {!compact && (
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4 border-b border-current/15 pb-3">
            {showTitle ? <h4 className={`font-display text-xl font-normal ${tone === "light" ? "text-ink" : "text-sage-50"}`}>{data.title}</h4> : <span />}
            {data.total && (
              <p className={`t-label ${tone === "light" ? "text-sage-700" : "text-sage-300"}`}>
                Total <span data-total className={`ml-1 text-sm ${tone === "light" ? "text-ink" : "text-sage-50"}`}>{data.total} mm</span>
              </p>
            )}
          </div>
          <ol className="mt-3 space-y-0.5">
            {data.layers.map((l, i) => (
              <li
                key={i}
                data-row
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`grid cursor-default grid-cols-[1.5rem_4.5rem_1fr] items-baseline gap-2 rounded-sm px-1.5 leading-snug transition-colors ${stacked ? "py-0.5 text-[0.8rem]" : "py-1 text-[0.9rem]"} ${
                  hover === i ? (tone === "light" ? "bg-sage-100" : "bg-white/10") : ""
                } ${l.outsideTotal ? "opacity-60" : ""}`}
              >
                <span className={`font-mono text-[11px] ${tone === "light" ? "text-sage-700" : "text-sage-300"}`}>{i + 1}</span>
                <span className={`font-mono text-[12px] ${tone === "light" ? "text-ink" : "text-sage-50"}`}>
                  {l.mm === null ? "1 ply" : `${l.mm} mm`}
                </span>
                <span className={tone === "light" ? "text-ink-soft" : "text-sage-100"}>
                  {l.name}
                  {l.spec && <span className="ml-1.5 font-mono text-[11px] opacity-70">{l.spec}</span>}
                </span>
              </li>
            ))}
          </ol>
          {data.notes && (
            <ul className={`mt-3 space-y-1 font-mono text-[11px] ${tone === "light" ? "text-sage-700" : "text-sage-300"}`}>
              {data.notes.map((n) => (
                <li key={n}>+ {n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
