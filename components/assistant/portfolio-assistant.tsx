"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Loader2,
  MessageCircle,
  Minus,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  X,
} from "lucide-react";

import { MessageContent } from "@/components/assistant/message-content";
import { RomanticReveal } from "@/components/assistant/romantic-reveal";
import { RoseIcon } from "@/components/assistant/rose-icon";
import { useAssistantChat } from "@/components/assistant/use-assistant-chat";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import {
  ASSISTANT_SUGGESTED_PROMPTS,
} from "@/lib/portfolio-knowledge";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "portfolio-assistant:open";
const MAX_INPUT = 600;

function getMessageText(
  message: { parts: Array<{ type: string; text?: string }> }
): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [setupError, setSetupError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reduceMotion = useReducedMotion();

  const {
    messages,
    error,
    romantic,
    isBusy,
    sendUserMessage,
    stop,
    clearChat,
  } = useAssistantChat();

  const roseMode = romantic !== null;

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, romantic, isBusy, scrollToBottom]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!error) return;
    const msg = error.message ?? "";
    const lower = msg.toLowerCase();
    if (msg.includes("503") || lower.includes("not configured")) {
      setSetupError(
        "Add GROQ_API_KEY in .env.local (or Vercel). Free key: console.groq.com/keys — no credit card."
      );
      return;
    }
    if (lower.includes("rate limit") || lower.includes("quota")) {
      setSetupError(
        "Groq rate limit hit. Wait a minute and try again, or set GROQ_MODEL=llama-3.1-8b-instant in .env.local."
      );
    }
  }, [error]);

  const submitText = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isBusy) return;
      setSetupError(null);
      setInput("");
      await sendUserMessage(trimmed);
    },
    [isBusy, sendUserMessage]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitText(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submitText(input);
    }
  };

  const handleClearChat = () => {
    clearChat();
    setSetupError(null);
    setInput("");
  };

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-[85] backdrop-blur-sm",
              roseMode
                ? "bg-rose-950/40 sm:bg-rose-950/25"
                : "bg-background/50 sm:bg-background/35"
            )}
            aria-hidden
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            role="dialog"
            aria-label="Portfolio AI assistant"
            aria-modal="true"
            {...panelMotion}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className={cn(
              "fixed z-[86] flex flex-col overflow-hidden border backdrop-blur-xl",
              "inset-x-3 bottom-20 top-auto h-[min(72vh,640px)] rounded-2xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:w-[min(100vw-2rem,420px)]",
              roseMode
                ? "border-rose-300/35 bg-gradient-to-b from-[#241018]/98 via-[#2d1520]/97 to-[#1a0c12]/98 shadow-[0_0_80px_-20px_rgba(225,29,72,0.5),0_24px_60px_-24px_rgba(190,18,60,0.35)] ring-1 ring-rose-400/10"
                : "border-border/80 bg-card/95 shadow-[0_24px_80px_-24px_hsl(var(--primary)/0.25)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <header
              className={cn(
                "flex items-center gap-3 border-b px-4 py-3",
                roseMode ? "border-rose-200/10" : "border-border/70"
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl border shadow-[0_0_24px_-8px_hsl(var(--primary)/0.8)]",
                  roseMode
                    ? "border-rose-300/40 bg-gradient-to-br from-rose-500/20 to-rose-900/30 text-rose-200 shadow-[0_0_24px_-6px_rgba(244,63,94,0.7)]"
                    : "border-primary/40 bg-primary/15 text-primary"
                )}
              >
                {roseMode ? (
                  <RoseIcon className="h-5 w-5 text-rose-300" aria-hidden />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-semibold tracking-tight",
                    roseMode && "font-serif italic text-rose-100/95"
                  )}
                >
                  {roseMode ? "A quiet letter" : "Portfolio Guide"}
                  {!roseMode && (
                    <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                  )}
                </p>
                <p
                  className={cn(
                    "truncate text-xs",
                    roseMode ? "text-rose-300/55" : "text-muted-foreground"
                  )}
                >
                  {roseMode
                    ? "just between us"
                    : `Expert on ${siteConfig.shortName}'s work · Llama (open source)`}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Clear conversation"
                  onClick={handleClearChat}
                  disabled={messages.length === 0 && !input}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Minimize assistant"
                  onClick={() => setOpen(false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Close assistant"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 ? (
                <Welcome onPick={submitText} />
              ) : (
                messages
                  .filter((message) => {
                    if (message.role !== "assistant") return true;
                    return getMessageText(message).trim().length > 0;
                  })
                  .map((message) => {
                  const text = getMessageText(message);
                  const isUser = message.role === "user";
                  const showRose =
                    romantic && isUser && romantic.userId === message.id;

                  return (
                    <div key={message.id} className="space-y-3">
                      <div
                        className={cn(
                          "flex",
                          isUser ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[92%] rounded-2xl px-3.5 py-2.5",
                            isUser
                              ? roseMode
                                ? "bg-rose-600/90 text-rose-50"
                                : "bg-primary text-primary-foreground"
                              : "border border-border/70 bg-secondary/40"
                          )}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                              {text}
                            </p>
                          ) : (
                            <MessageContent text={text} />
                          )}
                        </div>
                      </div>
                      {showRose ? (
                        <RomanticReveal
                          stanzas={romantic.stanzas}
                          className="max-w-[92%]"
                        />
                      ) : null}
                    </div>
                  );
                })
              )}

              {isBusy && messages[messages.length - 1]?.role === "user" ? (
                <div
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    roseMode ? "text-rose-300/70" : "text-muted-foreground"
                  )}
                >
                  <Loader2
                    className={cn(
                      "h-3.5 w-3.5 animate-spin",
                      roseMode ? "text-rose-400" : "text-primary"
                    )}
                  />
                  {roseMode ? "Unfolding…" : "Thinking…"}
                </div>
              ) : null}

              {(setupError || error) && !isBusy ? (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {setupError ??
                    "Something went wrong. Try again or email Shubham directly."}
                </p>
              ) : null}
            </div>

            <form
              onSubmit={onSubmit}
              className={cn(
                "border-t p-3",
                roseMode ? "border-rose-200/10" : "border-border/70"
              )}
            >
              <div
                className={cn(
                  "flex items-end gap-2 rounded-xl border p-2 transition-shadow",
                  roseMode
                    ? "border-rose-300/25 bg-rose-950/40 focus-within:border-rose-400/45 focus-within:ring-1 focus-within:ring-rose-400/25"
                    : "border-border/80 bg-background/80 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30"
                )}
              >
                <textarea
                  ref={inputRef}
                  suppressHydrationWarning
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value.slice(0, MAX_INPUT))
                  }
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder={
                    roseMode
                      ? "Say something softly…"
                      : "Ask about experience, projects, fit for a role…"
                  }
                  disabled={isBusy}
                  className={cn(
                    "max-h-28 min-h-[40px] flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none disabled:opacity-60",
                    roseMode
                      ? "text-rose-50/90 placeholder:text-rose-300/40"
                      : "placeholder:text-muted-foreground/70"
                  )}
                  aria-label="Message to portfolio assistant"
                />
                {isBusy ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 shrink-0"
                    aria-label="Stop generating"
                    onClick={() => stop()}
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    className={cn(
                      "h-9 w-9 shrink-0",
                      roseMode &&
                        "border-rose-300/30 bg-gradient-to-br from-rose-500 to-rose-700 text-rose-50 shadow-[0_4px_20px_-4px_rgba(225,29,72,0.8)] hover:from-rose-400 hover:to-rose-600"
                    )}
                    disabled={!input.trim()}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-center font-mono text-[10px]",
                  roseMode ? "text-rose-400/45" : "text-muted-foreground/80"
                )}
              >
                Enter to send · Shift+Enter for newline
              </p>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        suppressHydrationWarning
        aria-expanded={open}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        onClick={() => setOpen((v) => !v)}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className={cn(
          "fixed bottom-5 right-5 z-[86] flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/50 bg-primary text-primary-foreground shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.85)] transition-shadow hover:shadow-[0_16px_48px_-10px_hsl(var(--primary)/0.9)] sm:bottom-6 sm:right-6",
          open && "pointer-events-none opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
        </span>
      </motion.button>
    </>
  );
}

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm leading-relaxed text-foreground/90">
          Hi — I&apos;m trained on{" "}
          <strong className="text-foreground">{siteConfig.name}</strong>&apos;s
          full portfolio: experience at Biztoso &amp; Gajan, projects, skills,
          and how to hire him. Ask anything a recruiter or client would want to
          know.
        </p>
      </div>
      <div>
        <p className="mono-caption mb-2">Suggested questions</p>
        <div className="flex flex-col gap-2">
          {ASSISTANT_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              suppressHydrationWarning
              onClick={() => onPick(prompt)}
              className="rounded-lg border border-border/70 bg-secondary/30 px-3 py-2.5 text-left text-xs leading-relaxed text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary/60 hover:text-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function openPortfolioAssistant() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}
