import { facilities } from "@/content/facilities";
import { routing } from "@/i18n/routing";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { ProgramList } from "@/components/Programs";
import { HoursBlock } from "@/components/HoursBlock";
import { LocationBlock } from "@/components/LocationBlock";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("selfServiceTitle"),
    description: t("selfServiceDescription"),
  };
}

export default async function SelfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("selfService");
  const format = await getFormatter();
  const coins = facilities.payment.coins
    .map((value) => format.number(value, { style: "currency", currency: "EUR" }))
    .join(" / ");

  return (
    <article className="pb-12">
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px]">{t("title")}</h1>
          <p className="mt-3 max-w-xl text-[16px] text-navy/80">{t("lead")}</p>
        </div>
      </header>
      <section className="px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[22px]">{t("howHeading")}</h2>
          <ol className="mt-5 grid gap-6">
            <li>
              <p className="font-heading text-[18px] font-semibold">{t("step1Title")}</p>
              <p className="mt-1 text-navy/75">{t("step1Body")}</p>
            </li>
            <li>
              <p className="font-heading text-[18px] font-semibold">{t("step2Title")}</p>
              <p className="mt-1 text-navy/75">{t("step2Body", { coins })}</p>
            </li>
            <li>
              <p className="font-heading text-[18px] font-semibold">{t("step3Title")}</p>
              <p className="mt-1 text-navy/75">{t("step3Body")}</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-[22px]">{t("programsHeading")}</h2>
          <ProgramList />
        </div>
      </section>
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[22px]">{t("guideHeading")}</h2>
          <p className="mt-2 text-navy/75">{t("guideLead")}</p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-[16px]">
            <li>{t("guide1")}</li>
            <li>{t("guide2")}</li>
            <li>{t("guide3")}</li>
            <li>{t("guide4")}</li>
          </ol>
        </div>
      </section>
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[22px]">{t("vacuumsHeading")}</h2>
          <p className="mt-2 text-navy/80">
            {t("vacuumsBody", { count: facilities.vacuums })}
          </p>
        </div>
      </section>
      <HoursBlock heading={t("hoursHeading")} mode="self-service" />
      <LocationBlock />
    </article>
  );
}
