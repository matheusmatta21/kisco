import { UserCard } from "@/components/UserCard";
import { Countdown } from "@/components/Countdown";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="relative bg-[url('/kisco.jpg')]  min-h-screen grid justify-center animate-slide-bg bg-left">
        <div ></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 sm:px-6 py-12 sm:py-16 w-full">
          <h1
            className="font-[family-name:var(--font-display)] uppercase text-center text-6xl sm:text-8xl md:text-[11rem] leading-[0.85] tracking-wide text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            MALINHA
            <span className="block font-[family-name:var(--font-display)] text-3xl sm:text-5xl md:text-7xl tracking-[0.25em]  mt-2 sm:mt-3 text-white">
              PT.2
            </span>
          </h1>

          <Countdown />

          <span className="font-[family-name:var(--font-mono-display)] text-[10px] md:text-xs tracking-[0.5em] sm:tracking-[0.6em] text-white/70 uppercase">
            18 / 07 / 2026
          </span>
        </div>
      </div>
      <div className="relative bg-[#0a0613] overflow-hidden">
        {/* ambient glow to continue the disco mood */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#ff2d95]/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[#22e3ff]/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 left-0 h-[300px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 p-6 sm:p-10">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        </div>
      </div>
    </div>
  );
}
