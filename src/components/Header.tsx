"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ARTICLE_SLUGS,
  CATEGORY_SLUGS,
  articleHref,
  categoryHref,
} from "@/lib/site-links";

const Facebook = ({size = 16}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({size = 16}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({size = 16}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  if (pathname?.startsWith("/admin")) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setIsMenuOpen(false);
    router.push(`/blog?q=${encodeURIComponent(q)}`);
  };

  const navigation = [
    { name: "Accueil", href: "/" },
    {
      name: "Guides",
      href: categoryHref(CATEGORY_SLUGS.tutoriels),
      items: [
        { name: "Guide complet Starlink", href: articleHref(ARTICLE_SLUGS.guideComplet) },
        { name: "Installation & Config", href: articleHref(ARTICLE_SLUGS.installation) },
        { name: "Tous les tutoriels", href: categoryHref(CATEGORY_SLUGS.tutoriels) },
      ],
    },
    {
      name: "Prix & Forfaits",
      href: articleHref(ARTICLE_SLUGS.prix),
      items: [
        { name: "Tarifs Starlink 2026", href: articleHref(ARTICLE_SLUGS.prix) },
        { name: "Quel forfait choisir ?", href: articleHref(ARTICLE_SLUGS.forfaits) },
        { name: "Promotion en cours", href: articleHref(ARTICLE_SLUGS.promo) },
      ],
    },
    {
      name: "Comparatifs",
      href: categoryHref(CATEGORY_SLUGS.comparatifs),
      items: [
        { name: "Starlink vs Fibre", href: articleHref(ARTICLE_SLUGS.vsFibre) },
        { name: "Starlink vs 4G/5G", href: articleHref(ARTICLE_SLUGS.vs4g5g) },
        { name: "Starlink vs ADSL", href: articleHref(ARTICLE_SLUGS.vsAdsl) },
        { name: "Tous les comparatifs", href: categoryHref(CATEGORY_SLUGS.comparatifs) },
      ],
    },
    {
      name: "Équipements",
      href: categoryHref(CATEGORY_SLUGS.equipements),
      items: [
        { name: "Supports & mâts", href: articleHref(ARTICLE_SLUGS.support) },
        { name: "Box TV pour Starlink", href: articleHref(ARTICLE_SLUGS.boxTv) },
        { name: "Meilleurs routeurs", href: articleHref(ARTICLE_SLUGS.routeurs) },
      ],
    },
    { name: "Actualités", href: categoryHref(CATEGORY_SLUGS.actualites) },
    { name: "Tous les articles", href: "/blog" },
  ];

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-space-900)]/80 backdrop-blur-md">
      {/* Top Bar - Socials & Search (Hidden on Mobile) */}
      <div className="hidden border-b border-[var(--color-border-subtle)] md:block">
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#3B5998] transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#FF0000] transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
          
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative" role="search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article…"
                aria-label="Rechercher un article"
                className="h-8 rounded-full border border-[var(--color-border-subtle)] bg-transparent pl-4 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
              />
              <button type="submit" aria-label="Lancer la recherche" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)]">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              Starlink<span className="text-[var(--color-accent-cyan)]">pulsee</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.items ? (
                  <button
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-cyan)] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-cyan)] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.items && (
                  <div className="absolute left-0 top-full hidden w-56 pt-2 group-hover:block">
                    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-space-800)] py-2 shadow-xl">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-space-700)] hover:text-[var(--color-accent-cyan)]"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--color-text-primary)] p-2 hover:bg-[var(--color-space-700)] rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border-subtle)]">
            <div className="mb-4 px-2">
               <form onSubmit={handleSearch} className="relative" role="search">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un article…"
                    aria-label="Rechercher un article"
                    className="w-full h-10 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-space-700)] pl-4 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  />
                  <button type="submit" aria-label="Lancer la recherche" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                    <Search size={18} />
                  </button>
                </form>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <div key={item.name} className="px-2">
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-space-700)] hover:text-[var(--color-accent-cyan)]"
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="mt-1 space-y-1 pl-6">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-space-700)] hover:text-[var(--color-accent-cyan)]"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-space-700)] hover:text-[var(--color-accent-cyan)]"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="mt-6 flex justify-center space-x-6 px-4">
               <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#3B5998]"><Facebook size={20} /></a>
               <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#1DA1F2]"><Twitter size={20} /></a>
               <a href="#" className="text-[var(--color-text-secondary)] hover:text-[#FF0000]"><Youtube size={20} /></a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
