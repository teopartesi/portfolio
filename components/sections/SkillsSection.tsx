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
              className="rounded-lg border border-border bg-surface/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent-muted text-accent">
                  <CategoryIcon
                    className="size-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-xl font-semibold text-heading">
                  {group.category}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface-muted px-3 py-1 text-sm text-foreground"
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
