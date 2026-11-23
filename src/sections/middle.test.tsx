import { fireEvent, render, screen } from '@testing-library/react'
import { act } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { profile, skills } from '../data/portfolio'
import { About } from './About'
import { Skills } from './Skills'
import { Experience } from './Experience'

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

afterEach(() => {
  window.matchMedia = originalMatchMedia
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('Reveal with motion enabled', () => {
  it('renders visible content when IntersectionObserver is missing', () => {
    mockReducedMotion(false)
    vi.stubGlobal('IntersectionObserver', undefined)
    const { container } = render(<About />)
    expect(screen.getByText(profile.facts[0])).toBeInTheDocument()
    expect(container.innerHTML).not.toMatch(/opacity:\s*0/)
  })

  it('keeps the reveal pending (no timer forces it) while the observer has not fired', () => {
    vi.useFakeTimers()
    mockReducedMotion(false)
    class NeverFires {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal('IntersectionObserver', NeverFires)
    const { container } = render(<About />)
    expect(container.innerHTML).toMatch(/opacity:\s*0/)
    act(() => {
      vi.advanceTimersByTime(2500)
    })
    expect(container.innerHTML).toMatch(/opacity:\s*0/)
  })
})

describe('Experience', () => {
  it('orders roles, then the freelance group, then education', () => {
    mockReducedMotion(true)
    const { container } = render(<Experience />)
    const text = container.textContent ?? ''
    const order = [
      'Wisermonks',
      'AI Engineer (R&D)',
      'AI Specialist (R&D) Intern',
      'Additional experience (freelance)',
      'Drytis Inc.',
      'Careerflow.ai',
      'MES College of Engineering',
    ].map((s) => text.indexOf(s))
    expect(order.every((i) => i >= 0)).toBe(true)
    expect([...order].sort((a, b) => a - b)).toEqual(order)
    expect(container.querySelector('section#experience')).not.toBeNull()
  })
})

describe('Skills', () => {
  it('hides a failed icon but keeps the label', () => {
    mockReducedMotion(true)
    const { container } = render(<Skills />)
    const img = container.querySelector('img') as HTMLImageElement
    expect(img.src).toContain('devicons/devicon@v2.16.0/icons/pytorch/pytorch-original.svg')
    fireEvent.error(img)
    expect(container.querySelector('img[src*="/pytorch/"]')).toBeNull()
    expect(container.querySelector('img[src*="/tensorflow/"]')).not.toBeNull()
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
    expect(container.querySelector('section#skills')).not.toBeNull()
  })

  it('renders text-only chips without an image', () => {
    mockReducedMotion(true)
    render(<Skills />)
    expect(screen.getByText('LangChain')).toBeInTheDocument()
    expect(skills.length).toBeGreaterThan(0)
  })
})

describe('About', () => {
  it('renders the facts and portrait', () => {
    mockReducedMotion(true)
    const { container } = render(<About />)
    for (const f of profile.facts) expect(screen.getByText(f)).toBeInTheDocument()
    expect(screen.getByAltText(/Mohammed Falahi/)).toHaveAttribute('src', '/about-portrait.png')
    expect(container.querySelector('section#about')).not.toBeNull()
  })
})
