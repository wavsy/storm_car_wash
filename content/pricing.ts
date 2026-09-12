import type { Pending } from "./pending";

export type ProgramId =
  | "pre-wash"
  | "touchless-gel"
  | "turbo-foam"
  | "rinse"
  | "nano-wax"
  | "short-water"
  | "multi-wash"
  | "gloss-osmosis";

export type Program = {
  id: ProgramId;
  number: number;
  price: number;
  durationMinutes: Pending<number>;
};

export const DEFAULT_PROGRAM_PRICE = 1;

export const programs: Program[] = [
  { id: "pre-wash", number: 1, price: 1, durationMinutes: null },
  { id: "touchless-gel", number: 2, price: 1, durationMinutes: null },
  { id: "turbo-foam", number: 3, price: 1, durationMinutes: null },
  { id: "rinse", number: 4, price: 1, durationMinutes: null },
  { id: "nano-wax", number: 5, price: 1, durationMinutes: null },
  { id: "short-water", number: 6, price: 0.5, durationMinutes: null },
  { id: "multi-wash", number: 7, price: 2, durationMinutes: null },
  { id: "gloss-osmosis", number: 8, price: 1, durationMinutes: null },
];

export const exceptionPrograms = programs.filter(
  (program) => program.price !== DEFAULT_PROGRAM_PRICE,
);

export const vacuumPrograms = [
  { minutes: 2, price: 0.5 },
  { minutes: 4, price: 1 },
  { minutes: 8, price: 2 },
] as const;

export type CarClass = "car" | "suv" | "van";

export const carClasses: CarClass[] = ["car", "suv", "van"];

export type StaffService = {
  id: string;
  prices: Pending<Record<CarClass, number>>;
};

export const staffServices: Pending<StaffService[]> = null;

export const bookingRequired: Pending<boolean> = null;
