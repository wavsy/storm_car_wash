import type { SitePhoto } from "@/content/photos";
import Image from "next/image";
import type { ReactNode } from "react";

export function PhotoBand({
  photo,
  alt,
  priority = false,
  children,
  minHeightClass = "min-h-[280px] sm:min-h-[420px]",
}: {
  photo: SitePhoto;
  alt: string;
  priority?: boolean;
  children?: ReactNode;
  minHeightClass?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${minHeightClass}`}>
      <Image
        src={photo.src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {children ? (
        <div className="absolute inset-0 flex items-end p-4 sm:p-6">
          <div className="max-w-md rounded-[12px] bg-white/94 p-4 shadow-sm">
            {children}
          </div>
        </div>
      ) : null}
    </section>
  );
}
