/**
 * Loads an ES module from the taste-skill kit copied into public/kit/.
 * The files are served as-is (not bundled), so the URL is built at runtime
 * and made absolute, which keeps Vite from rewriting it.
 */
const cache = new Map<string, Promise<unknown>>()

export function loadKit<T>(path: string): Promise<T> {
  let mod = cache.get(path)
  if (!mod) {
    const url = new URL(`${import.meta.env.BASE_URL}kit/${path}`, window.location.href).href
    mod = import(/* @vite-ignore */ url).then((m: { default: T }) => m.default)
    mod.catch(() => cache.delete(path))
    cache.set(path, mod)
  }
  return mod as Promise<T>
}

/** True when the browser has what the kit's motion needs (jsdom does not). */
export function canAnimate(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof IntersectionObserver !== 'undefined' &&
    typeof ResizeObserver !== 'undefined' &&
    typeof Element !== 'undefined' &&
    typeof Element.prototype.animate === 'function'
  )
}
