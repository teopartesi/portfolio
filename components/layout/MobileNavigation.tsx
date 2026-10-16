"use client";

import { useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";

import { navigation } from "@/lib/data";

function CloseOnDesktop({
  open,
  close,
}: {
  open: boolean;
  close: (target?: HTMLElement) => void;
}) {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (!desktop.matches || !open) return;

      const active = document.activeElement;
      const target = active?.closest("[data-mobile-navigation]")
        ? document.querySelector<HTMLElement>(`header a[href="${navigation[0].href}"]`)
        : active;

      close(target instanceof HTMLElement ? target : undefined);
    };

    handleChange();
    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, [open, close]);

  return null;
}

export function MobileNavigation() {
  return (
    <Popover className="shrink-0 md:hidden" data-mobile-navigation>
      {({ open, close }) => (
        <>
          <CloseOnDesktop open={open} close={close} />
          <PopoverButton
            className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
            aria-label={open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </PopoverButton>
          <PopoverPanel
            transition
            className="absolute inset-x-5 top-full mt-2 flex max-h-[calc(100dvh-6rem)] origin-top flex-col gap-1 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-2xl shadow-shadow-overlay backdrop-blur-xl transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0 motion-reduce:transform-none motion-reduce:transition-none sm:inset-x-8 md:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => close()}
                className="flex min-h-11 items-center rounded-lg px-4 py-3 text-base font-medium text-muted transition hover:bg-surface-hover hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent motion-reduce:transition-none"
              >
                {item.label}
              </a>
            ))}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
