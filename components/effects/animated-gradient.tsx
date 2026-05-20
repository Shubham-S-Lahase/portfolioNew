"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated multi-stop conic/radial gradient used behind the hero.
 * Pure CSS animation via keyframes, kept very low-cost.
 */
export function AnimatedGradient() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/3 left-1/2 h-[110vh] w-[110vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, hsl(228 100% 60% / 0.45), hsl(268 90% 65% / 0.4), hsl(190 100% 55% / 0.4), hsl(228 100% 60% / 0.45))",
        }}
        animate={
          prefersReducedMotion ? undefined : { rotate: [0, 360] }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
