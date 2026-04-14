import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-concrete-800/50 py-12 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-lg text-concrete-400">Lumina</span>
          <span className="text-quartz/50 text-sm">&amp;</span>
          <span className="font-serif text-lg text-concrete-400">Quartz</span>
        </Link>

        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              data-cursor-hover
              className="font-mono text-caption uppercase text-concrete-600 hover:text-quartz transition-colors duration-300 tracking-widest"
            >
              {social.label}
            </a>
          ))}
        </div>

        <span className="font-mono text-caption text-concrete-700 tracking-wider">
          &copy; {new Date().getFullYear()} — Tous droits réservés
        </span>
      </div>
    </footer>
  );
}
