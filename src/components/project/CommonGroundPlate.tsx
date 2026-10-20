import assets from "@/content/commonGroundAssets.json";
import { publicPath, publicSrcSet } from "@/lib/publicPath";

export type CommonGroundAssetId = keyof typeof assets;

export function CommonGroundImage({
  id,
  alt,
  sizes,
  className = "",
}: {
  id: CommonGroundAssetId;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const asset = assets[id];
  return (
    // Responsive files are generated ahead of time for the static site.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={publicPath(asset.src)}
      srcSet={publicSrcSet(asset.srcSet)}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export function CommonGroundPlate({
  id,
  label,
  alt,
  sizes = "(min-width: 768px) 46vw, 92vw",
  className = "",
}: {
  id: CommonGroundAssetId;
  label: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <a
        href={publicPath(assets[id].full)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-32 items-center justify-center overflow-hidden border border-sage-300/50 bg-white p-4 focus-visible:outline-offset-4"
        aria-label={`Open high-resolution image: ${label}`}
      >
        <CommonGroundImage id={id} alt={alt} sizes={sizes} className="block h-auto max-h-[620px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none" />
      </a>
      <figcaption className="mt-3 font-display text-base text-ink-soft">{label}</figcaption>
    </figure>
  );
}
