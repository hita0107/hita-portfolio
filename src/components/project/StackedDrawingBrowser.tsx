"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import type { SiteImage } from "./CommonGroundImageDialog";
import { publicPath } from "@/lib/publicPath";

export type DrawingItem = { title: string; alt: string; src: string; full: string; crop?: SiteImage["crop"] };
export type DrawingGroup = { label: string; items: readonly DrawingItem[] };

export function StackedDrawingBrowser({ groups, name, onOpen, compact = false, flat = false }: { groups: readonly DrawingGroup[]; name: string; onOpen: (image: SiteImage) => void; compact?: boolean; flat?: boolean }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const group = groups[groupIndex];
  const image = group.items[imageIndex];
  const cropAspect = flat ? group.items[0].crop?.aspectRatio : undefined;

  return <>
    {groups.length > 1 && <div role="group" aria-label={`Choose ${name} set`} className="mb-8 flex gap-7 overflow-x-auto border-b border-sage-300/60">
      {groups.map((option, index) => <button
        key={option.label}
        type="button"
        aria-pressed={groupIndex === index}
        onClick={() => { setGroupIndex(index); setImageIndex(0); }}
        className={`shrink-0 border-b-2 py-3 text-[12px] uppercase tracking-[.12em] transition-colors ${groupIndex === index ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}
      >{option.label}</button>)}
    </div>}
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(210px,.25fr)] lg:gap-12">
      <button
        type="button"
        aria-label={`Enlarge ${image.title}`}
        onClick={() => onOpen({ src: image.full, title: image.title, alt: image.alt, crop: image.crop })}
        className="group relative isolate block aspect-[1.42] w-full overflow-hidden focus-visible:outline-offset-4"
      >
        <span className={flat ? "absolute inset-0 block" : "absolute left-[1.5%] right-[3%] top-[1.5%] bottom-[4%] block"}>
          {!flat && <><span aria-hidden="true" className="absolute inset-0 block translate-x-4 translate-y-4 border border-sage-300/40 bg-white shadow-sm" />
          <span aria-hidden="true" className="absolute inset-0 block translate-x-2 translate-y-2 border border-sage-300/50 bg-white shadow-sm" /></>}
          <span className={flat ? "absolute inset-0 flex items-center bg-white" : "absolute inset-0 block overflow-hidden border border-sage-300/50 bg-white shadow-[0_10px_28px_rgba(48,54,39,.08)]"}>
            <span className="relative block w-full overflow-hidden border border-sage-300/50 bg-white" style={{ aspectRatio: cropAspect ?? (flat ? 1.42 : undefined), height: flat ? undefined : "100%" }}>
            {group.items.map((sheet, index) => <Image
              key={`${sheet.src}-${sheet.title}`}
              src={sheet.src}
              alt=""
              fill
              unoptimized
              loading="eager"
              sizes="(min-width: 1024px) 70vw, 92vw"
              className={`pointer-events-none ${sheet.crop ? "object-cover" : "object-contain"} ${flat ? "transition-opacity duration-500 ease-in-out motion-reduce:transition-none" : ""}`}
              style={{ opacity: imageIndex === index ? 1 : 0, zIndex: imageIndex === index ? 2 : 1, objectPosition: sheet.crop?.objectPosition }}
            />)}
            </span>
          </span>
        </span>
      </button>
      <div className="self-start border-t border-sage-300/60 pt-4">
        <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">{group.label} / {String(imageIndex + 1).padStart(2, "0")}</p>
        {flat ? <h3 className="mt-4 grid min-h-10 font-display text-[clamp(1.55rem,2vw,2rem)] text-ink">
          {group.items.map((item, index) => <span key={`${item.src}-${item.title}`} aria-hidden={imageIndex !== index} className={`col-start-1 row-start-1 transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${imageIndex === index ? "opacity-100" : "opacity-0"}`}>{item.title}</span>)}
        </h3> : <h3 className="mt-4 font-display text-[clamp(1.55rem,2vw,2rem)] text-ink lg:min-h-[7.5rem]">{image.title}</h3>}
        <div role="group" aria-label={`Choose ${name}`} className={`mt-7 grid border-t border-sage-300/60 ${compact ? "lg:max-h-[min(55svh,500px)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2" : ""}`}>
          {group.items.map((item, index) => <button
            key={`${item.src}-${item.title}`}
            type="button"
            aria-pressed={imageIndex === index}
            onMouseEnter={() => setImageIndex(index)}
            onFocus={() => setImageIndex(index)}
            onClick={() => setImageIndex(index)}
            className={`border-b border-sage-300/60 text-left text-sm transition-colors ${compact ? "py-2" : "py-3"} ${imageIndex === index ? "text-ink" : "text-ink-soft hover:text-ink"}`}
          >{String(index + 1).padStart(2, "0")} &nbsp; {item.title}</button>)}
        </div>
        <a href={publicPath(image.full)} target="_blank" rel="noopener noreferrer" className="editorial-link mt-6 inline-block pb-1 text-[11px] uppercase tracking-[.12em]">Open detailed sheet ↗</a>
      </div>
    </div>
  </>;
}
