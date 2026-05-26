"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { RoseIcon, RosePetalShape } from "@/components/assistant/rose-icon";
import { cn } from "@/lib/utils";

type FlowerKind = "petal" | "rose" | "blossom";

type FallingItem = {
  id: string;
  kind: FlowerKind;
  left: string;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
};

function buildItems(count: number, seed: number): FallingItem[] {
  const kinds: FlowerKind[] = ["petal", "petal", "petal", "rose", "blossom"];
  return Array.from({ length: count }, (_, i) => {
    const n = (i + seed) * 7.919;
    const kind = kinds[Math.floor(n % kinds.length)];
    return {
      id: `f-${seed}-${i}`,
      kind,
      left: `${(n * 13.7) % 96}%`,
      delay: (n % 9) * 0.65,
      duration: 9 + (n % 7) * 1.4,
      size:
        kind === "rose" ? 14 + (i % 4) * 3 : kind === "blossom" ? 11 + (i % 3) * 2 : 8 + (i % 5) * 2,
      drift: ((i % 5) - 2) * 14,
      opacity: 0.12 + (n % 5) * 0.06,
    };
  });
}

type FallingFlowersBackgroundProps = {
  className?: string;
  /** More particles for full-screen backdrop vs chat panel */
  density?: "panel" | "backdrop";
};

export function FallingFlowersBackground({
  className,
  density = "panel",
}: FallingFlowersBackgroundProps) {
  const items = useMemo(
    () => buildItems(density === "backdrop" ? 22 : 16, density === "backdrop" ? 1 : 2),
    [density]
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-rose-950/30" />

      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: p.left,
            top: "-8%",
            opacity: p.opacity,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "108vh"],
            x: [0, p.drift, p.drift * 0.6, 0],
            rotate:
              p.kind === "petal"
                ? [0, 120, 240, 360]
                : [0, p.drift > 0 ? 25 : -25, 0],
            opacity: [0, p.opacity, p.opacity * 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.kind === "rose" ? (
            <RoseIcon
              width={p.size}
              height={p.size}
              className="text-rose-400/70 drop-shadow-[0_0_12px_rgba(251,113,133,0.25)]"
            />
          ) : p.kind === "blossom" ? (
            <span
              className="block text-rose-300/60 select-none"
              style={{ fontSize: p.size }}
            >
              ✿
            </span>
          ) : (
            <RosePetalShape
              width={p.size}
              height={p.size * 1.35}
              className="text-rose-300/55"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
