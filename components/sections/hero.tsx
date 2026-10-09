"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
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
    { href: profile.resume, label: "Resume", icon: FileText },
  ];

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center px-5 pb-24 pt-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <h1 className="font-display font-semibold text-[clamp(3.5rem,10vw,8.25rem)] leading-[0.92] tracking-[-0.045em] text-ink">
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
                    {w}
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
            className="mt-8 max-w-2xl text-pretty font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink/90"
          >
            I like building things that have to <span className="text-ice">actually work</span>: robots, booking
            systems, an assistant that talks back.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.62 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-mute sm:text-lg"
          >
            UMass Amherst grad, BBA in Operations &amp; Information Management and BS in Informatics. I build full-stack
            apps, voice AI and hardware.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {links.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="group block">
                  <Glass
                    style={{ borderRadius: 999, background: "var(--pill-bg)" }}
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

    </section>
  );
}
