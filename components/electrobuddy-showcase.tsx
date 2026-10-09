"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Camera, Hand, MessageSquare, Thermometer } from "lucide-react";
import { DeskBuddy } from "./desk-buddy";
import type { OledEyesHandle } from "./oled-eyes";
import type { Mood } from "@/lib/roboeyes";
import type { Project } from "@/lib/data";

const MOODS: Mood[] = ["default", "happy", "tired", "angry"];
const MOOD_LABEL: Record<Mood, string> = { default: "Neutral", happy: "Happy", tired: "Sleepy", angry: "Grumpy" };

type Part = { id: string; label: string; ok: boolean; say: string; glyph: React.ReactNode };

const PARTS: Part[] = [
  {
    id: "res",
    label: "220Ω",
    ok: true,
    say: "220Ω resistor. That's the right value for your LED. Go for it.",
    glyph: (
      <svg viewBox="0 0 48 16" className="h-4 w-12" aria-hidden>
        <path d="M0 8h10M38 8h10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="3" width="28" height="10" rx="5" fill="#d8c39a" />
        <rect x="15" y="3" width="2.5" height="10" fill="#c0392b" />
        <rect x="20" y="3" width="2.5" height="10" fill="#c0392b" />
        <rect x="25" y="3" width="2.5" height="10" fill="#6b3e1d" />
        <rect x="31" y="3" width="2.5" height="10" fill="#c9a43a" />
      </svg>
    ),
  },
  {
    id: "led",
    label: "LED",
    ok: false,
    say: "Hold up. That LED is in backwards. Long leg goes to +.",
    glyph: (
      <svg viewBox="0 0 24 28" className="h-6 w-5" aria-hidden>
        <path d="M5 12a7 7 0 0 1 14 0v6H5z" fill="#ff5a5a" opacity=".9" />
        <rect x="3" y="18" width="18" height="3" rx="1" fill="#ff7b7b" />
        <path d="M9 21v7M15 21v5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "cap",
    label: "10µF",
    ok: true,
    say: "Electrolytic cap with the stripe to ground. Looks good.",
    glyph: (
      <svg viewBox="0 0 20 28" className="h-6 w-4" aria-hidden>
        <rect x="3" y="2" width="14" height="18" rx="3" fill="#2f5fd0" />
        <rect x="12" y="2" width="3" height="18" fill="#cfd8ff" opacity=".8" />
        <path d="M7 20v8M13 20v6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "wire",
    label: "5V→A4",
    ok: false,
    say: "Nope. A4 is SDA for the OLED, not 5V. Move that jumper.",
    glyph: (
      <svg viewBox="0 0 40 20" className="h-5 w-10" aria-hidden>
        <path d="M3 16C10 2 30 2 37 16" fill="none" stroke="#f2b84b" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="0" y="14" width="6" height="5" rx="1" fill="#333" />
        <rect x="34" y="14" width="6" height="5" rx="1" fill="#333" />
      </svg>
    ),
  },
];

const FEATURES = [
  { icon: Camera, t: "Camera tracking", d: "Eyes follow me around the desk" },
  { icon: MessageSquare, t: "Talks me through it", d: "Spots wrong parts and says why" },
  { icon: Hand, t: "Touch sensor", d: "Tap its head to change its mood" },
  { icon: Thermometer, t: "Temp sensor", d: "Keeps an eye on the bench" },
];

export function ElectroBuddyShowcase({ project }: { project: Project }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const eyes = useRef<OledEyesHandle>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.45 });
  const [awake, setAwake] = useState(false);
  const [moodIdx, setMoodIdx] = useState(1);
  const [touching, setTouching] = useState(false);
  const [say, setSay] = useState<{ text: string; ok: boolean } | null>(null);
  const [hoverMood, setHoverMood] = useState<Mood | null>(null);
  const [temp, setTemp] = useState(23.4);
  const [tracking, setTracking] = useState(false);

  // reticle follows the pointer inside the stage ("camera tracking")
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sy = useSpring(ry, { stiffness: 160, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setAwake(true);
      setTimeout(() => eyes.current?.laugh(), 350);
      setSay({ text: "Oh, hey. Pick a part on the bench and I'll check it.", ok: true });
    }, 450);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    const id = setInterval(() => setTemp((v) => +(Math.min(24.8, Math.max(22.6, v + (Math.random() - 0.5) * 0.3))).toFixed(1)), 1800);
    return () => clearInterval(id);
  }, []);

  const mood = hoverMood ?? MOODS[moodIdx];

  const touch = () => {
    setTouching(true);
    setTimeout(() => setTouching(false), 420);
    setMoodIdx((i) => (i + 1) % MOODS.length);
    eyes.current?.laugh();
  };

  const inspect = (part: Part, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    eyes.current?.focus({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setHoverMood(part.ok ? "happy" : "angry");
    if (part.ok) eyes.current?.laugh();
    else eyes.current?.confused();
    setSay({ text: part.say, ok: part.ok });
  };

  const release = () => {
    eyes.current?.focus(null);
    setHoverMood(null);
  };

  return (
    <div className="glass overflow-hidden rounded-[32px]">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* stage */}
        <div
          ref={stageRef}
          className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden border-b border-white/[0.07] px-4 pb-6 pt-24 sm:min-h-[580px] lg:border-b-0 lg:border-r"
          onPointerMove={(e) => {
            const r = stageRef.current!.getBoundingClientRect();
            rx.set(e.clientX - r.left);
            ry.set(e.clientY - r.top);
            if (!tracking) setTracking(true);
          }}
          onPointerLeave={() => setTracking(false)}
        >
          {/* subtle bench grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_55%,#000,transparent)]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* camera reticle */}
          <motion.div
            aria-hidden
            style={{ x: sx, y: sy }}
            animate={{ opacity: tracking && awake ? 1 : 0 }}
            className="pointer-events-none absolute left-0 top-0 z-0"
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2" style={{ width: 74, height: 74 }}>
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
                <span key={c} className={`absolute size-3 border-ice/70 ${c}`} />
              ))}
              <span className="absolute -bottom-5 left-0 font-pixel text-[9px] tracking-widest text-ice/70">TARGET</span>
            </div>
          </motion.div>

          {/* HUD */}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 sm:left-5 sm:top-5">
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-pixel text-[11px] tracking-wider text-ink/85">
              <Thermometer className="size-3.5 text-ice/80" aria-hidden /> {temp.toFixed(1)}°C
            </span>
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-pixel text-[11px] tracking-wider text-ink/85">
              <span className={`size-1.5 rounded-full ${tracking && awake ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,.9)]" : "bg-white/30"}`} />
              CAM {tracking && awake ? "TRACKING" : "IDLE"}
            </span>
          </div>
          <button
            type="button"
            onClick={touch}
            className="glass absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-pixel text-[11px] tracking-wider text-ink/85 transition hover:text-white sm:right-5 sm:top-5"
          >
            MOOD: {MOOD_LABEL[mood].toUpperCase()}
          </button>

          {/* speech */}
          <div className="relative z-10 mb-4 h-16 w-full max-w-[340px]">
            <AnimatePresence mode="wait">
              {say && awake && (
                <motion.p
                  key={say.text}
                  role="status"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
                  className={`glass mx-auto w-fit rounded-2xl rounded-bl-sm px-4 py-2.5 text-[13px] leading-snug ${say.ok ? "text-ink/90" : "text-[#ffb4b4]"}`}
                >
                  {say.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="relative z-10"
            initial={{ y: 60, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
          >
            <DeskBuddy ref={eyes} size={250} mood={mood} asleep={!awake} onTouch={touch} touching={touching} />
          </motion.div>
          <p className="relative z-10 mt-7 font-mono text-[11px] text-faint">tap the pad on its head ↑</p>

          {/* the bench */}
          <ul className="relative z-10 mt-5 flex flex-wrap justify-center gap-2" aria-label="Parts on the bench. Focus one to have ElectroBuddy check it">
            {PARTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onPointerEnter={(e) => inspect(p, e.currentTarget)}
                  onFocus={(e) => inspect(p, e.currentTarget)}
                  onClick={(e) => inspect(p, e.currentTarget)}
                  onPointerLeave={release}
                  onBlur={release}
                  className="glass flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] text-ink/80 transition hover:-translate-y-0.5 hover:text-white"
                >
                  <span className="text-ink/60">{p.glyph}</span>
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* copy */}
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ice/10 px-2.5 py-1 font-mono text-[11px] text-ice">Featured · Hardware</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" /> {project.status}
              </span>
            </div>
            <h3 className="mt-6 font-serif text-[clamp(3rem,6vw,4.75rem)] leading-[0.9] tracking-[-0.03em]">
              Electro<em className="text-ice">Buddy</em>
            </h3>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-mute">{project.summary}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Icon className="size-4 text-ice/80" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[14px] text-ink">{t}</span>
                    <span className="block text-[13px] text-mute">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink/70">
                  {s}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-black transition hover:bg-white"
            >
              See the real build
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
