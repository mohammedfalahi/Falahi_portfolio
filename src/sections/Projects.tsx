import { projects, type Project } from '../data/portfolio'
import { container, focusRing, sectionTitle } from '../lib/ui'

const link = `rounded-sm underline underline-offset-4 ${focusRing}`

function WorkRow({ project }: { project: Project }) {
  return (
    <li className="grid gap-2.5 border-t border-rule py-7 last:border-b md:grid-cols-[minmax(180px,1fr)_2fr_auto] md:items-baseline md:gap-8">
      <div>
        {project.metric ? (
          <>
            <p className="cond m-0 text-[clamp(56px,7vw,104px)]">{project.metric.value}</p>
            <p className="m-0 mt-2 max-w-[22ch] text-sm leading-[1.3] text-graphite">{project.metric.caption}</p>
          </>
        ) : (
          <p aria-hidden="true" className="cond m-0 break-words text-[clamp(56px,7vw,104px)]">
            {project.title}
          </p>
        )}
      </div>
      <div>
        {/* Without a metric the big figure already shows the name, so the heading is for screen readers only. */}
        <h3
          className={
            project.metric ? 'm-0 mb-1.5 text-[26px] font-bold leading-tight tracking-[-0.01em]' : 'sr-only'
          }
        >
          {project.title}
        </h3>
        <p className="m-0 max-w-[56ch] text-graphite">{project.summary}</p>
        <p className="m-0 mt-2 text-[15px] text-graphite">{project.tags.join(', ')}</p>
      </div>
      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer" className={`whitespace-nowrap text-[15px] ${link}`}>
          Code on GitHub<span className="sr-only">: {project.title}</span>
        </a>
      ) : (
        <span />
      )}
    </li>
  )
}

export function Projects() {
  const featured = projects.filter(p => p.featured)
  const more = projects.filter(p => !p.featured)
  return (
    <section id="work" className={`${container} pb-10`}>
      <h2 className={sectionTitle}>Selected work</h2>
      <ul className="m-0 list-none p-0">
        {featured.map(p => (
          <WorkRow key={p.slug} project={p} />
        ))}
      </ul>

      <h3 className="mb-4 mt-12 text-[26px] font-bold leading-tight tracking-[-0.01em]">More projects</h3>
      <ul className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2">
        {more.map(p => (
          <li key={p.slug} className="border-t border-rule py-4">
            <p className="m-0 font-bold">
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer" className={link}>
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </p>
            <p className="m-0 mt-1 text-graphite">{p.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
