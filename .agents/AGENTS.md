<!-- BEGIN:starlinkpulsee-design-rules -->
# Règles de Design et d'Architecture : Starlinkpulsee

Ce projet utilise une esthétique très spécifique appelée "Deep Space Tech" et des choix architecturaux précis. Tout code généré pour ce projet DOIT respecter les règles suivantes :

## 1. Esthétique & Design (Deep Space Tech)
- **Palette de couleurs strictes** : Ne jamais utiliser de couleurs génériques (`red-500`, `blue-500`). Utilisez les variables CSS définies dans `globals.css` :
  - Fonds : `var(--color-space-900)`, `var(--color-space-800)`, `var(--color-space-700)`.
  - Accents : `var(--color-accent-cyan)` (`#00D4FF`), `var(--color-accent-blue)`.
  - Textes : `var(--color-text-primary)` (blanc), `var(--color-text-secondary)` (gris clair), `var(--color-text-muted)` (gris foncé).
- **Glassmorphism** : Utilisez la classe utilitaire `.glass` pour les encarts, les cartes d'articles et les formulaires.
- **Typographie** : La police principale est `Inter`, la police monospace est `Fira Code`. Maintenir une hiérarchie visuelle très marquée (ex: titres en `font-extrabold`).
- **Gradients** : Utilisez la classe `.gradient-text` pour mettre en valeur des mots clés importants dans les grands titres.

## 2. Architecture & Composants
- **Next.js 14+ (App Router)** : Toujours privilégier les Server Components. Ajoutez `"use client";` au sommet du fichier UNIQUEMENT si le composant nécessite des hooks React (`useState`, `useEffect`, etc.).
- **Icônes (Lucide React)** : Utilisez `lucide-react` par défaut. ATTENTION : les icônes de marques (Facebook, Twitter, Youtube, Linkedin) n'existent pas dans Lucide. Elles doivent être créées manuellement en tant que composants SVG.
- **Publicité (AdSense)** : Ne jamais utiliser directement la balise `<ins class="adsbygoogle">`. TOUJOURS utiliser le wrapper sécurisé `<AdBanner />` pour éviter les crashs React Strict Mode.

## 3. Base de Données (Supabase)
- Toutes les opérations de lecture publiques doivent se faire côté Serveur si possible, via `src/lib/supabase/server.ts`.
- L'Espace Administrateur (`/admin/*`) est protégé par `src/middleware.ts`. Ne jamais exposer de données sensibles en dehors de cette zone.
<!-- END:starlinkpulsee-design-rules -->
