import Link from "next/link";
import { MessageSquare, Mail, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteCommentButton from "@/components/admin/DeleteCommentButton";

export const dynamic = "force-dynamic";

type AdminComment = {
  id: string;
  author_name: string;
  author_email: string | null;
  author_website: string | null;
  content: string;
  created_at: string;
  parent_id: string | null;
  articles: { title: string; slug: string } | null;
};

export default async function AdminCommentsPage() {
  const supabase = await createClient();

  // La table brute `comments` (avec e-mails) n'est lisible que par les admins (RLS).
  const { data } = await supabase
    .from("comments")
    .select("id, author_name, author_email, author_website, content, created_at, parent_id, articles ( title, slug )")
    .order("created_at", { ascending: false });

  const comments = (data as unknown as AdminComment[]) || [];

  const now = new Date();
  const since24h = new Date(now.getTime() - 24 * 3600 * 1000);
  const last24h = comments.filter((c) => new Date(c.created_at) >= since24h).length;

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <MessageSquare className="text-[var(--color-accent-cyan)]" /> Commentaires
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {comments.length} commentaire{comments.length > 1 ? "s" : ""} au total
          {last24h > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-green-400">
              · {last24h} sur les dernières 24 h
            </span>
          )}
        </p>
      </header>

      {comments.length === 0 ? (
        <div className="glass rounded-2xl border border-[var(--color-border-subtle)] p-12 text-center text-[var(--color-text-muted)]">
          <MessageSquare size={40} className="mx-auto mb-4 opacity-40" />
          Aucun commentaire pour l&apos;instant.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="glass rounded-2xl border border-[var(--color-border-subtle)] p-5 flex gap-4"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-space-700)] flex items-center justify-center text-[var(--color-accent-cyan)] font-bold">
                {c.author_name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                  <span className="font-bold text-white">{c.author_name}</span>
                  {c.author_email && (
                    <a
                      href={`mailto:${c.author_email}`}
                      className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] inline-flex items-center gap-1"
                    >
                      <Mail size={12} /> {c.author_email}
                    </a>
                  )}
                  {c.parent_id && (
                    <span className="text-[10px] uppercase tracking-wider bg-[var(--color-space-700)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">
                      Réponse
                    </span>
                  )}
                </div>

                <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap mb-3">
                  {c.content}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
                  <span>
                    {new Date(c.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  {c.articles?.slug && (
                    <Link
                      href={`/blog/${c.articles.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 hover:text-[var(--color-accent-cyan)] transition-colors truncate max-w-xs"
                    >
                      <ExternalLink size={12} /> {c.articles.title}
                    </Link>
                  )}
                </div>
              </div>

              <DeleteCommentButton commentId={c.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
