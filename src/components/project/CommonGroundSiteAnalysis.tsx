"use client";

import Image from "@/components/SiteImage";
import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";

const mapWidth = 6082;
const mapHeight = 3308;

const places = [
  {
    name: "Ratho",
    studyName: "Ratho Station",
    image: "/common-ground/site-analysis/ratho-study.webp",
    frame: { x: 968, y: 1561, width: 733, height: 720 },
    summary: "A compact, semi-rural commuter settlement between major transport corridors.",
    characteristics: ["Small village with a quiet residential character", "Road and rail edges separate local uses", "Few everyday gathering and leisure spaces"],
    studies: [
      { title: "Building use", image: "/common-ground/submission/site-analysis/ratho/building-use.webp", width: 1902, height: 1902, alt: "Ratho building-use map, with residential, commercial and education buildings colour coded." },
      { title: "Public transport", image: "/common-ground/submission/site-analysis/ratho/public-transport.webp", width: 1949, height: 1949, alt: "Ratho public-transport map showing bus stops and the railway corridor." },
    ],
    fieldwork: "/common-ground/submission/site-analysis/ratho/pictures.webp",
  },
  {
    name: "Ingliston",
    studyName: "Ingliston",
    image: "/common-ground/site-analysis/ingliston-study.webp",
    frame: { x: 1702, y: 482, width: 1465, height: 1439 },
    summary: "A place shaped by the airport, bus and car movement, and the Royal Highland Centre.",
    characteristics: ["Strong transport links but a car-oriented public realm", "Large events bring occasional peaks of activity", "In-between land feels fragmented outside event days"],
    studies: [
      { title: "Airport town", image: "/common-ground/submission/site-analysis/airport/airport-town.webp", width: 1857, height: 1857, alt: "Ingliston map locating airport and Royal Highland Centre buildings, parking and tram infrastructure." },
      { title: "Pop-up community", image: "/common-ground/submission/site-analysis/airport/pop-up-community.webp", width: 1960, height: 1960, alt: "Ingliston diagram of temporary and permanent structures at the Royal Highland Centre." },
    ],
    fieldwork: "/common-ground/submission/site-analysis/airport/pictures.webp",
  },
  {
    name: "Gogarburn",
    studyName: "Gogarburn",
    image: "/common-ground/site-analysis/gogarburn-study.webp",
    frame: { x: 3170, y: 1561, width: 1101, height: 1079 },
    summary: "A green, biodiverse landscape organised around a large corporate campus.",
    characteristics: ["Landscaped open space and a calm setting", "Facilities primarily serve the working population", "Road, rail and tram routes limit wider connections"],
    studies: [
      { title: "Nature", image: "/common-ground/submission/site-analysis/gogarburn/nature.webp", width: 1908, height: 1908, alt: "Gogarburn landscape map showing trees, planted ground and open space around the campus." },
      { title: "Transport", image: "/common-ground/submission/site-analysis/gogarburn/transport.webp", width: 1998, height: 1998, alt: "Transport map connecting Gogarburn with the tram, roads and nearby stations." },
    ],
    fieldwork: "/common-ground/submission/site-analysis/gogarburn/photos.webp",
  },
  {
    name: "Edinburgh Park",
    studyName: "Edinburgh Park",
    image: "/common-ground/site-analysis/edinburgh-park-study.webp",
    frame: { x: 4271, y: 1920, width: 1101, height: 1080 },
    summary: "An office-led district whose car parks and transport routes divide its public life.",
    characteristics: ["Commercial buildings dominate the urban fabric", "Activity is concentrated in working hours", "Disconnected parcels leave room for more social uses"],
    studies: [
      { title: "Movement network", image: "/common-ground/submission/site-analysis/edi-park/movement-network.webp", width: 1920, height: 1914, alt: "Edinburgh Park movement map showing motorway, tram, rail, bus and walking routes." },
      { title: "Building typology", image: "/common-ground/submission/site-analysis/edi-park/typology.webp", width: 1915, height: 1907, alt: "Edinburgh Park building-use map identifying commercial, residential and public functions." },
    ],
    fieldwork: "/common-ground/submission/site-analysis/edi-park/photos.webp",
  },
] as const;

export function CommonGroundSiteAnalysis() {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const place = places[active];

  return (
    <section id="cg-overview-map" aria-labelledby="cg-site-title" className="scroll-mt-28 bg-white py-12 md:py-16">
      <div className="shell pt-8">
        <div data-cg-heading>
          <SectionLabel>Study area</SectionLabel>
          <h2 id="cg-site-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">
            Grand overview map
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft">The group studio analysis focuses on four places along Edinburgh&apos;s western edge. Select an area on the map to see its spatial character, drawings and fieldwork.</p>
        </div>

        <div data-cg-media className="mx-auto mt-8 max-w-[900px]">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <p className="t-label text-sage-700">Overview map</p>
            <p className="t-label text-ink-soft">Hover or select a place</p>
          </div>
          <div className="relative overflow-hidden border border-sage-300/60 bg-white">
            <Image
              src="/common-ground/site-analysis/rooms-cities-overview.webp"
              alt="Room + Cities overview map of Edinburgh's western edge, locating Ratho, Ingliston, Gogarburn and Edinburgh Park."
              width={mapWidth}
              height={mapHeight}
              unoptimized
              sizes="(min-width: 1440px) 1328px, 92vw"
              className="block h-auto w-full"
            />
            {places.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Explore ${item.name}`}
                aria-controls="cg-place-details"
                aria-pressed={active === index}
                data-map-area={item.name}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`absolute hidden cursor-pointer border-2 transition-[background-color,border-color] duration-300 focus-visible:z-20 focus-visible:outline-offset-2 sm:block ${active === index ? "border-sage-700/80 bg-sage-100/30" : "border-transparent hover:border-sage-700/80 hover:bg-sage-100/30"}`}
                style={{
                  left: `${(item.frame.x / mapWidth) * 100}%`,
                  top: `${(item.frame.y / mapHeight) * 100}%`,
                  width: `${(item.frame.width / mapWidth) * 100}%`,
                  height: `${(item.frame.height / mapHeight) * 100}%`,
                }}
              />
            ))}
          </div>

          <div aria-label="Choose a place" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {places.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-controls="cg-place-details"
                aria-pressed={active === index}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`rounded-md border px-3 py-3 text-left font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 sm:px-4 ${active === index ? "border-sage-700 bg-sage-100 text-ink" : "border-sage-300/70 bg-white text-ink-soft hover:bg-sage-50"}`}
              >
                <span className="mr-2 text-sage-700">0{index + 1}</span>{item.name}
              </button>
            ))}
          </div>
        </div>

        <div id="cg-place-details" key={place.name} aria-live="polite" className="mt-8">
          <div className="grid items-center gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
            <button type="button" onClick={() => setViewer({ src: place.image, title: `${place.studyName} site drawing`, alt: `Site analysis drawing of ${place.studyName}` })} aria-label={`Enlarge site drawing of ${place.studyName}`} className="group block w-full overflow-hidden border border-sage-300/60 bg-white p-4 focus-visible:outline-offset-4">
              <Image src={place.image} alt={`Site analysis drawing of ${place.studyName}.`} width={900} height={900} unoptimized className="mx-auto h-auto max-h-[340px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none" />
            </button>
            <div>
              <p className="t-label text-sage-700">Area study · {place.studyName}</p>
              <h3 className="mt-4 font-display text-[clamp(1.35rem,2.1vw,1.8rem)] font-light text-ink">{place.studyName}</h3>
              <p className="mt-4 font-display text-base leading-relaxed text-ink-soft">{place.summary}</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
                {place.characteristics.map((characteristic) => <li key={characteristic}>{characteristic}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-10">
            <p className="t-label text-sage-700">Mapping and fieldwork · {place.studyName}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {place.studies.map((study) => (
                <button key={study.title} type="button" onClick={() => setViewer({ src: study.image, title: `${place.studyName} · ${study.title}`, alt: study.alt })} aria-label={`Enlarge ${study.title} study of ${place.studyName}`} className="group block min-w-0 border border-sage-300/60 bg-white p-3 text-left focus-visible:outline-offset-4">
                  <div className="flex h-40 items-center justify-center overflow-hidden">
                    <Image src={study.image} alt={study.alt} width={study.width} height={study.height} unoptimized className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.08] group-focus-visible:scale-[1.08] motion-reduce:transition-none" />
                  </div>
                  <p className="t-label mt-3 text-ink-soft">{study.title}</p>
                </button>
              ))}
              <button type="button" onClick={() => setViewer({ src: place.fieldwork, title: `${place.studyName} · photographic survey`, alt: `Numbered photographic survey and location map for ${place.studyName}` })} aria-label={`Enlarge photographic survey of ${place.studyName}`} className="group block min-w-0 border border-sage-300/60 bg-white p-3 text-left focus-visible:outline-offset-4">
                <div className="flex h-40 items-center justify-center overflow-hidden">
                  <Image src={place.fieldwork} alt={`Numbered photographic survey and location map for ${place.studyName}.`} width={6615} height={3308} unoptimized className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.08] group-focus-visible:scale-[1.08] motion-reduce:transition-none" />
                </div>
                <p className="t-label mt-3 text-ink-soft">Photographic survey</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
