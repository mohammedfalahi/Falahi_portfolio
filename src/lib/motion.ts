import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function media(): MediaQueryList | null {
  try {
    return typeof window.matchMedia === 'function' ? window.matchMedia(QUERY) : null
  } catch {
    return null
  }
}

/** Reads the reduced-motion preference directly; false when matchMedia is unavailable. */
export function prefersReducedMotion(): boolean {
  return media()?.matches ?? false
}

function subscribe(onChange: () => void): () => void {
  const mql = media()
  mql?.addEventListener?.('change', onChange)
  return () => mql?.removeEventListener?.('change', onChange)
}

/** Live reduced-motion preference (re-reads matchMedia, so it follows test mocks too). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}
