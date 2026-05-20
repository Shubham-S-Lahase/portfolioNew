"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { getInitials } from "@/lib/utils";

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Testimonials"
          title="What teammates say"
          description="A few words from people I've worked with. (Placeholder — replace with real quotes.)"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div key={t.quote} variants={fadeInUp}>
              <Card className="gradient-border glow-card h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-5 w-5 text-primary" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary via-accent to-sky-400 text-sm font-semibold text-background">
                      {getInitials(t.name)}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
