import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { certifications, profile } from '../data/portfolio'
import { Certifications } from './Certifications'
import { Contact } from './Contact'
import { Footer } from './Footer'
import { Projects } from './Projects'

const ERROR_TEXT = 'Message not sent. Email me directly at falahi@mohammedfalahi.in.'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } })
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } })
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
}

describe('Contact form', () => {
  it('shows the error when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<Contact />)
    fillAndSubmit()
    expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument()
    expect(screen.queryByText(/Message sent/)).not.toBeInTheDocument()
  })

  it('shows the error when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<Contact />)
    fillAndSubmit()
    expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument()
    expect(screen.queryByText(/Message sent/)).not.toBeInTheDocument()
  })

  it('confirms and clears the fields on success, posting JSON to Formspree', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    render(<Contact />)
    fillAndSubmit()
    expect(await screen.findByText(/Message sent/)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''))
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Message')).toHaveValue('')
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://formspree.io/f/xjgopddo')
    expect(init.method).toBe('POST')
    expect(init.headers.Accept).toBe('application/json')
    expect(JSON.parse(init.body)).toEqual({ name: 'Ada', email: 'ada@example.com', message: 'Hello there' })
    expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument()
  })

  it('links the email and phone', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByRole('link', { name: profile.phone })).toHaveAttribute('href', 'tel:+919567245034')
  })
})

describe('Projects', () => {
  it('gives the SignalForge entry no link', () => {
    render(<Projects />)
    const item = screen.getByText('SignalForge').closest('li, article') as HTMLElement
    expect(item).not.toBeNull()
    expect(item.querySelector('a')).toBeNull()
  })

  it('shows featured metrics and code links', () => {
    render(<Projects />)
    expect(screen.getByText('240+')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /View code on GitHub/ })[0]).toHaveAttribute('target', '_blank')
  })
})

describe('Certifications', () => {
  it('lists the Oracle certification first', () => {
    render(<Certifications />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Oracle Certified Foundations Associate: Agentic AI')
    expect(items).toHaveLength(certifications.length)
  })
})

describe('Footer', () => {
  it('shows the back-to-top button only after scrolling past 600px', () => {
    const scrollTo = vi.fn()
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo
    render(<Footer />)
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument()
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 700, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument()
  })
})
