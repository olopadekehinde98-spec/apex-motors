import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { exhibits } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { EASE } from '../lib/ui'

/** Peak values across the hall, used to scale every bar. */
const peak = {
  accel: 40,
  top: 360,
  power: 800,
  torque: 800,
}

function Dial({ value, max, label, unit, start, delay }: { value: number; max: number; label: string; unit: string; start: boolean; delay: number }) {
  const n = useCountUp(value, start, 1500)
  const shown = unit === 's ÷10' ? (n / 10).toFixed(1) : n.toLocaleString()
  const shownUnit = unit === 's ÷10' ? 's' : unit
  const pct = Math.min(n / max, 1)
  const R = 54
  const C = Math.PI * R // half circle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="card flex flex-col items-center px-4 py-6"
    >
      <svg viewBox="0 0 140 84" className="w-full max-w-[190px]" fill="none" aria-hidden>
        <path d="M16 74a54 54 0 0 1 108 0" stroke="var(--color-line)" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M16 74a54 54 0 0 1 108 0"
          stroke="var(--color-xenon)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 120ms linear', filter: 'drop-shadow(0 0 8px rgba(78,168,255,0.45))' }}
        />
      </svg>
      <p className="-mt-6 font-display text-[1.9rem] leading-none font-bold tabular-nums">
        <span aria-hidden>{shown}</span>
        <span className="sr-only">
          {unit === 's ÷10' ? (value / 10).toFixed(1) : value} {shownUnit}
        </span>
        <span className="ml-1 font-mono text-[11px] font-normal text-muted">{shownUnit}</span>
      </p>
      <p className="mt-2 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{label}</p>
    </motion.div>
  )
}

/** Performance hall: dials that fill as you arrive, and a side-by-side comparison. */
export function Performance() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const [i, setI] = useState(0)
  const ex = exhibits[i]

  const maxFor = (label: string) =>
    label.startsWith('0–100') ? peak.accel : label === 'Top speed' ? peak.top : label === 'Power' ? peak.power : peak.torque

  return (
    <section id="performance" className="relative border-t border-line bg-graphite py-20 md:py-24">
      <div className="frame">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="plate mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-xenon" />
              Performance
            </p>
            <SplitLines className="display text-[clamp(2rem,4.6vw,3.6rem)]" lines={['The numbers,', 'measured']} />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[380px] text-[14px] leading-[1.75] text-muted">
              Figures recorded on the same day, same surface and same tyres — so the comparison actually means something.
            </p>
          </Reveal>
        </div>

        {/* Machine switch */}
        <div className="no-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1">
          {exhibits.map((e, k) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setI(k)}
              aria-pressed={k === i}
              className={`shrink-0 border px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                k === i ? 'border-xenon bg-xenon/10 text-platinum' : 'border-line text-muted hover:text-platinum'
              }`}
            >
              {e.no} · {e.name}
            </button>
          ))}
        </div>

        <div ref={ref} className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ex.specs.map((s, k) => (
            <Dial key={`${ex.id}-${s.label}`} value={s.value} max={maxFor(s.label)} label={s.label} unit={s.unit} start={inView} delay={k * 0.08} />
          ))}
        </div>

        {/* Comparison bars */}
        <div className="mt-10 border-t border-line pt-8">
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-muted uppercase">Power across the hall</p>
          <ul className="mt-5 space-y-3">
            {exhibits.map((e, k) => {
              const hp = e.specs.find((s) => s.label === 'Power')?.value ?? 0
              return (
                <li key={e.id} className="flex items-center gap-4">
                  <span className={`w-[128px] shrink-0 font-mono text-[11px] tracking-[0.12em] uppercase ${k === i ? 'text-platinum' : 'text-muted'}`}>
                    {e.name}
                  </span>
                  <span className="relative h-2 flex-1 bg-steel">
                    <motion.span
                      className={`absolute inset-y-0 left-0 ${k === i ? 'bg-xenon' : 'bg-platinum/25'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(hp / peak.power) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.1 + k * 0.1, ease: EASE }}
                    />
                  </span>
                  <span className="w-[64px] shrink-0 text-right font-mono text-[11.5px] text-platinum tabular-nums">{hp} hp</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
