import React, { useState } from 'react'
import { ArrowLeft, Download, Lock, Sun, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Button, Panel } from '../shared/ui'
import { QRCode } from '../shared/widgets'
import { prescriptions } from '../shared/data'

export const args = {
  reference: 'RX-2025-08417',
}

export const argTypes = {
  reference: { control: 'select', options: ['RX-2025-08417', 'RX-2025-08102', 'RX-2025-06231'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PrescriptionQR(props: Props) {
  const { reference, onNavigate } = { ...args, ...props }
  const p = prescriptions.find((x) => x.ref === reference) ?? prescriptions[0]
  const [details, setDetails] = useState(false)

  return (
    <AppShell role="patient" active="p-prescriptions" onNavigate={onNavigate}>
      <div className="mx-auto max-w-md">
        <button onClick={() => onNavigate?.('p-rx-detail')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <ArrowLeft className="size-4" /> Prescription details
        </button>
        <Panel className="overflow-hidden text-center">
          <div className="bg-primary-dark px-6 py-5 text-white">
            <p className="text-sm text-blue-200">Show this at the pharmacy counter</p>
            <p className="mt-1 text-xl font-semibold tracking-wide">{p.ref}</p>
          </div>
          <div className="px-6 py-8">
            <div className="mx-auto w-fit rounded-2xl border border-line p-4">
              <QRCode value={p.ref} size={240} />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted"><Sun className="size-3.5" /> Turn up your screen brightness for scanning</p>
            <div className="mt-6 rounded-xl bg-canvas p-4 text-left">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck className="size-4 text-success" /> What this code contains</p>
              <p className="mt-1 text-sm text-muted">A one-time secure reference. A pharmacy can only open the prescription if you’ve authorised them — scanning alone reveals nothing.</p>
            </div>
            <button onClick={() => setDetails(!details)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary" aria-expanded={details}>
              {details ? <EyeOff className="size-4" /> : <Eye className="size-4" />} {details ? 'Hide' : 'Show'} prescription summary
            </button>
            {details && (
              <ul className="mt-3 divide-y divide-line rounded-xl border border-line text-left text-sm">
                {p.items.map((i) => (
                  <li key={i.name} className="flex justify-between gap-3 px-4 py-3"><span className="font-medium text-ink">{i.name} {i.dose}</span><span className="text-muted">Qty {i.qty}</span></li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
            <Button variant="secondary" icon={<Download className="size-4" />}>PDF</Button>
            <Button onClick={() => onNavigate?.('p-rx-detail')}>Share with pharmacy</Button>
          </div>
        </Panel>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted"><Lock className="size-3.5" /> Reference expires when the prescription is fully dispensed</p>
      </div>
    </AppShell>
  )
}
