"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, MessageSquare, Reply } from "lucide-react";

interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  author_website: string | null;
  content: string;
  parent_id: string | null;
  created_at: string;
}

export default function CommentSection({ articleId }: { articleId: string }) {
  const supabase = createClient();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [content, setContent] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
        
      if (data) {
        setComments(data);
      }
      setLoading(false);
    }
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const newComment = {
      article_id: articleId,
      author_name: name,
      author_email: email,
      author_website: website || null,
      content,
      parent_id: replyToId
    };

    const { data, error } = await supabase
      .from('comments')
      .insert(newComment)
      .select()
      .single();

    if (error) {
      setErrorMsg("Une erreur est survenue lors de l'envoi du commentaire.");
    } else if (data) {
      setComments([...comments, data]);
      setSuccessMsg("Votre commentaire a été publié !");
      setContent("");
      setReplyToId(null);
      // We don't reset name/email if user checked "save my info", but for now we just keep it in state.
    }
    
    setIsSubmitting(false);
  };

  const handleReplyClick = (id: string) => {
    setReplyToId(id);
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group comments: parent comments first, then replies under them
  const parentComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="text-[var(--color-accent-cyan)]" /> 
        Commentaires ({comments.length})
      </h3>

      {/* List of comments */}
      <div className="space-y-8 mb-12">
        {loading ? (
          <p className="text-[var(--color-text-muted)] animate-pulse">Chargement des commentaires...</p>
        ) : parentComments.length === 0 ? (
          <p className="text-[var(--color-text-muted)] italic bg-[var(--color-space-800)]/50 p-6 rounded-xl border border-[var(--color-border-subtle)] text-center">
            Soyez le premier à laisser un commentaire !
          </p>
        ) : (
          parentComments.map(comment => (
            <div key={comment.id} className="space-y-4">
              <div className="bg-[var(--color-space-800)] p-6 rounded-2xl border border-[var(--color-border-subtle)]">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-[var(--color-space-700)] rounded-full flex items-center justify-center text-[var(--color-accent-cyan)] font-bold text-lg flex-shrink-0">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{comment.author_name}</div>
                    <div className="text-xs text-[var(--color-text-muted)] mb-3">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
                      })}
                    </div>
                    <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">{comment.content}</p>
                    <button 
                      onClick={() => handleReplyClick(comment.id)}
                      className="mt-4 text-sm text-[var(--color-accent-cyan)] hover:text-white flex items-center gap-1 transition-colors font-medium"
                    >
                      <Reply size={16} /> Répondre
                    </button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {getReplies(comment.id).map(reply => (
                <div key={reply.id} className="ml-8 md:ml-16 bg-[var(--color-space-800)]/60 p-5 rounded-2xl border border-[var(--color-border-subtle)] border-l-4 border-l-[var(--color-accent-cyan)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--color-space-700)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] text-xs font-bold flex-shrink-0">
                      {reply.author_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{reply.author_name}</div>
                      <div className="text-xs text-[var(--color-text-muted)] mb-2">
                        {new Date(reply.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
                        })}
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-[var(--color-space-900)] p-8 rounded-2xl border border-[var(--color-border-subtle)]" id="comment-form">
        <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
          {replyToId ? "Répondre au commentaire" : "Envoyer un commentaire"}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm mb-6">
          Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *
        </p>

        {replyToId && (
          <div className="mb-6 p-4 bg-[var(--color-space-800)] rounded-lg text-sm text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] flex justify-between items-center">
            <span>Vous répondez au commentaire de <strong>{comments.find(c => c.id === replyToId)?.author_name}</strong></span>
            <button onClick={() => setReplyToId(null)} className="text-red-400 hover:text-red-300 font-medium">Annuler</button>
          </div>
        )}

        {errorMsg && <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{errorMsg}</div>}
        {successMsg && <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm">{successMsg}</div>}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-lg p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-cyan)] min-h-[150px] resize-y" 
            placeholder="Commentaire *"
            required
            disabled={isSubmitting}
          ></textarea>
          
          <div className="space-y-4 md:w-1/2">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom *" 
              className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-lg p-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-cyan)]" 
              required 
              disabled={isSubmitting}
            />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail *" 
              className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-lg p-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-cyan)]" 
              required 
              disabled={isSubmitting}
            />
            <input 
              type="url" 
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Site web" 
              className="w-full bg-[var(--color-space-800)] border border-[var(--color-border-subtle)] rounded-lg p-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-cyan)]" 
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-3 mt-6 pt-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[var(--color-border-medium)] rounded bg-[var(--color-space-800)] checked:bg-[var(--color-accent-cyan)] checked:border-[var(--color-accent-cyan)] transition-colors cursor-pointer" />
                <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-[var(--color-text-secondary)] text-sm group-hover:text-white transition-colors">
                Enregistrer mon nom, mon e-mail et mon site dans le navigateur pour mon prochain commentaire.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[var(--color-border-medium)] rounded bg-[var(--color-space-800)] checked:bg-[var(--color-accent-cyan)] checked:border-[var(--color-accent-cyan)] transition-colors cursor-pointer" />
                <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-[var(--color-text-secondary)] text-sm group-hover:text-white transition-colors">
                Oui, je veux recevoir les nouveautés, tutoriels, astuces et offres Starlink directement dans mon mail !
              </span>
            </label>
          </div>

          <div className="flex justify-end mt-8 pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-space-700)] hover:bg-[var(--color-accent-cyan)] text-white hover:text-black font-bold py-3 px-6 rounded-lg transition-colors border border-[var(--color-border-subtle)] hover:border-transparent disabled:opacity-50"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer Le Commentaire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
