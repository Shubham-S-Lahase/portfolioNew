"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/data/skills";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-tight">
        <SectionHeading
          number="02"
          eyebrow="skills"
          title="A pragmatic, modern toolkit."
          description="The libraries, tools, and disciplines I reach for every day to ship reliable, performant products."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={fadeInUp}
              className="card-surface group p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-semibold tracking-tight">
                  <span className="mr-2 font-mono text-xs text-primary/60">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>
                <span className="mono-caption">{group.skills.length} items</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {group.description}
              </p>

              <ul className="mt-6 space-y-4">
                {group.skills.map((skill, i) => (
                  <SkillRow key={skill.name} skill={skill} index={i} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillRow({
  skill,
  index,
}: {
  skill: {
    name: string;
    level: number;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index: number;
}) {
  const { icon: Icon, name, level, color } = skill;
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2.5">
          <Icon className={cn("h-4 w-4", color)} />
          <span className="text-foreground/90">{name}</span>
        </span>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {level}%
        </span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-secondary/70">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewport}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.04 * index,
          }}
          className="h-full rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
        />
      </div>
    </li>
  );
}
