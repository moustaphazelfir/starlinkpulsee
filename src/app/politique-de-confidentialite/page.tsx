import Link from "next/link";

export const metadata = {
  title: "Politique de Confidentialité - Starlink Ultra",
  description: "Politique de confidentialité de Starlink Ultra : données collectées, cookies, publicité Google AdSense, vos choix et vos droits (RGPD).",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">

        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">Politique de confidentialité</span>
        </nav>

        <h1 className="text-4xl font-extrabold text-white mb-10">
          Politique de <span className="gradient-text">Confidentialité</span>
        </h1>

        <div className="prose-space max-w-none space-y-8">
          <section>
            <h2>1. Introduction</h2>
            <p>
              La protection de vos données personnelles est une priorité pour Starlink Ultra (accessible sur starlinkpulsee.com). Cette politique explique quelles données nous collectons, comment elles sont utilisées, le rôle de nos partenaires publicitaires, et les choix dont vous disposez. En naviguant sur ce site, vous acceptez les pratiques décrites ci-dessous.
            </p>
          </section>

          <section>
            <h2>2. Données que nous collectons</h2>
            <ul>
              <li><strong>Données de navigation</strong> : adresse IP, type d&apos;appareil et de navigateur, pages consultées, durée et provenance de la visite (mesure d&apos;audience).</li>
              <li><strong>Données de contact</strong> : nom et adresse e-mail, uniquement si vous les fournissez volontairement (formulaire de contact, commentaires).</li>
              <li><strong>Cookies et identifiants</strong> : cookies techniques, de mesure d&apos;audience et publicitaires déposés sur votre appareil (voir section 4).</li>
            </ul>
          </section>

          <section>
            <h2>3. Utilisation des données</h2>
            <ul>
              <li>Fournir, maintenir et améliorer le contenu et l&apos;expérience du site.</li>
              <li>Mesurer l&apos;audience et comprendre comment le site est utilisé.</li>
              <li>Afficher des publicités, y compris des annonces personnalisées, via nos partenaires.</li>
              <li>Répondre à vos demandes de contact et modérer les commentaires.</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies et publicité (Google AdSense)</h2>
            <p>
              Ce site utilise <strong>Google AdSense</strong>, une régie publicitaire tierce, pour diffuser des annonces. À ce titre :
            </p>
            <ul>
              <li>
                Google, en tant que fournisseur tiers, utilise des <strong>cookies</strong> (notamment le cookie <strong>DART</strong>) pour diffuser des annonces en fonction de vos visites sur ce site et d&apos;autres sites Internet.
              </li>
              <li>
                Des <strong>fournisseurs et réseaux publicitaires tiers</strong> peuvent également utiliser des cookies, balises web et technologies similaires pour mesurer la performance des annonces et proposer des publicités plus pertinentes.
              </li>
              <li>
                Nous utilisons par ailleurs <strong>Google Analytics</strong> pour la mesure d&apos;audience (statistiques de fréquentation anonymisées).
              </li>
            </ul>
            <p>
              Pour en savoir plus sur la manière dont Google utilise les données lorsque vous consultez un site partenaire, consultez la page{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)]">« Fonctionnement de Google avec les sites de ses partenaires »</a>.
            </p>
          </section>

          <section>
            <h2>5. Vos choix concernant la publicité</h2>
            <p>Vous gardez le contrôle sur la publicité personnalisée :</p>
            <ul>
              <li>
                Désactiver les annonces personnalisées de Google via les{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)]">Paramètres des annonces Google</a>.
              </li>
              <li>
                Gérer les cookies publicitaires de nombreux fournisseurs via{" "}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)]">aboutads.info</a>{" "}
                ou, en Europe,{" "}
                <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)]">youronlinechoices.eu</a>.
              </li>
              <li>
                Bloquer ou supprimer les cookies directement dans les <strong>paramètres de votre navigateur</strong> (cela peut affecter certaines fonctionnalités).
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Consentement (utilisateurs de l&apos;Espace économique européen)</h2>
            <p>
              Conformément au RGPD et à la directive ePrivacy, les cookies non essentiels (mesure d&apos;audience et publicité) ne sont déposés qu&apos;avec votre consentement pour les visiteurs situés dans l&apos;EEE et au Royaume-Uni. Vous pouvez retirer votre consentement à tout moment via les paramètres de votre navigateur ou les liens de la section 5.
            </p>
          </section>

          <section>
            <h2>7. Partage des données</h2>
            <p>
              Vos données personnelles ne sont <strong>jamais vendues</strong>. Elles peuvent être traitées par des prestataires tiers strictement pour le fonctionnement du site et la publicité, notamment : <strong>Google</strong> (AdSense, Analytics), <strong>Vercel</strong> (hébergement) et <strong>Supabase</strong> (base de données). Ces prestataires disposent de leurs propres politiques de confidentialité.
            </p>
          </section>

          <section>
            <h2>8. Vos droits (RGPD)</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition sur vos données personnelles. Pour exercer ces droits, écrivez-nous à{" "}
              <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)]">contact@starlinkpulsee.com</a>. Vous pouvez également introduire une réclamation auprès de la CNIL.
            </p>
          </section>

          <section>
            <h2>9. Liens externes et affiliation</h2>
            <p>
              Ce site contient des liens vers des sites tiers, dont certains sont des <strong>liens de parrainage ou d&apos;affiliation</strong> (par exemple vers Starlink/SpaceX). Nous pouvons percevoir une commission sans surcoût pour vous. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites externes. Starlink Ultra est un média indépendant, non affilié à SpaceX.
            </p>
          </section>

          <section>
            <h2>10. Modifications</h2>
            <p>
              Cette politique peut être mise à jour à tout moment ; la date ci-dessous indique la dernière révision.
            </p>
            <p className="text-[var(--color-text-muted)] text-sm mt-4">
              Dernière mise à jour : août 2026.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
