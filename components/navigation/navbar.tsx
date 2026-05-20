"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > prev && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto mt-3 flex w-[min(96%,1180px)] items-center justify-between rounded-2xl border border-transparent px-4 py-3 transition-all sm:px-5",
          scrolled
            ? "border-border/60 bg-background/70 backdrop-blur-xl shadow-[0_10px_40px_-20px_hsl(var(--primary)/0.45)]"
            : "bg-transparent"
        )}
      >
        <Link
          href="#hero"
          className="group flex items-center gap-2"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-accent to-sky-400 text-sm font-bold text-background shadow-[0_6px_24px_-6px_hsl(var(--primary)/0.7)]">
            SL
            <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-sky-400 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild variant="gradient" size="sm" className="rounded-full">
            {/* TODO: Replace siteConfig.resumeUrl with your real resume file. */}
            <a href={siteConfig.resumeUrl} download>
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-secondary/30 text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mx-auto mt-2 w-[min(96%,1180px)] overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 p-3"
            >
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
                    className="block rounded-lg px-4 py-3 text-base text-foreground/90 hover:bg-secondary/60"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="px-2 pb-2 pt-3">
                <Button asChild variant="gradient" className="w-full">
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
