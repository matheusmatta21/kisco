import { PlayButton } from "@/components/PlayButton";
import type { User } from "@/lib/api";

type Props = User & { isMe?: boolean };

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const sec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec < 60) return "agora";
  if (min < 60) return `há ${min}min`;
  if (hr < 24) return `há ${hr}h`;
  if (day < 7) return `há ${day}d`;
  if (day < 30) return `há ${Math.floor(day / 7)}sem`;
  if (day < 365) return `há ${Math.floor(day / 30)}mês`;
  return `há ${Math.floor(day / 365)}a`;
}

export function UserCard({
  displayName,
  avatarUrl,
  tracks,
  isMe = false,
}: Props) {
  return (
    <div className="group relative mx-auto w-full max-w-sm">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ff2d95]/40 via-transparent to-[#22e3ff]/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="pointer-events-none absolute -top-24 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-3 px-5 pt-5 pb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#ff2d95] to-[#22e3ff] blur-[2px] opacity-80" />

            <img
              src={avatarUrl || "/kisco.jpg"}
              alt={displayName}
              className="relative h-11 w-11 rounded-full object-cover ring-2 ring-black/40"
            />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-white">
              {displayName}
            </span>
            {isMe && (
              <span className="text-md mr-4 font-medium text-[#ff2d95]">
                (Você)
              </span>
            )}
          </div>
        </div>

        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/60">
            5 músicas mais recentes de{" "}
            <span className="text-[#2dd5ff]">KISCO</span>
          </p>

          <div className="sm:min-h-[276px]">
            {tracks.length === 0 ? (
              <p className="px-2 py-3 text-xs text-white/50">
                Ainda sem plays do álbum.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {tracks.slice(0, 5).map((t, i) => (
                  <li
                    key={t.playedAt}
                    tabIndex={0}
                    className="group/row flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors outline-none hover:bg-white/5 focus-visible:bg-white/5"
                  >
                    <span className="w-4 text-right text-[10px] font-medium tabular-nums text-white/40">
                      {i + 1}
                    </span>

                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="h-10 w-10 flex-shrink-0 rounded-md object-cover ring-1 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {t.name}
                      </p>
                    </div>
                    <span className="flex-shrink-0 whitespace-nowrap font-[family-name:var(--font-mono-display)] text-[10px] tabular-nums text-white/40 group-hover/row:hidden group-focus-within/row:hidden">
                      {timeAgo(t.playedAt)}
                    </span>
                    <PlayButton
                      name={t.name}
                      artists={t.artists}
                      url={t.externalUrl}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
