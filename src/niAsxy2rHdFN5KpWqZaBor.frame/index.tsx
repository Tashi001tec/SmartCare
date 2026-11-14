import React, { useState } from 'react'
import { FilePlus2, CalendarRange, Check, X, Video, ChevronRight, FileText, MessageSquare } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, Badge, Button, Panel, PanelHeader, StatusBadge, cn } from '../shared/ui'
import { BarChart } from '../shared/widgets'
import { doctorRequests, doctorToday } from '../shared/data'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'unverified'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function DoctorDashboard(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const go = (k: string) => onNavigate?.(k)
  const [requests, setRequests] = useState(doctorRequests)
  const [flash, setFlash] = useState<string | null>(null)
  const act = (id: string, ok: boolean) => {
    const r = requests.find((x) => x.id === id)!
    setRequests((l) => l.filter((x) => x.id !== id))
    setFlash(ok ? `Confirmed ${r.patient} for ${r.requested}. They’ve been notified.` : `Declined ${r.patient}’s request. They’ve been notified to choose another time.`)
  }
  const nextIdx = doctorToday.findIndex((a) => a.status !== 'Completed')

  return (
    <AppShell role="doctor" active="d-dashboard" onNavigate={onNavigate} search="Search patients, prescriptions…">
      <div className="mx-auto max-w-7xl">
        {state === 'unverified' && <Alert tone="warning" className="mb-6" title="Your account is pending verification">Patient records, prescriptions and messaging unlock once an administrator approves your medical registration.</Alert>}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-muted">Monday, 16 June 2025</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Good morning, Dr. Adebayo</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon={<FilePlus2 className="size-4" />} onClick={() => go('d-rx-create')} disabled={state === 'unverified'}>New prescription</Button>
            <Button variant="secondary" icon={<CalendarRange className="size-4" />} onClick={() => go('d-calendar')}>My calendar</Button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 divide-line rounded-xl border border-line bg-white sm:grid-cols-5 sm:divide-x">
          {[
            ['Authorised patients', '248', 'd-patients'],
            ['Today’s appointments', String(doctorToday.length), 'd-appointments'],
            ['Upcoming (7 days)', '23', 'd-appointments'],
            ['Pending requests', String(requests.length), 'd-appointments'],
            ['Unread messages', '4', 'd-messages'],
          ].map(([l, v, k]) => (
            <button key={l} onClick={() => go(k)} className="px-5 py-4 text-left transition-colors duration-150 hover:bg-canvas">
              <dt className="text-xs text-muted">{l}</dt>
              <dd className={cn('mt-1 text-2xl font-semibold', l === 'Pending requests' && requests.length ? 'text-warning-ink' : 'text-ink')}>{v}</dd>
            </button>
          ))}
        </dl>

        {flash && <Alert tone="success" className="mt-6" title={flash} />}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Panel>
            <PanelHeader title="Today’s schedule" sub="St. Mary’s General Hospital · Room 3B" action={<button onClick={() => go('d-appointments')} className="text-sm font-medium text-primary">All appointments</button>} />
            <ol className="px-3 pb-3">
              {doctorToday.map((a, i) => {
                const next = i === nextIdx
                return (
                  <li key={a.time}>
                    <button onClick={() => go('d-patient')} className={cn('flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition-colors duration-150', next ? 'bg-primary-soft' : 'hover:bg-canvas')}>
                      <span className={cn('w-[72px] shrink-0 text-sm font-medium', a.status === 'Completed' ? 'text-slate-400' : 'text-ink')}>{a.time}</span>
                      <Avatar initials={a.initials} size={36} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className={cn('truncate text-sm font-semibold', a.status === 'Completed' ? 'text-muted' : 'text-ink')}>{a.patient}</span>
                          {next && <Badge tone="navy">Next</Badge>}
                          {a.type === 'Video' && <Video className="size-3.5 text-muted" />}
                        </span>
                        <span className="block truncate text-xs text-muted">{a.type} · {a.reason}</span>
                      </span>
                      <StatusBadge status={a.status} className="hidden sm:inline-flex" />
                      <ChevronRight className="size-4 shrink-0 text-slate-300" />
                    </button>
                  </li>
                )
              })}
            </ol>
          </Panel>

          <div className="space-y-6">
            <Panel>
              <PanelHeader title="Appointment requests" action={requests.length ? <Badge tone="orange">{requests.length} pending</Badge> : undefined} />
              {requests.length === 0 ? (
                <p className="px-5 pb-6 text-sm text-muted">No pending requests. You’re all caught up.</p>
              ) : (
                <ul className="divide-y divide-line border-t border-line">
                  {requests.map((r) => (
                    <li key={r.id} className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <Avatar initials={r.initials} size={36} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-ink">{r.patient}, {r.age}</p>
                          <p className="text-xs text-muted">{r.requested} · {r.received}</p>
                          <p className="mt-1 text-sm text-slate-600">{r.reason}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2 pl-12">
                        <Button size="sm" icon={<Check className="size-4" />} onClick={() => act(r.id, true)}>Confirm</Button>
                        <Button size="sm" variant="secondary" icon={<X className="size-4" />} onClick={() => act(r.id, false)}>Decline</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <PanelHeader title="Weekly appointments" sub="Completed and scheduled, this week" />
            <div className="px-5 pb-5">
              <BarChart height={170} highlight="Mon" data={[{ label: 'Mon', value: 1, secondary: 5 }, { label: 'Tue', value: 0, secondary: 7 }, { label: 'Wed', value: 0, secondary: 6 }, { label: 'Thu', value: 0, secondary: 5 }, { label: 'Fri', value: 0, secondary: 4 }]} />
              <p className="mt-3 text-xs text-muted">27 appointments this week · last week 24 (22 completed, 2 no-shows)</p>
            </div>
          </Panel>
          <Panel>
            <PanelHeader title="Recently issued" action={<button onClick={() => go('d-rx-history')} className="text-sm font-medium text-primary">History</button>} />
            <ul className="divide-y divide-line border-t border-line">
              {[
                ['RX-2025-08417', 'Michael Thompson', '12 Jun'],
                ['RX-2025-08390', 'Grace Okonkwo', '10 Jun'],
                ['RX-2025-08270', 'Fatima Al-Sayed', '05 Jun'],
              ].map(([ref, name, date]) => (
                <li key={ref} className="flex items-center gap-3 px-5 py-3">
                  <FileText className="size-4 text-primary" />
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-ink">{name}</p><p className="text-xs text-muted">{ref} · {date}</p></div>
                  <Badge tone="green">Issued</Badge>
                </li>
              ))}
            </ul>
            <div className="p-4"><Button variant="soft" size="sm" className="w-full" icon={<MessageSquare className="size-4" />} onClick={() => go('d-messages')}>4 unread patient messages</Button></div>
          </Panel>
        </div>
      </div>
    </AppShell>
  )
}
