import {
  DEFAULT_PROGRAM_PRICE,
  programs,
  type ProgramId,
} from "@/content/pricing";
import { getFormatter, getTranslations } from "next-intl/server";

export async function ProgramPills() {
  const t = await getTranslations("programs");
  const format = await getFormatter();

  return (
    <section className="px-4 pb-10">
      <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
        {programs.map((program) => (
          <li
            key={program.id}
            className="rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[13px] text-navy/80"
          >
            <span>{t(`${program.id as ProgramId}.name`)}</span>
            {program.price !== DEFAULT_PROGRAM_PRICE ? (
              <span className="ml-1 text-navy">
                {format.number(program.price, {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function ProgramList() {
  const t = await getTranslations("programs");
  const format = await getFormatter();

  return (
    <ol className="divide-y divide-navy/10 border-y border-navy/10">
      {programs.map((program, index) => {
        const detail = t(`${program.id}.detail`);
        return (
          <li
            key={program.id}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <p className="font-heading text-[17px] font-semibold">
                <span className="mr-2 text-navy/40">{index + 1}.</span>
                {t(`${program.id}.name`)}
              </p>
              {detail ? (
                <p className="mt-1 text-[14px] text-navy/65">{detail}</p>
              ) : null}
            </div>
            <div className="text-[15px] sm:text-right">
              <p>
                {format.number(program.price, {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
              {program.durationMinutes !== null ? (
                <p className="text-[13px] text-navy/60">
                  {program.durationMinutes} min
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
