import { certifications } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">Certifications</h2>
      <Reveal>
        <ul className="grid gap-3 md:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.name} className="rounded-[14px] border border-rule bg-card px-4 py-3">
              <p className="text-sm font-semibold text-ink">{c.name}</p>
              <p className="text-[13px] text-mute">{c.issuer}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
