import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { projectSlugsQuery, blogPostSlugsQuery } from "@/lib/sanity/queries";
import { demoProjects, demoBlogPosts } from "@/lib/sanity/demo-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminaquartz.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs =
    (await sanityFetch<string[]>(projectSlugsQuery)) ||
    demoProjects.map((p) => p.slug.current);

  const blogSlugs =
    (await sanityFetch<string[]>(blogPostSlugsQuery)) ||
    demoBlogPosts.map((p) => p.slug.current);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
