import React, { useState } from 'react'
import { CheckCircle2, Check, X, Eye, EyeOff } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Button, Field, Input, cn } from '../shared/ui'

export const args = {
  state: 'form',
}

export const argTypes = {
  state: { control: 'radio', options: ['form', 'expired', 'success'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PasswordReset(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [step, setStep] = useState(state)
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const rules = [
    { ok: pw.length >= 10, label: 'At least 10 characters' },
    { ok: /[A-Z]/.test(pw) && /[a-z]/.test(pw), label: 'Upper and lower case letters' },
    { ok: /\d/.test(pw), label: 'At least one number' },
    { ok: /[^A-Za-z0-9]/.test(pw), label: 'At least one symbol' },
  ]
  const strong = rules.every((r) => r.ok)
  const mismatch = confirm.length > 0 && confirm !== pw
  const score = rules.filter((r) => r.ok).length

  return (
    <AuthLayout onNavigate={onNavigate}>
      {step === 'success' ? (
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success"><CheckCircle2 className="size-6" /></span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Password updated</h1>
          <p className="mt-2 text-sm text-muted">Your password was changed and all other devices were signed out for your security.</p>
          <Button size="lg" className="mt-8 w-full" onClick={() => onNavigate?.('login')}>Sign in</Button>
        </div>
      ) : step === 'expired' ? (
        <div>
          <Alert tone="warning" title="This reset link has expired">Reset links work for 30 minutes and only once. Request a new one to continue.</Alert>
          <Button size="lg" className="mt-6 w-full" onClick={() => onNavigate?.('forgot')}>Request a new link</Button>
        </div>
      ) : (
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (strong && !mismatch && confirm) setStep('success') }}>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Set a new password</h1>
          <p className="mt-1.5 text-sm text-muted">For michael.thompson@mail.com</p>
          <Field label="New password" className="mt-8">
            <div className="relative">
              <Input type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} className="pr-11" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </Field>
          <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn('h-1 rounded-full transition-colors duration-150', i < score ? (score < 3 ? 'bg-warning' : 'bg-success') : 'bg-slate-200')} />
            ))}
          </div>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {rules.map((r) => (
              <li key={r.label} className={cn('flex items-center gap-1.5 text-xs', r.ok ? 'text-success' : 'text-muted')}>
                {r.ok ? <Check className="size-3.5" /> : <X className="size-3.5" />} {r.label}
              </li>
            ))}
          </ul>
          <Field label="Confirm new password" className="mt-5" error={mismatch ? 'Passwords do not match' : undefined}>
            <Input type="password" value={confirm} invalid={mismatch} onChange={(e) => setConfirm(e.target.value)} />
          </Field>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={!strong || mismatch || !confirm}>Update password</Button>
        </form>
      )}
    </AuthLayout>
  )
}
