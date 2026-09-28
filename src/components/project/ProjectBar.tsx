import Link from "next/link";
import type { Project } from "@/content/portfolio";

export function ProjectBar({ project, next }: { project: Project; next: Project }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sage-300/40 bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-14 items-center justify-between gap-6">
        <Link href="/" className="font-display text-[1.05rem] text-ink transition-colors hover:text-sage-700">
          Hita Shah
        </Link>
        <p className="t-label hidden text-ink-soft sm:block">
          <span className="text-sage-700">{project.number.padStart(2, "0")}</span>
          <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-sage-300" aria-hidden />
          {project.title}
        </p>
        <nav aria-label="Project" className="flex items-center gap-5">
          <Link href="/#work" className="t-label text-ink-soft transition-colors hover:text-ink">
            Index
          </Link>
          <Link href={`/work/${next.slug}/`} className="t-label inline-flex items-center gap-2 text-ink transition-colors hover:text-sage-700">
            Next
            <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
              <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
