import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ContactForm from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="fixed inset-0 overflow-hidden z-[-1]">
        <video src="/assets/bubbles-ofwaterrising.mp4" autoPlay muted loop className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <About/>
        <Projects/>
        <ContactForm/>
       <Footer/>
      </div>
    </div>
  );
}

export default App;