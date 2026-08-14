import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import BlogSubscribeForm from "@/components/BlogSubscribeForm";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-burgundy-dark pt-20 text-cream">
      {/* Hero */}
      <section className="relative py-28 text-center bg-burgundy/40 border-b border-gold/20">
        <div className="container-lux relative">
          <p className="eyebrow">From Our Kitchen</p>
          <h1 className="h-serif mt-4 text-5xl md:text-7xl text-cream">
            Recipes &amp; Journal
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-cream/70">
            Weekly recipes, culinary tips, and stories from Chef Tanaia Jones celebrating the heart of Detroit catering and comfort.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="container-lux">
          {posts.length === 0 ? (
            <p className="text-center text-cream/60 py-12">No recipes published yet. Check back soon!</p>
          ) : (
            <div className="grid gap-10 md:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col border border-gold/30 bg-burgundy-dark/60 overflow-hidden group transition-all duration-300 hover:border-gold/70"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">{post.date}</p>
                    <h2 className="h-serif mt-3 text-2xl text-cream group-hover:text-gold transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-8">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold uppercase tracking-widest text-gold underline decoration-gold/50 underline-offset-4 group-hover:decoration-gold"
                      >
                        Read Recipe →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-burgundy py-24 border-t border-gold/20">
        <div className="container-lux max-w-2xl text-center">
          <p className="eyebrow">Stay Connected</p>
          <h2 className="h-serif mt-4 text-3xl md:text-4xl text-cream">Get Weekly Recipes in Your Inbox</h2>
          <p className="mt-4 text-sm text-cream/70 leading-relaxed">
            Join our mailing list to receive new recipes, kitchen tips, and seasonal catering announcements directly.
          </p>
          <BlogSubscribeForm />
        </div>
      </section>
    </main>
  );
}
