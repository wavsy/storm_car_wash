"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { galleryPhotos } from "@/content/photos";

export function GalleryRail({ alts }: { alts: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="gallery-stage -mx-4 overflow-x-auto px-4 pb-8 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <ul className="flex w-max snap-x snap-mandatory gap-5 py-4 lg:gap-7">
        {galleryPhotos.map((photo, index) => {
          const tilt = reduce ? 0 : index % 2 === 0 ? -7 : 7;
          return (
            <motion.li
              key={photo.src}
              className="gallery-card relative h-[58vw] w-[82vw] shrink-0 snap-center overflow-hidden border border-white/12 sm:h-[360px] sm:w-[520px] lg:h-[420px] lg:w-[640px]"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={reduce ? false : { rotateY: tilt, rotateX: 3, opacity: 0.7 }}
              whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              whileHover={reduce ? undefined : { rotateY: tilt * -0.4, scale: 1.03 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={photo.src}
                alt={alts[index] ?? ""}
                fill
                sizes="(max-width: 640px) 82vw, 640px"
                className={`object-cover ${"objectClass" in photo ? photo.objectClass : ""}`}
              />
              <span
                className="gallery-shine"
                style={{ animationDelay: `${index * 1.1}s` }}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-white/5"
                aria-hidden
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
