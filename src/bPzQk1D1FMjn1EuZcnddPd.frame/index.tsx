import React, { useState } from 'react'
import { Download, Share2, QrCode, Store, Lock, Check, BadgeCheck, Bell, ShieldCheck, Clock } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, BackLink, Badge, Button, Modal, Panel, StatusBadge, cn } from '../shared/ui'
import { QRCode } from '../shared/widgets'
import { IMG, patient, pharmacies, prescriptions } from '../shared/data'

export const args = {
  shared: false,
}

export const argTypes = {
  shared: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PrescriptionDetails(props: Props) {
  const { shared: s0, onNavigate } = { ...args, ...props }
  const p = prescriptions[0]
  const [shared, setShared] = useState(s0)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'pick' | 'confirm'>('pick')
  const [pharm, setPharm] = useState('citycare')
  const ph = pharmacies.find((x) => x.id === pharm)!

  return (
    <AppShell role="patient" active="p-prescriptions" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <BackLink label="My prescriptions" onClick={() => onNavigate?.('p-prescriptions')} />
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-ink">Prescription {p.ref}</h1>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-1 text-sm text-muted">Issued {p.date} · Valid for 90 days</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" icon={<Download className="size-4" />}>Download PDF</Button>
            <Button icon={<Share2 className="size-4" />} onClick={() => { setStep('pick'); setOpen(true) }}>{shared ? 'Share with another pharmacy' : 'Share with pharmacy'}</Button>
          </div>
        </div>

        {shared && (
          <Alert tone="success" className="mb-6" title={`Shared with ${ph.name}`}>
            They can now view this prescription and prepare your order. You’ll get a notification when it’s accepted. <button className="font-semibold underline" onClick={() => setShared(false)}>Revoke access</button>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <Panel className="overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-line bg-canvas p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={IMG.doctorM} name={p.doctor} size={44} />
                <div>
                  <p className="flex items-center gap-1.5 font-semibold text-ink">{p.doctor} <BadgeCheck className="size-4 text-primary" /></p>
                  <p className="text-sm text-muted">{p.specialty} · {p.hospital}</p>
                </div>
              </div>
              <div className="text-sm sm:text-right">
                <p className="text-muted">Patient</p>
                <p className="font-medium text-ink">{patient.name} · {patient.id}</p>
              </div>
            </div>
            <div className="border-b border-line p-5">
              <p className="text-xs font-medium text-muted">Diagnosis / clinical notes</p>
              <p className="mt-1 text-sm text-ink">{p.diagnosis}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-muted">
                    <th className="px-5 py-3 font-medium">Medicine</th>
                    <th className="px-5 py-3 font-medium">Dosage</th>
                    <th className="px-5 py-3 font-medium">Frequency</th>
                    <th className="px-5 py-3 font-medium">Duration</th>
                    <th className="px-5 py-3 font-medium">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {p.items.map((i) => (
                    <tr key={i.name}>
                      <td className="px-5 py-4 font-semibold text-ink">{i.name}<span className="block text-xs font-normal text-muted">Qty {i.qty}</span></td>
                      <td className="px-5 py-4 text-ink">{i.dose}</td>
                      <td className="px-5 py-4 text-ink">{i.frequency}</td>
                      <td className="px-5 py-4 text-ink">{i.duration}</td>
                      <td className="px-5 py-4 text-muted">{i.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-muted"><Lock className="size-3.5" /> Dosages are locked. Contact {p.doctor} to request a change.</p>
              <Button variant="soft" size="sm" icon={<Bell className="size-4" />} onClick={() => onNavigate?.('p-meds')}>See in medicine schedule</Button>
            </div>
          </Panel>

          <aside className="space-y-6">
            <Panel className="p-5 text-center">
              <div className="mx-auto w-fit rounded-xl border border-line p-3"><QRCode value={p.ref} size={160} /></div>
              <p className="mt-3 text-sm font-semibold text-ink">{p.ref}</p>
              <p className="mt-1 text-xs text-muted">Contains a secure reference only — no medical information.</p>
              <Button variant="secondary" size="sm" className="mt-4 w-full" icon={<QrCode className="size-4" />} onClick={() => onNavigate?.('p-rx-qr')}>Show full screen</Button>
            </Panel>
            <Panel className="p-5">
              <h2 className="text-sm font-semibold text-ink">Access log</h2>
              <ul className="mt-3 space-y-3 text-xs">
                <li className="flex gap-2"><Check className="mt-px size-3.5 text-success" /><span className="text-muted"><strong className="font-medium text-ink">Issued</strong> by Dr. Kwame Adebayo · 12 Jun, 4:20 PM</span></li>
                <li className="flex gap-2"><Check className="mt-px size-3.5 text-success" /><span className="text-muted"><strong className="font-medium text-ink">Viewed</strong> by you · 12 Jun, 6:02 PM</span></li>
                {shared && <li className="flex gap-2"><Store className="mt-px size-3.5 text-primary" /><span className="text-muted"><strong className="font-medium text-ink">Shared</strong> with {ph.name} · just now</span></li>}
              </ul>
            </Panel>
          </aside>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={step === 'pick' ? 'Share with a pharmacy' : 'Confirm sharing'}
        footer={
          step === 'pick' ? (
            <><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setStep('confirm')}>Continue</Button></>
          ) : (
            <><Button variant="secondary" onClick={() => setStep('pick')}>Back</Button><Button icon={<ShieldCheck className="size-4" />} onClick={() => { setShared(true); setOpen(false) }}>Authorise and share</Button></>
          )
        }
      >
        {step === 'pick' ? (
          <div role="radiogroup" className="space-y-2">
            <p className="mb-3 text-sm text-muted">Only verified pharmacies are listed.</p>
            {pharmacies.map((x) => (
              <button key={x.id} role="radio" aria-checked={pharm === x.id} onClick={() => setPharm(x.id)} className={cn('flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors duration-150', pharm === x.id ? 'border-primary bg-primary-soft/60' : 'border-line hover:border-slate-300')}>
                <span className="grid size-10 place-items-center rounded-lg bg-success-soft text-success"><Store className="size-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-semibold text-ink">{x.name} <Badge tone="green">Verified</Badge></span>
                  <span className="block text-xs text-muted">{x.address}</span>
                  <span className="flex items-center gap-1 text-xs text-muted"><Clock className="size-3" /> {x.hours}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <p className="text-ink"><strong className="font-semibold">{ph.name}</strong> will be able to see:</p>
            <ul className="space-y-1.5 text-muted">
              <li className="flex gap-2"><Check className="size-4 text-success" /> Your name and patient ID</li>
              <li className="flex gap-2"><Check className="size-4 text-success" /> The 3 medicines on {p.ref}, with doses and instructions</li>
              <li className="flex gap-2"><Check className="size-4 text-success" /> The prescribing doctor</li>
            </ul>
            <p className="text-muted">They won’t see your other prescriptions, diagnosis notes or medical history. You can revoke access at any time.</p>
          </div>
        )}
      </Modal>
    </AppShell>
  )
}
