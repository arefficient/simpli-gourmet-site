import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export default function AboutPage() {
  return (
    <main className="bg-burgundy-dark pt-20 text-cream">
      {/* Hero */}
      <section className="py-28 text-center bg-burgundy/40 border-b border-gold/25">
        <div className="container-lux">
          <p className="eyebrow">About the Chef</p>
          <h1 className="h-serif mt-4 text-5xl md:text-7xl text-cream">
            Meet {SITE.chef}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Simpli Gourmet began with a simple belief: food brings people together, and every plate should honor the occasion with warmth and elegance.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-24">
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            
            
          </div>

          <div className="space-y-6">
            <p className="eyebrow">Detroit Heritage &amp; Passion</p>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-gold/40 bg-burgundy shadow-2xl">
              <Image
                src="/images/Chef_Simpli.png"
                alt="Chef Simpli, founder of Simpli Gourmet"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <h2 className="h-serif text-4xl md:text-5xl text-cream leading-tight">
              The Table Everyone Remembers Long After the Plates Are Cleared
            </h2>
            <div className="space-y-5 leading-relaxed text-cream/80 font-light">
              <p>
                Founded and led by executive chef <strong className="font-bold text-gold">{SITE.founder}</strong>, Simpli Gourmet has earned its reputation across Detroit for exceptional hospitality, generous portions, and uncompromising culinary standards.
              </p>
              <p>
                From the Repass — a comforting table for family and friends gathering in remembrance — to the vibrant theatrical energy of live hibachi cooking and refined corporate gatherings, {SITE.chef} brings a five-star touch to every event.
              </p>
              <p>
                &ldquo;Exceptional customer service and meticulous attention to detail are at the heart of everything we do,&rdquo; {SITE.chef} notes. &ldquo;We aren&apos;t just catering an event; we are taking care of your family, your colleagues, and your guests.&rdquo;
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-gold">Explore the Menu</Link>
              <Link href="/contact" className="btn-ghost">Request a Quote</Link>
            </div>
          </div>
        </div>

        {/* Stats / Highlights */}
        <div className="container-lux mt-32 border-t border-gold/20 pt-20">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {[
              { stat: "ServSafe", label: "Certified & Fully Insured" },
              { stat: "Live", label: "Teppanyaki & Hibachi Tables" },
              { stat: "5-Star", label: "Detroit Luxury Catering" },
            ].map((item) => (
              <div key={item.label} className="border border-gold/30 bg-burgundy-dark/60 p-8">
                <p className="h-serif text-4xl italic text-gold">{item.stat}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-cream/70">
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
