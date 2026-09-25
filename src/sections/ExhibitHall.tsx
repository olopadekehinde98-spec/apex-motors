import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { exhibits, type Room } from '../data/content'
import { EASE, EASE_MASK, useUI } from '../lib/ui'

/**
 * The hall: pick a machine, then walk its four rooms. The stage wipes between
 * rooms like a gallery door opening, and the placard updates with it.
 */
export function ExhibitHall() {
  const { open } = useUI()
  const [ei, setEi] = useState(0)
  const [room, setRoom] = useState<Room['key']>('exterior')
  const [paint, setPaint] = useState(0)

  const ex = exhibits[ei]
  const current = ex.rooms.find((r) => r.key === room) ?? ex.rooms[0]
  const tint = ex.paints[Math.min(paint, ex.paints.length - 1)]

  const pick = (i: number) => {
    setEi(i)
    setRoom('exterior')
    setPaint(0)
  }

  return (
    <section id="exhibits" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="floor pointer-events-none absolute inset-0 opacity-40" />

      <div className="frame relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="plate mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-xenon" />
              The collection
            </p>
            <SplitLines className="display text-[clamp(2rem,4.6vw,3.6rem)]" lines={['Four machines,', 'one hall']} />
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.75] text-muted">
            Each exhibit is shown as the museum would show it: the object, the placard, and the facts — no configurator funnel, no finance
            calculator.
          </p>
        </div>

        {/* Machine selector */}
        <ul className="no-scrollbar mt-10 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {exhibits.map((e, i) => {
            const on = i === ei
            return (
              <li key={e.id} className="w-[68vw] shrink-0 sm:w-[40vw] lg:w-auto">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={on}
                  className={`group relative block aspect-[16/10] w-full overflow-hidden border text-left transition-colors duration-500 ${
                    on ? 'border-xenon' : 'border-line hover:border-platinum/40'
                  }`}
                >
                  <Img
                    photo={e.rooms[0].photo}
                    sizes="(min-width: 1024px) 23vw, 68vw"
                    widths={[400, 700, 1000]}
                    className={`transition-all duration-[1200ms] ease-cine group-hover:scale-[1.06] ${on ? 'opacity-100' : 'opacity-55 grayscale'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <span className="min-w-0">
                      <span className="block font-mono text-[10.5px] tracking-[0.2em] text-xenon">{e.no}</span>
                      <span className="mt-1 block truncate font-display text-[1.05rem] font-bold uppercase">{e.name}</span>
                    </span>
                    <span className="font-mono text-[10.5px] text-muted">{e.year}</span>
                  </div>
                  {on && <span className="absolute top-0 left-0 h-0.5 w-full bg-xenon" />}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Stage + placard */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-graphite">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`${ex.id}-${room}`}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  animate={{ clipPath: 'inset(0 0 0 0%)' }}
                  exit={{ opacity: 0.25 }}
                  transition={{ duration: 0.9, ease: EASE_MASK }}
                >
                  <motion.div className="h-full w-full" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }}>
                    <Img photo={current.photo} sizes="(min-width: 1024px) 62vw, 100vw" widths={[640, 1024, 1440]} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Paint visualiser — a tint over the machine, not a repaint */}
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-color"
                animate={{ backgroundColor: tint.tint }}
                transition={{ duration: 0.6 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />

              {/* Room caption */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.caption}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute right-5 bottom-5 left-5 max-w-[520px] text-[13px] leading-relaxed text-platinum/85"
                >
                  {current.caption}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Room switch */}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ex.rooms.map((r) => {
                const on = r.key === room
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRoom(r.key)}
                    aria-pressed={on}
                    className={`border px-3 py-3 text-left font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      on ? 'border-xenon bg-xenon/10 text-platinum' : 'border-line text-muted hover:border-platinum/40 hover:text-platinum'
                    }`}
                  >
                    {r.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Museum placard */}
          <div className="card flex flex-col p-6">
            <p className="font-mono text-[10.5px] tracking-[0.24em] text-xenon">{ex.no} · {ex.marque}</p>
            <h3 className="display mt-3 text-[clamp(1.8rem,3vw,2.5rem)]">{ex.name}</h3>
            <p className="mt-2 font-mono text-[11.5px] text-muted">
              {ex.year} · {ex.edition}
            </p>
            <p className="mt-5 text-[14px] leading-[1.75] text-platinum/75">{ex.statement}</p>

            <dl className="mt-6 divide-y divide-line border-y border-line">
              {ex.placard.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{f.label}</dt>
                  <dd className="text-right font-mono text-[11.5px] text-platinum">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* Paint study */}
            <div className="mt-6">
              <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">Paint study</p>
              <div className="mt-3 flex items-center gap-2">
                {ex.paints.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setPaint(i)}
                    aria-pressed={i === paint}
                    aria-label={c.name}
                    title={c.name}
                    className={`h-8 w-8 rounded-full border transition-transform duration-300 ${
                      i === paint ? 'scale-110 border-xenon' : 'border-line hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                <span className="ml-2 font-mono text-[11px] text-platinum">{tint.name}</span>
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-[0.1em] text-muted">Tinted preview · not a respray</p>
            </div>

            <button type="button" onClick={() => open({ kind: 'booking', subject: ex.name })} className="btn-xenon group mt-7 justify-center">
              Request a private viewing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
