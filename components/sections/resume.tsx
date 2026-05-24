"use client";

import { motion } from "framer-motion";
import {
  Download,
  Code2,
  Layers,
  Workflow,
  Gauge,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic-button";
import { siteConfig } from "@/data/site";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

const highlights = [
  {
    icon: Code2,
    title: "Frontend craftsmanship",
    description:
      "Composable React/Next.js components, typed APIs, and design-system thinking.",
  },
  {
    icon: Layers,
    title: "Full-stack delivery",
    description:
      "From Mongo + Express APIs to polished UI — comfortable across the stack.",
  },
  {
    icon: Workflow,
    title: "Real-time experience",
    description: "Chat, presence, and live updates built on WebSockets.",
  },
  {
    icon: Gauge,
    title: "Performance focus",
    description:
      "Code-splitting, caching, and bundle hygiene to keep Core Web Vitals green.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility",
    description:
      "Keyboard, ARIA, contrast, and reduced-motion respect — built-in.",
  },
  {
    icon: Sparkles,
    title: "Design sensibility",
    description:
      "Premium, modern UI that pairs cleanly with strong UX fundamentals.",
  },
];

export function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container-tight">
        <SectionHeading
          number="05"
          eyebrow="resume"
          title="Career highlights."
          description="The strengths I bring to a team — download the full resume below."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {highlights.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="card-surface p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-primary/60">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-border/70 bg-card/60 p-6 backdrop-blur sm:flex-row sm:items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">Want the full version?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              PDF with complete experience, projects, and contact info.
            </p>
          </div>
          <Magnetic>
            <Button asChild variant="default" size="lg">
              <a href={siteConfig.resumeUrl} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
