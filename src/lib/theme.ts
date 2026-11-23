import { useCallback, useState } from 'react'
import { safeGet, safeSet } from './storage'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

export function getInitialTheme(): Theme {
  const stored = safeGet('local', THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  safeSet('local', THEME_KEY, theme)
}

function readInitial(): Theme {
  // The pre-paint script in index.html may already have set the class.
  if (document.documentElement.classList.contains('dark')) return 'dark'
  return getInitialTheme()
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readInitial)
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }, [theme])
  return [theme, toggle]
}
