import type { Metadata } from "next";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <main>
      <Skills />
      <Contact />
    </main>
  );
}
