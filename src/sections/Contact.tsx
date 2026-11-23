import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { container, focusRing } from '../lib/ui'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const link = `rounded-sm underline underline-offset-4 ${focusRing}`
const label = 'mb-1 block text-sm text-graphite'
const field = `w-full rounded-none border-0 border-b-[1.5px] border-ink bg-transparent px-0 py-2 text-ink focus:outline-none ${focusRing}`

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues(v => ({ ...v, [key]: e.target.value }))

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
    <section id="contact" className={`${container} pb-10 pt-20`}>
      <h2 className="cond m-0 mb-6 text-[clamp(44px,6vw,84px)] leading-[.9]">Get in touch</h2>
      <a
        href={`mailto:${profile.email}`}
        className={`cond block break-words rounded-sm text-[clamp(36px,7.4vw,112px)] normal-case leading-[.9] no-underline hover:text-cite ${focusRing}`}
      >
        {profile.email}
      </a>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          <li>
            <a href={'tel:' + profile.phone.replace(/\s/g, '')} className={link}>
              {profile.phone}
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
              LinkedIn
            </a>
          </li>
          <li>{profile.location}</li>
          <li className="mt-2 max-w-[40ch] text-graphite">
            Open to roles across India and the UAE. Email is the quickest way to reach me.
          </li>
        </ul>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="contact-name" className={label}>
              Name
            </label>
            <input id="contact-name" name="name" required autoComplete="name" value={values.name} onChange={set('name')} className={field} />
          </div>
          <div>
            <label htmlFor="contact-email" className={label}>
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
            <label htmlFor="contact-message" className={label}>
              Message
            </label>
            <textarea id="contact-message" name="message" required rows={4} value={values.message} onChange={set('message')} className={`${field} resize-y`} />
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-paper disabled:opacity-60 ${focusRing}`}
            >
              {status === 'sending' ? 'Sending' : 'Send message'}
            </button>
          </div>
          <div role="status" aria-live="polite" className="min-h-5 text-sm">
            {status === 'sent' && <p className="m-0">Message sent. Thank you, I will reply soon.</p>}
            {status === 'error' && <p className="m-0">Message not sent. Email me directly at {profile.email}.</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
