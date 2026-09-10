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
  price: number;
  durationMinutes: Pending<number>;
  enNameConfirmed: boolean;
};

export const DEFAULT_PROGRAM_PRICE = 1;

export const programs: Program[] = [
  { id: "pre-wash", price: 1, durationMinutes: null, enNameConfirmed: false },
  { id: "touchless-gel", price: 1, durationMinutes: null, enNameConfirmed: false },
  { id: "turbo-foam", price: 1, durationMinutes: null, enNameConfirmed: false },
  { id: "rinse", price: 1, durationMinutes: null, enNameConfirmed: false },
  { id: "nano-wax", price: 1, durationMinutes: null, enNameConfirmed: false },
  { id: "short-water", price: 0.5, durationMinutes: null, enNameConfirmed: true },
  { id: "multi-wash", price: 2, durationMinutes: null, enNameConfirmed: true },
  { id: "gloss-osmosis", price: 1, durationMinutes: null, enNameConfirmed: false },
];

export const exceptionPrograms = programs.filter(
  (program) => program.price !== DEFAULT_PROGRAM_PRICE,
);

export type CarClass = "car" | "suv" | "van";

export const carClasses: CarClass[] = ["car", "suv", "van"];

export type StaffService = {
  id: string;
  prices: Pending<Record<CarClass, number>>;
};

export const staffServices: Pending<StaffService[]> = null;

export const bookingRequired: Pending<boolean> = null;
