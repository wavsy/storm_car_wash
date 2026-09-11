import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/samoobsluzhvane", destination: "/#prices", permanent: true },
      { source: "/s-ekip", destination: "/#prices", permanent: true },
      { source: "/kontakti", destination: "/#contact", permanent: true },
      { source: "/en/self-service", destination: "/en#prices", permanent: true },
      { source: "/en/staffed", destination: "/en#prices", permanent: true },
      { source: "/en/contact", destination: "/en#contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
