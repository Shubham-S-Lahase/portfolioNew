"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Desktop-only custom cursor with magnetic spring follow + hover scaling
 * on interactive elements. Falls back to native cursor on touch devices
 * and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.style.cursor = "";
    };
  }, [x, y, prefersReducedMotion]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ translateX: cursorX, translateY: cursorY }}
      >
        <motion.div
          animate={{ scale: hovering ? 1.6 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[99]"
        style={{ translateX: cursorX, translateY: cursorY }}
      >
        <motion.div
          animate={{
            scale: hovering ? 1.3 : 1,
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="-translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-primary/60 bg-primary/10 backdrop-blur-sm"
        />
      </motion.div>
    </>
  );
}
