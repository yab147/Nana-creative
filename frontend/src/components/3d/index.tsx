"use client";

import dynamic from "next/dynamic";
import React from "react";

export const SproutEngine3D = dynamic(
  () => import("./SproutEngine3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] md:h-[620px] w-full flex-col items-center justify-center rounded-3xl border border-[#E8F3EC] bg-radial from-[#F7F9F8] via-[#FFFFFF] to-[#E8F3EC]/30 p-8 text-center shadow-xl shadow-[#0B3B24]/5">
        <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-[#8CC63F]/20" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3EC] text-[#0B3B24]">
            <svg
              className="h-6 w-6 animate-spin text-[#8CC63F]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0B3B24]/70">
          Loading Nana Creative 3D Sprout Engine...
        </p>
      </div>
    ),
  }
);
