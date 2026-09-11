import { business } from "@/content/business";

type Variant = "primary" | "secondary" | "header";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan text-ink hover:bg-foam focus-visible:outline-cyan",
  secondary:
    "border border-steel/40 bg-transparent text-foam hover:border-cyan hover:text-cyan",
  header:
    "bg-cyan text-ink hover:bg-foam",
};

export function MapsButton({
  label,
  variant = "primary",
  className = "",
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={business.mapsUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center px-5 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
