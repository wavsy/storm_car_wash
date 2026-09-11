import { business } from "@/content/business";
import { getLocale, getTranslations } from "next-intl/server";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { LogoLockup } from "./LogoLockup";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const headerT = await getTranslations("header");
  const locale = await getLocale();
  const city = locale === "en" ? business.cityEn : business.cityBg;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8 bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <Link href="/" aria-label={headerT("logoAlt")} className="w-fit">
          <LogoLockup alt={headerT("logoAlt")} size="footer" />
        </Link>
        <div className="flex flex-col gap-3 text-[14px] text-steel">
          <p className="text-foam">{t("copyright")}</p>
          <p>{city}</p>
          <p className="flex flex-wrap gap-4">
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-cyan">
              Google Maps
            </a>
            <a
              href={business.facebookUrl}
              rel="noreferrer"
              target="_blank"
              className="hover:text-cyan"
            >
              {t("facebook")}
            </a>
          </p>
          <p>© {year}</p>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
