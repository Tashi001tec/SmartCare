import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, Send, Download, CheckCircle2, AlertTriangle, Lock, Bell } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, BackLink, Badge, Button, Field, Input, Modal, Panel, Select, Textarea } from '../shared/ui'
import { QRCode } from '../shared/widgets'
import { docPatients } from '../shared/data'

export const args = {
  state: 'draft',
}

export const argTypes = {
  state: { control: 'radio', options: ['draft', 'errors', 'issued'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

type Row = { name: string; dose: string; frequency: string; duration: string; instructions: string }
const START: Row[] = [
  { name: 'Amlodipine', dose: '5 mg', frequency: 'Once daily · morning', duration: '90 days', instructions: 'With or without food' },
  { name: 'Atorvastatin', dose: '20 mg', frequency: 'Once daily · bedtime', duration: '90 days', instructions: 'Avoid grapefruit juice' },
  { name: 'Aspirin (low dose)', dose: '75 mg', frequency: 'Once daily · after lunch', duration: '90 days', instructions: 'Take after food' },
]

export default function CreatePrescription(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [rows, setRows] = useState<Row[]>(state === 'errors' ? [...START.slice(0, 2), { name: 'Amoxicillin', dose: '', frequency: '', duration: '7 days', instructions: '' }] : START)
  const [patientId, setPatientId] = useState('PT-204871')
  const [notes, setNotes] = useState('Essential hypertension (stage 1), elevated LDL cholesterol. Review BP log in 2 weeks.')
  const [touched, setTouched] = useState(state === 'errors')
  const [confirm, setConfirm] = useState(false)
  const [issued, setIssued] = useState(state === 'issued')
  const [savedDraft, setSavedDraft] = useState(false)
  const p = docPatients.find((x) => x.id === patientId)!
  const incomplete = rows.some((r) => !r.name || !r.dose || !r.frequency || !r.duration)
  const allergy = patientId === 'PT-204871' && rows.some((r) => /amoxi|penicil/i.test(r.name))
  const set = (i: number, k: keyof Row, v: string) => setRows((l) => l.map((r, j) => (j === i ? { ...r, [k]: v } : r)))

  if (issued) {
    return (
      <AppShell role="doctor" active="d-rx-history" onNavigate={onNavigate}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} className="mx-auto max-w-2xl">
          <Panel className="overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line bg-success-soft px-6 py-4">
              <CheckCircle2 className="size-6 text-success" />
              <div><h1 className="font-semibold text-ink">Prescription issued</h1><p className="text-sm text-green-800">Michael Thompson has been notified in the app.</p></div>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted">Reference</dt><dd className="text-lg font-semibold text-ink">RX-2025-08417</dd></div>
                <div><dt className="text-muted">Patient</dt><dd className="font-medium text-ink">{p.name} · {p.id}</dd></div>
                <div><dt className="text-muted">Issued</dt><dd className="font-medium text-ink">16 Jun 2025, 11:42 AM</dd></div>
                <div><dt className="text-muted">Medicines</dt><dd className="font-medium text-ink">{rows.map((r) => `${r.name} ${r.dose}`).join(', ')}</dd></div>
              </dl>
              <div className="text-center">
                <div className="rounded-xl border border-line p-3"><QRCode value="RX-2025-08417" size={140} /></div>
                <p className="mt-2 text-xs text-muted">Secure reference only</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-line p-4 sm:flex-row sm:justify-end">
              <Button variant="secondary" icon={<Download className="size-4" />}>Download PDF</Button>
              <Button variant="secondary" onClick={() => onNavigate?.('d-rx-history')}>Prescription history</Button>
              <Button onClick={() => onNavigate?.('d-dashboard')}>Back to dashboard</Button>
            </div>
          </Panel>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted"><Lock className="size-3.5" /> Issued prescriptions can’t be edited. Issue a new one to change a dose.</p>
        </motion.div>
      </AppShell>
    )
  }

  return (
    <AppShell role="doctor" active="d-rx-history" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <BackLink label="Prescriptions" onClick={() => onNavigate?.('d-rx-history')} />
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex items-center gap-3"><h1 className="text-2xl font-semibold tracking-tight text-ink">New prescription</h1><Badge>Draft</Badge></div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<Save className="size-4" />} onClick={() => setSavedDraft(true)}>Save draft</Button>
            <Button icon={<Send className="size-4" />} onClick={() => { setTouched(true); if (!incomplete && !allergy) setConfirm(true) }}>Issue prescription</Button>
          </div>
        </div>
        {savedDraft && <Alert tone="success" className="mb-4" title="Draft saved · 11:40 AM">Drafts are visible only to you until issued.</Alert>}
        {touched && incomplete && <Alert tone="danger" className="mb-4" title="Complete every medicine row before issuing">Dosage, frequency and duration are required.</Alert>}
        {allergy && <Alert tone="danger" className="mb-4" title="Allergy alert: Penicillin">Michael Thompson has a recorded penicillin allergy. Amoxicillin is a penicillin-class antibiotic.</Alert>}

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 space-y-6">
            <Panel className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Patient" required hint="Only patients under your care are listed">
                  <Select value={patientId} onChange={(e) => setPatientId(e.target.value)}>{docPatients.map((x) => <option key={x.id} value={x.id}>{x.name} · {x.id}</option>)}</Select>
                </Field>
                <Field label="Prescription date" required><Input type="date" defaultValue="2025-06-16" /></Field>
              </div>
              <Field label="Diagnosis / clinical notes" className="mt-4"><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
            </Panel>

            <Panel>
              <div className="flex items-center justify-between px-5 pb-2 pt-4">
                <h2 className="text-[15px] font-semibold text-ink">Medicines</h2>
                <Button size="sm" variant="soft" icon={<Plus className="size-4" />} onClick={() => setRows((l) => [...l, { name: '', dose: '', frequency: '', duration: '', instructions: '' }])}>Add medicine</Button>
              </div>
              <ol className="divide-y divide-line">
                {rows.map((r, i) => {
                  const bad = (v: string) => touched && !v
                  return (
                    <li key={i} className="grid gap-3 px-5 py-4 sm:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_1.3fr_0.8fr_auto]">
                      <Field label={`Medicine ${i + 1}`} error={bad(r.name) ? 'Required' : undefined}><Input value={r.name} invalid={bad(r.name)} placeholder="Search medicine" onChange={(e) => set(i, 'name', e.target.value)} /></Field>
                      <Field label="Dosage" error={bad(r.dose) ? 'Required' : undefined}><Input value={r.dose} invalid={bad(r.dose)} placeholder="e.g. 500 mg" onChange={(e) => set(i, 'dose', e.target.value)} /></Field>
                      <Field label="Frequency" error={bad(r.frequency) ? 'Required' : undefined}>
                        <Select value={r.frequency} invalid={bad(r.frequency)} onChange={(e) => set(i, 'frequency', e.target.value)}>
                          <option value="">Select</option>
                          {['Once daily · morning', 'Once daily · bedtime', 'Once daily · after lunch', 'Twice daily · with meals', 'Three times daily', 'As needed'].map((f) => <option key={f}>{f}</option>)}
                        </Select>
                      </Field>
                      <Field label="Duration" error={bad(r.duration) ? 'Required' : undefined}><Input value={r.duration} invalid={bad(r.duration)} placeholder="e.g. 30 days" onChange={(e) => set(i, 'duration', e.target.value)} /></Field>
                      <div className="flex items-end">
                        <button aria-label={`Remove medicine ${i + 1}`} onClick={() => setRows((l) => l.filter((_, j) => j !== i))} disabled={rows.length === 1} className="mb-0.5 rounded-md p-2.5 text-muted hover:bg-canvas hover:text-danger disabled:opacity-30"><Trash2 className="size-4" /></button>
                      </div>
                      <Field label="Instructions" className="sm:col-span-2 xl:col-span-5"><Input value={r.instructions} placeholder="e.g. Take after food" onChange={(e) => set(i, 'instructions', e.target.value)} /></Field>
                    </li>
                  )
                })}
              </ol>
            </Panel>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-0 lg:self-start">
            <Panel className="p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={p.initials} size={44} />
                <div><p className="font-semibold text-ink">{p.name}</p><p className="text-xs text-muted">{p.age} yrs · {p.gender} · {p.id}</p></div>
              </div>
              {patientId === 'PT-204871' && (
                <>
                  <p className="mt-4 flex items-center gap-1.5 rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger"><AlertTriangle className="size-4" /> Allergy: Penicillin</p>
                  <h3 className="mt-4 text-xs font-semibold text-muted">Also taking</h3>
                  <p className="mt-1 text-sm text-ink">Metformin 500 mg twice daily <span className="text-muted">(Dr. Priya Sharma)</span></p>
                </>
              )}
              <h3 className="mt-4 text-xs font-semibold text-muted">Condition</h3>
              <p className="mt-1 text-sm text-ink">{p.condition}</p>
            </Panel>
            <p className="flex gap-2 text-xs text-muted"><Bell className="mt-px size-3.5 shrink-0" /> When issued, the patient gets a notification, a QR reference and automatic medicine reminders.</p>
          </aside>
        </div>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Issue this prescription?" footer={<><Button variant="secondary" onClick={() => setConfirm(false)}>Keep editing</Button><Button icon={<Send className="size-4" />} onClick={() => { setConfirm(false); setIssued(true) }}>Sign and issue</Button></>}>
        <div className="space-y-3 text-sm">
          <p className="text-muted">You’re issuing {rows.length} medicines to <strong className="font-semibold text-ink">{p.name}</strong>. Once issued it’s signed with your registration MC-CA-A118842 and can’t be edited.</p>
          <ul className="divide-y divide-line rounded-lg border border-line">
            {rows.map((r) => <li key={r.name} className="flex justify-between gap-3 px-3 py-2"><span className="font-medium text-ink">{r.name} {r.dose}</span><span className="text-muted">{r.frequency} · {r.duration}</span></li>)}
          </ul>
        </div>
      </Modal>
    </AppShell>
  )
}
