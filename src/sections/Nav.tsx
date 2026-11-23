import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useTheme } from '../lib/theme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex h-6 w-[42px] shrink-0 items-center rounded-full bg-rule p-[3px] ${focusRing}`}
    >
      <span
        aria-hidden="true"
        className={`h-[18px] w-[18px] rounded-full bg-acc transition-transform duration-300 motion-reduce:transition-none ${dark ? 'translate-x-[18px]' : ''}`}
      />
    </button>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      data-scrolled={scrolled}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-rule bg-bg/90 backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-9 md:py-5">
        <a href="#" className={`rounded text-base font-bold text-ink ${focusRing}`}>
          {profile.name}
        </a>
        <div className="flex items-center gap-4 text-sm text-mute md:gap-6">
          <ul data-nav-list className="hidden items-center gap-6 md:flex">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className={`rounded hover:text-ink ${focusRing}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
            className={`rounded p-1 text-ink md:hidden ${focusRing}`}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" data-testid="mobile-menu" className="border-b border-t border-rule bg-bg px-5 pb-4 pt-2 md:hidden">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded py-2 text-base text-ink ${focusRing}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
