import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
const field =
  'w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xjgopddo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setValues({ name: '', email: '', message: '' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:px-9 md:py-20">
      <h2 className="mb-6 text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[30px]">Get in touch</h2>
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className="text-sm text-mute">
            <p className="mb-4 leading-[1.55]">
              Open to roles across India and the UAE, available immediately. The quickest way to reach me is email.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className={`break-all rounded font-semibold text-acc underline underline-offset-[3px] ${focusRing}`}
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={'tel:' + profile.phone.replace(/\s/g, '')}
                  className={`rounded font-semibold text-acc underline underline-offset-[3px] ${focusRing}`}
                >
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded font-semibold text-acc underline underline-offset-[3px] ${focusRing}`}
                >
                  LinkedIn
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-ink">
                Name
              </label>
              <input id="contact-name" name="name" required autoComplete="name" value={values.name} onChange={set('name')} className={field} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={set('email')}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-ink">
                Message
              </label>
              <textarea id="contact-message" name="message" required rows={5} value={values.message} onChange={set('message')} className={field} />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`rounded-lg bg-acc px-[18px] py-[11px] text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 dark:text-bg ${focusRing}`}
            >
              {status === 'sending' ? 'Sending' : 'Send message'}
            </button>
            <div role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === 'sent' && <p className="text-ok">Message sent. Thank you, I will reply soon.</p>}
              {status === 'error' && (
                <p className="text-ink">Message not sent. Email me directly at {profile.email}.</p>
              )}
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
