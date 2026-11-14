import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCircle2, CalendarPlus, MapPin, Clock, Video, Building, Loader2, ShieldCheck } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, BackLink, Button, Field, Panel, Select, Textarea, cn } from '../shared/ui'
import { MonthCalendar } from '../shared/widgets'
import { doctors } from '../shared/data'

export const args = {
  state: 'booking',
  doctor: 'kwame',
}

export const argTypes = {
  state: { control: 'radio', options: ['booking', 'no-slots', 'confirmed'] },
  doctor: { control: 'select', options: ['kwame', 'priya', 'elena', 'james', 'aisha', 'marcus'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function AppointmentBooking(props: Props) {
  const { state, doctor, onNavigate } = { ...args, ...props }
  const [docId, setDocId] = useState(doctor)
  const d = doctors.find((x) => x.id === docId) ?? doctors[0]
  const [day, setDay] = useState(state === 'no-slots' ? 21 : 17)
  const [slot, setSlot] = useState<string | null>(state === 'confirmed' ? '09:30 AM' : null)
  const [visit, setVisit] = useState('in-person')
  const [reason, setReason] = useState('Blood pressure review — morning readings around 140/88')
  const [confirmed, setConfirmed] = useState(state === 'confirmed')
  const [loading, setLoading] = useState(false)
  const noSlots = day === 21 || day === 22 || day === 28 || day === 29
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(day - 1) % 7]

  if (confirmed) {
    return (
      <AppShell role="patient" active="p-appointments" onNavigate={onNavigate}>
        <div className="mx-auto max-w-xl py-6">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
            <Panel className="p-6 text-center sm:p-8">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-success-soft text-success"><CheckCircle2 className="size-7" /></span>
              <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Appointment requested</h1>
              <p className="mt-2 text-sm text-muted">{d.name} will confirm shortly. We’ll notify you as soon as it’s confirmed.</p>
              <dl className="mt-6 divide-y divide-line rounded-xl border border-line text-left text-sm">
                <div className="flex items-center gap-3 p-4"><Avatar src={d.photo} initials={d.initials} size={40} /><div><dd className="font-semibold text-ink">{d.name}</dd><dt className="text-muted">{d.specialty}</dt></div></div>
                <div className="flex gap-3 p-4"><Clock className="size-4 text-muted" /><dd className="text-ink">{dayName}, {day} June 2025 · {slot}</dd></div>
                <div className="flex gap-3 p-4"><MapPin className="size-4 text-muted" /><dd className="text-ink">{d.hospital}</dd></div>
                <div className="flex justify-between p-4"><dt className="text-muted">Reference</dt><dd className="font-semibold text-ink">AP-55204</dd></div>
              </dl>
              <p className="mt-4 text-xs text-muted">Free cancellation or rescheduling up to 24 hours before your visit.</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <Button variant="secondary" icon={<CalendarPlus className="size-4" />}>Add to calendar</Button>
                <Button onClick={() => onNavigate?.('p-appointments')}>View my appointments</Button>
              </div>
            </Panel>
          </motion.div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell role="patient" active="p-appointments" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <BackLink label="Back" onClick={() => onNavigate?.('p-doctor-profile')} />
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Book an appointment</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-6">
            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">1. Doctor and hospital</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Doctor">
                  <Select value={docId} onChange={(e) => { setDocId(e.target.value); setSlot(null) }}>{doctors.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.specialty}</option>)}</Select>
                </Field>
                <Field label="Hospital"><Select value={d.hospital} disabled><option>{d.hospital}</option></Select></Field>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-sm">
                {[['in-person', 'In person', Building], ['video', 'Video call', Video]].map(([k, l, Icon]) => {
                  const I = Icon as React.ElementType
                  const off = k === 'video' && !d.mode.includes('video')
                  return (
                    <button key={k as string} disabled={off} onClick={() => setVisit(k as string)} className={cn('flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors duration-150 disabled:opacity-40', visit === k ? 'border-primary bg-primary-soft text-primary' : 'border-line text-muted')}>
                      <I className="size-4" /> {l as string}
                    </button>
                  )
                })}
              </div>
            </Panel>

            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">2. Date and time</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-[1fr_220px]">
                <div>
                  <p className="mb-1 text-sm font-medium text-ink">June 2025</p>
                  <MonthCalendar selected={day} onSelect={(n) => { setDay(n); setSlot(null) }} compact marks={{ 17: 'blue', 18: 'blue', 19: 'blue', 20: 'blue', 23: 'blue', 24: 'blue' }} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-ink">{dayName}, {day} June</p>
                  {noSlots ? (
                    <div className="rounded-lg bg-canvas p-4 text-sm text-muted">
                      <p className="font-medium text-ink">No available appointments</p>
                      <p className="mt-1">{d.name} doesn’t consult on this day.</p>
                      <button onClick={() => setDay(23)} className="mt-2 font-medium text-primary">Next available: Mon 23 Jun</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1.5">
                      {d.slots.map((s, i) => (
                        <button key={s} disabled={i === 1} onClick={() => setSlot(s)} className={cn('h-10 rounded-lg border text-sm font-medium transition-colors duration-150', slot === s ? 'border-primary bg-primary text-white' : i === 1 ? 'border-line bg-canvas text-slate-300 line-through' : 'border-line text-ink hover:border-primary')}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">3. Reason for visit</h2>
              <Field label="What would you like to discuss?" className="mt-4" hint="Shared only with your doctor.">
                <Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
              </Field>
              <label className="mt-4 flex items-start gap-2.5 text-sm text-muted">
                <input type="checkbox" defaultChecked className="mt-0.5 size-4 accent-primary" /> Share my current medicines and recent prescriptions with {d.name} for this visit
              </label>
            </Panel>
          </div>

          <aside className="lg:sticky lg:top-0 lg:self-start">
            <Panel className="p-5">
              <h2 className="text-base font-semibold text-ink">Summary</h2>
              <div className="mt-4 flex items-center gap-3">
                <Avatar src={d.photo} initials={d.initials} size={44} />
                <div className="min-w-0"><p className="truncate font-semibold text-ink">{d.name}</p><p className="text-sm text-muted">{d.specialty}</p></div>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-muted">Date</dt><dd className="text-right font-medium text-ink">{dayName}, {day} Jun</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Time</dt><dd className="font-medium text-ink">{slot ?? '—'}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Type</dt><dd className="font-medium text-ink">{visit === 'video' ? 'Video call' : 'In person'}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Consultation fee</dt><dd className="font-medium text-ink">${d.fee}</dd></div>
              </dl>
              <Alert tone="info" className="mt-5">Pay at the hospital. Cancel free up to 24 hours before.</Alert>
              <Button size="lg" className="mt-5 w-full" disabled={!slot || noSlots || loading} onClick={() => { setLoading(true); setTimeout(() => setConfirmed(true), 700) }}>
                {loading ? <><Loader2 className="size-4 animate-spin" /> Booking…</> : <><Check className="size-4" /> Confirm booking</>}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted"><ShieldCheck className="size-3.5 text-success" /> Only {d.name.split(' ').slice(0, 3).join(' ')} sees your reason</p>
            </Panel>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}
