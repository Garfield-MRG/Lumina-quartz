"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Projets", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass-nav-solid py-4" : "glass-nav py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            data-cursor-hover
          >
            <span className="font-serif text-2xl text-concrete-200 group-hover:text-quartz transition-colors duration-300">
              Lumina
            </span>
            <span className="text-quartz text-lg">&amp;</span>
            <span className="font-serif text-2xl text-concrete-200 group-hover:text-quartz transition-colors duration-300">
              Quartz
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-cursor-hover
                className="font-mono text-caption uppercase text-concrete-400 hover:text-quartz transition-colors duration-300 tracking-widest"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-cursor-hover
              className="ml-4 px-5 py-2 border border-quartz/30 text-quartz font-mono text-caption uppercase tracking-widest hover:bg-quartz hover:text-obsidian transition-all duration-300"
            >
              Prendre RDV
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor-hover
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-concrete-200 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-concrete-200"
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-px bg-concrete-200 origin-center"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-obsidian/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-heading text-concrete-200 hover:text-quartz transition-colors"
                  data-cursor-hover
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
