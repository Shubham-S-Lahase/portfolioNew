"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiSocketdotio,
  SiMui,
  SiHtml5,
  SiCss,
  SiPostman,
  SiVite,
} from "react-icons/si";
import { useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";

type Item = { name: string; Icon: IconType };

const ITEMS: Item[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Material UI", Icon: SiMui },
  { name: "Redux Toolkit", Icon: SiRedux },
  { name: "React Query", Icon: SiReactquery },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "WebSockets", Icon: SiSocketdotio },
  { name: "Git", Icon: SiGit },
  { name: "Postman", Icon: SiPostman },
  { name: "Vite", Icon: SiVite },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss },
];

/**
 * Infinite horizontal marquee of tech labels. Two identical tracks
 * sit side-by-side and translate -50% in lockstep so the loop is
 * seamless. Paused for reduced-motion users.
 */
export function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Stack"
      className="relative overflow-hidden border-y border-border/60 bg-card/30 py-8"
    >
      <div className="marquee-mask flex w-full overflow-hidden">
        <div
          className={`flex shrink-0 items-center gap-12 px-6 ${
            prefersReducedMotion ? "" : "animate-marquee"
          }`}
          aria-hidden={false}
        >
          {ITEMS.map((it) => (
            <Cell key={`a-${it.name}`} item={it} />
          ))}
        </div>
        <div
          aria-hidden
          className={`flex shrink-0 items-center gap-12 px-6 ${
            prefersReducedMotion ? "" : "animate-marquee"
          }`}
        >
          {ITEMS.map((it) => (
            <Cell key={`b-${it.name}`} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ item }: { item: Item }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
      <item.Icon className="h-4 w-4 text-primary/80" />
      <span>{item.name}</span>
      <span className="ml-12 text-border">/</span>
    </span>
  );
}
