"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

/**
 * 3D tilt + mouse-follow glow. The card tracks the cursor and updates
 * CSS variables (--mouse-x / --mouse-y) so the `.glow-card` overlay
 * defined in globals.css can render a soft spotlight.
 */
export function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 200, damping: 20 });
  const springY = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, (v) => `${v}deg`);
  const rotateY = useTransform(springX, (v) => `${v}deg`);
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    if (prefersReducedMotion) return;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    rx.set(px * intensity);
    ry.set(-py * intensity);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("glow-card will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
