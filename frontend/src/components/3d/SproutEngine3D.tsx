"use client";

import React from "react";
import NanaInteractiveLogo3D from "@/modules/three/components/NanaInteractiveLogo3D";

interface SproutEngine3DProps {
  containerClassName?: string;
  scrollTriggerElement?: HTMLElement | null;
}

export default function SproutEngine3D({
  containerClassName = "h-[380px] sm:h-[460px] md:h-[520px] lg:h-[620px] w-full",
}: SproutEngine3DProps) {
  return <NanaInteractiveLogo3D className={containerClassName} />;
}
