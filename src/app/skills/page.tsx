import type { Metadata } from "next";
import { Skills } from "@/components/home/Skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <main>
      <Skills />
    </main>
  );
}
