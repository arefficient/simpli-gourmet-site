import Link from "next/link";
import { PACKAGES, TESTIMONIALS, GALLERY_IMAGES, SITE } from "@/lib/data";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-burgundy-dark pt-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(212,168,48,0.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(90,10,10,0.8), transparent 50%)",
          }}
        />
        <div className="container-lux relative py-24">
          <p className="eyebrow">Luxury Catering · Detroit, Michigan</p>
          <h1 className="h-serif mx-auto mt-6 max-w-4xl text-5xl leading-tight text-cream md:text-7xl">
            Exceeding Your Expectations
          </h1>
          <div className="mt-8 flex justify-center">
            <span className="gold-line" />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-cream/70">
            From intimate repasses to live hibachi tables and refined corporate
            gatherings — Chef {SITE.chef} brings a five-star table to your event.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-gold">View Packages</Link>
            <Link href="/contact" className="btn-ghost">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 text-burgundy-dark">
        <div className="container-lux text-center">
          <p className="eyebrow">The Experience</p>
          <h2 className="h-serif mt-4 text-4xl md:text-5xl">A Table That Honors the Occasion</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-burgundy-dark/70">
            Every menu is prepared with intention — generous portions, familiar
            comfort, and an unmistakable elegance. Whether you&apos;re feeding
            forty at a repass or hosting a team, the food is the heart of it.
          </p>
        </div>
      </section>

      <section className="bg-burgundy py-24">
        <div className="container-lux">
          <div className="text-center">
            <p className="eyebrow">Our Packages</p>
            <h2 className="h-serif mt-4 text-4xl text-cream md:text-5xl">Choose Your Experience</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <Link
                key={pkg.id}
                href="/menu"
                className={`group flex flex-col border p-8 transition-colors ${
                  pkg.featured
                    ? "border-gold bg-burgundy-dark"
                    : "border-gold/30 bg-burgundy-dark/60 hover:border-gold/70"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-luxury text-gold">
                  {pkg.feeds}
                </p>
                <h3 className="h-serif mt-3 text-3xl text-cream">{pkg.name}</h3>
                <p className="mt-1 font-serif text-2xl italic text-gold">{pkg.price}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">
                  {pkg.blurb}
                </p>
                <span className="mt-6 text-xs font-bold uppercase tracking-widest text-gold group-hover:text-gold-light">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-burgundy-dark py-24">
        <div className="container-lux">
          <div className="text-center">
            <p className="eyebrow">From Our Kitchen</p>
            <h2 className="h-serif mt-4 text-4xl text-cream md:text-5xl">A Glimpse of the Craft</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY_IMAGES.slice(0, 8).map((img) => (
              <div key={img} className="group relative aspect-square overflow-hidden">
                <Image
                  src={`/images/${img}`}
                  alt="Simpli Gourmet catering"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-ghost">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 text-burgundy-dark">
        <div className="container-lux">
          <div className="text-center">
            <p className="eyebrow">What Clients Say</p>
            <h2 className="h-serif mt-4 text-4xl md:text-5xl">Kind Words</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between border border-gold/40 p-10">
                <blockquote className="h-serif text-2xl italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-bold uppercase tracking-widest">{t.name}</p>
                  <p className="text-sm text-burgundy-dark/60">{t.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/reviews" className="text-sm font-bold uppercase tracking-widest text-burgundy-dark underline decoration-gold underline-offset-4 hover:text-gold">
              Read more →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-24 text-center">
        <div className="container-lux">
          <p className="eyebrow">Ready When You Are</p>
          <h2 className="h-serif mt-4 text-4xl text-cream md:text-5xl">Let&apos;s Plan Your Event</h2>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Tell us about your occasion and we&apos;ll craft a menu and a quote around it.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">Request a Quote</Link>
            <a href={SITE.phoneHref} className="btn-ghost">{SITE.phone}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
