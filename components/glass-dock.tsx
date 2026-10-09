"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Glass } from "@samasante/liquid-glass";

/**
 * Web port of LiquidGlassLinkPicker (SwiftUI): a glass capsule of ticks.
 * Pointer: hover to preview, click to select. Touch: scrub and release.
 * Keyboard: Tab to the dock, arrows to move, Enter to jump.
 */

const PADDING = 12;
const IDLE = 15;
const EXPANDED = 19;
const LABEL = 66;
const HIT_H = 64;

type Props = {
  titles: string[];
  current: number;
  onSelect: (index: number) => void;
};

export function GlassDock({ titles, current, onSelect }: Props) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [drag, setDrag] = useState<{ anchor: number; index: number; startX: number } | null>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const active = drag?.index ?? hovered;
  const expanded = active !== null;
  const n = titles.length;
  const maxW = PADDING * 2 + Math.max(0, n - 1) * EXPANDED + LABEL;
  const visualW = expanded ? maxW : PADDING * 2 + n * IDLE;

  const spring = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : expanded
          ? { type: "spring" as const, stiffness: 520, damping: 39 }
          : { type: "spring" as const, stiffness: 300, damping: 33 },
    [expanded, reduce],
  );

  const initialIndex = useCallback(
    (x: number): number | null => {
      if (!n) return null;
      const origin = (maxW - visualW) / 2 + PADDING;
      if (active !== null) {
        const start = origin + active * EXPANDED;
        if (x >= start - 3 && x <= start + LABEL + 3) return active;
      }
      let edge = origin;
      for (let i = 0; i < n; i++) {
        edge += i === active ? LABEL : expanded ? EXPANDED : IDLE;
        if (x < edge) return i;
      }
      return n - 1;
    },
    [n, maxW, visualW, active, expanded],
  );

  const dragIndex = (anchor: number, dx: number, prev: number) => {
    const pos = anchor + dx / EXPANDED;
    const tol = 0.5 + 2 / EXPANDED;
    if (prev >= 0 && prev < n && Math.abs(pos - prev) <= tol) return prev;
    return Math.round(Math.min(Math.max(pos, 0), n - 1));
  };

  const localX = (e: React.PointerEvent) => e.clientX - (hitRef.current?.getBoundingClientRect().left ?? 0);

  // light haptic while scrubbing on phones
  const lastIdx = useRef<number | null>(null);
  useEffect(() => {
    if (drag && lastIdx.current !== null && lastIdx.current !== drag.index) navigator.vibrate?.(8);
    lastIdx.current = drag?.index ?? null;
  }, [drag]);

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom))] z-50 flex justify-center"
    >
      <div
        ref={hitRef}
        className="pointer-events-auto relative touch-none"
        style={{ width: maxW, height: HIT_H }}
        onPointerMove={(e) => {
          if (drag) {
            const next = dragIndex(drag.anchor, e.clientX - drag.startX, drag.index);
            if (next !== drag.index) setDrag({ ...drag, index: next });
          } else if (e.pointerType === "mouse") {
            const next = initialIndex(localX(e));
            if (next !== hovered) setHovered(next);
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse" && !drag) setHovered(null);
        }}
        onPointerDown={(e) => {
          const start = initialIndex(localX(e));
          if (start === null) return;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setDrag({ anchor: start, index: start, startX: e.clientX });
        }}
        onPointerUp={(e) => {
          if (!drag) return;
          const idx = dragIndex(drag.anchor, e.clientX - drag.startX, drag.index);
          setDrag(null);
          if (e.pointerType !== "mouse") setHovered(null);
          onSelect(idx);
        }}
        onPointerCancel={() => {
          setDrag(null);
          setHovered(null);
        }}
      >
        {/* capsule */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          initial={false}
          animate={{ width: visualW, height: expanded ? 46 : 32, x: "-50%", y: "-50%" }}
          transition={spring}
        >
          <Glass
            className="glass-dock-capsule"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              background: "var(--pill-bg)",
            }}
            optics={{ frost: 6, dispersion: 0.35 }}
          >
            <span className="sr-only">Sections</span>
          </Glass>
        </motion.div>

        {/* ticks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center"
          style={{ paddingInline: PADDING }}
        >
          {titles.map((t, i) => {
            const selected = active === i;
            const dist = active === null ? 100 : Math.abs(i - active);
            const isCurrent = i === current;
            const h = dist === 1 ? 21 : dist === 2 ? 17 : 13;
            const op = selected ? 1 : dist === 1 ? 0.68 : dist === 2 ? 0.48 : isCurrent ? 0.85 : 0.23;
            const tickW = dist < 3 ? 6 : 4.5;
            const slot = selected ? LABEL : expanded ? EXPANDED : IDLE;
            return (
              <motion.div
                key={t}
                className="flex items-center justify-center"
                initial={false}
                animate={{ width: slot }}
                transition={spring}
                style={{ height: 34 }}
              >
                <motion.button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  tabIndex={i === current ? 0 : -1}
                  aria-current={isCurrent ? "true" : undefined}
                  aria-label={`Go to ${t}`}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const next = Math.max(0, Math.min(n - 1, i + (e.key === "ArrowRight" ? 1 : -1)));
                      buttons.current[next]?.focus();
                    }
                  }}
                  onClick={() => onSelect(i)}
                  className="relative overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  initial={false}
                  animate={{
                    width: selected ? LABEL - 8 : tickW,
                    height: selected ? 29 : expanded ? h : isCurrent ? 14 : 10,
                    borderRadius: selected ? 9 : tickW / 2,
                    opacity: op,
                  }}
                  transition={spring}
                >
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[11px] font-medium tracking-tight text-black"
                    initial={false}
                    animate={{ opacity: selected ? 1 : 0 }}
                    transition={{ duration: selected ? 0.18 : 0.08, delay: selected ? 0.05 : 0 }}
                  >
                    {t}
                  </motion.span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
