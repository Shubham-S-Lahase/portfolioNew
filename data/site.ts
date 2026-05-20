/**
 * Site-wide configuration.
 * Replace the placeholder URLs with your real links before deploying.
 */
export const siteConfig = {
  name: "Shubham Lahase",
  shortName: "Shubham",
  role: "Full-Stack Web Developer",
  tagline:
    "Frontend Developer crafting scalable, high-performance web experiences.",
  intro:
    "I build production-grade React & Next.js applications focused on speed, accessibility, and clean architecture — from large marketplaces to internal tooling.",
  location: "India",
  email: "shubhlahase@gmail.com",
  phone: "", // optional — leave empty to hide
  // TODO: Replace with your live portfolio URL once deployed.
  url: "https://shubhamlahase.dev",
  // TODO: Replace with your real resume file path inside /public.
  resumeUrl: "/Shubham-Lahase-Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/shubhamlahase/",
    // TODO: Replace with your real GitHub profile URL.
    github: "https://github.com/shubhamlahase",
    // TODO: Replace with your real Twitter/X URL or remove from footer.
    twitter: "https://x.com/shubhamlahase",
  },
  ogImage: "/og-image.png",
  keywords: [
    "Shubham Lahase",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "MERN Stack",
    "Portfolio",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
