import Link from "next/link";
import Image from "next/image";
import { Picture } from "@/components/Picture";
import { GalleryReveal } from "@/components/home/GalleryReveal";
import { projects } from "@/content/portfolio";

const featured = [...projects].sort((a, b) => Number(b.years.slice(0, 4)) - Number(a.years.slice(0, 4)));

const galleryLayout = [
  { place: "sm:col-span-6 sm:col-start-1", shape: "aspect-[4/3]" },
  { place: "sm:col-span-5 sm:col-start-8 sm:mt-28", shape: "aspect-[5/4]" },
  { place: "sm:col-span-5 sm:col-start-2 sm:-mt-4", shape: "aspect-[5/4]" },
  { place: "sm:col-span-6 sm:col-start-7 sm:mt-32", shape: "aspect-[4/3]" },
  { place: "sm:col-span-7 sm:col-start-1 sm:-mt-8", shape: "aspect-[3/2]" },
] as const;

function Preview({ image, src }: { image: (typeof projects)[number]["indexImage"]; src?: string }) {
  if (src) {
    return <Image src={src} alt="" fill unoptimized sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />;
  }
  return <Picture id={image} alt="" sizes="(min-width: 768px) 45vw, 90vw" className="absolute inset-0 h-full w-full object-cover" />;
}

export function Desk() {
  return (
    <>
      <section id="top" aria-labelledby="home-title" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-white">
        <Picture id="vt-auditorium" alt="Interior view of Verdant Theatre" sizes="100vw" priority className="editorial-image absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
        <div className="shell relative flex h-full flex-col justify-end pb-9 md:pb-12">
          <h1 id="home-title" className="editorial-rise max-w-[1050px] font-display font-normal text-[clamp(3.4rem,8.2vw,9rem)] leading-[.82] tracking-[-.045em]" style={{ animationDelay: "120ms" }}>
            Hita Shah
          </h1>
          <div className="editorial-rise mt-8 flex flex-wrap items-end justify-between gap-6 text-[13px] md:mt-10" style={{ animationDelay: "220ms" }}>
            <p className="max-w-[620px] text-[15px] leading-relaxed text-white/90 md:text-[18px]">Master of Architecture graduate from the University of Dundee, with RIBA Part I and Part II qualifications.</p>
            <a href="#selected-work" className="editorial-link inline-flex items-center gap-3 pb-1 uppercase tracking-[.12em]">Explore work <span aria-hidden>↓</span></a>
          </div>
        </div>
      </section>

      <section id="selected-work" aria-label="Projects" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="shell">
          <GalleryReveal>
            <ol className="home-gallery grid gap-x-[4vw] gap-y-20 sm:grid-cols-12 sm:gap-y-32 lg:gap-y-40">
              {featured.map((project, index) => (
                <li key={project.slug} className={`home-gallery-card relative min-w-0 transition-opacity duration-500 ${galleryLayout[index]?.place ?? "sm:col-span-6"}`}>
                  <div data-gallery-reveal>
                    <Link href={`/work/${project.slug}/`} className="block transition-transform duration-500 ease-[var(--ease-expo)] hover:scale-[1.035] focus-visible:scale-[1.035] focus-visible:outline-offset-4">
                      <span className={`relative block overflow-hidden bg-cream ${galleryLayout[index]?.shape ?? "aspect-[4/3]"}`}>
                        <Preview image={project.indexImage} src={project.indexSrc} />
                      </span>
                      <span className="mt-3 flex items-start justify-between gap-4 text-[12px] leading-snug md:text-[13px]">
                        <span><span className="mr-3 text-ink-soft">{String(index + 1).padStart(2, "0")}</span>{project.title}</span>
                        <span className="shrink-0 text-ink-soft">{project.years}</span>
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </GalleryReveal>
          <div className="mt-16 text-right sm:mt-28">
            <Link href="/work/" className="editorial-link pb-1 text-[12px] uppercase tracking-[.15em]">View all projects ↗</Link>
          </div>
        </div>
      </section>
    </>
  );
}
