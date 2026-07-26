import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Calendar, User, Search, Satellite } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { articleHref } from "@/lib/site-links";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 8;

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  featured_image: string | null;
  categories: { name: string } | null;
  profiles: { full_name: string } | null;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const query = (q || "").trim();
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  let request = supabase
    .from("articles")
    .select(
      `id, title, slug, excerpt, created_at, featured_image,
       categories ( name ), profiles ( full_name )`,
      { count: "exact" }
    )
    .eq("status", "published");

  if (query) {
    request = request.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
  }

  const { data, count } = await request
    .order("created_at", { ascending: false })
    .range(from, to);

  const articles = (data as unknown as Article[]) || [];
  const total = count || 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-14">
          <p className="telemetry mb-3">Le blog</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5">
            {query ? (
              <>
                Résultats pour «&nbsp;<span className="gradient-text">{query}</span>&nbsp;»
              </>
            ) : (
              <>
                Tous les <span className="gradient-text">articles</span>
              </>
            )}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {query
              ? `${total} article${total > 1 ? "s" : ""} trouvé${total > 1 ? "s" : ""}.`
              : "Actualités, tutoriels et comparatifs pour tirer le meilleur de Starlink."}
          </p>

          {/* Recherche */}
          <form action="/blog" method="get" role="search" className="mt-8 max-w-md mx-auto relative">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un article…"
              aria-label="Rechercher un article"
              className="w-full h-12 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-space-900)] pl-5 pr-12 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-cyan)]"
            />
            <button type="submit" aria-label="Rechercher" className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)]">
              <Search size={18} />
            </button>
          </form>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-text-secondary)]">
            <Satellite size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg mb-2">Aucun article ne correspond.</p>
            {query && (
              <Link href="/blog" className="text-[var(--color-accent-cyan)] hover:underline">
                Voir tous les articles
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="glass glass-hover rounded-2xl overflow-hidden group flex flex-col"
              >
                <Link href={articleHref(article.slug)} className="relative block h-52 bg-[var(--color-space-700)] overflow-hidden">
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
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} /> {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={13} /> {article.profiles?.full_name || "Rédaction"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 leading-snug text-white group-hover:text-[var(--color-accent-cyan)] transition-colors line-clamp-2">
                    <Link href={articleHref(article.slug)}>{article.title}</Link>
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <Link
                    href={articleHref(article.slug)}
                    className="text-sm font-medium text-[var(--color-accent-cyan)] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                  >
                    Lire l&apos;article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination réelle */}
        {totalPages > 1 && (
          <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={buildHref(currentPage - 1)}
                className="h-11 px-4 inline-flex items-center gap-1 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-cyan)] transition-colors"
              >
                <ArrowLeft size={16} /> Précédent
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={buildHref(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`h-11 w-11 inline-flex items-center justify-center rounded-xl font-semibold transition-colors ${
                  p === currentPage
                    ? "bg-[var(--color-accent-blue)] text-white"
                    : "border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-cyan)]"
                }`}
              >
                {p}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={buildHref(currentPage + 1)}
                className="h-11 px-4 inline-flex items-center gap-1 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-cyan)] transition-colors"
              >
                Suivant <ArrowRight size={16} />
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
