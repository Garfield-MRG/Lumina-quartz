"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { ContactFormData } from "@/lib/validations";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      type: formData.get("type") as ContactFormData["type"],
      message: formData.get("message") as string,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result.errors) {
        const fieldErrors: Record<string, string> = {};
        for (const err of result.errors) {
          fieldErrors[err.path[0]] = err.message;
        }
        setErrors(fieldErrors);
      }
      setStatus("error");
      return;
    }

    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-40 px-6 md:px-12 relative"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hr-quartz mb-20 origin-left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-asymmetric-reverse gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-mono text-caption uppercase text-quartz tracking-widest block mb-6"
            >
              Contact
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-heading text-concrete-100 mb-10"
            >
              Parlons de
              <br />
              <span className="text-stroke">votre projet</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-2">
                  Adresse
                </span>
                <p className="font-body text-concrete-300 font-light">
                  18 Rue de la Roquette
                  <br />
                  75011 Paris, France
                </p>
              </div>
              <div>
                <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-2">
                  Email
                </span>
                <a
                  href="mailto:atelier@luminaquartz.fr"
                  data-cursor-hover
                  className="font-body text-concrete-300 font-light hover:text-quartz transition-colors duration-300"
                >
                  atelier@luminaquartz.fr
                </a>
              </div>
              <div>
                <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-2">
                  Téléphone
                </span>
                <a
                  href="tel:+33142567890"
                  data-cursor-hover
                  className="font-body text-concrete-300 font-light hover:text-quartz transition-colors duration-300"
                >
                  +33 1 42 56 78 90
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {status === "success" && (
              <div className="border border-quartz/30 p-6 mb-4">
                <p className="font-body text-quartz">
                  Merci ! Votre message a bien été envoyé. Nous vous répondrons
                  sous 48h.
                </p>
              </div>
            )}

            {status === "error" && !Object.keys(errors).length && (
              <div className="border border-red-500/30 p-6 mb-4">
                <p className="font-body text-red-400">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-3">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-concrete-700 pb-3 font-body text-concrete-200 font-light focus:outline-none focus:border-quartz transition-colors duration-300 placeholder:text-concrete-700"
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-concrete-700 pb-3 font-body text-concrete-200 font-light focus:outline-none focus:border-quartz transition-colors duration-300 placeholder:text-concrete-700"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-3">
                Type de projet
              </label>
              <select
                name="type"
                required
                className="w-full bg-transparent border-b border-concrete-700 pb-3 font-body text-concrete-200 font-light focus:outline-none focus:border-quartz transition-colors duration-300 appearance-none"
              >
                <option value="" className="bg-concrete-900">
                  Sélectionnez...
                </option>
                <option value="residential" className="bg-concrete-900">
                  Résidentiel
                </option>
                <option value="commercial" className="bg-concrete-900">
                  Commercial
                </option>
                <option value="hospitality" className="bg-concrete-900">
                  Hôtellerie
                </option>
                <option value="other" className="bg-concrete-900">
                  Autre
                </option>
              </select>
              {errors.type && (
                <p className="text-red-400 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-3">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-transparent border-b border-concrete-700 pb-3 font-body text-concrete-200 font-light focus:outline-none focus:border-quartz transition-colors duration-300 resize-none placeholder:text-concrete-700"
                placeholder="Décrivez votre projet..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              data-cursor-hover
              className="group relative px-8 py-4 border border-quartz/40 font-mono text-caption uppercase tracking-widest text-quartz overflow-hidden transition-colors duration-500 hover:text-obsidian disabled:opacity-50"
            >
              <span className="relative z-10">
                {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
              </span>
              <span className="absolute inset-0 bg-quartz translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
