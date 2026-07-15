import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starlinkpulsee - Votre guide indépendant Starlink",
  description: "La référence francophone Starlink : tutoriels, actualités, comparatifs et guides complets pour optimiser votre connexion par satellite.",
  keywords: ["Starlink", "Internet par satellite", "SpaceX", "Tutoriels Starlink", "Abonnement Starlink"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased min-h-screen flex flex-col bg-[var(--color-space-800)] text-[var(--color-text-primary)]`}
      >
        <Header />
        
        {/* AdSense Leaderboard Slot - Toujours visible sous le header sur bureau */}
        <div className="hidden md:block container mx-auto px-4 mt-4">
          <div className="w-full max-w-[728px] mx-auto h-[90px] bg-white/5 border border-white/10 rounded flex items-center justify-center text-white/30 text-sm">
            [AdSense Leaderboard: 728x90]
          </div>
        </div>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-[var(--color-space-900)] border-t border-[var(--color-border-subtle)] mt-12 py-12">
          <div className="container mx-auto px-4 text-center text-[var(--color-text-muted)]">
            <p>&copy; {new Date().getFullYear()} Starlinkpulsee. Tous droits réservés.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
