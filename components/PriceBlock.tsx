import { DEFAULT_PROGRAM_PRICE, exceptionPrograms } from "@/content/pricing";
import { getFormatter, getTranslations } from "next-intl/server";

export async function PriceBlock() {
  const t = await getTranslations("price");
  const programs = await getTranslations("programs");
  const format = await getFormatter();

  const amount = String(DEFAULT_PROGRAM_PRICE);
  const exceptions = exceptionPrograms
    .map((program) => {
      const price = format.number(program.price, {
        style: "currency",
        currency: "EUR",
      });
      return `${programs(`${program.id}.name`)} ${price}`;
    })
    .join(" · ");

  return (
    <section className="bg-white px-4 py-14 text-center">
      <p className="font-heading text-[72px] leading-none font-bold tracking-[-0.04em] text-navy sm:text-[96px]">
        {t("heroAmount", { amount })}
      </p>
      <p className="mt-3 font-heading text-[22px] font-semibold text-cyan-text">
        {t("everyProgram")}
      </p>
      <p className="mx-auto mt-4 max-w-sm text-[14px] text-navy/70">{exceptions}</p>
    </section>
  );
}
