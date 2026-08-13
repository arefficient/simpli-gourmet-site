import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";
import Link from "next/link";

export const metadata = {
  title: "My Account | Simpli Gourmet",
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function packageLabel(pkg: string | null) {
  switch (pkg) {
    case "repass":
      return "Repass — $499";
    case "hibachi":
      return "Hibachi Experience — $599";
    case "corporate":
      return "Corporate";
    default:
      return "Custom";
  }
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { updated?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const isAdmin = profile?.role === "admin";

  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-16">
        <div className="container-lux">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow">My Account</p>
              <h1 className="h-serif mt-3 text-5xl text-cream">
                {user.user_metadata?.full_name || "Welcome back"}
              </h1>
              <p className="mt-2 text-sm text-cream/60">{user.email}</p>
            </div>
            <div className="flex gap-4">
              {isAdmin && (
                <Link href="/admin" className="btn-ghost text-xs">
                  Admin Dashboard
                </Link>
              )}
              <Link href="/account/update-password" className="btn-ghost text-xs">
                Change Password
              </Link>
              <form action={logout}>
                <button type="submit" className="btn-gold text-xs">
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {searchParams.updated && (
            <p className="mt-8 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-light">
              Password updated.
            </p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux">
          <h2 className="text-xs font-bold uppercase tracking-luxury text-gold">
            Your Quote Requests
          </h2>

          {!quotes || quotes.length === 0 ? (
            <div className="mt-6 border border-gold/40 bg-burgundy-dark/60 p-10 text-center">
              <p className="text-cream/70">
                No quote requests yet. When you request a quote while signed in,
                it will show up here.
              </p>
              <Link href="/contact" className="btn-gold mt-6 inline-block text-xs">
                Request a Quote
              </Link>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gold/30 text-xs font-bold uppercase tracking-widest text-gold">
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3 pr-4">Package</th>
                    <th className="py-3 pr-4">Event</th>
                    <th className="py-3 pr-4">Guests</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id} className="border-b border-gold/10 text-cream/80">
                      <td className="py-4 pr-4">{formatDate(q.created_at)}</td>
                      <td className="py-4 pr-4">{packageLabel(q.package)}</td>
                      <td className="py-4 pr-4">{q.event_type || "—"}</td>
                      <td className="py-4 pr-4">{q.guests || "—"}</td>
                      <td className="py-4 capitalize">{q.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
