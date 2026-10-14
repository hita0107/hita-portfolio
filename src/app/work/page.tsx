import type { Metadata } from "next";
import { WorksIndex } from "@/components/home/WorksIndex";

export const metadata: Metadata = { title: "Projects" };

export default function WorkPage() {
  return (
    <main>
      <WorksIndex />
    </main>
  );
}
