import { business } from "@/content/business";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PendingValue } from "@/components/PendingValue";
import { LocationBlock } from "@/components/LocationBlock";
import { HoursBlock } from "@/components/HoursBlock";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const footer = await getTranslations("footer");

  return (
    <article className="pb-12">
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px]">{t("title")}</h1>
          <p className="mt-3 max-w-xl text-[16px] text-navy/80">{t("lead")}</p>
          <p className="mt-6">
            <span className="block font-heading text-[15px] font-semibold">
              {t("phoneLabel")}
            </span>
            <PendingValue path="content/business.ts#phone" value={business.phone}>
              {business.phone ? (
                <a href={`tel:${business.phone}`}>{business.phone}</a>
              ) : null}
            </PendingValue>
          </p>
          <p className="mt-4">
            <a href={business.facebookUrl} rel="noreferrer" target="_blank">
              {footer("facebook")}
            </a>
          </p>
        </div>
      </header>
      <LocationBlock />
      <HoursBlock heading={t("hoursHeading")} mode="both" />
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-5 text-[22px]">{t("formHeading")}</h2>
          <EnquiryForm />
        </div>
      </section>
    </article>
  );
}
