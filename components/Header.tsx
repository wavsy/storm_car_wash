import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OpenNow } from "./OpenNow";
import { LanguageSwitch } from "./LanguageSwitch";
import Image from "next/image";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="shrink-0" aria-label={t("logoAlt")}>
          <Image
            src="/logo-storm.png"
            alt={t("logoAlt")}
            width={140}
            height={40}
            priority
            className="h-9 w-auto max-w-[110px] sm:h-10 sm:max-w-[140px]"
          />
        </Link>
        <div className="flex items-center gap-3">
          <OpenNow />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
