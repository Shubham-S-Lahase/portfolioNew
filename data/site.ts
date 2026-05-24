/**
 * Site-wide configuration.
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
  phone: "+91 7709601253",
  url: "https://portfolio-new-nine-chi.vercel.app",
  resumeUrl: "/assets/Shubham.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/shubhamlahase/",
    github: "https://github.com/Shubham-S-Lahase",
  },
  ogImage: "/opengraph-image",
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
