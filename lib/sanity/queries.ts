import { groq } from "next-sanity";

// ─── Projets ────────────────────────────────────
export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    category,
    description,
    coverImage,
    location,
    year,
    area,
    accentColor
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    body,
    coverImage,
    gallery,
    location,
    year,
    area,
    accentColor,
    completionDate,
    seo
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

// ─── Blog ───────────────────────────────────────
export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    tags,
    author-> { name, photo }
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    coverImage,
    publishedAt,
    tags,
    author-> { name, role, photo },
    seo
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`;

// ─── Équipe ─────────────────────────────────────
export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    photo,
    bio,
    email
  }
`;

// ─── Paramètres ─────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    logo,
    ogImage,
    address,
    email,
    phone,
    social
  }
`;
