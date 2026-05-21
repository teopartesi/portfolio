import { profile } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),linear-gradient(135deg,rgba(24,24,27,0.9),rgba(9,9,11,1)_55%)]" />
      <div className="mx-auto grid min-h-[calc(100svh-73px)] max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-sm uppercase tracking-[0.24em] text-cyan-300">
            {profile.role}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
            Construire, automatiser et déployer des expériences web fiables.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {profile.tagline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200"
            >
              Voir les projets
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
            >
              Me contacter
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-cyan-950/20">
          <div className="mb-4 flex gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-300" />
            <span className="size-3 rounded-full bg-emerald-400" />
          </div>
          <pre className="overflow-hidden whitespace-pre-wrap font-mono text-sm leading-7 text-zinc-300">
            <code>{`$ npm run build
✓ lint
✓ type-check
✓ optimized production build

deploy:
  provider: vercel
  status: ready
  focus: performance + reliability`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
