/**
 * Source unique de vérité pour les slugs d'articles et de catégories référencés
 * "en dur" dans la navigation (Header, page d'accueil, footer…).
 *
 * ⚠️ Ces valeurs DOIVENT correspondre exactement à la colonne `articles.slug`
 * en base Supabase, sinon le lien renvoie un 404. Ne recopiez jamais un slug
 * à la main ailleurs : importez depuis ce fichier.
 */

export const ARTICLE_SLUGS = {
  guideComplet:
    'guide-complet-starlink-c-est-quoi-l-internet-par-satellite-de-spacex',
  installation:
    'comment-installer-starlink-etape-par-etape-guide-complet',
  prix:
    'prix-starlink-en-france-le-guide-complet-sur-les-offres-couts-et-abonnements',
  forfaits:
    'forfait-starlink-residentiel-100-200-ou-max-lequel-choisir',
  promo:
    'starlink-casse-ses-prix-en-france-internet-par-satellite-a-10-mois-bonne-affaire-ou-piege',
  vsFibre:
    'starlink-vs-fibre-optique-quel-choix-pour-votre-connexion-internet',
  vs4g5g:
    'starlink-vs-4g-5g-quelle-solution-pour-votre-connexion-internet',
  vsAdsl: 'starlink-vs-adsl-le-match-a-sens-unique',
  support:
    'support-starlink-guide-complet-des-fixations-officielles-et-tierces',
  boxTv:
    'quelle-box-tv-avec-starlink-5-solutions-incontournables-en-2026',
  routeurs:
    'top-5-des-meilleurs-routeurs-wi-fi-tiers-a-utiliser-avec-starlink',
  coteIvoire:
    'starlink-en-cote-d-ivoire-comment-l-avoir-prix-et-debits-2026',
  maximiser:
    'maximiser-les-debits-starlink-astuces-de-pro-pour-reduire-le-ping-et-supprimer-les-obstructions',
} as const;

export const CATEGORY_SLUGS = {
  actualites: 'actualites',
  tutoriels: 'tutoriels',
  comparatifs: 'comparatifs',
  equipements: 'equipements',
} as const;

/** Helper pour construire une URL d'article. */
export const articleHref = (slug: string) => `/blog/${slug}`;
/** Helper pour construire une URL de catégorie. */
export const categoryHref = (slug: string) => `/categories/${slug}`;
