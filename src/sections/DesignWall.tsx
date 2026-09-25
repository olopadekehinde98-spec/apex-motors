import { motion } from 'framer-motion'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { designStudies } from '../data/content'
import { EASE } from '../lib/ui'

/** Design wall: four close studies, the things you only see up close. */
export function DesignWall() {
  return (
    <section id="design" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="plate mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-xenon" />
              Design studies
            </p>
            <SplitLines className="display text-[clamp(2rem,4.6vw,3.6rem)]" lines={['Look closer']} />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[400px] text-[14px] leading-[1.75] text-muted">
              Surfaces, joints and light signatures — photographed at the distance a designer works at, not the distance a brochure uses.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {designStudies.map((d, i) => (
            <motion.li
              key={d.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <figure className="group relative aspect-[4/5] overflow-hidden border border-line bg-graphite">
                <Img
                  photo={d.photo}
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
                  widths={[400, 700, 1000]}
                  className="transition-transform duration-[1600ms] ease-cine group-hover:scale-[1.14]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
                {/* Light sweeps the surface on hover */}
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-platinum/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:sweep_1.1s_ease-out]" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-mono text-[10.5px] tracking-[0.2em] text-xenon">0{i + 1}</span>
                  <span className="mt-1.5 block font-display text-[1.1rem] font-bold uppercase">{d.title}</span>
                  <span className="mt-2 block max-h-0 overflow-hidden text-[12.5px] leading-relaxed text-platinum/70 transition-all duration-500 group-hover:max-h-24">
                    {d.text}
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
