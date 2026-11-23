import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { profile } from '../data/portfolio'
import { Contact } from './Contact'
import { Footer } from './Footer'

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

describe('Contact', () => {
  it('shows the email as a giant mailto link, plus phone and LinkedIn', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 2, name: 'Get in touch' })).toBeInTheDocument()
    const mail = screen.getByRole('link', { name: profile.email })
    expect(mail).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(mail).toHaveClass('cond')
    expect(screen.getByRole('link', { name: profile.phone })).toHaveAttribute('href', 'tel:+919567245034')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github)
    expect(screen.getByText(profile.location)).toBeInTheDocument()
    expect(
      screen.getByText('Open to roles across India and the UAE. Email is the quickest way to reach me.'),
    ).toBeInTheDocument()
  })

  it('puts a decorative brand icon beside the GitHub and LinkedIn links', () => {
    render(<Contact />)
    for (const [name, file] of [
      ['GitHub', 'github.svg'],
      ['LinkedIn', 'linkedin.svg'],
    ]) {
      const link = screen.getByRole('link', { name })
      const img = link.querySelector('img')
      expect(img).not.toBeNull()
      expect(img).toHaveAttribute('alt', '')
      expect(img?.getAttribute('src')).toMatch(new RegExp(`/kit/icons/${file}$`))
      expect(link).toHaveTextContent(name)
    }
  })

  it('sends with the primary button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: 'Send message' })).toHaveClass('btn', 'btn-primary')
  })

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
    expect(JSON.parse(init.body)).toEqual({ name: 'Ada', email: 'ada@example.com', message: 'Hello there' })
  })
})

describe('Footer', () => {
  it('shows the year, profile links and a back-to-top link', () => {
    render(<Footer />)
    expect(screen.getByText(`© ${new Date().getFullYear()} Mohammed Falahi`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin)
    expect(screen.getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#top')
    expect(screen.queryByRole('button')).toBeNull()
  })
})
