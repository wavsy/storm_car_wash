import Image from "next/image";

export function LogoLockup({
  alt,
  size = "header",
}: {
  alt: string;
  size?: "header" | "footer";
}) {
  const mark = size === "footer" ? "h-12 w-auto sm:h-14" : "h-8 w-auto sm:h-9";
  const word = size === "footer" ? "h-10 w-auto sm:h-11" : "h-7 w-auto sm:h-8";
  const box =
    size === "footer"
      ? "gap-3 px-3 py-2"
      : "gap-2 px-1.5 py-1 sm:gap-2.5 sm:px-2 sm:py-1.5";

  return (
    <span
      className={`inline-flex isolate items-center overflow-hidden rounded-[1.25rem] bg-white ${box}`}
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={616}
        height={292}
        className={mark}
        priority={size === "header"}
      />
      <Image
        src="/brand/logo-word.png"
        alt={alt}
        width={616}
        height={196}
        className={word}
        priority={size === "header"}
      />
    </span>
  );
}
