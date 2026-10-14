import { profile } from "@/content/portfolio";

export function Contact({ compact = false }: { compact?: boolean }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`bg-ink pb-32 text-sage-50 md:pb-36 ${compact ? "pt-20 md:pt-28" : "min-h-screen pt-28 md:pt-40"}`}>
      <div className="shell">
        <h2 id="contact-title" className={`flex items-center gap-3 uppercase text-sage-300 ${compact ? "t-label" : "font-mono text-lg tracking-[0.14em] sm:text-xl"}`}>
          <span aria-hidden className={`h-px bg-sage-300 ${compact ? "w-8" : "w-12"}`} />
          Contact me
        </h2>
        <div className={`${compact ? "mt-8" : "mt-12"} flex flex-wrap items-end gap-x-16 gap-y-8`}>
          <div>
            <p className="t-label mb-3 text-sage-300">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className={`group inline-block font-display text-sage-300 transition-colors hover:text-sage-100 ${compact ? "text-[1.15rem] leading-snug" : "text-[clamp(1.6rem,4.2vw,3.6rem)] font-light"}`}
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[var(--ease-expo)] group-hover:bg-[length:100%_1px]">
                {profile.email}
              </span>
            </a>
          </div>
        </div>
        <div className={`${compact ? "mt-14" : "mt-20"} grid gap-10 border-t border-white/12 pt-8 sm:grid-cols-3`}>
          <div>
            <p className="t-label text-sage-300">Elsewhere</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sage-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sage-300">
                  Instagram
                </a>
              </li>
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
    </section>
  );
}
