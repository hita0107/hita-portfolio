import type { Metadata } from "next";
import { nextProject, projectBySlug, projects, type Project, type ProjectSlug } from "@/content/portfolio";
import { ProjectBar } from "@/components/project/ProjectBar";
import { NextProject } from "@/components/project/NextProject";
import { Contact } from "@/components/Contact";
import { CommonGround } from "@/components/project/views/CommonGround";
import { Faithlie } from "@/components/project/views/Faithlie";
import { Verdant } from "@/components/project/views/Verdant";
import { Elysian } from "@/components/project/views/Elysian";
import { DesignConcepts } from "@/components/project/views/DesignConcepts";

export const dynamicParams = false;

const VIEWS: Record<ProjectSlug, (props: { project: Project }) => React.ReactNode> = {
  "common-ground": CommonGround,
  "faithlie-centre": Faithlie,
  "verdant-theatre": Verdant,
  "elysian-arcadia": Elysian,
  "design-concepts": DesignConcepts,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  return { title: p.title, description: `${p.title}: ${p.subtitle}. ${p.stage}.` };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  const next = nextProject(project.slug);
  const View = VIEWS[project.slug];
  return (
    <>
      <ProjectBar project={project} next={next} />
      <main>
        <View project={project} />
        <NextProject next={next} />
      </main>
      <Contact />
    </>
  );
}
