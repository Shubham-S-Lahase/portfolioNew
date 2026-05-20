"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
  Sparkles,
  User,
  Wrench,
  Eraser,
} from "lucide-react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Socials";
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
};

/**
 * Power-user command palette. Triggered by ⌘K / Ctrl+K.
 * - Fuzzy substring filtering on label + hint
 * - ↑ / ↓ to walk, Enter to run, Esc to close (Esc clears search first if typed)
 * - "Clear search" command + Ctrl+L clears the query
 * - Click outside to close
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* Global hotkey: ⌘K / Ctrl+K (Escape handled in input — clear first, then close) */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIdx(0);
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setActiveIdx(0);
    inputRef.current?.focus();
  }, []);

  const navTo = useCallback((hash: string) => {
    close();
    if (typeof window !== "undefined") {
      window.location.hash = hash;
    }
  }, [close]);

  const openUrl = useCallback(
    (url: string) => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignored */
    }
  }, []);

  const actions = useMemo<Action[]>(
    () => [
      // Navigate
      { id: "nav.home", label: "Home", group: "Navigate", icon: Home, perform: () => navTo("#hero") },
      { id: "nav.about", label: "About", group: "Navigate", icon: User, perform: () => navTo("#about") },
      { id: "nav.skills", label: "Skills", group: "Navigate", icon: Code2, perform: () => navTo("#skills") },
      { id: "nav.exp", label: "Experience", group: "Navigate", icon: Briefcase, perform: () => navTo("#experience") },
      { id: "nav.projects", label: "Projects", group: "Navigate", icon: Sparkles, perform: () => navTo("#projects") },
      { id: "nav.resume", label: "Resume highlights", group: "Navigate", icon: FileText, perform: () => navTo("#resume") },
      { id: "nav.contact", label: "Contact", group: "Navigate", icon: Mail, perform: () => navTo("#contact") },

      // Actions
      {
        id: "act.resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        icon: Download,
        perform: () => {
          close();
          const a = document.createElement("a");
          a.href = siteConfig.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "act.email",
        label: "Email me",
        hint: siteConfig.email,
        group: "Actions",
        icon: Mail,
        perform: () => {
          close();
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "act.copy_email",
        label: "Copy email",
        hint: siteConfig.email,
        group: "Actions",
        icon: Mail,
        perform: async () => {
          await copy(siteConfig.email);
          close();
        },
      },
      {
        id: "act.contact_form",
        label: "Open contact form",
        group: "Actions",
        icon: Wrench,
        perform: () => navTo("#contact"),
      },
      {
        id: "act.clear",
        label: "Clear search",
        hint: "reset query",
        group: "Actions",
        icon: Eraser,
        perform: clearSearch,
      },

      // Socials
      {
        id: "soc.linkedin",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/shubhamlahase",
        group: "Socials",
        icon: Linkedin,
        perform: () => openUrl(siteConfig.socials.linkedin),
      },
      {
        id: "soc.github",
        label: "Open GitHub",
        hint: "github.com/Shubham-S-Lahase",
        group: "Socials",
        icon: Github,
        perform: () => openUrl(siteConfig.socials.github),
      },
    ],
    [navTo, openUrl, copy, close, clearSearch]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => {
      const hay = `${a.label} ${a.hint ?? ""} ${a.group}`.toLowerCase();
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    });
  }, [actions, query]);

  /* Keep active index in range when filtering */
  useEffect(() => {
    if (activeIdx >= filtered.length) setActiveIdx(0);
  }, [filtered.length, activeIdx]);

  const grouped = useMemo(() => {
    const groups: Record<Action["group"], Action[]> = {
      Navigate: [],
      Actions: [],
      Socials: [],
    };
    filtered.forEach((a) => groups[a.group].push(a));
    return groups;
  }, [filtered]);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIdx]?.perform();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (query.trim()) clearSearch();
      else close();
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearSearch();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-md"
          onMouseDown={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border/80 bg-card/95 shadow-2xl ring-accent"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={handleKey}
                placeholder="Search commands…  try ‘projects’, ‘clear’, ‘resume’"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                aria-label="Search commands"
              />
              {query ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="kbd hover:border-primary/50 hover:text-foreground"
                  aria-label="Clear search"
                >
                  clear
                </button>
              ) : (
                <span className="kbd">esc</span>
              )}
            </div>

            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No matches for{" "}
                  <span className="font-mono text-foreground">{query}</span>
                </div>
              ) : (
                (Object.keys(grouped) as Array<Action["group"]>).map(
                  (group) => {
                    const items = grouped[group];
                    if (!items.length) return null;
                    return (
                      <div key={group} className="mb-1">
                        <div className="px-3 py-1.5 mono-caption">{group}</div>
                        {items.map((a) => {
                          const idx = filtered.indexOf(a);
                          const active = idx === activeIdx;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onMouseEnter={() => setActiveIdx(idx)}
                              onClick={() => a.perform()}
                              className={cn(
                                "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                                active
                                  ? "bg-primary/10 text-foreground"
                                  : "text-foreground/85 hover:bg-secondary/60"
                              )}
                            >
                              <a.icon
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  active ? "text-primary" : "text-muted-foreground"
                                )}
                              />
                              <span className="flex-1 truncate">{a.label}</span>
                              {a.hint && (
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  {a.hint}
                                </span>
                              )}
                              <ArrowRight
                                className={cn(
                                  "h-3.5 w-3.5 transition-opacity",
                                  active
                                    ? "opacity-100 text-primary"
                                    : "opacity-0"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  }
                )
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="kbd">↵</span>
                run
              </span>
              <span className="flex items-center gap-1.5">
                <span className="kbd">esc</span>
                {query ? "clear" : "close"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="kbd">⌘</span>
                <span className="kbd">L</span>
                clear
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
