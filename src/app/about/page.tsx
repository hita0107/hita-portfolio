import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
