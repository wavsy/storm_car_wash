import { facilities } from "@/content/facilities";
import { hours } from "@/content/hours";
import { photos } from "@/content/photos";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PhotoBand } from "./PhotoBand";

export async function TwoPaths() {
  const t = await getTranslations("paths");
  const photoAlt = await getTranslations("photos");

  return (
    <div>
      <Link href="/self-service" aria-label={t("selfService.hrefLabel")} className="block">
        <PhotoBand photo={photos.selfService} alt={photoAlt("selfService")}>
          <p className="font-heading text-[22px] font-bold">{t("selfService.title")}</p>
          <p className="mt-1 text-[15px] text-navy/75">
            {t("selfService.meta", { bays: facilities.selfServiceBays })}
          </p>
        </PhotoBand>
      </Link>
      <Link href="/staffed" aria-label={t("staffed.hrefLabel")} className="block">
        <PhotoBand photo={photos.staffed} alt={photoAlt("staffed")}>
          <p className="font-heading text-[22px] font-bold">{t("staffed.title")}</p>
          <p className="mt-1 text-[15px] text-navy/75">
            {t("staffed.meta", {
              bays: facilities.staffedBays,
              open: hours.staffed.open,
              close: hours.staffed.close,
            })}
          </p>
        </PhotoBand>
      </Link>
    </div>
  );
}
