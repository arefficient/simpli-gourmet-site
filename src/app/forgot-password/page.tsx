import { resetPasswordRequest } from "@/app/auth/actions";
import Link from "next/link";

const inputClasses =
  "w-full border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; check?: string };
}) {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="flex min-h-screen items-center justify-center py-24">
        <div className="w-full max-w-md border border-gold/40 bg-burgundy-dark/60 p-10">
          <p className="eyebrow">Account recovery</p>
          <h1 className="h-serif mt-3 text-4xl text-cream">Reset Password</h1>

          {searchParams.check ? (
            <p className="mt-4 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-light">
              If that email exists, we&apos;ve sent a reset link.
            </p>
          ) : (
            <>
              {searchParams.error && (
                <p className="mt-4 border border-red-400/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
                  {searchParams.error}
                </p>
              )}
              <form action={resetPasswordRequest} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClasses} />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Send Reset Link
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-cream/60">
            <Link href="/login" className="text-gold hover:text-gold-light">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
