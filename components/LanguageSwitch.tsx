"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitch({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <nav
      aria-label={t("language")}
      className={`flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase ${className}`}
    >
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 ? <span className="text-steel/50">/</span> : null}
          <Link
            href={pathname}
            locale={code}
            hrefLang={code}
            onClick={onNavigate}
            className={
              code === locale
                ? "text-foam"
                : "text-steel hover:text-cyan"
            }
          >
            {code}
          </Link>
        </span>
      ))}
    </nav>
  );
}
