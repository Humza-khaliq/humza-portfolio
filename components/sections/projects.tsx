"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/reveal";
import { JarvisVisual, ProjectVideo, VoltVisual } from "@/components/project-media";
import { projects } from "@/lib/data";

export function Projects() {

  return (
    <section id="projects" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02">Projects</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="glass group block overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[22px] bg-black/40">
                  {p.slug === "jarvis" ? (
                    <JarvisVisual />
                  ) : p.slug === "volt" ? (
                    <VoltVisual />
                  ) : (
                    <ProjectVideo
                      project={p}
                      className="h-full w-full object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice/75">{p.kicker}</p>
                      <h3 className="mt-2 text-xl font-medium tracking-tight text-ink">{p.name}</h3>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-ink/70 transition group-hover:rotate-45 group-hover:border-ice/50 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink/65">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
