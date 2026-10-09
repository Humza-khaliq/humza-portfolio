"use client";
import { OledEyes } from "./oled-eyes";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/data";

/** Autoplays the project's demo clip only while it's on screen. */
export function ProjectVideo({ project, className = "" }: { project: Project; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  if (!project.video) return null;
  return (
    <video ref={ref} className={className} muted loop playsInline preload="metadata" aria-label={`${project.name} demo`}>
      {project.video.webm && <source src={project.video.webm} type="video/webm" />}
      <source src={project.video.mp4} type="video/mp4" />
    </video>
  );
}

/** Animated "listening" visual for JARVIS: wake word → waveform → reply. */
export function JarvisVisual({ large = false }: { large?: boolean }) {
  const bars = Array.from({ length: large ? 48 : 32 });
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden bg-[radial-gradient(60%_60%_at_50%_45%,rgba(120,200,255,.16),transparent_70%)]">
      <div className="relative grid place-items-center">
        <span className="absolute size-28 animate-ping rounded-full border border-ice/20 [animation-duration:2.8s]" />
        <span className="absolute size-20 rounded-full border border-ice/30" />
        <span className="size-12 rounded-full bg-[radial-gradient(circle_at_40%_35%,#e8f8ff,#7cc8ff_45%,#1b4f80_100%)] shadow-[0_0_40px_rgba(124,200,255,.6)]" />
      </div>
      <div className="flex h-10 items-center gap-[3px]" aria-hidden>
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[3px] origin-center rounded-full bg-ice/80"
            style={{
              height: `${30 + Math.abs(Math.sin(i * 1.7)) * 70}%`,
              animation: `wave ${0.9 + (i % 5) * 0.17}s ease-in-out ${(i % 7) * 0.08}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="font-mono text-[11px] tracking-wide text-mute">
        <span className="text-ice">“Hey Jarvis”</span> → whisper → llama 3.3 → elevenlabs
      </p>
    </div>
  );
}

/** Volt's OLED face: the real RoboEyes port, glowing on a black screen. */
export function VoltVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(55%_55%_at_50%_50%,rgba(120,200,255,.12),transparent_70%)]">
      <div className="relative aspect-[2/1] w-[62%] overflow-hidden rounded-2xl bg-black shadow-[inset_0_0_0_3px_#0c0d10,0_20px_60px_-20px_rgba(0,0,0,.8)] ring-1 ring-white/10">
        <div className="absolute inset-[9%] [filter:drop-shadow(0_0_4px_rgba(165,225,255,.75))_drop-shadow(0_0_14px_rgba(120,200,255,.35))]">
          <OledEyes />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,.1)_0%,transparent_40%)]" />
      </div>
      <p className="absolute bottom-4 font-mono text-[11px] tracking-wide text-mute">it&apos;s watching your cursor</p>
    </div>
  );
}
