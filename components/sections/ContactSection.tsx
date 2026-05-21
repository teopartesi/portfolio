import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Discutons projet, alternance, opportunité ou collaboration."
      description="Cette zone recevra plus tard tes liens réels GitHub, LinkedIn et ton adresse email professionnelle."
    >
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8">
        <p className="max-w-2xl text-lg leading-8 text-zinc-100">
          Pour l&apos;instant, le contact est provisoire. Remplace cette adresse
          quand tu voudras connecter ton vrai profil.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-zinc-50 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100"
        >
          {profile.email}
        </a>
      </div>
    </Section>
  );
}
