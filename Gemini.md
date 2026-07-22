# Cahier des Charges & Architecture : Starlinkpulsee

Ce document (Gemini.md) sert de carte de référence pour l'application **Starlinkpulsee**. Il résume l'architecture technique, les choix de conception, le modèle de données, et l'arborescence du projet. 
Il doit être consulté par tout développeur ou agent IA (comme moi, Gemini) travaillant sur le projet afin de comprendre instantanément l'âme et le fonctionnement du site.

---

## 1. Vision et Objectifs
**Starlinkpulsee** est un blog francophone de niche dédié à la connexion internet par satellite Starlink (SpaceX).
- **Inspiration** : Le site original StarlinkPulse.com (l'objectif était de "copier l'âme en l'améliorant").
- **Modèle économique** : Monétisation via la publicité **Google AdSense**. Le placement des publicités est réfléchi dès la conception (Sidebar collante, en-tête, au milieu des articles).
- **Esthétique** : Thème "Deep Space" sombre. Noir profond, bordures subtiles (`glassmorphism`), accents bleus et cyans (`#00D4FF`), polices modernes (`Inter` et `Fira Code`).

---

## 2. Stack Technique
- **Framework** : Next.js 14+ (App Router).
- **Langage** : TypeScript.
- **Styling** : Tailwind CSS v4. L'utilisation de Tailwind est centralisée dans `globals.css` avec des variables CSS (`--color-space-900`, etc.) pour maintenir la cohérence de la palette Deep Space.
- **Base de Données & Auth** : Supabase (PostgreSQL + GoTrue Auth).
- **Icônes** : `lucide-react` (avec des composants SVG personnalisés pour les réseaux sociaux comme Facebook, Twitter, YouTube car ils ne sont pas inclus nativement).
- **Hébergement cible** : Vercel.

---

## 3. Architecture des Pages (Frontend Public)

### Le Layout Global (`/app/layout.tsx`)
Il enveloppe toutes les pages avec un `<Header>` de navigation, un espace dédié au AdSense Leaderboard (haut de page), le `{children}` central, et un `<Footer>` (qui contient un bouton secret d'accès Admin).

### La Page d'Accueil (`/`)
- **Hero Section** : Titre accrocheur avec un bouton d'action vers les tutoriels.
- **Section Prix** : Résumé des tarifs Starlink avec badges dynamiques.
- **Liste des derniers articles** : Grille d'articles récents.

### La Page Blog Principale (`/blog`)
- **Layout Alterné Full-Width** : Pour une lecture dynamique, les articles s'affichent les uns sous les autres en pleine largeur. L'image est à gauche pour le 1er article, à droite pour le 2ème, etc.

### La Page de Catégorie (`/categories/[slug]`)
- Colonne principale à gauche listant les articles de la catégorie.
- **Sidebar** à droite (composant réutilisable) contenant un widget de lien d'affiliation et un bloc AdSense Sticky qui suit le scroll.

### La Page Article (`/blog/[slug]`)
- En-tête pleine largeur (Titre, Auteur, Date).
- Contenu optimisé pour la lecture (`prose prose-invert`).
- La **Sidebar** réutilisable s'affiche à droite sur les grands écrans.
- Boutons de partage réseaux sociaux personnalisés (SVG faits maison).

---

## 4. L'Espace Administrateur (Backend & CMS)

Le site possède son propre CMS personnalisé pour éviter de dépendre d'outils externes complexes.

### Sécurité
Toutes les pages sous le dossier `/admin/*` (sauf `/admin/login`) sont protégées par le **Middleware Next.js** (`src/middleware.ts`). Si l'utilisateur n'a pas de session Supabase valide, il est redirigé vers le login. 
Le Header et le Footer du site public sont masqués dynamiquement (`usePathname()`) sur les routes admin.

### Pages Admin
1. **Login (`/admin/login`)** : Formulaire utilisant `@supabase/ssr` (`signInWithPassword`).
2. **Dashboard (`/admin`)** : Tableau de bord listant les statistiques des articles, statuts (Brouillon/Publié) et boutons d'édition. Utilise un layout spécial avec une Sidebar d'administration.
3. **Éditeur (`/admin/editor`)** : Interface de création. Champs : Titre, Catégorie, Slug, Image de couverture, et contenu (Markdown).

---

## 5. Base de Données (Supabase)

Le schéma PostgreSQL (`supabase_schema.sql`) comporte 3 tables principales :

1. **`categories`**
   - `id` (UUID), `name`, `slug`.
2. **`profiles`**
   - Relié automatiquement à `auth.users` par un trigger lors de l'inscription.
   - Contient : `full_name`, `avatar_url`, `bio`.
3. **`articles`**
   - `id`, `title`, `slug`, `excerpt`, `content`, `featured_image`.
   - `status` ('draft' ou 'published').
   - `category_id` (Clé étrangère vers `categories`).
   - `author_id` (Clé étrangère vers `profiles`).

**RLS (Row Level Security)** :
- Les visiteurs publics ne peuvent lire *que* les catégories et les articles ayant le statut `published`.
- Seuls les administrateurs connectés peuvent insérer, modifier, ou lire les brouillons (`draft`).
- Le bucket Storage "images" permet le téléchargement public, mais l'upload est restreint aux admins.

---

## 6. Composants Clés
- `AdBanner.tsx` : Composant Wrapper très important. Il contourne les erreurs liées au React Strict Mode (TagError sur les `<ins>`) en s'assurant de ne push l'AdSense que si le composant est vide via un `useRef`.
- `Sidebar.tsx` : Contient la logique d'affichage latérale. Réutilisé sur `/categories/[slug]` et `/blog/[slug]`.

---

*Note: Ce projet est construit de façon modulaire. Les données sont actuellement "mockées" (fausses données en dur) dans l'UI du frontend. La prochaine grande phase technique est le remplacement de ces fausses données par des appels "Server-Side" à Supabase en utilisant `createClient()`.*
