"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

import { RoseIcon, RosePetalShape } from "@/components/assistant/rose-icon";
import { cn } from "@/lib/utils";

type RomanticRevealProps = {
  stanzas: string[];
  className?: string;
};

function FloatingRoses({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  const items = [
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `petal-${i}`,
      kind: "petal" as const,
      left: `${5 + (i * 11) % 88}%`,
      delay: i * 0.45,
      duration: 8 + (i % 3),
      size: 10 + (i % 2) * 4,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      id: `rose-${i}`,
      kind: "rose" as const,
      left: `${20 + i * 28}%`,
      delay: 1.2 + i * 1.8,
      duration: 11 + i,
      size: 18 + i * 4,
    })),
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-rose-400/40"
          style={{ left: p.left, top: "-12%" }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0%", "115%"],
            opacity: [0, 0.55, 0.35, 0],
            rotate: p.kind === "petal" ? [0, 140, 280] : [0, 25, -15],
            x: [0, (p.id.length % 2 === 0 ? 1 : -1) * 20, 0],
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
              className="text-rose-400/50"
            />
          ) : (
            <RosePetalShape
              width={p.size}
              height={p.size * 1.3}
              className="text-rose-300/45"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function StanzaDivider() {
  return (
    <div className="flex items-center gap-2 py-0.5" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-400/35 to-rose-300/20" />
      <RoseIcon className="h-3.5 w-3.5 text-rose-400/55 drop-shadow-[0_0_8px_rgba(251,113,133,0.4)]" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-400/35 to-rose-300/20" />
    </div>
  );
}

export function RomanticReveal({ stanzas, className }: RomanticRevealProps) {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? stanzas.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(stanzas.length);
      return;
    }
    setVisibleCount(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setVisibleCount(i);
      if (i < stanzas.length) {
        window.setTimeout(tick, 520);
      }
    };
    const start = window.setTimeout(tick, 400);
    return () => window.clearTimeout(start);
  }, [stanzas, reduceMotion]);

  return (
    <div
      className={cn(
        "romantic-poem relative overflow-hidden rounded-2xl border border-rose-300/30",
        "bg-[#1a0c12]",
        "px-4 py-5",
        "shadow-[inset_0_1px_0_0_rgba(255,192,203,0.15),0_0_60px_-12px_rgba(225,29,72,0.45)]",
        className
      )}
    >
      {/* Layered romantic glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-600/20 via-[#2a121c]/90 to-[#1a0a10]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-rose-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-6 h-36 w-36 rounded-full bg-pink-600/15 blur-3xl"
        aria-hidden
      />

      {/* Large watermark rose */}
      <RoseIcon
        className="pointer-events-none absolute -right-4 top-1/2 h-40 w-40 -translate-y-1/2 text-rose-500/[0.07]"
        aria-hidden
      />
      <RoseIcon
        className="pointer-events-none absolute -left-6 bottom-4 h-24 w-24 text-rose-400/[0.05] rotate-12"
        aria-hidden
      />

      <FloatingRoses reduced={!!reduceMotion} />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3 border-b border-rose-200/15 pb-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-full border border-rose-300/40 bg-gradient-to-br from-rose-500/25 to-rose-900/40 text-rose-200 shadow-[0_0_20px_-4px_rgba(244,63,94,0.6)]">
            <RoseIcon className="h-5 w-5 text-rose-300" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-400/80 blur-[1px]" />
          </span>
          <div>
            <p className="font-serif text-[15px] italic tracking-wide text-rose-50">
              for you
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-rose-300/65">
              written in quiet verses
            </p>
          </div>
          <Heart
            className="ml-auto h-4 w-4 animate-pulse text-rose-400/90 drop-shadow-[0_0_6px_rgba(251,113,133,0.8)]"
            fill="currentColor"
            aria-hidden
          />
        </div>

        <div className="max-h-[min(48vh,380px)] space-y-3 overflow-y-auto pr-0.5 no-scrollbar">
          {stanzas.slice(0, visibleCount).map((stanza, i) => (
            <div key={i} className="space-y-3">
              {i > 0 ? <StanzaDivider /> : null}
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                  "font-serif text-[13.5px] leading-[1.85] text-rose-50/95 whitespace-pre-line",
                  "text-shadow-[0_1px_12px_rgba(251,113,133,0.15)]"
                )}
              >
                {stanza}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
