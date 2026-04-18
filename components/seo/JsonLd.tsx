interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    name: "Lumina & Quartz",
    description:
      "Atelier d'architecture d'intérieur à Paris. Béton, lumière, matière.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "18 Rue de la Roquette",
      addressLocality: "Paris",
      postalCode: "75011",
      addressCountry: "FR",
    },
    telephone: "+33142567890",
    email: "atelier@luminaquartz.fr",
    sameAs: [],
  };
}

export function projectJsonLd(project: {
  title: string;
  description: string;
  year: string;
  location: string;
  imageUrl: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.year,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    image: project.imageUrl,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}`,
    creator: {
      "@type": "Organization",
      name: "Lumina & Quartz",
    },
  };
}

export function blogPostJsonLd(post: {
  title: string;
  excerpt: string;
  publishedAt: string;
  imageUrl: string;
  slug: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.imageUrl,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Lumina & Quartz",
    },
  };
}
