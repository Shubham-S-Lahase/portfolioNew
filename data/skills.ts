import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMui,
  SiRedux,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiGit,
  SiVite,
  SiWebpack,
  SiSocketdotio,
  SiGooglechrome,
} from "react-icons/si";
import { LuZap, LuAccessibility, LuSmartphone, LuBox } from "react-icons/lu";
import type { IconType } from "react-icons";

export type Skill = {
  name: string;
  icon: IconType;
  level: number; // 0–100 — drives the animated progress bar
  color: string; // tailwind text-color class for the icon glow
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Building accessible, pixel-perfect, performant UIs.",
    skills: [
      { name: "React", icon: SiReact, level: 95, color: "text-sky-400" },
      { name: "Next.js", icon: SiNextdotjs, level: 92, color: "text-zinc-100" },
      { name: "TypeScript", icon: SiTypescript, level: 90, color: "text-blue-400" },
      { name: "JavaScript", icon: SiJavascript, level: 95, color: "text-yellow-300" },
      { name: "HTML5", icon: SiHtml5, level: 95, color: "text-orange-400" },
      { name: "CSS3", icon: SiCss, level: 92, color: "text-sky-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 95, color: "text-cyan-400" },
      { name: "Material UI", icon: SiMui, level: 85, color: "text-indigo-400" },
    ],
  },
  {
    title: "State & Data",
    description: "Predictable state and efficient async data layers.",
    skills: [
      { name: "Redux Toolkit", icon: SiRedux, level: 90, color: "text-violet-400" },
      { name: "React Query", icon: SiReactquery, level: 88, color: "text-rose-400" },
      { name: "Zustand", icon: LuBox, level: 82, color: "text-amber-400" },
      { name: "Context API", icon: SiReact, level: 90, color: "text-sky-400" },
    ],
  },
  {
    title: "Backend",
    description: "REST APIs, real-time services, and data modeling.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 85, color: "text-green-400" },
      { name: "Express.js", icon: SiExpress, level: 84, color: "text-zinc-200" },
      { name: "REST APIs", icon: SiNodedotjs, level: 90, color: "text-emerald-400" },
      { name: "WebSockets", icon: SiSocketdotio, level: 82, color: "text-zinc-100" },
    ],
  },
  {
    title: "Tools",
    description: "The everyday toolbox that keeps shipping smooth.",
    skills: [
      { name: "Git", icon: SiGit, level: 92, color: "text-orange-500" },
      { name: "MongoDB", icon: SiMongodb, level: 85, color: "text-green-500" },
      { name: "Postman", icon: SiPostman, level: 88, color: "text-orange-400" },
      { name: "Chrome DevTools", icon: SiGooglechrome, level: 90, color: "text-sky-300" },
      { name: "Vite", icon: SiVite, level: 88, color: "text-violet-400" },
      { name: "Webpack", icon: SiWebpack, level: 80, color: "text-sky-400" },
    ],
  },
  {
    title: "Quality",
    description: "Performance, a11y, and responsive engineering.",
    skills: [
      { name: "Performance Optimization", icon: LuZap, level: 90, color: "text-yellow-400" },
      { name: "Accessibility (a11y)", icon: LuAccessibility, level: 85, color: "text-emerald-400" },
      { name: "Responsive Design", icon: LuSmartphone, level: 95, color: "text-sky-400" },
    ],
  },
];
