import React, { useState } from 'react'
import { CalendarDays, Plus, Clock, MapPin, CalendarX, FileText, AlertTriangle } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, Button, EmptyState, Field, Modal, PageHeader, Panel, Select, StatusBadge, Tabs } from '../shared/ui'
import { appointments as seed, doctors, type Appointment } from '../shared/data'

export const args = {
  tab: 'upcoming',
  empty: false,
}

export const argTypes = {
  tab: { control: 'radio', options: ['upcoming', 'past', 'cancelled'] },
  empty: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function AppointmentHistory(props: Props) {
  const { tab: t0, empty, onNavigate } = { ...args, ...props }
  const [tab, setTab] = useState(t0)
  const [list, setList] = useState<Appointment[]>(empty ? [] : seed)
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [moveId, setMoveId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const groups = {
    upcoming: list.filter((a) => a.status === 'Confirmed' || a.status === 'Pending'),
    past: list.filter((a) => a.status === 'Completed'),
    cancelled: list.filter((a) => a.status === 'Cancelled'),
  }
  const shown = groups[tab as keyof typeof groups]
  const target = list.find((a) => a.id === (cancelId ?? moveId))
  const photo = (name: string) => doctors.find((d) => d.name === name)?.photo

  return (
    <AppShell role="patient" active="p-appointments" onNavigate={onNavigate}>
      <div className="mx-auto max-w-5xl">
        <PageHeader
          title="Appointments"
          subtitle="Manage upcoming visits and look back at past consultations"
          actions={<><Button variant="secondary" icon={<CalendarDays className="size-4" />} onClick={() => onNavigate?.('p-calendar')}>Calendar</Button><Button icon={<Plus className="size-4" />} onClick={() => onNavigate?.('p-doctors')}>Book appointment</Button></>}
        />
        {toast && <Alert tone="success" className="mb-4" title={toast} />}
        <Panel>
          <Tabs className="px-4" value={tab} onChange={setTab} items={[{ value: 'upcoming', label: 'Upcoming', count: groups.upcoming.length }, { value: 'past', label: 'Past', count: groups.past.length }, { value: 'cancelled', label: 'Cancelled', count: groups.cancelled.length }]} />
          {shown.length === 0 ? (
            <EmptyState icon={<CalendarX className="size-5" />} title={tab === 'upcoming' ? 'No upcoming appointments' : `No ${tab} appointments`} body="When you book with a doctor, your visits will show here with reminders the day before." action={<Button onClick={() => onNavigate?.('p-doctors')}>Find a doctor</Button>} />
          ) : (
            <ul className="divide-y divide-line">
              {shown.map((a) => (
                <li key={a.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
                  <div className="flex w-full items-center gap-4 md:w-auto md:flex-1">
                    <div className="hidden w-16 shrink-0 text-center sm:block">
                      <p className="text-xs font-medium text-muted">{a.date.slice(0, 3)}</p>
                      <p className="text-2xl font-semibold text-ink">{a.date.slice(5, 7)}</p>
                      <p className="text-xs text-muted">{a.date.slice(8, 11)}</p>
                    </div>
                    <Avatar src={photo(a.doctor)} name={a.doctor} size={44} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{a.doctor}</p>
                        <StatusBadge status={a.status} />
                      </div>
                      <p className="text-sm text-muted">{a.specialty} · {a.type} · {a.reason}</p>
                      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted">
                        <span className="flex items-center gap-1"><Clock className="size-3.5" /> {a.date} · {a.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {a.hospital}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 md:shrink-0">
                    {tab === 'upcoming' && (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => setMoveId(a.id)}>Reschedule</Button>
                        <Button size="sm" variant="ghost" className="text-danger hover:bg-danger-soft hover:text-danger" onClick={() => setCancelId(a.id)}>Cancel</Button>
                      </>
                    )}
                    {tab === 'past' && (
                      <>
                        <Button size="sm" variant="secondary" icon={<FileText className="size-4" />} onClick={() => onNavigate?.('p-rx-detail')}>Prescription</Button>
                        <Button size="sm" variant="ghost" onClick={() => onNavigate?.('p-booking')}>Book again</Button>
                      </>
                    )}
                    {tab === 'cancelled' && <Button size="sm" variant="secondary" onClick={() => onNavigate?.('p-booking')}>Book again</Button>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Modal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        title="Cancel this appointment?"
        size="sm"
        footer={<><Button variant="secondary" onClick={() => setCancelId(null)}>Keep appointment</Button><Button variant="danger" onClick={() => { setList((l) => l.map((a) => (a.id === cancelId ? { ...a, status: 'Cancelled' } : a))); setCancelId(null); setToast('Appointment cancelled. The doctor has been notified.') }}>Yes, cancel</Button></>}
      >
        {target && (
          <div className="space-y-4 text-sm">
            <p className="text-muted">{target.doctor} · {target.date} at {target.time}</p>
            <Field label="Reason (optional)"><Select defaultValue=""><option value="">Choose a reason</option><option>I’m feeling better</option><option>Schedule conflict</option><option>Booked with another doctor</option><option>Other</option></Select></Field>
            <Alert tone="warning">Cancelling less than 24 hours before may count towards St. Mary’s no-show policy.</Alert>
          </div>
        )}
      </Modal>

      <Modal
        open={!!moveId}
        onClose={() => setMoveId(null)}
        title="Reschedule appointment"
        footer={<><Button variant="secondary" onClick={() => setMoveId(null)}>Cancel</Button><Button onClick={() => { setMoveId(null); setToast('Reschedule request sent. You’ll be notified when confirmed.') }}>Request new time</Button></>}
      >
        {target && (
          <div className="space-y-4">
            <p className="text-sm text-muted">Currently {target.date} at {target.time} with {target.doctor}.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="New date"><Select defaultValue="Thu 19 Jun"><option>Wed 18 Jun</option><option>Thu 19 Jun</option><option>Fri 20 Jun</option><option>Mon 23 Jun</option></Select></Field>
              <Field label="New time"><Select defaultValue="10:30 AM"><option>09:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>02:00 PM</option></Select></Field>
            </div>
            <p className="flex items-start gap-2 text-xs text-muted"><AlertTriangle className="mt-px size-3.5 shrink-0 text-warning" /> Hospital policy: each appointment can be rescheduled twice, at least 24 hours in advance.</p>
          </div>
        )}
      </Modal>
    </AppShell>
  )
}
