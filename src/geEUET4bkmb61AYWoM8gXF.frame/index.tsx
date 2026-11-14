import React, { useState } from 'react'
import { Search, ChevronRight, Users, Lock, Filter } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Button, EmptyState, PageHeader, Panel, Select, StatusBadge } from '../shared/ui'
import { docPatients } from '../shared/data'

export const args = {
  query: '',
}

export const argTypes = {
  query: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function DoctorPatientList(props: Props) {
  const { query, onNavigate } = { ...args, ...props }
  const [q, setQ] = useState(query)
  const [status, setStatus] = useState('All statuses')
  const list = docPatients.filter((p) => (!q || (p.name + p.id + p.condition).toLowerCase().includes(q.toLowerCase())) && (status === 'All statuses' || p.status === status))

  return (
    <AppShell role="doctor" active="d-patients" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="My patients" subtitle={<span className="flex items-center gap-1.5"><Lock className="size-3.5 text-success" /> Patients who have booked with you or been referred to you. 248 authorised.</span>} />
        <Panel>
          <div className="flex flex-col gap-2 border-b border-line p-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, patient ID or condition" className="h-11 w-full rounded-lg border border-line pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
            </div>
            <Select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48">{['All statuses', 'Stable', 'Monitoring', 'New'].map((s) => <option key={s}>{s}</option>)}</Select>
            <Button variant="secondary" size="lg" className="h-11" icon={<Filter className="size-4" />}>More</Button>
          </div>
          {list.length === 0 ? (
            <EmptyState icon={<Users className="size-5" />} title="No patients found" body="Only patients under your care appear here. Check the spelling or patient ID." />
          ) : (
            <>
              <table className="hidden w-full text-sm md:table">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-muted">
                    <th className="px-5 py-3 font-medium">Patient</th>
                    <th className="px-5 py-3 font-medium">Primary condition</th>
                    <th className="px-5 py-3 font-medium">Last visit</th>
                    <th className="px-5 py-3 font-medium">Next visit</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {list.map((p) => (
                    <tr key={p.id} onClick={() => onNavigate?.('d-patient')} className="cursor-pointer transition-colors duration-150 hover:bg-canvas">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar initials={p.initials} size={36} />
                          <div><p className="font-semibold text-ink">{p.name}</p><p className="text-xs text-muted">{p.id} · {p.age} {p.gender}</p></div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-ink">{p.condition}</td>
                      <td className="px-5 py-3.5 text-muted">{p.lastVisit}</td>
                      <td className="px-5 py-3.5 text-ink">{p.nextVisit}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                      <td className="pr-4"><ChevronRight className="size-4 text-slate-300" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="divide-y divide-line md:hidden">
                {list.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => onNavigate?.('d-patient')} className="flex w-full items-center gap-3 p-4 text-left">
                      <Avatar initials={p.initials} size={40} />
                      <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{p.name}</p><p className="text-xs text-muted">{p.condition} · next {p.nextVisit}</p></div>
                      <StatusBadge status={p.status} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex items-center justify-between border-t border-line px-5 py-3 text-sm text-muted">
            <span>Showing {list.length} of 248</span>
            <div className="flex gap-2"><Button size="sm" variant="secondary" disabled>Previous</Button><Button size="sm" variant="secondary">Next</Button></div>
          </div>
        </Panel>
      </div>
    </AppShell>
  )
}
