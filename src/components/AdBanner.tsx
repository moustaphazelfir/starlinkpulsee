"use client";

import { useEffect, useRef } from "react";

// ID éditeur AdSense — centralisé via variable d'environnement (fallback = valeur actuelle).
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8359281173942920";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner({
  slotId,
  format = "auto",
  position,
  responsive = true,
  className = "",
}: {
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  position?: "in-article" | "sidebar" | "leaderboard" | "in-feed";
  responsive?: boolean;
  className?: string;
}) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Le script adsbygoogle est chargé UNE seule fois globalement dans le layout.
    try {
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (!message.includes("already have ads")) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  return (
    <div className={`ad-slot ad-slot--${format} ${position ? `ad-position-${position}` : ""} ${className} flex justify-center my-4 overflow-hidden`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
