import { images, type ImageId } from "@/content/images";
import { figures } from "@/content/figures";

type Format = "avif" | "webp";

export function srcFor(id: ImageId, width: number, format: Format) {
  return `/img/${id}-${width}.${format}`;
}

export function largestWidth(id: ImageId) {
  const { widths } = images[id];
  return widths[widths.length - 1];
}

function srcSet(id: ImageId, format: Format) {
  return images[id].widths.map((w) => `${srcFor(id, w, format)} ${w}w`).join(", ");
}

type Props = {
  id: ImageId;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function Picture({ id, sizes, className, priority = false, alt }: Props) {
  const im = images[id];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(id, "avif")} sizes={sizes} />
      <img
        src={srcFor(id, largestWidth(id), "webp")}
        srcSet={srcSet(id, "webp")}
        sizes={sizes}
        width={im.w}
        height={im.h}
        alt={alt ?? figures[id].alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        className={className}
        style={{ backgroundImage: `url(${im.lqip})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}
