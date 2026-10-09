"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionLabel } from "@/components/reveal";
import { experience, type Experience as Exp } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ e }: { e: Exp }) {
  return (
    <div className="glass px-5 py-5 transition duration-500 hover:bg-white/[0.07] sm:px-6">
      <h3 className="text-[17px] font-medium tracking-tight text-ink">{e.role}</h3>
      <p className="font-serif text-xl italic text-ink/80">{e.company}</p>
      <ul className="mt-3 space-y-1.5">
        {e.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-mute">
            <span className="mt-[9px] size-1 shrink-0 rounded-full bg-ice/70" />
            {b}
          </li>
        ))}
      </ul>
      {e.stack && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {e.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink/65">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Meta({ e, align }: { e: Exp; align: "left" | "right" }) {
  return (
    <div className={`pt-3 font-mono text-xs ${align === "right" ? "text-right" : "text-left"}`}>
      <p className="text-ink/80">
        {e.start} – {e.end}
      </p>
      <p className="mt-1 text-faint">{e.location}</p>
    </div>
  );
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="02">Experience</SectionLabel>

        <ol ref={listRef} className="relative">
          {/* trunk: left on mobile, centred from md */}
          <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-ice via-ice/60 to-ice/0 md:left-1/2 md:-translate-x-1/2"
          />

          {experience.map((e, i) => {
            const left = i % 2 === 0; // card side on desktop
            return (
              <li
                key={e.company}
                className="relative grid grid-cols-[40px_1fr] gap-x-4 pb-10 last:pb-0 md:grid-cols-[1fr_64px_1fr] md:gap-x-0 md:pb-14"
              >
                {/* node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="col-start-1 row-start-1 flex justify-center md:col-start-2"
                >
                  <span
                    className={`glass grid size-10 place-items-center rounded-full font-mono text-[10px] tracking-tight ${
                      i === 0 ? "text-ice shadow-[0_0_28px_rgba(165,232,255,.45)] ring-1 ring-ice/50" : "text-ink/80"
                    }`}
                  >
                    {e.mark}
                  </span>
                </motion.div>

                {/* date + place: opposite the card on desktop, above it on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className={`col-start-2 row-start-1 md:row-start-1 md:px-6 ${left ? "md:col-start-3" : "md:col-start-1"}`}
                >
                  <div className="md:hidden">
                    <Meta e={e} align="left" />
                  </div>
                  <div className="hidden md:block">
                    <Meta e={e} align={left ? "left" : "right"} />
                  </div>
                </motion.div>

                {/* card */}
                <motion.div
                  initial={{ opacity: 0, x: left ? -36 : 36, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.8, ease }}
                  className={`col-start-2 row-start-2 mt-3 md:row-start-1 md:mt-0 md:px-6 ${left ? "md:col-start-1" : "md:col-start-3"}`}
                >
                  <Card e={e} />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
