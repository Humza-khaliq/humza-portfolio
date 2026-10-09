import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 pb-36 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05">Contact</SectionLabel>
        <Reveal>
          <h2 className="font-serif text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
            Let&apos;s build something
            <br />
            <em className="text-ice">that works.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 text-xl text-ink underline decoration-white/20 underline-offset-[6px] transition hover:decoration-ice sm:text-2xl"
          >
            {profile.email}
            <ArrowUpRight className="size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="flex gap-2.5">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid size-12 place-items-center rounded-full text-ink/80 transition hover:text-white">
              <LinkedinIcon className="size-[18px]" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid size-12 place-items-center rounded-full text-ink/80 transition hover:text-white">
              <GithubIcon className="size-[18px]" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <footer className="mt-24 flex flex-col gap-3 border-t border-white/[0.08] pt-6 font-mono text-[11px] leading-relaxed text-faint sm:flex-row sm:justify-between">
            <p>
              Represented Pakistan at the 7th FINA World Junior Championships · Treasurer, UMass Cricket Club · Team Lead,
              MassAI
            </p>
            <p className="shrink-0">© 2026 Humza Khaliq</p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
