import { Crown } from "lucide-react";
import type { RankingEntry } from "@/lib/stats";
import { Avatar } from "./Avatar";
import { CardHeader } from "./CardHeader";
import { ACCENT, CardShell, type Accent } from "./CardShell";
import { fmt } from "./utils";

const accent: Accent = "cyan";

export function RankingColumn({
  title,
  entries,
  errored,
}: {
  title: string;
  entries: RankingEntry[];
  errored: boolean;
}) {
  return (
    <CardShell accent={accent}>
      <CardHeader label={title} Icon={Crown} accent={accent} />
      {errored ? (
        <p className="text-xs text-white/50">Não foi possível carregar.</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-white/50">
          Sem ouvintes registrados nesta janela.
        </p>
      ) : (
        <ol className="flex flex-col gap-1">
          {entries.map((e) => {
            const isTop = e.rank === 1;
            return (
              <li
                key={`${title}-${e.user.providerUserId}`}
                className="group/row flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
              >
                <span
                  className={`w-5 text-right font-[family-name:var(--font-mono-display)] text-xs tabular-nums ${
                    isTop ? ACCENT[accent].accentText : "text-white/40"
                  }`}
                >
                  {e.rank}
                </span>

                <div className="relative flex-shrink-0">
                  {isTop && (
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#22e3ff] to-[#2dd5ff] blur-[2px] opacity-80" />
                  )}
                  <Avatar
                    url={e.user.avatarUrl}
                    name={e.user.displayName}
                    size="sm"
                    ringClass={
                      isTop ? "ring-2 ring-black/40" : "ring-1 ring-white/10"
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate text-sm font-medium text-white">
                    {e.user.displayName}
                    {isTop && (
                      <Crown
                        className={`h-3.5 w-3.5 flex-shrink-0 ${ACCENT[accent].accentText}`}
                        aria-hidden
                      />
                    )}
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
