import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Lumina & Quartz pour votre projet d'architecture d'intérieur. Résidentiel, commercial, hôtellerie.",
  openGraph: {
    title: "Contact | Lumina & Quartz",
    description:
      "Parlons de votre projet d'architecture d'intérieur.",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-32">
      <ContactForm />
    </div>
  );
}
