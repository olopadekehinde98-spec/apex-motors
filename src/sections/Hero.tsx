import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { exhibits, hero } from '../data/content'
import { useImmersive, useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, goTo, useUI } from '../lib/ui'

/**
 * The entrance: the machine sits in the dark and your cursor is the gallery
 * spotlight. Move it and the car is revealed where the light falls.
 */
export function Hero() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const immersive = useImmersive()
  const p = useSectionProgress(ref, ['start start', 'end start'])

  const bgScale = useTransform(p, [0, 1], [1, 1.14])
  const fade = useTransform(p, [0, 0.7], [1, 0])

  // Spotlight position, in percentages of the section.
  const lx = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 })
  const ly = useSpring(useMotionValue(52), { stiffness: 60, damping: 20 })
  const mask = useTransform([lx, ly], ([x, y]: number[]) =>
    `radial-gradient(38vmax 38vmax at ${x}% ${y}%, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 100%)`,
  )

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!immersive) return
    const r = ref.current!.getBoundingClientRect()
    lx.set(((e.clientX - r.left) / r.width) * 100)
    ly.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-night h-[100svh]"
    >
      {/* The machine */}
      <motion.div className="absolute inset-0 -z-30" style={motionOK ? { scale: bgScale } : undefined}>
        <Img photo={hero.photo} priority widths={[828, 1280, 1600]} className={immersive ? 'opacity-95' : 'brightness-125 opacity-100'} />
      </motion.div>

      {/* Gallery darkness, lifted only where the light falls */}
      {immersive ? (
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-20 bg-night"
          style={{ WebkitMaskImage: mask as never, maskImage: mask as never }}
        />
      ) : (
        <div aria-hidden className="absolute inset-0 -z-20 bg-night/12" />
      )}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-t from-night ${immersive ? 'via-night/45 to-night/70' : 'via-night/22 to-night/40'}`} />
      <div className={`absolute inset-0 -z-10 bg-gradient-to-r to-transparent ${immersive ? 'from-night/95 via-night/35' : 'from-night/75 via-night/15'}`} />
      <div className="floor absolute inset-x-0 bottom-0 -z-10 h-[38%] opacity-50" />

      <motion.div className="frame relative flex-1 pt-32 pb-8" style={motionOK ? { opacity: fade } : undefined}>
        <div className="flex h-full max-w-[720px] flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="plate mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-xenon" />
            Hall A · Now showing
          </motion.p>

          <SplitLines
            as="h1"
            play
            delay={0.12}
            stagger={0.11}
            className="display text-[clamp(2.6rem,8vw,7rem)]"
            lines={['The machine,', <span className="text-xenon">exhibited.</span>]}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-[470px] text-[15px] leading-[1.7] text-platinum/75"
          >
            Four machines, lit and labelled like museum pieces. Walk each exhibit from exterior to cockpit, powertrain and the details most
            people never get close enough to see.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button type="button" onClick={() => goTo('exhibits')} className="btn-xenon group">
              Enter the exhibition
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
            </button>
            <button type="button" onClick={() => open({ kind: 'booking' })} className="btn-outline">
              Plan your visit
            </button>
          </motion.div>

          {immersive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-8 font-mono text-[10.5px] tracking-[0.22em] text-muted uppercase"
            >
              Move your cursor — the light follows
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Exhibit ticker */}
      <div className="relative border-t border-line bg-night/80 backdrop-blur-sm">
        <div className="frame flex items-center justify-between gap-6 py-4">
          <ul className="no-scrollbar flex items-center gap-6 overflow-x-auto">
            {exhibits.map((e) => (
              <li key={e.id} className="shrink-0">
                <a href="#exhibits" className="group flex items-center gap-2.5 py-2.5">
                  <span className="font-mono text-[10.5px] tracking-[0.2em] text-xenon">{e.no}</span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-platinum/80 uppercase transition-colors group-hover:text-platinum">
                    {e.name}
                  </span>
                  <span className="hidden font-mono text-[10.5px] text-muted sm:inline">{e.year}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => goTo('exhibits')}
            aria-label="Scroll to the exhibits"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-platinum transition-colors hover:border-xenon hover:text-xenon"
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  )
}
