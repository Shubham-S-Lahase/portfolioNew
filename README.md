# Shubham Lahase — Portfolio

A premium, production-quality developer portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and shadcn-style UI primitives.

> Frontend Developer crafting scalable, high-performance web experiences.

---

## ✨ Features

- Dark, modern SaaS-style theme with animated gradients
- Hero with animated background, floating tech icons, typing effect, and magnetic CTAs
- About, Skills (grouped + animated progress bars), Experience (timeline), Projects (tilt cards + tech filter), Testimonials, Resume highlights, Contact (validated form with success animation)
- Sticky navbar with hide-on-scroll behavior + mobile menu
- Scroll-progress indicator at the top of the viewport
- Mouse-follow radial glow + desktop-only custom cursor
- Subtle canvas particle background
- Animated section reveals (Framer Motion) with staggered text
- Custom 404 page, animated loading state
- SEO metadata, OpenGraph, sitemap, robots
- Accessible: skip link, ARIA, focus styles, **respects `prefers-reduced-motion`**
- Fully responsive, mobile-first
- Clean, data-driven architecture

## 🧱 Stack

- Next.js 15 (App Router, React Server Components where suitable)
- React 19
- TypeScript
- Tailwind CSS + `tailwind-merge` + `class-variance-authority` + `tailwindcss-animate`
- Framer Motion
- `lucide-react` + `react-icons`
- shadcn/ui-style primitives (`Button`, `Card`, `Badge`, `Input`, `Textarea`, `Label`) built locally — no external registry needed.

## 📁 Folder structure

```
app/
  globals.css
  layout.tsx
  loading.tsx
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  navigation/
    navbar.tsx
  sections/
    hero.tsx
    about.tsx
    skills.tsx
    experience.tsx
    projects.tsx
    testimonials.tsx
    resume.tsx
    contact.tsx
    footer.tsx
  effects/
    animated-gradient.tsx
    custom-cursor.tsx
    floating-icons.tsx
    magnetic-button.tsx
    mouse-glow.tsx
    particles.tsx
    scroll-progress.tsx
    tilt-card.tsx
    typing-text.tsx
  ui/
    badge.tsx
    button.tsx
    card.tsx
    input.tsx
    label.tsx
    textarea.tsx
  section-heading.tsx
data/
  experience.ts
  highlights.ts
  navigation.ts
  projects.ts
  site.ts
  skills.ts
  testimonials.ts
lib/
  motion.ts
  utils.ts
public/
  README.md            # drop your resume PDF + og-image here
styles/                # reserved for additional CSS modules if needed
```

## 🚀 Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## 🔧 Things to customize before deploying

Search the codebase for `TODO:` — each one is a hot spot you may want to replace.

1. **Site info** — `data/site.ts` (URL, resume path, social links, OG image).
2. **Resume PDF** — drop `Shubham-Lahase-Resume.pdf` into `/public` (or change `siteConfig.resumeUrl`).
3. **OG image** — drop `og-image.png` into `/public` (1200×630 recommended).
4. **Project links** — `data/projects.ts` (GitHub + live demo URLs per project).
5. **Testimonials** — `data/testimonials.ts` (placeholder quotes).
6. **Contact form submission** — `components/sections/contact.tsx` — hook the `onSubmit` to your real backend (Resend, EmailJS, an API route, etc.).

## ♿ Accessibility & motion

- All non-essential animations honor `@media (prefers-reduced-motion: reduce)`.
- Skip-to-content link, focus-visible rings, ARIA on the form, and semantic landmarks.
- Custom cursor is disabled on touch devices and when reduced motion is preferred.

## 📦 Performance notes

- Server components for static sections (`page.tsx`, `footer.tsx`).
- Client components are scoped to interactive areas only.
- `optimizePackageImports` enabled for `framer-motion`, `lucide-react`, and `react-icons`.
- Canvas particle background is DPR-aware and capped at 2x.
- Heavy animations are GPU-friendly (transform / opacity) and avoid layout thrash.

## 📝 License

MIT — feel free to fork and adapt as a starting point for your own portfolio.
