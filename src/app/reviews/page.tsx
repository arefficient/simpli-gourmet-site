import Link from "next/link";
import { TESTIMONIALS } from "@/lib/data";

export default function ReviewsPage() {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-20 text-center">
        <div className="container-lux">
          <p className="eyebrow">Reviews</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-6xl">
            Kind Words from the Table
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid gap-10 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between border border-gold/40 bg-burgundy-dark/60 p-10">
              <blockquote className="h-serif text-2xl italic leading-relaxed text-cream">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-bold uppercase tracking-widest text-gold">{t.name}</p>
                <p className="mt-1 text-sm text-cream/60">{t.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="container-lux mt-16 text-center">
          <h2 className="h-serif text-3xl text-cream">Had us at your event?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cream/70">
            We&apos;d love to hear how it went. Send us your experience and we&apos;ll
            feature it here.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-ghost">Share Your Experience</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
