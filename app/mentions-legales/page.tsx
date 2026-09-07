import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, hébergement, propriété intellectuelle et protection des données personnelles du site Lumina & Quartz.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  { id: "editeur", label: "Éditeur du site" },
  { id: "hebergement", label: "Hébergement" },
  { id: "propriete-intellectuelle", label: "Propriété intellectuelle" },
  { id: "donnees-personnelles", label: "Données personnelles" },
  { id: "cookies", label: "Cookies" },
  { id: "credits", label: "Crédits" },
  { id: "a-propos", label: "À propos de ce site" },
];

const linkClass =
  "text-concrete-200 hover:text-quartz transition-colors duration-300";

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <span className="font-mono text-caption uppercase text-quartz tracking-widest block mb-4">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-concrete-100 mb-6">
        {title}
      </h2>
      <div className="space-y-4 font-body text-concrete-300 font-light leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <header className="mb-16 max-w-3xl">
        <span className="font-mono text-caption uppercase text-quartz tracking-widest block mb-6">
          Informations légales
        </span>
        <h1 className="font-serif text-heading text-concrete-100 mb-8">
          Mentions légales
        </h1>
        <p className="font-body text-xl text-concrete-400 font-light">
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance
          dans l’économie numérique, les informations suivantes sont portées à
          la connaissance des visiteurs de ce site.
        </p>
      </header>

      <hr className="hr-quartz mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-asymmetric-reverse gap-16 lg:gap-24">
        <nav aria-label="Sommaire" className="lg:sticky lg:top-32 lg:self-start">
          <span className="font-mono text-caption uppercase text-concrete-500 tracking-widest block mb-6">
            Sommaire
          </span>
          <ol className="space-y-3">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  data-cursor-hover
                  className="inline-flex items-baseline gap-4 font-body text-concrete-400 font-light hover:text-quartz transition-colors duration-300"
                >
                  <span className="font-mono text-caption text-concrete-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl space-y-16">
          <Section id="editeur" index={0} title="Éditeur du site">
            <p>
              Le site est édité par Lumina &amp; Quartz, atelier d’architecture
              d’intérieur, dont le siège est situé au 18 Rue de la Roquette,
              75011 Paris, France.
            </p>
            <p>
              Téléphone :{" "}
              <a href="tel:+33142567890" data-cursor-hover className={linkClass}>
                +33 1 42 56 78 90
              </a>
              <br />
              Courriel :{" "}
              <a
                href="mailto:atelier@luminaquartz.fr"
                data-cursor-hover
                className={linkClass}
              >
                atelier@luminaquartz.fr
              </a>
            </p>
            <p>
              Directeur de la publication : la direction de l’atelier Lumina
              &amp; Quartz.
            </p>
          </Section>

          <Section id="hebergement" index={1} title="Hébergement">
            <p>
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133,
              Covina, CA 91723, États-Unis.
            </p>
            <p>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className={linkClass}
              >
                vercel.com
              </a>
            </p>
          </Section>

          <Section
            id="propriete-intellectuelle"
            index={2}
            title="Propriété intellectuelle"
          >
            <p>
              L’ensemble des éléments qui composent ce site, qu’il s’agisse des
              textes, des photographies, des illustrations, du logotype, de la
              charte graphique ou du code, est protégé par le droit d’auteur et
              le droit des marques.
            </p>
            <p>
              Toute reproduction, représentation, modification ou adaptation,
              totale ou partielle, par quelque procédé que ce soit et sur
              quelque support que ce soit, est interdite sans l’autorisation
              écrite préalable de l’éditeur.
            </p>
          </Section>

          <Section
            id="donnees-personnelles"
            index={3}
            title="Données personnelles"
          >
            <p>
              Le formulaire de contact recueille votre nom, votre adresse
              électronique, le type de projet envisagé et votre message. Ces
              informations sont nécessaires au traitement de votre demande et
              ne sont utilisées à aucune autre fin. Le traitement repose sur
              votre consentement, que vous exprimez en envoyant le formulaire.
            </p>
            <p>
              Les données sont conservées pendant douze mois au plus à compter
              du dernier échange, puis supprimées. Elles ne sont ni cédées ni
              vendues. Pour l’acheminement des messages, elles transitent par
              notre prestataire d’envoi de courriels, Resend, et par notre
              hébergeur, Vercel.
            </p>
            <p>
              Conformément au règlement général sur la protection des données
              et à la loi Informatique et Libertés, vous disposez d’un droit
              d’accès, de rectification, d’effacement, de limitation et
              d’opposition sur les données qui vous concernent. Vous pouvez
              l’exercer en écrivant à{" "}
              <a
                href="mailto:atelier@luminaquartz.fr"
                data-cursor-hover
                className={linkClass}
              >
                atelier@luminaquartz.fr
              </a>
              . Si vous estimez que vos droits ne sont pas respectés, vous
              pouvez adresser une réclamation à la Commission nationale de
              l’informatique et des libertés.
            </p>
          </Section>

          <Section id="cookies" index={4} title="Cookies">
            <p>
              Ce site ne dépose aucun cookie publicitaire ni de mesure
              d’audience. Seuls les éléments techniques strictement nécessaires
              à l’affichage des pages sont utilisés. Aucun consentement n’est
              donc sollicité.
            </p>
          </Section>

          <Section id="credits" index={5} title="Crédits">
            <p>
              Conception, direction artistique et développement :{" "}
              <a
                href="https://www.instagram.com/sangyohan08/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className={linkClass}
              >
                @sangyohan08
              </a>
              .
            </p>
            <p>
              Typographies : Playfair Display, Outfit et JetBrains Mono,
              distribuées sous licence libre par Google Fonts.
            </p>
          </Section>

          <Section id="a-propos" index={6} title="À propos de ce site">
            <p>
              Lumina &amp; Quartz est un atelier fictif. Ce site est un projet
              de conception réalisé à des fins de portfolio. Les coordonnées,
              les projets et les articles présentés sont imaginaires et ne
              renvoient à aucune entreprise existante.
            </p>
            <p>
              Le formulaire de contact est fonctionnel, mais les demandes qui y
              sont déposées ne donnent lieu à aucune prestation.
            </p>
          </Section>

          <div className="pt-8">
            <Link
              href="/"
              data-cursor-hover
              className="inline-flex items-center gap-3 font-mono text-caption uppercase text-concrete-400 hover:text-quartz transition-colors tracking-widest"
            >
              <span className="w-8 h-px bg-current" />
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
