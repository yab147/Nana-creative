"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { getBrandProfileSync } from "@/data/brandProfile";

const NanaInteractiveLogo3D = dynamic(
  () => import("@/modules/three/components/NanaInteractiveLogo3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] md:h-[620px] w-full items-center justify-center rounded-3xl border border-[#2A3A54] bg-[#1B263B] p-6 text-center shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center gap-3">
          <span className="relative flex h-10 w-10">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1626] text-sm text-[#8CC63F]">
              🌱
            </span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8F3EC]/70">
            Loading 3D Nana Creative Identity...
          </span>
        </div>
      </div>
    ),
  }
);
import {
  ArrowUpRight,
  Play,
  X,
  Sparkles,
  Sprout,
  MapPin,
  Layers,
} from "lucide-react";

export default function Hero() {
  const brand = getBrandProfileSync();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Icon mapping for metrics
  const getMetricIcon = (iconName?: string) => {
    switch (iconName) {
      case "sprout":
        return <Sprout className="h-5 w-5 text-[#8CC63F]" />;
      case "map-pin":
        return <MapPin className="h-5 w-5 text-[#8CC63F]" />;
      case "layers":
        return <Layers className="h-5 w-5 text-[#8CC63F]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#8CC63F]" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-120px)] overflow-hidden bg-radial from-[#F7F9F8] via-[#FFFFFF] to-[#F7F9F8] py-8 lg:py-14"
    >
      {/* Editorial Decorative Background Halos */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[640px] w-[640px] rounded-full bg-[#8CC63F]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#E8F3EC]/70 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Copy, Signature Hook, Dual CTAs & Stats */}
          {/* ========================================================= */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Live Status Pill */}
            <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0B3B24]/15 bg-[#E8F3EC] px-4 py-1.5 shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8CC63F]" />
                </span>
                <span className="text-xs font-bold text-[#0B3B24]">
                  {brand.hero.statusBadge}
                </span>
              </div>
            </motion.div>

            {/* 2. Signature Hook Callout Banner */}
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="text-xs font-mono tracking-wider uppercase text-[#0B3B24]/70 bg-white/80 px-3 py-1 rounded-full border border-[#E8F3EC]">
                {brand.signatureHook}
              </span>
            </motion.div>

            {/* 3. Editorial H1 Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-[#082A19] sm:text-6xl lg:text-7xl leading-[1.08]"
            >
              {brand.hero.headlineLine1} <br />
              {brand.hero.headlineLine2}{" "}
              <span className="relative inline-block text-[#0B3B24]">
                <span className="relative z-10 text-[#8CC63F]">{brand.hero.headlineHighlight}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-[#8CC63F]/20 sm:h-4"
                />
              </span>
            </motion.h1>

            {/* 4. Editorial Subhead Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#082A19]/80 sm:text-lg sm:leading-8 font-normal"
            >
              {brand.hero.description}
            </motion.p>

            {/* 5. Dual CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link
                href={brand.hero.primaryCta.href}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0B3B24] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0B3B24]/20 transition-all duration-300 hover:bg-[#082A19] hover:shadow-2xl hover:shadow-[#0B3B24]/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              >
                <span>{brand.hero.primaryCta.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#8CC63F] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#0B3B24]/15 bg-white px-6 py-4 text-sm font-bold text-[#082A19] shadow-sm transition-all duration-300 hover:border-[#8CC63F] hover:bg-[#E8F3EC]/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F3EC] text-[#0B3B24] transition-colors group-hover:bg-[#8CC63F] group-hover:text-[#082A19]">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                <span>{brand.hero.secondaryCta.label}</span>
              </button>
            </motion.div>

            {/* 6. The 3 Metric Counters (Zero hardcoded, mapped from BrandProfile) */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-3 rounded-3xl border border-[#E8F3EC] bg-white/70 p-5 shadow-lg shadow-[#0B3B24]/5 backdrop-blur-md sm:gap-6 sm:p-6"
            >
              {brand.hero.metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  className={`flex flex-col ${index < brand.hero.metrics.length - 1
                      ? "border-r border-[#E8F3EC] pr-3 sm:pr-6"
                      : ""
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {getMetricIcon(metric.icon)}
                    <span className="text-2xl font-black tracking-tight text-[#082A19] sm:text-3xl lg:text-4xl">
                      {metric.value}
                    </span>
                  </div>
                  <span className="mt-1 text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                    {metric.label}
                  </span>
                  {metric.sublabel && (
                    <span className="mt-0.5 text-[11px] text-[#082A19]/65 hidden sm:block">
                      {metric.sublabel}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D Mouse-Sprout Stage (SproutEngine3D)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing Backdrop Ring */}
            <div className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-radial from-[#8CC63F]/20 via-[#E8F3EC]/40 to-transparent blur-2xl" />

            {/* Interactive 3D Nana Creative Logo Hero Centerpiece */}
            <NanaInteractiveLogo3D />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SHOWREEL VIDEO MODAL OVERLAY                              */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowreelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#082A19] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8CC63F]" />
                  <span className="text-sm font-bold text-white">
                    Nana Creative • Official Showreel
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowreelOpen(false)}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                  aria-label="Close showreel modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  src="/videos/showreel.mp4"
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B3B24] px-6 py-4 text-xs text-white">
                <span>&ldquo;{brand.hero.signatureHook}&rdquo;</span>
                <a
                  href={`tel:${brand.contact.primaryPhoneTel}`}
                  className="inline-flex items-center gap-1.5 font-bold text-[#8CC63F] hover:underline"
                >
                  <span>Start your project: {brand.contact.primaryPhone}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
