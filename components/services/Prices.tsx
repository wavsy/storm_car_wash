import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";
import { programs } from "@/content/pricing";
import { photos } from "@/content/photos";
import { hours } from "@/content/hours";

export async function Prices() {
  const t = await getTranslations("prices");
  const names = await getTranslations("programs");
  const format = await getFormatter();
  const photosT = await getTranslations("gallery");

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

        <div className="relative min-h-[240px] overflow-hidden border border-white/10 sm:min-h-[320px] lg:min-h-[720px]">
          <Image
            src={photos.panel.src}
            alt={photosT("panel")}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-ink/20"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
