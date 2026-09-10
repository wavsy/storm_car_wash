import { photos } from "@/content/photos";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PhotoBand } from "@/components/PhotoBand";
import { MapsButton } from "@/components/MapsButton";
import { PriceBlock } from "@/components/PriceBlock";
import { ProgramPills } from "@/components/Programs";
import { TwoPaths } from "@/components/TwoPaths";
import { LocationBlock } from "@/components/LocationBlock";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const photosT = await getTranslations("photos");

  return (
    <>
      <PhotoBand
        photo={photos.hero}
        alt={photosT("dvor")}
        priority
        minHeightClass="min-h-[62vh]"
      >
        <h1 className="text-[28px] sm:text-[36px]">{t("headline")}</h1>
        <p className="mt-2 text-[15px] text-navy/75">{t("subline")}</p>
        <div className="mt-4">
          <MapsButton label={t("directions")} />
        </div>
      </PhotoBand>
      <PriceBlock />
      <ProgramPills />
      <TwoPaths />
      <LocationBlock />
    </>
  );
}
