import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Utilisation du client Supabase avec la clé anonyme pour l'insertion
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    // On récupère ou génère un ID de session simple (IP ou identifiant aléatoire stocké côté client)
    // Pour cet exemple, on génère juste un enregistrement
    
    // 1. Enregistrer la vue dans page_views
    const { error: insertError } = await supabase
      .from('page_views')
      .insert([
        { 
          article_id: articleId,
          session_id: 'anonymous-session' // Simplifié pour éviter de tracker les IPs sans consentement
        }
      ]);

    if (insertError) {
      console.error('Error inserting page view:', insertError);
      return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
    }

    // 2. Incrémenter le compteur global dans la table articles (pour la performance)
    // Note: Pour incrémenter via API, on utilise généralement une RPC (fonction Supabase)
    // Mais vu qu'on a RLS sur update, il vaut mieux le faire via RLS ou laisser la page_views gérer les stats.
    // L'API RLS actuelle permet à "Admins peuvent gérer les articles", donc l'incrément direct échouera ici si pas admin.
    // C'est pourquoi nous utilisons la table page_views qui est ouverte en insertion (`Tout le monde peut ajouter une vue`).

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
