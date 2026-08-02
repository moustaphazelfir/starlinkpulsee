import Link from "next/link";
import { Plus, Edit2, Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Récupérer les articles
  const { data: articles } = await supabase
    .from('articles')
    .select(`
      *,
      categories ( name )
    `)
    .order('created_at', { ascending: false });

  // Statistiques
  const publishedCount = articles?.filter(a => a.status === 'published').length || 0;
  const draftsCount = articles?.filter(a => a.status === 'draft').length || 0;
  const totalViews = articles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;

  // Calculer les dates pour les requêtes
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000).toISOString();
  const since24h = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();

  // Requêtes pour les statistiques en temps réel
  const [
    { count: viewsToday },
    { count: viewsYesterday },
    { count: viewsLive },
    { count: commentsTotal },
    { count: commentsNew },
  ] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', yesterday).lt('created_at', today),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', fiveMinutesAgo),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }).gte('created_at', since24h),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Tableau de bord</h1>
          <p className="text-[var(--color-text-secondary)] text-sm">Gérez vos articles, catégories et surveillez votre trafic.</p>
        </div>
        <Link href="/admin/editor" className="bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors w-fit">
          <Plus size={18} /> Nouvel Article
        </Link>
      </header>

      {/* Trafic en Temps Réel */}
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Trafic en direct
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><Filter size={32} /></div>
          <div className="text-[var(--color-text-secondary)] text-xs font-medium mb-1 uppercase tracking-wider">Visiteurs (5 min)</div>
          <div className="text-3xl font-bold text-white flex items-end gap-2">
            {viewsLive || 0} <span className="text-sm font-normal text-green-400 animate-pulse">en ligne</span>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-xs font-medium mb-1 uppercase tracking-wider">Vues Aujourd'hui</div>
          <div className="text-3xl font-bold text-[var(--color-accent-cyan)]">{viewsToday || 0}</div>
        </div>
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-xs font-medium mb-1 uppercase tracking-wider">Vues Hier</div>
          <div className="text-3xl font-bold text-[var(--color-accent-blue)]">{viewsYesterday || 0}</div>
        </div>
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-xs font-medium mb-1 uppercase tracking-wider">Total Historique</div>
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">{totalViews.toLocaleString()}</div>
        </div>
      </div>

      {/* Gestion de Contenu */}
      <h2 className="text-xl font-bold text-white mb-4">Gestion de Contenu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass p-5 rounded-xl border border-[var(--color-border-subtle)] flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)] font-medium">Articles publiés</span>
          <span className="text-2xl font-bold text-white">{publishedCount}</span>
        </div>
        <div className="glass p-5 rounded-xl border border-[var(--color-border-subtle)] flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)] font-medium">Brouillons</span>
          <span className="text-2xl font-bold text-orange-400">{draftsCount}</span>
        </div>
        <Link
          href="/admin/comments"
          className="glass p-5 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-cyan)] transition-colors flex justify-between items-center group"
        >
          <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-white transition-colors">
            Commentaires
            {(commentsNew || 0) > 0 && (
              <span className="ml-2 text-xs font-bold text-green-400">+{commentsNew} récents</span>
            )}
          </span>
          <span className="text-2xl font-bold text-[var(--color-accent-cyan)]">{commentsTotal || 0}</span>
        </Link>
      </div>

      {/* Liste des articles */}
      <div className="bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.02]">
          <h2 className="font-bold text-lg">Vos Articles</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-space-900)]/50 text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)]">
              <tr>
                <th className="px-6 py-4 font-medium">Titre de l'article</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Vues</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {articles?.map((article) => (
                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate" title={article.title}>
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">
                    <span className="bg-[var(--color-space-700)] px-2 py-1 rounded-md text-xs">{article.categories?.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      {article.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">
                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{article.views}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/editor?id=${article.id}`} className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] bg-[var(--color-space-700)] rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <DeleteArticleButton articleId={article.id} title={article.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {(!articles || articles.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[var(--color-text-muted)]">
                    Aucun article trouvé. Cliquez sur "Nouvel Article" pour commencer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
