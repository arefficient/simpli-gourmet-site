import { resend } from "@/lib/email";

/**
 * PHASE 2 — Booking confirmation email.
 *
 * First example of the automation pattern. Additional automations (e.g. order
 * reminders, thank-you follow-ups) should be added as new functions in this
 * folder, following the same shape: a typed payload + a send function that
 * uses the shared `resend` instance from `@/lib/email`.
 *
 * Not yet wired into a booking flow — a call site is added once bookings
 * exist in Phase 2.
 */
export type BookingConfirmationPayload = {
  name: string;
  email: string;
  packageLabel: string;
  eventDate: string;
  guests: number;
  total: string;
};

export async function sendBookingConfirmation(
  payload: BookingConfirmationPayload
) {
  if (!process.env.RESEND_API_KEY) return null;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Simpli Gourmet <onboarding@resend.dev>",
    to: payload.email,
    subject: `Booking confirmed — ${payload.packageLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #3A0606; max-width: 560px; margin: 0 auto;">
        <h1 style="font-family: Georgia, serif; font-style: italic; color: #5A0A0A;">Simpli Gourmet</h1>
        <p>Hello ${payload.name}, your booking is confirmed.</p>
        <p>${payload.packageLabel} · ${payload.eventDate} · ${payload.guests} guests · ${payload.total}</p>
        <p>We'll be in touch with final details.</p>
      </div>
    `,
  });

  return error ?? null;
}
