import React, { useState } from 'react'
import { ArrowLeft, Upload, Check, X, Loader2, ShieldCheck } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Badge, Button, Field, Input, Select, cn } from '../shared/ui'
import { IMG } from '../shared/data'

export const args = {
  step: 1,
}

export const argTypes = {
  step: { control: 'radio', options: [1, 2, 3, 4] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const STEPS = ['Personal', 'Credentials', 'Practice', 'Review']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DoctorRegistration(props: Props) {
  const { step: initial, onNavigate } = { ...args, ...props }
  const [step, setStep] = useState(Number(initial))
  const [photo, setPhoto] = useState(initial > 1)
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const [conds, setConds] = useState(['Hypertension', 'Heart failure', 'Arrhythmia'])
  const [cond, setCond] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <AuthLayout onNavigate={onNavigate} wide>
      <button onClick={() => (step > 1 ? setStep(step - 1) : onNavigate?.('role-select'))} className="mb-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> {step > 1 ? 'Back' : 'Change account type'}
      </button>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Register as a doctor</h1>
      <p className="mt-1.5 text-sm text-muted">Your profile goes live once an administrator verifies your medical registration.</p>

      <ol className="mt-7 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const n = i + 1
          const done = n < step
          const on = n === step
          return (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span className={cn('grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold', done ? 'bg-success text-white' : on ? 'bg-primary text-white' : 'bg-slate-100 text-muted')}>{done ? <Check className="size-4" /> : n}</span>
              <span className={cn('hidden text-sm font-medium sm:inline', on ? 'text-ink' : 'text-muted')}>{s}</span>
              {n < STEPS.length && <span className={cn('h-px flex-1', done ? 'bg-success' : 'bg-line')} />}
            </li>
          )
        })}
      </ol>

      <div className="mt-8 space-y-5">
        {step === 1 && (
          <>
            <div className="flex items-center gap-5">
              {photo ? <img src={IMG.doctorM} alt="" className="size-20 rounded-full object-cover" /> : <span className="grid size-20 place-items-center rounded-full bg-slate-100 text-muted"><Upload className="size-6" /></span>}
              <div>
                <Button variant="secondary" size="sm" type="button" onClick={() => setPhoto(true)}>{photo ? 'Replace photo' : 'Upload profile photo'}</Button>
                <p className="mt-1.5 text-xs text-muted">A clear, professional headshot. JPG or PNG, max 5 MB.</p>
              </div>
            </div>
            <Field label="Full name" required><Input defaultValue="Kwame Adebayo" /></Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" required><Input type="email" defaultValue="k.adebayo@stmarys.org" /></Field>
              <Field label="Phone" required><Input type="tel" defaultValue="+1 (555) 300-1244" /></Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Password" required hint="At least 10 characters"><Input type="password" defaultValue="Cardio#Heart25" /></Field>
              <Field label="Confirm password" required><Input type="password" defaultValue="Cardio#Heart25" /></Field>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Medical registration number" required hint="As shown on your medical council certificate"><Input defaultValue="MC-CA-A118842" /></Field>
            <Field label="Qualifications" required><Input defaultValue="MBBS, MD (Cardiology), FACC" /></Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Specialization" required>
                <Select defaultValue="Cardiology"><option>Cardiology</option><option>Endocrinology</option><option>General Medicine</option><option>Neurology</option><option>Orthopedics</option><option>Dermatology</option></Select>
              </Field>
              <Field label="Years of experience" required><Input type="number" min={0} defaultValue={16} /></Field>
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center">
              <Upload className="mx-auto size-5 text-muted" />
              <p className="mt-2 text-sm font-medium text-ink">Upload registration certificate</p>
              <p className="text-xs text-muted">PDF or image · Seen only by SmartCare verification staff</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-canvas px-3 py-1.5 text-sm"><Check className="size-4 text-success" /> medical-council-certificate.pdf</div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Field label="Associated hospital" required>
              <Select defaultValue="St. Mary's General Hospital"><option>St. Mary's General Hospital</option><option>Riverside Community Hospital</option><option>Lakeside Medical Center</option><option>Northgate Heart & Vascular Institute</option></Select>
            </Field>
            <div>
              <p className="mb-1.5 text-sm font-medium text-ink">Working days <span className="text-danger">*</span></p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => {
                  const on = days.includes(d)
                  return (
                    <button key={d} type="button" aria-pressed={on} onClick={() => setDays(on ? days.filter((x) => x !== d) : [...days, d])} className={cn('h-10 w-14 rounded-lg border text-sm font-medium transition-colors duration-150', on ? 'border-primary bg-primary text-white' : 'border-line text-muted hover:border-slate-300')}>{d}</button>
                  )
                })}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Consultation starts"><Input type="time" defaultValue="09:00" /></Field>
              <Field label="Consultation ends"><Input type="time" defaultValue="16:00" /></Field>
            </div>
            <Field label="Diseases and conditions treated" hint="Patients can find you by searching these">
              <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-line px-2 py-1.5">
                {conds.map((c) => (
                  <Badge key={c} tone="blue">{c}<button type="button" aria-label={`Remove ${c}`} onClick={() => setConds(conds.filter((x) => x !== c))}><X className="size-3" /></button></Badge>
                ))}
                <input value={cond} onChange={(e) => setCond(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && cond.trim()) { e.preventDefault(); setConds([...conds, cond.trim()]); setCond('') } }} placeholder="Type and press Enter" className="min-w-32 flex-1 px-1 text-sm focus:outline-none" />
              </div>
            </Field>
          </>
        )}
        {step === 4 && (
          <>
            <dl className="divide-y divide-line rounded-xl border border-line text-sm">
              {[
                ['Name', 'Dr. Kwame Adebayo'],
                ['Registration no.', 'MC-CA-A118842'],
                ['Specialization', 'Cardiology · 16 years'],
                ['Hospital', "St. Mary's General Hospital"],
                ['Working days', days.join(', ')],
                ['Hours', '09:00 AM – 04:00 PM'],
                ['Conditions', conds.join(', ')],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-3 px-4 py-3"><dt className="text-muted">{k}</dt><dd className="font-medium text-ink">{v}</dd></div>
              ))}
            </dl>
            <Alert tone="info" title="What happens next">We verify your registration number with the medical council, usually within 2 working days. You can sign in meanwhile, but patient features stay locked until you’re approved.</Alert>
            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input type="checkbox" defaultChecked className="mt-0.5 size-4 accent-primary" /> I confirm these details are accurate and I hold a current licence to practise.
            </label>
          </>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step < 4 ? (
          <Button size="lg" className="w-full" onClick={() => setStep(step + 1)}>Continue</Button>
        ) : (
          <Button size="lg" className="w-full" disabled={loading} onClick={() => { setLoading(true); setTimeout(() => onNavigate?.('verify-email-doctor'), 700) }}>
            {loading ? <><Loader2 className="size-4 animate-spin" /> Submitting…</> : <><ShieldCheck className="size-4" /> Submit for verification</>}
          </Button>
        )}
      </div>
    </AuthLayout>
  )
}
