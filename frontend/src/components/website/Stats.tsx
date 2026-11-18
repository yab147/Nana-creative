import React from "react";
import { getBrandProfileSync } from "@/data/brandProfile";
import { Sprout, MapPin, Layers, Sparkles } from "lucide-react";

export default function Stats() {
  const brand = getBrandProfileSync();

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "sprout":
        return <Sprout className="h-6 w-6 text-[#8CC63F]" />;
      case "map-pin":
        return <MapPin className="h-6 w-6 text-[#8CC63F]" />;
      case "layers":
        return <Layers className="h-6 w-6 text-[#8CC63F]" />;
      default:
        return <Sparkles className="h-6 w-6 text-[#8CC63F]" />;
    }
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-3xl border border-[#E8F3EC] bg-white/90 p-8 shadow-xl shadow-[#0B3B24]/5 backdrop-blur-xl">
        {brand.hero.metrics.map((metric, index) => (
          <div
            key={metric.id}
            className={`flex items-center gap-4 ${
              index < brand.hero.metrics.length - 1
                ? "sm:border-r border-[#E8F3EC] sm:pr-6"
                : ""
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EC]">
              {getIcon(metric.icon)}
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-[#082A19]">
                {metric.value}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                {metric.label}
              </p>
              {metric.sublabel && (
                <p className="text-xs text-[#082A19]/60">{metric.sublabel}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
