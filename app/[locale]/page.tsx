import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { Prices } from "@/components/services/Prices";
import { Gallery } from "@/components/gallery/Gallery";
import { LocationSection } from "@/components/location/LocationSection";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Prices />
      <Gallery />
      <LocationSection />
    </>
  );
}
