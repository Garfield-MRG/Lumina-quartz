"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "47", label: "Projets livrés" },
  { value: "12", label: "Années d'expertise" },
  { value: "8", label: "Prix & distinctions" },
  { value: "3", label: "Villes" },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-40 px-6 md:px-12 relative"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-quartz/30" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-asymmetric gap-16 lg:gap-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="font-mono text-caption uppercase text-quartz tracking-widest block mb-6"
            >
              L&apos;Atelier
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-heading text-concrete-100 mb-8"
            >
              Le béton
              <br />a une âme.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-5">
              <p className="font-body text-lg text-concrete-400 font-light leading-relaxed">
                Fondé en 2012, Lumina &amp; Quartz est un atelier
                d&apos;architecture d&apos;intérieur où la rigueur du béton
                rencontre la sensibilité de la lumière naturelle. Chaque projet
                est une partition que nous composons avec la matière, l&apos;espace
                et la lumière, pour créer des lieux qui portent l&apos;empreinte
                de ceux qui les habitent.
              </p>
              <p className="font-body text-lg text-concrete-400 font-light leading-relaxed">
                Nous croyons que le luxe authentique n&apos;est pas dans
                l&apos;ostentation, mais dans la justesse des proportions, la
                noblesse des matériaux bruts et l&apos;émotion que procure un
                espace parfaitement orchestré.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <hr className="hr-quartz mb-10 max-w-xs" />
              <p className="font-serif italic text-xl text-concrete-300 max-w-sm">
                &ldquo;L&apos;espace est le luxe de demain.&rdquo;
              </p>
              <p className="font-mono text-caption uppercase text-concrete-500 mt-3 tracking-widest">
                Jean Nouvel
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-12"
          >
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden aspect-[4/5]"
            >
              <Image
                src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=700&h=900&fit=crop&q=80"
                alt="Atelier Lumina & Quartz"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="border-l border-quartz/20 pl-5"
                >
                  <span className="font-serif text-4xl md:text-5xl text-quartz block mb-1">
                    {stat.value}
                  </span>
                  <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
