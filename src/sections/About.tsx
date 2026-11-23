import { profile } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <Reveal>
        <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">About me</h2>
        <div className="grid items-start gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <div className="space-y-4 text-base leading-[1.65] text-mute">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <img
              src="/about-portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              className="mb-4 aspect-square w-full max-w-[280px] rounded-[14px] border border-rule object-cover"
            />
            <ul className="space-y-2">
              {profile.facts.map((f) => (
                <li key={f} className="rounded-[10px] border border-rule bg-card px-3.5 py-2.5 text-[13px] font-medium text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
