import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { applyTheme, getInitialTheme } from './theme'

function mockMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('theme helpers', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('falls back to the media query when localStorage getter throws', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('blocked')
    })
    mockMedia(true)
    expect(getInitialTheme()).toBe('dark')
    mockMedia(false)
    expect(getInitialTheme()).toBe('light')
  })

  it('still adds the dark class when setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    expect(() => applyTheme('dark')).not.toThrow()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('prefers a stored light value over a dark media query', () => {
    localStorage.setItem('theme', 'light')
    mockMedia(true)
    expect(getInitialTheme()).toBe('light')
  })
})
