import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en"],
  defaultLocale: "bg",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/self-service": {
      bg: "/samoobsluzhvane",
      en: "/self-service",
    },
    "/staffed": {
      bg: "/s-ekip",
      en: "/staffed",
    },
    "/contact": {
      bg: "/kontakti",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
