"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteArticleButton({
  articleId,
  title,
}: {
  articleId: string;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Supprimer définitivement l'article « ${title} » ? Cette action est irréversible.`
      )
    )
      return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("articles").delete().eq("id", articleId);
    setLoading(false);

    if (error) {
      alert("Suppression impossible : " + error.message);
      return;
    }
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Supprimer"
      className="p-2 text-[var(--color-text-secondary)] hover:text-red-400 bg-[var(--color-space-700)] rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
