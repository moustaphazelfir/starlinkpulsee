import Link from "next/link";
import { Globe } from "lucide-react";
import AdBanner from "./AdBanner";
import { createClient } from "@/lib/supabase/server";

export default async function Sidebar() {
  const supabase = await createClient();

  // Récupérer toutes les catégories
  const { data: categories } = await supabase.from("categories").select("id, name, slug");

  // Récupérer tous les articles publiés
  const { data: articles } = await supabase
    .from("articles")
    .select("category_id")
    .eq("status", "published");

  // Calculer le nombre d'articles par catégorie
  const categoryCounts = categories?.map((cat) => {
    return {
      ...cat,
      count: articles?.filter((a) => a.category_id === cat.id).length || 0,
    };
  }) || [];

  // Trier les catégories par nombre d'articles (décroissant)
  categoryCounts.sort((a, b) => b.count - a.count);

  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-8">
      {/* Widget: Bannière d'Affiliation Referral */}
      <div className="bg-gradient-to-br from-[var(--color-space-700)] to-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="text-[var(--color-accent-cyan)]" size={32} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Passez à Starlink</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Obtenez un mois de service gratuit en utilisant notre lien de parrainage exclusif.
        </p>
        <Link 
          href="https://starlink.com/residential?referral=RC-DF-10682548-20912-94" 
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-accent-cyan)] hover:text-white transition-colors text-sm"
        >
          Activer l'offre
        </Link>
      </div>

      {/* Widget: Catégories */}
      <div className="bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[var(--color-accent-blue)] rounded-full"></div> Catégories
        </h3>
        <ul className="space-y-3 text-sm">
          {categoryCounts.map((category) => (
            <li key={category.id}>
              <Link 
                href={`/categories/${category.slug}`} 
                className="flex justify-between text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors"
              >
                <span>{category.name}</span> 
                <span className="bg-[var(--color-space-700)] px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
          {categoryCounts.length === 0 && (
            <li className="text-[var(--color-text-muted)] text-xs text-center py-2">
              Aucune catégorie
            </li>
          )}
        </ul>
      </div>

      {/* ▓▓ AD SLOT: Sidebar Sticky Skyscraper ▓▓ */}
      <div className="sticky top-24">
        <div className="bg-[var(--color-space-900)]/50 border border-[var(--color-border-subtle)] rounded-2xl flex items-center justify-center min-h-[600px] overflow-hidden">
            <AdBanner slotId="sidebar-sticky" format="vertical" position="sidebar" className="w-full h-full m-0 p-4" />
        </div>
      </div>
    </aside>
  );
}
