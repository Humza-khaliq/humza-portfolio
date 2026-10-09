"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Glass } from "@samasante/liquid-glass";
import { GlassDock } from "./glass-dock";
import { profile, sections } from "@/lib/data";

/** Persistent UI that lives outside the transitioning route: top bar + glass dock. */
export function Chrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    let raf = 0;
    const update = () => {
      // the section whose top has passed 40% of the viewport is "current"
      const line = window.innerHeight * 0.4;
      let idx = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = sections.length - 1;
      setCurrent(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const t = setTimeout(update, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, pathname]);

  const go = (i: number) => {
    const el = document.getElementById(sections[i].id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", i === 0 ? "/" : `#${sections[i].id}`);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
        {isHome ? (
          <button
            type="button"
            onClick={() => go(0)}
            className="pointer-events-auto font-display font-semibold text-2xl leading-none tracking-tight text-ink/90 transition hover:text-white"
            aria-label="Back to top"
          >
            hk.
          </button>
        ) : (
          <Link href="/#projects" className="pointer-events-auto" aria-label="Back to all projects">
            <Glass
              style={{ borderRadius: 999, background: "rgba(10,16,26,0.62)" }}
              className="text-sm text-ink/90 transition hover:text-white"
            >
              <span className="flex items-center gap-1.5 px-4 py-2">
                <ArrowLeft className="size-4" aria-hidden /> Back
              </span>
            </Glass>
          </Link>
        )}
        <a href={profile.resume} target="_blank" rel="noreferrer" className="pointer-events-auto">
          <Glass
            style={{ borderRadius: 999, background: "rgba(10,16,26,0.62)" }}
            className="text-sm text-ink/90 transition hover:text-white"
          >
            <span className="flex items-center gap-1 px-4 py-2">
              Resume <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
          </Glass>
        </a>
      </header>
      {isHome && <GlassDock titles={sections.map((s) => s.label)} current={current} onSelect={go} />}
    </>
  );
}
