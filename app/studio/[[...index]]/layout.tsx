export const metadata = {
  title: "Lumina & Quartz — Studio",
  description: "Interface d'administration du contenu",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
