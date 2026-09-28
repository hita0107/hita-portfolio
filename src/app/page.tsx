import { Desk } from "@/components/home/Desk";
import { Statement } from "@/components/home/Statement";
import { WorksIndex } from "@/components/home/WorksIndex";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <main>
        <Desk />
        <Statement />
        <WorksIndex />
        <About />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
