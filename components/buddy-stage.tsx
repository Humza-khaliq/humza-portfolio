"use client";

import { useRef, useState } from "react";
import { DeskBuddy } from "./desk-buddy";
import type { OledEyesHandle } from "./oled-eyes";
import type { Mood } from "@/lib/roboeyes";

const MOODS: Mood[] = ["happy", "default", "tired", "angry"];

export function BuddyStage() {
  const eyes = useRef<OledEyesHandle>(null);
  const [i, setI] = useState(0);
  const [touching, setTouching] = useState(false);
  return (
    <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 py-10">
      <DeskBuddy
        ref={eyes}
        size={240}
        mood={MOODS[i]}
        touching={touching}
        onTouch={() => {
          setI((v) => (v + 1) % MOODS.length);
          setTouching(true);
          setTimeout(() => setTouching(false), 400);
          eyes.current?.laugh();
        }}
      />
      <p className="font-mono text-[11px] text-faint">tap its head · it&apos;s watching your cursor</p>
    </div>
  );
}
