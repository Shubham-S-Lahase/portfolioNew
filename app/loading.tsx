export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 -m-3 rounded-2xl bg-gradient-to-br from-primary via-accent to-sky-400 opacity-40 blur-2xl" />
          <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-border/70 bg-card/80 backdrop-blur">
            <span className="text-2xl font-bold tracking-tight gradient-text">
              SL
            </span>
            <span className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            <span
              aria-hidden
              className="absolute -inset-px rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, hsl(228 100% 67%), transparent 30%)",
                animation: "border-spin 1.6s linear infinite",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Crafting your experience…
          </span>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/3 animate-marquee bg-gradient-to-r from-primary via-accent to-sky-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
