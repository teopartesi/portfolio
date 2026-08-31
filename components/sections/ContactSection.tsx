import { Mail } from "lucide-react";

import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Discutons projet, opportunité ou collaboration."
      description="Une question sur ce portfolio, sa pipeline CI/CD ou son infrastructure ? Écrivez-moi."
    >
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8">
        <p className="max-w-2xl text-lg leading-8 text-zinc-100">
          Je suis disponible pour échanger autour du développement web, du
          DevOps et de l&apos;automatisation des déploiements.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-zinc-50 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">M&apos;envoyer un e-mail</span>
          </a>
          <span className="text-sm text-zinc-400">{profile.email}</span>
        </div>
      </div>
    </Section>
  );
}
