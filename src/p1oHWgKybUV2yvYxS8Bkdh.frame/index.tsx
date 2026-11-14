import React, { useState } from 'react'
import { UserRound, Stethoscope, Store, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Button, cn } from '../shared/ui'

export const args = {
  selected: 'patient',
}

export const argTypes = {
  selected: { control: 'radio', options: ['patient', 'doctor', 'pharmacy'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const ROLES = [
  { value: 'patient', icon: UserRound, title: 'I’m a patient', body: 'Find doctors, book appointments, manage prescriptions and medicine reminders.', note: 'Ready to use straight after email verification', to: 'reg-patient' },
  { value: 'doctor', icon: Stethoscope, title: 'I’m a doctor', body: 'Manage appointments and availability, issue digital prescriptions, message patients.', note: 'Medical registration checked by an administrator', to: 'reg-doctor' },
  { value: 'pharmacy', icon: Store, title: 'I represent a pharmacy', body: 'Receive authorised prescriptions, verify QR references and manage orders and stock.', note: 'Pharmacy licence checked by an administrator', to: 'reg-pharmacy' },
]

export default function RoleSelection(props: Props) {
  const { selected, onNavigate } = { ...args, ...props }
  const [role, setRole] = useState(selected)
  const r = ROLES.find((x) => x.value === role)!
  return (
    <AuthLayout onNavigate={onNavigate} wide>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">How will you use SmartCare?</h1>
      <p className="mt-1.5 text-sm text-muted">Each account type sees a different, role-specific app. You can’t switch roles later on the same email.</p>
      <div role="radiogroup" className="mt-8 space-y-3">
        {ROLES.map((x) => {
          const on = x.value === role
          const Icon = x.icon
          return (
            <button key={x.value} role="radio" aria-checked={on} onClick={() => setRole(x.value)} className={cn('flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-[border-color,background-color] duration-150', on ? 'border-primary bg-primary-soft/60' : 'border-line hover:border-slate-300')}>
              <span className={cn('grid size-11 shrink-0 place-items-center rounded-lg', on ? 'bg-primary text-white' : 'bg-slate-100 text-muted')}><Icon className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">{x.title}</span>
                <span className="mt-1 block text-sm text-muted">{x.body}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted"><ShieldCheck className="size-3.5 text-success" /> {x.note}</span>
              </span>
              <span className={cn('mt-1 grid size-5 shrink-0 place-items-center rounded-full border', on ? 'border-primary bg-primary text-white' : 'border-slate-300')}>{on && <Check className="size-3" strokeWidth={3} />}</span>
            </button>
          )
        })}
      </div>
      <Button size="lg" className="mt-8 w-full" onClick={() => onNavigate?.(r.to)}>
        Continue as {r.value} <ArrowRight className="size-4" />
      </Button>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <button onClick={() => onNavigate?.('login')} className="font-semibold text-primary">Sign in</button>
      </p>
    </AuthLayout>
  )
}
