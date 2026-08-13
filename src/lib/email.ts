import { Resend } from "resend";
import { SITE } from "@/lib/data";

export const resend = new Resend(process.env.RESEND_API_KEY);

export type QuoteSubmission = {
  name: string;
  email: string;
  phone?: string | null;
  event_type?: string | null;
  event_date?: string | null;
  guests?: number | null;
  package?: string | null;
  message?: string | null;
};

export async function sendQuoteConfirmation(submission: QuoteSubmission) {
  if (!process.env.RESEND_API_KEY) return null;

  const packageLabel =
    submission.package === "repass"
      ? "Repass — $499"
      : submission.package === "hibachi"
      ? "Hibachi Experience — $599"
      : submission.package === "corporate"
      ? "Corporate (custom quote)"
      : submission.package === "custom"
      ? "Custom"
      : "Not specified";

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Simpli Gourmet <onboarding@resend.dev>",
    to: submission.email,
    subject: "We received your quote request — Simpli Gourmet",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #3A0606; max-width: 560px; margin: 0 auto;">
        <h1 style="font-family: Georgia, serif; font-style: italic; color: #5A0A0A;">Simpli Gourmet</h1>
        <p><em>Exceeding Your Expectations</em></p>
        <p>Hello ${submission.name},</p>
        <p>Thank you for reaching out. We&apos;ve received your quote request and will be in touch shortly.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr><td style="padding: 8px 0; color: #8a8a8a;">Package</td><td style="padding: 8px 0; text-align: right;">${packageLabel}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8a8a;">Event type</td><td style="padding: 8px 0; text-align: right;">${submission.event_type || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8a8a;">Date</td><td style="padding: 8px 0; text-align: right;">${submission.event_date || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8a8a;">Guests</td><td style="padding: 8px 0; text-align: right;">${submission.guests || "—"}</td></tr>
        </table>
        <p>In the meantime, reach us anytime at <a href="tel:+13133163882">${SITE.phone}</a> or <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
        <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          Simpli Gourmet · Detroit, MI
        </p>
      </div>
    `,
  });

  return error ?? null;
}
