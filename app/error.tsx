"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0613] text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#ff2d95]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[#22e3ff]/15 blur-[140px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.4em] text-white/50">
          Algo deu errado
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.9] tracking-wide sm:text-6xl"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          Não rolou
          <span className="block text-2xl tracking-[0.35em] text-white/70 sm:text-3xl">
            agora
          </span>
        </h1>
        <p className="max-w-md text-sm text-white/70">
          Tente de novo em alguns segundos. Se persistir, o backend pode estar
          fora.
        </p>
        <button
          onClick={() => unstable_retry()}
          className="rounded-full bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/20"
        >
          Tentar de novo
        </button>
      </div>
    </main>
  );
}
