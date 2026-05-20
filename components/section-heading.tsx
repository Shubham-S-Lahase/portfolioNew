"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

type SectionHeadingProps = {
  /** Editorial section number — e.g. "01", "02" */
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Editorial section header.
 * Renders a mono section number + eyebrow chip + display title + optional sub.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {number || eyebrow ? (
        <motion.div
          variants={fadeInUp}
          className={cn(
            "flex items-center gap-3",
            align === "center" ? "justify-center" : ""
          )}
        >
          {number ? (
            <span className="font-mono text-sm tracking-widest text-primary">
              <span className="text-primary/60">{number}</span>
              <span className="ml-0.5 text-primary/40">·</span>
            </span>
          ) : null}
          {eyebrow ? (
            <span className="mono-caption">{eyebrow}</span>
          ) : null}
        </motion.div>
      ) : null}

      <motion.h2
        variants={fadeInUp}
        className="heading text-balance"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeInUp}
          className={cn(
            "subheading text-pretty",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
