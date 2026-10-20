import type { Project } from "@/content/portfolio";
import { CommonGroundProgress } from "./CommonGroundProgress";
import { FaithlieProgress } from "./FaithlieProgress";
import { ElysianProgress } from "./ElysianProgress";
import { VerdantProgress } from "./VerdantProgress";

export function ProjectBar({ project }: { project: Project; next: Project }) {
  if (project.slug !== "common-ground" && project.slug !== "faithlie-centre" && project.slug !== "elysian-arcadia" && project.slug !== "verdant-theatre") return null;
  return <div className={`fixed inset-x-0 top-16 z-40 border-b editorial-line md:top-20 ${project.slug === "verdant-theatre" ? "bg-white" : "bg-white/95 backdrop-blur-sm"}`}>
    {project.slug === "common-ground" ? <CommonGroundProgress /> : project.slug === "faithlie-centre" ? <FaithlieProgress /> : project.slug === "verdant-theatre" ? <VerdantProgress /> : <ElysianProgress />}
  </div>;
}
