import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Admin | Simpli Gourmet",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function packageLabel(pkg: string | null) {
  switch (pkg) {
    case "repass":
      return "Repass";
    case "hibachi":
      return "Hibachi";
    case "corporate":
      return "Corporate";
    default:
      return "Custom";
  }
}

export default async function AdminPage() {
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

  if (profile?.role !== "admin") redirect("/account");

  const now = new Date();
  const since = new Date(now);
  since.setDate(now.getDate() - 14);

  const [{ data: views }, { data: topPages }, { data: quotes }, total] =
    await Promise.all([
      supabase
        .from("page_views")
        .select("path, viewed_at")
        .gte("viewed_at", since.toISOString())
        .order("viewed_at", { ascending: false }),
      supabase
        .from("page_views")
        .select("path")
        .gte("viewed_at", since.toISOString()),
      supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("page_views")
        .select("id", { count: "exact", head: true }),
    ]);

  const pageCounts = new Map<string, number>();
  topPages?.forEach((v) => {
    pageCounts.set(v.path, (pageCounts.get(v.path) ?? 0) + 1);
  });
  const sortedPages = Array.from(pageCounts.entries()).sort((a, b) => b[1] - a[1]);

  const byDay = new Map<string, number>();
  views?.forEach((v) => {
    const day = new Date(v.viewed_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  });
  const days = Array.from(byDay.entries());
  const maxDay = Math.max(1, ...days.map(([, c]) => c));

  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-16">
        <div className="container-lux">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow">Admin</p>
              <h1 className="h-serif mt-3 text-5xl text-cream">Dashboard</h1>
            </div>
            <Link href="/account" className="btn-ghost text-xs">
              Back to Account
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-gold/40 bg-burgundy-dark/60 p-8">
              <p className="text-xs font-bold uppercase tracking-luxury text-gold">
                Total Views
              </p>
              <p className="h-serif mt-3 text-5xl text-cream">{total?.count ?? 0}</p>            </div>
            <div className="border border-gold/40 bg-burgundy-dark/60 p-8">
              <p className="text-xs font-bold uppercase tracking-luxury text-gold">
                Views (14 days)
              </p>
              <p className="h-serif mt-3 text-5xl text-cream">{views?.length ?? 0}</p>
            </div>
            <div className="border border-gold/40 bg-burgundy-dark/60 p-8">
              <p className="text-xs font-bold uppercase tracking-luxury text-gold">
                Quote Leads
              </p>
              <p className="h-serif mt-3 text-5xl text-cream">{quotes?.length ?? 0}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-luxury text-gold">
              Page Views — Last 14 Days
            </h2>
            <div className="mt-6 border border-gold/40 bg-burgundy-dark/60 p-6">
              {days.length === 0 ? (
                <p className="text-sm text-cream/50">No views recorded yet.</p>
              ) : (
                <div className="flex h-48 items-end gap-2">
                  {days.map(([day, count]) => (
                    <div key={day} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-xs text-cream/60">{count}</span>
                      <div
                        className="w-full bg-gold"
                        style={{ height: `${Math.round((count / maxDay) * 120)}px` }}
                      />
                      <span className="text-[0.6rem] text-cream/40">{day}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <h2 className="mt-10 text-xs font-bold uppercase tracking-luxury text-gold">
              Top Pages
            </h2>
            <div className="mt-6 border border-gold/40 bg-burgundy-dark/60 p-6">
              {sortedPages.length === 0 ? (
                <p className="text-sm text-cream/50">No data yet.</p>
              ) : (
                <ul className="space-y-3">
                  {sortedPages.slice(0, 8).map(([path, count]) => (
                    <li key={path} className="flex items-center justify-between text-sm">
                      <span className="font-mono text-cream/80">{path}</span>
                      <span className="text-gold">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-luxury text-gold">
              Quote Requests &amp; Leads
            </h2>
            <div className="mt-6 overflow-x-auto">
              {!quotes || quotes.length === 0 ? (
                <div className="border border-gold/40 bg-burgundy-dark/60 p-8 text-sm text-cream/50">
                  No quote requests yet.
                </div>
              ) : (
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-gold/30 text-xs font-bold uppercase tracking-widest text-gold">
                      <th className="py-3 pr-4">Received</th>
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Package</th>
                      <th className="py-3 pr-4">Guests</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q) => (
                      <tr key={q.id} className="border-b border-gold/10 align-top text-cream/80">
                        <td className="py-4 pr-4">{formatDate(q.created_at)}</td>
                        <td className="py-4 pr-4">
                          <p>{q.name}</p>
                          <p className="text-xs text-cream/50">{q.email}</p>
                          {q.phone && <p className="text-xs text-cream/50">{q.phone}</p>}
                        </td>
                        <td className="py-4 pr-4">{packageLabel(q.package)}</td>
                        <td className="py-4 pr-4">{q.guests || "—"}</td>
                        <td className="py-4 capitalize">{q.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
