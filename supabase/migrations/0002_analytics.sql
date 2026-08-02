-- ============================================================
-- Migration 0002 — Statistiques admin (courbes + pays)
-- À exécuter UNE FOIS dans Supabase > SQL Editor.
-- Ajoute :
--   • une colonne `country` sur page_views (géoloc, remplie pour les NOUVELLES vues)
--   • des fonctions d'agrégation pour les courbes jour/mois et le top pays
-- ============================================================

-- 1) Colonne pays (code ISO type "FR", "CI", "SN"…), NULL pour les vues déjà en base.
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS country TEXT;
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at);

-- 2) Vues par jour sur N jours (jours sans vue = 0, pour une courbe continue).
CREATE OR REPLACE FUNCTION public.views_daily(days INT DEFAULT 30)
RETURNS TABLE(jour DATE, vues BIGINT)
LANGUAGE sql STABLE
AS $$
  SELECT g.d::date AS jour, count(pv.id) AS vues
  FROM generate_series((current_date - (days - 1)), current_date, interval '1 day') g(d)
  LEFT JOIN public.page_views pv ON pv.created_at::date = g.d::date
  GROUP BY g.d
  ORDER BY g.d;
$$;

-- 3) Vues par mois sur N mois.
CREATE OR REPLACE FUNCTION public.views_monthly(months INT DEFAULT 12)
RETURNS TABLE(mois DATE, vues BIGINT)
LANGUAGE sql STABLE
AS $$
  SELECT g.d::date AS mois, count(pv.id) AS vues
  FROM generate_series(
         date_trunc('month', current_date) - ((months - 1) || ' months')::interval,
         date_trunc('month', current_date),
         interval '1 month'
       ) g(d)
  LEFT JOIN public.page_views pv ON date_trunc('month', pv.created_at) = g.d
  GROUP BY g.d
  ORDER BY g.d;
$$;

-- 4) Top pays sur N jours (Inconnu = vues sans géoloc, dont l'historique).
CREATE OR REPLACE FUNCTION public.views_by_country(days INT DEFAULT 30)
RETURNS TABLE(pays TEXT, vues BIGINT)
LANGUAGE sql STABLE
AS $$
  SELECT coalesce(nullif(country, ''), 'Inconnu') AS pays, count(id) AS vues
  FROM public.page_views
  WHERE created_at >= (current_date - (days - 1))
  GROUP BY coalesce(nullif(country, ''), 'Inconnu')
  ORDER BY vues DESC
  LIMIT 20;
$$;

-- Ces fonctions respectent la RLS (SECURITY INVOKER) : seules les sessions admin
-- (authenticated) obtiennent des résultats. On autorise leur appel.
GRANT EXECUTE ON FUNCTION public.views_daily(INT)      TO authenticated;
GRANT EXECUTE ON FUNCTION public.views_monthly(INT)    TO authenticated;
GRANT EXECUTE ON FUNCTION public.views_by_country(INT) TO authenticated;
