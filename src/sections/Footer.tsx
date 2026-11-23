import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/motion'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

export function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-mute md:px-9">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className={`rounded underline underline-offset-[3px] hover:text-ink ${focusRing}`}>
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`rounded underline underline-offset-[3px] hover:text-ink ${focusRing}`}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className={`rounded underline underline-offset-[3px] hover:text-ink ${focusRing}`}>
              Email
            </a>
          </li>
        </ul>
      </div>
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
          className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-card text-ink shadow-md hover:border-acc ${focusRing}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  )
}
