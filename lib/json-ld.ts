import { business } from "@/content/business";
import { hours } from "@/content/hours";
import { selfServiceSchemaDays, staffedSchemaDays } from "@/lib/sofia-time";
import type { Locale } from "@/i18n/routing";

export function localBusinessJsonLd(locale: Locale) {
  const name = locale === "en" ? business.nameEn : business.nameBg;
  const city = locale === "en" ? business.cityEn : business.cityBg;

  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name,
    image: "/logo-storm.png",
    url: locale === "en" ? "/en" : "/",
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
        opens: "00:00",
        closes: "23:59",
      },
      {
        "@type": "OpeningHoursSpecification",
        name: locale === "en" ? "Staffed" : "С екип",
        dayOfWeek: staffedSchemaDays(),
        opens: hours.staffed.open,
        closes: hours.staffed.close,
      },
    ],
  };
}
