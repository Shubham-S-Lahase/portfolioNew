"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypingTextProps = {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

/**
 * Lightweight typewriter used in the hero. Cycles through `phrases`,
 * pauses between each, and respects reduced-motion (renders the first
 * phrase statically when disabled).
 */
export function TypingText({
  phrases,
  className,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseMs = 1400,
}: TypingTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSub(phrases[0] ?? "");
      return;
    }
    const current = phrases[index % phrases.length];
    if (!deleting && sub === current) {
      const timeout = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(timeout);
    }
    if (deleting && sub === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSub((s) =>
          deleting ? current.substring(0, s.length - 1) : current.substring(0, s.length + 1)
        );
      },
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [
    sub,
    deleting,
    index,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseMs,
    prefersReducedMotion,
  ]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-live="polite">{sub || "\u00A0"}</span>
      {!prefersReducedMotion && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.1em] animate-blink bg-primary"
        />
      )}
    </span>
  );
}
