import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="À propos"
      title="Un profil entre développement web et culture infrastructure."
      description={profile.summary}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Approche", "Comprendre le besoin, livrer simple, puis améliorer par itérations courtes."],
          ["Qualité", "Privilégier un code lisible, testé quand nécessaire, et facile à maintenir."],
          ["Ops mindset", "Penser déploiement, logs, performance et stabilité dès la conception."],
        ].map(([title, text]) => (
          <article
            key={title}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.05]"
          >
            <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
            <p className="mt-3 leading-7 text-zinc-400">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
