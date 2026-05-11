export function SubsectionTitle({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
      <div
        className="h-8 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-[#ff2d95] to-[#22e3ff] shadow-[0_0_16px_rgba(255,45,149,0.4)] sm:h-10"
        aria-hidden
      />
      <div className="flex min-w-0 flex-col">
        {kicker && (
          <p className="font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-[11px]">
            {kicker}
          </p>
        )}
        <h3 className="truncate font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-white/90 sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
    </div>
  );
}
