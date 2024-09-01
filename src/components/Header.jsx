import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = ({ scrollToSection, heroRef, aboutRef, projectsRef, contactRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: 'spring', stiffness: 50, delay: 0 }}
      className={`fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900 text-white border-b-2 border-gray-900'
          : 'bg-transparent text-black border-b-2 border-gray-300'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center w-full px-4 md:px-8">
        <div className="text-xl font-semibold hover:underline hover:scale-110">
        <a onClick={() => scrollToSection(heroRef)}>Home</a>
        </div>
        <nav>
          <ul className="flex space-x-4 text-lg md:text-xl font-semibold">
            <li className="hover:underline hover:scale-110">
              <a onClick={() => scrollToSection(aboutRef)}>About</a>
            </li>
            <li className="hover:underline hover:scale-110">
              <a onClick={() => scrollToSection(projectsRef)}>Projects</a>
            </li>
            <li className="hover:underline hover:scale-110">
              <a onClick={() => scrollToSection(contactRef)}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
