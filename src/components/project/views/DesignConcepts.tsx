import type { Project } from "@/content/portfolio";
import type { ImageId } from "@/content/images";
import { Figure } from "@/components/Figure";
import { Picture } from "@/components/Picture";
import { SectionLabel } from "@/components/SectionLabel";
import { Opener } from "../Opener";

const HERO: ImageId[] = ["tower-render", "jss-facade", "villa-front"];
const JSS_DRAWINGS: ImageId[] = ["jss-plan", "jss-sheet-sections", "jss-sheet-elevations"];
const JSS_RENDERS: ImageId[] = ["jss-entrance", "jss-field", "jss-facade"];
const VILLA: ImageId[] = ["villa-front", "villa-entrance", "villa-courtyard", "villa-plan"];
const TOWER: ImageId[] = ["tower-render", "tower-plan", "tower-street"];

function Heading({ title, place, extra }: { title: string; place: string; extra?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sage-300/70 pb-6">
      <div>
        <h2 className="t-display text-[clamp(2.2rem,4.2vw,3.8rem)] text-ink">{title}</h2>
        <p className="t-label mt-3 text-sage-700">{place}</p>
      </div>
      {extra}
    </div>
  );
}

export function DesignConcepts({ project }: { project: Project }) {
  return (
    <>
      <Opener
        project={project}
        hero={
          <div className="grid grid-cols-[0.62fr_1fr_1fr] items-end gap-3 md:gap-6">
            {HERO.map((id, i) => (
              <Figure key={id} id={id} group={HERO} priority={i === 0} sizes="(min-width: 1440px) 480px, 33vw" caption={false} />
            ))}
          </div>
        }
      />

      <section aria-label="Work experience" className="bg-paper py-24 md:py-32">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel>In practice</SectionLabel>
            <div className="mt-10 w-[180px]">
              <Picture id="dc-logo" sizes="180px" className="block h-auto w-full" />
            </div>
          </div>
          <div className="space-y-6 md:col-span-7 md:col-start-5">
            {project.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-[clamp(1.35rem,2vw,1.8rem)] font-light leading-snug text-ink" : "t-body"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="JSS Private School" className="bg-cream paper-grain py-24 md:py-32">
        <div className="shell">
          <Heading
            title="JSS Private School"
            place="Dubai, United Arab Emirates"
            extra={
              <div className="flex items-center gap-4">
                <p className="t-label text-right text-ink-soft">
                  Tender drawings
                  <br />
                  Issued 26.08.2024
                </p>
                <div className="w-14">
                  <Picture id="jss-logo" sizes="56px" className="block h-auto w-full" />
                </div>
              </div>
            }
          />
          <p className="t-label mt-10 flex items-center gap-3 text-sage-700">
            <span aria-hidden className="h-px w-8 bg-sage-500" />
            Vector drawings. Open one and zoom in to read the tender set.
          </p>
          <Figure id="jss-plan" group={JSS_DRAWINGS} className="mt-6 bg-white p-4 md:p-6" sizes="(min-width: 1440px) 1330px, 94vw" />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Figure id="jss-sheet-sections" group={JSS_DRAWINGS} className="bg-white p-4" sizes="(min-width: 768px) 46vw, 94vw" />
            <Figure id="jss-sheet-elevations" group={JSS_DRAWINGS} className="bg-white p-4" sizes="(min-width: 768px) 46vw, 94vw" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {JSS_RENDERS.map((id) => (
              <Figure key={id} id={id} group={JSS_RENDERS} sizes="(min-width: 640px) 31vw, 94vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Luxury Villa" className="bg-paper py-24 md:py-32">
        <div className="shell">
          <Heading title="Luxury Villa" place="Abu Dhabi, United Arab Emirates" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {VILLA.map((id) => (
              <Figure key={id} id={id} group={VILLA} className={id === "villa-plan" ? "bg-white p-3" : ""} sizes="(min-width: 768px) 46vw, 94vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Multi-storey Residential Building" className="bg-cream paper-grain py-24 md:py-32">
        <div className="shell">
          <Heading title="Multi-storey Residential Building" place="Dubai, United Arab Emirates" />
          <div className="mt-10 grid items-end gap-6 md:grid-cols-12">
            <Figure id="tower-render" group={TOWER} className="md:col-span-5" sizes="(min-width: 768px) 38vw, 94vw" />
            <div className="grid gap-6 md:col-span-7">
              <Figure id="tower-plan" group={TOWER} className="bg-white p-3" sizes="(min-width: 768px) 54vw, 94vw" />
              <Figure id="tower-street" group={TOWER} sizes="(min-width: 768px) 54vw, 94vw" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
