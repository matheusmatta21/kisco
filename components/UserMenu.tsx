import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions";

type Props = {
  displayName: string;
  avatarUrl: string | null;
};

export function UserMenu({ displayName, avatarUrl }: Props) {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-[#120a1f]/80 p-1.5 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <img
        src={avatarUrl || "/kisco.jpg"}
        alt={displayName}
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white/20"
      />
      <span className="max-w-[110px] truncate text-xs font-semibold text-white/90">
        {displayName}
      </span>
      <form action={logout}>
        <button
          type="submit"
          aria-label="Sair da conta"
          title="Sair da conta"
          className="ml-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-500/15 hover:text-red-300 focus:bg-red-500/15 focus:text-red-300 focus:outline-none"
        >
          <LogOut className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
