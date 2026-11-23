/** Shared class strings for the editorial layout. */
export const container = 'mx-auto max-w-[1280px] px-4 sm:px-[4vw] xl:px-12'

export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

export const sectionTitle = 'cond mb-6 mt-14 text-[clamp(44px,6vw,84px)] leading-[.9]'

/** The two button styles (see .btn in index.css): solid ink pill, and 1.5px ink-outline pill. */
export const btnPrimary = `btn btn-primary ${focusRing}`
export const btnSecondary = `btn btn-secondary ${focusRing}`

/** A text link: 1px underline at rest, a 2px one draws in from the left on hover. */
export const textLink = `link rounded-sm ${focusRing}`

/** A link that stands on its own (not inside running text): 44px tall on phones. */
export const tapLink = `${textLink} inline-block py-[11px] md:py-0`
