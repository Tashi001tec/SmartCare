import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigation, Phone, Clock, Car, Bus, Footprints, X, Siren, Search, List } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Badge, Button, Rating, cn } from '../shared/ui'
import { MapView } from '../shared/widgets'
import { hospitals } from '../shared/data'

export const args = {
  selected: 'stmarys',
  emergencyOnly: false,
}

export const argTypes = {
  selected: { control: 'select', options: ['stmarys', 'riverside', 'lakeside', 'northgate'] },
  emergencyOnly: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function HospitalMap(props: Props) {
  const { selected, emergencyOnly, onNavigate } = { ...args, ...props }
  const [sel, setSel] = useState<string | null>(selected)
  const [er, setEr] = useState(emergencyOnly)
  const [mode, setMode] = useState('car')
  const items = hospitals.filter((h) => !er || h.er24)
  const h = items.find((x) => x.id === sel)
  const eta: Record<string, string> = { car: '8 min', bus: '19 min', walk: '31 min' }

  return (
    <AppShell role="patient" active="p-hospitals" onNavigate={onNavigate}>
      <div className="relative -mx-4 -mt-6 h-[calc(100vh-4rem)] sm:-mx-6 lg:-mx-8">
        <MapView items={items} selected={sel ?? undefined} onSelect={setSel} className="h-full rounded-none border-0" />

        <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2 sm:right-auto">
          <div className="relative min-w-0 flex-1 sm:w-80 sm:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search hospitals on map" className="h-11 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm shadow-sm focus:border-primary focus:outline-none" />
          </div>
          <button onClick={() => setEr(!er)} aria-pressed={er} className={cn('inline-flex h-11 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium shadow-sm transition-colors duration-150', er ? 'border-danger bg-danger text-white' : 'border-line bg-white text-ink')}>
            <Siren className="size-4" /> Emergency only
          </button>
          <Button variant="secondary" className="h-11 shadow-sm" icon={<List className="size-4" />} onClick={() => onNavigate?.('p-hospitals')}>List</Button>
        </div>

        <AnimatePresence>
          {h && (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-4 bottom-20 rounded-xl border border-line bg-white p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:w-96 md:bottom-6"
            >
              <button onClick={() => setSel(null)} aria-label="Close" className="absolute right-3 top-3 rounded-md p-1 text-muted hover:bg-canvas"><X className="size-4" /></button>
              <div className="flex gap-3 pr-6">
                <img src={h.image} alt="" className="size-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{h.name}</p>
                  <p className="text-xs text-muted">{h.address}</p>
                  <div className="mt-1 flex items-center gap-2"><Rating value={h.rating} />{h.er24 && <Badge tone="red">24/7 ER</Badge>}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {[['car', Car], ['bus', Bus], ['walk', Footprints]].map(([k, Icon]) => {
                  const I = Icon as React.ElementType
                  return (
                    <button key={k as string} onClick={() => setMode(k as string)} className={cn('flex flex-col items-center rounded-lg border py-2 text-xs transition-colors duration-150', mode === k ? 'border-primary bg-primary-soft text-primary' : 'border-line text-muted')}>
                      <I className="size-4" /> <span className="mt-0.5 font-semibold">{eta[k as string]}</span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Clock className="size-3.5" /> {h.hours} · {h.distance}</p>
              <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2">
                <Button icon={<Navigation className="size-4" />}>Start directions</Button>
                <Button variant="secondary" aria-label="Call" icon={<Phone className="size-4" />} />
                <Button variant="secondary" onClick={() => onNavigate?.('p-hospital-profile')}>Details</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}
