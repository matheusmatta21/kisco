export function SubsectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-4 sm:mb-6">
      <h3
        className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white sm:text-3xl"
        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
      >
        {title}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
    </div>
  );
}
