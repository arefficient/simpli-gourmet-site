import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export default function AboutPage() {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-20 text-center">
        <div className="container-lux">
          <p className="eyebrow">About</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-6xl">
            Meet Chef {SITE.chef}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Simpli Gourmet began with a simple belief: food brings people
            together, and it should be done beautifully.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden border border-gold/40 bg-burgundy">
            <Image
              src="/images/card.jpg"
              alt="Simpli Gourmet business card"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="eyebrow">The Story</p>
            <h2 className="h-serif mt-4 text-4xl text-cream">
              Cooking That&apos;s Always Been Good Enough to Gather Around
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-cream/70">
              <p>
                From the Repass — a table of comfort and remembrance for family
                and friends — to the drama of a live hibachi grill and the
                polish of corporate catering, Chef Simpli cooks with an
                attention to detail that clients return for time and again.
              </p>
              <p>
                &ldquo;Exceptional customer service,&rdquo; is how one catering
                coordinator puts it. We&apos;re not just feeding people — we&apos;re
                taking care of them, and their guests.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-gold">Explore the Menu</Link>
              <Link href="/contact" className="btn-ghost">Request a Quote</Link>
            </div>
          </div>
        </div>

        <div className="container-lux mt-20 border-t border-gold/20 pt-16">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {[
              { stat: "40+", label: "Guests served per repass" },
              { stat: "Live", label: "Teppanyaki-style cooking" },
              { stat: "5-Star", label: "Attention to every plate" },
            ].map((item) => (
              <div key={item.label}>
                <p className="h-serif text-5xl italic text-gold">{item.stat}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-cream/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
