import React, { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, MapPin, GraduationCap, Briefcase, Clock, SearchX, Video, X } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Badge, Button, EmptyState, PageHeader, Rating, Select, Skeleton, cn } from '../shared/ui'
import { doctors } from '../shared/data'

export const args = {
  state: 'default',
  query: '',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'loading'] },
  query: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const SPECIALTIES = ['All specialties', ...Array.from(new Set(doctors.map((d) => d.specialty)))]
const HOSPITALS = ['All hospitals', ...Array.from(new Set(doctors.map((d) => d.hospital)))]

export default function FindDoctors(props: Props) {
  const { state, query: q0, onNavigate } = { ...args, ...props }
  const [q, setQ] = useState(q0)
  const [spec, setSpec] = useState('All specialties')
  const [hosp, setHosp] = useState('All hospitals')
  const [date, setDate] = useState('Any date')
  const [time, setTime] = useState('Any time')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return doctors.filter((d) => {
      const hit = !s || d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s) || d.treats.some((t) => t.toLowerCase().includes(s))
      const morning = d.slots.some((x) => x.includes('AM'))
      const afternoon = d.slots.some((x) => x.includes('PM'))
      return hit && (spec === 'All specialties' || d.specialty === spec) && (hosp === 'All hospitals' || d.hospital === hosp) && (time === 'Any time' || (time === 'Morning' ? morning : afternoon)) && (date !== 'Today' || d.nextAvailable.startsWith('Today'))
    })
  }, [q, spec, hosp, date, time])

  const active = [spec !== 'All specialties' && spec, hosp !== 'All hospitals' && hosp, date !== 'Any date' && date, time !== 'Any time' && time].filter(Boolean) as string[]
  const clear = () => { setSpec('All specialties'); setHosp('All hospitals'); setDate('Any date'); setTime('Any time'); setQ('') }

  return (
    <AppShell role="patient" active="p-doctors" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Find a doctor" subtitle="Every doctor listed has a verified medical registration." />

        <div className="rounded-xl border border-line bg-white p-3 sm:p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Doctor name, specialty, or condition such as “migraine”" className="h-12 w-full rounded-lg border border-line pl-10 pr-3 text-sm focus:border-primary focus:outline-none" />
            </div>
            <Button variant="secondary" size="lg" className="lg:hidden" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} icon={<SlidersHorizontal className="size-4" />}>
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
          <div className={cn('mt-3 grid gap-2 sm:grid-cols-2 lg:grid lg:grid-cols-4', filtersOpen ? 'grid' : 'hidden')}>
            <Select aria-label="Specialization" value={spec} onChange={(e) => setSpec(e.target.value)}>{SPECIALTIES.map((s) => <option key={s}>{s}</option>)}</Select>
            <Select aria-label="Hospital" value={hosp} onChange={(e) => setHosp(e.target.value)}>{HOSPITALS.map((s) => <option key={s}>{s}</option>)}</Select>
            <Select aria-label="Available date" value={date} onChange={(e) => setDate(e.target.value)}>{['Any date', 'Today', 'Tomorrow', 'This week'].map((s) => <option key={s}>{s}</option>)}</Select>
            <Select aria-label="Consultation time" value={time} onChange={(e) => setTime(e.target.value)}>{['Any time', 'Morning', 'Afternoon'].map((s) => <option key={s}>{s}</option>)}</Select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">{state === 'loading' ? 'Searching…' : `${list.length} doctor${list.length === 1 ? '' : 's'} found`}</span>
          {active.map((a) => <Badge key={a} tone="blue">{a}</Badge>)}
          {(active.length > 0 || q) && <button onClick={clear} className="inline-flex items-center gap-1 font-medium text-primary"><X className="size-3.5" /> Clear all</button>}
        </div>

        {state === 'loading' ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-xl" />)}</div>
        ) : list.length === 0 ? (
          <div className="mt-4 rounded-xl border border-line bg-white">
            <EmptyState icon={<SearchX className="size-5" />} title="No doctors match your search" body="Try a broader condition, another hospital, or any date. You can also ask SmartCare AI which specialist fits your symptoms." action={<div className="flex gap-2"><Button variant="secondary" onClick={clear}>Clear filters</Button><Button onClick={() => onNavigate?.('p-ai')}>Ask SmartCare AI</Button></div>} />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {list.map((d) => (
              <article key={d.id} className="grid grid-rows-[auto_1fr_auto] rounded-xl border border-line bg-white p-5">
                <div className="flex gap-4">
                  <Avatar src={d.photo} initials={d.initials} size={72} className="rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-ink">{d.name}</h2>
                        <p className="text-sm font-medium text-primary">{d.specialty}</p>
                      </div>
                      <Rating value={d.rating} count={d.reviews} />
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      <li className="flex items-center gap-2"><GraduationCap className="size-4 shrink-0" /> <span className="truncate">{d.qualifications}</span></li>
                      <li className="flex items-center gap-2"><Briefcase className="size-4 shrink-0" /> {d.experience} years experience</li>
                      <li className="flex items-center gap-2"><MapPin className="size-4 shrink-0" /> <span className="truncate">{d.hospital}</span></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 border-t border-line pt-4">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {d.days} · {d.hours}</span>
                    {d.mode.includes('video') && <span className="flex items-center gap-1"><Video className="size-3.5" /> Video</span>}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.slots.slice(0, 4).map((s) => <span key={s} className="rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">{s}</span>)}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm"><span className="font-semibold text-ink">${d.fee}</span> <span className="text-muted">consultation</span></p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => onNavigate?.('p-doctor-profile')}>View Profile</Button>
                    <Button size="sm" onClick={() => onNavigate?.('p-booking')}>Book Appointment</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
