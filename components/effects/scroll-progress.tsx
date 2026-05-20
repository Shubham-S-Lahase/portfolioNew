"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar pinned to the top edge of the viewport.
 * Tracks the document scroll position.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}
