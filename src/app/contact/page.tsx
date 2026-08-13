import QuoteForm from "@/components/QuoteForm";
import { SITE } from "@/lib/data";

export const metadata = {
  title: "Contact | Simpli Gourmet",
  description: "Request a quote for your event with Chef Simpli's luxury catering.",
};

export default function ContactPage() {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-20 text-center">
        <div className="container-lux">
          <p className="eyebrow">Contact</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-6xl">
            Request a Quote
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Tell us about your occasion and we&apos;ll respond with a menu and a
            quote — usually within a day.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid gap-10 lg:grid-cols-[1fr_360px]">
          <QuoteForm />

          <aside className="space-y-8">
            <div className="border border-gold/40 bg-burgundy-dark/60 p-8">
              <h2 className="text-xs font-bold uppercase tracking-luxury text-gold">
                Prefer to talk?
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-cream/80">
                <li>
                  <a href={SITE.phoneHref} className="hover:text-gold">
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                    {SITE.email}
                  </a>
                </li>
                <li>{SITE.location}</li>
              </ul>
            </div>

            <div className="border border-gold/40 bg-burgundy-dark/60 p-8">
              <h2 className="text-xs font-bold uppercase tracking-luxury text-gold">
                Create an account
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">
                Track your past quote requests and bookings in your dashboard.
              </p>
              <a href="/signup" className="btn-ghost mt-6 block text-center text-xs">
                Sign Up Free
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
