import { getTranslations } from "next-intl/server";
import { HeroStage } from "./HeroStage";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <HeroStage
      kicker={t("kicker")}
      titleLine1={t("titleLine1")}
      titleLine2={t("titleLine2")}
      availability={t("availability")}
      location={t("location")}
      directions={t("directions")}
      seePrices={t("seePrices")}
      imageAlt={t("imageAlt")}
      facts={[t("factBays"), t("factStaffed"), t("factPay")]}
    />
  );
}
