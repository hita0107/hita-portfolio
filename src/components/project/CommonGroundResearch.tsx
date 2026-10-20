"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import { SectionLabel } from "@/components/SectionLabel";
import images from "@/content/commonGroundSubmission.json";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";
import { CommonGroundScrollStory } from "./CommonGroundScrollStory";

type ImageKey = keyof typeof images;
type Study = { key: ImageKey; title: string; description: string };

const cityStudies: Study[] = [
  { key: "site-analysis/edinburgh-analysis/demographics-length-of-residency", title: "Demographics and residency", description: "Who lives across the city, and how long communities have remained in place." },
  { key: "site-analysis/edinburgh-analysis/deprivation", title: "Deprivation", description: "The uneven social conditions that shape access to shared civic space." },
  { key: "site-analysis/edinburgh-analysis/urban-sprawl", title: "Urban sprawl", description: "How outward growth changes the relationship between neighbourhoods and the city." },
];

const landscapeStudies: Study[] = [
  { key: "site-analysis/edinburgh-analysis/new-folder/land-cover", title: "Land cover", description: "Existing patterns of open and built ground." },
  { key: "site-analysis/edinburgh-analysis/new-folder/river-woodland", title: "River and woodland", description: "The green and blue network that links the study areas." },
  { key: "site-analysis/edinburgh-analysis/new-folder/agriculture", title: "Agricultural land", description: "The working landscape beneath recent expansion." },
  { key: "site-analysis/edinburgh-analysis/new-folder/habitats", title: "Habitats", description: "Ecological areas to protect and connect." },
  { key: "site-analysis/edinburgh-analysis/new-folder/geology", title: "Geology", description: "The ground conditions across the western edge." },
  { key: "site-analysis/edinburgh-analysis/new-folder/noise-pollution", title: "Noise pollution", description: "The acoustic effects of airport and transport infrastructure." },
];

const growthSteps = [
  {
    title: "History of development",
    image: "site-analysis/edinburgh-analysis/history-of-periphery-settlements",
    text: "The suburb began as a retreat from the crowded city for those who could afford it. Industrialisation extended that ambition to a growing middle class, while post-war expansion and car travel carried homes farther from the urban centre.",
    details: [
      ["17th–18th centuries", "An escape from the city, still close enough for work and social life."],
      ["Industrial era", "A wider search for space and cleaner surroundings encourages outward growth."],
      ["Post-war expansion", "Car-led planning spreads development across the periphery."],
    ],
  },
  {
    title: "Peripheral settlements",
    image: "site-analysis/edinburgh-analysis/case-of-peripheral-settlements",
    text: "Housing, shopping and work settle into distinct zones. Detached and semi-detached homes line wide streets; retail parks and office or industrial campuses occupy larger plots, often surrounded by parking.",
    details: [
      ["Residential", "Repeating homes and local schools form self-contained neighbourhoods."],
      ["Commercial", "Large retail buildings and car parks draw activity into separate destinations."],
      ["Work", "Office and industrial parks sit apart from everyday residential life."],
    ],
  },
  {
    title: "Repeated form outcome",
    image: "site-analysis/edinburgh-analysis/landscape-of-repeated-form",
    text: "The result is a landscape of repeated housing plots, large single-use buildings and roads between them. With daily activities separated, there are fewer shared places for unplanned encounters. This is the condition Common Ground responds to: bringing learning, leisure, care and civic life back into proximity.",
    details: [],
  },
] as const;

function imageFor(study: Study): SiteImage {
  return { src: images[study.key].src, title: study.title, alt: `${study.title} site-analysis drawing` };
}

function GrowthStory({ onOpen }: { onOpen: (image: SiteImage) => void }) {
  return (
    <CommonGroundScrollStory heading={
      <div data-cg-heading>
        <SectionLabel>Peripheral development</SectionLabel>
        <h2 id="cg-growth-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">Growth of peripheral developments</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">The research follows how suburban expansion has shaped Edinburgh&apos;s edge, from the idea of leaving the city to the repeated patterns of contemporary development.</p>
      </div>
    }>
      {growthSteps.map((step, index) => {
        const asset = images[step.image];
        return (
          <article key={step.title} data-cg-story-panel className="cg-scroll-panel grid items-center gap-8 border-t border-sage-300/60 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-14 lg:border-0 lg:py-0">
            <div className="max-w-2xl">
              <p className="t-label text-sage-700">0{index + 1} / 03</p>
              <h3 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.6rem)] font-light leading-tight text-ink">{step.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">{step.text}</p>
              {step.details.length > 0 && <div className="mt-7 border-t border-sage-300/60">
                {step.details.map(([label, detail]) => <div key={label} className="grid gap-2 border-b border-sage-300/60 py-3 sm:grid-cols-[135px_1fr] sm:gap-4"><p className="t-label text-sage-700">{label}</p><p className="text-sm leading-relaxed text-ink-soft">{detail}</p></div>)}
              </div>}
            </div>
            <button type="button" onClick={() => onOpen({ src: asset.src, title: step.title, alt: `${step.title} research drawing` })} aria-label={`Enlarge ${step.title} drawing`} className="group flex h-[340px] w-full items-center justify-center overflow-hidden bg-white focus-visible:outline-offset-4 sm:h-[440px] lg:h-[min(43svh,390px)]">
              <Image src={asset.src} width={asset.width} height={asset.height} alt={`${step.title} research drawing`} unoptimized sizes="(min-width: 1024px) 38vw, 90vw" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" />
            </button>
          </article>
        );
      })}
    </CommonGroundScrollStory>
  );
}

export function CommonGroundResearch() {
  const [viewer, setViewer] = useState<SiteImage | null>(null);

  return (
    <>
      <section id="cg-site-analysis" aria-labelledby="cg-research-title" className="scroll-mt-28 bg-white pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="shell">
          <div data-cg-heading>
            <SectionLabel>Site analysis</SectionLabel>
            <h2 id="cg-research-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">Reading Edinburgh&apos;s edge</h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">Before focusing on the four places, the studio study examines who lives across Edinburgh and how growth at its edge has shaped everyday life.</p>
          </div>
          <div data-cg-gallery className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {cityStudies.map((study, index) => {
              const image = images[study.key];
              return <figure key={study.key} data-cg-card className="min-w-0">
                <button type="button" onClick={() => setViewer(imageFor(study))} aria-label={`Enlarge ${study.title}`} className="group flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-sage-50/40 p-4 focus-visible:outline-offset-4">
                  <Image src={image.src} width={image.width} height={image.height} alt={imageFor(study).alt} unoptimized sizes="(min-width: 768px) 30vw, 92vw" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.035]" />
                </button>
                <figcaption className="mt-4 border-t border-sage-300/60 pt-3">
                  <span className="t-label text-sage-700">0{index + 1} / 03</span>
                  <h3 className="mt-2 font-display text-lg text-ink">{study.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{study.description}</p>
                </figcaption>
              </figure>;
            })}
          </div>
        </div>
      </section>

      <section id="cg-peripheral-growth" aria-labelledby="cg-growth-title" className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="shell">
          <GrowthStory onOpen={setViewer} />

          <div data-cg-heading className="mt-8 md:mt-16">
            <SectionLabel>Landscape layers</SectionLabel>
            <h3 className="mt-5 font-display text-[clamp(1.65rem,2.7vw,2.5rem)] font-light leading-tight text-ink">The ground beneath the growth</h3>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">Alongside the built pattern, these maps document the land, ecology and environmental conditions that connect the four study areas.</p>
          </div>
          <div data-cg-gallery className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {landscapeStudies.map((study) => {
              const image = images[study.key];
              return <figure key={study.key} data-cg-card className="min-w-0">
                <button type="button" onClick={() => setViewer(imageFor(study))} aria-label={`Enlarge ${study.title}`} className="group flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-sage-50/40 p-4 focus-visible:outline-offset-4">
                  <Image src={image.src} width={image.width} height={image.height} alt={imageFor(study).alt} unoptimized sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.035]" />
                </button>
                <figcaption className="mt-4 border-t border-sage-300/60 pt-3">
                  <h4 className="font-display text-lg text-ink">{study.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{study.description}</p>
                </figcaption>
              </figure>;
            })}
          </div>
        </div>
      </section>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </>
  );
}
