"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { profile } from "@/content/portfolio";

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.from("[data-footer-reveal]", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <footer ref={root} id="contact" aria-labelledby="contact-title" className="bg-ink pb-10 pt-10 text-sage-50 md:pb-12 md:pt-12">
      <div className="shell">
        <h2 id="contact-title" data-footer-reveal className="text-[clamp(1.5rem,2.2vw,2.2rem)] font-normal leading-tight text-white">
          Contact me
        </h2>
        <div data-footer-reveal className="mt-5 flex flex-wrap items-end gap-x-16 gap-y-5">
          <div>
            <p className="t-label mb-3 text-sage-300">Email</p>
            <a href={`mailto:${profile.email}`} className="group inline-block font-display text-[1.15rem] leading-snug text-sage-300 transition-colors hover:text-sage-100">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[var(--ease-expo)] group-hover:bg-[length:100%_1px]">
                {profile.email}
              </span>
            </a>
          </div>
        </div>
        <div data-footer-reveal className="mt-7 grid gap-6 border-t border-white/12 pt-5 sm:grid-cols-3">
          <div>
            <p className="t-label text-sage-300">Elsewhere</p>
            <ul className="mt-3 space-y-1.5">
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sage-300">LinkedIn</a></li>
              <li><a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sage-300">Instagram</a></li>
            </ul>
          </div>
          <div>
            <p className="t-label text-sage-300">Qualification</p>
            <p className="mt-3">{profile.role}</p>
            <p className="text-sage-100/70">University of Dundee</p>
          </div>
          <div className="sm:text-right">
            <p className="t-label text-sage-300">Portfolio</p>
            <p className="mt-3">{profile.role}</p>
            <p className="text-sage-100/70">&copy; 2026 {profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
