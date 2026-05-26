"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/effects/tilt-card";
import { projects, projectCategories, type Project } from "@/data/projects";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] =
    useState<(typeof projectCategories)[number]>("All");

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
          number="04"
          eyebrow="projects"
          title="Selected work."
          description="Production-grade products I've built across marketplaces, dashboards, and portals."
        />

        <div className="mt-10 flex flex-wrap items-center gap-1.5">
          {projectCategories.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                type="button"
                suppressHydrationWarning
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className={cn(
                  "relative rounded-md border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
                  active
                    ? "border-primary/60 text-primary"
                    : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-md bg-primary/10"
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
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeInUp}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const hasLiveDemo = Boolean(project.demo) && project.demo !== "#";
  const hasGithub = Boolean(project.github) && project.github !== "#";

  return (
    <TiltCard className="rounded-xl">
      <div className="card-surface group relative h-full overflow-hidden p-6 transition-colors hover:border-primary/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-primary/70">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <span className="mono-caption">{project.category}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2">
          {project.features.map((f) => (
            <li
              key={f}
              className="flex gap-2 text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
          {hasLiveDemo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-primary transition-colors hover:text-foreground"
            >
              live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="font-mono text-[12px] text-muted-foreground">
              coming soon
            </span>
          )}
          {hasGithub ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              source
            </a>
          ) : null}
          <span className="ml-auto font-mono text-[11px] text-muted-foreground/70">
            {project.category}
          </span>
        </div>
      </div>
    </TiltCard>
  );
}
