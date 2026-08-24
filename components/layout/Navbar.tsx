import Image from "next/image";

import { navigation, profile } from "@/lib/data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <nav
          aria-label="Navigation principale"
          className="flex items-center justify-between gap-6"
        >
          <a href="#" className="group flex flex-col">
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-zinc-50">
              {profile.name}
            </span>
            <span className="text-xs text-zinc-500 transition-colors group-hover:text-cyan-300">
              DevOps / DevWeb
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-zinc-50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#about"
            className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/40 bg-zinc-900 p-0.5 shadow-md shadow-cyan-950/40 transition duration-200 hover:scale-105 hover:border-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 motion-reduce:transform-none motion-reduce:transition-none sm:size-11"
          >
            <Image
              src="/favicon.ico"
              alt=""
              width={44}
              height={44}
              className="size-full rounded-full object-cover object-center"
            />
            <span className="sr-only">À propos de {profile.name}</span>
          </a>
        </nav>

        <div
          aria-label="Navigation mobile"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
