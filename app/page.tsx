import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { TechMarquee } from "@/components/effects/tech-marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechMarquee />
      <Experience />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}
