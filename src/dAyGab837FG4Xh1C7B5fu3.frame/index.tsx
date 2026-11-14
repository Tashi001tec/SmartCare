import React, { useState } from 'react'
import { FileText, QrCode, Download, Search, Store, ChevronRight, Lock } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Badge, Button, EmptyState, PageHeader, Panel, SecureNote, StatusBadge, Tabs } from '../shared/ui'
import { doctors, prescriptions } from '../shared/data'

export const args = {
  empty: false,
}

export const argTypes = {
  empty: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function MyPrescriptions(props: Props) {
  const { empty, onNavigate } = { ...args, ...props }
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const all = empty ? [] : prescriptions
  const list = all.filter((p) => (tab === 'all' || p.status.toLowerCase() === tab) && (!q || (p.doctor + p.ref + p.items.map((i) => i.name).join()).toLowerCase().includes(q.toLowerCase())))
  const photo = (n: string) => doctors.find((d) => d.name === n)?.photo

  return (
    <AppShell role="patient" active="p-prescriptions" onNavigate={onNavigate}>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="My prescriptions" subtitle={<SecureNote>Only you, the prescribing doctor, and pharmacies you authorise can see these.</SecureNote>} />
        <Panel>
          <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs className="border-0" value={tab} onChange={setTab} items={[{ value: 'all', label: 'All', count: all.length }, { value: 'active', label: 'Active', count: all.filter((p) => p.status === 'Active').length }, { value: 'completed', label: 'Completed', count: all.filter((p) => p.status === 'Completed').length }]} />
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Medicine, doctor or reference" className="h-10 w-full rounded-lg border border-line pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
            </div>
          </div>
          {list.length === 0 ? (
            <EmptyState icon={<FileText className="size-5" />} title={empty ? 'No prescriptions yet' : 'No prescriptions match'} body={empty ? 'When a doctor issues you a digital prescription, it appears here and your medicine reminders are set up automatically.' : 'Try another medicine name or reference.'} />
          ) : (
            <ul className="divide-y divide-line">
              {list.map((p) => (
                <li key={p.ref}>
                  <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                    <button onClick={() => onNavigate?.('p-rx-detail')} className="flex min-w-0 flex-1 items-start gap-4 text-left">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><FileText className="size-5" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-ink">{p.ref}</span>
                          <StatusBadge status={p.status} />
                          {p.sharedWith && <Badge tone="blue"><Store className="size-3" /> {p.sharedWith}</Badge>}
                        </span>
                        <span className="mt-1 block text-sm text-ink">{p.items.map((i) => `${i.name} ${i.dose}`).join(' · ')}</span>
                        <span className="mt-1.5 flex items-center gap-2 text-xs text-muted">
                          <Avatar src={photo(p.doctor)} name={p.doctor} size={20} /> {p.doctor} · {p.specialty} · Issued {p.date}
                        </span>
                      </span>
                      <ChevronRight className="mt-3 size-5 shrink-0 text-slate-300 lg:hidden" />
                    </button>
                    <div className="flex gap-2 lg:shrink-0">
                      <Button size="sm" variant="secondary" icon={<QrCode className="size-4" />} onClick={() => onNavigate?.('p-rx-qr')}>QR code</Button>
                      <Button size="sm" variant="ghost" icon={<Download className="size-4" />}>PDF</Button>
                      <Button size="sm" variant="soft" onClick={() => onNavigate?.('p-rx-detail')}>Details</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted"><Lock className="size-3.5" /> Prescribed doses can only be changed by the prescribing doctor.</p>
      </div>
    </AppShell>
  )
}
