"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const line1 = "Nous sculptons";
const line2 = "la matière";
const line3 = "& la lumière";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&h=1000&fit=crop&q=80"
          alt="Architecture d'intérieur contemporaine"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <motion.div
          variants={fadeIn}
          custom={0.3}
          initial="hidden"
          animate="visible"
          className="mb-8 md:mb-12"
        >
          <span className="font-mono text-caption uppercase text-quartz tracking-widest">
            Architecture d&apos;Int&eacute;rieur — Paris
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-display text-concrete-100"
            >
              {line1}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-display text-stroke"
            >
              {line2}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-display text-concrete-100"
            >
              {line3}
            </motion.h1>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.p
            variants={fadeIn}
            custom={1.4}
            initial="hidden"
            animate="visible"
            className="font-body text-subhead text-concrete-400 max-w-md font-light"
          >
            Chaque espace est une composition. B&eacute;ton, lumi&egrave;re,
            mati&egrave;re — orchestr&eacute;s avec pr&eacute;cision pour
            cr&eacute;er des int&eacute;rieurs qui r&eacute;sonnent.
          </motion.p>

          <motion.div
            variants={fadeIn}
            custom={1.8}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-quartz to-transparent"
            />
            <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest">
              D&eacute;filer
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
