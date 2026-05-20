"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { skillGroups } from "@/data/skills";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Skills"
          title="A pragmatic, modern toolkit"
          description="The libraries, tools, and disciplines I use every day to ship reliable, performant products."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={fadeInUp}>
              <Card className="gradient-border glow-card h-full">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-semibold tracking-tight">
                      {group.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {group.skills.length} items
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {group.description}
                  </p>

                  <ul className="mt-6 space-y-4">
                    {group.skills.map((skill, i) => (
                      <SkillRow key={skill.name} skill={skill} index={i} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
  skill: { name: string; level: number; color: string; icon: React.ComponentType<{ className?: string }> };
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
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewport}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05 * index,
          }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-sky-400 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
        />
      </div>
    </li>
  );
}
