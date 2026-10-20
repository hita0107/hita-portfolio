"use client";

import { useState } from "react";
import Image from "@/components/SiteImage";
import type { Project } from "@/content/portfolio";
import atlasDescriptions from "@/content/roomsCitiesDescriptions.json";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CommonGroundImageDialog, type SiteImage } from "../CommonGroundImageDialog";
import { Opener } from "../Opener";

const features = [
  {
    label: "Location", slug: "location", asset: "location",
    focus: "Eight places in their wider cities",
    text: "The atlas begins by locating each study area within its city. The same visual approach makes their different positions and urban contexts easy to compare.",
    reading: "Each neighbourhood has its own relationship to the centre, surrounding districts and larger landscape. Those relationships inform the more detailed comparisons that follow.",
  },
  {
    label: "Neighbourhood", slug: "population", asset: "population",
    focus: "Location, area and density",
    text: "The study begins by locating one neighbourhood within each city and comparing its area and population density. The eight places were chosen to represent different densities, cultures and urban systems, creating a common starting point for the more detailed analysis.",
    reading: "This first scale establishes the relationship between each district and its wider city. It shows why a neighbourhood must be read in context before comparing its streets, buildings or rooms with another place.",
  },
  {
    label: "History", slug: "history", asset: "history",
    focus: "Growth and change over time",
    text: "Historical maps distinguish older buildings from more recent additions. Reading these layers together reveals patterns of growth, replacement and outward expansion in each neighbourhood.",
    reading: "The sequence helps explain the present street layout and building fabric. It also shows how different periods of development have produced the density and spatial character seen today.",
  },
  {
    label: "Transport", slug: "transport", asset: "transport",
    focus: "Connections and movement",
    text: "A consistent set of maps records bus, rail, tram and underground routes. The drawings compare both local movement and the connections each neighbourhood has to the wider city and region.",
    reading: "The reach and intensity of public transport vary across the eight places. Comparing those networks helps reveal how access shapes daily movement, walkability and reliance on private cars.",
  },
  {
    label: "Building use", slug: "building-use", asset: "building-use",
    focus: "Private, public and mixed use",
    text: "Building-use maps distinguish private, public and mixed-use spaces. Repeating this classification across the neighbourhoods makes each place’s functional mix visible.",
    reading: "The comparison considers how uses support activity throughout the day and contribute to the social fabric. It also reveals the different effects of concentrated and dispersed public or mixed-use buildings.",
  },
  {
    label: "Green space", slug: "green-space", asset: "green-space",
    focus: "Public and private landscape",
    text: "The group mapped public green space, private green space and the landscape beyond each neighbourhood boundary. This shows how planted areas are distributed, connected and made accessible.",
    reading: "Green space provides places for communal activity and relief from hard urban surfaces. The comparison also considers its environmental role, including rainwater absorption, pollution reduction and local wellbeing.",
  },
  {
    label: "Character", slug: "character", asset: "character",
    focus: "The identity of each place",
    text: "Illustrations concentrate on the spaces and buildings that give each neighbourhood a recognisable identity. They look beyond a numerical comparison to show how streets and public spaces are experienced and used.",
    reading: "Placed side by side, the drawings reveal different social priorities and ways of organising urban life. Character emerges from the relationship between built form, movement and everyday occupation.",
  },
  {
    label: "Room", slug: "room", asset: "room",
    focus: "Urban form at a domestic scale",
    text: "The final lens studies typical rooms and dwelling plans within the selected neighbourhoods. It brings the comparison from the scale of the city down to the spaces people inhabit directly.",
    reading: "Differences in room arrangement reflect local priorities, housing types and the history of residential development. The domestic plan becomes another way to read the wider neighbourhood.",
  },
] as const;

const neighbourhoods = [
  { place: "Camden", city: "London, United Kingdom", slug: "london" },
  { place: "Prenzlauer Berg", city: "Berlin, Germany", slug: "berlin" },
  { place: "Universidad", city: "Zaragoza, Spain", slug: "zaragoza" },
  { place: "Ikebukuro", city: "Tokyo, Japan", slug: "tokyo" },
  { place: "Hillhead", city: "Glasgow, Scotland", slug: "glasgow" },
  { place: "Wielka Płyta", city: "Płock, Poland", slug: "plock" },
  { place: "Lucca", city: "Lucca, Italy", slug: "lucca" },
  { place: "Vauban", city: "Freiburg, Germany", slug: "freiburg" },
] as const;

export function RoomsCities({ project }: { project: Project }) {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const feature = features[selectedFeature];

  return (
    <>
      <Opener project={project} introduction={project.paragraphs} />

      <section aria-labelledby="rooms-cities-atlas" className="bg-cream py-20 md:py-28">
        <div className="shell">
          <SectionReveal>
            <SectionLabel>Neighbourhood atlas</SectionLabel>
            <h2 id="rooms-cities-atlas" className="mt-5 font-display text-[clamp(2.5rem,5vw,5rem)] font-light leading-[.98] tracking-[-.04em] text-ink">One lexicon, eight neighbourhoods</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">The group used the same visual language to compare how eight places are organised, inhabited and remembered. Choose a feature to read their drawings and research alongside one another.</p>
          </SectionReveal>
          <div className="mt-10 flex gap-x-6 gap-y-2 overflow-x-auto border-b border-sage-300/60" role="group" aria-label="Compare by feature">
              {features.map((item, index) => (
                <button key={item.slug} type="button" onClick={() => { setSelectedFeature(index); setActivePlace(null); }} aria-pressed={selectedFeature === index} className={`shrink-0 border-b-2 pb-3 pt-2 text-left text-[12px] uppercase tracking-[.13em] transition-colors ${selectedFeature === index ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}>
                  {item.label}
                </button>
              ))}
          </div>
          <div key={feature.slug} className="pt-10 md:pt-14">
            <div className="grid gap-6 border-b border-sage-300/60 pb-10 md:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] md:gap-16">
              <div>
                <p className="text-sm text-ink-soft">{String(selectedFeature + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-tight text-ink">{feature.label}</h3>
                <p className="mt-3 font-display text-lg text-sage-700">{feature.focus}</p>
              </div>
              <div className="max-w-3xl space-y-4 text-base leading-[1.75] text-ink-soft md:text-lg">
                <p>{feature.text}</p>
                <p>{feature.reading}</p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {neighbourhoods.map((place) => {
                const src = `/rooms-cities/neighbourhoods/${place.slug}/${feature.asset}.webp`;
                const isActive = activePlace === place.slug;
                return <article key={place.slug} onPointerEnter={(event) => { if (event.pointerType === "mouse") setActivePlace(place.slug); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setActivePlace(null); }} onFocus={() => setActivePlace(place.slug)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActivePlace(null); }} className={`relative min-w-0 transition-transform duration-500 motion-reduce:transition-none ${isActive ? "z-20 scale-[1.045]" : "z-0"}`}>
                  <button type="button" onClick={() => {
                    if (window.matchMedia("(hover: none)").matches && !isActive) {
                      setActivePlace(place.slug);
                      return;
                    }
                    setViewer({ src, title: `${place.place} / ${feature.label}`, alt: `${feature.label} drawing for ${place.place}, ${place.city}` });
                  }} aria-label={`${place.place}: read description or enlarge ${feature.label} drawing`} aria-expanded={isActive} className="group block w-full text-left focus-visible:outline-offset-4">
                    <span className="relative block aspect-square overflow-hidden border border-sage-300/60 bg-white">
                      <Image src={src} fill alt={`${feature.label} drawing for ${place.place}`} unoptimized sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw" className={`object-contain transition-[transform,opacity] duration-500 motion-reduce:transition-none ${activePlace && !isActive ? "scale-95 opacity-[.05]" : isActive ? "scale-[1.07]" : ""}`} />
                    </span>
                    <span className="mt-3 block border-t border-sage-300/60 pt-2">
                      <span className="block font-display text-lg leading-tight text-ink md:text-xl">{place.place}</span>
                      <span className="mt-1 block text-xs leading-tight text-ink-soft">{place.city}</span>
                    </span>
                  </button>
                  {isActive && <div className="absolute inset-x-0 top-full z-30 max-h-72 overflow-y-auto border border-sage-300/60 bg-cream p-4 shadow-lg [@media(hover:none)]:static [@media(hover:none)]:max-h-none [@media(hover:none)]:shadow-none">
                    <p className="text-sm leading-[1.65] text-ink-soft">{atlasDescriptions[place.slug][feature.asset]}</p>
                  </div>}
                </article>;
              })}
            </div>
          </div>
        </div>
      </section>

      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </>
  );
}
