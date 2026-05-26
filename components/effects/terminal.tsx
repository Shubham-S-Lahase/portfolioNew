"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import {
  banner,
  commands,
  visibleCommands,
  type CommandLine,
} from "@/data/terminal";
import { cn } from "@/lib/utils";

type Line =
  | { type: "input"; text: string }
  | { type: "output"; text: string; kind?: CommandLine["kind"] };

const PROMPT = "shubham@dev ~ $";

/**
 * A real interactive terminal used as the hero centerpiece.
 *
 * - Type any command + enter (try: help, projects, whoami)
 * - ↑ / ↓ to walk history
 * - Tab to complete a command name
 * - Animated prelude on mount (auto-runs `whoami`)
 * - `clear`, easter eggs (sudo, ls, vim, rm -rf /, …)
 */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [booted, setBooted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* Initial boot: banner + auto-`whoami` typing */
  useEffect(() => {
    let mounted = true;
    const boot = async () => {
      const startLines: Line[] = banner.map((b) => ({
        type: "output" as const,
        text: b.output ?? "",
        kind: b.kind,
      }));
      setLines(startLines);
      if (prefersReducedMotion) {
        const result = commands.whoami.run([]);
        const outs: Line[] =
          result.lines?.map((l) => ({
            type: "output" as const,
            text: l.output ?? "",
            kind: l.kind,
          })) ?? [];
        setLines((prev) => [
          ...prev,
          { type: "input", text: "whoami" },
          ...outs,
        ]);
        setBooted(true);
        return;
      }
      await sleep(700);
      const cmd = "whoami";
      let typed = "";
      for (const ch of cmd) {
        if (!mounted) return;
        typed += ch;
        setInput(typed);
        await sleep(70 + Math.random() * 40);
      }
      await sleep(300);
      if (!mounted) return;
      setInput("");
      runCommand(cmd, { skipFocus: true });
      setBooted(true);
    };
    boot();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-scroll on new lines */
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollTop = c.scrollHeight;
  }, [lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback(
    (rawInput: string, opts?: { skipFocus?: boolean }) => {
      const trimmed = rawInput.trim();
      const newLines: Line[] = [{ type: "input", text: trimmed }];
      if (!trimmed) {
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      const [name, ...args] = trimmed.split(/\s+/);
      const cmd = commands[name.toLowerCase()];
      if (!cmd) {
        newLines.push({
          type: "output",
          text: `command not found: ${name} — try \`help\``,
          kind: "error",
        });
        setLines((prev) => [...prev, ...newLines]);
        setHistory((h) => [trimmed, ...h]);
        setHistoryIdx(-1);
        if (!opts?.skipFocus) focusInput();
        return;
      }

      const result = cmd.run(args);

      if (result.clear) {
        setLines([]);
        setHistory((h) => [trimmed, ...h]);
        setHistoryIdx(-1);
        if (!opts?.skipFocus) focusInput();
        return;
      }

      const outs: Line[] =
        result.lines?.map((l) => ({
          type: "output" as const,
          text: l.output ?? "",
          kind: l.kind,
        })) ?? [];
      setLines((prev) => [...prev, ...newLines, ...outs]);
      setHistory((h) => [trimmed, ...h]);
      setHistoryIdx(-1);

      if (result.navigate) {
        // Smooth scroll to the section
        if (typeof window !== "undefined") {
          window.location.hash = result.navigate;
        }
      }
      if (result.openUrl) {
        if (typeof window !== "undefined") {
          window.open(result.openUrl, "_blank", "noopener,noreferrer");
        }
      }
      if (!opts?.skipFocus) focusInput();
    },
    [focusInput]
  );

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
        return;
      }
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (!input.trim()) return;
      const matches = Object.keys(visibleCommands()).filter((n) =>
        n.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { type: "input", text: input },
          { type: "output", text: matches.join("   "), kind: "muted" },
        ]);
        setInput(input);
      }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
      return;
    }
  };

  const suggestions = useMemo(
    () =>
      booted
        ? ["projects", "skills", "experience", "contact", "resume", "help"]
        : [],
    [booted]
  );

  return (
    <div
      className="terminal w-full max-w-3xl mx-auto"
      onClick={focusInput}
      role="region"
      aria-label="Interactive terminal — type commands to navigate the portfolio"
    >
      <div className="terminal-bar">
        <span className="terminal-dot bg-red-500/80" />
        <span className="terminal-dot bg-yellow-500/80" />
        <span className="terminal-dot bg-green-500/80" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          ~/shubham — zsh
        </span>
        <span className="ml-auto hidden sm:inline font-mono text-[10px] text-muted-foreground/70">
          press <span className="kbd">tab</span> to autocomplete ·{" "}
          <span className="kbd">↑</span> for history
        </span>
      </div>

      <div
        ref={containerRef}
        className="max-h-[420px] min-h-[300px] overflow-y-auto px-5 py-5 space-y-1 font-mono text-sm leading-relaxed no-scrollbar"
      >
        {lines.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="flex gap-2">
              <span className="text-primary shrink-0">{PROMPT}</span>
              <span className="text-foreground/90">{line.text}</span>
            </div>
          ) : (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={cn(
                "whitespace-pre-wrap",
                line.kind === "error" && "text-red-400",
                line.kind === "muted" && "text-muted-foreground",
                line.kind === "success" && "text-primary",
                !line.kind && "text-foreground/85"
              )}
            >
              {line.text}
            </motion.div>
          )
        )}

        {/* Live prompt */}
        <div className="flex gap-2 pt-1">
          <span className="text-primary shrink-0" aria-hidden>
            {PROMPT}
          </span>
          <span className="relative flex-1">
            <span className="invisible">{input || " "}</span>
            <input
              ref={inputRef}
              suppressHydrationWarning
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Terminal input"
              className="absolute inset-0 w-full bg-transparent text-foreground outline-none caret-primary"
            />
            {!focused && (
              <span
                className="caret pointer-events-none absolute left-0 top-0 bottom-0 inline-block w-[7px] translate-y-[2px] bg-primary"
                aria-hidden
              />
            )}
          </span>
        </div>
      </div>

      {/* Quick suggestions */}
      {booted && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 px-4 py-3">
          <span className="mono-caption mr-1">try</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              suppressHydrationWarning
              onClick={() => {
                runCommand(s);
              }}
              className="rounded-md border border-border bg-secondary/40 px-2 py-1 font-mono text-[11px] text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            >
              {s}
            </button>
          ))}
          <Link
            href="#about"
            className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            scroll for the human version ↓
          </Link>
        </div>
      )}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
