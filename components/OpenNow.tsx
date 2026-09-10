"use client";

import { hours } from "@/content/hours";
import { isStaffedOpen } from "@/lib/sofia-time";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function OpenNow() {
  const t = useTranslations("openNow");
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isStaffedOpen(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const label =
    open === null
      ? t("selfServiceAlways")
      : open
        ? t("staffedOpen", { close: hours.staffed.close })
        : t("staffedClosed");

  return (
    <p
      className="max-w-[10.5rem] rounded-full border border-navy/15 bg-white px-2.5 py-1 text-center text-[11px] leading-tight text-navy sm:max-w-[14rem] sm:px-3 sm:text-[12px]"
      aria-live="polite"
      suppressHydrationWarning
    >
      {label}
    </p>
  );
}
