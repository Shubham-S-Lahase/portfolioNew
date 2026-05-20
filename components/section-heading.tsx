"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
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
      {eyebrow ? (
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--primary))]" />
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2 variants={fadeInUp} className="heading text-balance">
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
