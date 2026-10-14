import { SectionLabel } from "@/components/SectionLabel";
import { CommonGroundPlate } from "./CommonGroundPlate";
import { CommonGroundSiteAnalysis } from "./CommonGroundSiteAnalysis";

export const CommonGroundSite = CommonGroundSiteAnalysis;

export function CommonGroundConstruction() {
  return (
    <section id="cg-construction" aria-label="Construction" className="scroll-mt-28 bg-white py-12 md:py-16">
      <div className="shell">
        <SectionLabel>Construction</SectionLabel>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12">
          <div>
            <h2 className="font-display text-[clamp(1.35rem,2.1vw,1.8rem)] font-light leading-tight text-ink-soft">Timber, roof and ground</h2>
            <p className="mt-5 max-w-md font-display text-base leading-relaxed text-ink-soft">
              The long section traces the hall, courtyard, library and landscape. Explore the animated construction build-ups below.
            </p>
          </div>
          <CommonGroundPlate
            id="long-section"
            label="Long section"
            alt="Long section through Common Ground, showing the hall, courtyard, library and landscape."
            sizes="(min-width: 768px) 56vw, 92vw"
          />
        </div>
      </div>
    </section>
  );
}
