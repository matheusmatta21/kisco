import { Countdown } from "@/components/Countdown";
import { FloatingLogin } from "@/components/FloatingLogin";
import { AlbumStats } from "@/components/AlbumStats";
import { Sidebar } from "@/components/Sidebar";
import { UsersSection } from "@/components/UsersSection";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Sidebar />
      <FloatingLogin />
      <div
        id="topo"
        className="relative bg-[url('/kisco.jpg')]  min-h-screen grid justify-center animate-slide-bg bg-left"
      >
        <div></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 sm:px-6 py-12 sm:py-16 w-full">
          <h1
            className="font-[family-name:var(--font-display)] uppercase text-center text-6xl sm:text-8xl md:text-[11rem] leading-[0.85] tracking-wide text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            MALINHA
            <span className="block font-[family-name:var(--font-display)] text-3xl sm:text-5xl md:text-7xl  mt-2 sm:mt-3 text-white">
              PT.2
            </span>
          </h1>

          <Countdown />

          <span className="font-[family-name:var(--font-mono-display)] text-[10px] md:text-xs tracking-[0.5em] sm:tracking-[0.6em] text-white/70 uppercase">
            18 / 07 / 2026
          </span>
        </div>
      </div>
      <UsersSection />
      <AlbumStats />
    </div>
  );
}
