import { business } from "@/content/business";
import { hours } from "@/content/hours";
import { getLocale, getTranslations } from "next-intl/server";
import { MapsButton } from "@/components/MapsButton";

export async function LocationSection() {
  const t = await getTranslations("place");
  const locale = await getLocale();
  const { lat, lng } = business.coordinates;
  const landmark = locale === "en" ? business.landmarkEn : business.landmarkBg;
  const city = locale === "en" ? business.cityEn : business.cityBg;
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed&hl=${locale}`;

  return (
    <section className="border-t border-white/8 bg-ink">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div
          id="location"
          className="relative min-h-[320px] scroll-mt-24 sm:min-h-[420px] lg:min-h-[560px]"
        >
          <iframe
            title={t("mapTitle")}
            src={embedSrc}
            className="absolute inset-0 h-full w-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-cyan/20 ring-inset"
            aria-hidden
          />
        </div>

        <div
          id="contact"
          className="flex scroll-mt-24 flex-col justify-center px-4 py-16 sm:px-8 lg:px-14 lg:py-20"
        >
          <p className="text-[11px] tracking-[0.32em] text-cyan uppercase">
            {t("kicker")}
          </p>
          <h2 className="mt-4 text-[2.1rem] text-foam sm:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 font-heading text-[22px] text-foam">{city}</p>
          <p className="mt-2 max-w-md text-[16px] text-steel">{landmark}</p>

          <dl className="mt-8 space-y-4 text-[15px]">
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-cyan uppercase">
                {t("selfServiceLabel")}
              </dt>
              <dd className="mt-1 text-foam">{t("selfServiceHours")}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-cyan uppercase">
                {t("staffedLabel")}
              </dt>
              <dd className="mt-1 text-foam">
                {hours.staffed.open}–{hours.staffed.close}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-cyan uppercase">
                {t("phoneLabel")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${business.phone.tel}`}
                  className="font-heading text-[22px] tracking-[-0.03em] text-foam hover:text-cyan"
                >
                  {business.phone.display}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MapsButton label={t("openMaps")} />
            <a
              href={`tel:${business.phone.tel}`}
              className="inline-flex min-h-11 items-center justify-center border border-steel/40 px-5 text-[13px] font-medium tracking-[0.14em] text-foam uppercase transition-colors duration-200 hover:border-cyan hover:text-cyan"
            >
              {t("call")}
            </a>
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-[13px] tracking-[0.14em] text-steel uppercase hover:text-cyan"
            >
              {t("facebook")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
