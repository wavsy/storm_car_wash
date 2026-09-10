import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaffedServices } from "@/components/StaffedServices";
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
    title: t("staffedTitle"),
    description: t("staffedDescription"),
  };
}

export default async function StaffedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("staffed");

  return (
    <article className="pb-12">
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px]">{t("title")}</h1>
          <p className="mt-3 max-w-xl text-[16px] text-navy/80">{t("lead")}</p>
        </div>
      </header>
      <StaffedServices />
      <HoursBlock heading={t("hoursHeading")} mode="staffed" />
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-5 text-[22px]">{t("formHeading")}</h2>
          <EnquiryForm />
        </div>
      </section>
    </article>
  );
}
