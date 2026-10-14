import Link from "next/link";
import type { Project } from "@/content/portfolio";
import { CommonGroundProgress } from "./CommonGroundProgress";

export function ProjectBar({ project, next }: { project: Project; next: Project }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-sage-300/40 backdrop-blur-md ${project.slug === "common-ground" ? "bg-cream paper-grain" : "bg-paper/85"}`}>
      <div className="shell flex h-14 items-center justify-between gap-2 sm:gap-6">
        <Link href="/" className="shrink-0 whitespace-nowrap font-display text-[0.9rem] text-ink transition-colors hover:text-sage-700 sm:text-[1.05rem]">
          Hita Shah
        </Link>
        <p className={`min-w-0 flex-1 truncate text-center font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft sm:flex-none sm:text-[11px] sm:tracking-[0.14em] ${project.slug === "common-ground" ? "block" : "hidden sm:block"}`}>
          <span className="hidden text-sage-700 sm:inline">{project.number.padStart(2, "0")}</span>
          <span className="mx-3 hidden h-px w-8 translate-y-[-3px] bg-sage-300 sm:inline-block" aria-hidden />
          {project.title}
        </p>
        <nav aria-label="Project" className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link href="/work/" className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink sm:text-[11px] sm:tracking-[0.14em]">
            Index
          </Link>
          <Link href={`/work/${next.slug}/`} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ink transition-colors hover:text-sage-700 sm:text-[11px] sm:tracking-[0.14em]">
            Next
            <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
              <path d="M9 1l4 4-4 4M13 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </nav>
      </div>
      {project.slug === "common-ground" && <CommonGroundProgress />}
    </header>
  );
}
