-- ==========================================
-- SCHÉMA DE BASE DE DONNÉES STARLINKPULSEE
-- À copier-coller dans Supabase > SQL Editor
-- ==========================================

-- 1. Table des Catégories
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertion de catégories par défaut
INSERT INTO public.categories (name, slug) VALUES 
('Actualités', 'actualites'),
('Tutoriels', 'tutoriels'),
('Comparatifs', 'comparatifs'),
('Équipements', 'equipements');

-- 2. Table des Profils (Auteurs reliés à auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Table des Articles
CREATE TABLE public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table des Commentaires
CREATE TABLE public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_website VARCHAR(255),
    content TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Sécurité RLS (Row Level Security)

-- Activer RLS sur les tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Les catégories sont lisibles par tout le monde, modifiables que par les utilisateurs connectés (Admin)
CREATE POLICY "Les catégories sont publiques" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins peuvent gérer les catégories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

-- Les articles publiés sont lisibles par tout le monde, le reste par les utilisateurs connectés
CREATE POLICY "Les articles publiés sont publics" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Admins peuvent tout lire" ON public.articles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins peuvent gérer les articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');

-- Les profils sont lisibles par tout le monde, modifiables par leur propriétaire
CREATE POLICY "Les profils sont publics" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Les commentaires sont lisibles par tout le monde, et tout le monde peut insérer un commentaire
CREATE POLICY "Les commentaires sont publics" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Tout le monde peut ajouter un commentaire" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins peuvent gérer les commentaires" ON public.comments FOR ALL USING (auth.role() = 'authenticated');

-- 6. Bucket de Stockage (Pour les images des articles)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
CREATE POLICY "Images publiques" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admins upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admins delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
