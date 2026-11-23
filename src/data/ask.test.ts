import { describe, expect, it } from 'vitest'
import { entries, fallback, findAnswer, suggestions } from './ask'

describe('ask data', () => {
  it('maps each suggestion to its intended entry', () => {
    expect(suggestions.map(s => findAnswer(s)?.id)).toEqual([
      'production',
      'hallucinations',
      'stack',
      'experience',
      'location',
    ])
  })

  it('returns null for unknown and empty questions', () => {
    expect(findAnswer('What is his favourite colour?')).toBeNull()
    expect(findAnswer('')).toBeNull()
    expect(findAnswer('   ')).toBeNull()
  })

  it('matches case-insensitively', () => {
    expect(findAnswer('DOES HE KNOW RAG?')?.id).toBe('rag')
  })

  it('cites every source and has a source for every marker', () => {
    for (const e of entries) {
      const cited = new Set([...e.answer.matchAll(/\[(\d+)\]/g)].map(m => Number(m[1])))
      expect(cited.size, e.id).toBeGreaterThan(0)
      for (const n of cited) expect(n, e.id).toBeLessThanOrEqual(e.sources.length)
      for (let n = 1; n <= e.sources.length; n++) expect(cited.has(n), `${e.id} [${n}]`).toBe(true)
    }
  })

  it('keeps the entries in the planned order and has a fallback', () => {
    expect(entries.map(e => e.id)).toEqual([
      'production', 'hallucinations', 'stack', 'experience', 'rag', 'agents', 'ml', 'mlops', 'location', 'education', 'certs',
    ])
    expect(fallback).toBe("That isn't covered by my CV or project READMEs, so I won't guess. Email me and I'll answer it directly.")
  })
})
