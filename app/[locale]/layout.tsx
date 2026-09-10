import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { commissioner, geologica } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const pathPrefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: pathPrefix || "/",
      languages: {
        bg: "/",
        en: "/en",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!routing.locales.includes(raw as Locale)) {
    notFound();
  }
  const locale = raw as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geologica.variable} ${commissioner.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd locale={locale} />
          <SkipLink />
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
