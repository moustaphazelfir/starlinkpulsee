import Link from "next/link";
import { Search, Menu, X, ChevronDown, Facebook, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigation = [
    { name: "Accueil", href: "/" },
    {
      name: "Guides",
      href: "/tutoriels",
      items: [
        { name: "Guide complet Starlink", href: "/cest-quoi-starlink-internet-satellite/" },
        { name: "Installation & Config", href: "/installer-starlink-etape-par-etape/" },
        { name: "Tous les Tutoriels", href: "/tutoriels/" },
      ],
    },
    {
      name: "Prix & Forfaits",
      href: "#",
      items: [
        { name: "Tarifs Starlink 2026", href: "/prix-starlink-combien-coute-labonnement/" },
        { name: "Quel Forfait Choisir ?", href: "/forfait-starlink-residentiel-100-200-ou-max/" },
        { name: "Promotion en Cours", href: "/actualites" },
      ],
    },
    {
      name: "Comparatifs",
      href: "/comparatifs",
      items: [
        { name: "Starlink vs Fibre", href: "/starlink-vs-fibre-optique/" },
        { name: "Starlink vs 4G/5G", href: "/comparatif-starlink-vs-4g-5g-box/" },
        { name: "Starlink vs ADSL", href: "/starlink-vs-adsl-le-match-a-sens-unique/" },
        { name: "Tous les Comparatifs", href: "/comparatifs/" },
      ],
    },
    {
      name: "Équipements",
      href: "/accessoires-et-equipements",
      items: [
        { name: "Supports & Mâts", href: "/support-starlink-guide-fixations-installation/" },
        { name: "Box TV pour Starlink", href: "/quelle-box-tv-avec-starlink/" },
        { name: "Meilleurs Routeurs", href: "/meilleurs-routeurs-wi-fi-tiers-starlink/" },
      ],
    },
    { name: "Actualités", href: "/actualites" },
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
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="h-8 rounded-full border border-[var(--color-border-subtle)] bg-transparent pl-4 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)]">
                <Search size={14} />
              </button>
            </div>
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
               <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full h-10 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-space-700)] pl-4 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                    <Search size={18} />
                  </button>
                </div>
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
