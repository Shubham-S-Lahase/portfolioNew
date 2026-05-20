import type { IconType } from "react-icons";
import { LuRocket, LuLayers, LuShieldCheck, LuTrendingUp } from "react-icons/lu";

export type Highlight = {
  title: string;
  description: string;
  icon: IconType;
};

export const highlights: Highlight[] = [
  {
    title: "Performance-first",
    description:
      "Optimized rendering, code-splitting, and caching to ship fast experiences.",
    icon: LuRocket,
  },
  {
    title: "Scalable architecture",
    description:
      "Typed, modular component systems built to grow with the product.",
    icon: LuLayers,
  },
  {
    title: "Accessibility",
    description:
      "Keyboard, screen-reader, and reduced-motion friendly by default.",
    icon: LuShieldCheck,
  },
  {
    title: "Product mindset",
    description:
      "Understand the user, ship measurable improvements, iterate.",
    icon: LuTrendingUp,
  },
];

export const stats = [
  { label: "Years of experience", value: "3+" },
  { label: "Projects shipped", value: "20+" },
  { label: "Production deployments", value: "100+" },
  { label: "Components built", value: "500+" },
];
