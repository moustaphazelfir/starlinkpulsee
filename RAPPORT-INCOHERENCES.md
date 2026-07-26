# 🛰️ Rapport de scan — Starlinkpulsee

> Scan complet du projet réalisé le **2026-07-26**.
> Stack détectée : **Next.js 16.2.10** (App Router), React 19.2.4, Supabase, Tailwind v4.
> ✅ **Le build passe** (`next build` réussit). Les problèmes ci-dessous ne bloquent pas le déploiement mais causent des **404, des bugs UX, des fuites de données et du contenu dupliqué SEO**.

Légende gravité : 🔴 Critique · 🟠 Important · 🟡 Moyen · ⚪ Mineur

---

## 🔴 1. Slugs incohérents entre le Header et la page d'accueil (cause des 404)

Le même article est pointé par **deux URL différentes** selon l'endroit. Au mieux une seule existe en base, l'autre renvoie un 404 (aujourd'hui masqué par le fallback "recherche floue", voir §2).

| Article | Page d'accueil ([page.tsx](src/app/page.tsx)) | Header ([Header.tsx](src/components/Header.tsx)) |
|---|---|---|
| Prix / abonnement | `prix-starlink-combien-coute-labonnement` | `prix-starlink-en-france-le-guide-complet-sur-les-offres-couts-et-abonnements` |
| Forfait résidentiel | `forfait-starlink-residentiel-100-200-ou-max` | `forfait-starlink-residentiel-100-200-ou-max-lequel-choisir` |
| Starlink vs Fibre | `starlink-vs-fibre-optique` | `starlink-vs-fibre-optique-quel-choix-pour-votre-connexion-internet` |
| Starlink vs 4G/5G | `comparatif-starlink-vs-4g-5g-box` | `starlink-vs-4g-5g-quelle-solution-pour-votre-connexion-internet` |

**À faire :** définir la liste des slugs réels une seule fois (fichier de constantes ou requête en base) et l'importer partout. Vérifier chaque slug par rapport à la colonne `articles.slug` en base. Ne jamais recopier un slug à la main dans deux fichiers.

---

## 🔴 2. Le fallback « recherche floue » sert parfois le mauvais article + casse le SEO

Dans [blog/[slug]/page.tsx:99-113](src/app/blog/[slug]/page.tsx#L99) et [dans `generateMetadata`:38-45](src/app/blog/[slug]/page.tsx#L38), quand un slug n'existe pas, le code prend **2 mots-clés du slug** et fait un `ilike` avec `.limit(1)`.

Problèmes :
- **Non déterministe** : deux articles contenant les mêmes mots-clés → le visiteur peut tomber sur le **mauvais** article.
- **Contenu dupliqué (SEO)** : le `canonical` généré utilise l'URL *demandée* (fausse), pas le vrai slug → Google voit deux URL pour un même contenu. Voir [ligne 77](src/app/blog/[slug]/page.tsx#L77).
- Ça **masque** le vrai bug (§1) au lieu de le corriger.

**À faire :** corriger les liens (§1), puis soit supprimer ce fallback, soit le remplacer par une **redirection 301** vers le vrai slug (et non un rendu direct), pour préserver le SEO.

---

## 🟠 3. `middleware.ts` est déprécié en Next.js 16 → renommer en `proxy.ts`

Le build affiche :
> ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.

Fichier concerné : [src/middleware.ts](src/middleware.ts). Depuis Next 16, la convention s'appelle **`proxy`** (même fonctionnement). Réf. `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.

**À faire :** renommer `src/middleware.ts` → `src/proxy.ts` et exporter `proxy` au lieu de `middleware` (garder le même `config.matcher`). Mettre aussi à jour la mention dans [.agents/AGENTS.md](.agents/AGENTS.md) qui parle encore de `src/middleware.ts`.

---

## 🔴 4. Fuite de données : les e-mails des commentateurs sont publics

- La policy RLS `"Les commentaires sont publics" FOR SELECT USING (true)` ([supabase_schema.sql:94](supabase_schema.sql#L94)) rend **toutes les colonnes** lisibles, dont `author_email`.
- [CommentSection.tsx:38](src/components/CommentSection.tsx#L38) fait `select('*')` → les e-mails partent dans le navigateur de **n'importe quel visiteur** (visibles dans l'API/DevTools).
- L'UI promet pourtant : *« Votre adresse e-mail ne sera pas publiée »* ([CommentSection.tsx:164](src/components/CommentSection.tsx#L164)). **Contradiction directe.**

**À faire :** ne jamais exposer `author_email`. Soit créer une vue publique sans l'e-mail, soit restreindre les colonnes lisibles via RLS, et remplacer `select('*')` par une liste explicite de colonnes (`id, author_name, content, parent_id, created_at`).

---

## 🟠 5. Comptage des vues : RPC manquante, incohérences et doublons

- [blog/[slug]/page.tsx:124](src/app/blog/[slug]/page.tsx#L124) appelle `supabase.rpc('increment_view_count', …)` — **cette fonction n'existe pas dans [supabase_schema.sql](supabase_schema.sql)**. Elle échoue à chaque fois.
- Le fallback [ligne 127](src/app/blog/[slug]/page.tsx#L127) fait un `UPDATE articles.views`, mais la RLS interdit l'update aux anonymes → **la colonne `views` ne s'incrémente jamais** pour le public. L'erreur n'est même pas vérifiée. Résultat : la colonne « Vues » du dashboard admin est faussée.
- La vue est insérée dans `page_views` **à chaque rendu serveur** (`force-dynamic`), y compris par les bots/rafraîchissements → statistiques gonflées.

**À faire :** créer la fonction SQL `increment_view_count` (en `SECURITY DEFINER`) OU s'appuyer uniquement sur `page_views`. Choisir **une seule** source de vérité pour les vues et filtrer les bots.

---

## 🟠 6. `/api/track` est du code mort (doublon jamais appelé)

[src/app/api/track/route.ts](src/app/api/track/route.ts) insère dans `page_views` (session_id `'anonymous-session'`) — mais **aucun composant ne l'appelle** (recherche `api/track` = 0 usage côté client). Le tracking réel se fait déjà côté serveur dans la page article (session_id `'anonymous-server'`).

**À faire :** supprimer la route si inutilisée, ou l'utiliser réellement côté client — mais pas les deux mécanismes en parallèle.

---

## 🟠 7. Formulaires et recherche non fonctionnels (UX trompeuse)

| Élément | Fichier | Problème |
|---|---|---|
| Formulaire de contact | [contact/page.tsx:31](src/app/contact/page.tsx#L31) | Aucun `onSubmit` → le bouton « Envoyer » ne fait **rien**. |
| Recherche (header + mobile) | [Header.tsx:89](src/components/Header.tsx#L89), [172](src/components/Header.tsx#L172) | Champs sans handler → la loupe ne cherche **rien**. |
| Newsletter (cases à cocher) | [CommentSection.tsx:217-235](src/components/CommentSection.tsx#L217) | Cases décoratives, non reliées à un état. |
| Paramètres SEO admin | [admin/settings/page.tsx:16](src/app/admin/settings/page.tsx#L16) | `handleSave` est **simulé** (TODO), rien n'est sauvegardé. |

**À faire :** brancher ces formulaires (API contact, page/route de recherche, table `settings`) ou les retirer tant qu'ils ne sont pas prêts, pour ne pas tromper l'utilisateur.

---

## 🟡 8. Double chargement du script AdSense

Le script `adsbygoogle.js` est chargé **globalement** dans [layout.tsx:86](src/app/layout.tsx#L86) **et** re-injecté dans **chaque** `<AdBanner>` via `<Script>` ([AdBanner.tsx:48](src/components/AdBanner.tsx#L48)). Redondant (plusieurs balises identiques).

**À faire :** garder **un seul** chargement (celui du layout, ou une stratégie centralisée) et retirer le `<Script>` de `AdBanner`.

---

## 🟡 9. Config AdSense / Analytics en dur et éparpillée

- ID AdSense `ca-pub-8359281173942920` répété dans [layout.tsx:86](src/app/layout.tsx#L86) et [AdBanner.tsx:43/51](src/components/AdBanner.tsx#L43).
- ID GA `G-Z4D077646E` en dur dans [layout.tsx:91](src/app/layout.tsx#L91).
- La page Paramètres propose de configurer ces IDs… mais ne les persiste pas (§7).

**À faire :** centraliser ces IDs dans des variables d'environnement (`NEXT_PUBLIC_ADSENSE_ID`, `NEXT_PUBLIC_GA_ID`).

---

## 🟡 10. Pagination du blog factice + pas de limite de requête

[blog/page.tsx:88-97](src/app/blog/page.tsx#L88) affiche des boutons `1 2 3 …` **statiques** (aucun `href`, aucune logique), alors que la requête [ligne 11](src/app/blog/page.tsx#L11) charge **tous** les articles d'un coup (pas de `.range()`/`.limit()`). Ne passera pas à l'échelle et induit l'utilisateur en erreur.

**À faire :** implémenter une vraie pagination (`.range()` + `searchParams` `?page=`) ou retirer les boutons.

---

## 🟡 11. Catégorie `prix-forfaits` référencée mais inexistante

Le Header ([Header.tsx:32](src/components/Header.tsx#L32)) pointe le menu « Prix & Forfaits » vers `/categories/prix-forfaits`, mais [supabase_schema.sql:15-19](supabase_schema.sql#L15) ne crée que : `actualites`, `tutoriels`, `comparatifs`, `equipements`. (Actuellement peu visible car le parent est un `<button>` sur desktop, mais le lien est incohérent.)

**À faire :** créer la catégorie en base, ou pointer vers une catégorie existante.

---

## 🟡 12. Pas de suppression d'articles dans l'admin

[admin/page.tsx](src/app/admin/page.tsx) importe `Trash2` et `Search` mais ne les utilise pas : le tableau ne propose **que** « Modifier », **aucune suppression**. La gestion de contenu est donc incomplète (impossible de retirer un article depuis l'UI).

**À faire :** ajouter l'action Supprimer (comme dans [admin/categories/page.tsx:67](src/app/admin/categories/page.tsx#L67) qui le fait déjà bien).

---

## 🟠 13. Qualité de code — 85 problèmes ESLint (59 erreurs, 26 avertissements)

`npx eslint src` (n'échoue pas le build en Next 16, mais à nettoyer). Principaux :

- **`react/no-unescaped-entities`** (majorité des erreurs) : apostrophes `'` non échappées dans le JSX (a-propos, contact, mentions-legales, politique, page.tsx, Footer, Sidebar…).
- **`react-hooks/set-state-in-effect`** : `setState` synchrone dans un `useEffect` — [editor/page.tsx:85](src/app/admin/editor/page.tsx#L85), [categories/page.tsx:32](src/app/admin/categories/page.tsx#L32).
- **« Cannot create components during render »** : `SidebarContent` défini **dans** le composant — [admin/layout.tsx:34](src/app/admin/layout.tsx#L34). À sortir hors du composant (sinon état réinitialisé à chaque rendu).
- **`<img>` au lieu de `next/image`** : [page.tsx:292](src/app/page.tsx#L292), [blog/[slug]/page.tsx:218](src/app/blog/[slug]/page.tsx#L218), [blog/page.tsx](src/app/blog/page.tsx), [categories/[slug]/page.tsx:116](src/app/categories/[slug]/page.tsx#L116) → LCP plus lent, pas d'optimisation.
- **Imports inutilisés** : `Image` importé mais jamais utilisé dans [page.tsx:1](src/app/page.tsx#L1) et [blog/[slug]/page.tsx:1](src/app/blog/[slug]/page.tsx#L1) ; `User` dans CommentSection.
- **`no-explicit-any`** : `article: any`, `err: any` à plusieurs endroits (typer proprement).
- **`@ts-ignore` → `@ts-expect-error`** : [AdBanner.tsx:26](src/components/AdBanner.tsx#L26).

**À faire :** `npx eslint src --fix` corrige déjà une bonne partie (apostrophes, etc.), puis traiter le reste manuellement.

---

## 🟡 14. Documentation obsolète / contradictoire

- **[README.md](README.md)** : encore le texte par défaut de `create-next-app` (parle de la police **Geist**, alors que le projet utilise **Inter + Fira Code**). Aucune info réelle sur le projet.
- **[Gemini.md](Gemini.md)** et **[.agents/AGENTS.md](.agents/AGENTS.md)** : indiquent « **Next.js 14+** » alors que le projet tourne en **16.2**. `.agents/AGENTS.md` mentionne `src/middleware.ts` (déprécié, cf. §3).

**À faire :** mettre à jour README (vraie doc : install, `.env.local` requis, schéma Supabase) et harmoniser la version Next dans Gemini.md / .agents.

---

## ⚪ 15. Scripts de debug commités dans le dépôt

[check_db.js](check_db.js) et [update_slug.js](update_slug.js) sont des scripts jetables qui contiennent en dur l'URL du projet Supabase et la **clé anon** (clé publique par nature, mais à ne pas laisser traîner). Ils polluent la racine.

**À faire :** les déplacer dans un dossier `scripts/` ignoré, ou les supprimer. (Note : `.env.local` est bien **non suivi** par git ✅.)

---

## ✅ Points sains constatés

- `.env.local` non commité, secrets hors dépôt.
- Middleware valide bien la session via `getUser()` (pas seulement `getSession()`).
- Protection des routes `/admin` fonctionnelle.
- SEO structuré présent : `sitemap.ts`, `robots.ts`, JSON-LD (Article, Breadcrumb, WebSite), Open Graph.
- Params async correctement `await`és (conforme Next 16) dans les pages `[slug]`.
- Variables CSS de la palette « Deep Space » toutes définies dans `globals.css`.
- Le build de production réussit.

---

## 🎯 Ordre de correction conseillé

1. **§1 + §2** — Corriger les slugs et retirer/redresser le fallback flou (impact direct : 404 + SEO).
2. **§4** — Colmater la fuite d'e-mails (RLS + `select` explicite).
3. **§3** — Renommer `middleware.ts` → `proxy.ts`.
4. **§5 + §6** — Unifier le comptage de vues (RPC ou `page_views`), supprimer le doublon.
5. **§7** — Brancher ou masquer les formulaires non fonctionnels.
6. **§8–§15** — Nettoyage progressif (AdSense, pagination, ESLint, docs).
