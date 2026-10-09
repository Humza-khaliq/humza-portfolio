import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { JarvisVisual, ProjectVideo } from "@/components/project-media";
import { BuddyStage } from "@/components/buddy-stage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} · Humza Khaliq`, description: p.summary } : {};
}

const JARVIS_PIPELINE = [
  { k: "Wake", v: "openWakeWord" },
  { k: "Hear", v: "faster-whisper" },
  { k: "Think", v: "Groq · Llama 3.3 70B" },
  { k: "Remember", v: "ChromaDB" },
  { k: "Act", v: "Calendar · Tavily" },
  { k: "Speak", v: "ElevenLabs" },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="px-5 pb-32 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice/80">{p.kicker}</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[-0.035em]">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-mute">{p.summary}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
          {[
            ["Year", p.year],
            ["Role", p.role],
            ["Status", p.status ?? "Shipped"],
          ].map(([k, v]) => (
            <div key={k} className="bg-base/60 px-5 py-4 backdrop-blur">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{k}</p>
              <p className="mt-1 text-[15px] text-ink/90">{v}</p>
            </div>
          ))}
        </Reveal>

        {/* media */}
        <Reveal delay={0.12} className="mt-8">
          {p.slug === "electrobuddy" ? (
            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <div className="glass overflow-hidden rounded-[28px]">
                <BuddyStage />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {p.extraVideos?.map((src) => (
                  <div key={src} className="glass overflow-hidden rounded-[22px] p-1.5">
                    <video
                      src={src}
                      className="h-full w-full rounded-[17px] object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/media/electrobuddy-poster.jpg"
                      aria-label="ElectroBuddy running on my desk"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : p.slug === "jarvis" ? (
            <div className="glass overflow-hidden rounded-[28px]">
              <div className="aspect-[16/8]">
                <JarvisVisual large />
              </div>
              <ol className="grid grid-cols-2 gap-px border-t border-white/[0.07] bg-white/[0.05] sm:grid-cols-3 lg:grid-cols-6">
                {JARVIS_PIPELINE.map((s, n) => (
                  <li key={s.k} className="bg-base/50 px-4 py-4">
                    <p className="font-mono text-[11px] text-ice/80">
                      {String(n + 1).padStart(2, "0")} · {s.k}
                    </p>
                    <p className="mt-1 text-[13px] text-ink/85">{s.v}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="glass overflow-hidden rounded-[28px] p-2">
              <ProjectVideo project={p} className="w-full rounded-[22px]" />
            </div>
          )}
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-ink/80">
            {p.description.map((d) => (
              <p key={d.slice(0, 20)}>{d}</p>
            ))}
            {p.links.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-4">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white"
                  >
                    {l.label} <ArrowUpRight className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ice/80">Highlights</p>
              <ul className="mt-4 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-snug text-ink/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ice/80" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ice/80">Stack</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24 border-t border-white/[0.08] pt-8">
          <Link href={`/projects/${next.slug}`} className="group flex items-end justify-between gap-6">
            <span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Next project</span>
              <span className="mt-2 block font-serif text-4xl tracking-tight text-ink transition group-hover:text-white sm:text-5xl">
                {next.name}
              </span>
            </span>
            <ArrowRight className="mb-2 size-7 shrink-0 text-mute transition group-hover:translate-x-1 group-hover:text-ice" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
