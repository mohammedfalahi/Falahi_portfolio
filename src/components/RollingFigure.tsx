import { useEffect, useRef } from 'react'
import { canAnimate, loadKit } from '../lib/kit'
import { prefersReducedMotion } from '../lib/motion'

type Lib = {
  reduced(): boolean
  once(el: Element, run: () => void, opts?: { threshold?: number }): { destroy(): void }
}
type Moment = (root: HTMLElement, opts: { duration?: number; stagger?: number }, lib: Lib) => { destroy?(): void }

/** Whole figures with at most a decimal point and a % or + sign; "1-hour" and names stay still. */
const ROLLS = /^\d[\d.,]*[%+]?$/

const lib: Lib = {
  reduced: prefersReducedMotion,
  once(el, run, { threshold = 0.4 } = {}) {
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          io.disconnect()
          run()
        }
      },
      { threshold },
    )
    io.observe(el)
    return { destroy: () => io.disconnect() }
  },
}

function isPhone(): boolean {
  try {
    return window.matchMedia('(max-width: 639px)').matches
  } catch {
    return false
  }
}

/**
 * A proof figure that rolls once, like an odometer, when it enters the viewport
 * (taste-skill moment counter-rolls, public/kit/moments/counter-rolls/moment.js).
 * The final figure is in the markup, so without script, under reduced motion and on
 * phones it simply stands. Tabular figures and a 1em line keep it from shifting.
 */
export function RollingFigure({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const rolls = ROLLS.test(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !rolls || !canAnimate() || prefersReducedMotion() || isPhone()) return
    let live = true
    let handle: { destroy?(): void } = {}
    loadKit<Moment>('moments/counter-rolls/moment.js')
      .then(run => {
        if (live) handle = run(el, { duration: 900, stagger: 0 }, lib) ?? {}
      })
      .catch(() => {
        /* the figure stands */
      })
    return () => {
      live = false
      handle.destroy?.()
      // the kit replaced the text with digit strips; put the figure back as React wrote it
      el.textContent = value
      el.classList.remove('mo-cr', 'is-on')
      el.removeAttribute('aria-label')
    }
  }, [value, rolls])

  if (!rolls) return <p className={className}>{value}</p>
  return (
    <p className={`${className} tabular-nums leading-none`}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" data-count="" data-testid="figure">
        {value}
      </span>
    </p>
  )
}
