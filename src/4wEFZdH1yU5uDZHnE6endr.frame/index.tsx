import React, { useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Button, Field, Input, SecureNote, Select, Textarea } from '../shared/ui'

export const args = {
  state: 'empty',
}

export const argTypes = {
  state: { control: 'radio', options: ['empty', 'filled', 'errors'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const FILLED = { name: 'Michael Thompson', dob: '1961-03-14', gender: 'Male', email: 'michael.thompson@mail.com', phone: '+1 (555) 214-8890', address: '42 Willow Lane, Riverside, CA 92501', pw: 'Riverside#2025', confirm: 'Riverside#2025' }
const EMPTY = { name: '', dob: '', gender: '', email: '', phone: '', address: '', pw: '', confirm: '' }

export default function PatientRegistration(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [f, setF] = useState(state === 'filled' ? FILLED : state === 'errors' ? { ...EMPTY, name: 'Michael', email: 'michael@', pw: 'short', confirm: 'shorter' } : EMPTY)
  const [touched, setTouched] = useState(state === 'errors')
  const [agree, setAgree] = useState(state === 'filled')
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value })

  const e = {
    name: f.name.trim().split(' ').length < 2 ? 'Enter your first and last name' : '',
    dob: !f.dob ? 'Enter your date of birth' : '',
    gender: !f.gender ? 'Select an option' : '',
    email: !/^\S+@\S+\.\S+$/.test(f.email) ? 'Enter a valid email address' : '',
    phone: f.phone.replace(/\D/g, '').length < 10 ? 'Enter a valid phone number' : '',
    address: f.address.trim().length < 8 ? 'Enter your full address' : '',
    pw: f.pw.length < 10 ? 'Use at least 10 characters' : '',
    confirm: f.confirm !== f.pw || !f.confirm ? 'Passwords do not match' : '',
  }
  const err = (k: keyof typeof e) => (touched ? e[k] || undefined : undefined)
  const count = Object.values(e).filter(Boolean).length

  return (
    <AuthLayout onNavigate={onNavigate} wide>
      <button onClick={() => onNavigate?.('role-select')} className="mb-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Change account type
      </button>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Create your patient account</h1>
      <p className="mt-1.5 text-sm text-muted">Takes about 2 minutes. We’ll verify your email before you sign in.</p>

      {touched && count > 0 && <Alert tone="danger" className="mt-6" title={`${count} field${count > 1 ? 's need' : ' needs'} attention`} />}

      <form
        noValidate
        className="mt-6 space-y-5"
        onSubmit={(ev) => {
          ev.preventDefault()
          setTouched(true)
          if (count || !agree) return
          setLoading(true)
          setTimeout(() => onNavigate?.('verify-email'), 700)
        }}
      >
        <Field label="Full name" required error={err('name')}><Input value={f.name} invalid={!!err('name')} onChange={set('name')} autoComplete="name" /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Date of birth" required error={err('dob')}><Input type="date" value={f.dob} invalid={!!err('dob')} onChange={set('dob')} /></Field>
          <Field label="Gender" required error={err('gender')}>
            <Select value={f.gender} invalid={!!err('gender')} onChange={set('gender')}>
              <option value="">Select</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
            </Select>
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" required error={err('email')}><Input type="email" value={f.email} invalid={!!err('email')} onChange={set('email')} autoComplete="email" /></Field>
          <Field label="Phone number" required error={err('phone')}><Input type="tel" value={f.phone} invalid={!!err('phone')} onChange={set('phone')} autoComplete="tel" /></Field>
        </div>
        <Field label="Address" required error={err('address')}><Textarea rows={2} value={f.address} onChange={set('address')} className={err('address') ? 'min-h-0 border-danger' : 'min-h-0'} /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Password" required error={err('pw')} hint="At least 10 characters"><Input type="password" value={f.pw} invalid={!!err('pw')} onChange={set('pw')} autoComplete="new-password" /></Field>
          <Field label="Confirm password" required error={err('confirm')}><Input type="password" value={f.confirm} invalid={!!err('confirm')} onChange={set('confirm')} autoComplete="new-password" /></Field>
        </div>
        <label className="flex items-start gap-2.5 text-sm text-muted">
          <input type="checkbox" checked={agree} onChange={(ev) => setAgree(ev.target.checked)} className="mt-0.5 size-4 accent-primary" />
          <span>I agree to the Terms of Use and Privacy Policy, and understand SmartCare is not an emergency service.</span>
        </label>
        <Button type="submit" size="lg" className="w-full" disabled={!agree || loading}>
          {loading ? <><Loader2 className="size-4 animate-spin" /> Creating account…</> : 'Create account'}
        </Button>
        <SecureNote>Your details are encrypted and only shared with care providers you choose.</SecureNote>
      </form>
    </AuthLayout>
  )
}
