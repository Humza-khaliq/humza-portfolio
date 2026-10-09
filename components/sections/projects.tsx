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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="glass group flex h-full flex-col overflow-hidden rounded-[24px] transition duration-500 hover:-translate-y-1"
              >
                <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-[16px] bg-black/60">
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
                  <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10" />
                  <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-black/75 text-white ring-1 ring-white/15 backdrop-blur transition group-hover:rotate-45">
                    <ArrowUpRight className="size-[18px]" />
                  </span>
                </div>
                <div className="px-5 pb-6 pt-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{p.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{p.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
