export type StoreName = 'local' | 'session'

function getStore(store: StoreName): Storage {
  return store === 'local' ? window.localStorage : window.sessionStorage
}

export function safeGet(store: StoreName, key: string): string | null {
  try {
    return getStore(store).getItem(key)
  } catch {
    return null
  }
}

export function safeSet(store: StoreName, key: string, value: string): void {
  try {
    getStore(store).setItem(key, value)
  } catch {
    // storage unavailable (private mode, quota, blocked): ignore
  }
}
