"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown, Satellite, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ARTICLE_SLUGS,
  CATEGORY_SLUGS,
  articleHref,
  categoryHref,
} from "@/lib/site-links";

const Facebook = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const REFERRAL_URL = "https://starlink.com/residential?referral=RC-DF-10682548-20912-94";

type SubItem = { name: string; href: string; desc?: string };
type NavItem = { name: string; href: string; items?: SubItem[] };

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

  const navigation: NavItem[] = [
    { name: "Accueil", href: "/" },
    {
      name: "Découvrir",
      href: categoryHref(CATEGORY_SLUGS.tutoriels),
      items: [
        { name: "Le guide Starlink de A à Z", href: articleHref(ARTICLE_SLUGS.guideComplet), desc: "Tout comprendre en une lecture" },
        { name: "Poser son antenne pas à pas", href: articleHref(ARTICLE_SLUGS.installation), desc: "Installation guidée en 30 min" },
        { name: "Toute la rubrique tutoriels", href: categoryHref(CATEGORY_SLUGS.tutoriels), desc: "Nos guides pratiques" },
      ],
    },
    {
      name: "Tarifs",
      href: articleHref(ARTICLE_SLUGS.prix),
      items: [
        { name: "Combien ça coûte en 2026", href: articleHref(ARTICLE_SLUGS.prix), desc: "Offres, coûts et abonnements" },
        { name: "100, 200 ou MAX ?", href: articleHref(ARTICLE_SLUGS.forfaits), desc: "Trouver le bon forfait" },
        { name: "La promo du moment", href: articleHref(ARTICLE_SLUGS.promo), desc: "Bon plan ou fausse bonne idée" },
      ],
    },
    {
      name: "Face à face",
      href: categoryHref(CATEGORY_SLUGS.comparatifs),
      items: [
        { name: "Face à la fibre", href: articleHref(ARTICLE_SLUGS.vsFibre), desc: "Satellite contre très haut débit" },
        { name: "Face à la 4G / 5G", href: articleHref(ARTICLE_SLUGS.vs4g5g), desc: "Quelle solution sans fibre ?" },
        { name: "Face à l'ADSL", href: articleHref(ARTICLE_SLUGS.vsAdsl), desc: "Le duel à sens unique" },
        { name: "Tous les duels", href: categoryHref(CATEGORY_SLUGS.comparatifs), desc: "Nos comparatifs complets" },
      ],
    },
    {
      name: "Matériel",
      href: categoryHref(CATEGORY_SLUGS.equipements),
      items: [
        { name: "Fixations & supports", href: articleHref(ARTICLE_SLUGS.support), desc: "Poser l'antenne durablement" },
        { name: "Box TV compatibles", href: articleHref(ARTICLE_SLUGS.boxTv), desc: "Streamer sans accroc" },
        { name: "Routeurs Wi-Fi", href: articleHref(ARTICLE_SLUGS.routeurs), desc: "Diffuser le signal partout" },
      ],
    },
    { name: "Actus", href: categoryHref(CATEGORY_SLUGS.actualites) },
    { name: "Le blog", href: "/blog" },
  ];

  const toggleDropdown = (name: string) =>
    setOpenDropdown((cur) => (cur === name ? null : name));

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname === item.href) return true;
    if (item.items?.some((s) => s.href === pathname)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-space-900)]/85 backdrop-blur-xl">
      {/* Barre supérieure — réseaux & recherche (masquée sur mobile) */}
      <div className="hidden border-b border-[var(--color-border-subtle)] md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Le guide indépendant Starlink · 2026
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors" aria-label="Facebook"><Facebook size={15} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors" aria-label="Twitter"><Twitter size={15} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors" aria-label="YouTube"><Youtube size={15} /></a>
            </div>
            <form onSubmit={handleSearch} className="relative" role="search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                aria-label="Rechercher un article"
                className="h-7 w-44 rounded-full border border-[var(--color-border-subtle)] bg-transparent pl-4 pr-9 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:w-56 focus:border-[var(--color-accent-cyan)] focus:outline-none transition-all"
              />
              <button type="submit" aria-label="Lancer la recherche" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)]">
                <Search size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo Starlink Ultra */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Starlink Ultra — accueil">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-blue)] text-[var(--color-space-900)] shadow-[0_0_18px_rgba(0,212,255,0.35)]">
              <Satellite size={18} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">
              Starlink
              <span className="ml-1 align-middle text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/40 rounded px-1.5 py-0.5">
                Ultra
              </span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.items ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item)
                        ? "text-[var(--color-accent-cyan)]"
                        : "text-[var(--color-text-secondary)] hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors block ${
                      isActive(item)
                        ? "text-[var(--color-accent-cyan)]"
                        : "text-[var(--color-text-secondary)] hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.items && (
                  <div className="absolute left-0 top-full hidden w-72 pt-3 group-hover:block">
                    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-space-800)]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/40">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block rounded-xl px-3 py-2.5 hover:bg-white/[0.04] transition-colors group/sub"
                        >
                          <span className="block text-sm font-medium text-white group-hover/sub:text-[var(--color-accent-cyan)] transition-colors">
                            {sub.name}
                          </span>
                          {sub.desc && (
                            <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{sub.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-2">
            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-[var(--color-space-900)] text-xs font-bold px-4 py-2 hover:bg-[var(--color-accent-cyan)] transition-colors"
            >
              Offre Starlink <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-[var(--color-text-primary)] p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Ouvrir le menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Nav mobile */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--color-border-subtle)]">
            <form onSubmit={handleSearch} className="relative mb-4 px-1" role="search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article…"
                aria-label="Rechercher un article"
                className="w-full h-11 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-space-800)] pl-4 pr-11 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-cyan)]"
              />
              <button type="submit" aria-label="Lancer la recherche" className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                <Search size={18} />
              </button>
            </form>

            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.items ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-[var(--color-text-primary)] hover:bg-white/5"
                        aria-expanded={openDropdown === item.name}
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="mt-1 space-y-1 pl-4 border-l border-[var(--color-border-subtle)] ml-3">
                          {item.items.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-accent-cyan)]"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-[var(--color-text-primary)] hover:bg-white/5 hover:text-[var(--color-accent-cyan)]"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-white text-[var(--color-space-900)] text-sm font-bold px-4 py-3 hover:bg-[var(--color-accent-cyan)] transition-colors"
            >
              Découvrir l&apos;offre Starlink <ArrowUpRight size={16} />
            </a>

            <div className="mt-5 flex justify-center gap-6">
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
