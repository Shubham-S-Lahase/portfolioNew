import { siteConfig } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { highlights, stats } from "@/data/highlights";
import { navItems } from "@/data/navigation";

/**
 * Structured portfolio context injected into the assistant system prompt.
 * Keep in sync with /data — the model should not invent facts beyond this.
 */
export function buildPortfolioKnowledge(): string {
  const skills = skillGroups.map((g) => ({
    group: g.title,
    description: g.description,
    skills: g.skills.map((s) => ({ name: s.name, proficiency: s.level })),
  }));

  const projectSummaries = projects.map((p) => ({
    title: p.title,
    slug: p.slug,
    category: p.category,
    tagline: p.tagline,
    description: p.description,
    features: p.features,
    stack: p.stack,
    demo: p.demo || null,
    github: p.github || null,
    portfolioAnchor: `#projects`,
  }));

  const experienceSummaries = experience.map((e) => ({
    company: e.company,
    role: e.role,
    period: e.period,
    location: e.location ?? null,
    description: e.description,
    bullets: e.bullets,
    stack: e.stack,
    portfolioAnchor: `#experience`,
  }));

  const payload = {
    profile: {
      name: siteConfig.name,
      role: siteConfig.role,
      tagline: siteConfig.tagline,
      intro: siteConfig.intro,
      location: siteConfig.location,
      email: siteConfig.email,
      phone: siteConfig.phone || null,
      siteUrl: siteConfig.url,
      resumeUrl: `${siteConfig.url}${siteConfig.resumeUrl}`,
      linkedin: siteConfig.socials.linkedin,
      github: siteConfig.socials.github,
      openTo: "Remote, hybrid, and onsite opportunities (based in India, IST)",
    },
    stats,
    strengths: highlights.map((h) => ({
      title: h.title,
      description: h.description,
    })),
    skills,
    experience: experienceSummaries,
    projects: projectSummaries,
    siteSections: navItems.map((n) => ({
      label: n.label,
      href: n.href,
      fullUrl: `${siteConfig.url}${n.href}`,
    })),
    resumeHighlights: [
      "Frontend craftsmanship — composable React/Next.js, typed APIs, design systems",
      "Full-stack delivery — MongoDB, Express, polished UI",
      "Real-time — WebSockets chat, notifications, live data",
      "Performance — code-splitting, caching, Core Web Vitals",
      "Accessibility — keyboard, ARIA, reduced motion",
      "Design sensibility — premium modern UI with strong UX",
    ],
    contact: {
      email: siteConfig.email,
      phone: siteConfig.phone || null,
      form: `${siteConfig.url}/#contact`,
      tip: "Visitors can use the contact form or email directly; typical reply within a day.",
    },
  };

  return JSON.stringify(payload, null, 2);
}

export const ASSISTANT_SUGGESTED_PROMPTS = [
  "Give me a 30-second pitch on Shubham for a hiring manager.",
  "What did he build at Biztoso, and which stack did he use?",
  "Which project best shows dashboard or admin UI skills?",
  "Is he a good fit for a senior frontend role on a marketplace product?",
  "How can I contact him for a role or project?",
] as const;
