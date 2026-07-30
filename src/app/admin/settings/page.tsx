"use client";

import { useState } from "react";
import { Save, Settings, CheckCircle, Globe, FileText, Tag } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteTitle, setSiteTitle] = useState("Starlink Ultra - Votre guide indépendant Starlink");
  const [siteDescription, setSiteDescription] = useState("La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion par satellite.");
  const [siteKeywords, setSiteKeywords] = useState("Starlink, Internet par satellite, SpaceX, Tutoriels Starlink, Abonnement Starlink, Forfait Starlink, Antenne Starlink");
  const [adsenseId, setAdsenseId] = useState("");
  const [analyticsId, setAnalyticsId] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, on simule la sauvegarde
    // TODO: Sauvegarder dans Supabase quand une table "settings" sera créée
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Paramètres SEO & Configuration</h1>
        <p className="text-[var(--color-text-secondary)] text-sm">Gérez les métadonnées globales de votre site pour un meilleur référencement.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">

        {/* SEO Global */}
        <div className="glass p-6 md:p-8 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={20} className="text-[var(--color-accent-cyan)]" />
            <h2 className="text-xl font-bold text-white">SEO Global</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                <FileText size={14} className="inline mr-1" /> Titre du site (balise title)
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{siteTitle.length}/60 caractères recommandés</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                <FileText size={14} className="inline mr-1" /> Meta Description
              </label>
              <textarea
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                rows={3}
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors resize-none"
              ></textarea>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{siteDescription.length}/160 caractères recommandés</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                <Tag size={14} className="inline mr-1" /> Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={siteKeywords}
                onChange={(e) => setSiteKeywords(e.target.value)}
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Intégrations */}
        <div className="glass p-6 md:p-8 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3 mb-6">
            <Settings size={20} className="text-purple-400" />
            <h2 className="text-xl font-bold text-white">Intégrations</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Google AdSense - ID Éditeur</label>
              <input
                type="text"
                value={adsenseId}
                onChange={(e) => setAdsenseId(e.target.value)}
                placeholder="ca-pub-XXXXXXXXXX"
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Google Analytics - ID de mesure</label>
              <input
                type="text"
                value={analyticsId}
                onChange={(e) => setAnalyticsId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Bouton Sauvegarder */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]"
          >
            {isSaved ? (
              <><CheckCircle size={18} /> Sauvegardé !</>
            ) : (
              <><Save size={18} /> Sauvegarder</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
