import { Reveal, SectionLabel } from "@/components/reveal";

const facts = [
  { k: "Now", v: "QA on robotic sortation at Berkshire Grey" },
  { k: "Shipped", v: "A booking app with 20+ bookings in its first 2 weeks" },
  { k: "Before code", v: "Swam for Pakistan at the FINA World Juniors" },
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01">About</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <Reveal>
            <p className="font-serif text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.02em] text-ink">
              I like building things that have to <em className="text-ice">actually work</em>: robots, booking
              systems, an assistant that talks back.
            </p>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <p className="text-pretty text-lg leading-relaxed text-mute">
                UMass Amherst grad: BBA in Operations &amp; Information Management, BS in Informatics. My day job is
                breaking robot software before customers can. Evenings go to full-stack apps, voice AI, and
                lately, hardware on my desk.
              </p>
            </Reveal>
            <ul className="space-y-2.5">
              {facts.map((f, i) => (
                <Reveal key={f.k} delay={0.15 + i * 0.08}>
                  <li className="glass flex items-baseline gap-4 px-5 py-3.5">
                    <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ice/80">{f.k}</span>
                    <span className="text-[15px] text-ink/90">{f.v}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
