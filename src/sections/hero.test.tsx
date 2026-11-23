import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { terminal } from '../data/portfolio'
import { Terminal } from '../components/Terminal'
import { Splash } from './Splash'
import { Hero } from './Hero'
import { Nav } from './Nav'

const originalMatchMedia = window.matchMedia

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduce : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

afterEach(() => {
  window.matchMedia = originalMatchMedia
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('with reduced motion', () => {
  beforeEach(() => mockReducedMotion(true))

  it('skips the splash and shows every terminal line at once', () => {
    const onDone = vi.fn()
    const { container } = render(<Splash onDone={onDone} />)
    expect(container).toBeEmptyDOMElement()
    expect(onDone).toHaveBeenCalledTimes(1)

    render(<Hero />)
    for (const line of terminal) expect(screen.getByText(line.text)).toBeInTheDocument()
    expect(screen.getByText('[1]')).toBeInTheDocument()
    expect(screen.getByText('[2]')).toBeInTheDocument()
  })
})

describe('with motion', () => {
  beforeEach(() => {
    mockReducedMotion(false)
    vi.useFakeTimers()
  })

  it('ends the splash at once on a key press', () => {
    const onDone = vi.fn()
    render(<Splash onDone={onDone} />)
    expect(screen.getByTestId('splash')).toBeInTheDocument()
    fireEvent.keyDown(window)
    expect(onDone).toHaveBeenCalledTimes(1)
    act(() => vi.advanceTimersByTime(2000))
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(sessionStorage.getItem('splash-seen')).not.toBeNull()
  })

  it('does not show the splash again in the same session', () => {
    sessionStorage.setItem('splash-seen', '1')
    const onDone = vi.fn()
    const { container } = render(<Splash onDone={onDone} />)
    expect(container).toBeEmptyDOMElement()
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('still finishes within 1.6s when sessionStorage throws', () => {
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
      throw new Error('blocked')
    })
    const onDone = vi.fn()
    render(<Splash onDone={onDone} />)
    expect(onDone).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1600))
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('reveals terminal lines every 600ms after start, and replays', () => {
    const { rerender } = render(<Terminal lines={terminal} start={false} />)
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.queryByText(terminal[0].text)).toBeNull()

    rerender(<Terminal lines={terminal} start />)
    act(() => vi.advanceTimersByTime(600))
    expect(screen.getByText(terminal[0].text)).toBeInTheDocument()
    expect(screen.queryByText(terminal[1].text)).toBeNull()
    act(() => vi.advanceTimersByTime(600 * terminal.length))
    for (const line of terminal) expect(screen.getByText(line.text)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Replay' }))
    expect(screen.queryByText(terminal[0].text)).toBeNull()
    act(() => vi.advanceTimersByTime(600))
    expect(screen.getByText(terminal[0].text)).toBeInTheDocument()
  })
})

describe('hero and nav', () => {
  beforeEach(() => mockReducedMotion(true))

  it('offers the CV as a download and an email link', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'I build AI systems that show their sources.' }),
    ).toBeInTheDocument()
    const cv = screen.getByRole('link', { name: 'Download CV' })
    expect(cv).toHaveAttribute('href', '/Mohammed_Falahi_CV.pdf')
    expect(cv).toHaveAttribute('download')
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute(
      'href',
      'mailto:falahi@mohammedfalahi.in',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/mohammedfalahi')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://linkedin.com/in/mohammedfalahi')
  })

  it('links to every section and toggles the theme', () => {
    render(<Nav />)
    const desktop = screen.getByRole('navigation', { name: 'Main' })
    const hrefs = Array.from(desktop.querySelectorAll('[data-nav-list] a')).map(a => a.getAttribute('href'))
    expect(hrefs).toEqual(['#about', '#skills', '#experience', '#projects', '#contact'])

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('opens the mobile menu and gains a background on scroll', () => {
    render(<Nav />)
    const menu = screen.getByRole('button', { name: 'Menu' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('data-scrolled', 'false')
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true })
    fireEvent.scroll(window)
    expect(header).toHaveAttribute('data-scrolled', 'true')
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })
})
