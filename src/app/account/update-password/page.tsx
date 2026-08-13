import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePassword } from "@/app/auth/actions";
import Link from "next/link";

const inputClasses =
  "w-full border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/forgot-password");

  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="flex min-h-screen items-center justify-center py-24">
        <div className="w-full max-w-md border border-gold/40 bg-burgundy-dark/60 p-10">
          <p className="eyebrow">Security</p>
          <h1 className="h-serif mt-3 text-4xl text-cream">Set a New Password</h1>

          {searchParams.error && (
            <p className="mt-4 border border-red-400/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
              {searchParams.error}
            </p>
          )}

          <form action={updatePassword} className="mt-8 space-y-5">
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                New Password
              </label>
              <input id="password" name="password" type="password" required minLength={8} className={inputClasses} />
            </div>
            <button type="submit" className="btn-gold w-full">
              Update Password
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream/60">
            <Link href="/account" className="text-gold hover:text-gold-light">
              Back to account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
