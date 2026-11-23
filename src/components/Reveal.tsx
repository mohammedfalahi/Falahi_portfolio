import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/motion'

type Props = { children: ReactNode; className?: string }

/** If the observer has not revealed the content by then, show it anyway. */
const SAFETY_MS = 1500

/**
 * Fades in with a 12px rise once, when it enters the viewport. Content is never left hidden:
 * plain children under reduced motion or without IntersectionObserver, and after a timeout it swaps to
 * plain children if the observer never fires.
 */
export function Reveal({ children, className }: Props) {
  const reduce = usePrefersReducedMotion()
  const supported = typeof IntersectionObserver !== 'undefined'
  const [forced, setForced] = useState(false)
  const animated = !reduce && supported

  useEffect(() => {
    if (!animated || forced) return
    const t = setTimeout(() => setForced(true), SAFETY_MS)
    return () => clearTimeout(t)
  }, [animated])

  if (!animated || forced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
