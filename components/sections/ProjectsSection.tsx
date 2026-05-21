import { projects } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projets"
      title="Des projets pensés pour montrer la pratique, pas seulement la stack."
      description="Cette première grille pose le format. Chaque carte pourra ensuite devenir une étude de cas avec contexte, contraintes, solution et résultat."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex min-h-64 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]"
          >
            <div>
              <h3 className="text-xl font-semibold text-zinc-50">
                {project.title}
              </h3>
              <p className="mt-4 leading-7 text-zinc-400">
                {project.description}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
