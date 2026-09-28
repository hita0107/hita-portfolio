import { SectionLabel } from "@/components/SectionLabel";
import { certifications, recognition, software } from "@/content/portfolio";

function Ledger({ title, rows }: { title: string; rows: { title: string; org: string; years: string }[] }) {
  return (
    <div>
      <h3 className="t-label text-sage-700">{title}</h3>
      <ul className="mt-2 border-t border-sage-300/60">
        {rows.map((r) => (
          <li key={r.title} className="flex items-start justify-between gap-6 border-b border-sage-300/60 py-4">
            <span>
              <span className="block font-display text-[1.1rem] leading-snug text-ink">{r.title}</span>
              <span className="mt-1 block text-[14px] text-ink-soft">{r.org}</span>
            </span>
            <span className="shrink-0 font-mono text-[13px] text-ink">{r.years}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-paper py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionLabel>Skills</SectionLabel>
            <h2 id="skills-title" className="t-display mt-8 text-[clamp(2.8rem,6vw,5rem)] text-ink">
              Software
            </h2>
          </div>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-y-10 border-t border-sage-300/60 pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {software.map((g) => (
            <li key={g.group} className="border-l border-sage-300 pl-5 pr-3">
              <h3 className="t-label text-sage-700">{g.group}</h3>
              <ul className="mt-4 space-y-1.5">
                {g.tools.map((t) => (
                  <li key={t} className="font-display text-[1.15rem] leading-snug text-ink">
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
      </div>
    </section>
  );
}
