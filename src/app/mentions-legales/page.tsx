import Link from "next/link";

export const metadata = {
  title: "Mentions Légales - Starlink Ultra",
  description: "Mentions légales du site Starlink Ultra, guide indépendant sur Starlink.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">

        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">Mentions légales</span>
        </nav>

        <h1 className="text-4xl font-extrabold text-white mb-10">
          Mentions <span className="gradient-text">Légales</span>
        </h1>

        <div className="prose-space max-w-none space-y-8">
          <section>
            <h2>1. Éditeur du site</h2>
            <p>
              Le site <strong>starlinkpulsee.com</strong> est un blog informatif indépendant édité par un particulier.<br />
              Responsable de la publication : <strong>zenos690</strong>.<br />
              Contact : <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)]">contact@starlinkpulsee.com</a>
            </p>
          </section>

          <section>
            <h2>2. Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong><br />
              Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA.<br />
              Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)]">vercel.com</a>
            </p>
          </section>

          <section>
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de l'éditeur, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2>4. Responsabilité</h2>
            <p>
              Les informations fournies sur ce site le sont à titre indicatif. L'éditeur ne garantit pas l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation de ces informations se fait sous la responsabilité exclusive de l'utilisateur.
            </p>
          </section>

          <section>
            <h2>5. Liens externes</h2>
            <p>
              Starlink Ultra peut contenir des liens vers d'autres sites. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section>
            <h2>6. Affiliation</h2>
            <p>
              Ce site n'est <strong>pas affilié</strong> à SpaceX, Starlink ou toute autre entité du groupe. Les marques citées appartiennent à leurs propriétaires respectifs. Certains liens peuvent être des liens d'affiliation, ce qui signifie que nous pouvons recevoir une commission si vous effectuez un achat via ces liens, sans coût supplémentaire pour vous.
            </p>
          </section>

          <section>
            <h2>7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
