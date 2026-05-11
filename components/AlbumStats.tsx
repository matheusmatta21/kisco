import {
  getRanking,
  getTopListener,
  getTopTrack,
  getTopTracks,
} from "@/lib/stats";
import { PeriodGroup } from "./album-stats/PeriodGroup";
import { RankingColumn } from "./album-stats/RankingColumn";
import { SubsectionTitle } from "./album-stats/SubsectionTitle";
import { TopListenerCard } from "./album-stats/TopListenerCard";
import { TopTrackCard } from "./album-stats/TopTrackCard";
import { TopTracksCard } from "./album-stats/TopTracksCard";

function unwrap<T>(r: PromiseSettledResult<T>): T | null {
  return r.status === "fulfilled" ? r.value : null;
}

const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function parseDateOnly(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}

function formatWeekRange(start: string, end: string) {
  const s = parseDateOnly(start);
  const e = parseDateOnly(end);
  const dm = (x: { d: number; m: number }) =>
    `${String(x.d).padStart(2, "0")}/${String(x.m).padStart(2, "0")}`;
  return `${dm(s)} – ${dm(e)}`;
}

function formatMonth(start: string) {
  const { y, m } = parseDateOnly(start);
  return `${MONTHS_PT[m]}/${y}`;
}

type AnyStatsWindow = { windowStart: string; windowEnd: string };

export async function AlbumStats() {
  const [
    topListenerWeekR,
    topListenerMonthR,
    topListenerTotalR,
    topTrackWeekR,
    topTrackMonthR,
    topTrackTotalR,
    topTracksWeekR,
    topTracksMonthR,
    topTracksTotalR,
    rankWeekR,
    rankMonthR,
    rankTotalR,
  ] = await Promise.allSettled([
    getTopListener("week"),
    getTopListener("month"),
    getTopListener("total"),
    getTopTrack("week"),
    getTopTrack("month"),
    getTopTrack("total"),
    getTopTracks("week", 10),
    getTopTracks("month", 10),
    getTopTracks("total", 10),
    getRanking("week"),
    getRanking("month"),
    getRanking("total"),
  ]);

  const rankWeek = unwrap(rankWeekR);
  const rankMonth = unwrap(rankMonthR);
  const rankTotal = unwrap(rankTotalR);

  const weekWin: AnyStatsWindow | null =
    rankWeek ??
    unwrap(topListenerWeekR) ??
    unwrap(topTrackWeekR) ??
    unwrap(topTracksWeekR);

  const monthWin: AnyStatsWindow | null =
    rankMonth ??
    unwrap(topListenerMonthR) ??
    unwrap(topTrackMonthR) ??
    unwrap(topTracksMonthR);

  const weekTitle = weekWin
    ? `Nesta semana (${formatWeekRange(weekWin.windowStart, weekWin.windowEnd)})`
    : "Nesta semana";

  const monthTitle = monthWin
    ? `Neste mês (${formatMonth(monthWin.windowStart)})`
    : "Neste mês";

  return (
    <section
      id="estatisticas-gerais"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0613] px-6 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-12"
    >
      {/* mirror the UserCards ambient glows, flipped vertically */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#ff2d95]/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[600px] rounded-full bg-[#22e3ff]/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-[300px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <p className="font-[family-name:var(--font-mono-display)] text-xs uppercase tracking-[0.3em] text-white/75 sm:text-sm">
            Estatísticas
          </p>
          <h2
            className="mt-2 font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wide text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            Gerais
          </h2>
        </header>

        <div className="space-y-10 sm:space-y-12">
          <PeriodGroup title={weekTitle}>
            <TopListenerCard
              data={unwrap(topListenerWeekR)}
              errored={topListenerWeekR.status === "rejected"}
            />
            <TopTrackCard
              data={unwrap(topTrackWeekR)}
              errored={topTrackWeekR.status === "rejected"}
            />
          </PeriodGroup>

          <PeriodGroup title={monthTitle}>
            <TopListenerCard
              data={unwrap(topListenerMonthR)}
              errored={topListenerMonthR.status === "rejected"}
            />
            <TopTrackCard
              data={unwrap(topTrackMonthR)}
              errored={topTrackMonthR.status === "rejected"}
            />
          </PeriodGroup>

          <PeriodGroup title="Geral">
            <TopListenerCard
              data={unwrap(topListenerTotalR)}
              errored={topListenerTotalR.status === "rejected"}
            />
            <TopTrackCard
              data={unwrap(topTrackTotalR)}
              errored={topTrackTotalR.status === "rejected"}
            />
          </PeriodGroup>

          <div id="top-10" className="scroll-mt-20">
            <SubsectionTitle title="Top 10 do Malinha" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              <TopTracksCard
                title={weekTitle}
                data={unwrap(topTracksWeekR)}
                errored={topTracksWeekR.status === "rejected"}
              />
              <TopTracksCard
                title={monthTitle}
                data={unwrap(topTracksMonthR)}
                errored={topTracksMonthR.status === "rejected"}
              />
              <TopTracksCard
                title="Geral"
                data={unwrap(topTracksTotalR)}
                errored={topTracksTotalR.status === "rejected"}
              />
            </div>
          </div>
        </div>

        <div id="ranking" className="mt-10 scroll-mt-20 sm:mt-14">
          <header className="mb-6 sm:mb-8">
            <p className="font-[family-name:var(--font-mono-display)] text-xs uppercase tracking-[0.3em] text-white/75 sm:text-sm">
              Ranking
            </p>
            <h3
              className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wide text-white"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
            >
              Top ouvintes do álbum
            </h3>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <RankingColumn
              title={weekTitle}
              entries={rankWeek?.ranking ?? []}
              errored={rankWeekR.status === "rejected"}
            />
            <RankingColumn
              title={monthTitle}
              entries={rankMonth?.ranking ?? []}
              errored={rankMonthR.status === "rejected"}
            />
            <RankingColumn
              title="Geral"
              entries={rankTotal?.ranking ?? []}
              errored={rankTotalR.status === "rejected"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
