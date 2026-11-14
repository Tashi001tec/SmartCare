import React, { useState } from 'react'
import { FilePlus2, Search, Download, QrCode, Pencil, Store } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, Button, Modal, PageHeader, Panel, StatusBadge, Tabs } from '../shared/ui'
import { QRCode } from '../shared/widgets'

export const args = {
  tab: 'all',
}

export const argTypes = {
  tab: { control: 'radio', options: ['all', 'issued', 'draft'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const RX = [
  { ref: 'RX-2025-08417', patient: 'Michael Thompson', initials: 'MT', date: '12 Jun 2025', items: 'Amlodipine 5 mg, Atorvastatin 20 mg, Aspirin 75 mg', status: 'Active', pharmacy: 'CityCare Pharmacy · Accepted' },
  { ref: 'DRAFT-0041', patient: 'Daniel Novak', initials: 'DN', date: 'Saved 16 Jun', items: 'Glyceryl trinitrate spray 400 mcg', status: 'Draft', pharmacy: '' },
  { ref: 'RX-2025-08390', patient: 'Grace Okonkwo', initials: 'GO', date: '10 Jun 2025', items: 'Apixaban 5 mg, Bisoprolol 2.5 mg', status: 'Active', pharmacy: 'CityCare Pharmacy · Pending' },
  { ref: 'RX-2025-08270', patient: 'Fatima Al-Sayed', initials: 'FA', date: '05 Jun 2025', items: 'Sacubitril/valsartan 49/51 mg, Furosemide 40 mg', status: 'Active', pharmacy: 'CityCare Pharmacy · Ready' },
  { ref: 'RX-2025-08044', patient: 'Robert Hughes', initials: 'RH', date: '26 May 2025', items: 'Clopidogrel 75 mg, Rosuvastatin 10 mg', status: 'Completed', pharmacy: 'CityCare Pharmacy · Collected' },
  { ref: 'RX-2025-07112', patient: 'Henry Walsh', initials: 'HW', date: '21 Feb 2025', items: 'Lisinopril 10 mg', status: 'Expired', pharmacy: 'MedPlus Pharmacy · Collected' },
]

export default function PrescriptionHistory(props: Props) {
  const { tab: t0, onNavigate } = { ...args, ...props }
  const [tab, setTab] = useState(t0)
  const [q, setQ] = useState('')
  const [qr, setQr] = useState<string | null>(null)
  const list = RX.filter((r) => (tab === 'all' || (tab === 'draft' ? r.status === 'Draft' : r.status !== 'Draft')) && (!q || (r.ref + r.patient + r.items).toLowerCase().includes(q.toLowerCase())))

  return (
    <AppShell role="doctor" active="d-rx-history" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Prescriptions" subtitle="Everything you’ve issued, plus drafts in progress" actions={<Button icon={<FilePlus2 className="size-4" />} onClick={() => onNavigate?.('d-rx-create')}>New prescription</Button>} />
        <Panel>
          <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs className="border-0" value={tab} onChange={setTab} items={[{ value: 'all', label: 'All', count: RX.length }, { value: 'issued', label: 'Issued', count: RX.filter((r) => r.status !== 'Draft').length }, { value: 'draft', label: 'Drafts', count: 1 }]} />
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Reference, patient or medicine" className="h-10 w-full rounded-lg border border-line pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {list.map((r) => (
              <li key={r.ref} className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <Avatar initials={r.initials} size={40} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-ink">{r.patient}</p><StatusBadge status={r.status} /></div>
                    <p className="text-sm text-ink">{r.items}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted"><span>{r.ref} · {r.date}</span>{r.pharmacy && <span className="flex items-center gap-1"><Store className="size-3" /> {r.pharmacy}</span>}</p>
                  </div>
                </div>
                <div className="flex gap-2 lg:shrink-0">
                  {r.status === 'Draft' ? (
                    <Button size="sm" icon={<Pencil className="size-4" />} onClick={() => onNavigate?.('d-rx-create')}>Continue draft</Button>
                  ) : (
                    <>
                      <Button size="sm" variant="secondary" icon={<QrCode className="size-4" />} onClick={() => setQr(r.ref)}>QR</Button>
                      <Button size="sm" variant="ghost" icon={<Download className="size-4" />}>PDF</Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Modal open={!!qr} onClose={() => setQr(null)} title={qr ?? ''} size="sm">
        <div className="text-center">
          <div className="mx-auto w-fit rounded-xl border border-line p-3"><QRCode value={qr ?? ''} size={200} /></div>
          <p className="mt-3 text-sm text-muted">Encodes a secure reference. Pharmacies can open it only after the patient authorises them.</p>
        </div>
      </Modal>
    </AppShell>
  )
}
