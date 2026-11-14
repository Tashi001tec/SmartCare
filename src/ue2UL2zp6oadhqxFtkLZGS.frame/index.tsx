import React, { useMemo, useState } from 'react'
import { Search, MapPin, Clock, Phone, Navigation, Map, Stethoscope, Building2 } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Badge, Button, EmptyState, PageHeader, Rating, Select, cn } from '../shared/ui'
import { MapView } from '../shared/widgets'
import { hospitals } from '../shared/data'

export const args = {
  query: '',
}

export const argTypes = {
  query: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const DEPTS = ['All departments', ...Array.from(new Set(hospitals.flatMap((h) => h.departments))).sort()]

export default function FindHospitals(props: Props) {
  const { query, onNavigate } = { ...args, ...props }
  const [q, setQ] = useState(query)
  const [loc, setLoc] = useState('')
  const [dept, setDept] = useState('All departments')
  const [er, setEr] = useState(false)
  const [sel, setSel] = useState('stmarys')

  const list = useMemo(
    () =>
      hospitals.filter(
        (h) =>
          (!q || h.name.toLowerCase().includes(q.toLowerCase())) &&
          (!loc || (h.area + h.address).toLowerCase().includes(loc.toLowerCase())) &&
          (dept === 'All departments' || h.departments.includes(dept)) &&
          (!er || h.er24),
      ),
    [q, loc, dept, er],
  )

  return (
    <AppShell role="patient" active="p-hospitals" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Find a hospital" subtitle="Partner hospitals near 42 Willow Lane, Riverside" actions={<Button variant="secondary" icon={<Map className="size-4" />} onClick={() => onNavigate?.('p-hospital-map')}>Full map view</Button>} />

        <div className="grid gap-2 rounded-xl border border-line bg-white p-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hospital name" className="h-11 w-full rounded-lg border border-line pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Area or ZIP code" className="h-11 w-full rounded-lg border border-line pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          <Select aria-label="Department" value={dept} onChange={(e) => setDept(e.target.value)}>{DEPTS.map((d) => <option key={d}>{d}</option>)}</Select>
          <label className="flex h-11 items-center gap-2 whitespace-nowrap rounded-lg border border-line px-3 text-sm text-ink">
            <input type="checkbox" checked={er} onChange={(e) => setEr(e.target.checked)} className="size-4 accent-primary" /> 24/7 emergency
          </label>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 space-y-3 lg:order-1">
            <p className="text-sm text-muted">{list.length} hospitals</p>
            {list.length === 0 && (
              <div className="rounded-xl border border-line bg-white"><EmptyState icon={<Building2 className="size-5" />} title="No hospitals match" body="Try a different department or clear the location filter." action={<Button variant="secondary" onClick={() => { setQ(''); setLoc(''); setDept('All departments'); setEr(false) }}>Clear filters</Button>} /></div>
            )}
            {list.map((h) => (
              <article key={h.id} onMouseEnter={() => setSel(h.id)} className={cn('flex flex-col gap-4 rounded-xl border bg-white p-4 transition-[border-color] duration-150 sm:flex-row', sel === h.id ? 'border-primary' : 'border-line')}>
                <img src={h.image} alt={h.name} className="aspect-video w-full rounded-lg object-cover sm:aspect-square sm:w-28" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-ink">{h.name}</h2>
                    <span className="shrink-0 text-sm font-medium text-muted">{h.distance}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{h.address}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <Rating value={h.rating} />
                    <span className="flex items-center gap-1"><Clock className="size-3.5" /> {h.hours}</span>
                    <span className="flex items-center gap-1"><Stethoscope className="size-3.5" /> {h.doctors} doctors</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {h.er24 && <Badge tone="red">24/7 Emergency</Badge>}
                    {h.departments.slice(0, 3).map((d) => <Badge key={d}>{d}</Badge>)}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => onNavigate?.('p-hospital-profile')}>View details</Button>
                    <Button size="sm" variant="secondary" icon={<Navigation className="size-3.5" />} onClick={() => onNavigate?.('p-hospital-map')}>Directions</Button>
                    <Button size="sm" variant="ghost" icon={<Phone className="size-3.5" />}>Call</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <MapView items={list} selected={sel} onSelect={setSel} className="h-72 lg:sticky lg:top-0 lg:h-[calc(100vh-14rem)]" />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
