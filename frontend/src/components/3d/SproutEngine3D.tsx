"use client";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import MouseSproutModel from "./MouseSproutModel";

function SceneFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
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
        Awakening 3D Sprout Engine...
      </p>
    </div>
  );
}

interface SproutEngine3DProps {
  containerClassName?: string;
  scrollTriggerElement?: HTMLElement | null;
}

export default function SproutEngine3D({
  containerClassName = "h-[460px] md:h-[620px] w-full",
  scrollTriggerElement,
}: SproutEngine3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl bg-radial from-[#F7F9F8] via-[#FFFFFF] to-[#E8F3EC]/30 p-2 shadow-2xl shadow-[#0B3B24]/5 border border-[#E8F3EC] ${containerClassName}`}
    >

      {/* R3F WebGL Canvas */}
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: [0, 0.4, 5.0], fov: 38 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        >
          {/* Studio Lights */}
          <ambientLight intensity={0.8} color="#F7F9F8" />

          {/* Key Light for metallic mouse highlights */}
          <directionalLight
            position={[4, 8, 5]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
            color="#FFFFFF"
          />

          {/* Luminous Rim Light for Translucent Emerald Leaves */}
          <directionalLight
            position={[-4, 4, -4]}
            intensity={2.8}
            color="#8CC63F"
          />

          {/* Soft Bottom Fill Light */}
          <directionalLight
            position={[0, -3, 2]}
            intensity={0.6}
            color="#E8F3EC"
          />

          {/* 3D Model Instance */}
          <MouseSproutModel
            scrollTriggerElement={scrollTriggerElement}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
