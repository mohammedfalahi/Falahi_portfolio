import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { fallback, findAnswer, suggestions, type AskEntry } from '../data/ask'
import { usePrefersReducedMotion } from '../lib/motion'
import { btnPrimary, btnSecondary, container, focusRing } from '../lib/ui'

type Current = { n: number; entry: AskEntry | null; instant: boolean }

const CHARS_PER_TICK = 3
const TICK_MS = 16

/** Renders `[n]` markers as citation links; a half-typed marker at the end is hidden. */
function withCitations(text: string): ReactNode[] {
  return text
    .replace(/\[\d*$/, '')
    .split(/(\[\d+\])/)
    .filter(Boolean)
    .map((part, i) => {
      const m = /^\[(\d+)\]$/.exec(part)
      if (!m) return part
      return (
        <sup key={i}>
          <a
            href={`#ask-src-${m[1]}`}
            className={`ml-0.5 rounded-sm text-[.6em] font-bold text-cite no-underline ${focusRing}`}
          >
            [{m[1]}]
          </a>
        </sup>
      )
    })
}

export function Ask() {
  const reduced = usePrefersReducedMotion()
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState<Current>(() => ({
    n: 0,
    entry: findAnswer(suggestions[0]),
    instant: true,
  }))
  const [typed, setTyped] = useState({ n: -1, chars: 0 })

  const full = current.entry ? current.entry.answer : fallback
  const chars = current.instant ? full.length : typed.n === current.n ? typed.chars : 0
  const done = chars >= full.length

  useEffect(() => {
    if (current.instant) return
    const id = current.n
    const total = full.length
    let i = 0
    let timer = window.setTimeout(function tick() {
      i = Math.min(i + CHARS_PER_TICK, total)
      setTyped({ n: id, chars: i })
      if (i < total) timer = window.setTimeout(tick, TICK_MS)
    }, TICK_MS)
    return () => window.clearTimeout(timer)
  }, [current, full])

  function ask(q: string) {
    const question = q.trim()
    if (!question) return
    setCurrent(c => ({ n: c.n + 1, entry: findAnswer(question), instant: reduced }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    ask(query)
  }

  function onChip(s: string) {
    setQuery(s)
    ask(s)
  }

  const sources = done && current.entry ? current.entry.sources : []

  return (
    <section id="ask" aria-labelledby="ask-title" className={container}>
      <div className="mt-[72px] border-t-[1.5px] border-ink pb-14 pt-11">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h2 id="ask-title" className="cond m-0 text-[clamp(44px,6vw,84px)] leading-[.9]">
            Ask my portfolio
          </h2>
          <p className="m-0 max-w-[38ch] text-[15px] text-graphite">
            Answers come only from my CV and project READMEs, and every claim links to its source.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7">
          <label htmlFor="ask-q" className="block text-sm text-graphite">
            Your question
          </label>
          {/* The ring sits on the underlined row, so the input itself needs no outline of its own. */}
          <div className="mt-1 flex gap-2.5 rounded-sm border-b-[1.5px] border-ink pb-2.5 outline-offset-4 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink">
            <input
              id="ask-q"
              name="q"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask anything a recruiter would ask"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-2 text-[clamp(20px,2.2vw,28px)] text-ink placeholder:text-graphite focus:outline-none"
            />
            <button type="submit" className={`${btnPrimary} shrink-0 px-[22px]`}>
              Ask
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onChip(s)}
              className={`${btnSecondary} btn-sm text-left`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-[30px] grid min-h-[120px] gap-10 md:grid-cols-[1.3fr_1fr]">
          <p
            data-testid="ask-answer"
            aria-hidden={done ? undefined : true}
            className="m-0 max-w-[34ch] text-[clamp(20px,2vw,26px)] leading-[1.4]"
          >
            {withCitations(full.slice(0, chars))}
            {!done && (
              <span
                aria-hidden="true"
                className="ml-px inline-block h-[1em] w-[.5ch] animate-blink bg-ink align-[-0.15em] motion-reduce:animate-none"
              />
            )}
          </p>
          {sources.length > 0 && (
            <ol aria-label="Sources" className="m-0 list-none p-0 text-sm">
              {sources.map((s, i) => (
                <li
                  key={i}
                  id={`ask-src-${i + 1}`}
                  className="mb-2.5 border-l-2 border-cite bg-well py-3 pl-4 pr-3.5"
                >
                  <b className="mr-1.5 text-cite">[{i + 1}]</b>
                  {s.label}
                  <span className="mt-0.5 block text-graphite">
                    <q className="not-italic">{s.quote}</q>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {done ? full : ''}
        </p>
      </div>
    </section>
  )
}
