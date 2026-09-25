import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { heritage } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE } from '../lib/ui'

/** Heritage hall: a line down the room with four moments on it. */
export function Heritage() {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end start'])
  const line = useTransform(p, [0.1, 0.85], [0, 1])

  return (
    <section id="heritage" ref={ref} className="relative border-t border-line bg-graphite py-20 md:py-24">
      <div className="frame">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="plate mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-xenon" />
              Heritage hall
            </p>
            <SplitLines className="display text-[clamp(2rem,4.6vw,3.6rem)]" lines={['Seventy-six years', 'of trying again']} />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[380px] text-[14px] leading-[1.75] text-muted">
              From a rented shed to an exhibition hall — the four moments that decided what the marque became.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12">
          {/* The line down the hall */}
          <div className="absolute inset-x-0 top-[96px] hidden h-px bg-line lg:block">
            <motion.div className="h-px origin-left bg-xenon" style={motionOK ? { scaleX: line } : { scaleX: 1 }} />
          </div>

          <ol className="no-scrollbar flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {heritage.map((h, i) => (
              <motion.li
                key={h.year}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="w-[72vw] shrink-0 sm:w-[44vw] lg:w-auto"
              >
                <div className="group">
                  <p className="font-display text-[1.6rem] font-bold text-platinum">{h.year}</p>
                  <span className="relative mt-4 mb-5 block h-2.5 w-2.5 rounded-full border border-xenon bg-night lg:mt-[14px]">
                    <span className="absolute inset-[3px] rounded-full bg-xenon" style={{ animation: 'pulse-dot 2.6s ease-in-out infinite' }} />
                  </span>
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-night">
                    <Img
                      photo={h.photo}
                      sizes="(min-width: 1024px) 22vw, 72vw"
                      widths={[400, 700, 1000]}
                      className="opacity-85 transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-[1.05rem] font-bold uppercase">{h.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{h.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
