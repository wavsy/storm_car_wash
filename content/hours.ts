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
    // Unconfirmed. Rendered as Mon–Fri until the client says otherwise.
    days: ["mo", "tu", "we", "th", "fr"] as const satisfies readonly Weekday[],
    daysConfirmed: false,
  },
};
