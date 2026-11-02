import type { Project } from "@/content/portfolio";
import { CommonGroundProgress } from "./CommonGroundProgress";
import { FaithlieProgress } from "./FaithlieProgress";
import { ElysianProgress } from "./ElysianProgress";
import { VerdantProgress } from "./VerdantProgress";
import { MobileSectionRail } from "./MobileSectionRail";
import { SimpleProjectProgress } from "./SimpleProjectProgress";

const otherStages = {
  "rooms-cities": [{ label: "Neighbourhood atlas", id: "rooms-cities-atlas" }],
  "jss-private-school": [
    { label: "Visualisations", id: "jss-visualisations" },
    { label: "Floor plans", id: "jss-plans" },
    { label: "Elevations + sections", id: "jss-sections" },
    { label: "Landscape", id: "jss-landscape" },
  ],
  "luxury-villa": [
    { label: "Visualisations", id: "villa-visualisations" },
    { label: "Floor plans", id: "villa-plans" },
    { label: "Elevations + sections", id: "villa-sections" },
  ],
  "conceptual-multistorey": [
    { label: "Visualisations", id: "furjan-visualisations" },
    { label: "Floor plans", id: "furjan-plans" },
  ],
} as const;

export function ProjectBar({ project }: { project: Project; next: Project }) {
  const hasProgress = project.slug === "common-ground" || project.slug === "faithlie-centre" || project.slug === "elysian-arcadia" || project.slug === "verdant-theatre";
  return <div className={`fixed inset-x-0 top-16 z-40 border-b editorial-line bg-white/95 backdrop-blur-sm md:top-20 ${project.slug === "verdant-theatre" ? "bg-white" : ""}`}>
    <div className="flex items-stretch">
    <div className="min-w-0 flex-1">{hasProgress
      ? project.slug === "common-ground" ? <CommonGroundProgress /> : project.slug === "faithlie-centre" ? <FaithlieProgress /> : project.slug === "verdant-theatre" ? <VerdantProgress /> : <ElysianProgress />
      : <SimpleProjectProgress stages={otherStages[project.slug as keyof typeof otherStages]} />}</div>
    <div className="w-[72px] shrink-0 border-l border-sage-300/60 sm:hidden"><MobileSectionRail /></div>
    </div>
  </div>;
}
