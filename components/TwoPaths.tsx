import { facilities } from "@/content/facilities";
import { hours } from "@/content/hours";
import { photos } from "@/content/photos";
import { getTranslations } from "next-intl/server";
import { PhotoBand } from "./PhotoBand";

export async function TwoPaths() {
  const t = await getTranslations("paths");
  const photoAlt = await getTranslations("gallery");

  return (
    <div>
      <a href="#prices" aria-label={t("selfService.hrefLabel")} className="block">
        <PhotoBand photo={photos.bays} alt={photoAlt("bays")}>
          <p className="font-heading text-[22px] font-bold">{t("selfService.title")}</p>
          <p className="mt-1 text-[15px] text-navy/75">
            {t("selfService.meta", { bays: facilities.selfServiceBays })}
          </p>
        </PhotoBand>
      </a>
      <a href="#prices" aria-label={t("staffed.hrefLabel")} className="block">
        <PhotoBand photo={photos.courtyard} alt={photoAlt("courtyard")}>
          <p className="font-heading text-[22px] font-bold">{t("staffed.title")}</p>
          <p className="mt-1 text-[15px] text-navy/75">
            {t("staffed.meta", {
              bays: facilities.staffedBays,
              open: hours.staffed.open,
              close: hours.staffed.close,
            })}
          </p>
        </PhotoBand>
      </a>
    </div>
  );
}
