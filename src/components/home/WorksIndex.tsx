import Link from "next/link";
import Image from "next/image";
import { Picture } from "@/components/Picture";
import { projects } from "@/content/portfolio";

const projectsByYear = [...projects].sort(
  (a, b) => Number(b.years.slice(0, 4)) - Number(a.years.slice(0, 4)),
);

export function WorksIndex() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-cream paper-grain pb-28 pt-20 md:pb-40 md:pt-28">
      <div className="shell">
        <div className="border-t border-sage-300/60 pt-8">
          <h2 id="work-title" className="flex items-center gap-3 font-mono text-lg uppercase tracking-[0.14em] text-sage-700 sm:text-xl">
            <span aria-hidden className="h-px w-12 bg-sage-500" />
            Projects
          </h2>
          <p className="t-body mt-8 max-w-3xl">
            A curated selection of my architectural and design work, spanning from studio projects from the University of Dundee to commercial projects developed during my placement at Design Concepts in Dubai.
          </p>
        </div>

        <ul className="mt-10 space-y-6 md:mt-12 md:space-y-10">
          {projectsByYear.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}/`}
                className="group relative block min-h-[290px] overflow-hidden bg-ink text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-700 md:min-h-[230px]"
              >
                {p.slug === "common-ground" ? (
                  <Image
                    src="/common-ground/long-section-index.webp"
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1440px) 1330px, 100vw"
                  className="object-cover object-center opacity-90 contrast-[1.15] transition-opacity duration-700 ease-[var(--ease-expo)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  />
                ) : (
                  <Picture
                    id={p.indexImage}
                    sizes="(min-width: 1440px) 1330px, 100vw"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-700 ease-[var(--ease-expo)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  />
                )}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30 md:bg-gradient-to-r md:from-ink/85 md:via-ink/50 md:to-ink/5" />
                <span className="relative z-10 flex min-h-[290px] flex-col justify-between p-5 transition-[min-height] duration-700 ease-[var(--ease-expo)] group-hover:min-h-[410px] group-focus-visible:min-h-[410px] sm:p-6 md:min-h-[230px] md:group-hover:min-h-[390px] md:group-focus-visible:min-h-[390px] md:p-7 motion-reduce:transition-none">
                  <span className="font-mono text-xl leading-none tracking-[0.04em] text-sage-50 sm:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
                    <span className="block max-w-2xl">
                      <span className="block font-display text-[clamp(1.65rem,2.6vw,2.6rem)] font-light leading-none">
                        {p.title}
                      </span>
                      <span className="mt-3 block max-w-xl text-[15px] leading-snug text-sage-50/90 md:text-base">
                        {p.subtitle}
                      </span>
                      <span className="t-label mt-3 inline-flex items-center gap-2 border-b border-sage-100/60 pb-1">
                        Open project
                        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
                          <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </span>
                    </span>
                    <span className={`flex shrink-0 flex-wrap justify-end gap-x-3 gap-y-1 self-end text-right font-mono text-xs tracking-[0.08em] ${p.slug === "common-ground" ? "text-sage-50/85 md:text-ink/85" : "text-sage-50/85"}`}>
                      <span>{p.years}</span>
                      {p.stage.startsWith("Year ") && <span>{p.stage.split(" / ")[0]}</span>}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
