import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { login } from "@/app/auth/actions";
import Link from "next/link";

const inputClasses =
  "w-full border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; check?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="flex min-h-screen items-center justify-center py-24">
        <div className="w-full max-w-md border border-gold/40 bg-burgundy-dark/60 p-10">
          <p className="eyebrow">Welcome back</p>
          <h1 className="h-serif mt-3 text-4xl text-cream">Sign In</h1>

          {searchParams.check && (
            <p className="mt-4 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-light">
              Account confirmed. You can now sign in.
            </p>
          )}
          {searchParams.error && (
            <p className="mt-4 border border-red-400/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
              {searchParams.error}
            </p>
          )}

          <form action={login} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Email
              </label>
              <input id="email" name="email" type="email" required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Password
              </label>
              <input id="password" name="password" type="password" required className={inputClasses} />
            </div>
            <button type="submit" className="btn-gold w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-cream/60">
            <Link href="/forgot-password" className="hover:text-gold">
              Forgot password?
            </Link>
            <Link href="/signup" className="hover:text-gold">
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
