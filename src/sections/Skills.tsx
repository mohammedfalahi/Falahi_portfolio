import { skills } from '../data/portfolio'
import { container, sectionTitle } from '../lib/ui'

export function Skills() {
  return (
    <section id="toolkit" className={`${container} pb-10`}>
      <h2 className={sectionTitle}>Toolkit</h2>
      <ul className="m-0 list-none p-0">
        {skills.map(g => (
          <li key={g.name} className="grid gap-1 border-t border-rule py-5 md:grid-cols-[220px_1fr] md:gap-6">
            <p className="m-0 text-xl font-bold">{g.name}</p>
            <p className="m-0 text-graphite">{g.items.join(', ')}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
