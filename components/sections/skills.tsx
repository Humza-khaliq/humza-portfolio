import { Reveal, SectionLabel } from "@/components/reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">Toolkit</SectionLabel>
        <Reveal className="glass divide-y divide-white/[0.07] px-5 sm:px-8">
          {skills.map((g) => (
            <div key={g.label} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
              <p className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ice/80">{g.label}</p>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-ink/85 transition hover:border-ice/40 hover:text-white"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
