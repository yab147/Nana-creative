"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Partner = {
  id: number;
  name: string;
  description: string;
  logo: string;
  website?: string;
};

// Replace these examples with your real partner information.
const partners: Partner[] = [
  {
    id: 1,
    name: "Organization One",
    description: "A creative collaboration with Nana Creative.",
    logo: "/images/partners/partner-1.jpeg",
  },
  {
    id: 2,
    name: "Organization Two",
    description: "Working together to create meaningful solutions.",
    logo: "/images/partners/partner-2.jpeg",
  },
  {
    id: 3,
    name: "Organization Three",
    description: "A valued organization in our growing network.",
    logo: "/images/partners/partner-3.jpeg",
  },
  {
    id: 4,
    name: "Organization Four",
    description: "Building opportunities through collaboration.",
    logo: "/images/partners/partner-4.jpeg",
  },
  {
    id: 5,
    name: "Organization Five",
    description: "Creating new opportunities through a shared vision.",
    logo: "/images/partners/partner-5.jpeg",
  },
  {
    id: 6,
    name: "Organization Six",
    description: "A partner organization that shares our values.",
    logo: "/images/partners/partner-6.jpeg",
  },
];

export default function PartnersMap() {
  const [rotation, setRotation] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState<Partner>(partners[0]);
  const [isDragging, setIsDragging] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const previousAngle = useRef<number | null>(null);

  // Rotate automatically. The effect pauses while the user is dragging.
  useEffect(() => {
    if (isDragging) return;

    const interval = window.setInterval(() => {
      setRotation((current) => (current + 0.25) % 360);
    }, 30);

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

    // Avoid a sudden jump when the pointer crosses the -PI / PI boundary.
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

  return (
    <section id="partnerships" className="overflow-hidden bg-[#F8FBF8] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold uppercase tracking-[4px] text-brand-primary">
            Our Network
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-dark md:text-5xl">
            Growing Together Across Ethiopia
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Our partnerships connect ideas, organizations, and opportunities.
            Explore the organizations that are part of our journey.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          {/* Orbit: the map remains fixed while partner logos move around it. */}
          <div className="flex justify-center">
            <div
              ref={orbitRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative aspect-square w-full max-w-[520px] touch-none select-none rounded-full ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              role="group"
              aria-label="Partner logos orbiting around a map of Ethiopia. Drag to rotate."
            >
              <div className="absolute inset-[7%] rounded-full border border-dashed border-brand-primary/40" />
              <div className="absolute inset-[18%] rounded-full border border-brand-primary/10" />

              {/* Add the real Ethiopia SVG at public/images/ethiopia-map.svg */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[58%] w-[68%] -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/ethiopia-map.png"
                  alt="Map outline of Ethiopia"
                  fill
                  sizes="(max-width: 768px) 60vw, 320px"
                  className="object-contain"
                  priority
                />
                {/* Approximate marker position; adjust after checking your SVG. */}
                <span className="absolute left-[72%] top-[49%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute h-8 w-8 animate-ping rounded-full bg-brand-primary/25" />
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-primary shadow-md" />
                </span>
                <span className="absolute left-[74%] top-[43%] whitespace-nowrap rounded-md bg-brand-dark px-2 py-1 text-[10px] font-bold text-white shadow">
                  Dire Dawa
                </span>
              </div>

              {partners.map((partner, index) => {
                const angle = (index * 360) / partners.length + rotation - 90;
                const radians = (angle * Math.PI) / 180;
                const radius = 43;
                const x = 50 + radius * Math.cos(radians);
                const y = 50 + radius * Math.sin(radians);
                const isSelected = selectedPartner.id === partner.id;

                return (
                  <button
                    key={partner.id}
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setSelectedPartner(partner)}
                    aria-label={`View ${partner.name}`}
                    aria-pressed={isSelected}
                    className={`absolute z-20 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 bg-white p-3 shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-brand-primary md:h-[88px] md:w-[88px] ${isSelected
                      ? "border-brand-primary shadow-green-900/20 ring-4 ring-brand-primary/10"
                      : "border-white"
                      }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={64}
                      height={64}
                      draggable={false}
                      className="pointer-events-none h-full w-full object-contain"
                    />
                  </button>
                );
              })}

              <div className="pointer-events-none absolute bottom-[1%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-dark shadow-sm">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-primary" />
                DIRE DAWA, ETHIOPIA
              </div>
            </div>
          </div>

          {/* The selected partner object drives every field in this panel. */}
          <aside
            className="mx-auto w-full max-w-md"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="min-h-[360px] rounded-3xl border border-brand-light bg-white p-8 shadow-xl shadow-green-900/5">
              <span className="text-xs font-bold uppercase tracking-[3px] text-brand-primary">
                Partnership
              </span>

              <div className="mt-6 flex h-24 items-center justify-start">
                <Image
                  key={selectedPartner.logo}
                  src={selectedPartner.logo}
                  alt={`${selectedPartner.name} logo`}
                  width={180}
                  height={90}
                  className="h-20 w-auto max-w-[180px] object-contain"
                />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Partner {partners.findIndex((p) => p.id === selectedPartner.id) + 1} of {partners.length}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand-dark">
                {selectedPartner.name}
              </h3>
              <p className="mt-4 min-h-14 leading-7 text-gray-600">
                {selectedPartner.description}
              </p>

              {selectedPartner.website ? (
                <a
                  href={selectedPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex font-semibold text-brand-primary hover:text-brand-dark"
                >
                  Visit organization <span aria-hidden="true" className="ml-1">↗</span>
                </a>
              ) : (
                <p className="mt-6 text-sm text-gray-400">Website not added yet</p>
              )}

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-gray-500">
                  Select any partner logo to view its information. Drag the orbit to rotate the network.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
