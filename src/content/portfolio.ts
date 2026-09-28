import type { ImageId } from "./images";

export const profile = {
  name: "Hita Shah",
  role: "MArch / RIBA Part 2",
  email: "hita0107@gmail.com",
  linkedin: "https://www.linkedin.com/in/hita-shah01/",
  instagram: "https://www.instagram.com/hita01_arch/",
  status: "Open to roles in Dubai",
  approach:
    "My approach combines conceptual design, technical development and a strong understanding of context, with particular interests in people-centred, sustainable and environmentally responsive architecture.",
  about: [
    "I am a Master of Architecture graduate from the University of Dundee, with RIBA Part 1 and Part 2 qualifications and previous architectural experience in Dubai. My approach combines conceptual design, technical development and a strong understanding of context, with particular interests in people-centred, sustainable and environmentally responsive architecture.",
    "Having studied and worked across different cultural and professional environments, I value adaptability, collaboration and thoughtful design solutions. This portfolio presents a selection of academic projects alongside professional work experience, demonstrating my development across research, design, visual communication and technical resolution, and my continued ambition to contribute to innovative architectural practices in Dubai.",
  ],
};

export type TimelineItem = {
  title: string;
  org: string;
  place: string;
  years: string;
  detail?: string;
  links?: { label: string; href: string }[];
};

export const education: TimelineItem[] = [
  {
    title: "Master of Architecture (MArch), RIBA Part 2",
    org: "University of Dundee",
    place: "United Kingdom",
    years: "2024 - 2026",
    links: [
      { label: "Common Ground, Year 5", href: "/work/common-ground/" },
      { label: "Faithlie Centre, Year 4", href: "/work/faithlie-centre/" },
      { label: "Elysian Arcadia, Year 4", href: "/work/elysian-arcadia/" },
    ],
  },
  {
    title: "Bachelor of Architecture (BA), RIBA Part 1",
    org: "University of Dundee",
    place: "United Kingdom",
    years: "2021 - 2024",
    links: [{ label: "Verdant Theatre, Year 3", href: "/work/verdant-theatre/" }],
  },
  {
    title: "International Baccalaureate Diploma Programme",
    org: "Gems Modern Academy",
    place: "United Arab Emirates",
    years: "2019 - 2021",
  },
];

export const experience: TimelineItem[] = [
  {
    title: "Architectural Assistant / Intern",
    org: "Design Concepts",
    place: "United Arab Emirates",
    years: "Jun - Sept 2024",
    detail:
      "Tender submission packages, architectural renders, landscape detailing and bay sections, as well as detailed drawings for flooring, ceilings, windows, toilets and the gymnasium.",
    links: [{ label: "See the work", href: "/work/design-concepts/" }],
  },
  {
    title: "Student Ambassador",
    org: "University of Dundee",
    place: "United Kingdom",
    years: "2021 - 2026",
  },
  {
    title: "Graphic Designer / Intern",
    org: "Pets in the City",
    place: "United Arab Emirates",
    years: "2019 - 2021",
  },
];

export const recognition = [
  { title: "TRACE (Featured)", org: "University of Dundee, United Kingdom", years: "2026" },
  { title: "Association of Dundee Architecture Students (Member)", org: "University of Dundee, United Kingdom", years: "2021 - 2026" },
  { title: "A Journey Through the SDGs", org: "Gems Modern Academy, United Arab Emirates", years: "2020" },
  { title: "Volunteer", org: "PoshPaws Kennels and Cattery, United Arab Emirates", years: "2019" },
];

export const certifications = [
  { title: "Revit Architecture & Enscape", org: "Autodesk / CADD International", years: "2024" },
  { title: "AutoCAD 2D & 3D", org: "Autodesk / CADD International", years: "2022" },
  { title: "The Architectural Imagination", org: "HarvardX", years: "2020" },
];

export const software = [
  { group: "Drafting", tools: ["AutoCAD", "ArchiCAD", "Rayon"] },
  { group: "3D Modelling", tools: ["SketchUp", "Rhino"] },
  { group: "Visualisation", tools: ["Enscape", "D5 Render", "V-Ray", "Lumion", "Twinmotion"] },
  { group: "Graphics", tools: ["Photoshop", "Canva", "Illustrator", "InDesign"] },
  { group: "BIM", tools: ["Revit"] },
  { group: "Documentation", tools: ["Microsoft Office", "Affinity", "InDesign"] },
];

export type ProjectSlug = "common-ground" | "faithlie-centre" | "verdant-theatre" | "elysian-arcadia" | "design-concepts";

export type Project = {
  slug: ProjectSlug;
  number: string;
  title: string;
  subtitle: string;
  stage: string;
  years: string;
  cover: ImageId;
  indexImage: ImageId;
  sheet: { label: string; value: string }[];
  paragraphs: string[];
};

export const projects: Project[] = [
  {
    slug: "common-ground",
    number: "1",
    title: "Common Ground",
    subtitle: "Reimagining Social Infrastructure As A Spatial System That Produces Encounter",
    stage: "Year 5 / 2025-2026",
    years: "2025-2026",
    cover: "cg-axo",
    indexImage: "cg-plan-1",
    sheet: [
      { label: "Stage", value: "Year 5, MArch" },
      { label: "Years", value: "2025-2026" },
      { label: "Site", value: "Edinburgh" },
      { label: "Brief", value: "Community centre" },
      { label: "Structure", value: "Glulam timber" },
    ],
    paragraphs: [
      "This project explores how architecture can rebuild social connections within Edinburgh’s rapidly expanding peripheral neighbourhoods. It responds to the growing separation between housing, work, leisure and civic life, where spaces for informal interaction are overlooked. Rather than proposing a single-purpose building, social infrastructure is conceived as an open framework that encourages people to interact and reimagines what a contemporary community centre can be.",
      "The primary aim was to investigate how architecture can deliberately create conditions of encounter between different groups, cultures and communities. It therefore combines hybrid programme of learning, recreation, wellbeing and community activities including a multipurpose hall, community kitchen, library, sensory room, and more. The three key topics structuring the research are: hybrid programme, biophilic design and phenomenology. Sustainability is embedded within this approach through passive environmental strategies, green roofs, and an integrated greenhouse and the use of renewable timber construction.",
      "The proposal was developed as a transferable spatial system including a courtyard-based organisation, glulam timber construction, adaptable rooms and carefully placed thresholds. Green roofs and the greenhouse extend the landscape, supporting biodiversity, food growing and environmental performance. These strategies together offer a new approach to a contemporary community infrastructure focusing on civic, social and landscape functions with an adaptable and sustainable architectural framework.",
    ],
  },
  {
    slug: "faithlie-centre",
    number: "2",
    title: "Faithlie Centre",
    subtitle: "Edinburgh Case Study",
    stage: "Year 4 / 2024-2025",
    years: "2024-2025",
    cover: "fc-model-1",
    indexImage: "fc-model-1",
    sheet: [
      { label: "Stage", value: "Year 4, MArch" },
      { label: "Years", value: "2024-2025" },
      { label: "Study", value: "Precedent and tectonics" },
      { label: "Materials", value: "Corten steel, retained stone" },
      { label: "Embodied carbon", value: "~ 114 tCO₂e" },
    ],
    paragraphs: [
      "For the Faithlie centre studio project, the focus was on understanding how architecture is actually put together, delivered and adapted in practice. Through precedent analysis and detailed model making, the project investigates the tectonic language of the building, particularly the relationship between the retained stone structures and the contemporary Corten steel extension. The physical model helped reveal how façade systems, circulation and structure were assembled translating drawings into an understanding of construction and material behaviour.",
      "The study also examined the praxis of architecture, including fire safety, health and construction safety, procurement, costs, conservation, sustainability and future proofing. The centre sits within a conservation area and retains much of the existing fabric, reducing demolition and embodied carbon. Material sourcing and environmental performance were considered through locally sourced Corten steel, retained masonry, passive ventilation, solar control and improved insulation. Overall, the project developed a stronger understanding of how architectural intent is balanced against regulation, construction, cost, and long-term building performance.",
    ],
  },
  {
    slug: "verdant-theatre",
    number: "3",
    title: "Verdant Theatre",
    subtitle: "Creating a new landmark building in Edinburgh for Musical Performances",
    stage: "Year 3 / 2023-2024",
    years: "2023-2024",
    cover: "vt-auditorium",
    indexImage: "vt-auditorium",
    sheet: [
      { label: "Stage", value: "Year 3, BA" },
      { label: "Years", value: "2023-2024" },
      { label: "Site", value: "Edinburgh, replacing a car park" },
      { label: "Programme", value: "480-seat theatre" },
      { label: "Interior", value: "Timber, for warmth and acoustics" },
    ],
    paragraphs: [
      "The project replaces an existing car park with a new cultural building for musical performance, while responding carefully to the surrounding historic context and the dramatic ground level changes. The proposal is centred around a 480-seat theatre, supported by rehearsal spaces, recording studios, dressing rooms, flexible studio space, café and public foyer spaces.",
      "A key focus is on the relationship between performance, movement, and user experience. The programme clearly distinguishes the public, performance and backstage functions while maintaining efficient circulation between them. The auditorium was developed through detailed studies of sightlines, acoustics, seating geometry and materiality, with timber used extensively to create a warm atmosphere and enhance acoustic performance.",
      "The building’s curved form responds to the changing topography, with a sloped landscaped ramp extending from the ground level to the roof, while creating opportunities for a green roof and framed views towards Edinburgh Castle. The design also uses double-height foyer spaces and visual connections between levels to make circulation part of the theatrical experience, allowing movement through the building to become visible.",
      "Overall, the project explores how a theatre can extend beyond performance itself, becoming a public landscape and social destination connecting movement, culture and the surrounding city.",
    ],
  },
  {
    slug: "elysian-arcadia",
    number: "4",
    title: "Elysian Arcadia",
    subtitle: "Reimagining an Urban Block through Timber and Vertical Farming",
    stage: "Year 4 / 2024-2025",
    years: "2024-2025",
    cover: "ea-courtyard",
    indexImage: "ea-courtyard",
    sheet: [
      { label: "Stage", value: "Year 4, MArch" },
      { label: "Years", value: "2024-2025" },
      { label: "Site", value: "Athens, former international airport" },
      { label: "Programme", value: "Mixed-use timber block" },
      { label: "Structure", value: "CLT and glulam, concrete cores" },
    ],
    paragraphs: [
      "Elysian Arcadia is a mixed-use timber development proposed as part of the regeneration of the city’s former international airport. The project transforms an extensive area of barren concrete into a more productive urban landscape, combining residential, commercial and community use within a connected urban block. Its architecture is informed by the Greek polykatoikia, reinterpreted through a contemporary approach to shared space, greenery and vertical living.",
      "At the centre of the proposal is the integration of vertical hydroponic farming into everyday urban life. Rather than treating agriculture as an external system, the growing spaces are embedded within the building, producing food for residents while creating opportunities for local markets, education and community activity. The combination of hydroponics, planted spaces, courtyards and green roofs introduces biodiversity and productive landscapes into a dense urban setting, while responding to wider concerns around food security, resource efficiency and ecological resilience.",
      "Sustainability also shapes the project’s construction strategy. CLT and glulam form the primary structural system, selected for their reduced embodied impact, prefabrication potential and suitability for adaptable construction, while concrete is strategically retained within cores and foundations for stability and fire protection due to the high temperatures in Athens. Passive ventilation, solar shading, green roofs and photovoltaic panels further reduce environmental impact and operational energy demand.",
    ],
  },
  {
    slug: "design-concepts",
    number: "5",
    title: "Design Concepts",
    subtitle: "Work Experience, United Arab Emirates",
    stage: "2024",
    years: "2024",
    cover: "tower-render",
    indexImage: "tower-render",
    sheet: [
      { label: "Role", value: "Architectural Assistant / Intern" },
      { label: "Period", value: "Jun - Sept 2024" },
      { label: "Practice", value: "Design Concepts" },
      { label: "Location", value: "United Arab Emirates" },
      { label: "Scope", value: "Tender packages, renders, details" },
    ],
    paragraphs: [
      "During my work experience at Design Concepts, an architectural and engineering consultancy specialising in urban planning and architectural design, I gained exposure to a range of live projects. I worked on projects ranging from luxury private villa in Abu Dhabi, JSS Private School in Jebel Ali, and a proposal for a multi-storey residential development in Al Furjan.",
      "My work included tender submission packages, architectural renders, landscape detailing and bay sections, as well as detailed drawings for flooring, ceilings, windows, toilets and the gymnasium. This gave me a better understanding of how design intent is translated into coordinated technical information and how individual drawing packages contribute to the delivery of a larger project.",
      "This experience gave me a better understanding of architectural practices in the UAE, particularly the level of coordination, documentation and technical detailing required as projects progress towards tender and construction.",
    ],
  },
];

export function projectBySlug(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export function nextProject(slug: ProjectSlug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
