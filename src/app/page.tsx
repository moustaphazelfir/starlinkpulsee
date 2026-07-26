import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Settings,
  Zap,
  Gauge,
  Satellite,
  Globe2,
} from "lucide-react";
import AdBanner from "@/components/AdBanner";
import { createClient } from "@/lib/supabase/server";
import { ARTICLE_SLUGS, CATEGORY_SLUGS, articleHref, categoryHref } from "@/lib/site-links";

export const dynamic = "force-dynamic";

type LatestArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  featured_image: string | null;
  categories: { name: string } | null;
  profiles: { full_name: string } | null;
};

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("articles")
    .select(
      `id, title, slug, excerpt, created_at, featured_image,
       categories ( name ), profiles ( full_name )`
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6);

  const latestArticles = (data as unknown as LatestArticle[]) || [];

  return (
    <div className="min-h-screen">
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,#12233f_0%,#060A14_70%)]" />
        <div className="absolute inset-0 -z-10 signal-grid opacity-60" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            {/* Colonne texte */}
            <div>
              <p className="telemetry mb-5 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]" />
                Signal acquis · Édition 2026
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6">
                Domptez l&apos;internet
                <br />
                par satellite{" "}
                <span className="gradient-text">Starlink</span>.
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mb-8">
                Guides testés sur le terrain, comparatifs sans langue de bois et
                suivi des tarifs. On décortique chaque antenne, chaque forfait et
                chaque mise à jour pour que votre connexion tienne ses promesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={articleHref(ARTICLE_SLUGS.guideComplet)}
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent-cyan)] text-black font-bold text-sm px-7 py-4 rounded-full hover:bg-white transition-colors"
                >
                  Lire le guide complet <ArrowRight size={16} />
                </Link>
                <Link
                  href={categoryHref(CATEGORY_SLUGS.comparatifs)}
                  className="inline-flex items-center justify-center gap-2 glass glass-hover text-white font-semibold text-sm px-7 py-4 rounded-full transition-colors"
                >
                  Comparer les technologies
                </Link>
              </div>
            </div>

            {/* Signature : nœud orbital */}
            <div className="relative hidden lg:flex items-center justify-center h-[360px]" aria-hidden="true">
              <div className="absolute w-[360px] h-[360px] rounded-full border border-[var(--color-border-subtle)]" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-[var(--color-border-subtle)]" />
              <div className="absolute w-[160px] h-[160px] rounded-full border border-[var(--color-border-medium)]" />

              {/* Anneau + satellite */}
              <div className="absolute w-[360px] h-[360px] animate-orbit">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_16px_4px_rgba(0,212,255,0.6)]" />
              </div>
              <div className="absolute w-[260px] h-[260px] animate-orbit-rev">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-accent-blue)]" />
              </div>

              {/* Cœur */}
              <div className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center">
                <span className="absolute inline-flex w-full h-full rounded-2xl bg-[var(--color-accent-cyan)]/20 animate-ping-slow" />
                <Satellite className="text-[var(--color-accent-cyan)] relative" size={34} />
              </div>
            </div>
          </div>

          {/* Bandeau de specs — données de référence Starlink */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]">
            {[
              { icon: Gauge, k: "Débit descendant", v: "25–200", u: "Mbps" },
              { icon: Zap, k: "Latence typique", v: "25–50", u: "ms" },
              { icon: Satellite, k: "Satellites en orbite", v: "6 000+", u: "LEO" },
              { icon: Globe2, k: "Couverture", v: "100+", u: "pays" },
            ].map(({ icon: Icon, k, v, u }) => (
              <div key={k} className="bg-[var(--color-space-900)] p-5 md:p-6">
                <Icon size={18} className="text-[var(--color-accent-cyan)] mb-3" />
                <dd className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {v} <span className="text-sm text-[var(--color-text-muted)] font-normal">{u}</span>
                </dd>
                <dt className="text-xs text-[var(--color-text-secondary)] mt-1 uppercase tracking-wider">
                  {k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* ════════════════════ PAR OÙ COMMENCER ════════════════════ */}
        <SectionHeading eyebrow="Prise en main" title="Par où" accent="commencer ?" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StartCard
            href={articleHref(ARTICLE_SLUGS.guideComplet)}
            icon={<BookOpen size={26} />}
            title="Découvrir Starlink"
            text="Comment fonctionne l'internet par satellite de SpaceX, et s'il est fait pour vous."
            cta="Lire le guide"
          />
          <StartCard
            href={articleHref(ARTICLE_SLUGS.installation)}
            icon={<Settings size={26} />}
            title="Installer & configurer"
            text="Pas à pas : poser l'antenne, brancher le routeur et fiabiliser le WiFi."
            cta="Voir le tuto"
          />
          <StartCard
            href={articleHref(ARTICLE_SLUGS.maximiser)}
            icon={<Zap size={26} />}
            title="Maximiser les débits"
            text="Réduire le ping, supprimer les obstructions et pousser votre connexion."
            cta="Optimiser"
          />
        </div>

        <AdBanner slotId="auto-slot-1" position="in-feed" />

        {/* ════════════════════ COMPARATIFS ════════════════════ */}
        <SectionHeading
          eyebrow="Face à la concurrence"
          title="Starlink"
          accent="vs le reste"
          sub="Fibre, 4G/5G ou ADSL : quelle techno gagne selon votre situation ?"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CompareCard
            href={articleHref(ARTICLE_SLUGS.vsFibre)}
            img="/images/starlink-vs-fibre.png"
            title="Starlink vs Fibre optique"
          />
          <CompareCard
            href={articleHref(ARTICLE_SLUGS.vs4g5g)}
            img="/images/starlink-vs-5g.png"
            title="Starlink vs Box 4G / 5G"
          />
          <CompareCard
            href={articleHref(ARTICLE_SLUGS.vsAdsl)}
            img="/images/starlink-vs-adsl.png"
            title="Starlink vs ADSL"
          />
        </div>

        {/* ════════════════════ TARIFS ════════════════════ */}
        <SectionHeading
          eyebrow="Le nerf de la guerre"
          title="Combien coûte"
          accent="Starlink ?"
          sub="Un aperçu des offres actuelles pour situer votre budget avant de creuser."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PlanCard name="Résidentiel" price="40€" note="Données illimitées · matériel 349€" href={articleHref(ARTICLE_SLUGS.forfaits)} accent="cyan" />
          <PlanCard name="Itinérance" price="59€" note="Partout · mise en pause possible" href={articleHref(ARTICLE_SLUGS.prix)} accent="blue" />
          <PlanCard name="Maritime" price="289€" note="Priorité réseau · couverture océan" href={articleHref(ARTICLE_SLUGS.prix)} accent="purple" />
          <PlanCard name="Entreprise" price="93€" note="Bande passante prioritaire · IP publique" href={articleHref(ARTICLE_SLUGS.prix)} accent="green" />
        </div>
        <div className="text-center mt-8">
          <Link
            href={articleHref(ARTICLE_SLUGS.promo)}
            className="telemetry inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            Voir la promo en cours <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* ════════════════════ DERNIERS ARTICLES ════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="telemetry mb-2">Le flux</p>
              <h2 className="text-3xl font-bold">
                Derniers <span className="gradient-text">articles</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors"
            >
              Tout le blog <ArrowRight size={16} />
            </Link>
          </div>

          {latestArticles.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-center py-12">
              Les premiers articles arrivent très bientôt.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <article
                  key={article.id}
                  className="glass glass-hover rounded-2xl overflow-hidden group flex flex-col"
                >
                  <Link href={articleHref(article.slug)} className="block relative h-48 bg-[var(--color-space-700)] overflow-hidden">
                    {article.featured_image ? (
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/15">
                        <Satellite size={40} />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-white uppercase tracking-wider">
                      {article.categories?.name || "Général"}
                    </span>
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-[var(--color-text-muted)] mb-2">
                      {new Date(article.created_at).toLocaleDateString("fr-FR")} ·{" "}
                      {article.profiles?.full_name || "Rédaction"}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[var(--color-accent-cyan)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    <Link
                      href={articleHref(article.slug)}
                      className="text-sm font-medium text-[var(--color-accent-cyan)] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                    >
                      Lire la suite <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 text-center md:hidden">
            <Link href="/blog" className="telemetry inline-flex items-center gap-2">
              Tout le blog <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ════════════════════ CTA INDÉPENDANCE ════════════════════ */}
        <section className="mb-20 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-space-900)] overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[var(--color-accent-cyan)] opacity-[0.07] rounded-full blur-3xl" />
          <div className="relative px-8 py-12 md:p-16 max-w-3xl">
            <p className="telemetry mb-3">Notre parti pris</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Un guide indépendant, écrit par des utilisateurs.
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Zone blanche ADSL, van aménagé ou simple curieux : on teste, on mesure
              et on partage sans filtre. Aucun lien officiel avec SpaceX.
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-7 py-4 rounded-full hover:bg-[var(--color-accent-cyan)] transition-colors"
            >
              Notre démarche <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ──────────────── sous-composants ──────────────── */

function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
}) {
  return (
    <div className="pt-16 md:pt-20 pb-10 max-w-2xl">
      <p className="telemetry mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold">
        {title} <span className="gradient-text">{accent}</span>
      </h2>
      {sub && <p className="text-[var(--color-text-secondary)] mt-3">{sub}</p>}
    </div>
  );
}

function StartCard({
  href,
  icon,
  title,
  text,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="glass glass-hover p-7 rounded-2xl flex flex-col group transition-transform hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-[var(--color-accent-cyan)] mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-5 flex-grow">{text}</p>
      <span className="text-sm font-medium text-[var(--color-accent-cyan)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {cta} <ArrowRight size={14} />
      </span>
    </Link>
  );
}

function CompareCard({ href, img, title }: { href: string; img: string; title: string }) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] h-64"
    >
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-space-900)] via-[var(--color-space-900)]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--color-accent-cyan)] transition-colors">
          {title}
        </h3>
        <span className="text-sm text-gray-300 inline-flex items-center gap-1">
          Lire le match <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

function PlanCard({
  name,
  price,
  note,
  href,
  accent,
}: {
  name: string;
  price: string;
  note: string;
  href: string;
  accent: "cyan" | "blue" | "purple" | "green";
}) {
  const ring = {
    cyan: "hover:border-[var(--color-accent-cyan)]",
    blue: "hover:border-[var(--color-accent-blue)]",
    purple: "hover:border-[var(--color-accent-purple)]",
    green: "hover:border-[var(--color-accent-green)]",
  }[accent];
  const text = {
    cyan: "text-[var(--color-accent-cyan)]",
    blue: "text-[var(--color-accent-blue)]",
    purple: "text-[var(--color-accent-purple)]",
    green: "text-[var(--color-accent-green)]",
  }[accent];

  return (
    <Link
      href={href}
      className={`glass p-6 rounded-2xl border border-[var(--color-border-subtle)] ${ring} transition-colors flex flex-col`}
    >
      <span className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{name}</span>
      <span className={`text-3xl font-extrabold ${text} mb-3`}>
        {price} <span className="text-sm text-[var(--color-text-muted)] font-normal">/ mois</span>
      </span>
      <span className="text-sm text-[var(--color-text-secondary)] flex-grow">{note}</span>
      <span className="mt-5 text-sm font-medium text-white inline-flex items-center gap-1">
        En savoir plus <ArrowRight size={14} />
      </span>
    </Link>
  );
}
