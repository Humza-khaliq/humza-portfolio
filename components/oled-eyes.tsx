"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { RoboEyes, type Mood } from "@/lib/roboeyes";

export type OledEyesHandle = {
  confused: () => void;
  laugh: () => void;
  /** Point the eyes at a page coordinate (clientX/clientY). Pass null to release. */
  focus: (pt: { x: number; y: number } | null) => void;
};

type Props = {
  mood?: Mood;
  /** Follow the pointer anywhere on the page. */
  follow?: boolean;
  /** Eyes closed (asleep) — e.g. before scrolling into view. */
  asleep?: boolean;
  className?: string;
};

export const OledEyes = forwardRef<OledEyesHandle, Props>(function OledEyes(
  { mood = "default", follow = true, asleep = false, className },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyesRef = useRef<RoboEyes | null>(null);
  const focusRef = useRef<{ x: number; y: number } | null>(null);

  useImperativeHandle(ref, () => ({
    confused: () => eyesRef.current?.confused(),
    laugh: () => eyesRef.current?.laugh(),
    focus: (pt) => {
      focusRef.current = pt;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const eyes = new RoboEyes(canvas);
    eyesRef.current = eyes;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let pointer: { x: number; y: number } | null = null;

    const steer = (pt: { x: number; y: number }) => {
      const r = canvas.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // normalise by a comfortable "field of view" around the face
      const nx = (pt.x - cx) / Math.max(260, r.width * 2);
      const ny = (pt.y - cy) / Math.max(200, r.height * 2.4);
      eyes.look(nx, ny);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    if (follow) window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = focusRef.current ?? (follow ? pointer : null);
      if (target) steer(target);
      eyes.idle = !target;
      eyes.update(now, reduce ? 1 : dt);
      eyes.draw(now);
      if (visible) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      eyesRef.current = null;
    };
  }, [follow]);

  useEffect(() => {
    eyesRef.current?.setMood(mood);
  }, [mood]);

  useEffect(() => {
    const e = eyesRef.current;
    if (!e) return;
    if (asleep) e.close();
    else e.open();
  }, [asleep]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ imageRendering: "pixelated", width: "100%", height: "100%", display: "block" }}
    />
  );
});
