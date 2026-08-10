import { NextResponse } from "next/server";

// IndexNow — notifie instantanément les moteurs (Bing, Yandex, et partenaires)
// qu'une URL a été créée ou mise à jour, pour une indexation quasi immédiate.
// La clé n'est PAS un secret : elle est publiée à la racine du site
// (public/<KEY>.txt) pour prouver qu'on possède bien le domaine.
const INDEXNOW_KEY = "dcb0026814d7b6d657c5b90e1334b189";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://starlinkpulsee.com";
const HOST = new URL(SITE_URL).host;

export async function POST(request: Request) {
  let body: { urls?: string[]; url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  // Accepte soit { url }, soit { urls: [...] }
  const raw = body.urls ?? (body.url ? [body.url] : []);

  // On ne soumet que des URL de NOTRE domaine (IndexNow refuse le reste,
  // et ça évite tout détournement du point d'entrée).
  const urlList = Array.from(
    new Set(
      raw
        .filter((u): u is string => typeof u === "string")
        .map((u) => u.trim())
        .filter((u) => {
          try {
            return new URL(u).host === HOST;
          } catch {
            return false;
          }
        })
    )
  );

  if (urlList.length === 0) {
    return NextResponse.json({ error: "Aucune URL valide pour ce domaine." }, { status: 400 });
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    // IndexNow renvoie 200 ou 202 en cas de succès (pas de corps utile).
    return NextResponse.json(
      { ok: res.ok, status: res.status, submitted: urlList },
      { status: res.ok ? 200 : 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Échec de l'appel IndexNow." },
      { status: 502 }
    );
  }
}
