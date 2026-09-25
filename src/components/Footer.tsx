import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useState, type FormEvent, type SVGProps } from 'react'
import { brand, footerColumns, navLinks } from '../data/content'
import { Logo } from './Navbar'

const icon = (p: SVGProps<SVGSVGElement>) => ({
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  'aria-hidden': true,
  ...p,
})

const socials = [
  {
    label: 'Facebook',
    svg: (
      <svg {...icon({})}>
        <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    svg: (
      <svg {...icon({})}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    svg: (
      <svg {...icon({})}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    svg: (
      <svg {...icon({})}>
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M8 10.5V17M8 7.5v.01M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17M12 10.5V17" />
      </svg>
    ),
  },
]

const hrefFor = (label: string) => navLinks.find((n) => n.label.toLowerCase() === label.toLowerCase())?.href ?? '#footer'

export function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    setJoined(true)
  }

  return (
    <footer id="footer" className="border-t border-line bg-graphite pt-16 pb-9">
      <div className="frame">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr_1.3fr] lg:gap-14">
          <div>
            <Logo size="lg" />
            <p className="mt-5 text-[13.5px] text-muted">{brand.tagline}</p>
            <div className="mt-7 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#footer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-platinum/70 transition-colors duration-300 hover:border-xenon hover:text-xenon"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <h3 className="text-[13px] font-medium text-platinum">{c.title}</h3>
                <ul className="mt-5 space-y-1 text-[13.5px] text-muted">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href={hrefFor(l)} className="inline-block py-2 transition-colors duration-300 hover:text-xenon">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <h3 className="text-[13px] font-medium text-platinum">Stay in the loop</h3>
            <p className="mt-4 max-w-[320px] text-[13.5px] leading-[1.7] text-muted">
              Opening hours, new arrivals to the hall and private viewing dates.
            </p>
            <AnimatePresence mode="wait">
              {joined ? (
                <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status" className="mt-6 flex items-center gap-3 text-[13.5px] text-xenon">
                  <Check className="h-4 w-4" strokeWidth={1.8} /> Thank you — you’re on the list.
                </motion.p>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} className="mt-6 flex border border-line focus-within:border-xenon">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[13.5px] text-platinum placeholder:text-muted/70 focus:outline-none"
                  />
                  <button type="submit" aria-label="Subscribe" className="grid w-14 place-items-center bg-xenon text-night transition-colors hover:bg-xenon-soft">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} APEX Automotive Exhibition. All rights reserved.
          </p>
          <p className="font-mono text-[12px] tracking-[0.18em] text-xenon uppercase">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
