import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from "next";

const Facebook = ({size = 18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({size = 18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Linkedin = ({size = 18}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

import AdBanner from "@/components/AdBanner";
import Sidebar from "@/components/Sidebar";
import CommentSection from "@/components/CommentSection";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://starlinkpulsee.com';

/* ════════════════════════════════════════════════════
   SEO — Metadata dynamique par article
   ════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const rawSlug = resolvedParams.slug;

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, featured_image, created_at, profiles ( full_name )')
    .eq('slug', rawSlug)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) {
    return { title: 'Article introuvable — Starlink Ultra' };
  }

  const title = `${article.title} — Starlink Ultra`;
  const description = article.excerpt || `Lisez "${article.title}" sur Starlink Ultra, votre guide francophone Starlink.`;
  const imageUrl = article.featured_image || `${SITE_URL}/images/og-default.png`;

  return {
    title,
    description,
    authors: [{ name: (article.profiles as { full_name?: string } | null)?.full_name || 'Starlink Ultra' }],
    openGraph: {
      title: article.title,
      description,
      url: `${SITE_URL}/blog/${rawSlug}`,
      siteName: 'Starlink Ultra',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${rawSlug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleSlug = resolvedParams.slug;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from('articles')
    .select(`
      *,
      categories ( name, slug ),
      profiles ( full_name )
    `)
    .eq('slug', articleSlug)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) {
    notFound();
  }

  // Calculate read time (approx 200 words per minute)
  const words = article.content?.trim().split(/\s+/).length || 0;
  const readTime = Math.ceil(words / 200) || 1;

  // Incrémenter le compteur de vues via la fonction SECURITY DEFINER (voir migration 0001).
  await supabase.rpc('increment_view_count', { article_id: article.id });

  // Ajouter la vue dans l'historique en temps réel (pour le dashboard admin)
  await supabase.from('page_views').insert([{ article_id: article.id, session_id: 'anonymous-server' }]);

  // JSON-LD Schema.org pour les résultats enrichis Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    image: article.featured_image || `${SITE_URL}/images/og-default.png`,
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': 'Person',
      name: article.profiles?.full_name || 'Starlink Ultra',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Starlink Ultra',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${articleSlug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: article.categories?.name || 'Général', item: `${SITE_URL}/categories/${article.categories?.slug || 'general'}` },
      { '@type': 'ListItem', position: 4, name: article.title },
    ],
  };

  return (
    <>
      {/* JSON-LD pour les Rich Snippets Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[var(--color-space-800)] pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Fil d'ariane (Breadcrumb) */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[var(--color-accent-cyan)] transition-colors">Blog</Link>
          <span>/</span>
          <Link href={`/categories/${article.categories?.slug || 'general'}`} className="hover:text-[var(--color-accent-cyan)] transition-colors">{article.categories?.name || 'Général'}</Link>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ══════════════════════════════════════════════════════
              COLONNE PRINCIPALE (Article - 75%)
              ══════════════════════════════════════════════════════ */}
          <main className="w-full lg:w-3/4">
            
            {/* Header de l'article */}
            <header className="mb-10">
              <div className="inline-block px-3 py-1 bg-blue-500/10 text-[var(--color-accent-blue)] border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {article.categories?.name || 'Général'}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-border-subtle)] pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-space-600)] flex items-center justify-center text-white font-bold">
                    {(article.profiles?.full_name || 'Admin').charAt(0)}
                  </div>
                  <span className="font-medium text-[var(--color-text-primary)]">{article.profiles?.full_name || 'Admin'}</span>
                </div>
                <div className="flex items-center gap-1"><Calendar size={16} /> {new Date(article.created_at).toLocaleDateString('fr-FR')}</div>
                <div className="flex items-center gap-1"><Clock size={16} /> Lecture : {readTime} min</div>
                <div className="flex items-center gap-1 hover:text-[var(--color-accent-cyan)] cursor-pointer transition-colors"><MessageSquare size={16} /> Commentaires</div>
              </div>
            </header>

            {/* Image mise en avant */}
            <div className="w-full h-[300px] md:h-[500px] rounded-2xl bg-[var(--color-space-700)] relative overflow-hidden mb-12 border border-[var(--color-border-subtle)]">
              {article.featured_image ? (
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xl">
                  Image de couverture
                </div>
              )}
            </div>

            {/* Contenu de l'article (Prose) avec ReactMarkdown */}
            <article className="prose-space max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || ''}</ReactMarkdown>

              {/* ▓▓ AD SLOT: In-Article 1 ▓▓ */}
              <AdBanner slotId="in-article-1" format="auto" position="in-article" className="my-10 bg-white/5 border border-white/10 rounded-lg p-4" />

            </article>

            {/* Partage Social */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
              <span className="text-[var(--color-text-secondary)] font-medium">Partager cet article :</span>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#3B5998]/10 text-[#3B5998] hover:bg-[#3B5998] hover:text-white flex items-center justify-center transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-colors">
                  <Linkedin size={18} />
                </button>
              </div>
            </div>

            {/* Espace Commentaires Dynamique */}
            <CommentSection articleId={article.id} />

          </main>

          <Sidebar />

        </div>
      </div>
    </div>
    </>
  );
}
