import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand, navLinks } from '../data/content'
import { EASE, useUI } from '../lib/ui'

export function Logo({ className = '', size = 'sm' }: { className?: string; size?: 'sm' | 'lg' }) {
  const big = size === 'lg'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 32 32" className={`${big ? 'h-9 w-9' : 'h-7 w-7'} text-xenon`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden>
        <path d="M4 23L16 7l12 16" />
        <path d="M10.5 23h11" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display ${big ? 'text-[1.5rem]' : 'text-[1.15rem]'} font-extrabold tracking-[0.26em] text-platinum`}>{brand.name}</span>
        <span className={`${big ? 'mt-1.5' : 'mt-1'} font-mono text-[9px] tracking-[0.28em] text-muted`}>{brand.sub}</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const { open } = useUI()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('#exhibits')

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    const probe = y + window.innerHeight * 0.4
    let best = -1
    let cur = '#exhibits'
    for (const l of navLinks) {
      const el = document.querySelector<HTMLElement>(l.href)
      if (el && el.offsetTop <= probe && el.offsetTop > best) {
        best = el.offsetTop
        cur = l.href
      }
    }
    setActive(cur)
  })

  useEffect(() => {
    if (!menu) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
          scrolled ? 'border-b border-line bg-night/88 py-3 backdrop-blur-xl' : 'border-b border-transparent py-5'
        }`}
      >
        <nav aria-label="Main" className="frame flex items-center justify-between gap-4">
          <a href="#top" aria-label={`${brand.name} — ${brand.sub}`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`relative py-2.5 font-mono text-[11.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    active === l.href ? 'text-platinum' : 'text-muted hover:text-platinum'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-xenon transition-transform duration-500 ${
                      active === l.href ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => open({ kind: 'booking' })} className="btn-xenon group hidden px-5 py-2.5 text-[11px] sm:inline-flex">
              Plan your visit
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-11 w-11 shrink-0 place-items-center text-platinum lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col bg-night lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="frame flex items-center justify-between py-5">
              <Logo />
              <button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center" autoFocus>
                <X className="h-6 w-6" strokeWidth={1.6} />
              </button>
            </div>
            <ul className="frame flex flex-1 flex-col justify-center">
              {navLinks.map((l, i) => (
                <li key={l.label} className="border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.05, duration: 0.45, ease: EASE }}
                    className="display flex items-baseline justify-between py-4 text-[2.1rem]"
                  >
                    {l.label}
                    <span className="font-mono text-[11px] tracking-[0.2em] text-xenon">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="frame pb-10">
              <button
                type="button"
                onClick={() => {
                  setMenu(false)
                  open({ kind: 'booking' })
                }}
                className="btn-xenon w-full justify-center py-4"
              >
                Plan your visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
