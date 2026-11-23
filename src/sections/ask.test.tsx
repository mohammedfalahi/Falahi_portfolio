import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { entries, fallback, suggestions } from '../data/ask'
import { Ask } from './Ask'

const originalMatchMedia = window.matchMedia
const byId = (id: string) => entries.find(e => e.id === id)!

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes('reduce'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

const answerText = () => screen.getByTestId('ask-answer').textContent
const sourceItems = () => {
  const list = screen.queryByRole('list', { name: 'Sources' })
  return list ? within(list).queryAllByRole('listitem') : []
}

function askViaInput(q: string) {
  fireEvent.change(screen.getByLabelText('Your question'), { target: { value: q } })
  fireEvent.click(screen.getByRole('button', { name: 'Ask' }))
}

afterEach(() => {
  window.matchMedia = originalMatchMedia
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('Ask my portfolio', () => {
  it('shows the first suggestion answer and its sources complete on first render', () => {
    render(<Ask />)
    const first = byId('production')
    expect(answerText()).toBe(first.answer)
    const items = sourceItems()
    expect(items).toHaveLength(first.sources.length)
    expect(items[0]).toHaveAttribute('id', 'ask-src-1')
    expect(items[0]).toHaveTextContent(first.sources[0].quote)
    expect(screen.getByRole('link', { name: '[1]' })).toHaveAttribute('href', '#ask-src-1')
    expect(screen.getByRole('status')).toHaveTextContent(first.answer)
  })

  it('answers a chip instantly under reduced motion and fills the input', () => {
    mockReducedMotion(true)
    render(<Ask />)
    fireEvent.click(screen.getByRole('button', { name: suggestions[2] }))
    const stack = byId('stack')
    expect(answerText()).toBe(stack.answer)
    expect(sourceItems()).toHaveLength(3)
    expect(sourceItems()[2]).toHaveTextContent(stack.sources[2].quote)
    expect(screen.getByLabelText('Your question')).toHaveValue(suggestions[2])
  })

  it('shows the fallback and no sources for an unknown question', () => {
    mockReducedMotion(true)
    render(<Ask />)
    askViaInput('What is his favourite colour?')
    expect(answerText()).toBe(fallback)
    expect(sourceItems()).toHaveLength(0)
  })

  it('ignores empty submissions', () => {
    mockReducedMotion(true)
    render(<Ask />)
    askViaInput('   ')
    expect(answerText()).toBe(byId('production').answer)
  })

  it('types the answer and reveals sources only when typing finishes', () => {
    vi.useFakeTimers()
    render(<Ask />)
    askViaInput('Where is he based?')
    const loc = byId('location')
    expect(answerText()).not.toBe(loc.answer)
    expect(sourceItems()).toHaveLength(0)
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(answerText()).toBe(loc.answer)
    expect(sourceItems()).toHaveLength(1)
    expect(screen.getByRole('status')).toHaveTextContent(loc.answer)
  })

  it('cancels an older ask when a newer one arrives', () => {
    vi.useFakeTimers()
    render(<Ask />)
    askViaInput('Does he know RAG?')
    act(() => {
      vi.advanceTimersByTime(48)
    })
    askViaInput('Which degree does he have?')
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(answerText()).toBe(byId('education').answer)
    expect(sourceItems()).toHaveLength(1)
    expect(sourceItems()[0]).toHaveTextContent(byId('education').sources[0].quote)
  })
})
