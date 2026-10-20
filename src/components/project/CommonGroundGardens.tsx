import { CommonGroundGardenDiagram } from "./CommonGroundGardenDiagram";

export function CommonGroundGardens() {
  return (
    <section id="cg-gardens" aria-labelledby="cg-gardens-title" className="scroll-mt-28 bg-white py-16 md:py-24">
      <div className="shell">
        <CommonGroundGardenDiagram />
      </div>
    </section>
  );
}
