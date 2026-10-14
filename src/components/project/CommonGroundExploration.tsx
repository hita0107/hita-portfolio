import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";

const diagrams = [
  {
    title: "Sociable activities",
    description: "Shows the key sociable spaces where connections can occur.",
    src: "/common-ground/exploration/sociable-activities.png",
    full: "/common-ground/exploration/sociable-activities.png",
    alt: "Activities diagram connecting learning, activity and social connection to uses including library, cooking, sports and farming.",
    width: 3544,
    height: 3544,
  },
  {
    title: "Proximity map",
    description: "Explores how each space can be shared through overlap or close proximity.",
    src: "/common-ground/exploration/proximity-map.webp",
    full: "/common-ground/exploration/proximity-map.pdf",
    alt: "Proximity matrix showing which Common Ground rooms connect directly and which need to be near one another.",
    width: 1984,
    height: 1404,
  },
  {
    title: "Light and access",
    description: "Provides a guideline for implementing the project on different sites.",
    src: "/common-ground/exploration/light-proximity.png",
    full: "/common-ground/exploration/light-proximity.png",
    alt: "Light and access diagram positioning Common Ground spaces between artificial and natural light, and outdoor and restricted access.",
    width: 3544,
    height: 3544,
  },
  {
    title: "Bubble diagram",
    description: "Shows how different garden spaces can connect the surrounding spaces.",
    src: "/common-ground/exploration/bubble-diagram.png",
    full: "/common-ground/exploration/bubble-diagram.png",
    alt: "Overlapping programme bubbles showing relationships between growing, sensory garden, activity, commons and supervised play spaces.",
    width: 3544,
    height: 3544,
  },
] as const;

export function CommonGroundExploration() {
  return (
    <section id="cg-exploration" aria-label="Exploration" className="scroll-mt-28 bg-white py-12 md:py-16">
      <div className="shell">
        <SectionLabel>Exploration</SectionLabel>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {diagrams.map((diagram) => (
            <a
              key={diagram.title}
              href={diagram.full}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open full-resolution ${diagram.title} diagram`}
              className="group min-w-0 border border-sage-300/70 bg-white p-3 transition-[border-color,background-color,box-shadow] duration-300 hover:border-sage-700 hover:bg-sage-50/60 hover:shadow-md focus-visible:border-sage-700 focus-visible:outline-offset-4 sm:p-4"
            >
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-white sm:h-44 lg:h-48">
                <Image
                  src={diagram.src}
                  alt={diagram.alt}
                  width={diagram.width}
                  height={diagram.height}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 44vw, 44vw"
                  className="block h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.08] group-focus-visible:scale-[1.08] motion-reduce:transition-none"
                  unoptimized
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-white/95 p-3 text-xs leading-relaxed text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                  {diagram.description}
                </span>
              </div>
              <p className="t-label mt-4 text-sage-700">{diagram.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft md:hidden">{diagram.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
