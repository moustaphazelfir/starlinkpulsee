import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://starlinkpulsee.com';
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-8359281173942920';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-Z4D077646E';

export const metadata: Metadata = {
  title: {
    default: "Starlink Ultra — Votre guide indépendant Starlink",
    template: "%s",
  },
  description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion internet par satellite SpaceX.",
  keywords: [
    // Marque & générique
    "Starlink", "Starlink Ultra", "internet par satellite", "SpaceX", "internet satellite Starlink",
    // Prix / forfaits (fort volume de recherche)
    "prix Starlink", "Starlink prix 2026", "abonnement Starlink", "forfait Starlink",
    "forfait Starlink résidentiel", "Starlink 100 200 MAX", "Starlink pas cher", "promo Starlink",
    // Matériel
    "kit Starlink", "antenne Starlink", "Starlink Mini", "Starlink Standard V4",
    "support Starlink", "routeur Starlink", "box TV Starlink",
    // Installation / usage
    "installer Starlink", "installation Starlink", "améliorer débit Starlink", "réduire ping Starlink",
    "Starlink obstruction", "mode Bypass Starlink",
    // Comparatifs
    "Starlink vs fibre", "Starlink vs 4G 5G", "Starlink vs ADSL", "comparatif Starlink",
    // Cas d'usage / zones
    "internet zone blanche", "internet campagne", "internet rural", "internet camping-car",
    // Géographie francophone
    "Starlink France", "Starlink Belgique", "Starlink Suisse", "Starlink Afrique",
    "Starlink Côte d'Ivoire", "Starlink Sénégal",
    // Décision
    "Starlink avis", "test Starlink", "débit Starlink", "latence Starlink",
  ],
  authors: [{ name: "Starlink Ultra" }],
  creator: "Starlink Ultra",
  publisher: "Starlink Ultra",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Starlink Ultra — Votre guide indépendant Starlink",
    description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion internet par satellite SpaceX.",
    url: SITE_URL,
    siteName: "Starlink Ultra",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starlink Ultra — Votre guide indépendant Starlink",
    description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD global pour le site (WebSite schema)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Starlink Ultra',
    url: SITE_URL,
    description: 'La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets.',
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: 'Starlink Ultra',
      url: SITE_URL,
    },
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased min-h-screen flex flex-col bg-[var(--color-space-800)] text-[var(--color-text-primary)]`}
      >
        <GoogleAnalytics gaId={GA_ID} />
        <Header />
        
        {/* AdSense Leaderboard Slot - Toujours visible sous le header sur bureau */}
        <div className="hidden md:block container mx-auto px-4 mt-4">
          <div className="w-full max-w-[728px] mx-auto overflow-hidden">
            <AdBanner slotId="leaderboard-top" format="horizontal" position="leaderboard" className="w-full" />
          </div>
        </div>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
