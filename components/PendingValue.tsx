import type { Pending } from "@/content/pending";
import { isPending } from "@/content/pending";
import type { ReactNode } from "react";

function mustFailProductionBuild() {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview"
  );
}

export function PendingValue({
  path,
  value,
  children,
}: {
  path: string;
  value?: Pending<unknown>;
  children?: ReactNode;
}) {
  const pending = value === undefined || isPending(value);

  if (!pending) {
    return <>{children}</>;
  }

  if (mustFailProductionBuild()) {
    throw new Error(`Pending value reached a visitor: ${path}`);
  }

  return (
    <span
      role="status"
      className="inline-flex flex-col gap-0.5 rounded-[10px] border border-dashed border-cyan px-2 py-1 text-[13px] leading-tight text-navy"
    >
      <span>чака се от клиента</span>
      <code className="font-body text-[11px] text-navy/70">{path}</code>
    </span>
  );
}
