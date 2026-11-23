import { profile } from '../data/portfolio'
import { useTheme } from '../lib/theme'
import { btnSecondary, container, focusRing } from '../lib/ui'

const links = [
  { href: '#ask', label: 'Ask' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`${btnSecondary} btn-sm md:px-3 md:py-1 md:text-[13px]`}
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}

export function Nav() {
  return (
    <header id="top" className={container}>
      <div className="flex items-center justify-between gap-4 py-[22px] text-[15px]">
        <strong className="font-bold">{profile.name}</strong>
        <div className="flex items-center gap-6">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className={`link-quiet rounded-sm ${focusRing}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
