import React, { useState } from 'react'
import { FilePlus2, MessageSquare, CalendarPlus, AlertTriangle, Phone, Mail, Lock } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, BackLink, Badge, Button, Panel, StatusBadge, Tabs } from '../shared/ui'
import { appointments, patient, prescriptions } from '../shared/data'

export const args = {
  tab: 'overview',
}

export const argTypes = {
  tab: { control: 'radio', options: ['overview', 'medications', 'prescriptions', 'appointments'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const VITALS = [
  { l: 'Blood pressure', v: '138/86', u: 'mmHg', note: '↓ from 148/92', ok: false },
  { l: 'Heart rate', v: '72', u: 'bpm', note: 'Normal', ok: true },
  { l: 'HbA1c', v: '6.8', u: '%', note: '28 May', ok: true },
  { l: 'LDL', v: '3.6', u: 'mmol/L', note: 'Above target', ok: false },
]

export default function PatientDetails(props: Props) {
  const { tab: t0, onNavigate } = { ...args, ...props }
  const [tab, setTab] = useState(t0)
  const mine = appointments.filter((a) => a.doctor === 'Dr. Kwame Adebayo')

  return (
    <AppShell role="doctor" active="d-patients" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <BackLink label="My patients" onClick={() => onNavigate?.('d-patients')} />
        <Panel className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Avatar initials="MT" size={64} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold text-ink">{patient.name}</h1>
                  <StatusBadge status="Monitoring" />
                </div>
                <p className="text-sm text-muted">{patient.id} · {patient.age} yrs · {patient.gender} · Blood {patient.blood}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone="red"><AlertTriangle className="size-3" /> Penicillin allergy</Badge>
                  {patient.conditions.map((c) => <Badge key={c}>{c}</Badge>)}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button icon={<FilePlus2 className="size-4" />} onClick={() => onNavigate?.('d-rx-create')}>New prescription</Button>
              <Button variant="secondary" icon={<MessageSquare className="size-4" />} onClick={() => onNavigate?.('d-messages')}>Message</Button>
              <Button variant="secondary" icon={<CalendarPlus className="size-4" />} onClick={() => onNavigate?.('d-appointments')}>Schedule</Button>
            </div>
          </div>
        </Panel>

        <Tabs className="mt-6" value={tab} onChange={setTab} items={[{ value: 'overview', label: 'Overview' }, { value: 'medications', label: 'Current medication', count: 4 }, { value: 'prescriptions', label: 'Prescriptions', count: 2 }, { value: 'appointments', label: 'Appointments', count: mine.length }]} />

        <div className="mt-6">
          {tab === 'overview' && (
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-6">
                <Panel className="p-5">
                  <h2 className="text-[15px] font-semibold text-ink">Latest readings</h2>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                    {VITALS.map((v) => (
                      <div key={v.l}>
                        <dt className="text-xs text-muted">{v.l}</dt>
                        <dd className="mt-1 text-2xl font-semibold text-ink">{v.v}<span className="ml-1 text-xs font-normal text-muted">{v.u}</span></dd>
                        <p className={v.ok ? 'text-xs text-success' : 'text-xs text-warning-ink'}>{v.note}</p>
                      </div>
                    ))}
                  </dl>
                </Panel>
                <Panel className="p-5">
                  <h2 className="text-[15px] font-semibold text-ink">Relevant medical history</h2>
                  <ol className="mt-4 space-y-4 border-l border-line pl-5">
                    {[
                      ['12 Jun 2025', 'Cardiology consultation', 'Chest tightness on exertion. ECG: sinus rhythm, no acute changes. Started Amlodipine 5 mg and Atorvastatin 20 mg.'],
                      ['28 May 2025', 'Endocrinology review (Dr. Priya Sharma)', 'HbA1c 6.8%. Metformin continued.'],
                      ['2019', 'Diagnosed type 2 diabetes', 'Managed with Metformin and diet.'],
                      ['2017', 'Diagnosed hypertension', 'Lifestyle changes; medication started 2025.'],
                    ].map(([d, t, b]) => (
                      <li key={t} className="relative">
                        <span className="absolute -left-[25px] top-1.5 size-2.5 rounded-full border-2 border-white bg-primary" />
                        <p className="text-xs text-muted">{d}</p>
                        <p className="text-sm font-semibold text-ink">{t}</p>
                        <p className="mt-0.5 text-sm text-slate-600">{b}</p>
                      </li>
                    ))}
                  </ol>
                </Panel>
              </div>
              <div className="space-y-6">
                <Panel className="p-5">
                  <h2 className="text-[15px] font-semibold text-ink">Medication adherence</h2>
                  <p className="mt-2 text-3xl font-semibold text-ink">92%</p>
                  <p className="text-sm text-muted">Last 14 days · 5 of 70 doses missed</p>
                  <p className="mt-3 text-xs text-muted">Shared by the patient from their medication tracker.</p>
                </Panel>
                <Panel className="p-5">
                  <h2 className="text-[15px] font-semibold text-ink">Contact</h2>
                  <ul className="mt-3 space-y-2 text-sm text-ink">
                    <li className="flex items-center gap-2"><Phone className="size-4 text-muted" /> {patient.phone}</li>
                    <li className="flex items-center gap-2"><Mail className="size-4 text-muted" /> {patient.email}</li>
                    <li className="text-muted">Emergency: {patient.emergency.name} ({patient.emergency.relation}) · {patient.emergency.phone}</li>
                  </ul>
                </Panel>
                <p className="flex items-start gap-2 text-xs text-muted"><Lock className="mt-px size-3.5 shrink-0 text-success" /> You can see this record because Michael is under your care. Every view is logged.</p>
              </div>
            </div>
          )}

          {tab === 'medications' && (
            <Panel>
              <ul className="divide-y divide-line">
                {[
                  ['Amlodipine 5 mg', 'Once daily · morning', 'Dr. Kwame Adebayo', true],
                  ['Atorvastatin 20 mg', 'Once daily · bedtime', 'Dr. Kwame Adebayo', true],
                  ['Aspirin 75 mg', 'Once daily · after lunch', 'Dr. Kwame Adebayo', true],
                  ['Metformin 500 mg', 'Twice daily · with meals', 'Dr. Priya Sharma', false],
                ].map(([n, f, d, mine]) => (
                  <li key={n as string} className="flex items-center gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{n as string}</p><p className="text-sm text-muted">{f as string} · Prescribed by {d as string}</p></div>
                    {mine ? <Button size="sm" variant="secondary" onClick={() => onNavigate?.('d-rx-create')}>Adjust</Button> : <Badge>Other provider</Badge>}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {tab === 'prescriptions' && (
            <Panel>
              <ul className="divide-y divide-line">
                {prescriptions.slice(0, 2).map((p) => (
                  <li key={p.ref} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">{p.ref} <span className="font-normal text-muted">· {p.date}</span></p>
                      <p className="text-sm text-muted">{p.items.map((i) => `${i.name} ${i.dose}`).join(', ')} · {p.doctor}</p>
                    </div>
                    {p.doctor === 'Dr. Kwame Adebayo' ? <Button size="sm" variant="secondary" onClick={() => onNavigate?.('d-rx-history')}>Open</Button> : <span className="flex items-center gap-1 text-xs text-muted"><Lock className="size-3" /> Summary only</span>}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {tab === 'appointments' && (
            <Panel>
              <ul className="divide-y divide-line">
                {mine.map((a) => (
                  <li key={a.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{a.date} · {a.time}</p><p className="text-sm text-muted">{a.type} · {a.reason}</p></div>
                    <StatusBadge status={a.status} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      </div>
    </AppShell>
  )
}
