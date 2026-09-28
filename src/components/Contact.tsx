import { SectionLabel } from "@/components/SectionLabel";
import { profile } from "@/content/portfolio";

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="bg-ink pb-32 pt-28 text-sage-50 md:pb-36 md:pt-40">
      <div className="shell">
        <SectionLabel tone="dark">Contact</SectionLabel>
        <h2 id="contact-title" className="t-display mt-10 max-w-4xl text-[clamp(2.6rem,6.4vw,6rem)] text-sage-50">
          {profile.status}.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-12 inline-block font-display text-[clamp(1.6rem,4.2vw,3.6rem)] font-light text-sage-300 transition-colors hover:text-sage-100"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[var(--ease-expo)] group-hover:bg-[length:100%_1px]">
            {profile.email}
          </span>
        </a>
        <div className="mt-20 grid gap-10 border-t border-white/12 pt-8 sm:grid-cols-3">
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
            <p className="mt-3">Selected Works 2022-26</p>
            <p className="text-sage-100/70">&copy; 2026 {profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
