import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { profile, contact } from "@/lib/data";
import { Section } from "@/components/ui/Section";

const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

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
          {contact.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex size-12 items-center justify-center rounded-full bg-zinc-50 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">M&apos;envoyer un e-mail</span>
          </a>
          {contact.links.map((link) => {
            const Icon = socialIcons[link.platform];

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">
                  {link.label} (nouvel onglet)
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
