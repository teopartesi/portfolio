import Image from "next/image";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { navigation, profile, contact } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const socialIcons = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  mail:Mail,
};

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <nav
          aria-label="Navigation principale"
          className="flex items-center justify-between gap-6"
        >
          <a href="" className="group flex flex-col">
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-heading">
              {profile.name}
            </span>
            <span className="text-xs text-subtle transition-colors group-hover:text-accent">
              DevOps / DevWeb
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-border bg-surface-muted p-1 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-surface-hover hover:text-heading"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Popover className="relative shrink-0">
            <PopoverButton className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-surface p-0.5 shadow-md shadow-shadow-accent transition duration-200 hover:scale-105 hover:border-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent data-open:border-accent-hover data-open:ring-2 data-open:ring-accent/20 motion-reduce:transform-none motion-reduce:transition-none sm:size-11">
              <Image
                src="/favicon.ico"
                alt=""
                width={44}
                height={44}
                className="block size-full rounded-full object-cover object-center"
              />
              <span className="sr-only">
                Ouvrir les liens du profil de {profile.name}
              </span>
            </PopoverButton>
              <PopoverPanel
                anchor="bottom end"
                portal
                transition
                className="z-60 flex w-52 max-w-[calc(100vw-2rem)] origin-top-right flex-col gap-1 rounded-xl border border-border bg-background/95 p-2 shadow-2xl shadow-shadow-overlay backdrop-blur-xl transition duration-150 ease-out [--anchor-gap:0.75rem] [--anchor-padding:1rem] data-closed:-translate-y-1 data-closed:scale-95 data-closed:opacity-0 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <p className="px-3 pb-2 pt-1 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
                  Me Contacter
                </p>               
                {contact.links.map((link) => {
                  const Icon = socialIcons[link.platform];
    
                  return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-hover hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  >
                    {link.label}
                    <Icon className="size-4 shrink-0 text-accent" aria-hidden="true"/>
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                  )
                })}
              </PopoverPanel>
            </Popover>
          </div>
        </nav>

        <div
          aria-label="Navigation mobile"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-border bg-surface-muted px-3 py-2 text-sm text-muted transition hover:border-border-strong hover:bg-surface-hover hover:text-heading"
            >
              {item.label}
            </a>

          ))}
        </div>
      </div>
    </header>
  );
}
