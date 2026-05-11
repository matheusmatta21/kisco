import { cookies } from "next/headers";

export type Track = {
  name: string;
  artists: string[];
  playedAt: string;
  albumName: string;
  imageUrl: string;
};

export type User = {
  provider: string;
  providerUserId: string;
  displayName: string;
  avatarUrl: string | null;
  tracks: Track[];
};

type ApiTrack = {
  name: string;
  artists: string[];
  played_at: string;
  album_name: string;
  image_url: string;
};

type ApiUser = {
  provider: string;
  provider_user_id: string;
  display_name: string;
  avatar_url: string | null;
  tracks: ApiTrack[];
};



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(): Promise<User | null> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL não definida");
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: cookie ? { cookie } : {},
    cache: "no-store",
  });
  if (res.status === 401) return null;
  if (!res.ok) {
    throw new Error(`getMe ${res.status}: ${await res.text()}`);
  }
  const u: ApiUser = await res.json();
  return {
    provider: u.provider,
    providerUserId: u.provider_user_id,
    displayName: u.display_name,
    avatarUrl: u.avatar_url,
    tracks:
      u.tracks?.map((t) => ({
        name: t.name,
        artists: t.artists,
        playedAt: t.played_at,
        albumName: t.album_name,
        imageUrl: t.image_url,
      })) ?? [],
  };
}

export async function getUsers(): Promise<User[]> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL não definida");
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`getUsers ${res.status}: ${await res.text()}`);
  }
  const json: { users: ApiUser[] } = await res.json();

  return json.users.map((u) => ({
    provider: u.provider,
    providerUserId: u.provider_user_id,
    displayName: u.display_name,
    avatarUrl: u.avatar_url,
    tracks: u.tracks.map((t) => ({
      name: t.name,
      artists: t.artists,
      playedAt: t.played_at,
      albumName: t.album_name,
      imageUrl: t.image_url,
    })),
  }));
}

