import { business } from "@/content/business";

export function MapsButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={business.mapsUrl}
      target="_blank"
      rel="noreferrer"
      className={
        className ??
        "inline-flex min-h-11 items-center justify-center rounded-[12px] bg-navy px-4 py-2.5 text-[15px] font-medium text-[#fff] hover:bg-navy/90"
      }
    >
      {label}
    </a>
  );
}
