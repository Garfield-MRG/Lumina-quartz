import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch, client } from "@/lib/sanity/client";
import { blogPostBySlugQuery, blogPostSlugsQuery } from "@/lib/sanity/queries";
import { demoBlogPosts } from "@/lib/sanity/demo-data";
import JsonLd, { blogPostJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!client) {
    return demoBlogPosts.map((p) => ({ slug: p.slug.current }));
  }
  const slugs: string[] = await client.fetch(blogPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post =
    (await sanityFetch<Record<string, unknown>>(blogPostBySlugQuery, {
      slug,
    })) || demoBlogPosts.find((p) => p.slug.current === slug);

  if (!post) return { title: "Article introuvable" };

  const title =
    (post.seo as Record<string, string> | null)?.metaTitle ||
    (post.title as string);
  const description =
    (post.seo as Record<string, string> | null)?.metaDescription ||
    (post.excerpt as string);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Lumina & Quartz`,
      description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const sanityPost = await sanityFetch<Record<string, unknown>>(
    blogPostBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  const demoPost = demoBlogPosts.find((p) => p.slug.current === slug);
  const post = sanityPost || demoPost;

  if (!post) notFound();

  const isDemo = !sanityPost;
  const coverUrl = isDemo
    ? (post as typeof demoPost)!._demoImage
    : "";

  const title = post.title as string;
  const excerpt = post.excerpt as string;
  const publishedAt = post.publishedAt as string;
  const author = post.author as { name: string } | undefined;
  const tags = (post.tags as string[]) || [];
  const slugCurrent = (post.slug as { current: string }).current;

  return (
    <>
      <JsonLd
        data={blogPostJsonLd({
          title,
          excerpt,
          publishedAt,
          imageUrl: coverUrl || "",
          slug: slugCurrent,
          authorName: author?.name || "Lumina & Quartz",
        })}
      />

      <article className="pt-32 pb-24">
        <header className="px-6 md:px-12 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <time className="font-mono text-caption uppercase text-quartz tracking-widest">
                {new Date(publishedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {author && (
                <span className="font-mono text-caption text-concrete-500">
                  par {author.name}
                </span>
              )}
            </div>
            <h1 className="font-serif text-heading text-concrete-100 mb-6">
              {title}
            </h1>
            <p className="font-body text-xl text-concrete-400 font-light">
              {excerpt}
            </p>
          </div>
        </header>

        {coverUrl && (
          <div className="relative aspect-[21/9] mb-16">
            <Image
              src={coverUrl}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {tags.length > 0 && (
          <div className="px-6 md:px-12 mb-16">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-concrete-700 font-mono text-caption uppercase text-concrete-400 tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 font-mono text-caption uppercase text-concrete-400 hover:text-quartz transition-colors tracking-widest"
              data-cursor-hover
            >
              <span className="w-8 h-px bg-current" />
              Tous les articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
