import { profile } from '../data/portfolio'
import { usePrefersReducedMotion } from '../lib/motion'
import { container, focusRing } from '../lib/ui'

const pill = `inline-block rounded-full border-[1.5px] border-ink px-5 py-3 text-[15px] font-semibold no-underline ${focusRing}`
const textLink = `rounded-sm underline underline-offset-4 ${focusRing}`

/**
 * Poster hero: a tall portrait on the right with the name set across it.
 * The name uses difference blending, so where it crosses the photo it turns
 * into a photographic negative, and on plain paper it reads as solid ink.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion()
  const anim = (cls: string) => (reduced ? '' : cls)

  return (
    <section className={`${container} relative isolate bg-paper pb-14 pt-6 md:pt-[2vw]`}>
      <div className="grid">
        <figure
          className={`col-start-1 row-start-1 m-0 w-[64vw] justify-self-end self-start overflow-hidden md:w-[40vw] md:max-w-[560px] ${anim('animate-unveil')}`}
        >
          <img
            src="/about-portrait.jpg"
            alt="Mohammed Falahi"
            width={1002}
            height={1300}
            className={`block aspect-[1002/1300] w-full object-cover object-[50%_20%] grayscale contrast-[1.05] ${anim('animate-settle')}`}
          />
        </figure>

        {/* `relative` without a z-index paints this above the photo without creating a
            stacking context, so the name can still blend with the photo and the paper. */}
        <div className="relative col-start-1 row-start-1 flex flex-col md:min-h-[min(52vw,728px)] md:justify-between">
          <h1 className="cond order-1 m-0 mt-[58vw] text-[clamp(60px,15.5vw,232px)] leading-[.82] text-white mix-blend-difference md:order-2 md:mb-[3vw] md:mt-10">
            <span className="block overflow-hidden pt-[.04em]">
              <span className={`block ${anim('animate-rise [animation-delay:250ms]')}`}>Mohammed</span>
            </span>
            <span className="block overflow-hidden pt-[.04em] md:text-right">
              <span className={`block ${anim('animate-rise [animation-delay:350ms]')}`}>Falahi</span>
            </span>
          </h1>

          <div className="order-2 mt-9 max-w-[30rem] md:order-1 md:mt-[2vw] md:max-w-[calc(100%-min(40vw,560px)-3vw)]">
            <p className="m-0 max-w-[30ch] text-[clamp(20px,2vw,26px)] leading-[1.35]">{profile.intro}</p>
            <p className="m-0 mt-5 text-[15px] text-graphite">{profile.meta}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href={profile.cv} download className={`${pill} bg-ink text-paper`}>
                Download CV
              </a>
              <a href={`mailto:${profile.email}`} className={`${pill} text-ink`}>
                Email me
              </a>
            </div>
            <div className="mt-4 flex gap-5 text-[15px]">
              <a href={profile.github} target="_blank" rel="noreferrer" className={textLink}>
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={textLink}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
