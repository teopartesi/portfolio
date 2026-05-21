import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {profile.name}. Portfolio en construction.</p>
        <p className="font-mono text-xs uppercase tracking-[0.2em]">
          Next.js · TypeScript · TailwindCSS
        </p>
      </div>
    </footer>
  );
}
