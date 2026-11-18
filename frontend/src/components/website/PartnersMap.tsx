"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Zap,
  RotateCw,
  Compass,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { successStories, type SuccessStoryItem } from "@/data/nanaContent";

const ethiopiaSvgPath =
  "M 316.0,0.0 L 325.0,11.0 L 331.0,14.0 L 337.0,13.0 L 351.0,31.0 L 372.0,28.0 L 381.0,24.0 L 385.0,18.0 L 391.0,17.0 L 397.0,21.0 L 402.0,30.0 L 411.0,29.0 L 420.0,23.0 L 427.0,28.0 L 440.0,29.0 L 444.0,33.0 L 458.0,29.0 L 469.0,33.0 L 485.0,45.0 L 502.0,49.0 L 518.0,68.0 L 527.0,85.0 L 560.0,108.0 L 567.0,116.0 L 573.0,130.0 L 580.0,137.0 L 586.0,138.0 L 603.0,160.0 L 577.0,199.0 L 565.0,211.0 L 562.0,223.0 L 565.0,236.0 L 563.0,256.0 L 580.0,260.0 L 585.0,256.0 L 604.0,256.0 L 616.0,249.0 L 625.0,250.0 L 628.0,256.0 L 638.0,256.0 L 621.0,280.0 L 631.0,304.0 L 642.0,315.0 L 646.0,326.0 L 657.0,330.0 L 659.0,344.0 L 666.0,349.0 L 668.0,355.0 L 673.0,360.0 L 682.0,362.0 L 704.0,385.0 L 895.0,450.0 L 959.0,450.0 L 767.0,652.0 L 704.0,649.0 L 678.0,656.0 L 647.0,671.0 L 632.0,693.0 L 613.0,698.0 L 583.0,700.0 L 568.0,716.0 L 558.0,714.0 L 523.0,717.0 L 497.0,694.0 L 443.0,718.0 L 419.0,751.0 L 416.0,747.0 L 400.0,746.0 L 391.0,742.0 L 380.0,744.0 L 365.0,737.0 L 357.0,737.0 L 355.0,734.0 L 349.0,738.0 L 329.0,737.0 L 252.0,684.0 L 196.0,683.0 L 181.0,661.0 L 181.0,639.0 L 184.0,636.0 L 182.0,632.0 L 184.0,626.0 L 164.0,619.0 L 150.0,625.0 L 148.0,623.0 L 149.0,614.0 L 137.0,606.0 L 137.0,601.0 L 129.0,588.0 L 129.0,577.0 L 125.0,573.0 L 124.0,562.0 L 127.0,560.0 L 128.0,550.0 L 114.0,544.0 L 106.0,535.0 L 98.0,534.0 L 98.0,528.0 L 94.0,522.0 L 79.0,517.0 L 76.0,509.0 L 65.0,501.0 L 65.0,491.0 L 43.0,472.0 L 38.0,473.0 L 31.0,469.0 L 21.0,471.0 L 16.0,467.0 L 3.0,465.0 L 0.0,453.0 L 11.0,441.0 L 12.0,424.0 L 15.0,421.0 L 21.0,419.0 L 27.0,421.0 L 34.0,418.0 L 43.0,419.0 L 48.0,425.0 L 52.0,425.0 L 73.0,413.0 L 72.0,347.0 L 79.0,328.0 L 80.0,317.0 L 87.0,310.0 L 84.0,282.0 L 94.0,268.0 L 103.0,261.0 L 116.0,273.0 L 127.0,262.0 L 129.0,243.0 L 126.0,238.0 L 135.0,220.0 L 132.0,208.0 L 148.0,192.0 L 170.0,150.0 L 174.0,146.0 L 194.0,142.0 L 203.0,144.0 L 204.0,131.0 L 202.0,129.0 L 208.0,108.0 L 217.0,90.0 L 219.0,78.0 L 224.0,71.0 L 222.0,60.0 L 228.0,40.0 L 250.0,37.0 L 260.0,41.0 L 264.0,32.0 L 277.0,29.0 L 294.0,51.0 L 316.0,0.0 Z";

export default function PartnersMap() {
  const partners = successStories;
  const [rotation, setRotation] = useState<number>(0);
  const [selectedPartner, setSelectedPartner] = useState<SuccessStoryItem>(
    partners[0]
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const previousAngle = useRef<number | null>(null);

  // Smooth auto-rotation when idle; pauses while user is dragging
  useEffect(() => {
    if (isDragging) return;

    const interval = window.setInterval(() => {
      setRotation((current) => (current + 0.18) % 360);
    }, 28);

    return () => window.clearInterval(interval);
  }, [isDragging]);

  function getPointerAngle(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - centerY, e.clientX - centerX);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    previousAngle.current = getPointerAngle(e);
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || previousAngle.current === null) return;

    const currentAngle = getPointerAngle(e);
    let difference = currentAngle - previousAngle.current;

    // Wrap-around boundary handling for smooth dragging
    if (difference > Math.PI) difference -= Math.PI * 2;
    if (difference < -Math.PI) difference += Math.PI * 2;

    setRotation((current) => current + difference * (180 / Math.PI));
    previousAngle.current = currentAngle;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    previousAngle.current = null;
    setIsDragging(false);
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Healthcare":
        return <ShieldCheck className="h-4 w-4 text-[#8CC63F]" />;
      case "Enterprise":
        return <Building2 className="h-4 w-4 text-[#0B3B24]" />;
      default:
        return <Zap className="h-4 w-4 text-[#8CC63F]" />;
    }
  };

  return (
    <section
      id="ethiopia-network-orbit"
      className="relative overflow-hidden bg-white py-12 sm:py-18 lg:py-22 pb-16 lg:pb-24"
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-[#E8F3EC]/50 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading & Drag Hint */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-[#F7F9F8] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-xs">
              <Compass className="h-3.5 w-3.5 text-[#8CC63F]" />
              <span>Interactive Ethiopia Network Orbit</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#0B3B24]">
              Connected Across Regional Hubs
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#1B263B]/70 font-light leading-relaxed">
              Explore our strategic brand network spanning Dire Dawa and Addis Ababa. Drag to rotate the orbit or select any partner to inspect verified intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-4 py-2 text-xs font-semibold text-[#0B3B24] shadow-xs">
              <RotateCw
                className={`h-3.5 w-3.5 text-[#8CC63F] ${
                  isDragging ? "animate-spin" : ""
                }`}
              />
              <span>{isDragging ? "Rotating..." : "Drag Orbit to Rotate"}</span>
            </div>
          </div>
        </motion.div>

        {/* Orbit Map & Side-Panel Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-14">
          {/* ========================================================= */}
          {/* 1. THE ETHIOPIA ORBIT MAP COMPONENT                       */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center pb-12 sm:pb-16"
          >
            <div
              ref={orbitRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative aspect-square w-full max-w-[310px] sm:max-w-[460px] lg:max-w-[580px] touch-none select-none rounded-full mx-auto ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              role="region"
              aria-label="Ethiopia Network Orbit. Drag to rotate."
            >
              {/* Outer Orbit Guides */}
              <div className="absolute inset-[4%] rounded-full border border-dashed border-[#8CC63F]/40 pointer-events-none" />
              <div className="absolute inset-[15%] rounded-full border border-[#0B3B24]/10 pointer-events-none" />
              <div className="absolute inset-[26%] rounded-full border border-dashed border-[#8CC63F]/20 pointer-events-none" />

              {/* CENTER STYLIZED SVG MAP OF ETHIOPIA */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[64%] w-[72%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 960 752"
                  fill="none"
                  className="w-full h-full drop-shadow-md"
                >
                  <defs>
                    <linearGradient
                      id="ethiopiaOrbitGlow"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8CC63F" stopOpacity="0.18" />
                      <stop offset="45%" stopColor="#0B3B24" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#8CC63F" stopOpacity="0.22" />
                    </linearGradient>

                    {/* Network link line gradient */}
                    <linearGradient
                      id="networkLineGradient"
                      x1="460"
                      y1="390"
                      x2="650"
                      y2="370"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#0B3B24" />
                      <stop offset="100%" stopColor="#8CC63F" />
                    </linearGradient>
                  </defs>

                  {/* Topography Silhouette */}
                  <path
                    d={ethiopiaSvgPath}
                    fill="url(#ethiopiaOrbitGlow)"
                    stroke="#0B3B24"
                    strokeWidth="2.5"
                    strokeOpacity="0.3"
                  />
                  <path
                    d={ethiopiaSvgPath}
                    fill="none"
                    stroke="#8CC63F"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    strokeDasharray="6 4"
                  />

                  {/* Active Commercial Axis between Addis Ababa (460, 390) and Dire Dawa (650, 370) */}
                  <line
                    x1="460"
                    y1="390"
                    x2="650"
                    y2="370"
                    stroke="url(#networkLineGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    strokeOpacity="0.75"
                  />
                </svg>

                {/* STATIC PIN 1: ADDIS ABABA (Capital Hub) */}
                <div
                  className="absolute pointer-events-auto z-20 flex flex-col items-center"
                  style={{ left: "47.9%", top: "51.8%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                    <span className="relative h-3 w-3 rounded-full border-2 border-white bg-[#0B3B24] shadow-md ring-2 ring-[#8CC63F]" />
                  </span>
                  <div className="mt-1.5 whitespace-nowrap rounded-md bg-[#0B3B24] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md border border-[#8CC63F]/30">
                    Addis Ababa
                  </div>
                </div>

                {/* STATIC PIN 2: DIRE DAWA (Headquarters Hub) */}
                <div
                  className="absolute pointer-events-auto z-20 flex flex-col items-center"
                  style={{ left: "67.7%", top: "49.2%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#8CC63F] opacity-75" />
                    <span className="relative h-3 w-3 rounded-full border-2 border-white bg-[#8CC63F] shadow-md ring-2 ring-[#0B3B24]" />
                  </span>
                  <div className="mt-1.5 whitespace-nowrap rounded-md bg-[#0B3B24] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#8CC63F] shadow-md border border-[#8CC63F]/30">
                    Dire Dawa (HQ)
                  </div>
                </div>
              </div>

              {/* ORBITING PARTNER LOGOS */}
              {partners.map((partner, index) => {
                // Calculate position along circular orbit
                const angle = (index * 360) / partners.length + rotation - 90;
                const radians = (angle * Math.PI) / 180;
                const radiusPercent = 44; // Orbit radius percent
                const x = 50 + radiusPercent * Math.cos(radians);
                const y = 50 + radiusPercent * Math.sin(radians);
                const isSelected = selectedPartner.id === partner.id;

                return (
                  <button
                    key={partner.id}
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setSelectedPartner(partner)}
                    aria-label={`Inspect ${partner.name}`}
                    aria-pressed={isSelected}
                    className={`absolute z-30 flex h-11 w-11 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full border-2 bg-white p-1.5 sm:p-2.5 shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#8CC63F] ${
                      isSelected
                        ? "border-[#8CC63F] ring-4 ring-[#8CC63F]/25 shadow-xl shadow-[#0B3B24]/15 scale-110 z-40 bg-white"
                        : "border-[#E8F3EC] opacity-90 hover:opacity-100"
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-full flex items-center justify-center">
                      <Image
                        src={partner.logoPath}
                        alt={`${partner.name} logo`}
                        fill
                        sizes="64px"
                        draggable={false}
                        className="object-contain p-1 pointer-events-none"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SPACED HUB LEGEND OUTSIDE ORBIT - Guaranteed Zero Overlap */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-2 text-xs font-semibold text-[#0B3B24] shadow-xs">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8CC63F]" />
                <span>Dire Dawa Headquarters</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-2 text-xs font-semibold text-[#0B3B24] shadow-xs">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B3B24]" />
                <span>Addis Ababa Capital Hub</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* 2. SYNCED SIDE-PANEL CARD                                 */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
            aria-live="polite"
          >
            <div className="rounded-3xl border border-[#E8F3EC] bg-white p-7 sm:p-9 shadow-xl shadow-[#0B3B24]/5">
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-3 border-b border-[#E8F3EC] pb-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F3EC]">
                    {getTierIcon(selectedPartner.tier)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                    {selectedPartner.tier} Partner
                  </span>
                </div>

                <span className="rounded-full bg-[#E8F3EC] px-3 py-1 text-[11px] font-semibold text-[#0B3B24]">
                  {selectedPartner.industry}
                </span>
              </div>

              {/* Partner Logo Stage */}
              <div className="mt-6 flex h-24 items-center justify-start">
                <div className="relative h-20 w-44 rounded-2xl border border-[#E8F3EC] bg-[#F7F9F8] p-3 shadow-xs flex items-center justify-center">
                  <Image
                    key={selectedPartner.logoPath}
                    src={selectedPartner.logoPath}
                    alt={`${selectedPartner.name} logo`}
                    fill
                    sizes="180px"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {/* Title & Authority Badges */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B3B24]">
                    {selectedPartner.name}
                  </h3>
                  {selectedPartner.isHealthcare && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0B3B24] px-2.5 py-0.5 text-[10px] font-bold text-[#8CC63F]">
                      <Sparkles className="h-3 w-3" />
                      Authority
                    </span>
                  )}
                </div>

                {/* Description synced from src/data/nanaContent.ts */}
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#1B263B]/75 font-normal">
                  {selectedPartner.description ||
                    "Key strategic partner collaborating with Nana Creative to drive high-impact commercial media campaigns and audience acquisition across Ethiopia."}
                </p>
              </div>

              {/* Synced Highlights List */}
              <div className="mt-6 space-y-2.5 rounded-2xl bg-[#F7F9F8] p-4 text-xs font-medium text-[#0B3B24]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8CC63F] shrink-0" />
                  <span>Verified Creative Production by Nana Creative</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8CC63F] shrink-0" />
                  <span>Active Deployment in Dire Dawa &amp; Addis Ababa</span>
                </div>
              </div>

              {/* Watch Content Link */}
              <div className="mt-8 pt-6 border-t border-[#E8F3EC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <a
                  href={selectedPartner.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B3B24] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0B3B24]/15 transition-all duration-300 hover:bg-[#082A19] hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Watch Content</span>
                  <ArrowUpRight className="h-4 w-4 text-[#8CC63F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="text-xs font-mono text-[#1B263B]/50 text-center sm:text-right">
                  Partner {partners.findIndex((p) => p.id === selectedPartner.id) + 1} of{" "}
                  {partners.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
