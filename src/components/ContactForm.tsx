"use client";

import { useState } from "react";
import { Mail, Send, User, MessageSquare } from "lucide-react";

const CONTACT_EMAIL = "contact@starlinkpulsee.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Question sur Starlink");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sans backend d'envoi, on ouvre le client mail de l'utilisateur pré-rempli.
    const body = `Nom : ${name}\nE-mail : ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[Starlink Ultra] ${subject}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom complet *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={16} className="text-[var(--color-text-muted)]" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse e-mail *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={16} className="text-[var(--color-text-muted)]" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Sujet *</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] transition-all appearance-none"
        >
          <option>Question sur Starlink</option>
          <option>Suggestion d&apos;article</option>
          <option>Signaler une erreur</option>
          <option>Partenariat / Publicité</option>
          <option>Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Message *</label>
        <div className="relative">
          <div className="absolute top-4 left-4 pointer-events-none">
            <MessageSquare size={16} className="text-[var(--color-text-muted)]" />
          </div>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre demande..."
            className="w-full bg-[var(--color-space-900)] border border-[var(--color-border-subtle)] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-cyan)] focus:ring-1 focus:ring-[var(--color-accent-cyan)] transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[var(--color-accent-cyan)] hover:bg-cyan-400 text-black font-bold py-3 px-10 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]"
        >
          <Send size={18} /> Envoyer le message
        </button>
      </div>
    </form>
  );
}
