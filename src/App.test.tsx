import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const originalMatchMedia = window.matchMedia

beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
})

afterEach(() => {
  window.matchMedia = originalMatchMedia
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('App', () => {
  it('unmounts the splash overlay once it finishes so it cannot cover the page', () => {
    vi.useFakeTimers()
    render(<App />)
    expect(screen.getByTestId('splash')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(1600)
    })
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download CV' })).toBeInTheDocument()
  })

  it('has an element for every nav anchor', () => {
    const { container } = render(<App />)
    const hrefs = Array.from(container.querySelectorAll('nav a[href^="#"]'))
      .map(a => a.getAttribute('href')!)
      .filter(h => h.length > 1)
    expect(hrefs).toEqual(['#about', '#skills', '#experience', '#projects', '#contact'])
    for (const href of hrefs) {
      expect(container.querySelector(href), href).not.toBeNull()
    }
  })
})
