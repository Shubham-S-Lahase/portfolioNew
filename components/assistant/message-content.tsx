import { cn } from "@/lib/utils";

/** Lightweight markdown-ish rendering for assistant replies. */
export function MessageContent({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className={cn("space-y-3 text-sm leading-relaxed", className)}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (/^[-*•]\s/m.test(trimmed)) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^[-*•]\s+/, "").trim())
            .filter(Boolean);
          return (
            <ul key={i} className="list-inside list-disc space-y-1.5 text-muted-foreground">
              {items.map((item, j) => (
                <li key={j}>
                  <InlineMarkdown text={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-foreground/90">
            <InlineMarkdown text={trimmed.replace(/\n/g, " ")} />
          </p>
        );
      })}
    </div>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-secondary/80 px-1 py-0.5 font-mono text-[0.85em] text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
