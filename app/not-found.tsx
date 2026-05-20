import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-24">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-sky-400/30 opacity-30 blur-3xl"
      />
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-3 text-6xl font-semibold tracking-tight sm:text-7xl">
          <span className="gradient-text">Page not found</span>
        </h1>
        <p className="mt-4 max-w-md text-balance text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, has moved, or never
          existed in the first place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4" />
              View projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
