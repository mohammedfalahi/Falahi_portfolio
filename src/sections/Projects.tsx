import { Diagram } from '../components/Diagram'
import { RollingFigure } from '../components/RollingFigure'
import { diagrams, type DiagramSpec } from '../data/diagrams'
import { projects, type Project } from '../data/portfolio'
import { container, sectionTitle, tapLink } from '../lib/ui'

/** The first featured projects, shown large with a diagram; the rest follow as compact rows. */
const FEATURE_ROWS = ['enterprise-rag-chatbot', 'agentic-content-pipeline']

const titleCls = 'm-0 mb-1.5 text-[26px] font-bold leading-tight tracking-[-0.01em]'

function CodeLink({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.repo) return <span />
  return (
    <a href={project.repo} target="_blank" rel="noreferrer" className={`whitespace-nowrap text-[15px] ${tapLink} ${className}`}>
      Code on GitHub<span className="sr-only">: {project.title}</span>
    </a>
  )
}

function FeatureRow({ project, spec }: { project: Project; spec: DiagramSpec }) {
  return (
    <li
      data-testid="feature-row"
      className="row-hover grid gap-8 border-t border-rule py-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center lg:gap-12"
    >
      <div>
        {project.metric && (
          <>
            <RollingFigure value={project.metric.value} className="cond m-0 text-[clamp(64px,9vw,136px)]" />
            <p className="m-0 mt-2 max-w-[28ch] text-sm leading-[1.3] text-graphite">{project.metric.caption}</p>
          </>
        )}
        <h3 className={`${titleCls} mt-8`}>
          <span className="row-title">{project.title}</span>
        </h3>
        <p className="m-0 max-w-[52ch] text-graphite">{project.summary}</p>
        <p className="m-0 mt-2 text-[15px] text-graphite">{project.tags.join(', ')}</p>
        <div className="mt-3 md:mt-5">
          <CodeLink project={project} />
        </div>
      </div>
      <Diagram spec={spec} />
    </li>
  )
}

function WorkRow({ project }: { project: Project }) {
  return (
    <li className="row-hover grid gap-2.5 border-t border-rule py-7 last:border-b md:grid-cols-[minmax(180px,1fr)_2fr_auto] md:items-baseline md:gap-8">
      <div>
        {project.metric ? (
          <>
            <RollingFigure value={project.metric.value} className="cond m-0 text-[clamp(56px,7vw,104px)]" />
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
        <h3 className={project.metric ? titleCls : 'sr-only'}>
          <span className="row-title">{project.title}</span>
        </h3>
        <p className="m-0 max-w-[56ch] text-graphite">{project.summary}</p>
        <p className="m-0 mt-2 text-[15px] text-graphite">{project.tags.join(', ')}</p>
      </div>
      <CodeLink project={project} />
    </li>
  )
}

export function Projects() {
  const featured = projects.filter(p => p.featured)
  const lead = FEATURE_ROWS.map(slug => featured.find(p => p.slug === slug)).filter((p): p is Project => !!p)
  const rest = featured.filter(p => !FEATURE_ROWS.includes(p.slug))
  const more = projects.filter(p => !p.featured)
  return (
    <section id="work" className={`${container} pb-10`}>
      <h2 className={sectionTitle}>Selected work</h2>
      <ul className="m-0 list-none p-0">
        {lead.map(p => (
          <FeatureRow key={p.slug} project={p} spec={diagrams[p.slug]} />
        ))}
        {rest.map(p => (
          <WorkRow key={p.slug} project={p} />
        ))}
      </ul>

      <h3 className="mb-4 mt-12 text-[26px] font-bold leading-tight tracking-[-0.01em]">More projects</h3>
      <ul className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2">
        {more.map(p => (
          <li key={p.slug} className="border-t border-rule py-4">
            <p className="m-0 font-bold">
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer" className={tapLink}>
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
