import type { Project } from "@/content/portfolio";
import { faithlieAnatomy } from "@/content/buildups";
import type { ImageId } from "@/content/images";
import { Figure } from "@/components/Figure";
import { FigureRow } from "@/components/FigureRow";
import { SectionLabel } from "@/components/SectionLabel";
import { Opener } from "../Opener";
import { Story } from "../Story";
import { Anatomy } from "../Anatomy";
import { CarbonSum } from "../CarbonSum";

export function Faithlie({ project }: { project: Project }) {
  const [p1, p2] = project.paragraphs;
  const hero: ImageId[] = ["fc-photo", "fc-model-1", "fc-corten"];
  return (
    <>
      <Opener
        project={project}
        hero={
          <div className="grid grid-cols-3 items-end gap-3 md:gap-6">
            {hero.map((id, i) => (
              <Figure key={id} id={id} group={hero} priority={i < 2} sizes="(min-width: 1440px) 430px, 31vw" caption={false} />
            ))}
          </div>
        }
      />
      <Story
        label="Tectonics"
        beats={[
          {
            text: p1,
            visual: <FigureRow ids={["fc-model-3", "fc-model-4", "fc-model-2"]} sizes="(min-width: 768px) 30vw, 45vw" />,
          },
          { text: p2, visual: <Figure id="fc-exploded" sizes="(min-width: 768px) 55vw, 92vw" /> },
        ]}
      />
      <Anatomy
        tone="dark"
        label="Construction"
        title="Parapet, floors and foundations"
        intro="The precedent's construction, redrawn to scale layer by layer from the detail drawings."
        steps={faithlieAnatomy}
      />
      <section aria-labelledby="carbon-title" className="bg-paper py-28 md:py-40">
        <div className="shell grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Embodied carbon</SectionLabel>
            <h2 id="carbon-title" className="t-display mt-8 text-[clamp(2.4rem,4.4vw,4rem)] text-ink">
              Retained fabric, less demolition
            </h2>
            <p className="t-body mt-6 max-w-md">
              The centre sits within a conservation area and retains much of the existing fabric, reducing demolition and embodied carbon.
            </p>
            <Figure id="fc-corten" className="mt-10 max-w-[300px]" sizes="300px" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <CarbonSum />
          </div>
        </div>
      </section>
    </>
  );
}
