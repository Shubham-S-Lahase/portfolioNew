import React, { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ContactForm from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <div className="fixed inset-0 overflow-hidden z-[-1]">
        <video
          src="/assets/bubbles-ofwaterrising.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <Header
          scrollToSection={scrollToSection}
          heroRef={heroRef}
          aboutRef={aboutRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
        <Hero
          ref={heroRef}
          scrollToProjects={() => scrollToSection(projectsRef)}
        />
        <About ref={aboutRef} />
        <Projects ref={projectsRef} />
        <ContactForm ref={contactRef} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
