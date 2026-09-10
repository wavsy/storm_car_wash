"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitch() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <nav aria-label={t("language")} className="flex items-center gap-2 text-[13px]">
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 ? <span className="text-navy/30">/</span> : null}
          <Link
            href={pathname}
            locale={code}
            hrefLang={code}
            className={
              code === locale
                ? "font-medium text-navy"
                : "text-navy/55 hover:text-navy"
            }
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
