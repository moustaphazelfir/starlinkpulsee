import Link from "next/link";
import { ArrowRight, Satellite, Users, Target, Heart, ShieldCheck, BadgeCheck, Mail, Search, FlaskConical, RefreshCw } from "lucide-react";

export const metadata = {
  title: "À propos - Starlink Ultra",
  description: "Qui se cache derrière Starlink Ultra, le guide francophone indépendant sur Starlink : notre mission, notre méthode éditoriale, l'auteur et notre engagement de transparence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">À propos</span>
        </nav>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            À propos de <span className="gradient-text">Starlink Ultra</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Le guide francophone indépendant pour tout savoir sur l&apos;internet par satellite Starlink de SpaceX.
          </p>
        </header>

        {/* Mission */}
        <section className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)] mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-[var(--color-accent-cyan)]">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Notre mission</h2>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-4">
            Starlink Ultra a été créé avec un objectif simple : <strong className="text-white">démocratiser l&apos;accès à l&apos;information sur Starlink</strong> pour la communauté francophone, en France, en Europe et en Afrique.
          </p>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Zone blanche ADSL, voyageur en van, marin, professionnel isolé ou simple curieux : nous décortiquons chaque mise à jour, chaque offre et chaque équipement pour vous aider à prendre les meilleures décisions.
          </p>
        </section>

        {/* Notre méthode éditoriale (E-E-A-T) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Comment nous travaillons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <FlaskConical size={24} className="text-[var(--color-accent-cyan)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Testé sur le terrain</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Nos guides s&apos;appuient sur une utilisation réelle du matériel Starlink et des retours d&apos;utilisateurs, pas sur de la théorie.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Search size={24} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Sources vérifiées</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Prix, débits et disponibilités sont recoupés avec les sources officielles (starlink.com, SpaceX) au moment de la rédaction.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <RefreshCw size={24} className="text-[var(--color-accent-cyan)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Contenu mis à jour</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">L&apos;univers Starlink évolue vite : nous actualisons régulièrement nos articles pour rester fiables et pertinents.</p>
            </div>
          </div>
        </section>

        {/* Ce que nous proposons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Ce que vous trouverez ici</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Satellite size={24} className="text-[var(--color-accent-cyan)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Guides & tutoriels</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Des guides pas à pas pour installer, configurer et optimiser votre matériel Starlink.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Target size={24} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Comparatifs détaillés</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Starlink vs fibre, 4G/5G, ADSL… Des comparatifs honnêtes pour vous aider à choisir.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Heart size={24} className="text-red-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Actualités & tests</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Les dernières nouvelles de SpaceX et des retours terrain réels de la connexion Starlink.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Users size={24} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Communauté</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Un espace où les utilisateurs francophones de Starlink partagent leurs expériences en commentaires.</p>
            </div>
          </div>
        </section>

        {/* L'auteur */}
        <section className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)] mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xl">
              Z
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">zenos690</h2>
              <p className="text-[var(--color-text-muted)] text-sm">Fondateur & rédacteur en chef</p>
            </div>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-4">
            Passionné de technologie et utilisateur de Starlink depuis ses débuts, j&apos;ai créé Starlink Ultra pour partager mon expérience concrète et aider la communauté francophone à maîtriser l&apos;internet par satellite.
          </p>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Chaque article est rédigé avec soin, à partir de tests réels, d&apos;une veille technologique constante et de sources officielles. L&apos;objectif : vous donner une information claire, honnête et actionnable — que vous soyez novice ou déjà équipé.
          </p>
        </section>

        {/* Indépendance & transparence */}
        <section className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)] mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[var(--color-accent-green)]/10 flex items-center justify-center text-[var(--color-accent-green)]">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Indépendance & transparence</h2>
          </div>
          <ul className="space-y-3 text-[var(--color-text-secondary)] text-lg leading-relaxed">
            <li className="flex gap-3"><BadgeCheck size={22} className="text-[var(--color-accent-green)] shrink-0 mt-1" /> Starlink Ultra est un média <strong className="text-white">indépendant</strong>, sans lien officiel avec SpaceX ni Starlink.</li>
            <li className="flex gap-3"><BadgeCheck size={22} className="text-[var(--color-accent-green)] shrink-0 mt-1" /> Certains liens sont des <strong className="text-white">liens de parrainage ou d&apos;affiliation</strong> : nous pouvons percevoir une commission, sans surcoût pour vous. Cela ne biaise jamais nos avis.</li>
            <li className="flex gap-3"><BadgeCheck size={22} className="text-[var(--color-accent-green)] shrink-0 mt-1" /> Le site est financé par la publicité (Google AdSense) et l&apos;affiliation, ce qui nous permet de rester <strong className="text-white">gratuit</strong>.</li>
          </ul>
        </section>

        {/* Contact + CTA */}
        <div className="text-center space-y-6">
          <p className="text-[var(--color-text-secondary)]">
            Une question, une suggestion, une erreur à signaler ?{" "}
            <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)] hover:underline inline-flex items-center gap-1">
              <Mail size={15} /> contact@starlinkpulsee.com
            </a>
          </p>
          <Link href="/blog" className="inline-flex items-center gap-2 bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-xl transition-colors">
            Découvrir nos articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
