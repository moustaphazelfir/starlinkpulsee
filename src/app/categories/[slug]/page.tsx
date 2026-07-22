import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://starlinkpulsee.com';

/* ════════════════════════════════════════════════════
   SEO — Metadata dynamique par catégorie
   ════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from('categories')
    .select('name, slug')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!category) {
    return { title: 'Catégorie introuvable — Starlinkpulsee' };
  }

  const title = `${category.name} — Starlinkpulsee`;
  const description = `Retrouvez tous nos articles, guides et tests liés à la thématique "${category.name}" sur Starlinkpulsee.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/categories/${category.slug}`,
      siteName: 'Starlinkpulsee',
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  
  const supabase = await createClient();

  // Fetch the category
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) {
    notFound();
  }

  // Fetch articles for this category
  const { data: articles, error: artError } = await supabase
    .from('articles')
    .select(`
      id, title, slug, excerpt, created_at, featured_image,
      profiles ( full_name )
    `)
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const categoryArticles = articles || [];

  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Fil d'ariane (Breadcrumb) */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[var(--color-accent-cyan)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">{category.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <main className="w-full lg:w-3/4">
            
            <header className="mb-10 pb-6 border-b border-[var(--color-border-subtle)]">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Catégorie : <span className="gradient-text">{category.name}</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Retrouvez tous nos articles, guides et tests liés à la thématique "{category.name}".
              </p>
            </header>

            <div className="space-y-8">
              {categoryArticles.map((article: any) => (
                <article key={article.id} className="glass rounded-xl overflow-hidden group hover:border-[var(--color-border-medium)] transition-all flex flex-col md:flex-row">
                  {/* Image */}
                  <Link href={`/blog/${article.slug}`} className="block w-full md:w-1/3 h-48 md:h-auto bg-[var(--color-space-600)] relative overflow-hidden flex-shrink-0">
                    {article.featured_image ? (
                      <img src={article.featured_image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">Sans Image</div>
                    )}
                  </Link>
                  
                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
                      <Calendar size={14} /> <span>{new Date(article.created_at).toLocaleDateString('fr-FR')}</span> • <span>Par {article.profiles?.full_name || 'Admin'}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent-cyan)] transition-colors">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    <Link href={`/blog/${article.slug}`} className="text-sm font-medium text-[var(--color-accent-cyan)] flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      Lire la suite <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}

              {categoryArticles.length === 0 && (
                <div className="text-center py-16 text-[var(--color-text-secondary)]">
                  <p className="text-lg mb-4">Aucun article publié dans cette catégorie pour le moment.</p>
                  <Link href="/blog" className="text-[var(--color-accent-cyan)] hover:underline">
                    Voir tous les articles →
                  </Link>
                </div>
              )}
            </div>
          </main>

          <Sidebar />

        </div>
      </div>
    </div>
  );
}
