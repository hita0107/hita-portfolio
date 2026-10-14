import type { Project } from "@/content/portfolio";
import Image from "next/image";
import { commonGroundAnatomy } from "@/content/buildups";
import { Opener } from "../Opener";
import { CommonGroundSite, CommonGroundConstruction } from "../CommonGroundVisuals";
import { CommonGroundExploration } from "../CommonGroundExploration";
import { CommonGroundScrollMotion } from "../CommonGroundScrollMotion";
import { CommonGroundRooms } from "../CommonGroundRooms";
import { Anatomy } from "../Anatomy";

export function CommonGround({ project }: { project: Project }) {
  const programme = project.paragraphs[1];
  const introduction = [
    project.paragraphs[0],
    "The primary aim was to investigate how architecture can deliberately create conditions of encounter between different groups, cultures and communities. It therefore combines hybrid programme of learning, recreation, wellbeing and community activities including a multipurpose hall, community kitchen, library, sensory room, and more. The three key topics structuring the research are: hybrid programme, biophilic design and phenomenology. Sustainability is embedded within this approach through passive environmental strategies, green roofs, and an integrated greenhouse and the use of renewable timber construction.",
    project.paragraphs[2],
  ];
  return (
    <>
      <Opener
        project={project}
        white
        compactSubtitle
        progressBar
        alignSheetWithTitle
        introduction={introduction}
        sideImage={
          <a
            href="/common-ground/exploration/intro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Common Ground spatial organisation drawing as a PDF"
            className="block"
          >
            <Image
              src="/common-ground/exploration/intro.webp"
              alt="Common Ground spatial organisation drawing showing the network of rooms and circulation paths."
              width={1772}
              height={1772}
              sizes="(min-width: 768px) 30vw, 90vw"
              className="h-auto w-full"
              unoptimized
            />
          </a>
        }
      />
      <CommonGroundScrollMotion>
        <CommonGroundSite />
        <CommonGroundExploration />
        <CommonGroundRooms programme={programme} />
        <CommonGroundConstruction />
      </CommonGroundScrollMotion>
      <Anatomy
        label="Construction details"
        title="Build-ups in section"
        intro="Select a marker on the section, or scroll through the four animated assemblies."
        steps={commonGroundAnatomy}
        white
        showDetailThumbs={false}
        sectionImages={{
          "cg-section-hall": { id: "long-section-hall", caption: "Long section · multipurpose hall" },
          "cg-section-library": { id: "long-section-library", caption: "Long section · library" },
        }}
        hotspotPositions={{
          ground: { x: 0.17, y: 0.86 },
          sprung: { x: 0.63, y: 0.86 },
          "green-roof": { x: 0.48, y: 0.15 },
          "clt-wall": { x: 0.69, y: 0.49 },
        }}
      />
    </>
  );
}
