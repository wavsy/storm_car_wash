import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const host = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const pages = ["/", "/self-service", "/staffed", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        host + getPathname({ locale, href }),
      ]),
    ) as Record<string, string>;
    languages["x-default"] = host + getPathname({ locale: "bg", href });

    return routing.locales.map((locale) => ({
      url: host + getPathname({ locale, href }),
      lastModified: new Date(),
      alternates: { languages },
    }));
  });
}
