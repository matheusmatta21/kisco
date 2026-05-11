import { Crown } from "lucide-react";
import type { TopListenerResponse } from "@/lib/stats";
import { Avatar } from "./Avatar";
import { CardHeader } from "./CardHeader";
import { ACCENT, CardShell, type Accent } from "./CardShell";
import { FallbackBody } from "./FallbackBody";
import { fmt } from "./utils";

const accent: Accent = "cyan";

export function TopListenerCard({
  data,
  errored,
}: {
  data: TopListenerResponse | null;
  errored: boolean;
}) {
  return (
    <CardShell accent={accent}>
      <CardHeader
        label="Quem mais escutou ao álbum"
        Icon={Crown}
        accent={accent}
      />
      {errored ? (
        <FallbackBody message="Não foi possível carregar." />
      ) : !data?.user ? (
        <FallbackBody message="Sem plays registrados nesta janela." />
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Avatar
              url={data.user.avatarUrl}
              name={data.user.displayName}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-white">
                {data.user.displayName}
              </p>
              <p className="truncate text-xs text-white/60">
                {fmt.format(data.playCount)} plays do álbum
              </p>
            </div>
          </div>
          <p
            className={`mt-4 font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.25em] ${ACCENT[accent].accentText}`}
          >
            Top fã
          </p>
        </>
      )}
    </CardShell>
  );
}
