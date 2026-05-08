export type Track = {
  name: string;
  artists: string[];
  playedAt: string;
  albumName: string;
  imageUrl: string;
};

export type User = {
  spotifyId: string;
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
  spotify_id: string;
  display_name: string;
  avatar_url: string | null;
  tracks: ApiTrack[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(): Promise<User[]> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL não definida");
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`getUsers ${res.status}: ${await res.text()}`);
  }
  const json: { users: ApiUser[] } = await res.json();

  return json.users.map((u) => ({
    spotifyId: u.spotify_id,
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
