type Track = {
  title: string;
  cover: string;
};

export type UserCardProps = {
  name?: string;
  avatar?: string;
  tracks?: Track[];
};

const MOCK_TRACKS: Track[] = [
  { title: "Kiss All the Time", cover: "/kisco.jpg" },
  { title: "Disco Occasionally", cover: "/kisco.jpg" },
  { title: "Glitter on the Floor", cover: "/kisco.jpg" },
  { title: "Mirrorball Heart", cover: "/kisco.jpg" },
  { title: "Midnight in the Grass", cover: "/kisco.jpg" },
];

export function UserCard({
  name = "Matheus Alexandre",
  avatar = "https://i.pravatar.cc/80?img=12",
  tracks = MOCK_TRACKS,
}: UserCardProps) {
  return (
    <div className="group relative mx-auto w-full max-w-sm">
      {/* subtle outer glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ff2d95]/40 via-transparent to-[#22e3ff]/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <article
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        {/* top sheen — liquid glass highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="pointer-events-none absolute -top-24 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        {/* header */}
        <div className="relative flex items-center gap-3 px-5 pt-5 pb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#ff2d95] to-[#22e3ff] blur-[2px] opacity-80" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={name}
              className="relative h-11 w-11 rounded-full object-cover ring-2 ring-black/40"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-semibold text-white">
              {name}
            </span>
          </div>
        </div>

        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* content */}
        <div className="relative px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/60">
            5 músicas mais recentes de <span className="text-[#ff2d95]">KISCO</span>
          </p>

          <ul className="flex flex-col gap-1">
            {tracks.slice(0, 5).map((t, i) => (
              <li
                key={i}
                className="group/row flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
              >
                <span className="w-4 text-right text-[10px] font-medium tabular-nums text-white/40">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.cover}
                  alt={t.title}
                  className="h-10 w-10 flex-shrink-0 rounded-md object-cover ring-1 ring-white/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {t.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
