"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "@/components/SiteImage";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { Project, ProjectSlug } from "@/content/portfolio";

type WallImage = { src: string; label: string };

const images: Record<ProjectSlug, [WallImage, WallImage, WallImage]> = {
  "common-ground": [
    { src: "/common-ground/long-section-1600.webp", label: "Long section" },
    { src: "/common-ground/hall-events-773.webp", label: "Multipurpose hall" },
    { src: "/common-ground/sensory-aerial-773.webp", label: "Sensory room" },
  ],
  "rooms-cities": [
    { src: "/rooms-cities/neighbourhoods/berlin/character.webp", label: "Berlin" },
    { src: "/rooms-cities/neighbourhoods/london/character.webp", label: "London" },
    { src: "/rooms-cities/neighbourhoods/tokyo/character.webp", label: "Tokyo" },
  ],
  "faithlie-centre": [
    { src: "/faithlie/submission/model/01.webp", label: "Physical model" },
    { src: "/faithlie/submission/model/04.webp", label: "Interior model" },
    { src: "/faithlie/submission/model/10.webp", label: "Façade detail" },
  ],
  "verdant-theatre": [
    { src: "/verdant-theatre/renders/auditorium.webp", label: "Auditorium" },
    { src: "/verdant-theatre/renders/castle-terrace.webp", label: "Castle Terrace" },
    { src: "/verdant-theatre/renders/foyer.webp", label: "Foyer" },
  ],
  "elysian-arcadia": [
    { src: "/elysian/submission/final/renders/6.webp", label: "Planted façade" },
    { src: "/elysian/submission/final/renders/1.webp", label: "The inhabited courtyard" },
    { src: "/elysian/submission/final/renders/2.webp", label: "Public life between blocks" },
  ],
  "jss-private-school": [
    { src: "/jss-private-school/renders/entrance.webp", label: "School entrance" },
    { src: "/jss-private-school/renders/arrival.webp", label: "Arrival" },
    { src: "/jss-private-school/renders/sports-field.webp", label: "Sports field" },
  ],
  "luxury-villa": [
    { src: "/luxury-villa/renders/front-elevation.webp", label: "Front elevation" },
    { src: "/luxury-villa/renders/courtyard.webp", label: "Courtyard" },
    { src: "/luxury-villa/renders/outdoor-room.webp", label: "Outdoor room" },
  ],
  "conceptual-multistorey": [
    { src: "/furjan-residences/cover.webp", label: "Building entrance" },
    { src: "/submissions/furjan-dusk-900.webp", label: "Dusk view" },
    { src: "/submissions/furjan-street-900.webp", label: "Street view" },
  ],
};

export function WorksWall({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-wall-reveal]", root.current).forEach((tile) => {
        gsap.fromTo(tile, { autoAlpha: 0, y: 54 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 92%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <ol ref={root} className="works-wall" aria-label="Project gallery">
      {projects.map((project, projectIndex) => (
        <li key={project.slug} className={`works-wall-project works-wall-project--${projectIndex % 4}`}>
          {images[project.slug].map((image, imageIndex) => (
            <div key={image.src} data-wall-reveal className={`works-wall-position works-wall-position--${imageIndex}`}>
              <Link href={`/work/${project.slug}/`} className="works-wall-tile group block" aria-label={`${project.title}: ${image.label}. View project`}>
                <span className="works-wall-frame relative block overflow-hidden bg-cream">
                  <Image
                    src={image.src}
                    alt={`${project.title} — ${image.label}`}
                    fill
                    unoptimized
                    sizes={imageIndex === 0 ? "(min-width: 768px) 55vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-expo)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transition-none"
                  />
                  <span className="works-wall-visit" aria-hidden="true">View project ↗</span>
                </span>
                <span className="mt-2 flex items-baseline justify-between gap-4 text-[11px] leading-snug md:text-[12px]">
                  <span>{imageIndex === 0 ? project.title : image.label}</span>
                  {imageIndex === 0 && <span className="shrink-0 text-ink-soft">{project.years}</span>}
                </span>
              </Link>
            </div>
          ))}
        </li>
      ))}
    </ol>
  );
}
