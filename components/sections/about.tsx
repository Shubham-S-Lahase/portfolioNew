"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Zap, GitBranch } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { LiveClock } from "@/components/effects/live-clock";
import { siteConfig } from "@/data/site";
import { stats } from "@/data/highlights";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-tight">
        <SectionHeading
          number="01"
          eyebrow="about"
          title="Engineer building products people love."
          description="Full-stack web developer specialized in frontend engineering — shipping marketplaces, admin panels, candidate portals, corporate websites, SAP plugin UIs, and low-code platform components."
          align="left"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[160px]"
        >
          {/* Bio — large card */}
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            variant="feature"
          >
            <div className="flex h-full flex-col">
              <span className="mono-caption">{"// the human version"}</span>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                I focus on building{" "}
                <span className="accent-text">scalable UI architectures</span>{" "}
                that stay fast, accessible, and maintainable as products grow.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Day-to-day stack: React, Next.js, and TypeScript, paired with
                Redux Toolkit / React Query and a Node.js + Express backbone
                when I need it. I care about Core Web Vitals, semantic HTML,
                keyboard support, and the small UX details that make a product
                feel premium.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I also enjoy real-time experiences and have shipped chat,
                notifications, and live data over WebSockets.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                <Tag>React</Tag>
                <Tag>Next.js</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Redux Toolkit</Tag>
                <Tag>React Query</Tag>
                <Tag>Node.js</Tag>
                <Tag>WebSockets</Tag>
              </div>
            </div>
          </BentoCard>

          {/* Live clock */}
          <BentoCard className="md:col-span-2">
            <LiveClock label="currently · IST" />
          </BentoCard>

          {/* Location */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <span className="mono-caption">based in</span>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xl font-semibold tracking-tight">
                  {siteConfig.location}
                </span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                open to remote · hybrid · onsite
              </span>
            </div>
          </BentoCard>

          {/* Now */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <span className="mono-caption">now</span>
              <div className="flex items-start gap-2">
                <Zap className="mt-1 h-4 w-4 text-primary" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  Building social marketplace UI and a low-code internal
                  platform at Biztoso.
                </p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                last updated · today
              </span>
            </div>
          </BentoCard>

          {/* Focus */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <span className="mono-caption">focus</span>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-1 h-4 w-4 text-primary" />
                <ul className="space-y-1 text-sm text-foreground/90">
                  <li>· performance &amp; CWV</li>
                  <li>· typed UI architecture</li>
                  <li>· real-time UX</li>
                </ul>
              </div>
              <span />
            </div>
          </BentoCard>

          {/* Workflow */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <span className="mono-caption">workflow</span>
              <div className="flex items-start gap-2">
                <GitBranch className="mt-1 h-4 w-4 text-primary" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  Ship fast. Measure. Refactor. Repeat. Prefer small PRs and
                  clean diffs.
                </p>
              </div>
              <span />
            </div>
          </BentoCard>

          {/* Stats — full width */}
          <BentoCard className="md:col-span-6">
            <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-mono text-3xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </span>
                  <span className="mono-caption mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "feature";
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "card-surface relative overflow-hidden p-5 sm:p-6 transition-transform duration-300",
        "hover:border-primary/40",
        variant === "feature" &&
          "bg-gradient-to-br from-card/90 via-card/70 to-card/40",
        className
      )}
    >
      {/* Corner accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
      {children}
    </span>
  );
}
