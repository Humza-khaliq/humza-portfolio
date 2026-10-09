"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionLabel } from "@/components/reveal";
import { experience } from "@/lib/data";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02">Work</SectionLabel>
        <ol ref={listRef} className="relative space-y-6 pl-9 sm:space-y-8 sm:pl-14">
          {/* rail + scroll-linked fill */}
          <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-white/10 sm:left-[19px]" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-ice via-ice/70 to-ice/0 sm:left-[19px]"
          />
          {experience.map((e, i) => (
            <motion.li
              key={e.company}
              initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative"
            >
              {/* node */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                className={`absolute -left-9 top-6 grid size-[23px] place-items-center rounded-full border sm:-left-14 sm:size-[39px] ${
                  i === 0 ? "border-ice/60 bg-ice/15 shadow-[0_0_24px_rgba(165,232,255,.45)]" : "border-white/15 bg-base/80"
                }`}
              >
                <span className="hidden font-mono text-[11px] text-ink/80 sm:block">{e.mark}</span>
                <span className="size-1.5 rounded-full bg-ice sm:hidden" />
              </motion.span>

              <div className="glass group px-5 py-5 transition duration-500 hover:bg-white/[0.07] sm:px-7 sm:py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg font-medium tracking-tight text-ink sm:text-xl">
                    {e.role} <span className="text-mute">·</span>{" "}
                    <span className="font-serif text-[1.35em] italic font-normal">{e.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-mute">
                    {e.start} – {e.end}
                    {i === 0 && <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-300">now</span>}
                  </p>
                </div>
                <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-mute">{e.line}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="mr-2 font-mono text-[11px] text-faint">{e.location}</span>
                  {e.stack?.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
