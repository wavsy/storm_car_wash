import { hours } from "@/content/hours";
import { getTranslations } from "next-intl/server";
import { PendingValue } from "./PendingValue";

export async function HoursBlock({
  heading,
  mode = "both",
}: {
  heading: string;
  mode?: "both" | "self-service" | "staffed";
}) {
  const t = await getTranslations("hours");

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-[22px]">{heading}</h2>
        <dl className="mt-4 space-y-3 text-[16px]">
          {mode !== "staffed" ? (
            <div>
              <dt className="font-heading font-semibold">{t("selfServiceLabel")}</dt>
              <dd>{t("always")}</dd>
            </div>
          ) : null}
          {mode !== "self-service" ? (
            <div>
              <dt className="font-heading font-semibold">{t("staffedLabel")}</dt>
              <dd>
                {t("range", {
                  open: hours.staffed.open,
                  close: hours.staffed.close,
                })}
              </dd>
              {hours.staffed.daysConfirmed ? null : (
                <dd className="mt-2">
                  <PendingValue path="content/hours.ts#staffed.days" />
                  <span className="ml-2 text-[13px] text-navy/55">
                    {t("daysUnconfirmed")}
                  </span>
                </dd>
              )}
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
