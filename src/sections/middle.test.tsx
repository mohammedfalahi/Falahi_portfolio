import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { diagrams } from '../data/diagrams'
import { certifications, projects, skills } from '../data/portfolio'
import { Certifications } from './Certifications'
import { Experience } from './Experience'
import { Projects } from './Projects'
import { Skills } from './Skills'

describe('Selected work', () => {
  const featured = projects.filter(p => p.featured)

  it('renders all six featured projects with their figures and code links', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 2, name: 'Selected work' })).toBeInTheDocument()
    expect(featured).toHaveLength(6)
    for (const p of featured) {
      expect(screen.getByRole('heading', { level: 3, name: p.title })).toBeInTheDocument()
      if (p.metric) {
        expect(screen.getAllByText(p.metric.value).length).toBeGreaterThan(0)
        expect(screen.getByText(p.metric.caption)).toBeInTheDocument()
      }
      const link = screen.getByRole('link', { name: `Code on GitHub: ${p.title}` })
      expect(link).toHaveAttribute('href', p.repo)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    }
  })

  it('leads with the RAG chatbot and the content pipeline, then keeps the rest in order', () => {
    render(<Projects />)
    const section = document.getElementById('work') as HTMLElement
    const titles = [...section.querySelectorAll('ul')[0].querySelectorAll(':scope > li h3')].map(h => h.textContent)
    expect(titles).toEqual([
      'Enterprise RAG Chatbot',
      'Agentic Content Production Pipeline',
      'CallOps',
      'MyG Sales Assistant',
      'VidScribe',
      'Agent SFX',
    ])
  })

  it('draws two feature rows, each with a diagram host carrying its spec', () => {
    const { container } = render(<Projects />)
    const rows = screen.getAllByTestId('feature-row')
    expect(rows).toHaveLength(2)
    const slugs = ['enterprise-rag-chatbot', 'agentic-content-pipeline']
    rows.forEach((row, i) => {
      const host = row.querySelector('.panel > .dg[data-diagram]') as HTMLElement
      expect(host).not.toBeNull()
      expect(JSON.parse(host.dataset.diagram as string)).toEqual(diagrams[slugs[i]])
      expect(host).toHaveAttribute('role', 'img')
      expect(host).toHaveAttribute('aria-label', diagrams[slugs[i]].alt)
      expect(host.dataset.iconBase).toMatch(/kit\/icons\/$/)
    })
    expect(container.querySelectorAll('[data-diagram]')).toHaveLength(2)
  })

  it('shows every figure as its final text when nothing animates (jsdom, reduced motion)', () => {
    const original = window.matchMedia
    window.matchMedia = ((query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia
    try {
      render(<Projects />)
      const figures = screen.getAllByTestId('figure').map(f => f.textContent)
      expect(figures).toEqual(['0.0%', '240+', '92%'])
      // a figure that is not a number stands as written
      expect(screen.getByText('1-hour')).not.toHaveAttribute('data-count')
    } finally {
      window.matchMedia = original
    }
  })

  it('lists more projects, with SignalForge unlinked', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 3, name: 'More projects' })).toBeInTheDocument()
    const item = screen.getByText('SignalForge').closest('li') as HTMLElement
    expect(item).not.toBeNull()
    expect(item.querySelector('a')).toBeNull()
    expect(screen.getByRole('link', { name: 'Job Buddy' })).toHaveAttribute('href', 'https://github.com/mohammedfalahi/job-buddy')
  })
})

describe('Toolkit', () => {
  it('renders every skill group with its items', () => {
    const { container } = render(<Skills />)
    expect(container.querySelector('section')).toHaveAttribute('id', 'toolkit')
    expect(container.querySelector('img')).toBeNull()
    for (const g of skills) {
      expect(screen.getByText(g.name)).toBeInTheDocument()
      expect(screen.getByText(g.items.join(', '))).toBeInTheDocument()
    }
  })
})

describe('Experience', () => {
  it('shows roles, freelance work and education', () => {
    render(<Experience />)
    for (const org of ['Wisermonks', 'Drytis Inc.', 'Careerflow.ai', 'MES College of Engineering']) {
      expect(screen.getAllByText(org).length).toBeGreaterThan(0)
    }
    expect(screen.getAllByText('Boehm Tech LLP')).toHaveLength(2)
    expect(screen.getByText('Jan 2026 – Aug 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Additional experience (freelance)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
  })
})

describe('Certifications', () => {
  it('lists every certification with its issuer, Oracle first', () => {
    render(<Certifications />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(certifications.length)
    expect(items[0]).toHaveTextContent('Oracle Certified Foundations Associate: Agentic AI')
    expect(items[0]).toHaveTextContent('Oracle')
  })
})
