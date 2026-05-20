"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/effects/tilt-card";
import { projects, projectCategories, type Project } from "@/data/projects";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Production-grade products I've built across marketplaces, dashboards, portals, and real-time apps."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {projectCategories.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary via-accent to-sky-400 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.7)]"
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeInUp}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasLiveDemo = Boolean(project.demo) && project.demo !== "#";
  return (
    <TiltCard className="rounded-2xl">
      <Card className="gradient-border glow-card group relative h-full overflow-hidden">
        {/* Decorative glow */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70",
            project.accent
          )}
        />

        {project.image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60 bg-secondary/30">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
            {project.highlight ? (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Shipped
              </span>
            ) : null}
          </div>
        ) : null}

        <CardContent className="relative flex h-full flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant="outline" className="rounded-full">
                {project.category}
              </Badge>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.tagline}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="mt-4 grid gap-1.5 text-sm text-foreground/90 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="rounded-full">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild={hasLiveDemo}
              variant="gradient"
              size="sm"
              disabled={!hasLiveDemo}
              aria-disabled={!hasLiveDemo}
            >
              {hasLiveDemo ? (
                <a href={project.demo} target="_blank" rel="noreferrer noopener">
                  Live Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="opacity-70">Coming soon</span>
              )}
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noreferrer noopener">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
