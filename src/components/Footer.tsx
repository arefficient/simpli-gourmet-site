import Link from "next/link";
import { SITE } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-burgundy-dark">
      <div className="container-lux grid gap-10 py-16 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Detroit&apos;s premier luxury catering. {SITE.tagline}.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-luxury text-gold">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
             <li><Link href="/menu" className="hover:text-gold">Menu &amp; Packages</Link></li>
             <li><Link href="/blog" className="hover:text-gold">Journal &amp; Recipes</Link></li>
             <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/reviews" className="hover:text-gold">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Request a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-luxury text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li>
              <a href={SITE.phoneHref} className="hover:text-gold">{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a>
            </li>
            <li>{SITE.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 py-6">
        <p className="container-lux text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {SITE.name} — {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
