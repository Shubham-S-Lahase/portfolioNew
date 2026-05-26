import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/** Minimal stylized rose for romantic UI accents. */
export function RoseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden
      fill="none"
      {...props}
    >
      <path
        d="M16 4c-2 4-6 5-8 9 2 1 3 4 2 7-3 2-5 6-4 10 2 4 6 6 10 5 4-1 8-4 9-8 1-4-1-8-4-10 1-3 0-6-2-7-2-4-6-5-8-9z"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M16 7c-1.5 2.5-4 3.5-5.5 6 1.5 0.5 2.5 2 2 4-2 1.5-3.5 4.5-3 7.5 1.5 3 4.5 4.5 7.5 4 3-0.5 6-2.5 7-5.5 1-3 0-6-2-7.5-0.5-3-1.5-5.5-3-7.5 0.5-2.5 0.5-5-1.5-6.5z"
        fill="currentColor"
      />
      <path
        d="M16 11v14M16 11c-2 1-3 3-2 5M16 11c2 1 3 3 2 5"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Single drifting petal shape. */
export function RosePetalShape({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 16" className={className} aria-hidden {...props}>
      <ellipse
        cx="6"
        cy="8"
        rx="5"
        ry="7"
        fill="currentColor"
        transform="rotate(-15 6 8)"
      />
    </svg>
  );
}
