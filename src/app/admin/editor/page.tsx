"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, CheckCircle, AlertCircle, UploadCloud } from "lucide-react";
import { useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminEditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Chargement de l'éditeur...</div>}>
      <AdminEditor />
    </Suspense>
  );
}

function AdminEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams?.get('id');

  const supabase = createClient();
  
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isUploadingInline, setIsUploadingInline] = useState(false);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*');
      if (data) {
        setCategories(data);
        if (data.length > 0 && !categoryId) setCategoryId(data[0].id);
      }
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch article if editing
  useEffect(() => {
    async function fetchArticle() {
      if (!articleId) return;
      const { data } = await supabase.from('articles').select('*').eq('id', articleId).single();
      if (data) {
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setCategoryId(data.category_id || "");
        setContent(data.content || "");
        setExcerpt(data.excerpt || "");
        if (data.featured_image) setImagePreview(data.featured_image);
      }
    }
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  // G\u00e9n\u00e8re un slug SEO \u00e0 partir d'un titre.
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enl\u00e8ve les accents
      .replace(/[^a-z0-9]+/g, "-") // Non-alphanum\u00e9rique -> tiret
      .replace(/(^-|-$)+/g, ""); // Tirets en d\u00e9but/fin

  // Met \u00e0 jour le titre (et le slug tant qu'on cr\u00e9e un nouvel article).
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!articleId) setSlug(slugify(value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingInline(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `inline_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw new Error("Erreur lors de l'upload de l'image.");
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      // Ajouter le code markdown de l'image à la fin du contenu actuel
      const imageMarkdown = `\n\n![Image](${publicUrl})\n\n`;
      setContent((prev) => prev + imageMarkdown);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload de l'image.");
    } finally {
      setIsUploadingInline(false);
      // Réinitialiser l'input pour pouvoir uploader la même image si besoin
      if (inlineImageInputRef.current) {
        inlineImageInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent, status: 'draft' | 'published' = 'published') => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Vous devez être connecté.");

      let featured_image = "";

      // 1. Upload Image si elle existe
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) throw new Error("Erreur lors de l'upload de l'image.");
        
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
        featured_image = publicUrlData.publicUrl;
      }

      // 2. Créer l'extrait (excerpt) si vide (prendre les 150 premiers caractères)
      const finalExcerpt = excerpt || content.substring(0, 150) + "...";

      // 3. Insérer ou Mettre à jour dans la base de données
      const articleData: {
        title: string;
        slug: string;
        category_id: string;
        author_id: string;
        content: string;
        excerpt: string;
        status: 'draft' | 'published';
        featured_image?: string;
      } = {
        title,
        slug,
        category_id: categoryId,
        author_id: userData.user.id,
        content,
        excerpt: finalExcerpt,
        status
      };

      if (featured_image) {
        articleData.featured_image = featured_image;
      }

      let saveError;
      if (articleId) {
        // Mode édition
        const { error } = await supabase.from('articles').update(articleData).eq('id', articleId);
        saveError = error;
      } else {
        // Mode création
        const { error } = await supabase.from('articles').insert(articleData);
        saveError = error;
      }

      if (saveError) throw saveError;

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        router.push("/admin");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 bg-[var(--color-space-800)] rounded-lg text-[var(--color-text-secondary)] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {articleId ? "Modifier l'article" : "Créer un article"}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm">Rédigez votre contenu. Il sera sauvegardé dans Supabase.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={(e) => handleSave(e, 'published')} className="space-y-6">
        
        {/* Titre et Catégorie */}
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Titre de l'article *</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white font-bold text-lg focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
              placeholder="Ex: Starlink lance un nouveau forfait..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Catégorie *</label>
              <select 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors appearance-none"
                required
              >
                <option value="" disabled>Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Slug SEO (URL générée)</label>
              <input 
                type="text" 
                value={slug}
                className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-[var(--color-text-muted)] cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Image de couverture */}
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] relative overflow-hidden">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Image de couverture</label>
          <div className="relative border-2 border-dashed border-[var(--color-border-medium)] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer bg-[var(--color-space-900)]/50 min-h-[200px]">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {imagePreview ? (
              // Aperçu d'un fichier local (blob) ou d'une URL distante : next/image inadapté ici.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Aperçu de l'image de couverture" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-50" />
            ) : (
              <>
                <div className="w-12 h-12 bg-[var(--color-space-800)] rounded-full flex items-center justify-center mb-3 text-[var(--color-text-secondary)]">
                  <ImageIcon size={24} />
                </div>
                <p className="text-white font-medium mb-1">Cliquez pour uploader une image</p>
                <p className="text-xs text-[var(--color-text-muted)]">PNG, JPG, WebP (Max 2MB)</p>
              </>
            )}
            {imagePreview && (
              <div className="z-20 text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Changer l'image</div>
            )}
          </div>
        </div>

        {/* Extrait */}
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Extrait (Optionnel)</label>
          <textarea 
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors h-24 resize-none"
            placeholder="Court résumé de l'article pour la page d'accueil (généré automatiquement sinon)."
          ></textarea>
        </div>

        {/* Éditeur de texte */}
        <div className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-border-subtle)]">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Contenu de l'article</label>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[var(--color-text-muted)] hidden md:inline">Markdown supporté</span>
              
              {/* Bouton d'upload d'image inline */}
              <input 
                type="file" 
                accept="image/*" 
                ref={inlineImageInputRef}
                onChange={handleInlineImageUpload}
                className="hidden" 
              />
              <button 
                type="button"
                onClick={() => inlineImageInputRef.current?.click()}
                disabled={isUploadingInline}
                className="flex items-center gap-2 bg-[var(--color-space-800)] hover:bg-[var(--color-space-700)] border border-[var(--color-border-subtle)] text-[var(--color-accent-cyan)] text-sm px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {isUploadingInline ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <UploadCloud size={16} />
                )}
                <span className="font-medium">Insérer une image</span>
              </button>
            </div>
          </div>
          <textarea 
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors min-h-[400px] resize-y"
            placeholder="Écrivez votre contenu ici (Supporte le format Markdown : **gras**, # Titre, [lien](url))..."
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6">
          <button 
            type="button" 
            onClick={(e) => handleSave(e, 'draft')}
            disabled={loading}
            className="text-[var(--color-text-secondary)] hover:text-white font-medium px-4 py-2 transition-colors disabled:opacity-50"
          >
            Enregistrer comme brouillon
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)] disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : isSaved ? (
              <><CheckCircle size={18} /> Publié !</>
            ) : (
              <><Save size={18} /> Publier l'article</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
