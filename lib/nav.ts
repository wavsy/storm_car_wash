export const NAV_ITEMS = [
  { href: "#hero", key: "home" },
  { href: "#prices", key: "prices" },
  { href: "#gallery", key: "gallery" },
  { href: "#location", key: "location" },
  { href: "#contact", key: "contact" },
] as const;

export type NavItemKey = (typeof NAV_ITEMS)[number]["key"];
