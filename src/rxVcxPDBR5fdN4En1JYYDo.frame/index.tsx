import React, { useState } from 'react'
import { Check, X, Clock, Video, MoreHorizontal, CalendarRange } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, Button, Field, Modal, PageHeader, Panel, Select, StatusBadge, Tabs, Textarea, type Tone } from '../shared/ui'
import { doctorRequests, doctorToday, type ApptStatus } from '../shared/data'

export const args = {
  tab: 'today',
}

export const argTypes = {
  tab: { control: 'radio', options: ['today', 'upcoming', 'requests'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const UPCOMING = [
  { date: 'Tue 17 Jun', time: '09:30 AM', patient: 'Michael Thompson', initials: 'MT', reason: 'Blood pressure review', type: 'Follow-up', status: 'Confirmed' as ApptStatus },
  { date: 'Tue 17 Jun', time: '10:30 AM', patient: 'Daniel Novak', initials: 'DN', reason: 'Chest pain evaluation', type: 'New patient', status: 'Confirmed' as ApptStatus },
  { date: 'Tue 17 Jun', time: '03:30 PM', patient: 'Robert Hughes', initials: 'RH', reason: 'Post-angioplasty check', type: 'Follow-up', status: 'Confirmed' as ApptStatus },
  { date: 'Thu 19 Jun', time: '11:00 AM', patient: 'Fatima Al-Sayed', initials: 'FA', reason: 'Heart failure review', type: 'Follow-up', status: 'Confirmed' as ApptStatus },
  { date: 'Mon 23 Jun', time: '09:00 AM', patient: 'Henry Walsh', initials: 'HW', reason: 'Medication review', type: 'Follow-up', status: 'Pending' as ApptStatus },
]

export default function DoctorAppointments(props: Props) {
  const { tab: t0, onNavigate } = { ...args, ...props }
  const [tab, setTab] = useState(t0)
  const [today, setToday] = useState(doctorToday)
  const [reqs, setReqs] = useState(doctorRequests)
  const [declineId, setDeclineId] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const setStatus = (time: string, status: ApptStatus) => setToday((l) => l.map((a) => (a.time === time ? { ...a, status } : a)))

  return (
    <AppShell role="doctor" active="d-appointments" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Appointments" subtitle="Review requests and keep each visit’s status up to date" actions={<Button variant="secondary" icon={<CalendarRange className="size-4" />} onClick={() => onNavigate?.('d-calendar')}>Calendar view</Button>} />
        {msg && <Alert tone="success" className="mb-4" title={msg} />}
        <Panel>
          <Tabs className="px-4" value={tab} onChange={setTab} items={[{ value: 'today', label: 'Today', count: today.length }, { value: 'upcoming', label: 'Upcoming', count: UPCOMING.length }, { value: 'requests', label: 'Requests', count: reqs.length }]} />

          {tab === 'today' && (
            <ul className="divide-y divide-line">
              {today.map((a) => (
                <li key={a.time} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <span className="w-20 shrink-0 text-sm font-semibold text-ink">{a.time}</span>
                    <Avatar initials={a.initials} size={40} />
                    <button onClick={() => onNavigate?.('d-patient')} className="min-w-0 text-left">
                      <p className="font-semibold text-ink hover:text-primary">{a.patient}</p>
                      <p className="flex items-center gap-1.5 text-sm text-muted">{a.type === 'Video' && <Video className="size-3.5" />}{a.type} · {a.reason}</p>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 md:shrink-0">
                    <label className="sr-only" htmlFor={`st-${a.time}`}>Status</label>
                    <Select id={`st-${a.time}`} value={a.status} onChange={(e) => { setStatus(a.time, e.target.value as ApptStatus); setMsg(`${a.patient}: marked ${e.target.value.toLowerCase()}. Patient notified.`) }} className="h-9 w-36">
                      {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
                    </Select>
                    <StatusBadge status={a.status} className="hidden lg:inline-flex" />
                    <Button size="sm" variant="ghost" aria-label="More" icon={<MoreHorizontal className="size-4" />} />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === 'upcoming' && (
            <ul className="divide-y divide-line">
              {UPCOMING.map((a) => (
                <li key={a.date + a.time} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-24 shrink-0"><p className="text-sm font-semibold text-ink">{a.date}</p><p className="text-xs text-muted">{a.time}</p></div>
                  <Avatar initials={a.initials} size={40} />
                  <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{a.patient}</p><p className="truncate text-sm text-muted">{a.type} · {a.reason}</p></div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}

          {tab === 'requests' && (
            reqs.length === 0 ? <p className="p-10 text-center text-sm text-muted">No pending requests.</p> : (
              <ul className="divide-y divide-line">
                {reqs.map((r) => (
                  <li key={r.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <Avatar initials={r.initials} size={40} />
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{r.patient}, {r.age}</p>
                        <p className="flex items-center gap-1.5 text-sm text-muted"><Clock className="size-3.5" /> Requested {r.requested} · {r.received}</p>
                        <p className="mt-1 text-sm text-slate-600">“{r.reason}”</p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:shrink-0">
                      <Button size="sm" icon={<Check className="size-4" />} onClick={() => { setReqs((l) => l.filter((x) => x.id !== r.id)); setMsg(`Confirmed ${r.patient} for ${r.requested}.`) }}>Approve</Button>
                      <Button size="sm" variant="secondary" icon={<X className="size-4" />} onClick={() => setDeclineId(r.id)}>Decline</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </Panel>
      </div>

      <Modal open={!!declineId} onClose={() => setDeclineId(null)} title="Decline appointment request" footer={<><Button variant="secondary" onClick={() => setDeclineId(null)}>Cancel</Button><Button variant="danger" onClick={() => { const r = reqs.find((x) => x.id === declineId); setReqs((l) => l.filter((x) => x.id !== declineId)); setDeclineId(null); setMsg(`Declined ${r?.patient}. They’ve been offered other times.`) }}>Decline and notify</Button></>}>
        <div className="space-y-4">
          <Field label="Reason shared with the patient"><Select defaultValue="Time no longer available"><option>Time no longer available</option><option>Better suited to another specialist</option><option>Needs a referral first</option><option>Other</option></Select></Field>
          <Field label="Message (optional)"><Textarea rows={3} defaultValue="I’m unavailable at that time. Please choose another slot this week." /></Field>
        </div>
      </Modal>
    </AppShell>
  )
}
