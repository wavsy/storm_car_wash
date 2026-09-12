import { getFormatter, getTranslations } from "next-intl/server";
import { programs, vacuumPrograms } from "@/content/pricing";
import { hours } from "@/content/hours";
import { PriceStage } from "./PriceStage";

export async function Prices() {
  const t = await getTranslations("prices");
  const names = await getTranslations("programs");
  const format = await getFormatter();

  return (
    <section
      id="prices"
      className="relative scroll-mt-24 border-t border-white/8 bg-ink px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-cyan uppercase">
            {t("kicker")}
          </p>
          <h2 className="mt-4 max-w-xl text-[2.1rem] text-foam sm:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-md text-[16px] text-steel">{t("lead")}</p>
          <p className="mt-3 text-[14px] tracking-[0.04em] text-foam">
            {t("payment")}
          </p>

          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {programs.map((program) => {
              const isException = program.price !== 1;
              return (
                <li
                  key={program.id}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-heading text-[11px] tracking-[0.22em] text-cyan uppercase">
                      {t("program")} {String(program.number).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-heading text-[18px] tracking-[-0.03em] text-foam sm:text-[22px]">
                      {names(`${program.id}.name`)}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 font-heading text-[22px] tracking-[-0.03em] sm:text-[28px] ${
                      isException ? "text-cyan" : "text-foam"
                    }`}
                  >
                    {format.number(program.price, {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-12">
            <p className="font-heading text-[18px] text-foam sm:text-[22px]">
              {t("vacuumHeading")}
            </p>
            <p className="mt-2 text-[15px] text-steel">{t("vacuumLead")}</p>
            <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {vacuumPrograms.map((program) => {
                const isException = program.price !== 1;
                return (
                  <li
                    key={program.minutes}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <p className="font-heading text-[18px] tracking-[-0.03em] text-foam sm:text-[22px]">
                      {t("vacuumMinutes", { minutes: program.minutes })}
                    </p>
                    <p
                      className={`shrink-0 font-heading text-[22px] tracking-[-0.03em] sm:text-[28px] ${
                        isException ? "text-cyan" : "text-foam"
                      }`}
                    >
                      {format.number(program.price, {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 border-l-2 border-cyan pl-5">
            <p className="font-heading text-[18px] text-foam">
              {t("staffedHeading")}
            </p>
            <p className="mt-2 text-[15px] text-steel">
              {t("staffedLine", {
                open: hours.staffed.open,
                close: hours.staffed.close,
              })}
            </p>
          </div>
        </div>

        <PriceStage alt={t("panelAlt")} />
      </div>
    </section>
  );
}
