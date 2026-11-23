import { certifications } from '../data/portfolio'
import { container, sectionTitle } from '../lib/ui'

export function Certifications() {
  return (
    <section id="certifications" className={`${container} pb-10`}>
      <h2 className={sectionTitle}>Certifications</h2>
      <ul className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2">
        {certifications.map(c => (
          <li key={c.name} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-rule py-4">
            <span className="font-bold">{c.name}</span>
            <span className="text-graphite">{c.issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
