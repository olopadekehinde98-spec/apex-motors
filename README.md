# APEX

A virtual automotive exhibition — four machines lit and labelled like museum pieces, walked from exterior to cockpit. React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

**Live:** https://apex-motors-inky.vercel.app

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## The exhibition

`src/sections/` in scroll order: `Hero` → `ExhibitHall` → `Performance` → `DesignWall` → `Heritage` → `Visit`.

- `Hero` — the gallery is dark and the cursor is the spotlight; the car is revealed where the light falls. On touch and for reduced-motion visitors the mask cannot run, so the scrim lightens and the photograph is shown lit instead.
- `ExhibitHall` — four machines across four rooms (exterior, cockpit, powertrain, details), each transition a clip-path wipe, with a placard per room and a paint-tint preview.
- `Performance` — SVG dials and comparison bars animated from the numbers in `content.ts`.

## Structure

- `src/components/` — `Navbar`, `Img` (CDN image with a blurred placeholder), `SplitLines`, `Reveal`, `Overlays` (the booking and search dialogs), `Footer`.
- `src/data/content.ts` — machines, specs, rooms, heritage entries and all copy. Edit content here, not in sections.
- `src/hooks/` — `useSectionProgress`, `useCountUp`, `useMediaQuery` (`useImmersive()` gates the spotlight tier: a fine pointer, at least 1024px, motion allowed).
- `src/lib/` — `image.ts` (Unsplash CDN URLs + `srcset`), `ui.ts` (easing, scroll helpers, dialog state).
- Design tokens live in the `@theme` block of `src/index.css` — Tailwind v4, so there is no `tailwind.config.js`.

## Notes

`useSectionProgress` wraps `useScroll` in an identity `useTransform`, which keeps Framer from handing scroll-linked values to the browser's native ScrollTimeline where multi-stop ranges desync.

Hero lighting is keyed to `useImmersive()` rather than a breakpoint, so a touch tablet at 1024px and a reduced-motion desktop both get the lit version instead of an unlit dark frame.

The paint tints are a coloured overlay, labelled in the UI as a preview rather than a real respray. Images come from the Unsplash CDN; swap the photo ids in `content.ts` for the client's own photography before launch.
