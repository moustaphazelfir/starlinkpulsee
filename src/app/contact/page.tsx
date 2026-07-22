import Link from "next/link";
import { Mail, Send, User, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact - Starlinkpulsee",
  description: "Contactez l'équipe Starlinkpulsee pour toute question sur Starlink, suggestion d'article ou partenariat.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">Contact</span>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Nous <span className="gradient-text">Contacter</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Une question sur Starlink ? Une suggestion d'article ? Un partenariat ? N'hésitez pas à nous écrire.
          </p>
        </header>

        <div className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom complet *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={16} className="text-[var(--color-text-muted)]" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse e-mail *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={16} className="text-[var(--color-text-muted)]" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Sujet *</label>
              <select className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-all appearance-none">
                <option>Question sur Starlink</option>
                <option>Suggestion d'article</option>
                <option>Signaler une erreur</option>
                <option>Partenariat / Publicité</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Message *</label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <MessageSquare size={16} className="text-[var(--color-text-muted)]" />
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder="Décrivez votre demande..."
                  className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-10 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              >
                <Send size={18} /> Envoyer le message
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
          Vous pouvez aussi nous écrire directement à : <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)] hover:underline">contact@starlinkpulsee.com</a>
        </p>
      </div>
    </div>
  );
}
