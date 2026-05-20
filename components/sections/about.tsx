"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { highlights, stats } from "@/data/highlights";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="About"
          title="Engineer building products people love"
          description="I'm Shubham Lahase — a full-stack web developer specialized in frontend engineering. I've shipped marketplaces, admin panels, candidate portals, corporate websites, SAP plugin UIs, and components for low-code platforms."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-5 text-base leading-relaxed text-muted-foreground"
          >
            <motion.p variants={fadeInUp}>
              I focus on building <span className="text-foreground">scalable UI architectures</span>{" "}
              that stay fast, accessible, and maintainable as products grow. My day-to-day stack is
              React, Next.js, and TypeScript, paired with Redux Toolkit / React Query and a strong
              Node.js + Express backbone when I need it.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Across roles I&apos;ve worked on{" "}
              <span className="text-foreground">marketplaces with social features</span>, internal{" "}
              <span className="text-foreground">admin dashboards</span>,{" "}
              <span className="text-foreground">candidate portals</span>, corporate websites,{" "}
              <span className="text-foreground">SAP plugin UIs</span>, and{" "}
              <span className="text-foreground">low-code platform components</span> — usually owning
              the frontend end-to-end.
            </motion.p>
            <motion.p variants={fadeInUp}>
              I care about Core Web Vitals, semantic HTML, keyboard support, and the small UX
              details that make a product feel premium. I also enjoy real-time experiences and have
              shipped chat, notifications, and live data over WebSockets.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur"
                >
                  <div className="text-2xl font-semibold text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {highlights.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeInUp}>
                <Card className="gradient-border h-full">
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
        </div>
      </div>
    </section>
  );
}
