import { SectionHero } from "@/components/SectionHero";
import { UserCard } from "@/components/UserCard";
import { getMe, getUsers } from "@/lib/api";

export async function UsersSection() {
  const [users, me] = await Promise.all([getUsers(), getMe()]);

  return (
    <section
      id="usuarios"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0613] px-6 pt-14 pb-10 sm:px-10 sm:pt-20 sm:pb-12"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#ff2d95]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[#22e3ff]/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 left-0 h-[300px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHero kicker="Usuários" title="Conectados" />

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <p className="font-[family-name:var(--font-mono-display)] text-[10px] uppercase tracking-[0.4em] text-white/50">
              Ninguém conectado ainda
            </p>
            <p className="max-w-md text-sm text-white/70">
              Seja o primeiro a conectar seu Spotify e aparecer aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {users.map((u) => (
              <UserCard
                key={u.providerUserId}
                {...u}
                isMe={!!me && u.providerUserId === me.providerUserId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
