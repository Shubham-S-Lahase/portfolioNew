"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { FloatingIcons } from "@/components/effects/floating-icons";
import { Particles } from "@/components/effects/particles";
import { TypingText } from "@/components/effects/typing-text";
import { Magnetic } from "@/components/effects/magnetic-button";
import { siteConfig } from "@/data/site";
import {
  staggerContainer,
  staggerWords,
  wordReveal,
  fadeInUp,
} from "@/lib/motion";

const headlineWords = "Frontend Developer crafting scalable, high-performance web experiences.".split(
  " "
);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <AnimatedGradient />
      <Particles className="z-0 opacity-70" />
      <FloatingIcons />

      <motion.div
        style={{ y, opacity, scale }}
        className="container-tight relative z-10 grid place-items-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Available for freelance & full-time roles</span>
          </motion.span>

          <motion.h1
            variants={staggerWords}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordReveal}
                className="inline-block"
              >
                <span
                  className={
                    /scalable|high-performance/.test(word)
                      ? "gradient-text"
                      : "text-foreground"
                  }
                >
                  {word}
                </span>
                {i < headlineWords.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span>I build with</span>
            <span className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-foreground">
              <TypingText
                phrases={[
                  "React + Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Redux Toolkit",
                  "React Query",
                  "Node.js + Express",
                  "WebSockets",
                ]}
              />
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <Button asChild variant="gradient" size="lg">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                {/* TODO: Replace siteConfig.resumeUrl with your real resume file. */}
                <a href={siteConfig.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="ghost" size="lg">
                <Link href="#contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-14 flex items-center gap-3 text-xs text-muted-foreground"
          >
            <span className="h-px w-12 bg-border" />
            <span>Scroll to explore</span>
            <span className="h-px w-12 bg-border" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
