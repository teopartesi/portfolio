import { skills } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Compétences"
      title="Une stack orientée produit, automatisation et déploiement."
      description="Les compétences sont provisoires et servent de base pour structurer le portfolio avant d'ajouter ton niveau réel et tes outils principaux."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {skills.map((group) => (
          <article
            key={group.category}
            className="rounded-lg border border-white/10 bg-zinc-900/60 p-6"
          >
            <h3 className="text-xl font-semibold text-zinc-50">
              {group.category}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
