"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiRedux,
  SiGit,
} from "react-icons/si";

const icons = [
  { Icon: SiReact, color: "text-sky-400", top: "10%", left: "8%", delay: 0 },
  { Icon: SiNextdotjs, color: "text-zinc-100", top: "22%", left: "85%", delay: 0.3 },
  { Icon: SiTypescript, color: "text-blue-400", top: "70%", left: "10%", delay: 0.7 },
  { Icon: SiTailwindcss, color: "text-cyan-400", top: "78%", left: "82%", delay: 0.5 },
  { Icon: SiNodedotjs, color: "text-green-400", top: "45%", left: "5%", delay: 1.1 },
  { Icon: SiMongodb, color: "text-green-500", top: "55%", left: "90%", delay: 0.9 },
  { Icon: SiRedux, color: "text-violet-400", top: "85%", left: "45%", delay: 0.4 },
  { Icon: SiGit, color: "text-orange-400", top: "8%", left: "48%", delay: 1.3 },
];

/**
 * Floating tech-icon decoration for the hero. Subtle drift and rotation.
 * Hidden on small screens to avoid visual clutter and save paint cost.
 */
export function FloatingIcons() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      {icons.map(({ Icon, color, top, left, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color} opacity-30`}
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.3, scale: 1 }
              : {
                  opacity: [0.18, 0.4, 0.18],
                  y: [0, -14, 0],
                  rotate: [0, 6, -6, 0],
                  scale: [0.95, 1.05, 0.95],
                }
          }
          transition={{
            duration: 8 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-[0_0_18px_currentColor]" />
        </motion.div>
      ))}
    </div>
  );
}
