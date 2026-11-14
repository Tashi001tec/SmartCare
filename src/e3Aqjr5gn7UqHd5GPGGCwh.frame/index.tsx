import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Pill, Video } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Button, PageHeader, Panel, StatusBadge, cn } from '../shared/ui'
import { IMG } from '../shared/data'

export const args = {
  selectedDay: 17,
}

export const argTypes = {
  selectedDay: { control: 'range', min: 1, max: 30, step: 1 },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

type Ev = { day: number; time: string; title: string; who: string; place: string; status: string; kind: 'appt' | 'refill' | 'video'; photo?: string }
const EVENTS: Ev[] = [
  { day: 12, time: '10:00 AM', title: 'Cardiology consultation', who: 'Dr. Kwame Adebayo', place: "St. Mary's General Hospital", status: 'Completed', kind: 'appt', photo: IMG.doctorM },
  { day: 17, time: '09:30 AM', title: 'Blood pressure follow-up', who: 'Dr. Kwame Adebayo', place: "St. Mary's General Hospital, Room 3B", status: 'Confirmed', kind: 'appt', photo: IMG.doctorM },
  { day: 17, time: '06:00 PM', title: 'Collect pharmacy order', who: 'CityCare Pharmacy', place: '310 Main Street', status: 'Ready for Collection', kind: 'refill' },
  { day: 25, time: '11:30 AM', title: 'Diabetes review', who: 'Dr. Priya Sharma', place: "St. Mary's General Hospital", status: 'Pending', kind: 'appt', photo: IMG.doctorF },
  { day: 27, time: '04:00 PM', title: 'Video check-in', who: 'Dr. Elena Rossi', place: 'Video call', status: 'Confirmed', kind: 'video' },
]

export default function AppointmentCalendar(props: Props) {
  const { selectedDay, onNavigate } = { ...args, ...props }
  const [sel, setSel] = useState(selectedDay)
  const cells = Array.from({ length: 35 }, (_, i) => i + 1)
  const dayEvents = EVENTS.filter((e) => e.day === sel)

  return (
    <AppShell role="patient" active="p-appointments" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Appointment calendar"
          subtitle="Your visits, video calls and pharmacy pick-ups in one view"
          actions={<><Button variant="secondary" onClick={() => onNavigate?.('p-appointments')}>List view</Button><Button icon={<Plus className="size-4" />} onClick={() => onNavigate?.('p-booking')}>New appointment</Button></>}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h2 className="font-semibold text-ink">June 2025</h2>
              <div className="flex gap-1">
                <button aria-label="Previous month" className="rounded-md p-1.5 text-muted hover:bg-canvas"><ChevronLeft className="size-5" /></button>
                <button className="rounded-md px-2 text-sm font-medium text-muted hover:bg-canvas" onClick={() => setSel(16)}>Today</button>
                <button aria-label="Next month" className="rounded-md p-1.5 text-muted hover:bg-canvas"><ChevronRight className="size-5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 border-b border-line bg-canvas text-center text-xs font-medium text-muted">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((n) => {
                const valid = n <= 30
                const evs = EVENTS.filter((e) => e.day === n)
                return (
                  <button
                    key={n}
                    disabled={!valid}
                    onClick={() => setSel(n)}
                    className={cn('flex min-h-16 flex-col items-stretch gap-1 border-b border-r border-line p-1.5 text-left transition-colors duration-150 sm:min-h-24 sm:p-2 [&:nth-child(7n)]:border-r-0', sel === n ? 'bg-primary-soft' : valid ? 'hover:bg-canvas' : 'bg-canvas/60')}
                  >
                    {valid && (
                      <>
                        <span className={cn('grid size-6 place-items-center rounded-full text-xs font-medium', n === 16 ? 'bg-primary text-white' : sel === n ? 'text-primary' : n < 16 ? 'text-slate-400' : 'text-ink')}>{n}</span>
                        {evs.map((e) => (
                          <span key={e.time} className={cn('hidden truncate rounded px-1.5 py-0.5 text-[11px] font-medium sm:block', e.kind === 'refill' ? 'bg-success-soft text-success' : e.status === 'Pending' ? 'bg-warning-soft text-warning-ink' : e.status === 'Completed' ? 'bg-slate-100 text-muted' : 'bg-primary text-white')}>
                            {e.time.replace(':00', '')} {e.title}
                          </span>
                        ))}
                        {evs.length > 0 && <span className="mx-auto size-1.5 rounded-full bg-primary sm:hidden" />}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </Panel>

          <aside>
            <Panel className="p-5">
              <h2 className="font-semibold text-ink">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(sel - 1) % 7]}, {sel} June</h2>
              {dayEvents.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted">Nothing scheduled.</p>
                  <Button variant="soft" size="sm" className="mt-3" onClick={() => onNavigate?.('p-booking')}>Book this day</Button>
                </div>
              ) : (
                <ul className="mt-4 space-y-3">
                  {dayEvents.map((e) => (
                    <li key={e.time} className="rounded-lg border border-line p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">{e.title}</p>
                        <StatusBadge status={e.status} />
                      </div>
                      <div className="mt-3 flex items-center gap-2.5">
                        {e.kind === 'refill' ? <span className="grid size-8 place-items-center rounded-full bg-success-soft text-success"><Pill className="size-4" /></span> : <Avatar src={e.photo} name={e.who} size={32} />}
                        <span className="text-sm text-ink">{e.who}</span>
                      </div>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Clock className="size-3.5" /> {e.time}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">{e.kind === 'video' ? <Video className="size-3.5" /> : <MapPin className="size-3.5" />} {e.place}</p>
                      {e.status === 'Confirmed' && e.kind === 'appt' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="secondary" onClick={() => onNavigate?.('p-appointments')}>Reschedule</Button>
                          <Button size="sm" variant="ghost" onClick={() => onNavigate?.('p-hospital-map')}>Directions</Button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}
