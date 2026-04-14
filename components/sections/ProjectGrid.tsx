"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  coverImage: { asset: { _ref: string }; alt?: string } | null;
  _demoImage?: string;
  location: string;
  year: string;
  area?: string;
  accentColor?: string;
}

const categories = [
  { key: "all", label: "Tous" },
  { key: "residential", label: "Résidentiel" },
  { key: "commercial", label: "Commercial" },
  { key: "hospitality", label: "Hôtellerie" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const color = project.accentColor || "#3d3a33";
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(1000).format("webp").url()
    : project._demoImage || "";

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.5 },
      }}
      className={`project-card group relative ${
        index % 3 === 1 ? "md:mt-24" : ""
      }`}
      data-cursor-hover
    >
      <Link
        href={`/projects/${project.slug.current}`}
        className="block relative overflow-hidden aspect-[3/4] mb-5"
      >
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${color}cc, transparent)`,
          }}
        />
        <Image
          src={imageUrl}
          alt={project.coverImage?.alt || project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="project-card-img object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="font-body text-sm text-concrete-100 font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl text-concrete-100 group-hover:text-quartz transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-mono text-caption uppercase text-concrete-500 mt-1 tracking-widest">
            {project.location}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-caption text-concrete-500 block">
            {project.year}
          </span>
          {project.area && (
            <span className="font-mono text-caption text-quartz/60 block">
              {project.area}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div>
            <span className="font-mono text-caption uppercase text-quartz tracking-widest block mb-4">
              Portfolio
            </span>
            <h2 className="font-serif text-heading text-concrete-100">
              Projets
              <br />
              <span className="text-stroke">sélectionnés</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                data-cursor-hover
                className={`px-4 py-2 border font-mono text-caption uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat.key ? "filter-active" : "filter-inactive"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
