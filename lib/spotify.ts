export function spotifySearchUrl(
  name: string,
  artists?: string | string[],
): string {
  const artist = Array.isArray(artists) ? artists[0] : artists;
  const query = [name, artist].filter(Boolean).join(" ");
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}
