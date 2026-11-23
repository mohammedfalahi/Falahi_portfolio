import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { safeGet, safeSet } from '../lib/storage'
import { prefersReducedMotion } from '../lib/motion'

const NAME = 'mohammed.falahi'
const SEEN_KEY = 'splash-seen'
const TYPE_STEP_MS = 60 // 15 chars ≈ 0.9s
const FADE_AT_MS = 1200
const DONE_AT_MS = 1600

export function Splash({ onDone }: { onDone: () => void }) {
  const [show] = useState(() => !prefersReducedMotion() && safeGet('session', SEEN_KEY) === null)
  const [typed, setTyped] = useState(0)
  const [fading, setFading] = useState(false)
  const onDoneRef = useRef(onDone)
  const doneRef = useRef(false)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onDoneRef.current()
    }
    if (!show) {
      finish()
      return
    }
    safeSet('session', SEEN_KEY, '1')

    const typer = window.setInterval(() => {
      setTyped(n => (n >= NAME.length ? n : n + 1))
    }, TYPE_STEP_MS)
    const fade = window.setTimeout(() => setFading(true), FADE_AT_MS)
    const done = window.setTimeout(finish, DONE_AT_MS)

    const skip = () => {
      clearInterval(typer)
      clearTimeout(fade)
      clearTimeout(done)
      finish()
    }
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    return () => {
      clearInterval(typer)
      clearTimeout(fade)
      clearTimeout(done)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      data-testid="splash"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-term"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: (DONE_AT_MS - FADE_AT_MS) / 1000, ease: 'easeOut' }}
    >
      <span className="font-mono text-[22px] text-[#E8ECF3]">
        {NAME.slice(0, typed)}
        <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-[#7C93FF] align-[-0.15em]" />
      </span>
    </motion.div>
  )
}
