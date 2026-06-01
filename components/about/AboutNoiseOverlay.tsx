"use client";

import Noise from "@/components/ui/Noise";

export function AboutNoiseOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-3 mix-blend-overlay">
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={70}
      />
    </div>
  );
}
