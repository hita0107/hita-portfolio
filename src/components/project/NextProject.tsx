import Link from "next/link";
import Image from "next/image";
import { Picture } from "@/components/Picture";
import type { Project } from "@/content/portfolio";

export function NextProject({ next }: { next: Project; white?: boolean }) {
  return (
    <section className="bg-ink">
      <Link href={`/work/${next.slug}/`} className="group relative flex min-h-[70svh] overflow-hidden text-white">
        {next.indexSrc ? (
          <Image src={next.indexSrc} alt="" fill unoptimized sizes="100vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
        ) : (
          <Picture id={next.indexImage} sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
        <div className="shell relative flex flex-1 flex-col justify-between py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[.2em]">Next project / {next.number.padStart(2, "0")}</p>
          <div>
            <p className="font-display text-[clamp(4.5rem,10vw,12rem)] leading-[.78] tracking-[-.055em]">{next.title}</p>
            <div className="mt-7 flex flex-wrap items-end justify-between gap-5 text-[13px]">
              <span className="max-w-xl text-white/85">{next.subtitle}</span>
              <span className="editorial-link pb-1 uppercase tracking-[.14em]">Explore project ↗</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
