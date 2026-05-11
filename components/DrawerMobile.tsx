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

export function DrawerMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={false}
      noBodyStyles
    >
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Abrir navegação"
          className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white/[0.15] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="border-t-white/10 bg-[#0a0613]/95 text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#ff2d95]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[200px] w-[400px] rounded-full bg-[#22e3ff]/15 blur-[120px]" />

        <DrawerHeader className="relative">
          <DrawerTitle className="font-[family-name:var(--font-mono-display)] text-[11px] uppercase tracking-[0.4em] text-white/50">
            Navegação
          </DrawerTitle>
        </DrawerHeader>

        <div className="relative">
          <DrawerNav onItemClick={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
