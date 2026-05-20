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
  image?: string; // optional preview thumbnail (path inside /public)
  // TODO: Replace with the real GitHub repo URL for each project.
  github: string;
  // TODO: Replace with the real live-demo URL for each project.
  demo: string;
  accent: string; // gradient classes for hover glow
  highlight?: boolean; // shipped real projects are flagged true
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
    image: "/assets/cffs.gif",
    // TODO: Replace with the real GitHub repo for this project.
    github: "https://github.com/Shubham-S-Lahase",
    demo: "https://cffs.vercel.app/",
    accent: "from-amber-500/40 via-orange-500/30 to-rose-500/40",
    highlight: true,
  },
  {
    slug: "full-stack-blog-app",
    title: "Full Stack Blog App",
    tagline: "End-to-end MERN blog with auth, comments, and CRUD.",
    description:
      "A complete blog platform with a React frontend and a Node.js + Express backend. Users can sign up, sign in, and create, edit, or delete posts. Includes comment threads with their own moderation, plus efficient data handling and a clean, responsive UI.",
    features: [
      "JWT-based signup and sign-in",
      "Create, edit, and delete posts",
      "Comment threads with delete permissions",
      "REST API with Node.js + Express",
      "MongoDB persistence",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "CSS"],
    category: "Full-Stack",
    image: "/assets/blog.gif",
    // TODO: Replace with the real GitHub repo for this project.
    github: "https://github.com/Shubham-S-Lahase",
    demo: "https://clientzuai.onrender.com/",
    accent: "from-emerald-500/40 via-teal-500/30 to-sky-500/40",
    highlight: true,
  },
  {
    slug: "zoom-clone",
    title: "Zoom Clone",
    tagline: "Modern video-conferencing app with scheduling, recording, and reactions.",
    description:
      "A full-featured video conferencing app built with Next.js and Tailwind, using Stream.io for real-time A/V and Clerk for authentication. Users can start instant meetings, schedule calls, share screens, record sessions, and react with emojis.",
    features: [
      "Authenticated meetings via Clerk",
      "Real-time audio/video with Stream.io",
      "Screen sharing and emoji reactions",
      "Schedule, join, and record meetings",
      "Polished, responsive UI",
    ],
    stack: ["Next.js", "Tailwind CSS", "Clerk", "Stream.io", "MongoDB"],
    category: "Real-Time",
    image: "/assets/zoom.gif",
    // TODO: Replace with the real GitHub repo for this project.
    github: "https://github.com/Shubham-S-Lahase",
    demo: "https://zoomclone-sepia.vercel.app/",
    accent: "from-sky-500/40 via-blue-500/30 to-indigo-500/40",
    highlight: true,
  },
  {
    slug: "music-player-app",
    title: "Music Player App",
    tagline: "Responsive music player with drag-and-drop playlist and full controls.",
    description:
      "A feature-rich music player built in React. Users can browse songs, reorder the playlist by drag-and-drop, and control playback with play/pause, next/previous, shuffle, repeat, and a progress bar. Designed to feel great on both desktop and mobile.",
    features: [
      "Drag-and-drop playlist reordering",
      "Play, pause, next, previous controls",
      "Shuffle and repeat modes",
      "Interactive progress bar",
      "Optimized for desktop and mobile",
    ],
    stack: ["React", "CSS"],
    category: "Frontend",
    image: "/assets/msp.gif",
    // TODO: Replace with the real GitHub repo for this project.
    github: "https://github.com/Shubham-S-Lahase",
    demo: "https://music-player-sepia-xi.vercel.app/",
    accent: "from-fuchsia-500/40 via-pink-500/30 to-rose-500/40",
    highlight: true,
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
    github: "https://github.com/Shubham-S-Lahase",
    demo: "#",
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
    github: "https://github.com/Shubham-S-Lahase",
    demo: "#",
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
    github: "https://github.com/Shubham-S-Lahase",
    demo: "#",
    accent: "from-amber-500/40 via-orange-500/30 to-rose-500/40",
  },
  {
    slug: "real-time-web-app",
    title: "Real-Time Web App",
    tagline: "Collaborative real-time workspace.",
    description:
      "A real-time collaboration app with presence, live cursors, optimistic mutations, and offline-friendly sync. Built around WebSockets and a clean reactive UI.",
    features: [
      "Live presence and cursors",
      "Optimistic mutations with rollback",
      "Channel-based subscriptions",
      "Smart reconnection and offline queueing",
      "Granular access control",
    ],
    stack: [
      "React",
      "TypeScript",
      "Zustand",
      "WebSockets",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
    ],
    category: "Real-Time",
    github: "https://github.com/Shubham-S-Lahase",
    demo: "#",
    accent: "from-sky-500/40 via-blue-500/30 to-indigo-500/40",
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
