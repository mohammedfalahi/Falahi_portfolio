import { education, experience, freelance, type Role } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

function RoleCard({ role, compact = false }: { role: Role; compact?: boolean }) {
  // Main cards sit directly under the section h2; compact cards sit under a group h3.
  const Title = compact ? 'h4' : 'h3'
  return (
    <article className="overflow-hidden rounded-[14px] border border-rule bg-card">
      <div className={compact ? 'h-9' : 'h-14'} style={{ backgroundColor: role.accent }} aria-hidden="true" />
      <div className={compact ? 'px-4 pb-4' : 'px-5 pb-5 md:px-6'}>
        <div
          aria-hidden="true"
          className={`-mt-5 flex items-center justify-center rounded-[10px] border-2 border-card font-bold text-white ${
            compact ? 'h-9 w-9 text-sm' : 'h-11 w-11 text-lg'
          }`}
          style={{ backgroundColor: role.accent }}
        >
          {role.org.charAt(0)}
        </div>
        <Title className={`mt-2 font-bold text-ink ${compact ? 'text-[15px]' : 'text-lg'}`}>{role.org}</Title>
        <p className="text-sm font-medium text-ink">{role.title}</p>
        <p className="mb-2 text-[13px] text-mute">
          {role.place} · {role.start} to {role.end}
        </p>
        <ul className={`list-disc space-y-1.5 pl-4 text-mute ${compact ? 'text-[13px]' : 'text-sm leading-[1.55]'}`}>
          {role.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">Experience</h2>
      <ol className="space-y-5 border-l border-rule pl-4 md:pl-6">
        {experience.map((r) => (
          <li key={`${r.org}-${r.title}`}>
            <Reveal>
              <RoleCard role={r} />
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mb-4 mt-12 text-lg font-bold text-ink">Additional experience (freelance)</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {freelance.map((r) => (
          <Reveal key={r.org}>
            <RoleCard role={r} compact />
          </Reveal>
        ))}
      </div>

      <h3 className="mb-4 mt-12 text-lg font-bold text-ink">Education</h3>
      <Reveal>
        <RoleCard role={education} compact />
      </Reveal>
    </section>
  )
}
