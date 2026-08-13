import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendQuoteConfirmation, sendOwnerQuoteNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = body.phone ? String(body.phone).trim() : null;
  const eventType = body.eventType ? String(body.eventType).trim() : null;
  const eventDate = body.eventDate ? String(body.eventDate).trim() : null;
  const guests = body.guests ? Number(body.guests) : null;
  const packageId = ["repass", "hibachi", "corporate", "custom"].includes(
    body.package
  )
    ? body.package
    : "custom";
  const message = body.message ? String(body.message).trim() : null;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  let userId: string | null = null;
  try {
    const server = createClient();
    const {
      data: { user },
    } = await server.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    // No session available — guest submission.
  }

  const { error } = await supabase.from("quote_requests").insert({
    user_id: userId,
    name,
    email,
    phone,
    event_type: eventType,
    event_date: eventDate,
    guests,
    package: packageId,
    message,
    status: "pending",
  });

  if (error) {
    console.error("quote insert error:", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  const emailError = await sendQuoteConfirmation({
    name,
    email,
    phone,
    event_type: eventType,
    event_date: eventDate,
    guests,
    package: packageId,
    message,
  });

  if (emailError) {
    console.error("quote email error:", emailError);
  }

  return NextResponse.json({ ok: true });
}

const ownerEmailError = await sendOwnerQuoteNotification({
    name,
    email,
    phone,
    event_type: eventType,
    event_date: eventDate,
    guests,
    package: packageId,
    message,
  });

  if (ownerEmailError) {
    console.error("owner notification email error:", ownerEmailError);
  }
