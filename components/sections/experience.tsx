"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/data/experience";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-tight">
        <SectionHeading
          number="03"
          eyebrow="experience"
          title="Where I've built and shipped."
          description="Roles, products, and the responsibilities I've owned."
        />

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mt-16 ml-3 sm:ml-6"
        >
          {/* Single vertical rail */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary/70 via-border to-transparent"
          />

          {experience.map((item, i) => (
            <motion.li
              key={item.company}
              variants={fadeInUp}
              className="relative grid grid-cols-1 gap-2 pb-16 pl-6 sm:pl-10"
            >
              {/* Dot */}
              <span
                aria-hidden
                className="absolute left-0 top-2 -translate-x-1/2 grid h-3 w-3 place-items-center rounded-full bg-background ring-1 ring-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_3px_hsl(var(--primary)/0.7)]" />
              </span>

              {/* Index */}
              <span className="absolute -left-2 -top-2 translate-x-[-110%] font-mono text-[11px] uppercase tracking-widest text-primary/60 hidden md:block">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  {item.period}
                </span>
                {item.location ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                ) : null}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                {item.role}{" "}
                <span className="text-muted-foreground">@ </span>
                <span className="text-foreground">{item.company}</span>
              </h3>

              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <ul className="mt-3 space-y-2 max-w-3xl">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
