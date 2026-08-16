import Link from "next/link";
import { PACKAGES } from "@/lib/data";

const SAMPLE_MENU_CATEGORIES = [
  {
    name: "Breakfast & Brunch",
    items: [
      "Assorted Danishes",
      "Breakfast Breads & Bagels",
      "Croissant Sandwiches",
      "Sweet Loaf & Berries",
      "Heavenly Deviled Eggs",
    ],
  },
  {
    name: "Platters & Starters",
    items: [
      "Fresh Fruit Platter",
      "Gourmet Mediterranean Platter",
      "Gourmet Veggie Platter",
    ],
  },
  {
    name: "Signature Sides",
    items: [
      "Simpli's Mac",
      "Southern Collard Greens",
      "Candied Yams",
      "Cornbread Dressing",
      "Garlic Herb Redskin Potatoes",
    ],
  },
  {
    name: "Heartier Fare",
    items: [
      "Shrimp & Grits",
      "Chicken Alfredo",
      "Turkey Lasagna",
      "Meatballs (House, Swedish, BBQ, or Brown Gravy)",
    ],
  },
  {
    name: "Fish Fry",
    note: "Menu subject to final confirmation",
    items: [
      "Fried Catfish",
      "Fried Perch",
      "Fish Sandwiches",
      "Hush Puppies",
      "Coleslaw",
    ],
  },
  {
    name: "Hibachi Favorites",
    items: [
      "Hibachi Chicken",
      "Fried Rice",
      "Grilled Vegetables",
      "Yum Yum Sauce",
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="bg-burgundy-dark pt-20 text-cream">
      {/* Hero */}
      <section className="py-28 text-center bg-burgundy/40 border-b border-gold/25">
        <div className="container-lux">
          <p className="eyebrow">Menu &amp; Packages</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-7xl">
            The Offerings
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Transparent pricing, generous portions, and menus built around your
            occasion. Every package can be tailored — just ask.
          </p>
          
          {/* Understated trust strip */}
          <p className="mt-8 text-sm text-cream/60 font-light tracking-wide">
            Licensed, insured, and ServSafe certified — ready whenever you are.
          </p>
        </div>
      </section>

      {/* Main Packages */}
      <section className="py-24">
        <div className="container-lux grid gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => {
            // One consistent card style for every package — featured gets a
            // brighter gold border instead of a different color entirely
            const cardBg = pkg.featured
              ? "bg-burgundy-dark border-gold shadow-2xl"
              : "bg-burgundy-dark border-gold/35 shadow-2xl";

            return (
              <article
                key={pkg.id}
                className={`flex flex-col border p-10 ${cardBg}`}
              >
                {pkg.featured && (
                  <p className="mb-4 w-max px-3 py-1 text-xs font-bold uppercase tracking-widest bg-gold text-burgundy-dark">
                    Most Popular
                  </p>
                )}
                <h2 className="h-serif text-4xl text-cream">{pkg.name}</h2>
                <p className="mt-3 font-serif text-4xl italic text-gold">{pkg.price}</p>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-cream/60">
                  {pkg.feeds}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-cream/70">{pkg.blurb}</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-cream/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className="mt-10 btn-gold text-center"
                >
                  Request This Package
                </Link>
              </article>
            );
          })}
        </div>

        {/* Curated Sample Menu Section */}
        <div className="container-lux mt-32">
          <div className="text-center mb-16">
            <p className="eyebrow">Curated Selection</p>
            <h2 className="h-serif mt-4 text-4xl md:text-5xl text-cream">Sample Menu Categories</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-cream/70">
              A glimpse into our most requested culinary creations. Custom menus and additional items available upon request.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_MENU_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="border border-gold/30 bg-burgundy-dark/60 p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="h-serif text-2xl text-cream">{cat.name}</h3>
                  </div>
                  {cat.note && (
                    <p className="mt-1 text-xs text-gold/80 italic">{cat.note}</p>
                  )}
                  <ul className="mt-6 space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-cream/80">
                        <span className="h-1 w-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                    <li className="text-xs italic text-cream/50 pt-1">...and more</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-gold/20">
                  <Link
                    href={`/contact?package=custom`}
                    className="text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-light"
                  >
                    Inquire About This →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-lux mt-20 border-t border-gold/20 pt-16 text-center">
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
