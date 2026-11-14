
import React, { useState } from 'react'
import { Eye, EyeOff, Loader2, ShieldCheck, UserRound, Stethoscope, Store, ArrowLeft } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Button, Field, Input, SecureNote, cn } from '../shared/ui'

export const args = {
  state: 'default',
  role: 'patient',
}

export const argTypes = {
  state: { control: 'select', options: ['default', 'error', 'loading', 'admin'] },
  role: { control: 'radio', options: ['patient', 'doctor', 'pharmacy'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const ROLES = [
  { value: 'patient', label: 'Patient', icon: UserRound, email: 'michael.thompson@mail.com', to: 'p-dashboard' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, email: 'k.adebayo@stmarys.org', to: 'd-dashboard' },
  { value: 'pharmacy', label: 'Pharmacy', icon: Store, email: 'orders@citycarepharmacy.com', to: 'ph-dashboard' },
]

export default function Login(props: Props) {
  const { state, role: initialRole, onNavigate } = { ...args, ...props }
  const [role, setRole] = useState(initialRole)
  const [admin, setAdmin] = useState(state === 'admin')
  const r = ROLES.find((x) => x.value === role) ?? ROLES[0]
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(state === 'loading')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const emailBad = touched && !/^\S+@\S+\.\S+$/.test(email)
  const pwBad = touched && pw.length === 0

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!/^\S+@\S+\.\S+$/.test(email) || !pw) return

    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pw,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please try again.')
      }

      if (!admin && data.user.role !== role) {
        throw new Error(`This account is registered as ${data.user.role}. Please select the correct role.`)
      }

      sessionStorage.setItem('smartcare_token', data.token)
      sessionStorage.setItem('smartcare_user', JSON.stringify(data.user))

      onNavigate?.(data.user.role === 'patient' ? 'p-dashboard' : data.user.role === 'doctor' ? 'd-dashboard' : 'ph-dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout onNavigate={onNavigate}>
      {admin && (
        <button onClick={() => setAdmin(false)} className="mb-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink">
          <ArrowLeft className="size-4" /> Back to user sign-in
        </button>
      )}

      <h1 className="text-2xl font-semibold tracking-tight text-ink">{admin ? 'Administrator sign-in' : 'Welcome back'}</h1>
      <p className="mt-1.5 text-sm text-muted">{admin ? 'Restricted to SmartCare platform staff.' : 'Sign in to manage your appointments, prescriptions and messages.'}</p>

      {!admin && (
        <div role="radiogroup" aria-label="Sign in as" className="mt-7 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
          {ROLES.map((x) => {
            const Icon = x.icon
            const on = x.value === role
            return (
              <button key={x.value} type="button" role="radio" aria-checked={on} onClick={() => setRole(x.value)} className={cn('flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors duration-150', on ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-ink')}>
                <Icon className="size-4" /> {x.label}
              </button>
            )
          })}
        </div>
      )}

      {error && (
        <Alert tone="danger" className="mt-6" title="Sign-in failed">
          {error}
        </Alert>
      )}

      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <Field label="Email address" error={emailBad ? 'Enter a valid email address' : undefined}>
          <Input type="email" autoComplete="email" placeholder={admin ? 'name@smartcare.health' : r.email} value={email} invalid={emailBad} onChange={(e) => setEmail(e.target.value)} />
        </Field>

        <Field label="Password" error={pwBad ? 'Enter your password' : undefined}>
          <div className="relative">
            <Input type={show ? 'text' : 'password'} autoComplete="current-password" value={pw} invalid={pwBad} onChange={(e) => setPw(e.target.value)} className="pr-11" />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted hover:text-ink">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" className="size-4 rounded border-line accent-primary" /> Keep me signed in
          </label>
          <button type="button" onClick={() => onNavigate?.('forgot')} className="font-medium text-primary hover:text-primary-dark">Forgot password?</button>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="size-4 animate-spin" /> Signing in...</> : admin ? 'Sign in to admin console' : `Sign in as ${r.label.toLowerCase()}`}
        </Button>
      </form>

      {!admin && (
        <p className="mt-6 text-center text-sm text-muted">
          New to SmartCare?
          <button onClick={() => onNavigate?.('role-select')} className="ml-1 font-semibold text-primary hover:text-primary-dark">Register now</button>
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-6">
        <SecureNote>Protected by encrypted connections and two-step verification.</SecureNote>
        {!admin && (
          <button onClick={() => setAdmin(true)} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink">
            <ShieldCheck className="size-3.5" /> Administrator access
          </button>
        )}
      </div>
    </AuthLayout>
  )
}
