"use client";

import type { ImageId } from "@/content/images";
import { figures } from "@/content/figures";
import { Picture } from "./Picture";
import { useLightbox } from "./Lightbox";

type Props = {
  id: ImageId;
  sizes: string;
  group?: ImageId[];
  className?: string;
  imgClassName?: string;
  caption?: boolean;
  priority?: boolean;
  tone?: "light" | "dark";
};

export function Figure({ id, sizes, group, className = "", imgClassName = "", caption = true, priority, tone = "light" }: Props) {
  const open = useLightbox();
  const fig = figures[id];
  const list = group ?? [id];
  const index = list.indexOf(id);
  if (index === -1) throw new Error(`Figure ${id} is not in its lightbox group`);
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => open(list, index)}
        className="group block w-full cursor-zoom-in overflow-hidden"
        aria-label={`Enlarge: ${fig.caption ?? fig.alt}`}
      >
        <Picture
          id={id}
          sizes={sizes}
          priority={priority}
          className={`block h-auto w-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.015] ${imgClassName}`}
        />
      </button>
      {caption && fig.caption && (
        <figcaption className={`t-label mt-3 ${tone === "dark" ? "text-sage-300" : "text-ink-soft"}`}>{fig.caption}</figcaption>
      )}
    </figure>
  );
}
