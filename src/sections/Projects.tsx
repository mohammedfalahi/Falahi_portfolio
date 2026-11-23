import { projects, type Project } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-mute">
          {t}
        </li>
      ))}
    </ul>
  )
}

function RepoLink({ project }: { project: Project }) {
  if (!project.repo) return null
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`View code on GitHub: ${project.title}`}
      className={`mt-4 inline-block rounded text-sm font-semibold text-acc underline underline-offset-[3px] ${focusRing}`}
    >
      View code on GitHub
    </a>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-[14px] border border-rule bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-acc motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {project.metric && (
        <>
          <p className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-acc">{project.metric.value}</p>
          <p className="mb-3 mt-1 text-[13px] text-mute">{project.metric.caption}</p>
        </>
      )}
      <h3 className="text-lg font-bold text-ink">{project.title}</h3>
      <p className="mb-3 mt-1.5 text-sm leading-[1.55] text-mute">{project.summary}</p>
      <div className="mt-auto">
        <Tags tags={project.tags} />
        <RepoLink project={project} />
      </div>
    </article>
  )
}

function CompactItem({ project }: { project: Project }) {
  return (
    <li className="flex gap-4 rounded-[14px] border border-rule bg-card p-4">
      {project.image && (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="hidden h-16 w-24 shrink-0 rounded-lg border border-rule object-cover sm:block"
        />
      )}
      <div className="min-w-0">
        <h4 className="text-[15px] font-bold text-ink">{project.title}</h4>
        <p className="mb-2 mt-1 text-[13px] leading-[1.5] text-mute">{project.summary}</p>
        <Tags tags={project.tags} />
        <RepoLink project={project} />
      </div>
    </li>
  )
}

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">Projects</h2>
      <Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <FeaturedCard key={p.slug} project={p} />
          ))}
        </div>

        <h3 className="mb-4 mt-12 text-lg font-bold text-ink">More projects</h3>
        <ul className="grid gap-3 md:grid-cols-2">
          {more.map((p) => (
            <CompactItem key={p.slug} project={p} />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
