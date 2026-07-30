"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Identifiants incorrects ou compte introuvable.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh(); // Rafraîchit le routeur pour que le middleware prenne le cookie en compte
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-space-900)] p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-cyan)]/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-blue)]/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md glass p-8 md:p-12 rounded-3xl border border-[var(--color-border-subtle)] relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[var(--color-space-800)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-[var(--color-border-subtle)]">
            <ShieldCheck size={32} className="text-[var(--color-accent-cyan)]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Espace Administrateur</h1>
          <p className="text-[var(--color-text-secondary)] text-sm">Veuillez vous identifier pour accéder au tableau de bord Starlink Ultra.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-[var(--color-text-muted)]" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
                placeholder="admin@starlinkpulsee.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-[var(--color-text-muted)]" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex justify-center items-center h-12"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Connexion"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
