import { cookies } from "next/headers";

export type Period = "week" | "month" | "total";

export type StatsUser = {
  provider: "spotify" | "lastfm";
  providerUserId: string;
  displayName: string;
  avatarUrl: string | null;
};

export type TrackInfo = {
  trackKey: string;
  trackName: string;
  artists: string;
  imageUrl: string | null;
};

export type StatsWindow = {
  period: Period;
  windowStart: string;
  windowEnd: string;
};

export type TopListenerResponse = StatsWindow & {
  user: StatsUser | null;
  playCount: number;
};

export type TopTrackResponse = StatsWindow & {
  track: TrackInfo | null;
  playCount: number;
};

export type TopTrackEntry = {
  rank: number;
  track: TrackInfo;
  playCount: number;
};

export type TopTracksResponse = StatsWindow & {
  tracks: TopTrackEntry[];
};

export type RankingEntry = {
  rank: number;
  user: StatsUser;
  playCount: number;
};

export type RankingResponse = StatsWindow & {
  ranking: RankingEntry[];
};

type ApiStatsUser = {
  provider: "spotify" | "lastfm";
  provider_user_id: string;
  display_name: string;
  avatar_url: string | null;
};

type ApiTrackInfo = {
  track_key: string;
  track_name: string;
  artists: string;
  image_url: string | null;
};

type ApiStatsWindow = {
  period: Period;
  window_start: string;
  window_end: string;
};

type ApiTopListenerResponse = ApiStatsWindow & {
  user: ApiStatsUser | null;
  play_count: number;
};

type ApiTopTrackResponse = ApiStatsWindow & {
  track: ApiTrackInfo | null;
  play_count: number;
};

type ApiTopTrackEntry = {
  rank: number;
  track: ApiTrackInfo;
  play_count: number;
};

type ApiTopTracksResponse = ApiStatsWindow & {
  tracks: ApiTopTrackEntry[];
};

type ApiRankingEntry = {
  rank: number;
  user: ApiStatsUser;
  play_count: number;
};

type ApiRankingResponse = ApiStatsWindow & {
  ranking: ApiRankingEntry[];
};

const API_URL = process.env.API_URL;

async function statsFetch<T>(path: string): Promise<T> {
  if (!API_URL) throw new Error("API_URL não definida");
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const res = await fetch(`${API_URL}${path}`, {
    headers: cookie ? { cookie } : {},
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`${path} ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

const adaptUser = (u: ApiStatsUser): StatsUser => ({
  provider: u.provider,
  providerUserId: u.provider_user_id,
  displayName: u.display_name,
  avatarUrl: u.avatar_url,
});

const adaptTrack = (t: ApiTrackInfo): TrackInfo => ({
  trackKey: t.track_key,
  trackName: t.track_name,
  artists: t.artists,
  imageUrl: t.image_url,
});

const adaptWindow = (w: ApiStatsWindow): StatsWindow => ({
  period: w.period,
  windowStart: w.window_start,
  windowEnd: w.window_end,
});

export async function getTopListener(
  period: Period,
): Promise<TopListenerResponse> {
  const r = await statsFetch<ApiTopListenerResponse>(
    `/stats/top-listener?period=${period}`,
  );
  return {
    ...adaptWindow(r),
    user: r.user ? adaptUser(r.user) : null,
    playCount: r.play_count,
  };
}

export async function getTopTrack(
  period: Period,
): Promise<TopTrackResponse> {
  const r = await statsFetch<ApiTopTrackResponse>(
    `/stats/top-track?period=${period}`,
  );
  return {
    ...adaptWindow(r),
    track: r.track ? adaptTrack(r.track) : null,
    playCount: r.play_count,
  };
}

export async function getTopTracks(
  period: Period,
  limit = 10,
): Promise<TopTracksResponse> {
  const r = await statsFetch<ApiTopTracksResponse>(
    `/stats/top-tracks?period=${period}&limit=${limit}`,
  );
  return {
    ...adaptWindow(r),
    tracks: r.tracks.map((t) => ({
      rank: t.rank,
      track: adaptTrack(t.track),
      playCount: t.play_count,
    })),
  };
}

export async function getRanking(
  period: Period,
  limit = 10,
): Promise<RankingResponse> {
  const r = await statsFetch<ApiRankingResponse>(
    `/stats/ranking?period=${period}&limit=${limit}`,
  );
  return {
    ...adaptWindow(r),
    ranking: r.ranking.map((e) => ({
      rank: e.rank,
      user: adaptUser(e.user),
      playCount: e.play_count,
    })),
  };
}
