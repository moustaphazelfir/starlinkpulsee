import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Settings, Zap, Shield, Globe, Wifi } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  // Fetch the latest 6 published articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, excerpt, created_at, featured_image,
      categories ( name ),
      profiles ( full_name )
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(6);

  // Fallback to empty array if error
  const latestArticles = articles || [];

  return (
    <div className="min-h-screen">
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(130deg,#1E3A5F_0%,#060A14_100%)] -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-[var(--color-accent-cyan)] font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
            Starlink Pulse
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
            La référence francophone <br className="hidden md:block" />
            <span className="gradient-text">Starlink</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Votre source incontournable pour tout savoir sur l'internet par satellite. 
            Découvrez des tutoriels, des actualités et des comparatifs pour optimiser votre connexion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/blog/guide-complet-starlink-c-est-quoi-l-internet-par-satellite-de-spacex"
              className="bg-white text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-[var(--color-accent-cyan)] hover:text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              Guide Complet <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Decorative Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,121.22,192.5,107.5,236.4,97.71,280.9,74.56,321.39,56.44Z" className="fill-[var(--color-space-800)] opacity-30"></path>
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[var(--color-space-800)] opacity-50"></path>
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[var(--color-space-800)]"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4">
        
        {/* ══════════════════════════════════════════════════════
            SECTION: PAR OÙ COMMENCER
            ══════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Par où <span className="gradient-text">commencer ?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent-cyan)] to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/blog/guide-complet-starlink-c-est-quoi-l-internet-par-satellite-de-spacex" className="glass glass-hover p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-[var(--color-accent-blue)] mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">Découvrir Starlink</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 flex-grow">
                Comprenez comment fonctionne l'internet par satellite de SpaceX et s'il est fait pour vous.
              </p>
              <span className="text-[var(--color-accent-cyan)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Lire le guide <ArrowRight size={16} />
              </span>
            </Link>

            <Link href="/blog/comment-installer-starlink-etape-par-etape-guide-complet" className="glass glass-hover p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-[var(--color-accent-cyan)] mb-6 group-hover:scale-110 transition-transform">
                <Settings size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">Installation & Config</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 flex-grow">
                Guide pas à pas pour installer votre antenne, configurer le routeur et optimiser le WiFi.
              </p>
              <span className="text-[var(--color-accent-cyan)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Voir les tutos <ArrowRight size={16} />
              </span>
            </Link>

            <Link href="/blog/maximiser-les-debits-starlink-astuces-de-pro-pour-reduire-le-ping-et-supprimer-les-obstructions" className="glass glass-hover p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center text-[var(--color-accent-purple)] mb-6 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">Maximiser les débits</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 flex-grow">
                Astuces de pro pour réduire le ping, éviter les obstructions et booster votre connexion.
              </p>
              <span className="text-[var(--color-accent-cyan)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Optimiser <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* ▓▓ AD SLOT 4: IN-FEED ▓▓ */}
        <AdBanner slotId="auto-slot-1" position="in-feed" />

        {/* ══════════════════════════════════════════════════════
            SECTION: COMPARATIFS
            ══════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Starlink face à la <span className="text-white">concurrence</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Internet par satellite, 4G, 5G ou Fibre optique ? Découvrez quelle technologie répond le mieux à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/starlink-vs-fibre-optique" className="group block relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-space-900)] via-[var(--color-space-900)]/60 to-transparent z-10" />
              <div className="h-64 w-full bg-[var(--color-space-700)] flex items-center justify-center">
                {/* Placeholder image, à remplacer par next/image */}
                <div className="flex items-center gap-4 text-4xl font-black text-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={48} /> VS <Globe size={48} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent-cyan)] transition-colors">Starlink vs Fibre Optique</h3>
                <p className="text-sm text-gray-300 flex items-center gap-2">Lire le match <ArrowRight size={14} /></p>
              </div>
            </Link>

            <Link href="/blog/comparatif-starlink-vs-4g-5g-box" className="group block relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-space-900)] via-[var(--color-space-900)]/60 to-transparent z-10" />
              <div className="h-64 w-full bg-[var(--color-space-700)] flex items-center justify-center">
                <div className="flex items-center gap-4 text-4xl font-black text-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={48} /> VS <Wifi size={48} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent-cyan)] transition-colors">Starlink vs Box 4G/5G</h3>
                <p className="text-sm text-gray-300 flex items-center gap-2">Lire le match <ArrowRight size={14} /></p>
              </div>
            </Link>

            <Link href="/blog/starlink-vs-adsl-le-match-a-sens-unique" className="group block relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-space-900)] via-[var(--color-space-900)]/60 to-transparent z-10" />
              <div className="h-64 w-full bg-[var(--color-space-700)] flex items-center justify-center">
                <div className="flex items-center gap-4 text-4xl font-black text-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={48} /> VS ADSL
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent-cyan)] transition-colors">Starlink vs ADSL</h3>
                <p className="text-sm text-gray-300 flex items-center gap-2">Lire le match <ArrowRight size={14} /></p>
              </div>
            </Link>
          </div>
          
          <div className="mt-10 text-center">
             <Link href="/categories/comparatifs" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)] hover:text-white transition-colors">
               Tous les comparatifs <ArrowRight size={16} />
             </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION: COMBIEN ÇA COÛTE ?
            ══════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Combien ça coûte <span className="gradient-text">Starlink ?</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Les tarifs ont beaucoup évolué. Voici un aperçu rapide des abonnements actuels pour vous aider à y voir plus clair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Forfait Résidentiel */}
            <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-cyan)] transition-colors text-center flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-white">Résidentiel</h3>
              <div className="text-3xl font-extrabold text-[var(--color-accent-cyan)] mb-4">40€ <span className="text-sm text-[var(--color-text-muted)] font-normal">/ mois</span></div>
              <ul className="text-sm text-[var(--color-text-secondary)] mb-6 space-y-2 flex-grow">
                <li>Données illimitées</li>
                <li>Matériel : 349€</li>
                <li>Idéal pour la maison</li>
              </ul>
              <Link href="/blog/forfait-starlink-residentiel-100-200-ou-max" className="block w-full py-2 px-4 rounded-lg bg-[var(--color-space-600)] hover:bg-[var(--color-accent-cyan)] text-white font-medium transition-colors">
                En savoir plus
              </Link>
            </div>

            {/* Forfait Itinérance */}
            <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] hover:border-blue-500 transition-colors text-center flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-white">Itinérance</h3>
              <div className="text-3xl font-extrabold text-blue-500 mb-4">59€ <span className="text-sm text-[var(--color-text-muted)] font-normal">/ mois</span></div>
              <ul className="text-sm text-[var(--color-text-secondary)] mb-6 space-y-2 flex-grow">
                <li>Utilisation n'importe où</li>
                <li>Mise en pause possible</li>
                <li>Pour camping-cars & vans</li>
              </ul>
              <Link href="/blog/prix-starlink-combien-coute-labonnement" className="block w-full py-2 px-4 rounded-lg bg-[var(--color-space-600)] hover:bg-blue-600 text-white font-medium transition-colors">
                En savoir plus
              </Link>
            </div>

            {/* Forfait Bateau */}
            <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] hover:border-purple-500 transition-colors text-center flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-white">Bateau</h3>
              <div className="text-3xl font-extrabold text-purple-500 mb-4">289€ <span className="text-sm text-[var(--color-text-muted)] font-normal">/ mois</span></div>
              <ul className="text-sm text-[var(--color-text-secondary)] mb-6 space-y-2 flex-grow">
                <li>Priorité sur le réseau</li>
                <li>Couverture océanique</li>
                <li>Antenne Haute Performance</li>
              </ul>
              <Link href="/blog/prix-starlink-combien-coute-labonnement" className="block w-full py-2 px-4 rounded-lg bg-[var(--color-space-600)] hover:bg-purple-600 text-white font-medium transition-colors">
                En savoir plus
              </Link>
            </div>

            {/* Forfait Entreprise */}
            <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] hover:border-green-500 transition-colors text-center flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-white">Entreprise</h3>
              <div className="text-3xl font-extrabold text-green-500 mb-4">93€ <span className="text-sm text-[var(--color-text-muted)] font-normal">/ mois</span></div>
              <ul className="text-sm text-[var(--color-text-secondary)] mb-6 space-y-2 flex-grow">
                <li>Bande passante prioritaire</li>
                <li>IP Publique / Routage</li>
                <li>Support Premium</li>
              </ul>
              <Link href="/blog/prix-starlink-combien-coute-labonnement" className="block w-full py-2 px-4 rounded-lg bg-[var(--color-space-600)] hover:bg-green-600 text-white font-medium transition-colors">
                En savoir plus
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION: PRÉSENTATION DU BLOG
            ══════════════════════════════════════════════════════ */}
        <section className="py-12 mb-8 bg-[var(--color-space-900)] rounded-3xl border border-[var(--color-border-subtle)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-cyan)] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent-blue)] opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 px-8 py-10 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Starlink Pulse : Votre guide indépendant</h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
              Starlinkpulsee a été créé pour partager notre expérience et aider la communauté francophone à maîtriser l'internet par satellite. 
              Que vous soyez dans une zone blanche ADSL, un voyageur en van, ou simplement curieux de cette technologie révolutionnaire de SpaceX, 
              nous décortiquons chaque mise à jour, chaque offre et chaque équipement pour vous.
            </p>
            <Link href="/a-propos" className="inline-block bg-white text-black font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full hover:bg-[var(--color-accent-cyan)] hover:text-white transition-colors">
              En savoir plus sur le projet
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION: ARTICLES RÉCENTS
            ══════════════════════════════════════════════════════ */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Derniers <span className="gradient-text">Articles</span></h2>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors">
              Voir tout le blog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article: any) => (
              <article key={article.id} className="glass rounded-xl overflow-hidden group hover:border-[var(--color-border-medium)] transition-all flex flex-col h-full">
                <Link href={`/blog/${article.slug}`} className="block h-48 bg-[var(--color-space-600)] relative overflow-hidden">
                  {article.featured_image ? (
                    <img src={article.featured_image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">Sans Image</div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-xs font-bold px-2 py-1 rounded text-white z-10 uppercase">
                    {article.categories?.name || 'Général'}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-[var(--color-text-muted)] mb-2 flex items-center gap-2">
                    <span>{new Date(article.created_at).toLocaleDateString('fr-FR')}</span> • <span>{article.profiles?.full_name || 'Admin'}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--color-accent-cyan)] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <Link href={`/blog/${article.slug}`} className="text-sm font-medium text-[var(--color-accent-cyan)] flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Lire la suite <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-white transition-colors">
               Tous les articles <ArrowRight size={16} />
             </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
