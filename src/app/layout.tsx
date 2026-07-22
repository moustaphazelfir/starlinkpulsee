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

export const metadata: Metadata = {
  title: {
    default: "Starlinkpulsee — Votre guide indépendant Starlink",
    template: "%s",
  },
  description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion internet par satellite SpaceX.",
  keywords: ["Starlink", "Internet par satellite", "SpaceX", "Tutoriels Starlink", "Abonnement Starlink", "Starlink France", "Starlink prix", "Starlink avis"],
  authors: [{ name: "Starlinkpulsee" }],
  creator: "Starlinkpulsee",
  publisher: "Starlinkpulsee",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Starlinkpulsee — Votre guide indépendant Starlink",
    description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion internet par satellite SpaceX.",
    url: SITE_URL,
    siteName: "Starlinkpulsee",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starlinkpulsee — Votre guide indépendant Starlink",
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
    name: 'Starlinkpulsee',
    url: SITE_URL,
    description: 'La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets.',
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: 'Starlinkpulsee',
      url: SITE_URL,
    },
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8359281173942920" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased min-h-screen flex flex-col bg-[var(--color-space-800)] text-[var(--color-text-primary)]`}
      >
        <GoogleAnalytics gaId="G-Z4D077646E" />
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
