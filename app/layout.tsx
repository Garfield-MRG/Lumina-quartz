import type { Metadata } from "next";
import { Playfair_Display, Outfit, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import JsonLd, { organizationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminaquartz.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lumina & Quartz — Architecture d'Intérieur Paris",
    template: "%s | Lumina & Quartz",
  },
  description:
    "Atelier d'architecture d'intérieur à Paris. Béton, lumière, matière — orchestrés avec précision pour créer des intérieurs qui résonnent.",
  keywords: [
    "architecture d'intérieur",
    "architecte Paris",
    "design intérieur",
    "décoration luxe",
    "rénovation haut de gamme",
    "béton ciré",
    "Lumina Quartz",
  ],
  authors: [{ name: "Lumina & Quartz" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Lumina & Quartz",
    title: "Lumina & Quartz — Architecture d'Intérieur Paris",
    description:
      "Atelier d'architecture d'intérieur à Paris. Béton, lumière, matière — orchestrés avec précision.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumina & Quartz — Architecture d'Intérieur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina & Quartz — Architecture d'Intérieur Paris",
    description:
      "Atelier d'architecture d'intérieur à Paris. Béton, lumière, matière.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body>
        <JsonLd data={organizationJsonLd()} />
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
