"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function login(formData: FormData) {
  const supabase = createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    "/signup?check=1&message=Check your email to confirm your account."
  );
}

export async function resetPasswordRequest(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get("email") ?? "");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/account/update-password`,
  });

  if (error) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/forgot-password?check=1");
}

export async function updatePassword(formData: FormData) {
  const supabase = createClient();
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect(
      `/account/update-password?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/account?updated=1");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
