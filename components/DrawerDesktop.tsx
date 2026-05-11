"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DrawerNav } from "./DrawerNav";

export function DrawerDesktop() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction="left"
      shouldScaleBackground={false}
      noBodyStyles
    >
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Abrir navegação"
          className="fixed left-4 top-4 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white/[0.15] md:inline-flex"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="border-r-white/10 bg-[#0a0613]/95 text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-40 -right-20 h-[400px] w-[300px] rounded-full bg-[#ff2d95]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-[#22e3ff]/15 blur-[120px]" />

        <DrawerHeader className="relative pt-10">
          <DrawerTitle className="font-[family-name:var(--font-mono-display)] text-[11px] uppercase tracking-[0.4em] text-white/50">
            Navegação
          </DrawerTitle>
        </DrawerHeader>

        <div className="relative flex-1 overflow-y-auto">
          <DrawerNav onItemClick={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
