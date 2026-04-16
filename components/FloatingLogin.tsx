import Link from "next/link";

export function FloatingLogin() {
  return (
    <Link
      href="/login"
      aria-label="Ir para o login"
      className="group fixed top-4 left-4 sm:top-6 sm:left-6 z-50 block"
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
