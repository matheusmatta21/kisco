export function Avatar({
  url,
  name,
  size,
  ringClass,
}: {
  url: string | null;
  name: string;
  size: "sm" | "lg";
  ringClass?: string;
}) {
  const sizeClass = size === "lg" ? "h-14 w-14 text-lg" : "h-9 w-9 text-sm";
  const ring = ringClass ?? "ring-1 ring-white/10";
  if (url) {
    return (
      <img
        src={url}
        alt=""
        className={`relative ${sizeClass} flex-shrink-0 rounded-full object-cover ${ring}`}
      />
    );
  }
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      aria-hidden
      className={`relative ${sizeClass} inline-flex flex-shrink-0 items-center justify-center rounded-full bg-white/10 font-medium text-white ${ring}`}
    >
      {initial}
    </div>
  );
}
