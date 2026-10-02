import { ArrowDown, MessageCircle } from "lucide-react";

import { profile } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="hero-background absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[calc(100svh-73px)] max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-sm uppercase tracking-[0.24em] text-accent">
            {profile.role}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-6xl">
            Construire, automatiser et déployer des expériences web fiables.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground">
            {profile.tagline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              Voir les projets
              <ArrowDown
                className="size-4 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
            <a
              href="#experience"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 text-sm font-semibold text-heading transition hover:border-accent/50 hover:bg-surface-hover"
            >
              Voir mon parcours
              <MessageCircle
                className="size-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/70 p-5 shadow-2xl shadow-shadow-accent">
          <div className="mb-4 flex gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-300" />
            <span className="size-3 rounded-full bg-emerald-400" />
          </div>
          <pre className="overflow-hidden whitespace-pre-wrap font-mono text-sm leading-7 text-foreground">
            <code>{`pipeline:
✓  validate: lint + build + smoke-test
✓  version: semantic-release
✓  registry: ghcr.io

deploy:
✓  target: scaleway-vps
✓  runtime: docker-compose + traefik
✓  status: production`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
