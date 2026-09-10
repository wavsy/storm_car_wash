"use server";

import { Resend } from "resend";
import { track } from "@vercel/analytics/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(40),
  message: z.string().trim().min(1).max(2000),
  company: z.string().max(0),
});

export type EnquiryState = {
  status: "idle" | "success" | "error";
};

export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    if ((formData.get("company") as string | null)?.length) {
      return { status: "success" };
    }
    return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { status: "error" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Запитване: ${parsed.data.name}`,
    text: `${parsed.data.name}\n${parsed.data.phone}\n\n${parsed.data.message}`,
  });

  if (error) {
    return { status: "error" };
  }

  await track("enquiry_submitted");
  return { status: "success" };
}
