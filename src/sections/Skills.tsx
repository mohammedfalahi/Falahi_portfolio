import { useState } from 'react'
import { skills } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

const icon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}/${slug}-original.svg`

function Chip({ label, slug }: { label: string; slug?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <li className="flex items-center gap-2 rounded-[10px] border border-rule bg-card px-3.5 py-[9px] text-[13px] font-medium text-ink transition-transform duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {slug && !failed && (
        <img
          src={icon(slug)}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className="h-5 w-5 rounded-[5px] dark:bg-white/90 dark:p-[2px]"
          onError={() => setFailed(true)}
        />
      )}
      {label}
    </li>
  )
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <Reveal>
        <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">What I work with</h2>
        <div className="space-y-6">
          {skills.map((g) => (
            <div key={g.name}>
              <h3 className="mb-3 text-sm font-semibold text-mute">{g.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <Chip key={i.label} label={i.label} slug={i.icon} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
