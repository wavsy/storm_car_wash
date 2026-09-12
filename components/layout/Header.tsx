"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { MapsButton } from "@/components/MapsButton";
import { LogoLockup } from "./LogoLockup";

export function Header() {
  const t = useTranslations("nav");
  const headerT = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-white/8 bg-ink/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center gap-3 px-4 sm:h-[4.75rem] sm:px-6 lg:px-8">
        <Link
          href={{ pathname: "/", hash: "hero" }}
          className="flex shrink-0 items-center"
          aria-label={headerT("logoAlt")}
          onClick={() => {
            setOpen(false);
            document.getElementById("hero")?.scrollIntoView();
          }}
        >
          <LogoLockup alt={headerT("logoAlt")} />
        </Link>

        <nav
          aria-label={t("primary")}
          className="ml-6 hidden items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[12px] tracking-[0.18em] text-steel uppercase transition-colors duration-200 hover:text-foam"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <LanguageSwitch className="hidden sm:flex" />
          <MapsButton
            label={t("directions")}
            variant="header"
            className="min-h-10 px-3.5 text-[11px] sm:px-4 sm:text-[12px]"
          />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-foam lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? headerT("close") : headerT("menu")}
            </span>
            <span className="flex h-3.5 w-5 flex-col justify-between" aria-hidden>
              <span
                className={`h-px w-full bg-foam transition-transform duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-foam transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-foam transition-transform duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/8 bg-ink/96 lg:hidden"
        >
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-6 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-heading text-[22px] tracking-[-0.03em] text-foam"
              >
                {t(item.key)}
              </a>
            ))}
            <LanguageSwitch className="mt-4 sm:hidden" onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
