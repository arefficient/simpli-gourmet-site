import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  // Simple markdown renderer for our recipe posts
  const renderContent = (markdown: string) => {
    const lines = markdown.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (key: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key} className="my-6 space-y-2 list-disc pl-6 text-cream/90">
            {currentList.map((item, idx) => {
              // Parse bolding inside list item
              const formattedItem = item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formattedItem }} />
              );
            })}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        flushList(`list-${index}`);
        elements.push(
          <h3 key={index} className="h-serif text-3xl text-gold mt-10 mb-4">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        currentList.push(trimmed.replace("- ", ""));
      } else if (trimmed === "") {
        flushList(`list-${index}`);
      } else {
        flushList(`list-${index}`);
        const formattedText = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        elements.push(
          <p key={index} className="my-4 leading-relaxed text-cream/80" dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
      }
    });
    flushList("final-list");
    return elements;
  };

  return (
    <main className="bg-burgundy-dark pt-20 text-cream">
      <article className="py-24">
        <div className="container-lux max-w-3xl">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-widest text-gold hover:underline"
            >
              ← Back to Journal
            </Link>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">{post.date}</p>
          <h1 className="h-serif mt-3 text-4xl md:text-6xl text-cream leading-tight">
            {post.title}
          </h1>

          <div className="relative aspect-[16/9] w-full my-10 overflow-hidden border border-gold/30">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none text-lg">
            {renderContent(post.content)}
          </div>

          <div className="mt-16 border-t border-gold/20 pt-10 flex justify-between items-center">
            <Link href="/blog" className="btn-ghost text-xs">
              View All Recipes
            </Link>
            <Link href="/contact" className="btn-gold text-xs">
              Book Chef Simpli
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
