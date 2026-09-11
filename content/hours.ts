export const WEEKDAYS = ["mo", "tu", "we", "th", "fr", "sa", "su"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export const SCHEMA_DAY: Record<Weekday, string> = {
  mo: "Monday",
  tu: "Tuesday",
  we: "Wednesday",
  th: "Thursday",
  fr: "Friday",
  sa: "Saturday",
  su: "Sunday",
};

export const hours = {
  timeZone: "Europe/Sofia" as const,
  selfService: {
    alwaysOpen: true,
    open: "00:00",
    close: "24:00",
    days: WEEKDAYS,
  },
  staffed: {
    alwaysOpen: false,
    open: "08:00",
    close: "17:00",
    // Days of week are NOT confirmed. Do not imply daily / Mon–Fri.
    days: null as readonly Weekday[] | null,
    daysConfirmed: false,
  },
};
