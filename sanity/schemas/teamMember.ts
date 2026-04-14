import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "role",
      title: "Poste",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texte alternatif",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
