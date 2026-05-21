type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-8 text-zinc-400 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
