-- ============================================================
-- Migration 0001 — Sécurité des commentaires + comptage des vues
-- À exécuter UNE FOIS dans Supabase > SQL Editor.
-- Corrige :
--   §4  Fuite des e-mails des commentateurs (author_email lisible publiquement)
--   §5  Compteur de vues cassé (fonction increment_view_count manquante)
-- ============================================================

-- ------------------------------------------------------------
-- §4 — Ne plus exposer author_email au public
-- ------------------------------------------------------------
-- 1. Retirer la policy qui rendait TOUTES les colonnes publiques.
DROP POLICY IF EXISTS "Les commentaires sont publics" ON public.comments;

-- 2. Seuls les administrateurs (authentifiés) peuvent lire la table brute
--    (qui contient author_email).
DROP POLICY IF EXISTS "Admins peuvent lire les commentaires" ON public.comments;
CREATE POLICY "Admins peuvent lire les commentaires"
  ON public.comments FOR SELECT
  USING (auth.role() = 'authenticated');

-- 3. Vue publique SANS l'e-mail, consommée par le front (CommentSection).
CREATE OR REPLACE VIEW public.comments_public
WITH (security_invoker = off) AS
  SELECT id, article_id, author_name, author_website, content, parent_id, created_at
  FROM public.comments;

GRANT SELECT ON public.comments_public TO anon, authenticated;

-- ------------------------------------------------------------
-- §5 — Compteur de vues fiable via une fonction SECURITY DEFINER
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.increment_view_count(article_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.articles
  SET views = COALESCE(views, 0) + 1
  WHERE id = article_id;
$$;

-- Autoriser l'appel de la fonction depuis le client public.
GRANT EXECUTE ON FUNCTION public.increment_view_count(UUID) TO anon, authenticated;
