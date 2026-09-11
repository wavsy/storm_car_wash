import { getTranslations } from "next-intl/server";
import { galleryPhotos } from "@/content/photos";
import { GalleryRail } from "./GalleryRail";

export async function Gallery() {
  const t = await getTranslations("gallery");
  const alts = galleryPhotos.map((photo) =>
    t(photo.altKey as "courtyard" | "facade" | "bays" | "panel" | "vacuum" | "facadeWide" | "courtyardAngle"),
  );

  return (
    <section
      id="gallery"
      className="scroll-mt-24 border-t border-white/8 bg-graphite px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[11px] tracking-[0.32em] text-cyan uppercase">
          {t("kicker")}
        </p>
        <h2 className="mt-4 max-w-xl text-[2.1rem] text-foam sm:text-5xl">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-md text-[16px] text-steel">{t("lead")}</p>
        <div className="mt-10">
          <GalleryRail alts={alts} />
        </div>
      </div>
    </section>
  );
}
