"use client";

import { NAV_ITEMS } from "./nav-items";

export function DrawerNav({ onItemClick }: { onItemClick: () => void }) {
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    e.preventDefault();
    onItemClick();

    const el = document.getElementById(id);
    if (!el) return;

    // scrollIntoView on a descendant of overflow:hidden silently scrolls the
    // ancestor's scrollTop, clipping its content. Compute absolute Y and scroll
    // the document directly to avoid that side-effect.
    const scrollMargin =
      parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - scrollMargin;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav className="px-4 pb-6">
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
