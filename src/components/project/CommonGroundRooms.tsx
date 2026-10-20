"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import assets from "@/content/commonGroundAssets.json";
import submission from "@/content/commonGroundSubmission.json";
import { CommonGroundImage, type CommonGroundAssetId } from "./CommonGroundPlate";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";

type Room = {
  name: string;
  plan: CommonGroundAssetId;
  fullPlan: keyof typeof submission;
  description: string;
  renders: { id: CommonGroundAssetId; label: string; alt: string }[];
};

const rooms: Room[] = [
  {
    name: "Library",
    plan: "library-plan",
    fullPlan: "final-outcome/rooms/library",
    description: "A place for individual study and shared learning. The social staircase brings reading and informal gathering together, while quieter study and meeting rooms sit alongside it.",
    renders: [
      { id: "library-study", label: "Individual study", alt: "Study desks beside tall bookshelves in the library." },
      { id: "library-staircase", label: "Social staircase", alt: "A seated timber staircase between library bookshelves." },
      { id: "library-meeting", label: "Meeting room", alt: "A group working at a table in a library meeting room." },
    ],
  },
  {
    name: "Multipurpose hall",
    plan: "hall-plan",
    fullPlan: "final-outcome/rooms/mph",
    description: "The hall changes with the community's needs. A clear-span floor accommodates sports, performances and gatherings, with seating that can be arranged for different events.",
    renders: [
      { id: "hall-sports", label: "Sports", alt: "People playing basketball in the timber-lined hall." },
      { id: "hall-performance", label: "Performance", alt: "A concert in the multipurpose hall." },
      { id: "hall-events", label: "Events", alt: "Tiered hall seating with a community event taking place." },
    ],
  },
  {
    name: "Sensory room",
    plan: "sensory-plan",
    fullPlan: "final-outcome/rooms/sensory",
    description: "This flexible wellbeing space supports movement, creative work and sensory activities. The plan can host yoga, painting and aerial practice at different times.",
    renders: [
      { id: "sensory-yoga", label: "Yoga", alt: "Yoga session on mats in the sensory room." },
      { id: "sensory-painting", label: "Painting", alt: "Art activity with easels and a shared table." },
      { id: "sensory-aerial", label: "Aerial movement", alt: "Aerial silks and movement practice in a double-height room." },
    ],
  },
  {
    name: "Community kitchen",
    plan: "kitchen-plan",
    fullPlan: "final-outcome/rooms/kitchen-outline",
    description: "Food growing, cooking and learning form one shared sequence. The kitchen connects to the greenhouse and gives different generations space to prepare and share meals together.",
    renders: [
      { id: "kitchen-growing", label: "Growing", alt: "People tending plants in the greenhouse beside the kitchen." },
      { id: "kitchen-cooking", label: "Cooking", alt: "People cooking together at the community kitchen counters." },
      { id: "kitchen-learning", label: "Learning", alt: "Children learning to cook around a shared kitchen island." },
    ],
  },
];

export function CommonGroundRooms({ programme }: { programme: string }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const room = rooms[active];
  const openPlan = () => setViewer({ src: submission[room.fullPlan].src, title: `${room.name} floor plan`, alt: `${room.name} floor plan` });

  return (
    <section id="cg-final-drawings" aria-labelledby="cg-rooms-title" className="scroll-mt-28 bg-white pb-20 pt-8 md:pb-28 md:pt-10">
      <div className="shell">
        <div data-cg-heading>
          <SectionLabel>Rooms in use</SectionLabel>
          <h2 id="cg-rooms-title" className="mt-5 scroll-mt-48 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-tight text-ink">
            Four rooms, many ways to gather
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">{programme}</p>
          <p className="t-label mt-7 text-sage-700">Hover over or select a room to explore it</p>
        </div>

        <div data-cg-rooms className="mt-11 grid w-full items-start gap-8 lg:grid-cols-[minmax(170px,210px)_minmax(0,1fr)_minmax(170px,280px)] lg:gap-10 xl:gap-14">
          <div data-cg-room-column aria-label="Choose a room" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-3">
            {rooms.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                aria-controls="cg-room-details"
                className={`t-label flex min-h-12 items-center rounded-lg border px-4 py-2 text-left transition-colors duration-300 lg:min-h-13 ${
                  active === index ? "border-sage-500 bg-sage-50 text-ink" : "border-sage-300/60 bg-white text-ink-soft hover:border-sage-500 hover:bg-sage-50/60"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div id="cg-room-details" data-cg-room-column aria-live="polite" className="min-w-0">
            <p className="t-label mb-3 text-sage-700">{String(active + 1).padStart(2, "0")} / 04 &nbsp; FLOOR PLAN</p>
            <button
              type="button"
              onClick={openPlan}
              aria-label={`Enlarge floor plan: ${room.name}`}
              className="flex h-[320px] items-center justify-center border border-sage-300/50 bg-sage-50/60 p-4 sm:h-[390px] lg:h-[500px]"
            >
              <CommonGroundImage id={room.plan} alt={`${room.name} floor plan`} sizes="(min-width: 1024px) 600px, 85vw" className="block max-h-full max-w-full object-contain mix-blend-multiply" />
            </button>
            <h3 className="mt-6 font-display text-lg text-ink">{room.name}</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">{room.description}</p>
            <button type="button" onClick={openPlan} className="editorial-link mt-4 inline-block font-mono text-[10px] uppercase tracking-[.12em] text-sage-700">View full room drawing ↗</button>
          </div>

          <div data-cg-room-column aria-label={`${room.name} renders`} className="grid min-w-0 grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-1 lg:gap-3">
            {room.renders.map((render, index) => (
              <figure key={render.id} className="relative aspect-[773/570] min-w-0 overflow-hidden border border-sage-300/60 bg-sage-50/35">
                <button
                  type="button"
                  onClick={() => setViewer({ src: assets[render.id].full, title: `${room.name} — ${render.label}`, alt: render.alt })}
                  aria-label={`Enlarge image: ${render.label}`}
                  className="group block h-full w-full focus-visible:outline-offset-4"
                >
                  <CommonGroundImage id={render.id} alt={render.alt} sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 30vw" className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" />
                </button>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-white/85 px-2 py-1.5 font-display text-xs leading-tight text-ink-soft sm:px-3 sm:py-2 sm:text-sm">
                  <span className="font-mono text-[10px] text-sage-700">0{index + 1}</span>
                  {render.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
