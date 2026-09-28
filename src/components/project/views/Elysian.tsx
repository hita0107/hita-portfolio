import type { Project } from "@/content/portfolio";
import { elysianDetails } from "@/content/buildups";
import type { ImageId } from "@/content/images";
import { Figure } from "@/components/Figure";
import { SectionLabel } from "@/components/SectionLabel";
import { Opener } from "../Opener";
import { Story } from "../Story";
import { FullBleed } from "../FullBleed";
import { HGallery } from "../HGallery";

const STUDIES: ImageId[] = ["ea-study-cafe", "ea-study-office", "ea-study-shared", "ea-study-private", "ea-study-glass", "ea-study-curved"];
const DETAILS: ImageId[] = ["ea-wallsection", "ea-detail-base", "ea-detail-floor"];

export function Elysian({ project }: { project: Project }) {
  const [p1, p2, p3] = project.paragraphs;
  return (
    <>
      <Opener project={project} hero={<Figure id="ea-courtyard" sizes="(min-width: 1440px) 1330px, 94vw" priority caption={false} />} />
      <Story
        label="Productive landscape"
        side="left"
        beats={[
          { text: p1, visual: <Figure id="ea-siteplan" className="mx-auto max-w-[680px]" sizes="(min-width: 768px) 680px, 92vw" /> },
          {
            text: p2,
            visual: (
              <div className="grid grid-cols-2 items-center gap-6">
                <Figure id="ea-farm" group={["ea-farm", "ea-concept"]} sizes="(min-width: 768px) 27vw, 45vw" />
                <Figure id="ea-concept" group={["ea-farm", "ea-concept"]} className="bg-white p-3" sizes="(min-width: 768px) 27vw, 45vw" />
              </div>
            ),
          },
          {
            text: p3,
            visual: (
              <div className="grid grid-cols-[0.8fr_1fr] items-end gap-6">
                <Figure id="ea-wallsection" group={DETAILS} sizes="(min-width: 768px) 24vw, 40vw" />
                <div className="grid gap-6">
                  <Figure id="ea-elevation-1" group={["ea-elevation-1", "ea-elevation-2"]} sizes="(min-width: 768px) 32vw, 50vw" />
                  <Figure id="ea-elevation-2" group={["ea-elevation-1", "ea-elevation-2"]} sizes="(min-width: 768px) 32vw, 50vw" />
                </div>
              </div>
            ),
          },
        ]}
      />
      <FullBleed id="ea-balconies" label="Shared space, greenery and vertical living" note="Informed by the Greek polykatoikia" />
      <HGallery
        label="Drawings"
        title="Plans"
        intro="Teardrop-shaped blocks around shared courtyards, with growing space built into the floor plates and green roofs above."
        height={440}
        groups={[
          { label: "Site plan", items: ["ea-plan-site"] },
          { label: "Floor plans", items: ["ea-plan-a", "ea-plan-b"] },
          { label: "Roof and landscape", items: ["ea-landscape"] },
        ]}
      />

      <section aria-labelledby="details-title" className="bg-paper py-28 md:py-36">
        <div className="shell">
          <SectionLabel>Construction</SectionLabel>
          <h2 id="details-title" className="t-display mt-8 max-w-3xl text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
            CLT and glulam on concrete
          </h2>
          <div className="mt-14 grid gap-14 md:grid-cols-2">
            {elysianDetails.map((d) => (
              <div key={d.title} className="grid grid-cols-[minmax(0,240px)_1fr] items-start gap-8">
                <Figure id={d.image} group={DETAILS} className="bg-white p-3" sizes="240px" />
                <div>
                  <h3 className="font-display text-xl text-ink">{d.title}</h3>
                  <ol className="mt-4 space-y-1.5">
                    {d.items.map((it, i) => (
                      <li key={it} className="grid grid-cols-[1.5rem_1fr] text-[15px] text-ink-soft">
                        <span className="font-mono text-[11px] leading-6 text-sage-700">{i + 1}</span>
                        {it}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="spaces-title" className="bg-cream paper-grain py-28 md:py-36">
        <div className="shell grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Spaces</SectionLabel>
            <h2 id="spaces-title" className="t-display mt-8 text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
              Spatial studies
            </h2>
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {STUDIES.map((id) => (
                <li key={id}>
                  <Figure id={id} group={STUDIES} className="bg-white p-3" sizes="170px" />
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 items-end gap-6 md:col-span-6 md:col-start-7">
            <Figure id="ea-facade" group={["ea-facade", "ea-bedroom"]} sizes="(min-width: 768px) 25vw, 45vw" />
            <Figure id="ea-bedroom" group={["ea-facade", "ea-bedroom"]} sizes="(min-width: 768px) 25vw, 45vw" />
          </div>
        </div>
      </section>

      <HGallery
        label="Physical model"
        title="Model making"
        height={380}
        groups={[{ label: "Model", items: ["ea-model-1", "ea-model-2", "ea-model-3", "ea-model-4", "ea-sketch"] }]}
      />
    </>
  );
}
