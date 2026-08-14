import QuoteForm from "@/components/QuoteForm";
import { SITE } from "@/lib/data";
import Image from "next/image";

export const metadata = {
  title: "Contact | Simpli Gourmet",
  description: "Request a quote for your event with Chef Simpli's luxury catering.",
};

export default function ContactPage() {
  return (
    <main className="bg-burgundy-dark pt-20 text-cream">
      {/* Contact Hero with contact-hero.jpg */}
      <section className="relative py-28 text-center overflow-hidden border-b border-gold/25">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="Simpli Gourmet catering setup"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-burgundy-dark/70" />
        </div>
        <div className="container-lux relative z-10">
          <p className="eyebrow">Contact &amp; Inquiries</p>
          <h1 className="h-serif mt-4 text-5xl md:text-7xl text-cream">
            Request a Quote
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Tell us about your occasion and {SITE.chef} will respond with a menu and a
            quote — usually within a day.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-24">
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
