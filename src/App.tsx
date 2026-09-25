import { MotionConfig } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Overlays } from './components/Overlays'
import { UIContext, type Overlay, type UI } from './lib/ui'
import { DesignWall } from './sections/DesignWall'
import { ExhibitHall } from './sections/ExhibitHall'
import { Heritage } from './sections/Heritage'
import { Hero } from './sections/Hero'
import { Performance } from './sections/Performance'
import { Visit } from './sections/Visit'

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null)
  const open = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), [])
  const close = useCallback(() => setOverlay(null), [])
  const ui: UI = useMemo(() => ({ overlay, open, close }), [overlay, open, close])

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-xenon focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <ExhibitHall />
          <Performance />
          <DesignWall />
          <Heritage />
          <Visit />
        </main>
        <Footer />
        <Overlays />
      </UIContext.Provider>
    </MotionConfig>
  )
}
