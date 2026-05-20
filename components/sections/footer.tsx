import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";

import { siteConfig } from "@/data/site";
import { navItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="container-tight py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="#hero" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/50 bg-primary/15 text-sm font-bold text-primary">
                SL
              </span>
              <span className="text-sm font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Twitter / X"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Sitemap
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-muted-foreground">{siteConfig.location}</li>
            </ul>
            <Link
              href="#hero"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Designed and built with Next.js, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
