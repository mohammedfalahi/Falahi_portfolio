import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { profile } from '../data/portfolio'
import { Hero } from './Hero'
import { Nav } from './Nav'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('Header', () => {
  it('links to Ask, Work, Experience and Contact', () => {
    render(<Nav />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    const links = within(nav).getAllByRole('link')
    expect(links.map(a => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Ask', '#ask'],
      ['Work', '#work'],
      ['Experience', '#experience'],
      ['Contact', '#contact'],
    ])
    expect(screen.getByRole('banner')).toHaveAttribute('id', 'top')
  })

  it('flips the theme toggle text, label and dark class', () => {
    render(<Nav />)
    const toggle = screen.getByRole('button', { name: 'Switch to dark mode' })
    expect(toggle).toHaveTextContent('Dark')
    expect(toggle).toHaveClass('btn', 'btn-secondary')
    fireEvent.click(toggle)
    expect(document.documentElement).toHaveClass('dark')
    const back = screen.getByRole('button', { name: 'Switch to light mode' })
    expect(back).toHaveTextContent('Light')
    fireEvent.click(back)
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toHaveTextContent('Dark')
  })
})

describe('Hero', () => {
  it('shows the name, portrait, intro and calls to action', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Mohammed\s*Falahi/)
    expect(screen.getByRole('img', { name: 'Mohammed Falahi' })).toHaveAttribute('src', '/about-portrait.jpg')
    // The CV-text canvas is decorative; the photo stays the accessible image and fallback.
    const portrait = screen.getByRole('img', { name: 'Mohammed Falahi' })
    expect(portrait.parentElement?.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true')
    expect(portrait).not.toHaveClass('opacity-0')
    expect(screen.getByText(profile.intro)).toBeInTheDocument()
    expect(screen.getByText(profile.meta)).toBeInTheDocument()
    const cv = screen.getByRole('link', { name: 'Download CV' })
    expect(cv).toHaveAttribute('href', '/Mohammed_Falahi_CV.pdf')
    expect(cv).toHaveAttribute('download')
    expect(cv).toHaveClass('btn', 'btn-primary')
    const email = screen.getByRole('link', { name: 'Email me' })
    expect(email).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(email).toHaveClass('btn', 'btn-secondary')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin)
  })
})
