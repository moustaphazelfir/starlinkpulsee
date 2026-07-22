import Link from "next/link";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Récupérer les articles
  const { data: articles, error } = await supabase
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

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Tableau de bord</h1>
          <p className="text-[var(--color-text-secondary)] text-sm">Gérez vos articles, catégories et paramètres depuis cet espace.</p>
        </div>
        <Link href="/admin/editor" className="bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors w-fit">
          <Plus size={18} /> Nouvel Article
        </Link>
      </header>

      {/* Statistiques Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Articles publiés</div>
          <div className="text-3xl font-bold text-white">{publishedCount}</div>
        </div>
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Vues totales</div>
          <div className="text-3xl font-bold text-[var(--color-accent-cyan)]">{totalViews.toLocaleString()}</div>
        </div>
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">Brouillons en attente</div>
          <div className="text-3xl font-bold text-orange-400">{draftsCount}</div>
        </div>
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
