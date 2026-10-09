"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Glass } from "@samasante/liquid-glass";
import { DeskBuddy } from "@/components/desk-buddy";
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
      <div className="mx-auto grid w-full max-w-6xl items-end gap-12 lg:grid-cols-[1fr_auto]">
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

        {/* mini ElectroBuddy */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
          className="relative hidden justify-self-end lg:block"
        >
          <motion.a
            href="#projects"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 2 }}
            className="glass absolute -left-40 top-2 z-10 block rounded-2xl rounded-br-sm px-4 py-2.5 text-[13px] leading-snug text-ink/90 hover:text-white"
          >
            hi, I&apos;m ElectroBuddy.
            <br />
            <span className="text-mute">I live in the projects ↓</span>
          </motion.a>
          <DeskBuddy size={210} mood="happy" />
        </motion.div>
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
