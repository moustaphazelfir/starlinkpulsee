# Starlinkpulsee

Blog francophone indépendant dédié à l'internet par satellite **Starlink** (SpaceX) :
tutoriels, actualités, comparatifs, guides d'équipement. Monétisé via Google AdSense.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (palette « Deep Space » centralisée dans `src/app/globals.css`)
- **Supabase** (PostgreSQL + Auth) pour les articles, catégories, commentaires et analytics
- Déploiement cible : **Vercel**

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000.

## Variables d'environnement (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=...          # URL du projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     # Clé anon Supabase
NEXT_PUBLIC_SITE_URL=https://starlinkpulsee.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX   # optionnel
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                        # optionnel
```

## Base de données

1. Créer un projet Supabase.
2. Exécuter [`supabase_schema.sql`](supabase_schema.sql) dans **SQL Editor** (schéma complet).
3. Sur une base déjà en service, appliquer les migrations de [`supabase/migrations/`](supabase/migrations/).

## Structure

- `src/app/` — pages (App Router) : accueil, `blog`, `categories/[slug]`, `admin/*`
- `src/components/` — Header, Footer, Sidebar, AdBanner, CommentSection…
- `src/lib/supabase/` — clients Supabase (server / client)
- `src/lib/site-links.ts` — **source unique** des slugs référencés dans la navigation
- `src/proxy.ts` — protection des routes `/admin` (ex-`middleware`, renommé en Next 16)

## Administration

Espace admin protégé sur `/admin` (auth Supabase). Accès discret via l'icône en pied de page.
