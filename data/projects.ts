export type ProjectCategory =
  | "Marketplace"
  | "Portal"
  | "Dashboard"
  | "Real-Time"
  | "Full-Stack"
  | "Frontend";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  category: ProjectCategory;
  github?: string;
  demo: string;
  accent: string; // gradient classes for hover glow
};

export const projects: Project[] = [
  {
    slug: "custom-feedback-form-system",
    title: "Custom Feedback Form System",
    tagline: "Drag-and-drop form builder with conditional logic and an admin dashboard.",
    description:
      "A versatile platform that lets users build and manage custom feedback forms. Built with React + Redux on the frontend and Firebase as the realtime backend. Features an intuitive drag-and-drop builder, conditional logic for showing forms based on URL/date/time, and an admin dashboard for tracking submissions.",
    features: [
      "Drag-and-drop form builder",
      "Conditional logic (URL / date / time triggers)",
      "Real-time submission handling via Firebase",
      "Admin dashboard for managing forms",
      "Role-aware UI and submission tracking",
    ],
    stack: ["React", "Material UI", "Redux", "Firebase"],
    category: "Dashboard",
    github: "https://github.com/Shubham-S-Lahase/cffs",
    demo: "https://cffs.vercel.app/",
    accent: "from-amber-500/40 via-orange-500/30 to-rose-500/40",
  },
  {
    slug: "marketplace-social-platform",
    title: "Marketplace & Social Platform",
    tagline: "A scalable C2C marketplace with a built-in social layer.",
    description:
      "A production-grade marketplace combining listings, profiles, social feeds, messaging, and notifications. Designed for high traffic with code-splitting, smart caching, and real-time updates.",
    features: [
      "Listings, search, and category filtering with server-side rendering",
      "Social feed, profiles, follows, and reactions",
      "Real-time chat and notifications over WebSockets",
      "Optimistic UI updates with React Query",
      "Role-based access and protected routes",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "Node.js",
      "WebSockets",
    ],
    category: "Marketplace",
    demo: "https://api.biztoso.com/",
    accent: "from-fuchsia-500/40 via-violet-500/30 to-sky-500/40",
  },
  {
    slug: "candidate-portal",
    title: "Candidate Portal",
    tagline: "Recruitment portal for candidates and recruiters.",
    description:
      "An end-to-end candidate portal with profile builders, job applications, recruiter dashboards, and interview tracking. Built with a focus on accessibility and clean UX.",
    features: [
      "Multi-step profile builder with autosave",
      "Job search, filters, and saved searches",
      "Recruiter dashboard with candidate pipeline",
      "Resume upload + parsing integration",
      "Application status tracking and notifications",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
    ],
    category: "Portal",
    demo: "https://www.gaiansolutions.com/",
    accent: "from-emerald-500/40 via-teal-500/30 to-sky-500/40",
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    tagline: "Premium admin & analytics dashboard.",
    description:
      "A modular admin dashboard with role-based access, analytics widgets, data tables, and bulk actions. Optimized for desktop power users and responsive on mobile.",
    features: [
      "Dynamic role and permission management",
      "Composable analytics widgets",
      "Server-side data tables with sorting, filters, and bulk actions",
      "Theming, keyboard shortcuts, and command palette",
      "Audit logs and activity tracking",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "React Query",
      "Node.js",
      "Express.js",
    ],
    category: "Dashboard",
    demo: "https://prodadmin257.biztoso.com/",
    accent: "from-amber-500/40 via-orange-500/30 to-rose-500/40",
  },
];

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Full-Stack",
  "Frontend",
  "Real-Time",
  "Dashboard",
  "Marketplace",
  "Portal",
];
