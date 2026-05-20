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
          <div className="absolute inset-0 -m-3 rounded-xl bg-primary/30 opacity-50 blur-2xl" />
          <div className="relative grid h-20 w-20 place-items-center rounded-xl border border-primary/50 bg-card/90 backdrop-blur">
            <span className="font-mono text-2xl font-bold tracking-tight text-primary">
              SL
            </span>
            <span
              aria-hidden
              className="absolute -inset-px rounded-xl"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, hsl(78 100% 55%), transparent 30%)",
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
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            loading…
          </span>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/3 animate-marquee bg-primary" />
          </div>
        </div>
      </div>
      <style>{`@keyframes border-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
