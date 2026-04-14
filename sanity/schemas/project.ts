import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projet",
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
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Résidentiel", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Hôtellerie", value: "hospitality" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description courte",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Contenu détaillé",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            },
            {
              name: "caption",
              title: "Légende",
              type: "string",
            },
          ],
        },
      ],
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
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
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
      name: "location",
      title: "Lieu",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Année de réalisation",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "area",
      title: "Surface",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Couleur d'accent (hex)",
      type: "string",
      description: "Code couleur hexadécimal, ex: #3d3a33",
      validation: (rule) =>
        rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "completionDate",
      title: "Date de livraison",
      type: "date",
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
          description: "Laissez vide pour utiliser le titre du projet",
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
          description: "Laissez vide pour utiliser l'image de couverture",
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Date de réalisation (récent)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
