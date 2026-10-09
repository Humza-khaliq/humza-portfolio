"use client";

import { useEffect, useRef } from "react";

/** Full-bleed looping video behind everything, with a soft vignette for legibility. */
export function Background() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <video
        ref={ref}
        className="h-full w-full scale-[1.04] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/bg-poster.jpg"
      >
        <source src="/media/bg.webm" type="video/webm" />
        <source src="/media/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,transparent_0%,rgba(7,8,10,.35)_60%,rgba(7,8,10,.85)_100%)]" />
    </div>
  );
}
