import { business } from "@/content/business";
import { getTranslations } from "next-intl/server";
import { LanguageSwitch } from "./LanguageSwitch";
import { PendingValue } from "./PendingValue";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-[15px]">
        <p>
          <PendingValue path="content/business.ts#phone" value={business.phone}>
            {business.phone ? (
              <a href={`tel:${business.phone}`}>{business.phone}</a>
            ) : null}
          </PendingValue>
        </p>
        <p>
          <PendingValue
            path="content/business.ts#postalAddress"
            value={business.postalAddress}
          >
            {business.postalAddress}
          </PendingValue>
        </p>
        <p className="flex flex-wrap items-center gap-2">
          <PendingValue path="content/business.ts#legalName" value={business.legalName}>
            {business.legalName}
          </PendingValue>
          <PendingValue path="content/business.ts#eik" value={business.eik}>
            {business.eik ? `ЕИК ${business.eik}` : null}
          </PendingValue>
        </p>
        <p>
          <a href={business.facebookUrl} rel="noreferrer" target="_blank">
            {t("facebook")}
          </a>
        </p>
        <LanguageSwitch />
      </div>
    </footer>
  );
}
