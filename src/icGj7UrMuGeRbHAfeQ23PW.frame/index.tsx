import React, { useState } from 'react'
import { ArrowLeft, Upload, Check, Loader2, ShieldCheck } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Button, Field, Input, Textarea } from '../shared/ui'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'errors'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PharmacyRegistration(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const errors = state === 'errors'
  const [loading, setLoading] = useState(false)
  const [doc, setDoc] = useState(!errors)

  return (
    <AuthLayout onNavigate={onNavigate} wide>
      <button onClick={() => onNavigate?.('role-select')} className="mb-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Change account type
      </button>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Register your pharmacy</h1>
      <p className="mt-1.5 text-sm text-muted">Pharmacies can receive prescriptions only after an administrator verifies the licence.</p>

      {errors && <Alert tone="danger" className="mt-6" title="2 fields need attention" />}

      <form noValidate className="mt-6 space-y-7" onSubmit={(e) => { e.preventDefault(); if (errors) return; setLoading(true); setTimeout(() => onNavigate?.('verify-email-pharmacy'), 700) }}>
        <fieldset className="space-y-5">
          <legend className="mb-4 text-sm font-semibold text-ink">Pharmacy details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Pharmacy name" required><Input defaultValue="CityCare Pharmacy" /></Field>
            <Field label="Owner name" required><Input defaultValue="Rachel Kim" /></Field>
          </div>
          <Field label="Pharmacy licence number" required error={errors ? 'Licence number format is PH-XX-YYYY-NNNNN' : undefined}>
            <Input defaultValue={errors ? 'PH4482' : 'PH-CA-2019-04482'} invalid={errors} />
          </Field>
          <Field label="Address" required><Textarea rows={2} className="min-h-0" defaultValue="310 Main Street, Riverside, CA 92501" /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Contact number" required><Input type="tel" defaultValue="+1 (555) 410-3100" /></Field>
            <Field label="Email" required error={errors ? 'Enter a valid email address' : undefined}><Input type="email" invalid={errors} defaultValue={errors ? 'orders@citycare' : 'orders@citycarepharmacy.com'} /></Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Opens"><Input type="time" defaultValue="08:00" /></Field>
            <Field label="Closes"><Input type="time" defaultValue="21:00" /></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-ink">Licence document</legend>
          <button type="button" onClick={() => setDoc(true)} className="w-full rounded-xl border border-dashed border-slate-300 p-5 text-center transition-colors duration-150 hover:border-primary">
            <Upload className="mx-auto size-5 text-muted" />
            <p className="mt-2 text-sm font-medium text-ink">Upload pharmacy licence</p>
            <p className="text-xs text-muted">PDF or image · Seen only by SmartCare verification staff</p>
            {doc && <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-canvas px-3 py-1.5 text-sm"><Check className="size-4 text-success" /> state-pharmacy-licence-2025.pdf</span>}
          </button>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="mb-4 text-sm font-semibold text-ink">Account password</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Password" required hint="At least 10 characters"><Input type="password" defaultValue="CityCare#3100" /></Field>
            <Field label="Confirm password" required><Input type="password" defaultValue="CityCare#3100" /></Field>
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="size-4 animate-spin" /> Submitting…</> : <><ShieldCheck className="size-4" /> Submit for verification</>}
        </Button>
      </form>
    </AuthLayout>
  )
}
