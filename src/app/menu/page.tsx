import Link from "next/link";
import { PACKAGES } from "@/lib/data";

export default function MenuPage() {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-20 text-center">
        <div className="container-lux">
          <p className="eyebrow">Menu &amp; Packages</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-6xl">
            The Offerings
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Transparent pricing, generous portions, and menus built around your
            occasion. Every package can be tailored — just ask.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col border p-10 ${
                pkg.featured
                  ? "border-gold bg-burgundy-dark shadow-2xl"
                  : "border-gold/30 bg-burgundy-dark/60"
              }`}
            >
              {pkg.featured && (
                <p className="mb-4 w-max bg-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-burgundy-dark">
                  Most Popular
                </p>
              )}
              <h2 className="h-serif text-4xl text-cream">{pkg.name}</h2>
              <p className="mt-3 font-serif text-4xl italic text-gold">{pkg.price}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-widest text-cream/60">
                {pkg.feeds}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-cream/70">{pkg.blurb}</p>
              <ul className="mt-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-cream/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?package=${pkg.id}`}
                className={`mt-10 ${
                  pkg.featured ? "btn-gold" : "btn-ghost"
                } text-center`}
              >
                Request This Package
              </Link>
            </article>
          ))}
        </div>

        <div className="container-lux mt-16 border-t border-gold/20 pt-12 text-center">
          <h2 className="h-serif text-3xl text-cream">Looking for something else?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream/70">
            Special diets, larger parties, custom menus — Chef Simpli will
            accommodate your request. Reach out and we&apos;ll build it together.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-ghost">
              Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
