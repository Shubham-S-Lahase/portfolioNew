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
import { Card, CardContent } from "@/components/ui/card";
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
    description: "Code-splitting, caching, and bundle hygiene to keep Core Web Vitals green.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility",
    description: "Keyboard support, ARIA, contrast, and reduced-motion respect built-in.",
  },
  {
    icon: Sparkles,
    title: "Design sensibility",
    description: "Premium, modern UI that pairs cleanly with strong UX fundamentals.",
  },
];

export function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Resume"
          title="Career highlights"
          description="A snapshot of the strengths I bring to a team. Download the full resume below."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card className="gradient-border glow-card h-full">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/40 via-card/40 to-secondary/40 p-8 text-center backdrop-blur"
        >
          <h3 className="text-xl font-semibold">Want the full version?</h3>
          <p className="max-w-xl text-sm text-muted-foreground">
            Grab a PDF with my complete experience, project details, and contact info.
          </p>
          <Magnetic>
            <Button asChild variant="gradient" size="lg" className="mt-2">
              {/* TODO: Replace siteConfig.resumeUrl with your real resume file. */}
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
