"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/effects/terminal";
import { Magnetic } from "@/components/effects/magnetic-button";
import { siteConfig } from "@/data/site";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      {/* Backdrop — subtle grid + warm spotlight, no rainbow gradient */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div
          className="absolute inset-x-0 top-0 h-[60vh] opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, hsl(78 100% 55% / 0.10), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container-tight relative z-10"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-10 lg:grid-cols-[1.05fr_1.15fr] lg:items-center"
        >
          {/* Left: editorial intro */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="mono-caption">
                available_for_work · {siteConfig.location}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="heading-display text-balance"
            >
              I build{" "}
              <span className="accent-text">scalable</span>,{" "}
              <span className="accent-text">high-performance</span>{" "}
              web experiences.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="subheading text-pretty"
            >
              {siteConfig.intro}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              <Magnetic>
                <Button asChild variant="default" size="lg">
                  <Link href="#projects">
                    View projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  {/* TODO: Replace siteConfig.resumeUrl with your real resume file. */}
                  <a href={siteConfig.resumeUrl} download>
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#contact">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6 flex items-center gap-3 text-xs text-muted-foreground"
            >
              <span className="h-px w-10 bg-border" />
              <span className="mono-caption">tip · press</span>
              <span className="kbd">⌘</span>
              <span className="kbd">K</span>
              <span className="mono-caption">to open the command palette</span>
            </motion.div>
          </div>

          {/* Right: interactive terminal */}
          <motion.div variants={fadeInUp} className="lg:pl-4">
            <Terminal />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mt-20 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span className="mono-caption">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
