import type { Project } from "@/content/portfolio";
import { Opener } from "../Opener";
import { ElysianSections } from "../ElysianSections";

export function Elysian({ project }: { project: Project }) {
  return <>
    <Opener project={project} introduction={project.paragraphs} />
    <ElysianSections />
  </>;
}
