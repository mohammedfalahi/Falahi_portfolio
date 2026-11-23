import { profile, terminal } from '../data/portfolio'
import { Terminal } from '../components/Terminal'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

type Props = {
  /** Whether the splash has finished, so the terminal can start. Defaults to true. */
  splashDone?: boolean
}

export function Hero({ splashDone = true }: Props) {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-9 px-5 pb-12 pt-24 md:grid-cols-[1fr_1.05fr] md:px-9 md:pb-14 md:pt-32"
    >
      <div>
        <h1 className="mb-4 text-[38px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink md:text-[50px]">
          {profile.headline}
        </h1>
        <p className="mb-6 max-w-[38ch] text-base leading-[1.55] text-mute">{profile.lede}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={profile.cv}
            download
            className={`rounded-lg bg-acc px-[18px] py-[11px] text-sm font-semibold text-white hover:opacity-90 dark:text-bg ${focusRing}`}
          >
            Download CV
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={`rounded-lg border border-rule px-[18px] py-[11px] text-sm font-semibold text-ink hover:border-mute ${focusRing}`}
          >
            Email me
          </a>
        </div>
        <div className="mt-6 flex gap-4 text-[13px] text-mute">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded underline underline-offset-[3px] hover:text-ink ${focusRing}`}
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded underline underline-offset-[3px] hover:text-ink ${focusRing}`}
          >
            LinkedIn
          </a>
        </div>
      </div>
      <Terminal lines={terminal} start={splashDone} />
    </section>
  )
}
