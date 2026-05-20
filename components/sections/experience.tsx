"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experience } from "@/data/experience";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built and shipped"
          description="A timeline of roles, products, and the responsibilities I've owned."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mt-16"
        >
          {/* Vertical timeline rail */}
          <div
            aria-hidden
            className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:block"
          />

          <ul className="space-y-12">
            {experience.map((item, i) => {
              const sideRight = i % 2 === 1;
              return (
                <motion.li
                  key={item.company}
                  variants={fadeInUp}
                  className="relative md:grid md:grid-cols-2 md:gap-10"
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden
                    className="absolute left-4 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_4px_hsl(var(--primary)/0.6)] md:left-1/2 md:block"
                  />

                  <div
                    className={
                      sideRight
                        ? "md:col-start-2"
                        : "md:col-start-1 md:row-start-1"
                    }
                  >
                    <Card className="gradient-border glow-card">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5 text-primary" />
                          <span className="text-foreground">{item.period}</span>
                          {item.location ? (
                            <>
                              <span className="opacity-40">•</span>
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{item.location}</span>
                            </>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold tracking-tight">
                          {item.role}{" "}
                          <span className="text-muted-foreground"> @ </span>
                          <span className="gradient-text">{item.company}</span>
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>

                        <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span
                                aria-hidden
                                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span className="text-muted-foreground">{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.stack.map((tech) => (
                            <Badge key={tech} variant="outline" className="rounded-full">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
