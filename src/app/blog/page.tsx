import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const supabase = await createClient();

  // Fetch all published articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, excerpt, created_at, featured_image,
      categories ( name ),
      profiles ( full_name )
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const publishedArticles = articles || [];

  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Tous les <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Explorez l'intégralité de nos publications. Des actualités chaudes aux tutoriels pointus, tout ce qu'il faut savoir sur Starlink.
          </p>
        </header>

        {/* ══════════════════════════════════════════════════════
            GRILLE ALTERNÉE FULL-WIDTH
            ══════════════════════════════════════════════════════ */}
        <div className="space-y-12 md:space-y-24">
          {publishedArticles.map((article: any, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <article key={article.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center group`}>
                
                {/* Image */}
                <Link href={`/blog/${article.slug}`} className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl bg-[var(--color-space-700)] relative overflow-hidden border border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-cyan)] transition-colors flex-shrink-0">
                  {article.featured_image ? (
                    <img src={article.featured_image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xl">Sans Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-xs font-bold px-3 py-1.5 rounded text-white z-10 uppercase tracking-wider">
                    {article.categories?.name || 'Général'}
                  </div>
                </Link>
                
                {/* Texte */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.created_at).toLocaleDateString('fr-FR')}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {article.profiles?.full_name || 'Admin'}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors leading-tight">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  
                  <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-[var(--color-accent-cyan)] font-bold uppercase tracking-wider hover:gap-3 transition-all w-max">
                    Lire l'article <ArrowRight size={18} />
                  </Link>
                </div>

              </article>
            );
          })}

          {publishedArticles.length === 0 && (
            <div className="text-center py-24 text-[var(--color-text-secondary)]">
              Aucun article publié pour le moment.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-24 pt-12 border-t border-[var(--color-border-subtle)] flex justify-center gap-3">
          <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--color-accent-blue)] text-white font-bold text-lg">1</span>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-cyan)] text-[var(--color-text-secondary)] hover:text-white transition-colors text-lg">2</button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-cyan)] text-[var(--color-text-secondary)] hover:text-white transition-colors text-lg">3</button>
          <span className="w-12 h-12 flex items-center justify-center text-[var(--color-text-secondary)]">...</span>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-cyan)] text-[var(--color-text-secondary)] hover:text-white transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
