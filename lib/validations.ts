import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Adresse email invalide"),
  type: z.enum(["residential", "commercial", "hospitality", "other"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de projet" }),
  }),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
