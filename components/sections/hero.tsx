"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Glass } from "@samasante/liquid-glass";
import { profile } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const words = profile.name.split(" ");
  const links = [
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: profile.linkedin, label: "LinkedIn", icon: LinkedinIcon },
    { href: profile.github, label: "GitHub", icon: GithubIcon },
  ];

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end px-5 pb-28 pt-28 sm:px-10 sm:pb-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mb-6 flex items-center gap-2.5 font-mono text-xs text-mute"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.role} · {profile.location}
          </motion.p>

          <h1 className="font-serif text-[clamp(4rem,13vw,10.5rem)] leading-[0.86] tracking-[-0.035em] text-ink">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.18em] inline-block"
                initial={{ opacity: 0, y: "0.35em", filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.12 }}
              >
                {i === words.length - 1 ? (
                  <>
                    <em className="italic">{w}</em>
                    <span className="text-ice">.</span>
                  </>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-mute sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {links.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block">
                  <Glass
                    style={{ borderRadius: 999, background: "rgba(255,255,255,0.055)" }}
                    className="text-sm text-ink/85 transition group-hover:text-white"
                  >
                    <span className="flex items-center gap-2 px-4 py-2.5">
                      <Icon className="size-4 opacity-70" aria-hidden />
                      {label}
                    </span>
                  </Glass>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-24 right-6 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint hover:text-mute sm:flex lg:right-16"
      >
        scroll <ArrowDown className="size-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
