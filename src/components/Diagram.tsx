import { useEffect, useRef } from 'react'
import type { DiagramSpec } from '../data/diagrams'
import { canAnimate, loadKit } from '../lib/kit'

type DiagramInstance = { destroy(): void }
type DiagramApi = { mount(el: HTMLElement, spec: DiagramSpec, opts?: { iconBase?: string }): DiagramInstance }

const ICON_BASE = `${import.meta.env.BASE_URL}kit/icons/`

/**
 * A node-and-line diagram drawn by the taste-skill kit (public/kit/diagrams/diagram.js).
 * React renders the empty host with its spec; the kit draws into it after mount and owns its
 * children. The kit loops the light only while on screen, and holds a still frame on phones
 * and under reduced motion. It reads the ink once per layout, so it is drawn again when the
 * theme changes.
 */
export function Diagram({ spec }: { spec: DiagramSpec }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canAnimate()) return
    let instance: DiagramInstance | null = null
    let live = true
    const draw = () =>
      loadKit<DiagramApi>('diagrams/diagram.js')
        .then(dg => {
          if (live) instance = dg.mount(el, spec, { iconBase: ICON_BASE })
        })
        .catch(() => {
          /* the panel stays empty; the text column still says everything */
        })
    draw()
    const theme = new MutationObserver(draw)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      live = false
      theme.disconnect()
      instance?.destroy()
    }
  }, [spec])

  return (
    <div className="panel work-diagram relative w-full overflow-hidden border border-rule bg-well lg:w-[560px]">
      <div
        ref={ref}
        className="dg"
        role="img"
        aria-label={spec.alt}
        data-diagram={JSON.stringify(spec)}
        data-icon-base={ICON_BASE}
      />
    </div>
  )
}
