import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact - Starlink Ultra",
  description: "Contactez l'équipe Starlink Ultra pour toute question sur Starlink, suggestion d'article ou partenariat.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-space-800)] pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--color-accent-cyan)] transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">Contact</span>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Nous <span className="gradient-text">Contacter</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Une question sur Starlink ? Une suggestion d'article ? Un partenariat ? N'hésitez pas à nous écrire.
          </p>
        </header>

        <div className="glass p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)]">
          <ContactForm />
        </div>

        <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
          Vous pouvez aussi nous écrire directement à : <a href="mailto:contact@starlinkpulsee.com" className="text-[var(--color-accent-cyan)] hover:underline">contact@starlinkpulsee.com</a>
        </p>
      </div>
    </div>
  );
}
