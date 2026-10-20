import type { Project } from "@/content/portfolio";
import Image from "next/image";
import { Opener } from "../Opener";
import { CommonGroundSite, CommonGroundConstruction } from "../CommonGroundVisuals";
import { CommonGroundExploration } from "../CommonGroundExploration";
import { CommonGroundResearch } from "../CommonGroundResearch";
import { CommonGroundFinal } from "../CommonGroundFinal";
import { CommonGroundScrollMotion } from "../CommonGroundScrollMotion";
import { CommonGroundRooms } from "../CommonGroundRooms";
import { CommonGroundGardens } from "../CommonGroundGardens";
import { CommonGroundAxonometric } from "../CommonGroundAxonometric";

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
        <CommonGroundResearch />
        <CommonGroundSite />
        <CommonGroundExploration />
        <CommonGroundRooms programme={programme} />
        <CommonGroundGardens />
        <CommonGroundFinal />
        <CommonGroundConstruction />
        <CommonGroundAxonometric />
      </CommonGroundScrollMotion>
    </>
  );
}
