export type Pending<T> = T | null;

export function isPending<T>(value: Pending<T>): value is null {
  return value === null;
}
