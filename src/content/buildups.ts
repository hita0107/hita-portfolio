import type { ImageId } from "./images";

export type Material =
  | "terrazzo"
  | "membrane"
  | "void"
  | "insulation"
  | "concrete"
  | "sand"
  | "lacquer"
  | "hardwood"
  | "plywood"
  | "mounts"
  | "ufh"
  | "vegetation"
  | "substrate"
  | "fleece"
  | "drainage"
  | "clt"
  | "timber"
  | "battens"
  | "cavity"
  | "pir"
  | "xps"
  | "steel"
  | "plasterboard"
  | "osb"
  | "board"
  | "corten"
  | "screed"
  | "hardcore"
  | "blockwork";

/** mm = null marks a membrane listed as "1 ply" (no stated thickness). */
export type Layer = {
  name: string;
  mm: number | null;
  material: Material;
  spec?: string;
  outsideTotal?: boolean;
};

export type BuildUp = {
  id: string;
  title: string;
  total?: number;
  ends?: [string, string];
  layers: Layer[];
  notes?: string[];
};

export type AnatomyStep = {
  id: string;
  title: string;
  drawing: ImageId;
  detail?: ImageId;
  hotspot?: { x: number; y: number; w: number; h: number };
  buildUps: BuildUp[];
};

const cgGround: BuildUp = {
  id: "cg-ground",
  title: "Ground Floor",
  total: 450,
  layers: [
    { name: "Terrazzo finish", mm: 30, material: "terrazzo" },
    { name: "Vapour control", mm: null, material: "membrane" },
    { name: "Void with timber battens", mm: 160, spec: "160 x 100mm", material: "void" },
    { name: "Insulation", mm: 80, material: "insulation" },
    { name: "Damp-proof membrane", mm: null, material: "membrane" },
    { name: "Concrete ground slab", mm: 180, material: "concrete" },
    { name: "Sand binding", mm: 25, material: "sand", outsideTotal: true },
  ],
  notes: ["Pad foundation: 200 x 600mm"],
};

const cgSprung: BuildUp = {
  id: "cg-sprung",
  title: "Sprung Flooring",
  total: 500,
  layers: [
    { name: "PU sport lacquer", mm: 1, material: "lacquer" },
    { name: "Hardwood sports surface", mm: 20, material: "hardwood" },
    { name: "Plywood distribution layer", mm: 18, material: "plywood" },
    { name: "Sprung mounts with timber battens", mm: 80, material: "mounts" },
    { name: "Underfloor heating", mm: 20, material: "ufh" },
    { name: "Vapour barrier", mm: 1, material: "membrane" },
    { name: "Void with timber battens", mm: 100, material: "void" },
    { name: "Insulation", mm: 80, material: "insulation" },
    { name: "Ground slab", mm: 180, material: "concrete" },
  ],
};

const cgGreenRoof: BuildUp = {
  id: "cg-green-roof",
  title: "Green Roof",
  total: 303,
  layers: [
    { name: "Vegetation layer", mm: 50, material: "vegetation", outsideTotal: true },
    { name: "Substrate", mm: 60, material: "substrate" },
    { name: "Filter fleece", mm: 5, material: "fleece" },
    { name: "Drainage layer", mm: 30, material: "drainage" },
    { name: "Root barrier", mm: 3, material: "membrane" },
    { name: "Waterproof membrane", mm: 3, material: "membrane" },
    { name: "Insulation", mm: 80, material: "insulation" },
    { name: "Vapour control layer", mm: 2, material: "membrane" },
    { name: "CLT panel", mm: 120, material: "clt" },
  ],
  notes: ["Glulam beam: 150 x 500mm"],
};

const cgCltWall: BuildUp = {
  id: "cg-clt-wall",
  title: "CLT External Wall",
  total: 300,
  ends: ["Outside", "Inside"],
  layers: [
    { name: "External timber cladding", mm: 20, material: "timber" },
    { name: "Ventilated cavity", mm: 20, material: "cavity" },
    { name: "Timber battens", mm: 80, spec: "40 x 80mm", material: "battens" },
    { name: "Insulation", mm: 100, material: "insulation" },
    { name: "CLT", mm: 80, material: "clt" },
  ],
};

export const commonGroundAnatomy: AnatomyStep[] = [
  {
    id: "ground",
    title: "Ground Floor",
    drawing: "cg-section-hall",
    detail: "cg-detail-ground",
    hotspot: { x: 173 / 841.9, y: (422 - 215) / 380.3, w: 55 / 841.9, h: 53 / 380.3 },
    buildUps: [cgGround],
  },
  {
    id: "sprung",
    title: "Sprung Flooring",
    drawing: "cg-section-hall",
    detail: "cg-detail-sprung",
    hotspot: { x: 728 / 841.9, y: (489 - 215) / 380.3, w: 55 / 841.9, h: 53 / 380.3 },
    buildUps: [cgSprung],
  },
  {
    id: "green-roof",
    title: "Green Roof",
    drawing: "cg-section-library",
    detail: "cg-detail-greenroof",
    hotspot: { x: 481 / 841.9, y: (296 - 229) / 366.3, w: 55 / 841.9, h: 53 / 366.3 },
    buildUps: [cgGreenRoof],
  },
  {
    id: "clt-wall",
    title: "CLT External Wall",
    drawing: "cg-section-library",
    detail: "cg-detail-cltwall",
    hotspot: { x: 204 / 841.9, y: (489 - 229) / 366.3, w: 55 / 841.9, h: 53 / 366.3 },
    buildUps: [cgCltWall],
  },
];

export const faithlieAnatomy: AnatomyStep[] = [
  {
    id: "parapet",
    title: "Parapet",
    drawing: "fc-detail-parapet",
    buildUps: [
      {
        id: "fc-parapet-roof",
        title: "1. Roof",
        layers: [
          { name: "Waterproofing membrane", mm: null, material: "membrane" },
          { name: "Roof board rigid PIR foam insulation", mm: 200, material: "pir" },
          { name: "Vapour control layer", mm: null, material: "membrane" },
          { name: "Concrete slab", mm: 150, material: "concrete" },
          { name: "Profiled steel decking", mm: 2, material: "steel" },
          { name: "Cavity", mm: 385, material: "cavity" },
          { name: "Plasterboard monolithic false ceiling", mm: 15, material: "plasterboard" },
          { name: "Timber battens", mm: 120, material: "battens" },
        ],
      },
      {
        id: "fc-parapet-wall",
        title: "2. Wall",
        ends: ["Inside", "Outside"],
        layers: [
          { name: "Vapour control layer", mm: null, material: "membrane" },
          { name: "Framing board rigid PIR foam insulation between metal studs", mm: 240, material: "pir" },
          { name: "Structural sheathing OSB board", mm: 9, material: "osb" },
          { name: "Fire protector board", mm: 12, material: "board" },
          { name: "Breather membrane", mm: null, material: "membrane" },
          { name: "Air gap", mm: 90, material: "cavity" },
          { name: "Weathering steel rainscreen cladding", mm: 6, material: "corten" },
        ],
      },
    ],
  },
  {
    id: "separating-floors",
    title: "Separating Floors",
    drawing: "fc-detail-floor",
    buildUps: [
      {
        id: "fc-floor",
        title: "Separating Floor",
        layers: [
          { name: "Topping screed", mm: 50, material: "screed" },
          { name: "Concrete slab", mm: 150, material: "concrete" },
          { name: "Profiled steel decking", mm: 2, material: "steel" },
          { name: "Cavity", mm: 385, material: "cavity" },
          { name: "Plasterboard monolithic false ceiling", mm: 15, material: "plasterboard" },
          { name: "Timber battens", mm: 120, material: "battens" },
        ],
      },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    drawing: "fc-detail-foundation",
    buildUps: [
      {
        id: "fc-foundation-floor",
        title: "1. Ground Floor",
        layers: [
          { name: "Concrete floating screed", mm: 80, material: "screed" },
          { name: "Floorboard rigid PIR foam insulation", mm: 120, material: "pir" },
          { name: "1200 gauge damp proof membrane as radon gas seal", mm: null, material: "membrane" },
          { name: "Concrete slab", mm: 200, material: "concrete" },
          { name: "Compacted graded inert", mm: 100, material: "hardcore" },
        ],
      },
      {
        id: "fc-foundation-wall",
        title: "2. Foundation Wall",
        ends: ["Inside", "Ground"],
        layers: [
          { name: "Blockwork foundation wall", mm: 140, material: "blockwork" },
          { name: "Rigid extruded polystyrene foam insulation", mm: 100, material: "xps" },
          { name: "Dimpled sheet cavity former membrane", mm: null, material: "membrane" },
          { name: "Filter layer", mm: null, material: "membrane" },
        ],
        notes: ["Concrete foundation"],
      },
    ],
  },
];

export const embodiedCarbon = {
  terms: [6480, 20000, 8518, 9750, 20000, 50000],
  totalKg: 114748,
  approxTonnes: "114",
};

export const verdantSpecs: { title: string; items: string[] }[] = [
  { title: "Green Roof", items: ["Stormwater Retention", "Waterproofing Membrane", "Bonding Adhesive", "Insulation", "Concrete Slab"] },
  {
    title: "Internal Floor",
    items: ["Structural Concrete Floor", "Anti-crack Slab Reinforcement Mesh", "Galvanized Steel Floor Decking", "Horizontal Beam", "Suspended Ceiling", "Timber Panel"],
  },
  {
    title: "External Wall",
    items: ["Triple Glazed Glass", "Aluminium Mullion", "Air Cavity", "Metal Mesh Catwalk", "Double Glazed Glass", "Concrete Mullion with Gap for Servicing"],
  },
  { title: "Internal Wall", items: ["Precast Concrete", "Batt Insulation", "Plaster Board Wall"] },
  { title: "Acoustic Barrier", items: ["Double Layer Wooden Panels", "Fiberglass Batt Insulation", "2x4 Studs", "2x6 Bottom Plate", "2x2 Corner Studs"] },
];

export const elysianDetails: { title: string; image: ImageId; items: string[] }[] = [
  {
    title: "Base Detail",
    image: "ea-detail-base",
    items: ["Ventilated timber cladding", "Wood fibre insulation", "CLT wall", "Load-bearing rigid insulation", "Concrete slab", "Damp proof membrane", "Slate fascia protecting insulation"],
  },
  {
    title: "Intermediate Floor Detail",
    image: "ea-detail-floor",
    items: ["Ventilated timber cladding", "Screed & sound absorption", "Rigid insulation", "Crosslam CLT floor", "Wood fibre insulation", "Crosslam CLT wall"],
  },
];
