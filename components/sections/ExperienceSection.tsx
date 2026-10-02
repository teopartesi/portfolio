import { CalendarDays } from "lucide-react";

import { experience } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Parcours"
      title="Expériences professionnelles et académiques."
      description="Stages, projet de fin d'études et job étudiant : un parcours entre développement, DevOps, systèmes embarqués et accompagnement."
    >
      <ol className="relative ml-2 max-w-5xl border-l border-border">
        {experience.map((item) => (
          <li
            key={`${item.organization}-${item.role}`}
            className="relative pb-6 pl-7 last:pb-0 sm:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-8 size-2.5 rounded-full bg-accent ring-4 ring-background"
            />

            <article className="rounded-lg border border-border bg-surface-muted p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover sm:p-7">
              <div className="flex min-w-0 flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                      {item.organization}
                    </p>
                    <span className="max-w-full wrap-break-word rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="mt-3 wrap-break-words text-xl font-semibold text-heading sm:text-2xl">
                    {item.role}
                  </h3>
                </div>

                <p className="flex max-w-full items-center gap-2 wrap-break-words rounded-full border border-accent/20 bg-accent-muted px-3 py-1.5 font-mono text-xs text-accent md:w-fit md:shrink-0">
                  <CalendarDays
                    className="size-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Période : </span>
                  {item.period}
                </p>
              </div>

              <p className="mt-5 max-w-3xl wrap-break-words leading-7 text-foreground">
                {item.summary}
              </p>

              <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:text-base">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex min-w-0 gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/80"
                    />
                    <span className="min-w-0 wrap-break-words">{highlight}</span>
                  </li>
                ))}
              </ul>

              {item.technologies.length > 0 ? (
                <ul
                  aria-label={`Technologies et outils pour ${item.organization}`}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {item.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="max-w-full wrap-break-words rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
