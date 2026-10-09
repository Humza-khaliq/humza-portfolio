"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { OledEyes, type OledEyesHandle } from "./oled-eyes";
import type { Mood } from "@/lib/roboeyes";

type Props = {
  mood?: Mood;
  asleep?: boolean;
  /** px width of the whole device */
  size?: number;
  /** tap on the head's touch pad */
  onTouch?: () => void;
  touching?: boolean;
  tilt?: boolean;
  showLed?: boolean;
};

/**
 * A little CSS-built model of ElectroBuddy: rounded two-piece shell, OLED face
 * running the real RoboEyes behaviour, a camera on top and a capacitive touch
 * pad on its head.
 */
export const DeskBuddy = forwardRef<OledEyesHandle, Props>(function DeskBuddy(
  { mood = "default", asleep = false, size = 260, onTouch, touching = false, tilt = true, showLed = true },
  eyesRef,
) {
  const wrap = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const shine = useTransform(sry, [-14, 14], ["30%", "70%"]);

  useEffect(() => {
    if (!tilt) return;
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ry.set(Math.max(-1, Math.min(1, nx * 1.6)) * 14);
      rx.set(Math.max(-1, Math.min(1, -ny * 1.6)) * 10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tilt, rx, ry]);

  const s = size / 260; // design was drawn at 260px

  return (
    <div ref={wrap} style={{ width: size, height: size * 0.98, perspective: 900 }} className="relative select-none">
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        animate={{ y: [0, -6 * s, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* camera module */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-t-[14px] bg-gradient-to-b from-[#2a2c30] to-[#16171a] shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
          style={{ top: 0, width: 64 * s, height: 22 * s }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#5fb7ff_0,#123a5c_32%,#05070a_62%)] ring-1 ring-white/10"
            style={{ width: 14 * s, height: 14 * s }}
          />
          <span
            className="absolute rounded-full bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,.7)] animate-[rec_1.6s_ease-in-out_infinite]"
            style={{ right: 9 * s, top: 8 * s, width: 4 * s, height: 4 * s }}
          />
        </div>

        {/* shell */}
        <motion.div
          className="absolute inset-x-0 overflow-hidden"
          style={{
            top: 18 * s,
            bottom: 0,
            borderRadius: `${64 * s}px ${64 * s}px ${48 * s}px ${48 * s}px`,
            background: "linear-gradient(165deg,#f6f3ec 0%,#e3ded3 55%,#c9c3b7 100%)",
            boxShadow: `inset 0 ${2 * s}px ${1 * s}px rgba(255,255,255,.9), inset 0 -${10 * s}px ${24 * s}px rgba(0,0,0,.18), 0 ${30 * s}px ${60 * s}px -${10 * s}px rgba(0,0,0,.7)`,
          }}
        >
          {/* moving specular sheen */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: useTransform(
                shine,
                (p) => `radial-gradient(60% 50% at ${p} 8%, rgba(255,255,255,.85), transparent 70%)`,
              ),
            }}
          />

          {/* touch pad on the head */}
          <button
            type="button"
            onClick={onTouch}
            aria-label="Tap ElectroBuddy's touch sensor to change its mood"
            className="absolute z-10 cursor-pointer rounded-full transition-[box-shadow,transform] duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            style={{
              right: 34 * s,
              top: 14 * s,
              width: 22 * s,
              height: 22 * s,
              background: "radial-gradient(circle at 40% 35%,#fff,#d9d4c9 70%)",
              boxShadow: touching
                ? `0 0 0 ${3 * s}px rgba(165,232,255,.55), 0 0 ${18 * s}px rgba(165,232,255,.9), inset 0 1px 2px rgba(0,0,0,.2)`
                : `inset 0 ${1 * s}px ${2 * s}px rgba(0,0,0,.25), 0 1px 0 rgba(255,255,255,.8)`,
            }}
          />

          {/* OLED face */}
          <div
            className="absolute overflow-hidden bg-black"
            style={{
              left: 26 * s,
              right: 26 * s,
              top: 42 * s,
              height: 118 * s,
              borderRadius: 22 * s,
              boxShadow: `inset 0 0 0 ${3 * s}px #0c0d10, inset 0 ${4 * s}px ${10 * s}px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.7)`,
            }}
          >
            <div
              className="absolute"
              style={{
                inset: `${14 * s}px ${16 * s}px`,
                filter: `drop-shadow(0 0 ${4 * s}px rgba(165,225,255,.75)) drop-shadow(0 0 ${12 * s}px rgba(120,200,255,.35))`,
              }}
            >
              <OledEyes ref={eyesRef} mood={mood} asleep={asleep} />
            </div>
            {/* glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_38%)]" />
          </div>

          {/* two-piece seam */}
          <div
            className="absolute inset-x-0 border-t border-black/15 shadow-[0_1px_0_rgba(255,255,255,.7)]"
            style={{ top: 190 * s }}
          />
          {/* base details */}
          <div className="absolute flex items-center gap-[6px]" style={{ left: 30 * s, top: 206 * s }}>
            {showLed && (
              <span
                className="rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,.8)]"
                style={{ width: 6 * s, height: 6 * s }}
              />
            )}
            <span className="font-pixel text-black/45" style={{ fontSize: 9 * s, letterSpacing: ".08em" }}>
              ELECTROBUDDY
            </span>
          </div>
          {/* speaker grille */}
          <div className="absolute grid grid-cols-4 gap-[3px]" style={{ right: 32 * s, top: 204 * s }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="rounded-full bg-black/25" style={{ width: 4 * s, height: 4 * s }} />
            ))}
          </div>
        </motion.div>
      </motion.div>
      {/* contact shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
        style={{ bottom: -18 * s, width: size * 0.8, height: 22 * s }}
      />
    </div>
  );
});
