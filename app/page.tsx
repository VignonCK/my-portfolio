import Hero from "@/src/components/Hero";
import Projects from "@/src/components/Projects";
import Skills from "@/src/components/Skills";
import Contact from "@/src/components/Contact";

export default function Accueil() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] font-sans text-[var(--text-primary)]">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
