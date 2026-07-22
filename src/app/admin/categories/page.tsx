"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FolderTree, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function AdminCategoriesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setCategories(data);
    if (error) setError(error.message);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Generate slug
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // Add category
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    setError(null);

    const slug = generateSlug(newName);

    const { error: insertError } = await supabase
      .from('categories')
      .insert({ name: newName.trim(), slug });

    if (insertError) {
      setError(insertError.message);
    } else {
      setNewName("");
      await fetchCategories();
    }
    setLoading(false);
  };

  // Delete category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer la catégorie "${name}" ? Les articles associés ne seront pas supprimés.`)) return;

    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      await fetchCategories();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Gestion des Catégories</h1>
        <p className="text-[var(--color-text-secondary)] text-sm">Créez et gérez les catégories de vos articles.</p>
      </header>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Formulaire d'ajout */}
      <form onSubmit={handleAdd} className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom de la nouvelle catégorie..."
            className="flex-1 bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            <Plus size={18} /> Ajouter
          </button>
        </div>
        {newName && (
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Slug généré : <code className="text-[var(--color-accent-cyan)]">{generateSlug(newName)}</code>
          </p>
        )}
      </form>

      {/* Liste des catégories */}
      <div className="bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-subtle)] bg-white/[0.02] flex items-center gap-3">
          <FolderTree size={18} className="text-[var(--color-accent-cyan)]" />
          <h2 className="font-bold text-lg">Catégories existantes ({categories.length})</h2>
        </div>

        <div className="divide-y divide-[var(--color-border-subtle)]">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <div>
                <span className="font-medium text-white">{cat.name}</span>
                <span className="text-[var(--color-text-muted)] text-sm ml-3">/{cat.slug}</span>
              </div>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="px-6 py-8 text-center text-[var(--color-text-muted)]">
              Aucune catégorie. Créez-en une ci-dessus.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
