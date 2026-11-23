import { profile } from '../data/portfolio'
import { usePrefersReducedMotion } from '../lib/motion'
import { container, focusRing } from '../lib/ui'

const pill = `inline-block rounded-full border-[1.5px] border-ink px-5 py-3 text-[15px] font-semibold no-underline ${focusRing}`
const textLink = `rounded-sm underline underline-offset-4 ${focusRing}`

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const rise = reduced ? '' : 'animate-rise'

  return (
    <section className={`${container} pb-10 pt-[4vw]`}>
      <h1 className="cond m-0 text-[clamp(64px,17.5vw,252px)] leading-[.82]">
        <span className="block overflow-hidden">
          <span className={`block ${rise}`}>Mohammed</span>
        </span>
        <span className="block overflow-hidden">
          <span
            className={`flex items-end gap-[clamp(12px,2vw,28px)] ${rise} [animation-delay:100ms]`}
          >
            Falahi
            <img
              src="/about-portrait.jpg"
              alt="Mohammed Falahi"
              className="mb-[.06em] aspect-[3/4] w-[clamp(96px,17vw,240px)] shrink-0 object-cover object-[50%_20%] grayscale"
            />
          </span>
        </span>
      </h1>

      <div className="mt-9 grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
        <p className="m-0 max-w-[30ch] text-[clamp(20px,2vw,26px)] leading-[1.35]">{profile.intro}</p>
        <div className="md:text-right">
          <p className="m-0 text-[15px] text-graphite">{profile.meta}</p>
          <div className="mt-3.5 flex flex-wrap gap-2.5 md:justify-end">
            <a href={profile.cv} download className={`${pill} bg-ink text-paper`}>
              Download CV
            </a>
            <a href={`mailto:${profile.email}`} className={`${pill} text-ink`}>
              Email me
            </a>
          </div>
          <div className="mt-4 flex gap-5 text-[15px] md:justify-end">
            <a href={profile.github} target="_blank" rel="noreferrer" className={textLink}>
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={textLink}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
