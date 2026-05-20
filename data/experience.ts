export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Biztoso Technologies Pvt. Ltd.",
    role: "Frontend Developer",
    period: "Present",
    location: "India",
    description:
      "Building a large social + marketplace platform and a low-code internal product, owning frontend architecture and performance.",
    bullets: [
      "Architected feature modules for a social marketplace using React, Next.js, and TypeScript with reusable, typed component APIs.",
      "Built complex admin dashboards, candidate portals, and a low-code platform UI with drag-and-drop tooling.",
      "Optimized rendering, code-splitting, and data fetching (React Query) to cut TTI and improve Core Web Vitals.",
      "Implemented real-time features (chat, notifications) over WebSockets and integrated REST APIs with strong error handling.",
      "Established UI standards: design tokens, accessible components, and responsive layouts across the product suite.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "Material UI",
      "WebSockets",
    ],
  },
  {
    company: "Gajan Solutions India Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Previous role",
    location: "India",
    description:
      "Shipped corporate websites, SAP plugin UIs, and full-stack MERN applications with a strong focus on UX and reliability.",
    bullets: [
      "Built corporate websites and dashboards with React, JavaScript, and modern CSS — fully responsive and SEO-friendly.",
      "Developed SAP plugin frontends and admin panels, integrating with REST APIs and enterprise data sources.",
      "Designed REST endpoints with Node.js + Express and modeled data in MongoDB for client-facing apps.",
      "Collaborated cross-functionally with designers and backend teams to deliver features on tight timelines.",
    ],
    stack: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
    ],
  },
  {
    company: "10X Academy",
    role: "MERN Stack Developer Intern",
    period: "Internship",
    location: "Remote",
    description:
      "Hands-on training and project work across the full MERN stack with a strong emphasis on fundamentals and shipping.",
    bullets: [
      "Built end-to-end MERN projects: authentication, dashboards, CRUD apps, and API integrations.",
      "Practiced clean Git workflows, code reviews, and component-driven development.",
      "Deepened core knowledge of React rendering, hooks, and state management patterns.",
    ],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Git", "REST APIs"],
  },
];
