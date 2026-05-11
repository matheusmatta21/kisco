export type Accent = "cyan" | "pink" | "purple";

export const ACCENT: Record<
  Accent,
  {
    border: string;
    glow: string;
    topLine: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    accentText: string;
  }
> = {
  cyan: {
    border: "border-[#22e3ff]/25",
    glow: "from-[#22e3ff]/50 via-[#22e3ff]/10 to-transparent",
    topLine: "from-transparent via-[#22e3ff]/70 to-transparent",
    badgeBg: "bg-[#22e3ff]/15",
    badgeBorder: "border-[#22e3ff]/40",
    badgeText: "text-[#22e3ff]",
    accentText: "text-[#22e3ff]",
  },
  pink: {
    border: "border-[#ff2d95]/25",
    glow: "from-[#ff2d95]/50 via-[#ff2d95]/10 to-transparent",
    topLine: "from-transparent via-[#ff2d95]/70 to-transparent",
    badgeBg: "bg-[#ff2d95]/15",
    badgeBorder: "border-[#ff2d95]/40",
    badgeText: "text-[#ff2d95]",
    accentText: "text-[#ff2d95]",
  },
  purple: {
    border: "border-[#a855f7]/25",
    glow: "from-[#a855f7]/50 via-[#a855f7]/10 to-transparent",
    topLine: "from-transparent via-[#a855f7]/70 to-transparent",
    badgeBg: "bg-[#a855f7]/15",
    badgeBorder: "border-[#a855f7]/40",
    badgeText: "text-[#a855f7]",
    accentText: "text-[#c084fc]",
  },
};

export function CardShell({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <article className="group relative h-full">
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${a.glow} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border ${a.border} bg-white/[0.06] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-0.5`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.topLine}`}
        />
        <div className="pointer-events-none absolute -top-20 -right-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex-1">{children}</div>
      </div>
    </article>
  );
}
