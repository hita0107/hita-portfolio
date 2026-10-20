import Image from "@/components/SiteImage";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CarbonSum } from "./CarbonSum";

const calculations = [
  { material: "Corten steel cladding", basis: "270 m² × 8 kg/m² = 2,160 kg; × 3 kgCO₂e/kg", amount: "6,480" },
  { material: "Structural steel", basis: "8,000 kg × 2.5 kgCO₂e/kg", amount: "20,000" },
  { material: "Concrete", basis: "321 m² × 0.15 m + 20 m³ foundations = 68.15 m³; × 125 kgCO₂e/m³", amount: "8,518" },
  { material: "Glazing", basis: "260 m² × 25 kg/m² = 6,500 kg; × 1.5 kgCO₂e/kg", amount: "9,750" },
  { material: "Other materials", basis: "Plasterboard, insulation and MEP — estimated allowance; listed factor ~0.05 kgCO₂e/kg", amount: "20,000" },
  { material: "Existing stone", basis: "Refurbished stone structure — estimated allowance; listed factor 1–2 kgCO₂e/kg", amount: "50,000" },
] as const;

export function FaithlieCarbon() {
  return <section id="faithlie-carbon" aria-labelledby="faithlie-carbon-title" className="scroll-mt-32 bg-cream py-20 md:py-28">
    <div className="shell">
      <SectionReveal>
        <SectionLabel>Carbon emission</SectionLabel>
        <h2 id="faithlie-carbon-title" className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,5.5vw,5.5rem)] font-light leading-[.95] tracking-[-.045em] text-ink">Embodied carbon estimate</h2>
        <p className="mt-5 max-w-3xl text-base leading-[1.75] text-ink-soft">The Year 4 submission estimates the carbon associated with the principal materials in the Faithlie Centre adaptation. It includes the new Corten cladding, steel, concrete and glazing, alongside allowances for other materials and the refurbishment of the existing stone structure.</p>
      </SectionReveal>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-20">
        <div className="lg:sticky lg:top-40">
          <SectionReveal className="relative h-[min(68svh,720px)] min-h-[360px] overflow-hidden bg-white">
            <Image src="/faithlie/submission/context/facade.webp" fill alt="Faithlie Centre weathering-steel façade assembly model" unoptimized sizes="(min-width: 1024px) 48vw, 92vw" className="object-contain" />
          </SectionReveal>
        </div>
        <div className="min-w-0">
          <SectionReveal><CarbonSum /></SectionReveal>
          <SectionReveal className="mt-16">
            <SectionLabel>Calculation</SectionLabel>
            <h3 className="mt-5 font-display text-[clamp(2rem,3.2vw,3rem)] font-light leading-tight text-ink">How the estimate is built</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">Quantities and carbon factors are taken from page 14 of the project submission. Concrete uses the midpoint of its stated 100–150 kgCO₂e/m³ range; other materials and refurbished stone are estimated allowances.</p>
            <div className="mt-8 border-t border-sage-300/70">
              {calculations.map((item, index) => <div key={item.material} className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2 border-b border-sage-300/70 py-5">
                <span className="font-mono text-[11px] text-sage-700">{String(index + 1).padStart(2, "0")}</span>
                <h4 className="font-display text-lg text-ink">{item.material}</h4>
                <p className="whitespace-nowrap font-mono text-xs tabular-nums text-ink">{item.amount} <span className="text-ink-soft">kgCO₂e</span></p>
                <p className="col-start-2 col-end-4 text-sm leading-relaxed text-ink-soft">{item.basis}</p>
              </div>)}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">The submitted concrete subtotal is shown as 8,518 kgCO₂e; the unrounded multiplication of 68.15 m³ × 125 is 8,518.75 kgCO₂e. The total above follows the submission’s stated subtotal.</p>
          </SectionReveal>
        </div>
      </div>
    </div>
  </section>;
}
