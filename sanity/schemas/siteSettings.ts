import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nom du site",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Slogan",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description du site",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "Image OpenGraph par défaut",
      type: "image",
      description: "Image utilisée lors du partage sur les réseaux sociaux",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      fields: [
        { name: "street", title: "Rue", type: "string" },
        { name: "city", title: "Ville", type: "string" },
        { name: "postalCode", title: "Code postal", type: "string" },
        { name: "country", title: "Pays", type: "string" },
      ],
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Réseaux sociaux",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "pinterest", title: "Pinterest", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
      ],
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
