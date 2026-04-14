import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { allBlogPostsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { demoBlogPosts } from "@/lib/sanity/demo-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Inspirations, tendances et coulisses de nos projets d'architecture d'intérieur.",
  openGraph: {
    title: "Blog | Lumina & Quartz",
    description: "Inspirations, tendances et coulisses de nos projets.",
  },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: { asset: { _ref: string }; alt?: string } | null;
  _demoImage?: string;
  publishedAt: string;
  tags?: string[];
  author?: { name: string };
}

export default async function BlogPage() {
  const sanityPosts = await sanityFetch<BlogPost[]>(
    allBlogPostsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  const posts: BlogPost[] = sanityPosts || (demoBlogPosts as BlogPost[]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-16 md:mb-24">
          <span className="font-mono text-caption uppercase text-quartz tracking-widest block mb-4">
            Journal
          </span>
          <h1 className="font-serif text-heading text-concrete-100">
            Inspirations &amp;
            <br />
            <span className="text-stroke">réflexions</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => {
            const imageUrl = post.coverImage
              ? urlFor(post.coverImage).width(800).height(500).format("webp").url()
              : (post as BlogPost & { _demoImage?: string })._demoImage || "";

            return (
              <article key={post._id} className="group">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="block relative overflow-hidden aspect-[16/10] mb-5"
                  data-cursor-hover
                >
                  <Image
                    src={imageUrl}
                    alt={post.coverImage?.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
                <div className="flex items-center gap-4 mb-3">
                  <time className="font-mono text-caption text-concrete-500">
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.author && (
                    <span className="font-mono text-caption text-concrete-600">
                      {post.author.name}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-xl text-concrete-100 group-hover:text-quartz transition-colors duration-300 mb-2">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h2>
                <p className="font-body text-sm text-concrete-400 font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
