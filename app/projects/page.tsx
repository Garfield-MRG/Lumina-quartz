import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { allProjectsQuery } from "@/lib/sanity/queries";
import { demoProjects } from "@/lib/sanity/demo-data";
import ProjectGrid from "@/components/sections/ProjectGrid";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez nos réalisations en architecture d'intérieur : résidentiel, commercial et hôtellerie à Paris et en France.",
  openGraph: {
    title: "Projets | Lumina & Quartz",
    description:
      "Découvrez nos réalisations en architecture d'intérieur.",
  },
};

export default async function ProjectsPage() {
  const projects =
    (await sanityFetch<typeof demoProjects>(allProjectsQuery, {}, { next: { revalidate: 60 } })) ||
    demoProjects;

  return (
    <div className="pt-32">
      <ProjectGrid projects={projects} />
    </div>
  );
}
