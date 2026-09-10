"use client";

import { sendEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

const initial: EnquiryState = { status: "idle" };

export function EnquiryForm() {
  const t = useTranslations("form");
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  return (
    <form action={action} className="mx-auto flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-[15px]">
        {t("name")}
        <input
          name="name"
          required
          autoComplete="name"
          className="min-h-11 rounded-[10px] border border-navy/20 px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-[15px]">
        {t("phone")}
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="min-h-11 rounded-[10px] border border-navy/20 px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-[15px]">
        {t("message")}
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-[10px] border border-navy/20 px-3 py-2"
        />
      </label>
      <div aria-hidden="true" className="absolute -left-[10000px] h-0 w-0 overflow-hidden">
        <label>
          {t("honeypot")}
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-[12px] bg-navy px-4 text-[15px] font-medium text-[#fff] hover:bg-navy/90 disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
      {state.status === "success" ? (
        <p role="status" className="text-[15px]">
          {t("success")}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="text-[15px]">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
