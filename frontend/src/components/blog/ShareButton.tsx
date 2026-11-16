"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-4 py-2 text-xs font-semibold text-[#1B263B] shadow-sm transition-all hover:border-[#8CC63F] hover:bg-[#F7F9F8]"
      aria-label="Share article"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[#8CC63F]" />
          <span className="text-[#0B3B24]">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 text-[#0B3B24]" />
          <span>Share Dispatch</span>
        </>
      )}
    </button>
  );
}
