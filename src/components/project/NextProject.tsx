import Link from "next/link";
import { Picture } from "@/components/Picture";
import type { Project } from "@/content/portfolio";

export function NextProject({ next }: { next: Project }) {
  return (
    <section className="bg-paper">
      <Link href={`/work/${next.slug}/`} className="group block border-t border-sage-300/70">
        <div className="shell grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <p className="t-label text-sage-700">Next project</p>
            <p className="t-display mt-6 text-[clamp(3rem,8vw,7.5rem)] text-ink transition-colors duration-500 group-hover:text-sage-700">
              {next.title}
            </p>
            <p className="t-body mt-5 max-w-xl">{next.subtitle}</p>
            <p className="t-label mt-8 inline-flex items-center gap-3 text-ink">
              {next.stage}
              <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">
                <path d="M17 1l4 4-4 4M21 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </p>
          </div>
          <div className="overflow-hidden md:col-span-4 md:col-start-9">
            <Picture
              id={next.indexImage}
              sizes="(min-width: 768px) 30vw, 92vw"
              alt=""
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </Link>
    </section>
  );
}
