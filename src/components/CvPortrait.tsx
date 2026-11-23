import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

type Props = { src: string; alt: string; text: string; width: number; height: number; className?: string }
type Cell = { x: number; y: number; ch: string; a: number; d: number }

const CELL_W = 4.6
const CELL_H = 7.4
const FONT = '800 8.6px Archivo, sans-serif'
const GAMMA = 1.2
const GLYPHS = '01<>/{}[]#$%&*+=?'
const FADE = 350 // ms for one character to fade in, then settle
const LENS = 70 // px radius of the photo lens
const FOCUS_Y = 0.2 // object-position y, matching the <img>
// The portrait is a black panel with light type in both themes, like the photo it replaces.
const PANEL = '#000000'
const TYPE = '#E8E8E4'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/**
 * The portrait typeset from CV text on a canvas. Characters decode from
 * random glyphs on load; a lens following the pointer shows the photo.
 * The <img> stays underneath as the accessible image and the fallback
 * (no canvas, or before the photo and font load).
 */
export function CvPortrait({ src, alt, text, width, height, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!el || !cv || !ctx) return

    const img = new Image()
    img.src = src
    let W = 0
    let H = 0
    let cells: Cell[] = []
    // The finished portrait, so lens moves redraw one image instead of every letter.
    let cache: HTMLCanvasElement | null = null
    let t0 = 0
    let raf = 0
    let alive = true
    const pointer = { x: 0, y: 0, in: false }
    const reduced = prefersReducedMotion()
    const decodeEnd = () => t0 + (reduced ? 0 : 1600)

    // Draw the photo cover-fitted to the box, as the <img> does with object-cover.
    function drawPhoto(target: CanvasRenderingContext2D, w: number, h: number) {
      const s = Math.max(w / img.width, h / img.height)
      const dw = img.width * s
      const dh = img.height * s
      target.drawImage(img, (w - dw) / 2, (h - dh) * FOCUS_Y, dw, dh)
    }

    function layout() {
      const r = el!.getBoundingClientRect()
      if (!r.width || !r.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      cv!.width = Math.round(W * dpr)
      cv!.height = Math.round(H * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cache = null

      // Sample the photo's luminance on the character grid.
      const cols = Math.max(1, Math.round(W / CELL_W))
      const rows = Math.max(1, Math.round(H / CELL_H))
      const oc = document.createElement('canvas')
      oc.width = cols
      oc.height = rows
      const o = oc.getContext('2d')
      if (!o) return
      drawPhoto(o, cols, rows)
      const px = o.getImageData(0, 0, cols, rows).data
      const lums = new Float32Array(cols * rows)
      for (let j = 0; j < lums.length; j++) {
        lums[j] = (0.299 * px[j * 4] + 0.587 * px[j * 4 + 1] + 0.114 * px[j * 4 + 2]) / 255
      }
      // Stretch contrast between the 2nd and 98th percentiles: the photo's grey
      // backdrop is close to the skin tone, so the full range is needed to read the face.
      const sorted = Float32Array.from(lums).sort()
      const lo = sorted[Math.floor(sorted.length * 0.02)]
      const hi = sorted[Math.floor(sorted.length * 0.98)]
      const span = Math.max(hi - lo, 0.01)
      const cw = W / cols
      const ch = H / rows
      cells = []
      let k = 0
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const c = text[k % text.length]
          const lum = lums[k++]
          if (c === ' ') continue
          // Brighter pixels get brighter type, so the portrait reads as a positive image.
          const a = 0.06 + 0.94 * Math.pow(clamp01((lum - lo) / span), GAMMA)
          cells.push({ x: x * cw, y: y * ch + ch * 0.8, ch: c, a, d: reduced ? -FADE : Math.random() * 900 + y * 4 })
        }
      }
    }

    function draw(now: number) {
      const t = now - t0
      const settled = now >= decodeEnd() + FADE
      if (settled && cache) {
        ctx!.drawImage(cache, 0, 0, W, H)
      } else {
        ctx!.globalAlpha = 1
        ctx!.fillStyle = PANEL
        ctx!.fillRect(0, 0, W, H)
        ctx!.font = FONT
        ctx!.fillStyle = TYPE
        for (const c of cells) {
          const p = (t - c.d) / FADE
          if (p <= 0) continue
          ctx!.globalAlpha = clamp01(p) * c.a
          ctx!.fillText(p >= 1 ? c.ch : GLYPHS[(Math.random() * GLYPHS.length) | 0], c.x, c.y)
        }
        ctx!.globalAlpha = 1
        if (settled) {
          cache = document.createElement('canvas')
          cache.width = cv!.width
          cache.height = cv!.height
          cache.getContext('2d')?.drawImage(cv!, 0, 0)
        }
      }
      if (pointer.in) {
        ctx!.save()
        ctx!.beginPath()
        ctx!.arc(pointer.x, pointer.y, LENS, 0, Math.PI * 2)
        ctx!.clip()
        ctx!.filter = 'grayscale(1) contrast(1.05)'
        drawPhoto(ctx!, W, H)
        ctx!.restore()
        ctx!.beginPath()
        ctx!.arc(pointer.x, pointer.y, LENS, 0, Math.PI * 2)
        ctx!.strokeStyle = TYPE
        ctx!.lineWidth = 1.5
        ctx!.stroke()
      }
    }

    // Animate only while decoding or while the lens is moving; otherwise idle.
    function frame(now: number) {
      raf = 0
      draw(now)
      if (now < decodeEnd() + FADE) raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf && alive) raf = requestAnimationFrame(frame)
    }

    function begin() {
      if (!alive) return
      layout()
      t0 = performance.now()
      setReady(true)
      kick()
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.in = true
      kick()
    }
    const onLeave = () => {
      pointer.in = false
      kick()
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    // Relayout on size change without replaying the decode.
    const settle = () => {
      if (!t0) return
      layout()
      t0 = performance.now() - 1e6
      kick()
    }
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(settle) : null
    ro?.observe(el)

    const fonts = document.fonts?.ready ?? Promise.resolve()
    img.decode().then(() => fonts).then(begin, () => {})

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro?.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [src, text])

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`block h-full w-full object-cover object-[50%_20%] grayscale contrast-[1.05] transition-opacity duration-500 ${ready ? 'opacity-0' : ''}`}
      />
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  )
}
