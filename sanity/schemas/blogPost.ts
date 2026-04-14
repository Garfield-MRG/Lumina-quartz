import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Article de blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Texte alternatif", type: "string" },
            { name: "caption", title: "Légende", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Titre SEO",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Description SEO",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "Image OpenGraph",
          type: "image",
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Date de publication (récent)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
  },
});
