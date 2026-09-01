import { ExternalLink } from "lucide-react";

import { projects } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projets"
      title="Du code au déploiement, avec des preuves consultables."
      description="Ce portfolio est aussi un projet DevOps : les liens donnent accès au code, aux releases, aux workflows et à la documentation de l'infrastructure."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex min-h-64 flex-col justify-between rounded-lg border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/6"
          >
            <div>
              <h3 className="text-xl font-semibold text-zinc-50">
                {project.title}
              </h3>
              <p className="mt-4 leading-7 text-zinc-400">
                {project.description}
              </p>
            </div>
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-200 transition hover:text-cyan-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                  >
                    {link.label}
                    <ExternalLink
                      className="size-4 shrink-0"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
