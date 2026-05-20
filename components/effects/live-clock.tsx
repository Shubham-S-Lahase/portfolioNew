"use client";

import { useEffect, useState } from "react";

/**
 * Live clock for the bento "currently" card.
 * Hydration-safe: renders a stable placeholder until the first
 * client tick, then updates every second.
 */
export function LiveClock({
  timeZone = "Asia/Kolkata",
  label,
}: {
  timeZone?: string;
  label?: string;
}) {
  const [now, setNow] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(d)
      );
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          weekday: "short",
          day: "2-digit",
          month: "short",
        }).format(d)
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <div className="flex flex-col gap-2">
      <span className="mono-caption">{label ?? "local time"}</span>
      <div className="flex items-baseline gap-2 font-mono">
        <span className="text-3xl sm:text-4xl tabular-nums tracking-tight text-foreground">
          {now ?? "--:--:--"}
        </span>
        <span className="text-xs text-muted-foreground">IST</span>
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {date ?? "—"}
      </span>
    </div>
  );
}
