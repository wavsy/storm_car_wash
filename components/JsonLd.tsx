import { localBusinessJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/i18n/routing";

export function JsonLd({ locale }: { locale: Locale }) {
  const data = localBusinessJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
