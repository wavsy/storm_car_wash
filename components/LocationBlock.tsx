import { business } from "@/content/business";
import { getLocale, getTranslations } from "next-intl/server";
import { MapsButton } from "./MapsButton";

export async function LocationBlock() {
  const t = await getTranslations("location");
  const locale = await getLocale();
  const landmark = locale === "en" ? business.landmarkEn : business.landmarkBg;
  const { lat, lng } = business.coordinates;
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed&hl=${locale}`;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-[22px]">{t("heading")}</h2>
        <p className="mt-2 max-w-xl text-[16px]">{landmark}</p>
        <div className="mt-5 overflow-hidden rounded-[12px] border border-navy/10">
          <iframe
            title={t("mapTitle")}
            src={embedSrc}
            className="h-56 w-full sm:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-5">
          <MapsButton label={t("directions")} />
        </div>
      </div>
    </section>
  );
}
