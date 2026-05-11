export function SectionHero({
  kicker,
  title,
  className,
}: {
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <header className={`mb-10 sm:mb-14 ${className ?? ""}`}>
      {kicker && (
        <div className="mb-3 flex items-center gap-3 sm:mb-4">
          <div
            className="h-1.5 w-1.5 rounded-full bg-[#ff2d95] shadow-[0_0_12px_rgba(255,45,149,0.9)]"
            aria-hidden
          />
          <p className="font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.45em] text-white/60 sm:text-xs">
            {kicker}
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-white/25 via-white/5 to-transparent" />
        </div>
      )}
      <h2
        className="bg-gradient-to-b from-[#ff2d95] to-[#22e3ff]/60 bg-clip-text font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight text-transparent break-words sm:text-5xl md:text-6xl md:leading-[0.85] lg:text-8xl"
        style={{ filter: "drop-shadow(0 8px 32px rgba(255,45,149,0.2))" }}
      >
        {title}
      </h2>
    </header>
  );
}
