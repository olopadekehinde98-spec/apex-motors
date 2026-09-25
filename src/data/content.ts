export type Photo = { id: string; alt: string }

export const brand = {
  name: 'APEX',
  sub: 'AUTOMOTIVE EXHIBITION',
  tagline: 'Machines, exhibited.',
}

export const navLinks = [
  { label: 'Exhibits', href: '#exhibits' },
  { label: 'Performance', href: '#performance' },
  { label: 'Design', href: '#design' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'Visit', href: '#footer' },
]

export const hero = {
  photo: { id: '1626668893632-6f3a4466d22f', alt: 'Dark sports car lit by blue light inside a gallery space' },
  marquee: ['Hall A · Now showing', '4 machines', '1948 — present', 'Open daily 10:00 — 20:00', 'Private viewings by appointment'],
}

export type Room = { key: 'exterior' | 'cockpit' | 'powertrain' | 'detail'; label: string; caption: string; photo: Photo }

export type Exhibit = {
  id: string
  no: string
  name: string
  marque: string
  year: string
  edition: string
  statement: string
  /** Museum placard facts. */
  placard: { label: string; value: string }[]
  specs: { label: string; value: number; suffix: string; unit: string }[]
  rooms: Room[]
  paints: { name: string; hex: string; tint: string }[]
}

export const exhibits: Exhibit[] = [
  {
    id: 'tempest',
    no: '01',
    name: 'Tempest GT',
    marque: 'Apex Collection',
    year: '2021',
    edition: 'Edition of 210',
    statement: 'A mid-engined study in balance — light, precise and utterly analogue in the way it answers your right foot.',
    placard: [
      { label: 'Layout', value: 'Mid-engine · RWD' },
      { label: 'Body', value: 'Carbon monocoque' },
      { label: 'Weight', value: '1,422 kg' },
      { label: 'Gallery', value: 'Hall A · Plinth 01' },
    ],
    specs: [
      { label: '0–100 km/h', value: 29, suffix: '', unit: 's ÷10' },
      { label: 'Top speed', value: 325, suffix: '', unit: 'km/h' },
      { label: 'Power', value: 640, suffix: '', unit: 'hp' },
      { label: 'Torque', value: 600, suffix: '', unit: 'Nm' },
    ],
    rooms: [
      { key: 'exterior', label: 'Exterior', caption: 'Wedge profile, low nose, functional intakes at every surface break.', photo: { id: '1544829099-b9a0c07fad1a', alt: 'White mid-engined supercar photographed from the front three-quarter' } },
      { key: 'cockpit', label: 'Cockpit', caption: 'Driver-centred: screen canted inward, controls within a wrist’s reach.', photo: { id: '1553260188-75a8d6205b6c', alt: 'Minimal car cockpit with a central screen and flat-bottom wheel' } },
      { key: 'powertrain', label: 'Powertrain', caption: 'Assembled by hand; each unit signed by the engineer who built it.', photo: { id: '1615906655593-ad0386982a0f', alt: 'Engineer working on an engine under workshop light' } },
      { key: 'detail', label: 'Design details', caption: 'Light signature machined from a single billet, then hand-polished.', photo: { id: '1567808291548-fc3ee04dbcf0', alt: 'Close-up of a dark car body catching streaks of light' } },
    ],
    paints: [
      { name: 'Bianco Sale', hex: '#e8eaee', tint: 'rgba(232,234,238,0.16)' },
      { name: 'Xenon Blue', hex: '#4ea8ff', tint: 'rgba(78,168,255,0.22)' },
      { name: 'Ember', hex: '#ff6a3d', tint: 'rgba(255,106,61,0.2)' },
    ],
  },
  {
    id: 'vanta',
    no: '02',
    name: 'Vanta Coupé',
    marque: 'Apex Collection',
    year: '2023',
    edition: 'Edition of 88',
    statement: 'Front-engined grand tourer in satin black — built to cross a continent between breakfast and dinner.',
    placard: [
      { label: 'Layout', value: 'Front-mid · RWD' },
      { label: 'Body', value: 'Aluminium spaceframe' },
      { label: 'Weight', value: '1,620 kg' },
      { label: 'Gallery', value: 'Hall A · Plinth 02' },
    ],
    specs: [
      { label: '0–100 km/h', value: 33, suffix: '', unit: 's ÷10' },
      { label: 'Top speed', value: 318, suffix: '', unit: 'km/h' },
      { label: 'Power', value: 585, suffix: '', unit: 'hp' },
      { label: 'Torque', value: 700, suffix: '', unit: 'Nm' },
    ],
    rooms: [
      { key: 'exterior', label: 'Exterior', caption: 'Satin paint absorbs the gallery light and gives the shoulder line back.', photo: { id: '1617814076367-b759c7d7e738', alt: 'Matte black grand tourer photographed on a harbour front' } },
      { key: 'cockpit', label: 'Cockpit', caption: 'Quilted leather, machined dials, a physical key for the ignition.', photo: { id: '1610647752706-3bb12232b3ab', alt: 'Car interior with steering wheel and centre screen' } },
      { key: 'powertrain', label: 'Powertrain', caption: 'Naturally aspirated V8, dry sumped, redline at 8,200 rpm.', photo: { id: '1615906655593-ad0386982a0f', alt: 'Engineer assembling an engine at the bench' } },
      { key: 'detail', label: 'Design details', caption: 'Quad exhaust finishers, milled from solid and hand-deburred.', photo: { id: '1571607388263-1044f9ea01dd', alt: 'Supercar rear detail at night with doors raised' } },
    ],
    paints: [
      { name: 'Vanta Satin', hex: '#14161b', tint: 'rgba(10,12,16,0.35)' },
      { name: 'Gunmetal', hex: '#5c6470', tint: 'rgba(92,100,112,0.22)' },
      { name: 'Xenon Blue', hex: '#4ea8ff', tint: 'rgba(78,168,255,0.2)' },
    ],
  },
  {
    id: 'rosso',
    no: '03',
    name: 'Rosso Sessanta',
    marque: 'Apex Collection',
    year: '2019',
    edition: 'Edition of 60',
    statement: 'Sixty cars, one colour, and a flat-plane crank that turns a tunnel into an instrument.',
    placard: [
      { label: 'Layout', value: 'Mid-engine · RWD' },
      { label: 'Body', value: 'Carbon + alloy' },
      { label: 'Weight', value: '1,380 kg' },
      { label: 'Gallery', value: 'Hall B · Plinth 03' },
    ],
    specs: [
      { label: '0–100 km/h', value: 27, suffix: '', unit: 's ÷10' },
      { label: 'Top speed', value: 340, suffix: '', unit: 'km/h' },
      { label: 'Power', value: 720, suffix: '', unit: 'hp' },
      { label: 'Torque', value: 770, suffix: '', unit: 'Nm' },
    ],
    rooms: [
      { key: 'exterior', label: 'Exterior', caption: 'Every vent earns its place; nothing on this body is decoration.', photo: { id: '1614200187524-dc4b892acf16', alt: 'Red mid-engined supercar against a red industrial door' } },
      { key: 'cockpit', label: 'Cockpit', caption: 'Wheel-mounted controls so hands never leave the rim.', photo: { id: '1449965408869-eaa3f722e40d', alt: 'Driver’s hands on a steering wheel at dusk' } },
      { key: 'powertrain', label: 'Powertrain', caption: 'Twin-turbo V8 with titanium connecting rods and a flat-plane crank.', photo: { id: '1615906655593-ad0386982a0f', alt: 'Mechanic working on a performance engine' } },
      { key: 'detail', label: 'Design details', caption: 'Exposed carbon weave, laid by hand and clear-coated seven times.', photo: { id: '1583121274602-3e2820c69888', alt: 'Red hypercar detail photographed in a showroom' } },
    ],
    paints: [
      { name: 'Rosso Corsa', hex: '#d0271d', tint: 'rgba(208,39,29,0.22)' },
      { name: 'Nero', hex: '#15171c', tint: 'rgba(12,14,18,0.3)' },
      { name: 'Bianco', hex: '#e8eaee', tint: 'rgba(232,234,238,0.16)' },
    ],
  },
  {
    id: 'azzurro',
    no: '04',
    name: 'Azzurro Speciale',
    marque: 'Apex Collection',
    year: '2024',
    edition: 'Edition of 40',
    statement: 'The newest arrival: a V12 sent off with one last naturally aspirated salute before the switch.',
    placard: [
      { label: 'Layout', value: 'Mid-engine · AWD' },
      { label: 'Body', value: 'Carbon monocoque' },
      { label: 'Weight', value: '1,565 kg' },
      { label: 'Gallery', value: 'Hall B · Plinth 04' },
    ],
    specs: [
      { label: '0–100 km/h', value: 28, suffix: '', unit: 's ÷10' },
      { label: 'Top speed', value: 352, suffix: '', unit: 'km/h' },
      { label: 'Power', value: 780, suffix: '', unit: 'hp' },
      { label: 'Torque', value: 720, suffix: '', unit: 'Nm' },
    ],
    rooms: [
      { key: 'exterior', label: 'Exterior', caption: 'Scissor doors, a single crease from nose to tail, and no rear window.', photo: { id: '1621135802920-133df287f89c', alt: 'Blue V12 supercar parked in a concrete hall' } },
      { key: 'cockpit', label: 'Cockpit', caption: 'Hexagonal motifs, alcantara, and a start button under a red flap.', photo: { id: '1553260188-75a8d6205b6c', alt: 'Modern car cockpit with centre display' } },
      { key: 'powertrain', label: 'Powertrain', caption: '6.5 litres, twelve cylinders, 9,000 rpm and no turbochargers.', photo: { id: '1615906655593-ad0386982a0f', alt: 'Engine assembly under workshop lighting' } },
      { key: 'detail', label: 'Design details', caption: 'Y-motif lights, a signature you can read from a mile of motorway.', photo: { id: '1580414057403-c5f451f30e1c', alt: 'White supercar rear wing and lamp detail' } },
    ],
    paints: [
      { name: 'Azzurro', hex: '#2f7fe0', tint: 'rgba(47,127,224,0.24)' },
      { name: 'Verde', hex: '#2f8f6a', tint: 'rgba(47,143,106,0.2)' },
      { name: 'Grigio', hex: '#7b828e', tint: 'rgba(123,130,142,0.2)' },
    ],
  },
]

/** Close-up design studies shown as their own wall. */
export const designStudies = [
  { title: 'Light Signature', text: 'Machined optics, assembled dry so no adhesive line is ever visible.', photo: { id: '1567808291548-fc3ee04dbcf0', alt: 'Close-up of a car body and headlight catching light' } },
  { title: 'Wheel & Brake', text: 'Forged centre-lock rims over carbon-ceramic discs.', photo: { id: '1580414057403-c5f451f30e1c', alt: 'Supercar wheel and rear detail' } },
  { title: 'Rear Architecture', text: 'Diffuser, exhaust and lamp treated as one sculpture.', photo: { id: '1571607388263-1044f9ea01dd', alt: 'Rear of a supercar at night with raised doors' } },
  { title: 'Surface & Shadow', text: 'A single crease runs the length of the car and never breaks.', photo: { id: '1618843479313-40f8afb4b4d8', alt: 'Grey performance coupé photographed in profile' } },
]

/** Heritage hall. */
export const heritage = [
  { year: '1948', title: 'The first shed', text: 'Two engineers, one lathe and a borrowed chassis.', photo: { id: '1489824904134-891ab64532f1', alt: 'Orange classic Beetle parked on a street' } },
  { year: '1967', title: 'First win', text: 'A privateer entry takes the class win and the marque is never quiet again.', photo: { id: '1517672651691-24622a91b550', alt: 'Classic red sports car on a city street at night' } },
  { year: '1974', title: 'The grand tourer', text: 'The company learns that speed and comfort are not opposites.', photo: { id: '1593055357429-62eaf3b259cc', alt: 'Classic teal grand tourer parked by a wall' } },
  { year: '2024', title: 'The exhibition', text: 'Four machines, one hall, open to anyone who wants to look properly.', photo: { id: '1492144534655-ae79c964c9d7', alt: 'Sports cars displayed in a darkened showroom' } },
]

export const visit = {
  photo: { id: '1492144534655-ae79c964c9d7', alt: 'Cars displayed under spotlights in a dark exhibition hall' },
  facts: [
    { label: 'Hall', value: 'A & B · Ground floor' },
    { label: 'Open', value: 'Daily 10:00 — 20:00' },
    { label: 'Entry', value: 'Free · timed slots' },
    { label: 'Private viewing', value: 'By appointment' },
  ],
}

export const footerColumns = [
  { title: 'Exhibition', links: ['Exhibits', 'Performance', 'Design', 'Heritage'] },
  { title: 'Visit', links: ['Opening hours', 'Getting here', 'Accessibility', 'Group tours'] },
  { title: 'More', links: ['Press', 'Archive', 'Contact', 'Terms'] },
]
