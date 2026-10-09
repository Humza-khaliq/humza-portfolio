"use client";

import { motion } from "framer-motion";
import { Activity, Box, Brain, Code, Cpu, Layers, Terminal, TestTube, type LucideIcon } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { skillGroups } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  terminal: Terminal,
  cpu: Cpu,
  code: Code,
  layers: Layers,
  brain: Brain,
  test: TestTube,
  activity: Activity,
  box: Box,
};

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">Skills</SectionLabel>

        <div className="space-y-14">
          {skillGroups.map((g) => {
            const GIcon = ICONS[g.icon];
            return (
              <div key={g.title}>
                <Reveal className="mb-6 flex items-center gap-4">
                  <span className="glass grid size-10 shrink-0 place-items-center rounded-xl">
                    <GIcon className="size-[18px] text-ice" aria-hidden />
                  </span>
                  <h3 className="shrink-0 text-2xl font-semibold tracking-tight text-white">{g.title}</h3>
                  <span className="h-px flex-1 bg-white/15" />
                </Reveal>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {g.cards.map((c, i) => {
                    const CIcon = ICONS[c.icon];
                    return (
                      <motion.div
                        key={c.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                        className="glass relative overflow-hidden rounded-[22px] p-6"
                      >
                        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-ice via-ice/70 to-ice/20" />
                        <div className="mb-5 flex items-center gap-3">
                          <span className="grid size-8 place-items-center rounded-lg bg-ice/10 ring-1 ring-ice/20">
                            <CIcon className="size-4 text-ice" aria-hidden />
                          </span>
                          <h4 className="text-lg font-semibold tracking-tight text-white">{c.title}</h4>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {c.items.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[12.5px] text-ink transition hover:border-ice/50 hover:text-white"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
