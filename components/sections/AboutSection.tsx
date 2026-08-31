import { BadgeCheck, Gauge, Lightbulb } from "lucide-react";

import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Section";

const aboutItems = [
  {
    title: "Approche",
    text: "Comprendre le besoin, livrer simple, puis améliorer par itérations courtes.",
    icon: Lightbulb,
  },
  {
    title: "Qualité",
    text: "Privilégier un code lisible, testé quand nécessaire, et facile à maintenir.",
    icon: BadgeCheck,
  },
  {
    title: "Ops mindset",
    text: "Penser déploiement, logs, performance et stabilité dès la conception.",
    icon: Gauge,
  },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="À propos"
      title="Un profil entre développement web et culture infrastructure."
      description={profile.summary}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {aboutItems.map((item) => {
          const ItemIcon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.05]"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                <ItemIcon
                  className="size-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-zinc-400">{item.text}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
