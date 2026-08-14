import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("blog_subscribers").insert({
      email,
    });

    if (error) {
      // Check for duplicate constraint violation
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, message: "You are already subscribed." });
      }
      console.error("blog subscriber error:", error);
      return NextResponse.json(
        { error: "Could not complete subscription. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("blog subscribe route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
