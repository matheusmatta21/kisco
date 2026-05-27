import { Play } from "lucide-react";
import { spotifySearchUrl } from "@/lib/spotify";

// Botão de play que abre a faixa no Spotify. Usa a URL direta da track quando o
// backend a fornece (`url`); senão cai na busca por nome + artista (Last.fm /
// plays antigas sem external_url). Fica oculto e só aparece quando a linha está
// em hover, foco ou foi clicada/tocada — o pai precisa ter `group/row`.
export function PlayButton({
  name,
  artists,
  url,
  className,
}: {
  name: string;
  artists?: string | string[];
  url?: string | null;
  className?: string;
}) {
  return (
    <a
      href={url ?? spotifySearchUrl(name, artists)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Tocar "${name}" no Spotify`}
      className={`hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1db954] text-black shadow-[0_0_12px_rgba(29,185,84,0.5)] transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-none group-hover/row:flex group-focus-within/row:flex ${className ?? ""}`}
    >
      <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
    </a>
  );
}
