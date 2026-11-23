import { education, experience, freelance, type Role } from '../data/portfolio'
import { container, sectionTitle } from '../lib/ui'

const subTitle = 'mb-4 mt-12 text-[26px] font-bold leading-tight tracking-[-0.01em]'

function RoleRow({ role }: { role: Role }) {
  return (
    <li className="grid gap-1 border-t border-rule py-5 md:grid-cols-[160px_1fr_1.4fr] md:gap-6">
      <p className="m-0 text-[15px] text-graphite">
        {role.start} – {role.end}
      </p>
      <div>
        <p className="m-0 text-xl font-bold">{role.org}</p>
        <p className="m-0 text-graphite">{role.title}</p>
        <p className="m-0 text-graphite">{role.place}</p>
      </div>
      <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0 md:mt-0">
        {role.points.map(pt => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>
    </li>
  )
}

function Rows({ roles }: { roles: Role[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {roles.map(r => (
        <RoleRow key={`${r.org}-${r.title}`} role={r} />
      ))}
    </ul>
  )
}

export function Experience() {
  return (
    <section id="experience" className={`${container} pb-10`}>
      <h2 className={sectionTitle}>Experience</h2>
      <Rows roles={experience} />
      <h3 className={subTitle}>Additional experience (freelance)</h3>
      <Rows roles={freelance} />
      <h3 className={subTitle}>Education</h3>
      <Rows roles={[education]} />
    </section>
  )
}
