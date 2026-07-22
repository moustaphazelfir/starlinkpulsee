import Link from "next/link";
import { ArrowRight, Satellite, Users, Target, Heart } from "lucide-react";

export const metadata = {
  title: "À propos - Starlinkpulsee",
  description: "Découvrez qui se cache derrière Starlinkpulsee, le guide francophone indépendant dédié à Starlink et l'internet par satellite.",
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
            À propos de <span className="gradient-text">Starlinkpulsee</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Le guide francophone indépendant pour tout savoir sur l'internet par satellite Starlink de SpaceX.
          </p>
        </header>

        {/* Mission */}
        <section className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)] mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-[var(--color-accent-cyan)]">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Notre Mission</h2>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-4">
            Starlinkpulsee a été créé avec un objectif simple : <strong className="text-white">démocratiser l'accès à l'information sur Starlink</strong> pour la communauté francophone.
          </p>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Que vous soyez dans une zone blanche ADSL, un voyageur en van, un marin, ou simplement curieux de cette technologie révolutionnaire de SpaceX, nous décortiquons chaque mise à jour, chaque offre et chaque équipement pour vous aider à prendre les meilleures décisions.
          </p>
        </section>

        {/* Ce que nous proposons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Ce que nous vous proposons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Satellite size={24} className="text-[var(--color-accent-cyan)] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Guides & Tutoriels</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Des guides pas à pas pour installer, configurer et optimiser votre matériel Starlink.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Target size={24} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Comparatifs Détaillés</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Starlink vs Fibre, 4G/5G, ADSL... Des comparatifs honnêtes pour vous aider à choisir.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Heart size={24} className="text-red-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Actualités & Tests</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Les dernières nouvelles de SpaceX et des tests terrain réels de la connexion Starlink.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-[var(--color-border-subtle)]">
              <Users size={24} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Communauté</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Un espace où les utilisateurs francophones de Starlink peuvent partager leurs expériences.</p>
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
              <p className="text-[var(--color-text-muted)] text-sm">Fondateur & Rédacteur</p>
            </div>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Passionné de technologie et utilisateur de Starlink depuis ses débuts, j'ai créé Starlinkpulsee pour partager mon expérience et aider la communauté francophone à maîtriser l'internet par satellite. Chaque article est rédigé avec soin, basé sur des tests réels et une veille technologique constante.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-xl transition-colors">
            Découvrir nos articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
