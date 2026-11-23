import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { TerminalLine } from '../data/portfolio'
import { usePrefersReducedMotion } from '../lib/motion'

const STEP_MS = 600

// The panel is dark in both themes, so line colours are fixed (all ≥ 4.5:1 on --term).
const tone: Record<TerminalLine['kind'], string> = {
  cmd: 'text-white',
  dim: 'text-[#8391A9]',
  ok: 'text-[#4CC38A]',
  out: 'text-[#C9D3E6]',
}

type Props = {
  lines: TerminalLine[]
  /** Start revealing lines (e.g. once the splash has finished). Defaults to true. */
  start?: boolean
}

export function Terminal({ lines, start = true }: Props) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (reduced || !start) return
    let count = 0
    const id = window.setInterval(() => {
      count += 1
      setShown(count)
      if (count >= lines.length) clearInterval(id)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduced, start, lines.length, run])

  const visible = reduced ? lines : lines.slice(0, shown)

  return (
    <div
      role="group"
      aria-label="Example terminal session"
      className="overflow-hidden rounded-xl bg-term font-mono text-[12.5px] text-[#C9D3E6] shadow-[0_20px_50px_-20px_rgba(14,22,38,0.5)] sm:text-[13px]"
    >
      <div className="flex items-center gap-1.5 border-b border-[#1E2A40] px-3.5 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2A3650]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2A3650]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2A3650]" />
        {!reduced && (
          <button
            type="button"
            onClick={() => {
              setShown(0)
              setRun(r => r + 1)
            }}
            className="ml-auto rounded px-2 py-0.5 text-[11.5px] text-[#B4C0D6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C93FF]"
          >
            Replay
          </button>
        )}
      </div>
      <div className="min-h-[220px] px-[18px] py-4 leading-[1.75]">
        {visible.map((line, i) => (
          <motion.div
            key={`${run}-${i}`}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`break-words ${tone[line.kind]}`}
          >
            {line.kind === 'cmd' && (
              <span aria-hidden="true" className="text-[#7C93FF]">
                ${' '}
              </span>
            )}
            <span>{line.text}</span>
            {line.cite?.map(c => (
              <sup key={c} className="ml-0.5 text-[#7C93FF]">
                [{c}]
              </sup>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
