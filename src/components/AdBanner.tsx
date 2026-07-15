"use client";

import { useEffect } from "react";
import Script from "next/script";

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
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`ad-slot ad-slot--${format} ${position ? `ad-position-${position}` : ""} ${className} flex justify-center my-4 overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-XXXXXX" // TODO: Add real publisher ID
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      <Script
        id={`adsense-script-${slotId}`}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXX" // TODO: Add real publisher ID
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </div>
  );
}
