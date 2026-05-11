import Link from "next/link";

export default function LoginPage() {
  const spotifyAuthHref = `${process.env.NEXT_PUBLIC_API_URL}/auth/spotify`;
  const lastfmAuthHref = `${process.env.NEXT_PUBLIC_API_URL}/auth/lastfm`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0613] text-white">
      {/* ambient disco glow — continuity with home */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-[#ff2d95]/25 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-[#22e3ff]/20 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-[400px] w-[500px] rounded-full bg-purple-600/25 blur-[140px]" />

      {/* noise / scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* brand */}
        <Link
          href="/"
          className="mb-10 text-center transition-opacity hover:opacity-80"
        >
          <h1
            className="font-[family-name:var(--font-display)] uppercase leading-[0.85] tracking-wide text-5xl sm:text-6xl text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            MALINHA
            <span className="block font-[family-name:var(--font-display)] text-lg sm:text-xl tracking-[0.35em] text-white/80 mt-1">
              PT.2
            </span>
          </h1>
        </Link>

        {/* liquid glass card */}
        <div className="group relative w-full max-w-md">
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ff2d95]/50 via-transparent to-[#22e3ff]/50 opacity-60 blur-xl" />

          <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.14] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 py-8 sm:px-8 sm:py-10">
            {/* sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="pointer-events-none absolute -top-24 -left-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Entre com sua conta
                </h2>
              </div>

              <a
                href={spotifyAuthHref}
                className="group/btn relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1DB954] px-6 py-3.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(29,185,84,0.35)] transition-all hover:bg-[#1ed760] hover:shadow-[0_12px_36px_rgba(29,185,84,0.55)] active:scale-[0.98]"
              >
                <SpotifyIcon className="h-5 w-5" />
                <span>Continuar com Spotify</span>
              </a>

              <a
                href={lastfmAuthHref}
                className="group/btn relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#D51007] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(213,16,7,0.35)] transition-all hover:bg-[#ed1f15] hover:shadow-[0_12px_36px_rgba(213,16,7,0.55)] active:scale-[0.98]"
              >
                <LastfmIcon className="h-5 w-5" />
                <span>Continuar com Last.fm</span>
              </a>

              <div className="flex items-center w-full gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  ou
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Link
                href="/"
                className="text-xs uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
              >
                Voltar ao início
              </Link>
            </div>
          </article>
        </div>

        <span className="mt-10 font-[family-name:var(--font-mono-display)] text-1rem tracking-[0.5em] text-white/40 uppercase">
          18 / 07 / 2026
        </span>
      </div>
    </main>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 01-.33-1.46c4.55-1.03 8.47-.59 11.63 1.34.36.22.47.69.28 1.03zm1.47-3.27a.94.94 0 01-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 11-.54-1.8c4.37-1.31 9.78-.67 13.48 1.6.44.27.58.85.32 1.29zm.13-3.4c-3.87-2.3-10.27-2.52-13.97-1.39a1.12 1.12 0 11-.65-2.15c4.25-1.29 11.31-1.04 15.77 1.6a1.12 1.12 0 11-1.15 1.94z" />
    </svg>
  );
}

function LastfmIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.59 3.381-4.59 2.42 0 3.189 1.567 3.849 3.574l.88 2.749c.879 2.666 2.529 4.81 7.285 4.81 3.41 0 5.718-1.044 5.718-3.793 0-2.227-1.265-3.382-3.628-3.931l-1.76-.385c-1.21-.275-1.567-.769-1.567-1.595 0-.934.742-1.484 1.952-1.484 1.32 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.924-3.491-4.728-3.491-2.474 0-4.892 1.155-4.892 3.353 0 2.116 1.46 3.382 3.629 3.876l1.787.412c1.4.33 1.86.907 1.86 1.65 0 .961-.926 1.402-2.694 1.402-2.639 0-3.74-1.402-4.342-3.244l-.907-2.749c-1.155-3.601-2.997-4.92-6.626-4.92C2.144 6.105 0 8.46 0 12.418c0 3.82 1.952 5.882 5.443 5.882 2.804 0 4.151-1.32 4.728-2.282z" />
    </svg>
  );
}
