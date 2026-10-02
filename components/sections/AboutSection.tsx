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
              className="rounded-lg border border-border bg-surface-muted p-6 transition hover:border-accent/40 hover:bg-surface-hover"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-accent/20 bg-accent-muted text-accent">
                <ItemIcon
                  className="size-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-heading">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{item.text}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
