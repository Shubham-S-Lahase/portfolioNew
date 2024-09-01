import React, { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';

const Hero = forwardRef(({ scrollToProjects }, ref) => {
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 1,
    type: 'spring',
    stiffness: 50,
  };

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden border-b-2 border-gray-300">
      {showElements && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 0.3 }}
            className="relative rounded-full w-24 h-24 md:w-48 md:h-48 mb-4 overflow-hidden"
          >
            <img
              src="/assets/me2.png"
              alt="Profile Background"
              className="absolute inset-0 w-full h-full object-cover filter blur-lg"
            />
            <img
              src="/assets/me.png"
              alt="Profile"
              className="relative object-contain w-full h-full"
            />
          </motion.div>
          <motion.h3
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 0.6 }}
            className="text-slate-700 font-semibold text-3xl md:text-6xl mb-2"
          >
            Hello..
          </motion.h3>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 0.9 }}
            className="text-slate-800 text-5xl md:text-9xl mb-4"
          >
            I'm Shubham
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 1.2 }}
            className="text-slate-950 text-lg md:text-xl mb-4 text-center"
          >
            A passionate developer specializing in Frontend Development.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 1.5 }}
            className="flex space-x-2 md:space-x-4 mb-6"
          >
            <span>
              <a href="mailto:shubhamlahase@gmail.com">
                <img src="/assets/mail.png" alt="Email" className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/shubhamlahase">
                <img src="/assets/linkedin.png" alt="LinkedIn" className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </span>
            <span>
              <a href="https://github.com/Shubham-S-Lahase">
                <img src="/assets/github.png" alt="GitHub" className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </span>
            <span>
              <a href="tel:7709601253">
                <img src="/assets/call.png" alt="Call" className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </span>
          </motion.div>
          <motion.button
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ ...transition, delay: 1.8 }}
            className="text-zinc-950 py-1 md:py-2 px-2 md:px-4 rounded-lg border-2 border-gray-600 hover:bg-slate-800 hover:text-pink-50 hover:border-slate-800"
            onClick={scrollToProjects}
          >
            View My Work
          </motion.button>
        </div>
      )}
    </div>
  );
});

export default Hero;