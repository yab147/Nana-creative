
"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";

function MousePlant() {
  return (
    <svg
      viewBox="0 0 600 680"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="A computer mouse with a cable growing into a leafy plant"
      role="img"
    >
      <defs>
        <linearGradient id="mouseGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8BCF35" />
          <stop offset="100%" stopColor="#087B37" />
        </linearGradient>

        <linearGradient id="leafGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A5DF49" />
          <stop offset="100%" stopColor="#087B37" />
        </linearGradient>
      </defs>

      {/* Mouse cable */}
      <path
        d="M285 550 C340 500 260 450 190 420 C110 385 135 340 205 320 C270 300 350 330 370 280 C390 230 330 210 350 150 C365 100 390 80 410 40"
        stroke="#16834A"
        strokeWidth="9"
        strokeLinecap="round"
        pathLength="1"
        className="vine-path"
      />

      {/* Main stem */}
      <path
        d="M350 150 C310 120 285 95 290 50"
        stroke="#16834A"
        strokeWidth="7"
        strokeLinecap="round"
        pathLength="1"
        className="vine-branch branch-one"
      />

      {/* Left branch */}
      <path
        d="M215 320 C170 285 130 280 95 255"
        stroke="#16834A"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength="1"
        className="vine-branch branch-two"
      />

      {/* Right branch */}
      <path
        d="M350 205 C400 185 430 160 445 120"
        stroke="#16834A"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength="1"
        className="vine-branch branch-three"
      />

      {/* Leaves */}
      <g className="leaf leaf-one">
        <path
          d="M290 50 C235 10 220 65 290 105 C315 75 315 45 290 50Z"
          fill="url(#leafGreen)"
        />
        <path d="M290 50 L290 100" stroke="#E9F6EE" strokeWidth="2" />
      </g>

      <g className="leaf leaf-two">
        <path
          d="M410 40 C405 -15 470 -20 480 35 C460 65 435 65 410 40Z"
          fill="url(#leafGreen)"
        />
        <path d="M410 40 L470 25" stroke="#E9F6EE" strokeWidth="2" />
      </g>

      <g className="leaf leaf-three">
        <path
          d="M95 255 C35 220 55 175 120 195 C145 215 130 240 95 255Z"
          fill="url(#leafGreen)"
        />
        <path d="M95 255 L75 205" stroke="#E9F6EE" strokeWidth="2" />
      </g>

      <g className="leaf leaf-four">
        <path
          d="M445 120 C460 65 520 80 510 135 C485 160 465 150 445 120Z"
          fill="url(#leafGreen)"
        />
        <path d="M445 120 L495 100" stroke="#E9F6EE" strokeWidth="2" />
      </g>

      {/* Mouse body */}
      <g className="mouse-body">
        <ellipse
          cx="290"
          cy="570"
          rx="95"
          ry="65"
          fill="url(#mouseGreen)"
        />

        <path
          d="M290 505 V565"
          stroke="#0B542B"
          strokeWidth="3"
        />

        <rect
          x="280"
          y="520"
          width="20"
          height="28"
          rx="10"
          fill="#E9F6EE"
        />

        <ellipse
          cx="290"
          cy="570"
          rx="95"
          ry="65"
          stroke="#0B542B"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setPosition({
      x: x * 16,
      y: y * 16,
    });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100svh-112px)] overflow-hidden bg-[#FCFDFC]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-brand-light/60 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-6 pb-24 pt-8 md:min-h-[calc(100svh-112px)] md:grid-cols-2 md:gap-8 md:py-8">

        {/* Text content */}
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-brand-light/70 px-4 py-2">
            <span className="h-1 w-6 rounded-full bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
              Creative Ideas. Meaningful Impact.
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-tight text-[#14221B] md:text-7xl">
            We grow ideas
            <br />
            that grow
            <br />
            <span className="text-brand-primary">
              businesses.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-gray-600">
            Nana Creative helps brands stand out, connect
            with people, and grow through thoughtful design
            and digital solutions.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/contact"
              className="rounded-xl bg-brand-primary px-7 py-4 font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-1 hover:bg-brand-dark"
            >
              Let's Work Together ↗
            </Link>

            <Link
              href="/portfolio"
              className="rounded-xl border border-gray-400 px-7 py-4 font-semibold text-gray-900 transition hover:border-brand-primary hover:bg-brand-light"
            >
              Explore Our Work ↗
            </Link>
          </div>
        </div>

        {/* Interactive illustration */}
        <div className="relative flex min-h-[320px] items-center justify-center md:min-h-[460px]">
          <div className="absolute inset-0 rounded-full bg-brand-light/50 blur-3xl" />

          <div
            className="relative h-[340px] w-full max-w-[420px] transition-transform duration-300 ease-out will-change-transform md:h-[460px]"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          >
            <MousePlant />
          </div>
        </div>
      </div>

      {/* Background waves */}
      <div className="pointer-events-none absolute bottom-20 left-0 h-32 w-full -rotate-3 rounded-[50%] border-t border-brand-light/80 opacity-70" />
    </section>
  );
}
