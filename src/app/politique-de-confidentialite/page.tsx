import Link from "next/link";

export const metadata = {
  title: "Politique de Confidentialité - Starlinkpulsee",
  description: "Politique de confidentialité et gestion des données personnelles sur Starlinkpulsee.",
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
              La protection de vos données personnelles est une priorité pour Starlinkpulsee. Cette politique de confidentialité explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits.
            </p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous pouvons collecter les données suivantes :</p>
            <ul>
              <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées, durée de visite (via Google Analytics / AdSense).</li>
              <li><strong>Données de contact</strong> : nom et adresse e-mail, uniquement si vous les fournissez volontairement via notre formulaire de contact.</li>
              <li><strong>Cookies</strong> : des cookies techniques et publicitaires peuvent être déposés sur votre appareil.</li>
            </ul>
          </section>

          <section>
            <h2>3. Utilisation des données</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul>
              <li>Améliorer le contenu et l'expérience utilisateur du site.</li>
              <li>Répondre à vos demandes de contact.</li>
              <li>Afficher des publicités pertinentes via Google AdSense.</li>
              <li>Analyser les statistiques de fréquentation.</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>
              Ce site utilise des cookies, notamment ceux de <strong>Google AdSense</strong> et <strong>Google Analytics</strong>, pour personnaliser les annonces et analyser le trafic. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2>5. Partage des données</h2>
            <p>
              Vos données personnelles ne sont <strong>jamais vendues</strong> à des tiers. Elles peuvent être partagées avec des services tiers (Google, Vercel) uniquement dans le cadre du fonctionnement technique du site et de la publicité.
            </p>
          </section>

          <section>
            <h2>6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données personnelles. Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)]">contact@starlinkpulsee.com</a>.
            </p>
          </section>

          <section>
            <h2>7. Modifications</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière modification est affichée ci-dessous.
            </p>
            <p className="text-[var(--color-text-muted)] text-sm mt-4">
              Dernière mise à jour : Juillet 2026.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
