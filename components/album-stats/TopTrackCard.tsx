import { Headphones } from "lucide-react";
import type { TopTrackResponse } from "@/lib/stats";
import { CardHeader } from "./CardHeader";
import { ACCENT, CardShell, type Accent } from "./CardShell";
import { FallbackBody } from "./FallbackBody";
import { fmt } from "./utils";

const accent: Accent = "pink";

export function TopTrackCard({
  data,
  errored,
}: {
  data: TopTrackResponse | null;
  errored: boolean;
}) {
  return (
    <CardShell accent={accent}>
      <CardHeader
        label="Música mais escutada pelo Malinha"
        Icon={Headphones}
        accent={accent}
      />
      {errored ? (
        <FallbackBody message="Não foi possível carregar." />
      ) : !data?.track ? (
        <FallbackBody message="Sem plays registrados nesta janela." />
      ) : (
        <>
          <div className="flex items-center gap-3">
            {data.track.imageUrl ? (
              <img
                src={data.track.imageUrl}
                alt={`Capa de ${data.track.trackName}`}
                className="h-14 w-14 flex-shrink-0 rounded-md object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/10">
                <Headphones className="h-5 w-5 text-white/50" aria-hidden />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-white">
                {data.track.trackName}
              </p>
              <p className="truncate text-xs text-white/60">
                {data.track.artists}
              </p>
            </div>
          </div>
          <p
            className={`mt-4 font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.25em] ${ACCENT[accent].accentText}`}
          >
            {fmt.format(data.playCount)} plays
          </p>
        </>
      )}
    </CardShell>
  );
}
