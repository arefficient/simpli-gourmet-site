import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main className="bg-burgundy-dark pt-20">
      <section className="py-20 text-center">
        <div className="container-lux">
          <p className="eyebrow">The Gallery</p>
          <h1 className="h-serif mt-4 text-5xl text-cream md:text-6xl">
            A Taste of Our Work
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Real events, real plates — captured straight from the kitchen and
            the table.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={img} className="group relative aspect-square overflow-hidden bg-burgundy">
              <Image
                src={`/images/${img}`}
                alt={`Simpli Gourmet dish ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
