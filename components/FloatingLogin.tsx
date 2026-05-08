import Link from "next/link";
import { getMe } from "@/lib/api";
import { UserMenu } from "./UserMenu";

export async function FloatingLogin() {
  const me = await getMe();

  if (me) {
    return <UserMenu displayName={me.displayName} avatarUrl={me.avatarUrl} />;
  }

  return (
    <Link
      href="/login"
      aria-label="Ir para o login"
      className="group fixed top-4 right-4 sm:top-6 sm:right-6 z-50 block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/login.png"
        alt=""
        className="h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-110"
      />
    </Link>
  );
}
