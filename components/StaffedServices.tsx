import { bookingRequired, carClasses, staffServices } from "@/content/pricing";
import { getTranslations } from "next-intl/server";
import { PendingValue } from "./PendingValue";

export async function StaffedServices() {
  const t = await getTranslations("staffed");

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-[22px]">{t("servicesHeading")}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left text-[15px]">
            <thead>
              <tr className="border-b border-navy/15">
                <th className="py-2 pr-3 font-heading font-semibold" />
                {carClasses.map((carClass) => (
                  <th key={carClass} className="py-2 pr-3 font-heading font-semibold">
                    {t(carClass)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={1 + carClasses.length} className="py-4">
                  <PendingValue path="content/pricing.ts#staffServices" value={staffServices} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="mt-10 text-[22px]">{t("bookingHeading")}</h2>
        <div className="mt-3">
          <PendingValue path="content/pricing.ts#bookingRequired" value={bookingRequired} />
        </div>
      </div>
    </section>
  );
}
