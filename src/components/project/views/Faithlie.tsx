import type { Project } from "@/content/portfolio";
import { faithlieAnatomy } from "@/content/buildups";
import { Opener } from "../Opener";
import { Anatomy } from "../Anatomy";
import { FaithlieCarbon } from "../FaithlieCarbon";
import { FaithlieSections } from "../FaithlieSections";

const drawingImages = {
  "fc-detail-parapet": {
    src: "/faithlie/submission/construction/parapet.webp", width: 2073, height: 1500,
    alt: "Faithlie Centre parapet construction drawing", caption: "Parapet detail / roof and external wall",
  },
  "fc-detail-floor": {
    src: "/faithlie/submission/construction/floor.webp", width: 2073, height: 1350,
    alt: "Faithlie Centre separating floor construction drawing", caption: "Separating floor detail",
  },
  "fc-detail-foundation": {
    src: "/faithlie/submission/construction/foundation.webp", width: 2073, height: 1828,
    alt: "Faithlie Centre foundation construction drawing", caption: "Ground floor and foundation detail",
  },
} as const;

export function Faithlie({ project }: { project: Project }) {
  return <>
    <Opener project={project} introduction={project.paragraphs} />
    <FaithlieSections construction={<div id="faithlie-construction" className="scroll-mt-32">
      <Anatomy
        tone="dark"
        label="Construction"
        title="Parapet, floors and foundations"
        intro="The submitted details are paired with scale build-ups. Select a component or scroll through the assembly to read its layers and dimensions."
        steps={faithlieAnatomy}
        drawingImages={drawingImages}
        showDetailThumbs={false}
      />
    </div>} carbon={<FaithlieCarbon />} />
  </>;
}
