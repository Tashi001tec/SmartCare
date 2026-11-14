import React, { useState } from 'react'
import { BadgeCheck, MapPin, Briefcase, GraduationCap, CalendarDays, Clock, Video, Phone, MessageSquare, ThumbsUp } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, BackLink, Badge, Button, Panel, Rating, Tabs, cn } from '../shared/ui'
import { doctors, hospitals } from '../shared/data'

export const args = {
  doctor: 'kwame',
  noSlots: false,
}

export const argTypes = {
  doctor: { control: 'select', options: ['kwame', 'priya', 'elena', 'james', 'aisha', 'marcus'] },
  noSlots: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const DATES = [
  { d: 'Tue', n: 17 }, { d: 'Wed', n: 18 }, { d: 'Thu', n: 19 }, { d: 'Fri', n: 20 }, { d: 'Mon', n: 23 }, { d: 'Tue', n: 24 },
]

const REVIEWS = [
  { name: 'Grace O.', rating: 5, date: 'May 2025', text: 'Explained my ECG results clearly and never rushed me. The follow-up messages were really reassuring.' },
  { name: 'Robert H.', rating: 5, date: 'April 2025', text: 'Calm and thorough before my angioplasty. Booking through SmartCare was simple.' },
  { name: 'Anonymous', rating: 4, date: 'March 2025', text: 'Very knowledgeable. Waited about 20 minutes past my slot, but the consultation was worth it.' },
]

export default function DoctorProfile(props: Props) {
  const { doctor, noSlots, onNavigate } = { ...args, ...props }
  const d = doctors.find((x) => x.id === doctor) ?? doctors[0]
  const h = hospitals.find((x) => x.name === d.hospital) ?? hospitals[0]
  const [tab, setTab] = useState('about')
  const [date, setDate] = useState(17)
  const [slot, setSlot] = useState<string | null>(null)

  return (
    <AppShell role="patient" active="p-doctors" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <BackLink label="Back to doctors" onClick={() => onNavigate?.('p-doctors')} />
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-6">
            <Panel className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row">
                <Avatar src={d.photo} initials={d.initials} size={112} className="rounded-2xl" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-ink">{d.name}</h1>
                    <Badge tone="green"><BadgeCheck className="size-3.5" /> Verified</Badge>
                  </div>
                  <p className="mt-1 font-medium text-primary">{d.specialty}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                    <Rating value={d.rating} count={d.reviews} />
                    <span className="flex items-center gap-1.5"><Briefcase className="size-4" /> {d.experience} years</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {d.hospital}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" icon={<MessageSquare className="size-4" />} onClick={() => onNavigate?.('p-messages')}>Message</Button>
                    <Button variant="secondary" size="sm" icon={<Phone className="size-4" />}>Call clinic</Button>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel>
              <Tabs className="px-4" value={tab} onChange={setTab} items={[{ value: 'about', label: 'About' }, { value: 'hospital', label: 'Hospital' }, { value: 'reviews', label: 'Reviews', count: d.reviews }]} />
              <div className="p-5 sm:p-6">
                {tab === 'about' && (
                  <div className="space-y-6">
                    <p className="text-sm leading-relaxed text-slate-600">{d.name.replace('Dr. ', 'Dr. ')} is a {d.specialty.toLowerCase()} at {d.hospital} with {d.experience} years of clinical experience, focused on long-term management and prevention so patients can stay well at home between visits.</p>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Qualifications</h3>
                      <p className="mt-1.5 flex items-center gap-2 text-sm text-muted"><GraduationCap className="size-4" /> {d.qualifications}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Diseases and conditions treated</h3>
                      <div className="mt-2 flex flex-wrap gap-2">{d.treats.map((t) => <Badge key={t} tone="blue">{t}</Badge>)}</div>
                    </div>
                    <dl className="grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
                      <div><dt className="text-xs text-muted">Working days</dt><dd className="mt-1 text-sm font-medium text-ink">{d.days}</dd></div>
                      <div><dt className="text-xs text-muted">Consultation hours</dt><dd className="mt-1 text-sm font-medium text-ink">{d.hours}</dd></div>
                      <div><dt className="text-xs text-muted">Consultation</dt><dd className="mt-1 text-sm font-medium text-ink">${d.fee} · 30 min · {d.mode}</dd></div>
                    </dl>
                  </div>
                )}
                {tab === 'hospital' && (
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <img src={h.image} alt={h.name} className="aspect-video w-full rounded-lg object-cover sm:w-56" />
                    <div>
                      <p className="font-semibold text-ink">{h.name}</p>
                      <p className="mt-1 text-sm text-muted">{h.address}</p>
                      <p className="mt-1 text-sm text-muted">{h.phone} · {h.hours}</p>
                      <Button variant="soft" size="sm" className="mt-4" onClick={() => onNavigate?.('p-hospital-profile')}>View hospital</Button>
                    </div>
                  </div>
                )}
                {tab === 'reviews' && (
                  <div>
                    <div className="flex items-center gap-4 border-b border-line pb-5">
                      <p className="text-4xl font-semibold text-ink">{d.rating.toFixed(1)}</p>
                      <div>
                        <Rating value={d.rating} />
                        <p className="text-sm text-muted">Based on {d.reviews} verified visits</p>
                      </div>
                    </div>
                    <ul className="divide-y divide-line">
                      {REVIEWS.map((r) => (
                        <li key={r.name + r.date} className="py-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-ink">{r.name}</p>
                            <span className="text-xs text-muted">{r.date}</span>
                          </div>
                          <div className="mt-1"><Rating value={r.rating} /></div>
                          <p className="mt-2 text-sm text-slate-600">{r.text}</p>
                          <button className="mt-2 inline-flex items-center gap-1 text-xs text-muted hover:text-ink"><ThumbsUp className="size-3.5" /> Helpful</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Panel>
          </div>

          <aside className="lg:sticky lg:top-0 lg:self-start">
            <Panel className="p-5">
              <h2 className="text-base font-semibold text-ink">Book an appointment</h2>
              <p className="mt-0.5 text-sm text-muted">Next available: {d.nextAvailable}</p>
              <h3 className="mt-5 flex items-center gap-2 text-sm font-medium text-ink"><CalendarDays className="size-4 text-muted" /> June 2025</h3>
              <div className="mt-2 grid grid-cols-6 gap-1.5">
                {DATES.map((x) => (
                  <button key={x.n} onClick={() => { setDate(x.n); setSlot(null) }} className={cn('flex flex-col items-center rounded-lg border py-2 text-xs transition-colors duration-150', date === x.n ? 'border-primary bg-primary text-white' : 'border-line text-muted hover:border-primary')}>
                    {x.d}<span className={cn('text-base font-semibold', date === x.n ? 'text-white' : 'text-ink')}>{x.n}</span>
                  </button>
                ))}
              </div>
              <h3 className="mt-5 flex items-center gap-2 text-sm font-medium text-ink"><Clock className="size-4 text-muted" /> Available times</h3>
              {noSlots ? (
                <div className="mt-2 rounded-lg bg-canvas p-4 text-center text-sm text-muted">
                  No open slots on {date} June.
                  <button onClick={() => setDate(20)} className="mt-1 block w-full font-medium text-primary">Jump to next available</button>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {d.slots.map((s, i) => {
                    const booked = i === 1
                    return (
                      <button key={s} disabled={booked} onClick={() => setSlot(s)} className={cn('h-10 rounded-lg border text-sm font-medium transition-colors duration-150', slot === s ? 'border-primary bg-primary text-white' : booked ? 'border-line bg-canvas text-slate-300 line-through' : 'border-line text-ink hover:border-primary')}>
                        {s}
                      </button>
                    )
                  })}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2 text-xs text-muted"><Video className="size-3.5" /> {d.mode}</div>
              <Button size="lg" className="mt-5 w-full" disabled={!slot || noSlots} onClick={() => onNavigate?.('p-booking')}>
                {slot ? `Continue · ${date} Jun, ${slot}` : 'Select a time'}
              </Button>
            </Panel>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}
