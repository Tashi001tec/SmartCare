import React, { useState } from 'react'
import { Stethoscope, CalendarPlus, FileText, Sparkles, Building2, Clock, MapPin, Video, Check, X, ChevronRight, Pill, MessageSquare, Footprints, Droplet, Moon } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Badge, Button, Panel, PanelHeader, StatusBadge, Skeleton, cn } from '../shared/ui'
import { BarChart, ProgressRing } from '../shared/widgets'
import { IMG, patient, prescriptions, todaysMeds, type Med } from '../shared/data'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'loading', 'new-user'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PatientDashboard(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const go = (k: string) => onNavigate?.(k)
  const [meds, setMeds] = useState<Med[]>(todaysMeds)
  const mark = (id: string, status: Med['status']) => setMeds((m) => m.map((x) => (x.id === id ? { ...x, status } : x)))
  const done = meds.filter((m) => m.status === 'taken').length
  const pct = Math.round((done / meds.length) * 100)
  const empty = state === 'new-user'

  return (
    <AppShell role="patient" active="p-dashboard" onNavigate={onNavigate} search="Search doctors, hospitals, medicines…">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-muted">Monday, 16 June 2025</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Good afternoon, {patient.first}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon={<Stethoscope className="size-4" />} onClick={() => go('p-doctors')}>Find a Doctor</Button>
            <Button variant="secondary" icon={<CalendarPlus className="size-4" />} onClick={() => go('p-booking')}>Book Appointment</Button>
            <Button variant="secondary" icon={<FileText className="size-4" />} onClick={() => go('p-prescriptions')} className="hidden sm:inline-flex">View Prescriptions</Button>
            <Button variant="secondary" icon={<Sparkles className="size-4" />} onClick={() => go('p-ai')} className="hidden xl:inline-flex">Ask AI Assistant</Button>
            <Button variant="secondary" icon={<Building2 className="size-4" />} onClick={() => go('p-hospitals')} className="hidden xl:inline-flex">Find a Hospital</Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Primary: today's medicines */}
          <Panel>
            <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink">Today’s medicine schedule</h2>
                <p className="mt-0.5 text-sm text-muted">{empty ? 'No prescribed medicines yet' : `${done} of ${meds.length} doses taken`}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => go('p-meds')}>Full routine <ChevronRight className="size-4" /></Button>
            </div>
            {state === 'loading' ? (
              <div className="space-y-4 p-5">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-14" />)}</div>
            ) : empty ? (
              <div className="p-10 text-center text-sm text-muted">When a doctor issues you a prescription, each dose appears here with a reminder.</div>
            ) : (
              <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto]">
                <ol className="relative space-y-1">
                  {meds.map((m, i) => {
                    const due = m.status === 'due'
                    return (
                      <li key={m.id} className={cn('relative flex items-center gap-4 rounded-lg py-3 pl-3 pr-2', due && 'bg-warning-soft')}>
                        {i < meds.length - 1 && <span className="absolute left-[23px] top-9 h-[calc(100%-12px)] w-px bg-line" aria-hidden />}
                        <span className={cn('relative z-10 grid size-6 shrink-0 place-items-center rounded-full border-2', m.status === 'taken' ? 'border-success bg-success text-white' : m.status === 'missed' ? 'border-danger bg-danger text-white' : due ? 'border-warning bg-white' : 'border-slate-300 bg-white')}>
                          {m.status === 'taken' && <Check className="size-3.5" strokeWidth={3} />}
                          {m.status === 'missed' && <X className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span className="w-[72px] shrink-0 text-sm font-medium text-muted">{m.time}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">{m.name} <span className="font-normal text-muted">· {m.dose}</span></span>
                          <span className="block truncate text-xs text-muted">{m.instructions}</span>
                        </span>
                        {due ? (
                          <span className="flex shrink-0 gap-1.5">
                            <Button size="sm" variant="success" onClick={() => mark(m.id, 'taken')}>Taken</Button>
                            <Button size="sm" variant="secondary" onClick={() => mark(m.id, 'missed')} className="hidden sm:inline-flex">Missed</Button>
                          </span>
                        ) : (
                          <span className="shrink-0">{m.status === 'taken' ? <Badge tone="green">Taken</Badge> : m.status === 'missed' ? <Badge tone="red">Missed</Badge> : <Badge tone="gray">Upcoming</Badge>}</span>
                        )}
                      </li>
                    )
                  })}
                </ol>
                <div className="hidden flex-col items-center justify-center gap-2 border-l border-line pl-6 sm:flex">
                  <ProgressRing value={pct} size={112} label="today" />
                  <p className="text-center text-xs text-muted">Weekly adherence<br /><strong className="text-sm text-ink">92%</strong></p>
                </div>
              </div>
            )}
          </Panel>

          {/* Next appointment */}
          <div className="space-y-6">
            <section className="rounded-xl bg-primary-dark p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-blue-200">Next appointment</h2>
                {!empty && <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium">Confirmed</span>}
              </div>
              {empty ? (
                <div className="mt-4">
                  <p className="text-lg font-semibold">No upcoming appointments</p>
                  <button onClick={() => go('p-doctors')} className="mt-4 h-10 w-full rounded-lg bg-white text-sm font-semibold text-primary-dark">Find a doctor</button>
                </div>
              ) : (
                <>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar src={IMG.doctorM} name="Dr. Kwame Adebayo" size={48} />
                    <div>
                      <p className="font-semibold">Dr. Kwame Adebayo</p>
                      <p className="text-sm text-blue-200">Cardiologist · Follow-up</p>
                    </div>
                  </div>
                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Clock className="size-4 text-blue-300" /> Tomorrow, Tue 17 Jun · 09:30 AM</div>
                    <div className="flex items-center gap-2"><MapPin className="size-4 text-blue-300" /> St. Mary’s General Hospital, Room 3B</div>
                  </dl>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button onClick={() => go('p-appointments')} className="h-10 rounded-lg bg-white text-sm font-semibold text-primary-dark transition-colors duration-150 hover:bg-primary-soft">Details</button>
                    <button onClick={() => go('p-hospital-map')} className="h-10 rounded-lg border border-white/30 text-sm font-semibold transition-colors duration-150 hover:bg-white/10">Directions</button>
                  </div>
                </>
              )}
            </section>

            <Panel className="p-5">
              <div className="flex items-center gap-3">
                <Avatar initials="MT" size={44} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{patient.name}</p>
                  <p className="text-xs text-muted">{patient.age} yrs · {patient.gender} · Blood {patient.blood}</p>
                </div>
                <button onClick={() => go('p-profile')} className="text-sm font-medium text-primary">Edit</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {patient.conditions.map((c) => <Badge key={c} tone="gray">{c}</Badge>)}
                <Badge tone="red">Allergy: Penicillin</Badge>
              </div>
            </Panel>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel>
            <PanelHeader title="Recent prescriptions" action={<button onClick={() => go('p-prescriptions')} className="text-sm font-medium text-primary">View all</button>} />
            <ul className="divide-y divide-line px-2 pb-2">
              {prescriptions.slice(0, 3).map((p) => (
                <li key={p.ref}>
                  <button onClick={() => go('p-rx-detail')} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-canvas">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><Pill className="size-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{p.items.map((i) => i.name).join(', ')}</span>
                      <span className="block text-xs text-muted">{p.doctor} · {p.date}</span>
                    </span>
                    <StatusBadge status={p.status} />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Unread messages" action={<Badge tone="blue">2 new</Badge>} />
            <ul className="divide-y divide-line px-2 pb-2">
              {[
                { name: 'Dr. Kwame Adebayo', photo: IMG.doctorM, text: 'Your readings look better this week. Keep logging them each morning…', time: '10:15 AM' },
                { name: 'Dr. Priya Sharma', photo: IMG.doctorF, text: 'Please book your HbA1c blood test before our next appointment.', time: 'Mon' },
              ].map((m) => (
                <li key={m.name}>
                  <button onClick={() => go('p-messages')} className="flex w-full gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-canvas">
                    <Avatar src={m.photo} name={m.name} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between gap-2"><span className="truncate text-sm font-semibold text-ink">{m.name}</span><span className="shrink-0 text-xs text-muted">{m.time}</span></span>
                      <span className="line-clamp-2 text-sm text-muted">{m.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-4"><Button variant="soft" size="sm" className="w-full" icon={<MessageSquare className="size-4" />} onClick={() => go('p-messages')}>Open messages</Button></div>
          </Panel>

          <Panel>
            <PanelHeader title="Health activity" sub="This week" action={<button onClick={() => go('p-meds')} className="text-sm font-medium text-primary">Routine</button>} />
            <div className="px-5">
              <BarChart height={120} highlight="Mon" data={[{ label: 'Tue', value: 5 }, { label: 'Wed', value: 5 }, { label: 'Thu', value: 4 }, { label: 'Fri', value: 5 }, { label: 'Sat', value: 5 }, { label: 'Sun', value: 4 }, { label: 'Mon', value: done }]} />
              <p className="mt-2 text-xs text-muted">Doses taken per day (of 5)</p>
            </div>
            <dl className="mt-4 grid grid-cols-3 border-t border-line text-center">
              {[[Footprints, '6,240', 'steps'], [Droplet, '1.6 L', 'water'], [Moon, '7h 10m', 'sleep']].map(([Icon, v, l]) => {
                const I = Icon as React.ElementType
                return (
                  <div key={l as string} className="py-4">
                    <I className="mx-auto size-4 text-primary" />
                    <dd className="mt-1 text-sm font-semibold text-ink">{v as string}</dd>
                    <dt className="text-xs text-muted">{l as string}</dt>
                  </div>
                )
              })}
            </dl>
          </Panel>
        </div>
      </div>
    </AppShell>
  )
}
