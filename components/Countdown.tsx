"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-18T00:00:00-03:00").getTime();

function getDiff() {
  const delta = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(delta / 86400000),
    hours: Math.floor((delta % 86400000) / 3600000),
    minutes: Math.floor((delta % 3600000) / 60000),
    seconds: Math.floor((delta % 60000) / 1000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const [t, setT] = useState(getDiff);

  useEffect(() => {
    const id = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DIAS", value: pad(t.days) },
    { label: "HORAS", value: pad(t.hours) },
    { label: "MIN", value: pad(t.minutes) },
    { label: "SEG", value: pad(t.seconds) },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center gap-4">
      <span className="font-[family-name:var(--font-mono-display)] text-xs md:text-sm tracking-[0.6em] text-white/80 uppercase">
        Faltam
      </span>
      <div className="flex items-stretch gap-1.5 sm:gap-3 md:gap-5">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-stretch">
            <div className="flex flex-col items-center min-w-[62px] sm:min-w-[80px] md:min-w-[120px] rounded-md bg-black/40 backdrop-blur-sm border border-white/20 px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <span className="font-[family-name:var(--font-display)] font-black text-3xl sm:text-5xl md:text-7xl text-white leading-none tabular-nums">
                {u.value}
              </span>
              <span className="font-[family-name:var(--font-mono-display)] text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/70 uppercase mt-1.5 sm:mt-2">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-[family-name:var(--font-display)] self-center mx-0.5 sm:mx-1 text-2xl sm:text-4xl md:text-6xl text-white/40">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
