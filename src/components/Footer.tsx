"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-[var(--color-space-900)] border-t border-[var(--color-border-subtle)] pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Colonne 1: À propos */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-[var(--color-accent-cyan)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Starlink Pulse
            </span>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
              Votre guide francophone indépendant sur l'internet par satellite. Nous vous aidons à choisir, installer et optimiser votre équipement Starlink.
            </p>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-accent-cyan)] transition-colors">Tous les articles</Link></li>
              <li><Link href="/categories/comparatifs" className="hover:text-[var(--color-accent-cyan)] transition-colors">Comparatifs</Link></li>
              <li><Link href="/a-propos" className="hover:text-[var(--color-accent-cyan)] transition-colors">À propos de nous</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Légal */}
          <div>
            <h4 className="text-white font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/mentions-legales" className="hover:text-[var(--color-accent-cyan)] transition-colors">Mentions légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-[var(--color-accent-cyan)] transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-accent-cyan)] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} Starlinkpulsee. Tous droits réservés. Ce site n'est pas affilié à SpaceX.
          </p>
          
          {/* BOUTON ADMIN DISSIMULÉ */}
          <Link 
            href="/admin/login" 
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-space-700)] hover:text-[var(--color-accent-cyan)] transition-colors opacity-30 hover:opacity-100"
            title="Espace Administrateur"
          >
            <ShieldAlert size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
