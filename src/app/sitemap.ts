import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://starlinkpulsee.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Récupérer tous les articles publiés
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, created_at, updated_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Récupérer toutes les catégories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug');

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politique-de-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Pages articles
  const articlePages: MetadataRoute.Sitemap = (articles || []).map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updated_at || article.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Pages catégories
  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...categoryPages];
}
