import { experience } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Parcours"
      title="Une progression claire, documentée et orientée livraison."
    >
      <div className="grid gap-4">
        {experience.map((item) => (
          <article
            key={`${item.period}-${item.title}`}
            className="grid gap-4 rounded-lg border border-white/10 bg-zinc-900/50 p-6 sm:grid-cols-[180px_1fr]"
          >
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-300">
              {item.period}
            </p>
            <div>
              <h3 className="text-lg font-semibold text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-2 leading-7 text-zinc-400">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
