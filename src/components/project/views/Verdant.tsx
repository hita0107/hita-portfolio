import type { Project } from "@/content/portfolio";
import { verdantSpecs } from "@/content/buildups";
import type { ImageId } from "@/content/images";
import { Figure } from "@/components/Figure";
import { SectionLabel } from "@/components/SectionLabel";
import { Opener } from "../Opener";
import { Story } from "../Story";
import { ProgrammeDiagram } from "../ProgrammeDiagram";
import { StepSequence } from "../StepSequence";

const MAPS: ImageId[] = ["vt-map-location", "vt-map-context", "vt-map-movement", "vt-map-climate"];
const FORMS: ImageId[] = ["vt-form-1", "vt-form-2", "vt-form-3"];
const FOYER: ImageId[] = ["vt-foyer-1", "vt-foyer-2"];

export function Verdant({ project }: { project: Project }) {
  const [p1, p2, p3, p4] = project.paragraphs;
  return (
    <>
      <Opener project={project} hero={<Figure id="vt-auditorium" sizes="(min-width: 1440px) 1330px, 94vw" priority caption={false} />} />
      <Story
        label="Performance"
        beats={[
          {
            text: p1,
            visual: (
              <div>
                <ProgrammeDiagram />
                <p className="t-label mt-5 text-ink-soft">Programme</p>
              </div>
            ),
          },
          {
            text: p2,
            visual: (
              <div className="grid grid-cols-2 gap-4">
                {FOYER.map((id) => (
                  <Figure key={id} id={id} group={FOYER} sizes="(min-width: 768px) 27vw, 45vw" />
                ))}
              </div>
            ),
          },
          { text: p3, visual: <Figure id="vt-sketch" sizes="(min-width: 768px) 55vw, 92vw" /> },
          { text: p4, visual: <Figure id="vt-castle" className="mx-auto max-w-[640px]" sizes="(min-width: 768px) 640px, 92vw" /> },
        ]}
      />

      <section aria-labelledby="site-title" className="bg-cream paper-grain py-28 md:py-36">
        <div className="shell">
          <SectionLabel>Site analysis</SectionLabel>
          <h2 id="site-title" className="t-display mt-8 max-w-3xl text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
            Historic context and dramatic level changes
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {MAPS.map((id) => (
              <Figure key={id} id={id} group={MAPS} className="bg-white p-3" sizes="(min-width: 640px) 46vw, 92vw" />
            ))}
          </div>
        </div>
      </section>

      <StepSequence label="Design moves" title="Massing" items={["vt-massing-1", "vt-massing-2", "vt-massing-3", "vt-massing-4", "vt-massing-5"]} />

      <section aria-labelledby="form-title" className="bg-paper pb-28 pt-8 md:pb-36">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionLabel>Form</SectionLabel>
            <h2 id="form-title" className="t-display mt-8 text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
              A ramp from ground to roof
            </h2>
            <Figure id="vt-exploded" className="mt-12 max-w-[640px]" sizes="(min-width: 768px) 640px, 92vw" />
          </div>
          <ol className="grid content-start gap-10 md:col-span-4">
            {FORMS.map((id, i) => (
              <li key={id}>
                <p className="font-mono text-xs text-sage-700">{String(i + 1).padStart(2, "0")}</p>
                <Figure id={id} group={FORMS} className="mt-3 max-w-[340px]" sizes="340px" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="section-title" className="bg-cream paper-grain py-28 md:py-36">
        <div className="shell">
          <SectionLabel>Section</SectionLabel>
          <h2 id="section-title" className="t-display mt-8 text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
            Sightlines, acoustics and timber
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Figure id="vt-section" className="lg:col-span-8" sizes="(min-width: 1024px) 60vw, 92vw" />
            <dl className="grid content-start gap-7 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {verdantSpecs.map((s) => (
                <div key={s.title}>
                  <dt className="font-display text-lg text-ink">{s.title}</dt>
                  <dd className="mt-2">
                    <ul className="space-y-0.5 text-[14px] leading-snug text-ink-soft">
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
