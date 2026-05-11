import type { LucideIcon } from "lucide-react";
import { ACCENT, type Accent } from "./CardShell";

export function CardHeader({
  label,
  Icon,
  accent,
}: {
  label: string;
  Icon: LucideIcon;
  accent: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <div className="mb-5 flex items-center gap-3">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${a.badgeBorder} ${a.badgeBg}`}
      >
        <Icon className={`h-5 w-5 ${a.badgeText}`} aria-hidden />
      </div>
      <p className="text-[0.855rem] font-semibold leading-tight text-white sm:text-lg">
        {label}
      </p>
    </div>
  );
}
