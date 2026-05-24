"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X, Search, Download } from "lucide-react";

import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
  });

  /* Lock scroll while mobile menu open */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* Section spy for nav highlight */
  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.href.replace("#", ""))];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto mt-3 flex w-[min(96%,1180px)] items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all sm:px-4",
          scrolled
            ? "border-border/70 bg-background/70 backdrop-blur-xl shadow-[0_10px_40px_-24px_hsl(var(--primary)/0.45)]"
            : "bg-transparent"
        )}
      >
        <Link
          href="#hero"
          className="group flex items-center gap-2"
          aria-label={`${siteConfig.name} — home`}
          data-cursor="home →"
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/15 text-xs font-bold text-primary">
            SL
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground sm:inline">
            shubham.dev
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-2 hidden items-center gap-0.5 md:flex"
        >
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const active = activeSection === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="jump →"
                className={cn(
                  "group relative rounded-md px-2.5 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-md bg-primary/10"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Command palette trigger */}
          <button
            type="button"
            onClick={openPalette}
            data-cursor="search ⌘K"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">search</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="kbd">⌘</span>
              <span className="kbd">K</span>
            </span>
          </button>

          <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
            <a href={siteConfig.resumeUrl} download data-cursor="download ↓">
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary/30 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-2 w-[min(96%,1180px)] overflow-hidden rounded-xl border border-border/70 bg-background/95 backdrop-blur-xl shadow-2xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-4 py-3 font-mono text-sm uppercase tracking-widest text-foreground/90 hover:bg-secondary/60"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="px-2 pb-2 pt-3">
                <Button asChild variant="default" className="w-full">
                  <a href={siteConfig.resumeUrl} download>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
