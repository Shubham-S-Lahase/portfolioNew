"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Desktop-only custom cursor with context labels.
 *
 * - Tracks the cursor with a small dot + larger ring
 * - Reads `data-cursor` on the hovered element (or its ancestors) and
 *   shows that as a label next to the cursor (e.g., "view →", "open ↗")
 * - Sensible defaults for <a>, <button>, inputs
 * - Hidden on touch devices and when reduced motion is preferred
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { damping: 30, stiffness: 600, mass: 0.4 });
  const dotY = useSpring(y, { damping: 30, stiffness: 600, mass: 0.4 });
  const ringX = useSpring(x, { damping: 22, stiffness: 200, mass: 0.6 });
  const ringY = useSpring(y, { damping: 22, stiffness: 200, mass: 0.6 });

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
        "a, button, [role='button'], [data-cursor], input, textarea, select, label"
      ) as HTMLElement | null;

      if (!interactive) {
        setHovering(false);
        setLabel(null);
        return;
      }

      setHovering(true);

      // Explicit override
      const explicit = interactive.getAttribute("data-cursor");
      if (explicit && explicit !== "hover") {
        setLabel(explicit);
        return;
      }

      // Smart defaults
      if (interactive.tagName === "A") {
        const href = interactive.getAttribute("href") ?? "";
        if (interactive.getAttribute("target") === "_blank") {
          setLabel("open ↗");
        } else if (href.startsWith("mailto:")) {
          setLabel("email ✉");
        } else if (href.startsWith("#")) {
          setLabel("jump →");
        } else if (interactive.getAttribute("download") !== null) {
          setLabel("download ↓");
        } else {
          setLabel("view →");
        }
        return;
      }

      if (interactive.tagName === "BUTTON") {
        const type = interactive.getAttribute("type");
        if (type === "submit") setLabel("send ↵");
        else setLabel("click");
        return;
      }

      if (
        interactive.tagName === "INPUT" ||
        interactive.tagName === "TEXTAREA"
      ) {
        setLabel("type ↵");
        return;
      }

      setLabel(null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.style.cursor = "";
    };
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ translateX: dotX, translateY: dotY }}
      >
        <span
          className={cn(
            "block -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-150",
            hovering ? "h-1.5 w-1.5" : "h-2 w-2"
          )}
        />
      </motion.div>

      {/* Outer ring + label */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[99]"
        style={{ translateX: ringX, translateY: ringY }}
      >
        <motion.div
          animate={{
            scale: hovering ? 1.4 : 1,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-200",
            hovering
              ? "h-9 w-9 border-primary/80 bg-primary/10"
              : "h-7 w-7 border-foreground/30"
          )}
        >
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur"
            >
              {label}
            </motion.span>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
}
