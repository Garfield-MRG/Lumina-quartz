import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch, client } from "@/lib/sanity/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { demoProjects } from "@/lib/sanity/demo-data";
import JsonLd, { projectJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!client) {
    return demoProjects.map((p) => ({ slug: p.slug.current }));
  }
  const slugs: string[] = await client.fetch(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project =
    (await sanityFetch<Record<string, unknown>>(projectBySlugQuery, { slug })) ||
    demoProjects.find((p) => p.slug.current === slug);

  if (!project) return { title: "Projet introuvable" };

  const title =
    (project.seo as Record<string, string> | null)?.metaTitle ||
    (project.title as string);
  const description =
    (project.seo as Record<string, string> | null)?.metaDescription ||
    (project.description as string);

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const sanityProject = await sanityFetch<Record<string, unknown>>(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  const demoProject = demoProjects.find((p) => p.slug.current === slug);
  const project = sanityProject || demoProject;

  if (!project) notFound();

  const isDemo = !sanityProject;
  const coverUrl = isDemo
    ? (project as typeof demoProject)!._demoImage
    : urlFor(
        (project as Record<string, unknown>).coverImage as import("@sanity/image-url/lib/types/types").SanityImageSource
      )
        .width(1600)
        .height(900)
        .format("webp")
        .url();

  const title = project.title as string;
  const description = project.description as string;
  const year = project.year as string;
  const location = project.location as string;
  const area = project.area as string | undefined;
  const category = project.category as string;
  const slugCurrent = (project.slug as { current: string }).current;
  const gallery = (project.gallery as unknown[]) || [];

  return (
    <>
      <JsonLd
        data={projectJsonLd({
          title,
          description,
          year,
          location,
          imageUrl: coverUrl!,
          slug: slugCurrent,
        })}
      />

      <article>
        <header className="relative h-[70vh] min-h-[500px]">
          <Image
            src={coverUrl!}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16">
            <div className="max-w-[1440px] mx-auto">
              <span className="font-mono text-caption uppercase text-quartz tracking-widest block mb-4">
                {category}, {year}
              </span>
              <h1 className="font-serif text-heading text-concrete-100 mb-4">
                {title}
              </h1>
              <div className="flex gap-8 font-mono text-caption uppercase text-concrete-400 tracking-widest">
                <span>{location}</span>
                {area && <span>{area}</span>}
              </div>
            </div>
          </div>
        </header>

        <section className="py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-xl text-concrete-300 font-light leading-relaxed mb-16">
              {description}
            </p>
          </div>
        </section>

        {!isDemo && gallery.length > 0 && (
          <section className="px-6 md:px-12 pb-24">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((img: unknown, i: number) => {
                const image = img as {
                  asset: { _ref: string };
                  alt?: string;
                  caption?: string;
                };
                const imgUrl = urlFor(image)
                  .width(900)
                  .height(600)
                  .format("webp")
                  .url();
                return (
                  <figure
                    key={i}
                    className="relative aspect-[3/2] overflow-hidden"
                  >
                    <Image
                      src={imgUrl}
                      alt={image.alt || `${title}, photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {image.caption && (
                      <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-obsidian/80 to-transparent">
                        <span className="font-mono text-caption text-concrete-300">
                          {image.caption}
                        </span>
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        <div className="px-6 md:px-12 pb-24">
          <div className="max-w-[1440px] mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 font-mono text-caption uppercase text-concrete-400 hover:text-quartz transition-colors tracking-widest"
              data-cursor-hover
            >
              <span className="w-8 h-px bg-current" />
              Tous les projets
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
