import React, { useState } from 'react'
import { Check, X, Lock, Plus, Footprints, Activity, Droplet, Bell, History, Sun, Sunset, Moon, CloudSun, Undo2 } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Badge, Button, Field, Input, Modal, PageHeader, Panel, Select, cn } from '../shared/ui'
import { ProgressRing } from '../shared/widgets'
import { todaysMeds, type Med } from '../shared/data'

export const args = {
  state: 'in-progress',
}

export const argTypes = {
  state: { control: 'radio', options: ['in-progress', 'all-done', 'missed-dose'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const SLOTS = [
  { key: 'Morning', icon: Sun },
  { key: 'Afternoon', icon: CloudSun },
  { key: 'Evening', icon: Sunset },
  { key: 'Night', icon: Moon },
] as const

const DAYS = [{ d: 'Thu', n: 12 }, { d: 'Fri', n: 13 }, { d: 'Sat', n: 14 }, { d: 'Sun', n: 15 }, { d: 'Mon', n: 16 }, { d: 'Tue', n: 17 }, { d: 'Wed', n: 18 }]

export default function DailyMedicineSchedule(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const init = state === 'all-done' ? todaysMeds.map((m) => ({ ...m, status: 'taken' as const })) : state === 'missed-dose' ? todaysMeds.map((m) => (m.id === 'm3' ? { ...m, status: 'missed' as const } : m)) : todaysMeds
  const [meds, setMeds] = useState<Med[]>(init)
  const [acts, setActs] = useState([
    { id: 'a1', title: 'Morning blood pressure check', time: '07:45 AM', icon: Activity, done: true },
    { id: 'a2', title: '30-minute walk', time: '06:00 PM', icon: Footprints, done: false },
    { id: 'a3', title: 'Drink 2 litres of water', time: 'All day', icon: Droplet, done: false },
  ])
  const [day, setDay] = useState(16)
  const [adding, setAdding] = useState(false)
  const done = meds.filter((m) => m.status === 'taken').length
  const pct = Math.round((done / meds.length) * 100)
  const set = (id: string, status: Med['status']) => setMeds((m) => m.map((x) => (x.id === id ? { ...x, status } : x)))

  return (
    <AppShell role="patient" active="p-meds" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title="My health routine"
          subtitle="Your prescribed medicines and personal health activities for the day"
          actions={<><Button variant="secondary" icon={<History className="size-4" />} onClick={() => onNavigate?.('p-med-history')}>History</Button><Button variant="secondary" icon={<Bell className="size-4" />} onClick={() => onNavigate?.('p-reminder')}>Reminders</Button></>}
        />

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {DAYS.map((x) => (
            <button key={x.n} onClick={() => setDay(x.n)} className={cn('flex w-14 shrink-0 flex-col items-center rounded-xl border py-2 text-xs transition-colors duration-150', day === x.n ? 'border-primary bg-primary text-white' : 'border-line bg-white text-muted hover:border-primary')}>
              {x.n === 16 ? 'Today' : x.d}
              <span className={cn('text-lg font-semibold', day === x.n ? 'text-white' : 'text-ink')}>{x.n}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 space-y-6">
            {SLOTS.map(({ key, icon: Icon }) => {
              const items = meds.filter((m) => m.slot === key)
              if (!items.length) return null
              return (
                <section key={key}>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted"><Icon className="size-4" /> {key}</h2>
                  <div className="space-y-3">
                    {items.map((m) => (
                      <article key={m.id} className={cn('rounded-xl border bg-white p-4 sm:p-5', m.status === 'due' ? 'border-warning ring-1 ring-warning/40' : m.status === 'missed' ? 'border-red-200' : 'border-line')}>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <div className="flex min-w-0 flex-1 gap-4">
                            <div className="w-16 shrink-0 text-sm font-semibold text-ink">{m.time}</div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-ink">{m.name}</h3>
                                {m.status === 'due' && <Badge tone="orange">Due now</Badge>}
                                {m.status === 'taken' && <Badge tone="green" dot>Taken</Badge>}
                                {m.status === 'missed' && <Badge tone="red" dot>Missed</Badge>}
                              </div>
                              <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
                                <div><dt className="text-xs text-muted">Dosage</dt><dd className="text-ink">{m.dose}</dd></div>
                                <div><dt className="text-xs text-muted">Frequency</dt><dd className="text-ink">{m.frequency}</dd></div>
                                <div><dt className="text-xs text-muted">Duration</dt><dd className="text-ink">{m.duration}</dd></div>
                              </dl>
                              <p className="mt-2 text-sm text-muted">{m.instructions}</p>
                              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Lock className="size-3" /> Prescribed by {m.doctor} · {m.rx}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-col">
                            {m.status === 'taken' || m.status === 'missed' ? (
                              <Button size="sm" variant="ghost" icon={<Undo2 className="size-4" />} onClick={() => set(m.id, 'due')}>Undo</Button>
                            ) : (
                              <>
                                <Button size="sm" variant="success" icon={<Check className="size-4" />} onClick={() => set(m.id, 'taken')}>Taken</Button>
                                <Button size="sm" variant="secondary" icon={<X className="size-4" />} onClick={() => set(m.id, 'missed')}>Missed</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-0 lg:self-start">
            <Panel className="flex items-center gap-5 p-5">
              <ProgressRing value={pct} size={96} />
              <div>
                <p className="font-semibold text-ink">{pct === 100 ? 'All done for today' : `${meds.length - done} doses to go`}</p>
                <p className="mt-1 text-sm text-muted">{done} of {meds.length} medicines taken</p>
                {meds.some((m) => m.status === 'missed') && <p className="mt-2 text-xs font-medium text-danger">1 missed — don’t double up. Ask your doctor if unsure.</p>}
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center justify-between px-5 pb-2 pt-4">
                <h2 className="text-[15px] font-semibold text-ink">Health activities</h2>
                <Button size="sm" variant="ghost" icon={<Plus className="size-4" />} onClick={() => setAdding(true)}>Add</Button>
              </div>
              <ul className="px-3 pb-3">
                {acts.map((a) => {
                  const I = a.icon
                  return (
                    <li key={a.id}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-canvas">
                        <input type="checkbox" checked={a.done} onChange={() => setActs((l) => l.map((x) => (x.id === a.id ? { ...x, done: !x.done } : x)))} className="size-4 accent-success" />
                        <I className="size-4 text-primary" />
                        <span className="min-w-0 flex-1">
                          <span className={cn('block text-sm', a.done ? 'text-muted line-through' : 'text-ink')}>{a.title}</span>
                          <span className="text-xs text-muted">{a.time}</span>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </Panel>
            <p className="flex gap-2 px-1 text-xs text-muted"><Lock className="mt-px size-3.5 shrink-0" /> Medicine doses come from your prescriptions and can’t be edited here. You can change reminder times.</p>
          </aside>
        </div>
      </div>

      <Modal open={adding} onClose={() => setAdding(false)} title="Add a health activity" size="sm" footer={<><Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button><Button onClick={() => { setActs((l) => [...l, { id: `a${l.length + 1}`, title: 'Stretching routine', time: '08:00 PM', icon: Activity, done: false }]); setAdding(false) }}>Add activity</Button></>}>
        <div className="space-y-4">
          <Field label="Activity"><Input defaultValue="Stretching routine" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Time"><Input type="time" defaultValue="20:00" /></Field>
            <Field label="Repeat"><Select defaultValue="Daily"><option>Daily</option><option>Weekdays</option><option>Once</option></Select></Field>
          </div>
        </div>
      </Modal>
    </AppShell>
  )
}
