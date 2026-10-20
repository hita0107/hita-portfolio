"use client";

import { useRef, useState } from "react";
import Image from "@/components/SiteImage";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CommonGroundImageDialog, type SiteImage } from "./CommonGroundImageDialog";
import { CommonGroundScrollStory } from "./CommonGroundScrollStory";

const base = "/elysian/submission";

const siteStudies = [
  { title: "Site location", src: `${base}/exploration/site-location.webp`, text: "The study begins by locating Ellinikon in Athens and the proposed block within the former airport site." },
  { title: "Urban blocks in Athens 01", src: `${base}/site-analysis/block-analysis-1.webp`, text: "A study of block size and grain across Athens gave the new development a local urban reference." },
  { title: "Urban blocks in Athens 02", src: `${base}/site-analysis/block-analysis-2.webp`, text: "Comparing the surrounding block pattern helped place courtyards and connections within the larger city fabric." },
  { title: "Block typology", src: `${base}/site-analysis/block-typology.webp`, text: "The urban study compares courtyard, open and perimeter-block forms before the proposal develops its own porous arrangement." },
  { title: "Ellinikon masterplan", src: `${base}/site-analysis/masterplan.webp`, text: "The proposal sits in the Little Athens area of the Ellinikon masterplan. The wider plan establishes new streets, landscape and development blocks around it." },
  { title: "Building use", src: `${base}/site-analysis/building-use.webp`, text: "The surrounding residential, commercial and civic uses informed a block that can stay active beyond working hours." },
  { title: "Connections", src: `${base}/site-analysis/transport.webp`, text: "Nearby transit, an Olympic venue and new neighbourhood routes make the site a meeting point between local life and the larger regeneration project." },
  { title: "Sun and wind", src: `${base}/site-analysis/sun-and-wind-path.webp`, text: "Athens' strong summer sun and prevailing winds shape the shaded thresholds, planted terraces and passive airflow through the proposal." },
] as const;

const explorationBeats = [
  { number: "01", title: "Brief & programme", text: "The brief proposes homes for around 60 residents alongside offices, local shops, a library, daycare and public gathering space. The aim is a block used by residents and neighbours alike.", images: [
    { title: "Project brief", src: `${base}/exploration/brief.webp` },
    { title: "Types of space", src: `${base}/exploration/types-of-spaces.webp` },
  ] },
  { number: "02", title: "Massing strategy", text: "Pedestrian routes define the block before its volumes are lifted and linked. The open middle makes a shared courtyard rather than a sealed perimeter.", images: [
    { title: "Massing sequence", src: `${base}/exploration/massing.webp` },
    { title: "Development sketch", src: `${base}/exploration/development.webp` },
  ] },
  { number: "03", title: "Polykatoikia typology", text: "The Greek apartment block informs a layered mix of housing, work and commerce. Recessed upper floors provide shade, terraces and shared outdoor space.", images: [
    { title: "Polykatoikia study", src: `${base}/exploration/polykatokia.webp` },
  ] },
  { number: "04", title: "Division of spaces", text: "Public routes and commercial uses occupy the lower levels, with residential rooms above. Bridges and setbacks bring the separate volumes together.", images: [
    { title: "Division of spaces", src: `${base}/exploration/division-of-spaces.webp` },
  ] },
  { number: "05", title: "Material strategy", text: "The submission compares construction options before selecting CLT walls and floors with glulam support. Concrete remains in the cores and foundations where stability is needed.", images: [
    { title: "Structural sketch", src: `${base}/exploration/sketch.webp` },
  ] },
  { number: "06", title: "Vertical vegetation", text: "Hydroponic growing is integrated into the block, with a timber-framed polycarbonate enclosure. Food production becomes part of daily life rather than a separate facility.", images: [
    { title: "Vertical farming", src: `${base}/exploration/vertical-farming.webp` },
    { title: "Frosted enclosure and growing", src: `${base}/exploration/frosted-glass-and-vertical-farming.webp` },
  ] },
] as const;

const earlyVisualisations = [
  { title: "Early courtyard visualisation", src: `${base}/exploration/early-visualisation-1.webp` },
  { title: "Early block visualisation", src: `${base}/exploration/early-visualisation-2.webp` },
] as const;

const sectionSketch = { title: "Section sketch", src: `${base}/exploration/sketch-section.webp` };

const plans = [
  { title: "Ground floor", src: `${base}/final/floor-plans/ground-floor.webp`, note: "The public ground level draws movement into the block and around its shared courtyard." },
  { title: "First floor", src: `${base}/final/floor-plans/1st-floor.webp`, note: "Work and shared programmes sit above the public routes." },
  { title: "Second floor", src: `${base}/final/floor-plans/2nd-floor.webp`, note: "Residential rooms and circulation open towards terraces and the courtyard." },
  { title: "Third floor", src: `${base}/final/floor-plans/3rd-floor.webp`, note: "The stepped floor plate makes space for outdoor rooms and planting." },
  { title: "Fourth floor", src: `${base}/final/floor-plans/4th-floor.webp`, note: "The upper level continues the sequence of recessed living spaces." },
  { title: "Roof plan", src: `${base}/final/floor-plans/roof-plan.webp`, note: "Planted roofs and growing areas complete the block's landscape system." },
] as const;

const drawingGroups = [
  { label: "Sections", items: [
    { title: "Section AA", src: `${base}/final/section-aa.webp` },
    { title: "Section BB", src: `${base}/final/section-bb.webp` },
  ] },
  { label: "Elevations", items: [
    { title: "Long elevation", src: `${base}/final/elevation.webp` },
  ] },
  { label: "Construction", items: [
    { title: "Detailed section", src: `${base}/final/construction-detail-22.webp` },
    { title: "Roof, wall and floor build-ups", src: `${base}/final/construction-detail-23.webp` },
  ] },
] as const;

const environmentalStudies = [
  { title: "Stack ventilation", src: `${base}/exploration/stack-ventilation.webp`, text: "Voids encourage warm air to rise and draw cooler air across the inhabited spaces." },
  { title: "Solar shading", src: `${base}/exploration/solar-shading.webp`, text: "Recessed floors and timber shading moderate direct sun on the façades." },
  { title: "Green roof", src: `${base}/exploration/green-roof.webp`, text: "Planted roofs extend the landscape and help reduce solar heat gain." },
] as const;

const renders = [
  { title: "The inhabited courtyard", src: `${base}/final/renders/1.webp` },
  { title: "Public life between blocks", src: `${base}/final/renders/2.webp` },
  { title: "Vertical growing", src: `${base}/final/renders/4.webp` },
  { title: "Residential interior", src: `${base}/final/renders/5.webp` },
] as const;

const renderGroups = [
  { title: "External views", images: renders.slice(0, 2), width: "max-w-[1100px]", aspect: "aspect-[1.9]" },
  { title: "Internal views", images: renders.slice(2), width: "max-w-[780px]", aspect: "aspect-square" },
] as const;

const modelAxonometric = { title: "Physical model axonometric", src: `${base}/final/physical-model/1.webp` };
const modelDetails = [
  { title: "Screen and silhouette detail", src: `${base}/final/physical-model/3.webp` },
  { title: "Stair and threshold detail", src: `${base}/final/physical-model/4.webp` },
] as const;

function ImageButton({ image, onOpen, className, fit = "contain", sizes = "(min-width: 1024px) 50vw, 92vw", blendWithPage = false }: { image: { title: string; src: string }; onOpen: (image: SiteImage) => void; className: string; fit?: "contain" | "cover"; sizes?: string; blendWithPage?: boolean }) {
  return <button type="button" onClick={() => onOpen({ ...image, alt: `${image.title} from Elysian Arcadia`, blendWithPage })} aria-label={`Enlarge ${image.title}`} className={`group relative block overflow-hidden focus-visible:outline-offset-4 ${className}`}>
    <Image src={image.src} fill alt={image.title} unoptimized sizes={sizes} className={`transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none ${fit === "cover" ? "object-cover" : "object-contain"} ${blendWithPage ? "mix-blend-multiply" : ""}`} />
  </button>;
}

function SectionSketchSpotlight({ onOpen }: { onOpen: (image: SiteImage) => void }) {
  return <button
    type="button"
    aria-label="Enlarge section sketch"
    onClick={() => onOpen({ ...sectionSketch, alt: "Section sketch from Elysian Arcadia" })}
    onPointerMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    }}
    className="elysian-sketch relative block aspect-[3122/1128] w-full overflow-hidden bg-white focus-visible:outline-offset-4"
  >
    <Image src={sectionSketch.src} fill alt="Section sketch" unoptimized sizes="94vw" className="object-contain opacity-35" />
    <span className="elysian-sketch-reveal pointer-events-none absolute inset-0" aria-hidden="true">
      <Image src={sectionSketch.src} fill alt="" unoptimized sizes="94vw" className="object-contain" />
    </span>
  </button>;
}

function SiteStudyDisplay({ index, onOpen, passive = false }: { index: number; onOpen: (image: SiteImage) => void; passive?: boolean }) {
  const study = siteStudies[index];
  return <div aria-hidden={passive || undefined} className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(170px,.38fr)] md:gap-8">
    {passive
      ? <div className="relative aspect-[4/3] w-full bg-white"><Image src={study.src} fill alt="" unoptimized sizes="(min-width: 1024px) 50vw, 92vw" className="object-contain" /></div>
      : <ImageButton image={study} onOpen={onOpen} className="aspect-[4/3] w-full bg-white" />}
    <div className="self-end border-t border-sage-300/60 pt-4">
      <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Study {String(index + 1).padStart(2, "0")} / {String(siteStudies.length).padStart(2, "0")}</p>
      <h3 className="mt-4 font-display text-[clamp(1.6rem,2.5vw,2.5rem)] leading-tight text-ink">{study.title}</h3>
      <p className="mt-4 text-sm leading-[1.7] text-ink-soft">{study.text}</p>
    </div>
  </div>;
}

export function ElysianSections() {
  const siteScrollRef = useRef<HTMLDivElement>(null);
  const [siteView, setSiteView] = useState<{ index: number; previous: number | null; sequence: number }>({ index: 0, previous: null, sequence: 0 });
  const selectedSite = siteView.index;
  const selectSite = (index: number) => setSiteView((current) => current.index === index ? current : { index, previous: current.index, sequence: current.sequence + 1 });
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedDrawing, setSelectedDrawing] = useState(0);
  const [activeRender, setActiveRender] = useState<number | null>(null);
  const [viewer, setViewer] = useState<SiteImage | null>(null);
  const drawing = drawingGroups[selectedGroup].items[selectedDrawing];

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      if (!siteScrollRef.current) return;
      let lastIndex = -1;
      const trigger = ScrollTrigger.create({
        trigger: siteScrollRef.current,
        start: "top top+=280",
        end: () => `+=${Math.round(window.innerHeight * 0.55 * siteStudies.length)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: ({ progress }) => {
          const index = Math.min(siteStudies.length - 1, Math.floor(progress * siteStudies.length));
          if (index !== lastIndex) {
            lastIndex = index;
            selectSite(index);
          }
        },
      });
      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        window.cancelAnimationFrame(refreshFrame);
        trigger.kill();
      };
    });
    return () => media.revert();
  }, { scope: siteScrollRef });

  return <>
    <section id="elysian-site" aria-labelledby="elysian-site-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <div className="lg:sticky lg:top-32 lg:z-20 lg:bg-white lg:py-3">
        <SectionReveal>
          <SectionLabel>Site analysis</SectionLabel>
          <h2 id="elysian-site-title" className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">An open block for Ellinikon</h2>
        </SectionReveal>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">The study begins with Ellinikon&apos;s position in Athens and the city&apos;s urban blocks, then moves through the proposed masterplan, surrounding uses, connections, sun and wind. The former airport offers new density, but also calls for public space and an everyday life beyond tourism.</p>
        <div className="mt-12 space-y-14 lg:hidden">
          {siteStudies.map((study, index) => <SectionReveal key={study.src} className="border-t border-sage-300/60 pt-5">
            <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Study {String(index + 1).padStart(2, "0")} / 08</p>
            <h3 className="mt-3 font-display text-3xl text-ink">{study.title}</h3>
            <ImageButton image={study} onOpen={setViewer} className="mt-5 aspect-[4/3] w-full bg-white" sizes="92vw" />
            <p className="mt-4 text-sm leading-[1.7] text-ink-soft">{study.text}</p>
          </SectionReveal>)}
        </div>
        <div ref={siteScrollRef} className="mt-12 hidden bg-white lg:block lg:min-h-[min(510px,calc(100svh-290px))]">
        <SectionReveal className="grid gap-8 lg:grid-cols-[minmax(190px,.28fr)_minmax(0,1fr)] lg:gap-12">
          <div role="group" aria-label="Choose a site study" className="grid grid-cols-2 gap-x-4 self-start border-t border-sage-300/60 lg:grid-cols-1">
            {siteStudies.map((study, index) => <button key={study.title} type="button" onMouseEnter={() => selectSite(index)} onFocus={() => selectSite(index)} onClick={() => selectSite(index)} aria-pressed={selectedSite === index} className={`flex min-h-14 items-center justify-between gap-3 border-b border-sage-300/60 py-3 text-left text-sm transition-colors ${selectedSite === index ? "text-ink" : "text-ink-soft hover:text-ink"}`}><span>{study.title}</span><span className="font-mono text-[10px] text-sage-700">{String(index + 1).padStart(2, "0")}</span></button>)}
          </div>
          <div className="relative min-w-0">
            {siteView.previous !== null && <div key={`out-${siteView.sequence}`} className="elysian-site-exit pointer-events-none absolute inset-0"><SiteStudyDisplay index={siteView.previous} onOpen={setViewer} passive /></div>}
            <div key={`in-${siteView.sequence}`} className="elysian-site-enter relative"><SiteStudyDisplay index={selectedSite} onOpen={setViewer} /></div>
          </div>
        </SectionReveal>
        <p className="mt-5 text-[11px] uppercase tracking-[.14em] text-sage-700 lg:mt-2">Scroll to explore the eight site studies</p>
        </div>
        <SectionReveal className="mt-12 grid gap-7 border-t border-sage-300/60 pt-8 md:grid-cols-3 md:gap-12">
          <div><p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Strength</p><p className="mt-3 text-sm leading-[1.7] text-ink-soft">Transit access, a central position in the masterplan and consistent sunlight support a connected, productive block.</p></div>
          <div><p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Challenge</p><p className="mt-3 text-sm leading-[1.7] text-ink-soft">A large inactive site, summer heat and seismic conditions complicate the move from an airport landscape to an inhabited neighbourhood.</p></div>
          <div><p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Opportunity</p><p className="mt-3 text-sm leading-[1.7] text-ink-soft">Shared courtyards, local commerce and food growing can make the redevelopment useful to residents as well as visitors.</p></div>
        </SectionReveal>
      </div>
    </section>

    <section id="elysian-exploration" aria-labelledby="elysian-exploration-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <CommonGroundScrollStory progressPlacement="left" heading={<div data-cg-heading>
          <SectionLabel>Exploration</SectionLabel>
          <h2 id="elysian-exploration-title" className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.5rem)] font-light leading-[.95] tracking-[-.04em] text-ink">From the block to the room</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">Scroll from the brief to massing, typology, programme, materials and vertical vegetation—the same sequence as the submission.</p>
        </div>}>
          {explorationBeats.map((beat) => <article key={beat.number} data-cg-story-panel className="cg-scroll-panel grid items-center gap-8 border-t border-sage-300/60 py-9 lg:grid-cols-[minmax(0,.55fr)_minmax(0,1fr)] lg:gap-12 lg:border-0 lg:py-0">
            <div>
              <p className="t-label text-sage-700">{beat.number} / 06</p>
              <h3 className="mt-4 font-display text-[clamp(1.7rem,3vw,3rem)] font-light leading-tight text-ink">{beat.title}</h3>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-ink-soft">{beat.text}</p>
            </div>
            <div className={`grid h-[300px] min-w-0 gap-3 sm:h-[380px] lg:h-[min(43svh,390px)] ${beat.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${beat.images.length > 2 ? "grid-rows-2" : ""}`}>
              {beat.images.map((image, index) => <div key={image.src} className={`flex min-h-0 min-w-0 flex-col ${beat.images.length > 2 && index === 0 ? "row-span-2" : ""}`}>
                <ImageButton image={image} onOpen={setViewer} className="min-h-0 w-full flex-1 bg-white" sizes="(min-width: 1024px) 32vw, 45vw" />
                <p className="mt-1.5 truncate text-[10px] uppercase tracking-[.08em] text-ink-soft">{image.title}</p>
              </div>)}
            </div>
          </article>)}
        </CommonGroundScrollStory>
        <SectionReveal className="mt-16 md:mt-24">
          <SectionLabel>Early visualisations</SectionLabel>
          <div className="mt-6 grid max-w-[680px] gap-6 sm:grid-cols-2 md:gap-8">
            {earlyVisualisations.map((image) => <div key={image.src}>
              <ImageButton image={image} onOpen={setViewer} className="aspect-square w-full bg-white" sizes="(min-width: 640px) 45vw, 92vw" />
              <p className="mt-3 text-[11px] uppercase tracking-[.12em] text-ink-soft">{image.title}</p>
            </div>)}
          </div>
        </SectionReveal>
      </div>
    </section>

    <section aria-label="Section sketch" className="bg-white pb-20 pt-4 md:pb-28 md:pt-8">
      <div className="shell">
        <SectionReveal><SectionSketchSpotlight onOpen={setViewer} /></SectionReveal>
      </div>
    </section>

    <div id="elysian-outcomes" className="scroll-mt-32">
    <section id="elysian-plans" aria-labelledby="elysian-plans-title" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Outcomes / Floor plans</SectionLabel>
          <h2 id="elysian-plans-title" className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">Floor by floor</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">The ground floor connects the surrounding streets to a shared centre. Above it, the floor plates step back to make outdoor space for homes, work and growing.</p>
        </SectionReveal>
        <div role="group" aria-label="Choose a floor plan" className="mt-10 flex gap-5 overflow-x-auto border-b border-sage-300/60">
          {plans.map((plan, index) => <button key={plan.src} type="button" onClick={() => setSelectedPlan(index)} aria-pressed={selectedPlan === index} className={`shrink-0 border-b-2 py-3 text-[12px] uppercase tracking-[.12em] transition-colors ${selectedPlan === index ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}>{plan.title}</button>)}
        </div>
        <SectionReveal className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(180px,.25fr)] lg:gap-10">
          <ImageButton image={plans[selectedPlan]} onOpen={setViewer} blendWithPage className="h-[min(70svh,720px)] w-full" />
          <div className="self-start border-t border-sage-300/60 pt-4">
            <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">Plan {String(selectedPlan + 1).padStart(2, "0")} / 06</p>
            <h3 className="mt-4 font-display text-2xl text-ink">{plans[selectedPlan].title}</h3>
            <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{plans[selectedPlan].note}</p>
          </div>
        </SectionReveal>
      </div>
    </section>

    <section id="elysian-drawings" aria-labelledby="elysian-drawings-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Sections & details</SectionLabel>
          <h2 id="elysian-drawings-title" className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">Inside the construction</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">Sections reveal the stepped block and its green terraces. The submitted details describe CLT walls and floors, glulam members, glazed and polycarbonate enclosures, with concrete cores and foundations.</p>
        </SectionReveal>
        <div role="group" aria-label="Choose drawing type" className="mt-10 flex gap-7 overflow-x-auto border-b border-sage-300/60">
          {drawingGroups.map((group, index) => <button key={group.label} type="button" onClick={() => { setSelectedGroup(index); setSelectedDrawing(0); }} aria-pressed={selectedGroup === index} className={`shrink-0 border-b-2 py-3 text-[12px] uppercase tracking-[.12em] transition-colors ${selectedGroup === index ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}>{group.label}</button>)}
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(180px,.24fr)] lg:gap-10">
          <ImageButton image={drawing} onOpen={setViewer} className="h-[min(66svh,660px)] w-full bg-white" />
          <div className="self-start">
            <p className="text-[11px] uppercase tracking-[.14em] text-sage-700">{drawingGroups[selectedGroup].label}</p>
            <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{drawing.title}</h3>
            {drawingGroups[selectedGroup].items.length > 1 && <div role="group" aria-label="Choose a drawing" className="mt-6 grid gap-1 border-t border-sage-300/60">
              {drawingGroups[selectedGroup].items.map((item, index) => <button key={item.src} type="button" onClick={() => setSelectedDrawing(index)} aria-pressed={selectedDrawing === index} className={`border-b border-sage-300/60 py-3 text-left text-sm transition-colors ${selectedDrawing === index ? "text-ink" : "text-ink-soft hover:text-ink"}`}>{String(index + 1).padStart(2, "0")} &nbsp; {item.title}</button>)}
            </div>}
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="elysian-environment-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Environmental scheme</SectionLabel>
          <h2 id="elysian-environment-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.5rem)] font-light leading-[.95] tracking-[-.04em] text-ink">Shade, air and planted roofs</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">The final environmental strategy draws the earlier climate tests into the building: passive ventilation through vertical voids, recessed floors that self-shade and green roofs that extend the landscape.</p>
        </SectionReveal>
        <div className="mt-12 grid gap-9 md:grid-cols-3 md:gap-6">
          {environmentalStudies.map((study) => <SectionReveal key={study.src} className="min-w-0">
            <ImageButton image={study} onOpen={setViewer} className="aspect-[4/3] w-full bg-white" sizes="(min-width: 768px) 30vw, 92vw" />
            <h3 className="mt-4 font-display text-2xl text-ink">{study.title}</h3>
            <p className="mt-2 text-sm leading-[1.7] text-ink-soft">{study.text}</p>
          </SectionReveal>)}
        </div>
      </div>
    </section>

    <section id="elysian-renders" aria-labelledby="elysian-renders-title" className="scroll-mt-32 bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Final views</SectionLabel>
          <h2 id="elysian-renders-title" className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">A productive landscape to inhabit</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">The courtyard, balconies and growing spaces bring the project&apos;s social and ecological ideas into view. Select an image to see the full render.</p>
        </SectionReveal>
        <div className="mt-12 space-y-14 md:space-y-20">
          {renderGroups.map((group, groupIndex) => <SectionReveal key={group.title}>
            <h3 className="border-t border-sage-300/60 pt-5 font-display text-2xl text-ink md:text-3xl">{group.title}</h3>
            <div className={`mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 md:gap-8 ${group.width}`}>
              {group.images.map((image, imageIndex) => {
                const index = groupIndex * 2 + imageIndex;
                return <div key={image.src} onMouseEnter={() => setActiveRender(index)} onMouseLeave={() => setActiveRender(null)} onFocus={() => setActiveRender(index)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveRender(null); }} className={`min-w-0 transition-[opacity,transform] duration-500 motion-reduce:transition-none ${activeRender !== null && activeRender !== index ? "opacity-25" : activeRender === index ? "scale-[1.015]" : ""}`}>
                  <ImageButton image={image} onOpen={setViewer} fit="cover" className={`w-full bg-white ${group.aspect}`} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 92vw" />
                  <p className="mt-3 text-[12px] uppercase tracking-[.12em] text-ink-soft">{String(index + 1).padStart(2, "0")} / {image.title}</p>
                </div>;
              })}
            </div>
          </SectionReveal>)}
        </div>
      </div>
    </section>

    <section id="elysian-model" aria-labelledby="elysian-model-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="shell">
        <SectionReveal>
          <SectionLabel>Physical model</SectionLabel>
          <h2 id="elysian-model-title" className="mt-5 font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">Testing the layers</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.75] text-ink-soft">The model studies the threshold between the planted exterior, timber structure and spaces inside.</p>
        </SectionReveal>
        <SectionReveal className="mx-auto mt-12 grid max-w-[1080px] items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,.8fr)] lg:gap-16">
          <ImageButton image={modelAxonometric} onOpen={setViewer} className="aspect-[3/4] w-full bg-white" sizes="(min-width: 1024px) 55vw, 92vw" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-12">
            {modelDetails.map((image) => <ImageButton key={image.src} image={image} onOpen={setViewer} fit="cover" className="aspect-square w-full bg-white" sizes="(min-width: 1024px) 30vw, 45vw" />)}
          </div>
        </SectionReveal>
      </div>
    </section>
    </div>

    <CommonGroundImageDialog image={viewer} onClose={() => setViewer(null)} />
  </>;
}
