import { siteConfig } from "@/data/site";

export type CommandKind = "text" | "react" | "navigate" | "open" | "clear";

export type CommandLine = {
  input?: string;
  output?: string;
  kind?: "info" | "muted" | "error" | "success";
};

export type CommandResult = {
  lines?: CommandLine[];
  navigate?: string;
  openUrl?: string;
  clear?: boolean;
  delayMs?: number;
};

export type CommandDef = {
  name: string;
  description: string;
  run: (rawArgs: string[]) => CommandResult;
  hidden?: boolean;
};

const wrap = (text: string): CommandLine[] =>
  text
    .trim()
    .split("\n")
    .map((line) => ({ output: line }));

export const commands: Record<string, CommandDef> = {
  help: {
    name: "help",
    description: "show this help message",
    run: () => ({
      lines: [
        { output: "available commands:" },
        { output: "" },
        ...Object.values(visible(commandsList())).map((c) => ({
          output: `  ${c.name.padEnd(12, " ")} ${c.description}`,
        })),
        { output: "" },
        { output: "tip: try `projects`, `skills`, or `whoami`" },
      ],
    }),
  },
  whoami: {
    name: "whoami",
    description: "a short bio",
    run: () => ({
      lines: wrap(`
${siteConfig.name} — ${siteConfig.role}
Based in ${siteConfig.location}.

I build production-grade React & Next.js applications
focused on speed, accessibility, and clean architecture.
`),
    }),
  },
  about: {
    name: "about",
    description: "long-form about",
    run: () => ({
      lines: wrap(`
> Full-Stack Web Developer specialized in frontend engineering.
> Shipped marketplaces, admin panels, candidate portals, corporate
> websites, SAP plugin UIs, and low-code platform components.

Stack: React, Next.js, TypeScript, Redux Toolkit, React Query,
Tailwind, Material UI, Node.js, Express, MongoDB, WebSockets.

Scroll down for the visual version. ↓
`),
    }),
  },
  skills: {
    name: "skills",
    description: "tech stack overview",
    run: () => ({
      lines: wrap(`
frontend   :: React · Next.js · TypeScript · JS · HTML5 · CSS3 · Tailwind · MUI
state/data :: Redux Toolkit · React Query · Zustand · Context API
backend    :: Node.js · Express.js · REST APIs · WebSockets
tools      :: Git · MongoDB · Postman · Chrome DevTools · Vite · Webpack
quality    :: Performance · Accessibility · Responsive Design
`),
    }),
  },
  experience: {
    name: "experience",
    description: "current and past roles",
    run: () => ({
      lines: wrap(`
[now]  Frontend Developer  @ Biztoso Technologies Pvt. Ltd.  · Bangalore
[prev] Full Stack Developer @ Gajan Solutions India Pvt. Ltd. · Hyderabad
[intern] MERN Stack Developer Intern @ 10X Academy           · Remote
`),
    }),
  },
  projects: {
    name: "projects",
    description: "selected work",
    run: () => ({
      lines: wrap(`
01. Marketplace & Social Platform   — api.biztoso.com
02. Admin Dashboard                 — prodadmin257.biztoso.com
03. Candidate Portal                — gaiansolutions.com

run \`open projects\` to scroll to the projects section.
`),
    }),
  },
  contact: {
    name: "contact",
    description: "how to reach me",
    run: () => ({
      lines: [
        { output: `email     ${siteConfig.email}` },
        { output: `linkedin  ${siteConfig.socials.linkedin}` },
        { output: `location  ${siteConfig.location}` },
        { output: "" },
        { output: "run `open contact` to jump to the form." },
      ],
    }),
  },
  socials: {
    name: "socials",
    description: "links & socials",
    run: () => ({
      lines: [
        { output: `linkedin  ${siteConfig.socials.linkedin}` },
        { output: `github    ${siteConfig.socials.github}` },
        { output: `email     ${siteConfig.email}` },
      ],
    }),
  },
  resume: {
    name: "resume",
    description: "download resume",
    run: () => ({
      lines: [
        { output: "downloading resume…", kind: "success" },
      ],
      openUrl: siteConfig.resumeUrl,
    }),
  },
  open: {
    name: "open",
    description: "open <section> — about | skills | experience | projects | contact",
    run: (args) => {
      const target = (args[0] || "").toLowerCase();
      const map: Record<string, string> = {
        about: "#about",
        skills: "#skills",
        experience: "#experience",
        projects: "#projects",
        contact: "#contact",
        resume: "#resume",
      };
      if (!target || !map[target]) {
        return {
          lines: [
            { output: `open: missing section name. try \`open projects\`.`, kind: "error" },
          ],
        };
      }
      return {
        lines: [{ output: `→ navigating to ${target}`, kind: "success" }],
        navigate: map[target],
      };
    },
  },
  clear: {
    name: "clear",
    description: "clear the screen",
    run: () => ({ clear: true }),
  },

  /* Easter eggs (hidden from help) */
  sudo: {
    name: "sudo",
    description: "",
    hidden: true,
    run: () => ({
      lines: [
        { output: "Permission denied: nice try ;)", kind: "error" },
      ],
    }),
  },
  ls: {
    name: "ls",
    description: "",
    hidden: true,
    run: () => ({
      lines: wrap(`
about.md     experience.md   projects/      skills.md
contact.md   resume.pdf      socials.md
`),
    }),
  },
  cat: {
    name: "cat",
    description: "",
    hidden: true,
    run: (args) => {
      const file = (args[0] || "").toLowerCase();
      if (file === "resume.pdf")
        return {
          lines: [
            { output: "binary file — try `resume` to download.", kind: "muted" },
          ],
        };
      if (!file)
        return {
          lines: [{ output: "cat: missing file operand", kind: "error" }],
        };
      return commands[file.replace(".md", "")]?.run([]) ?? {
        lines: [{ output: `cat: ${file}: No such file`, kind: "error" }],
      };
    },
  },
  rm: {
    name: "rm",
    description: "",
    hidden: true,
    run: (args) => {
      if (args.join(" ").includes("-rf /"))
        return {
          lines: wrap(`
nice try. running on read-only filesystem :)
your portfolio is safe.
`),
        };
      return { lines: [{ output: `rm: cannot remove`, kind: "error" }] };
    },
  },
  vim: {
    name: "vim",
    description: "",
    hidden: true,
    run: () => ({
      lines: wrap(`
:q! — sometimes the only way out
(this isn't a real editor, but i appreciate the choice.)
`),
    }),
  },
  exit: {
    name: "exit",
    description: "",
    hidden: true,
    run: () => ({
      lines: [{ output: "you can't exit. you're already home.", kind: "muted" }],
    }),
  },
  echo: {
    name: "echo",
    description: "",
    hidden: true,
    run: (args) => ({ lines: [{ output: args.join(" ") || "" }] }),
  },
  date: {
    name: "date",
    description: "",
    hidden: true,
    run: () => ({
      lines: [{ output: new Date().toString() }],
    }),
  },
};

function commandsList() {
  return commands;
}

function visible(all: Record<string, CommandDef>): Record<string, CommandDef> {
  return Object.fromEntries(
    Object.entries(all).filter(([, c]) => !c.hidden)
  );
}

export const visibleCommands = () => visible(commands);

/** Initial banner shown when the terminal mounts. */
export const banner: CommandLine[] = [
  { output: "shubham — interactive shell — type `help` to begin." },
];
