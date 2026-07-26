"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, FolderTree, Settings, LogOut, Menu, X, Home } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On ne veut pas de la sidebar admin sur la page de connexion
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Nouvel Article", href: "/admin/editor", icon: FileText },
    { name: "Catégories", href: "/admin/categories", icon: FolderTree },
    { name: "Paramètres SEO", href: "/admin/settings", icon: Settings },
  ];

  const sidebarContent = (
    <>
      <div className="p-6">
        <Link href="/" className="text-[var(--color-accent-cyan)] font-bold tracking-widest uppercase text-sm block mb-8 hover:text-white transition-colors">
          STARLINKPULSEE
        </Link>
        <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold mb-4">Admin Panel</div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/admin");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[var(--color-accent-blue)] text-white shadow-lg shadow-blue-500/20" 
                    : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-[var(--color-border-subtle)]">
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-all w-full text-left mb-2"
        >
          <Home size={18} />
          <span className="font-medium text-sm">Retour au site</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all w-full text-left"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Déconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[var(--color-space-900)] flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[var(--color-space-800)] border-r border-[var(--color-border-subtle)] flex-col hidden md:flex fixed h-full z-10">
        {sidebarContent}
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--color-space-800)] border-b border-[var(--color-border-subtle)] flex items-center justify-between px-4 h-14">
        <Link href="/" className="text-[var(--color-accent-cyan)] font-bold tracking-widest uppercase text-xs">
          STARLINKPULSEE
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="md:hidden fixed top-14 left-0 bottom-0 w-72 bg-[var(--color-space-800)] border-r border-[var(--color-border-subtle)] z-50 flex flex-col overflow-y-auto animate-[slideIn_0.2s_ease-out]">
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-[var(--color-space-900)] min-h-screen p-4 md:p-8 pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}
