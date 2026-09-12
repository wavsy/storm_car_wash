import { business } from "@/content/business";
import { hours } from "@/content/hours";
import { selfServiceSchemaDays } from "@/lib/sofia-time";
import type { Locale } from "@/i18n/routing";

export function localBusinessJsonLd(locale: Locale) {
  const name = locale === "en" ? business.nameEn : business.nameBg;
  const city = locale === "en" ? business.cityEn : business.cityBg;

  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name,
    image: "/brand/logo-full.png",
    url: locale === "en" ? "/en" : "/",
    telephone: business.phone.tel,
    sameAs: [business.facebookUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        name: locale === "en" ? "Self-service" : "Самообслужване",
        dayOfWeek: selfServiceSchemaDays(),
        opens: hours.selfService.open,
        closes: "23:59",
      },
    ],
  };
}
