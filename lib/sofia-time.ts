import { hours, SCHEMA_DAY, type Weekday } from "@/content/hours";

const weekdayMap: Record<string, Weekday> = {
  Mon: "mo",
  Tue: "tu",
  Wed: "we",
  Thu: "th",
  Fri: "fr",
  Sat: "sa",
  Sun: "su",
};

export type SofiaClock = {
  weekday: Weekday;
  minutes: number;
};

export function getSofiaClock(now: Date = new Date()): SofiaClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: hours.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekdayLabel = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const weekday = weekdayMap[weekdayLabel] ?? "mo";

  return { weekday, minutes: hour * 60 + minute };
}

export function parseHm(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

export function isStaffedOpen(now: Date = new Date()): boolean {
  const days = hours.staffed.days;
  if (!hours.staffed.daysConfirmed || days === null) {
    return false;
  }
  const clock = getSofiaClock(now);
  if (!days.includes(clock.weekday)) {
    return false;
  }
  const open = parseHm(hours.staffed.open);
  const close = parseHm(hours.staffed.close);
  return clock.minutes >= open && clock.minutes < close;
}

export function staffedSchemaDays() {
  const days = hours.staffed.days;
  if (!hours.staffed.daysConfirmed || days === null) {
    return [];
  }
  return days.map((day) => SCHEMA_DAY[day]);
}

export function selfServiceSchemaDays() {
  return hours.selfService.days.map((day) => SCHEMA_DAY[day]);
}
