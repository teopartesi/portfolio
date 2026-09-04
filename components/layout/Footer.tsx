import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { profile, contact } from "@/lib/data";

const socialIcons = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto grid max-w-6xl gap-5 px-5 text-sm text-zinc-500 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <p className="text-center lg:text-left">
          © 2026 {profile.name}. Déployé sur Scaleway.
        </p>
        <nav
          aria-label="Liens de contact"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex size-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
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
                className="inline-flex size-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">
                  {link.label} (nouvel onglet)
                </span>
              </a>
            );
          })}
        </nav>
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] lg:justify-self-end lg:text-right">
          Next.js · GitHub Actions · Docker
        </p>
      </div>
    </footer>
  );
}
