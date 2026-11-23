import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/motion'

type Props = { children: ReactNode; className?: string }

/**
 * Fades in with a 12px rise once, when it enters the viewport. Renders plain children under
 * reduced motion or when IntersectionObserver is unavailable, so content is never left hidden.
 */
export function Reveal({ children, className }: Props) {
  const reduce = usePrefersReducedMotion()
  if (reduce || typeof IntersectionObserver === 'undefined') {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
