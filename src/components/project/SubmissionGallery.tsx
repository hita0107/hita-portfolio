import submissions from "@/content/submissions.json";
import { publicPath, publicSrcSet } from "@/lib/publicPath";

type Group = keyof typeof submissions;

type Props = {
  group: Group;
  embedded?: boolean;
  white?: boolean;
  id?: string;
};

function Gallery({ group }: { group: Group }) {
  return (
    <div className="border-t border-sage-300/70 pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-label text-sage-700">Final submission</p>
          <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight text-ink">
            Drawings and renders
          </h3>
        </div>
        <p className="text-sm text-ink-soft">Open a plate for a larger, high-resolution view.</p>
      </div>
      <div className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {submissions[group].map((item) => (
          <figure key={item.id}>
            <a
              href={publicPath(item.full)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block cursor-zoom-in overflow-hidden border border-sage-300/40 bg-white p-3 shadow-sm focus-visible:outline-offset-4"
              aria-label={`Open high-resolution image: ${item.label}`}
            >
              <span className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                {/* Responsive WebP files are prebuilt for this static-export site. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={publicPath(item.src)}
                  srcSet={publicSrcSet(item.srcSet)}
                  sizes="(min-width: 1440px) 650px, (min-width: 640px) 46vw, 92vw"
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </span>
            </a>
            <figcaption className="mt-3 font-display text-base text-ink-soft">{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function SubmissionGallery({ group, embedded = false, white = false, id }: Props) {
  if (embedded) {
    return (
      <div className="mt-20">
        <Gallery group={group} />
      </div>
    );
  }

  return (
    <section id={id} aria-label="Final submission drawings and renders" className={`${white ? "bg-white" : "bg-cream paper-grain"} scroll-mt-28 py-24 md:py-32`}>
      <div className="shell">
        <Gallery group={group} />
      </div>
    </section>
  );
}
