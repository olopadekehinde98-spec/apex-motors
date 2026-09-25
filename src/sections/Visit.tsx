import { motion, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { visit } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, useUI } from '../lib/ui'

/** Closing invitation: come and see them in person. */
export function Visit() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end end'])
  const scale = useTransform(p, [0, 1], [1.16, 1])
  const dark = useTransform(p, [0.1, 0.9], [0.75, 0.42])

  return (
    <section ref={ref} className="relative isolate flex min-h-[600px] items-center overflow-hidden border-t border-line bg-night py-20 md:py-24">
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { scale } : undefined}>
        <Img photo={visit.photo} widths={[828, 1280, 1600]} />
      </motion.div>
      <motion.div className="absolute inset-0 -z-10 bg-night" style={motionOK ? { opacity: dark } : { opacity: 0.6 }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/60 to-transparent" />

      <div className="frame relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="plate mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-xenon" />
            Visit the exhibition
          </p>
          <SplitLines className="display text-[clamp(2.2rem,5.4vw,4.4rem)]" lines={['Stand next', 'to them.']} />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[450px] text-[15px] leading-[1.75] text-platinum/80">
              Photographs only go so far. The hall is open daily, entry is free, and private viewings can be arranged before opening — with the
              engineer who built the car in the room.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => open({ kind: 'booking' })} className="btn-xenon group">
                Book a private viewing
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
              </button>
              <a href="#exhibits" className="btn-outline">
                Back to the exhibits
              </a>
            </div>
          </Reveal>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="card divide-y divide-line p-6"
        >
          {visit.facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <dt className="font-mono text-[10.5px] tracking-[0.18em] text-muted uppercase">{f.label}</dt>
              <dd className="text-right font-mono text-[12px] text-platinum">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
