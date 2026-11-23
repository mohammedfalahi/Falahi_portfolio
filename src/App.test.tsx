import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('App', () => {
  it('renders the sections in order', () => {
    const { container } = render(<App />)
    const ids = Array.from(container.querySelectorAll('main section[id]')).map(s => s.id)
    const order = ['ask', 'work', 'toolkit', 'experience', 'contact']
    expect(ids.filter(id => order.includes(id))).toEqual(order)
    expect(container.querySelector('main > section h1')).toHaveTextContent(/Mohammed/)
  })

  it('has a target for every in-page link', () => {
    const { container } = render(<App />)
    const hrefs = Array.from(container.querySelectorAll('a[href^="#"]')).map(a => a.getAttribute('href')!)
    for (const href of new Set(hrefs)) expect(container.querySelector(href), href).not.toBeNull()
  })
})
