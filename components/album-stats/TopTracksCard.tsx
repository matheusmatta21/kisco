import { ListMusic, Music } from "lucide-react";
import type { TopTracksResponse } from "@/lib/stats";
import { CardHeader } from "./CardHeader";
import { ACCENT, CardShell, type Accent } from "./CardShell";
import { fmt } from "./utils";

const accent: Accent = "purple";

export function TopTracksCard({
  title,
  data,
  errored,
}: {
  title: string;
  data: TopTracksResponse | null;
  errored: boolean;
}) {
  const entries = data?.tracks ?? [];
  return (
    <CardShell accent={accent}>
      <CardHeader label={title} Icon={ListMusic} accent={accent} />
      {errored ? (
        <p className="text-xs text-white/50">Não foi possível carregar.</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-white/50">
          Sem plays registrados nesta janela.
        </p>
      ) : (
        <ol className="flex flex-col gap-1">
          {entries.map((e) => {
            const isTop = e.rank === 1;
            return (
              <li
                key={`${title}-${e.track.trackKey}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
              >
                <span
                  className={`w-5 text-right font-[family-name:var(--font-mono-display)] text-xs tabular-nums ${
                    isTop ? ACCENT[accent].accentText : "text-white/40"
                  }`}
                >
                  {e.rank}
                </span>
                {e.track.imageUrl ? (
                  <img
                    src={e.track.imageUrl}
                    alt=""
                    className="h-9 w-9 flex-shrink-0 rounded-md object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/10">
                    <Music className="h-4 w-4 text-white/50" aria-hidden />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {e.track.trackName}
                  </p>
                  <p className="truncate text-xs text-white/50">
                    {e.track.artists}
                  </p>
                </div>
                <span
                  className={`font-[family-name:var(--font-mono-display)] text-xs tabular-nums ${
                    isTop ? ACCENT[accent].accentText : "text-white/60"
                  }`}
                >
                  {fmt.format(e.playCount)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </CardShell>
  );
}
