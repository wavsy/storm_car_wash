import localFont from "next/font/local";

export const geologica = localFont({
  src: [
    {
      path: "../app/fonts/Geologica-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Geologica-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geologica",
  display: "swap",
  adjustFontFallback: false,
});

export const commissioner = localFont({
  src: [
    {
      path: "../app/fonts/Commissioner-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Commissioner-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-commissioner",
  display: "swap",
  adjustFontFallback: false,
});
