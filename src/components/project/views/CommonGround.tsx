import type { Project } from "@/content/portfolio";
import { commonGroundAnatomy } from "@/content/buildups";
import { Figure } from "@/components/Figure";
import { Opener } from "../Opener";
import { Story } from "../Story";
import { AnnotatedAxo } from "../AnnotatedAxo";
import { HGallery } from "../HGallery";
import { Anatomy } from "../Anatomy";

export function CommonGround({ project }: { project: Project }) {
  const [p1, p2, p3] = project.paragraphs;
  return (
    <>
      <Opener project={project} hero={<Figure id="cg-section-library" sizes="(min-width: 1440px) 1330px, 94vw" priority caption={false} />} />
      <Story
        label="Encounter"
        beats={[
          { text: p1, visual: <Figure id="cg-sitemap" sizes="(min-width: 768px) 55vw, 92vw" /> },
          { text: p2, visual: <AnnotatedAxo /> },
          {
            text: p3,
            visual: (
              <div className="grid grid-cols-2 gap-6">
                <Figure id="cg-plan-1" group={["cg-plan-1", "cg-plan-2"]} sizes="(min-width: 768px) 27vw, 45vw" />
                <Figure id="cg-plan-2" group={["cg-plan-1", "cg-plan-2"]} sizes="(min-width: 768px) 27vw, 45vw" />
              </div>
            ),
          },
        ]}
      />
      <HGallery
        label="Rooms in use"
        title="Learning, recreation, wellbeing and community"
        intro="The hybrid programme in use: the library, the multipurpose hall, the community kitchen and the greenhouse, in plans and renders."
        groups={[
          { label: "Library", items: ["cg-plan-library", "cg-study-1", "cg-staircase", "cg-study-2"] },
          { label: "Multi-Purpose Hall", items: ["cg-plan-hall", "cg-hall-1", "cg-hall-2", "cg-hall-3"] },
          { label: "Hybrid programme", items: ["cg-plan-11a", "cg-yoga", "cg-art", "cg-aerial", "cg-plan-11b", "cg-greenhouse", "cg-kitchen", "cg-cooking"] },
        ]}
      />
      <Anatomy
        label="Construction"
        title="Detail sections"
        intro="Four build-ups from the hall and library sections, drawn to scale from the specification. Pick a marker on the section, or keep scrolling."
        steps={commonGroundAnatomy}
      />
    </>
  );
}
