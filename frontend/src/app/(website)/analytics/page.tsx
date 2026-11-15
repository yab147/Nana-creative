"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { nanaAnalyticsContent } from "@/data/nanaContent";
import {
  TrendingUp,
  Video,
  Eye,
  Activity,
  Camera,
  Play,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function AnalyticsPage() {
  const analytics = nanaAnalyticsContent;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] py-14 lg:py-20 text-[#1B263B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
            </span>
            {analytics.badge}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[#0B3B24]">
            {analytics.headline}
          </h1>
          <p className="mt-3 text-lg text-[#1B263B]/75 leading-relaxed font-light">
            {analytics.subheadline}
          </p>
        </div>

        {/* 1. TikTok Live Channel Showcase (49 Following, 2,252 Followers, 52K Likes) */}
        <div className="mb-14 overflow-hidden rounded-3xl bg-[#0B3B24] p-8 sm:p-12 text-white shadow-2xl shadow-[#0B3B24]/15 border border-[#8CC63F]/25">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/30 bg-[#082A19] px-3.5 py-1 text-xs font-mono text-[#8CC63F]">
                <Activity className="h-3.5 w-3.5" />
                <span>LIVE PRODUCTION CHANNEL</span>
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {analytics.tiktokHandle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#E8F3EC]/80 font-light max-w-xl">
                High-retention commercial hooks, organic brand building, and data-backed viral creative direction.
              </p>

              {/* Tech Spec Tag: Shot on Canon R6 */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#082A19]/80 border border-[#8CC63F]/30 px-3.5 py-2 text-xs font-semibold text-[#8CC63F]">
                <Camera className="h-4 w-4" />
                <span>Camera Rig: {analytics.techSpec}</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#8CC63F]" />
              </div>
            </div>

            {/* Account Core Statistics (49 Following, 2,252 Followers, 52K Likes) */}
            <div className="grid grid-cols-3 gap-6 border-t lg:border-t-0 lg:border-l border-[#8CC63F]/25 pt-6 lg:pt-0 lg:pl-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8F3EC]/60 block">
                  Following
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {analytics.overview.following}
                </span>
                <span className="text-[10px] text-[#8CC63F] font-mono block mt-1">Verified</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8F3EC]/60 block">
                  Followers
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {analytics.overview.followers}
                </span>
                <span className="text-[10px] text-[#8CC63F] font-mono block mt-1">Organic</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8F3EC]/60 block">
                  Likes
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#8CC63F]">
                  {analytics.overview.likes}
                </span>
                <span className="text-[10px] text-[#8CC63F] font-mono block mt-1">Total Hits</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Individual Video Views Breakdown (3,107 | 2,329 | 7,798 | 5,778 | 8,188 | 29K) */}
        <div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[#E8F3EC] pb-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0B3B24]">
                Viral Video Views Breakdown
              </h3>
              <p className="mt-1 text-sm text-[#1B263B]/60">
                Performance audits of recent commercial and organic reels. All footage: {analytics.techSpec}.
              </p>
            </div>
            <span className="text-xs font-mono text-[#0B3B24] bg-[#E8F3EC] px-3 py-1 rounded-full font-semibold">
              6 Featured Releases
            </span>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {analytics.viewsBreakdown.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group flex flex-col justify-between rounded-2xl border border-[#E8F3EC] bg-white p-6 shadow-sm hover:border-[#8CC63F] hover:shadow-xl hover:shadow-[#0B3B24]/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#E8F3EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3B24]">
                      {item.tag}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F9F8] text-[#0B3B24] group-hover:bg-[#8CC63F] transition-colors">
                      <Play className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0B3B24]/60 block">
                      Organic Views
                    </span>
                    <div className="mt-1 text-3xl sm:text-4xl font-black text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors">
                      {item.views}
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-[#1B263B]">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E8F3EC] flex items-center justify-between text-xs text-[#0B3B24]/70 font-semibold">
                  <span className="font-mono text-[11px] text-[#0B3B24]/60">
                    {analytics.techSpec}
                  </span>
                  <a
                    href={analytics.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0B3B24] group-hover:text-[#8CC63F] transition-colors"
                  >
                    <span>View Reel</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
