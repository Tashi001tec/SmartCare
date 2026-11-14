import React, { useState } from 'react'
import { Plus, Trash2, CalendarOff, Copy, AlertTriangle } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Button, Field, Input, Modal, PageHeader, Panel, Select, Textarea, Toggle, cn } from '../shared/ui'

export const args = {
  slotLength: '30',
}

export const argTypes = {
  slotLength: { control: 'radio', options: ['15', '20', '30', '45'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

type Range = { from: string; to: string }
const INIT: { day: string; on: boolean; ranges: Range[] }[] = [
  { day: 'Monday', on: true, ranges: [{ from: '09:00', to: '12:00' }, { from: '13:00', to: '16:00' }] },
  { day: 'Tuesday', on: true, ranges: [{ from: '09:00', to: '12:00' }, { from: '13:00', to: '16:00' }] },
  { day: 'Wednesday', on: true, ranges: [{ from: '09:00', to: '12:00' }] },
  { day: 'Thursday', on: true, ranges: [{ from: '09:00', to: '12:00' }, { from: '13:00', to: '16:00' }] },
  { day: 'Friday', on: true, ranges: [{ from: '09:00', to: '13:00' }] },
  { day: 'Saturday', on: false, ranges: [] },
  { day: 'Sunday', on: false, ranges: [] },
]

export default function AvailabilityManagement(props: Props) {
  const { slotLength, onNavigate } = { ...args, ...props }
  const [week, setWeek] = useState(INIT)
  const [slot, setSlot] = useState(slotLength)
  const [blocked, setBlocked] = useState([
    { id: 1, date: 'Wed 18 Jun 2025', reason: 'Cardiology conference', booked: 0 },
    { id: 2, date: 'Mon 7 – Fri 11 Jul 2025', reason: 'Annual leave', booked: 0 },
  ])
  const [adding, setAdding] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const update = (i: number, fn: (d: (typeof INIT)[number]) => (typeof INIT)[number]) => { setSaved(false); setWeek((w) => w.map((d, j) => (j === i ? fn(d) : d))) }

  return (
    <AppShell role="doctor" active="d-availability" onNavigate={onNavigate}>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Availability" subtitle="Patients can only book inside the hours you set here" actions={<><Button variant="secondary" onClick={() => onNavigate?.('d-calendar')}>View calendar</Button><Button onClick={() => setSaved(true)}>Save schedule</Button></>} />
        {saved && <Alert tone="success" className="mb-6" title="Schedule saved">Existing bookings are unaffected. New hours are bookable immediately.</Alert>}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Panel>
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[15px] font-semibold text-ink">Weekly hours</h2>
              <Button size="sm" variant="ghost" icon={<Copy className="size-4" />} onClick={() => setWeek((w) => w.map((d) => (d.on ? { ...d, ranges: [...w[0].ranges] } : d)))}>Copy Monday to all</Button>
            </div>
            <ul className="divide-y divide-line">
              {week.map((d, i) => (
                <li key={d.day} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start">
                  <div className="flex w-40 shrink-0 items-center gap-3 pt-2">
                    <Toggle label={d.day} checked={d.on} onChange={(v) => update(i, (x) => ({ ...x, on: v, ranges: v && !x.ranges.length ? [{ from: '09:00', to: '16:00' }] : x.ranges }))} />
                    <span className={cn('text-sm font-medium', d.on ? 'text-ink' : 'text-muted')}>{d.day}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {!d.on ? (
                      <p className="pt-2 text-sm text-muted">Unavailable</p>
                    ) : (
                      d.ranges.map((r, k) => (
                        <div key={k} className="flex items-center gap-2">
                          <Input type="time" aria-label="From" value={r.from} onChange={(e) => update(i, (x) => ({ ...x, ranges: x.ranges.map((y, m) => (m === k ? { ...y, from: e.target.value } : y)) }))} className="h-10 w-32" />
                          <span className="text-muted">–</span>
                          <Input type="time" aria-label="To" value={r.to} onChange={(e) => update(i, (x) => ({ ...x, ranges: x.ranges.map((y, m) => (m === k ? { ...y, to: e.target.value } : y)) }))} className="h-10 w-32" />
                          <button aria-label="Remove hours" onClick={() => update(i, (x) => ({ ...x, ranges: x.ranges.filter((_, m) => m !== k), on: x.ranges.length > 1 }))} className="rounded-md p-2 text-muted hover:bg-canvas hover:text-danger"><Trash2 className="size-4" /></button>
                        </div>
                      ))
                    )}
                    {d.on && <button onClick={() => update(i, (x) => ({ ...x, ranges: [...x.ranges, { from: '16:00', to: '18:00' }] }))} className="inline-flex items-center gap-1 text-sm font-medium text-primary"><Plus className="size-4" /> Add hours</button>}
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-6">
            <Panel className="p-5">
              <h2 className="text-[15px] font-semibold text-ink">Booking rules</h2>
              <div className="mt-4 space-y-4">
                <Field label="Appointment length"><Select value={slot} onChange={(e) => setSlot(e.target.value)}>{['15', '20', '30', '45'].map((s) => <option key={s} value={s}>{s} minutes</option>)}</Select></Field>
                <Field label="Minimum notice"><Select defaultValue="12 hours"><option>2 hours</option><option>12 hours</option><option>24 hours</option></Select></Field>
                <Field label="Book up to"><Select defaultValue="8 weeks ahead"><option>4 weeks ahead</option><option>8 weeks ahead</option><option>12 weeks ahead</option></Select></Field>
                <label className="flex items-center justify-between gap-3 text-sm text-ink">Approve requests manually <Toggle label="Approve manually" checked onChange={() => {}} /></label>
              </div>
            </Panel>

            <Panel>
              <div className="flex items-center justify-between px-5 pb-2 pt-4">
                <h2 className="text-[15px] font-semibold text-ink">Blocked dates</h2>
                <Button size="sm" variant="soft" icon={<CalendarOff className="size-4" />} onClick={() => setAdding(true)}>Block</Button>
              </div>
              <ul className="divide-y divide-line">
                {blocked.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="min-w-0 flex-1"><p className="text-sm font-medium text-ink">{b.date}</p><p className="text-xs text-muted">{b.reason}</p></div>
                    <button aria-label="Remove" onClick={() => setBlocked((l) => l.filter((x) => x.id !== b.id))} className="rounded-md p-1.5 text-muted hover:bg-canvas hover:text-danger"><Trash2 className="size-4" /></button>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>

      <Modal open={adding && !confirm} onClose={() => setAdding(false)} title="Block unavailable dates" footer={<><Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button><Button onClick={() => setConfirm(true)}>Continue</Button></>}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="From"><Input type="date" defaultValue="2025-06-27" /></Field>
            <Field label="To"><Input type="date" defaultValue="2025-06-27" /></Field>
          </div>
          <Field label="Reason (private)"><Textarea rows={2} defaultValue="Hospital training day" /></Field>
        </div>
      </Modal>
      <Modal open={confirm} onClose={() => setConfirm(false)} title="2 appointments are affected" size="sm" footer={<><Button variant="secondary" onClick={() => setConfirm(false)}>Back</Button><Button variant="danger" onClick={() => { setBlocked((l) => [...l, { id: Date.now(), date: 'Fri 27 Jun 2025', reason: 'Hospital training day', booked: 2 }]); setConfirm(false); setAdding(false) }}>Block and notify</Button></>}>
        <p className="flex gap-2 text-sm text-muted"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" /> Elena Park (10:00 AM) and James Ortiz (02:30 PM) are booked on Fri 27 Jun. They’ll be asked to choose a new time.</p>
      </Modal>
    </AppShell>
  )
}
