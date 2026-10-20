import type { Metadata } from "next";
import { WorksIndex } from "@/components/home/WorksIndex";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = { title: "Projects" };

export default function WorkPage() {
  return (
    <main>
      <WorksIndex />
      <Contact />
    </main>
  );
}
