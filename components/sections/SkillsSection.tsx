import { Cloud, Code2, Workflow, type LucideIcon } from "lucide-react";

import { skills } from "@/lib/data";
import { Section } from "@/components/ui/Section";

const categoryIcons: Record<string, LucideIcon> = {
  DevOps: Workflow,
  "Cloud & Infra": Cloud,
  "Développement Web": Code2,
};

export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Compétences"
      title="Une stack orientée produit, automatisation et déploiement."
      description="Un socle utilisé sur ce portfolio, de l'interface Next.js jusqu'à la livraison versionnée sur la VM Scaleway."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {skills.map((group) => {
          const CategoryIcon = categoryIcons[group.category] ?? Code2;

          return (
            <article
              key={group.category}
              className="rounded-lg border border-white/10 bg-zinc-900/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <CategoryIcon
                    className="size-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-xl font-semibold text-zinc-50">
                  {group.category}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-sm text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
