import { profile } from '../data/portfolio'
import { container, focusRing } from '../lib/ui'

const link = `rounded-sm underline underline-offset-4 hover:text-ink ${focusRing}`

export function Footer() {
  return (
    <footer className={container}>
      <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-rule pb-10 pt-7 text-sm text-graphite">
        <p className="m-0">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-5 p-0">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#top" className={link}>
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
