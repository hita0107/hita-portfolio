import { certifications, recognition, software } from "@/content/portfolio";
import { SectionReveal } from "@/components/motion/SectionReveal";

function Ledger({ title, rows }: { title: string; rows: { title: string; org: string; years: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[.2em] text-ink-soft">{title}</h3>
      <ul className="mt-5 border-t editorial-line">
        {rows.map((r) => (
          <li key={r.title} className="flex items-start justify-between gap-6 border-b editorial-line py-5">
            <span>
              <span className="block text-[15px] leading-snug text-ink">{r.title}</span>
              <span className="mt-1 block text-[14px] text-ink-soft">{r.org}</span>
            </span>
            <span className="shrink-0 text-[12px] text-ink-soft">{r.years}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 bg-cream pb-28 pt-20 md:pb-36 md:pt-28">
      <SectionReveal className="shell">
        <h2 id="skills-title" className="text-[11px] uppercase tracking-[.2em] text-ink-soft">Software & skills</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-12 border-t editorial-line pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {software.map((g) => (
            <li key={g.group} className="border-l editorial-line pl-5 pr-3">
              <h3 className="text-[11px] uppercase tracking-[.14em] text-ink-soft">{g.group}</h3>
              <ul className="mt-5 space-y-2">
                {g.tools.map((t) => (
                  <li key={t} className="text-[15px] leading-snug text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-24 grid gap-16 md:grid-cols-2">
          <Ledger title="Certification" rows={certifications} />
          <Ledger title="Volunteering & Publications" rows={recognition} />
        </div>
      </SectionReveal>
    </section>
  );
}
