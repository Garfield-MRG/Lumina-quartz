import Hero from "@/components/sections/Hero";
import ProjectGrid from "@/components/sections/ProjectGrid";
import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import { sanityFetch } from "@/lib/sanity/client";
import { allProjectsQuery } from "@/lib/sanity/queries";
import { demoProjects } from "@/lib/sanity/demo-data";

export default async function HomePage() {
  const projects =
    (await sanityFetch<typeof demoProjects>(allProjectsQuery, {}, { next: { revalidate: 60 } })) ||
    demoProjects;

  return (
    <>
      <Hero />
      <ProjectGrid projects={projects} />
      <About />
      <ContactForm />
    </>
  );
}
