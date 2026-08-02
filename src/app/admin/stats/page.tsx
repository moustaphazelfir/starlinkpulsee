import { TrendingUp, CalendarDays, Globe2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LineChart, BarChart, CountryBars } from "@/components/admin/StatsCharts";

export const dynamic = "force-dynamic";

type DailyRow = { jour: string; vues: number };
type MonthlyRow = { mois: string; vues: number };
type CountryRow = { pays: string; vues: number };

export default async function AdminStatsPage() {
  const supabase = await createClient();

  const [dailyRes, monthlyRes, countryRes] = await Promise.all([
    supabase.rpc("views_daily", { days: 30 }),
    supabase.rpc("views_monthly", { months: 12 }),
    supabase.rpc("views_by_country", { days: 30 }),
  ]);

  // Si les fonctions n'existent pas encore, on invite à lancer la migration.
  const migrationMissing = !!dailyRes.error || !!monthlyRes.error || !!countryRes.error;

  const daily = (dailyRes.data as DailyRow[]) || [];
  const monthly = (monthlyRes.data as MonthlyRow[]) || [];
  const countries = (countryRes.data as CountryRow[]) || [];

  const dailyData = daily.map((d) => ({
    label: new Date(d.jour).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
    value: Number(d.vues),
  }));
  const monthlyData = monthly.map((m) => ({
    label: new Date(m.mois).toLocaleDateString("fr-FR", { month: "short" }),
    value: Number(m.vues),
  }));

  const total30 = dailyData.reduce((s, d) => s + d.value, 0);
  const best = dailyData.reduce((a, b) => (b.value > a.value ? b : a), { label: "—", value: 0 });

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <TrendingUp className="text-[var(--color-accent-cyan)]" /> Statistiques
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          Vues des articles par jour, par mois et par pays.
        </p>
      </header>

      {migrationMissing && (
        <div className="mb-8 bg-orange-500/10 border border-orange-500/40 text-orange-300 px-5 py-4 rounded-2xl flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong>Migration requise.</strong> Exécutez le fichier{" "}
            <code className="text-orange-200">supabase/migrations/0002_analytics.sql</code> dans
            Supabase → SQL Editor pour activer les courbes et le suivi par pays.
          </div>
        </div>
      )}

      {/* Résumé */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Vues (30 jours)</div>
          <div className="text-3xl font-bold text-[var(--color-accent-cyan)]">{total30.toLocaleString("fr-FR")}</div>
        </div>
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Meilleur jour</div>
          <div className="text-3xl font-bold text-white">{best.value}</div>
          <div className="text-xs text-[var(--color-text-muted)]">{best.label}</div>
        </div>
        <div className="glass p-5 rounded-2xl border border-[var(--color-border-subtle)]">
          <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Moyenne / jour</div>
          <div className="text-3xl font-bold text-[var(--color-accent-blue)]">
            {dailyData.length ? Math.round(total30 / dailyData.length) : 0}
          </div>
        </div>
      </div>

      {/* Courbe quotidienne */}
      <section className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-[var(--color-accent-cyan)]" /> Vues par jour (30 derniers jours)
        </h2>
        {total30 > 0 ? <LineChart data={dailyData} /> : <EmptyState />}
      </section>

      {/* Courbe mensuelle */}
      <section className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)] mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-[var(--color-accent-blue)]" /> Vues par mois (12 derniers mois)
        </h2>
        {monthlyData.some((m) => m.value > 0) ? <BarChart data={monthlyData} /> : <EmptyState />}
      </section>

      {/* Pays */}
      <section className="glass p-6 rounded-2xl border border-[var(--color-border-subtle)]">
        <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Globe2 size={18} className="text-[var(--color-accent-cyan)]" /> Pays des lecteurs (30 jours)
        </h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-5">
          Le pays est enregistré à partir de maintenant : les vues plus anciennes apparaissent en « Inconnu / historique ».
        </p>
        {countries.length ? <CountryBars data={countries} /> : <EmptyState />}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-10 text-center text-[var(--color-text-muted)] text-sm">
      Pas encore assez de données à afficher.
    </div>
  );
}
