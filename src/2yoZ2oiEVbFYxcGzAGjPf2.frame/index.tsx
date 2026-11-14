import React, { useRef, useState } from 'react'
import { MailCheck, Loader2, CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Button } from '../shared/ui'

export const args = {
  state: 'code',
  email: 'michael.thompson@mail.com',
  next: 'patient',
}

export const argTypes = {
  state: { control: 'radio', options: ['code', 'invalid', 'verified'] },
  email: { control: 'text' },
  next: { control: 'radio', options: ['patient', 'doctor', 'pharmacy'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function EmailVerification(props: Props) {
  const { state, email, next, onNavigate } = { ...args, ...props }
  const [code, setCode] = useState(state === 'invalid' ? ['4', '8', '2', '0', '1', '7'] : ['', '', '', '', '', ''])
  const [status, setStatus] = useState(state)
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const full = code.every(Boolean)

  const verify = () => {
    setStatus('checking')
    setTimeout(() => setStatus('verified'), 700)
  }

  return (
    <AuthLayout onNavigate={onNavigate}>
      {status === 'verified' ? (
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success"><CheckCircle2 className="size-6" /></span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Email verified</h1>
          <p className="mt-2 text-sm text-muted">{next === 'patient' ? 'Your patient account is ready. Sign in to set up your health profile.' : 'Next, our team will review your professional details.'}</p>
          <Button size="lg" className="mt-8 w-full" onClick={() => onNavigate?.(next === 'patient' ? 'login' : next === 'doctor' ? 'pending' : 'pending-pharmacy')}>
            {next === 'patient' ? 'Continue to sign in' : 'View verification status'}
          </Button>
        </div>
      ) : (
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary"><MailCheck className="size-6" /></span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Verify your email</h1>
          <p className="mt-2 text-sm text-muted">Enter the 6-digit code we sent to <strong className="font-semibold text-ink">{email}</strong>.</p>
          {status === 'invalid' && <Alert tone="danger" className="mt-6" title="That code didn’t match">Check the latest email from SmartCare. Codes expire after 10 minutes.</Alert>}
          <div className="mt-8 flex justify-between gap-2">
            {code.map((c, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el }}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                value={c}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(-1)
                  const n = [...code]
                  n[i] = v
                  setCode(n)
                  if (status === 'invalid') setStatus('code')
                  if (v && i < 5) refs.current[i + 1]?.focus()
                }}
                onKeyDown={(e) => { if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus() }}
                className={`h-14 w-full max-w-14 rounded-lg border text-center text-xl font-semibold text-ink focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 ${status === 'invalid' ? 'border-danger' : 'border-line'}`}
              />
            ))}
          </div>
          <Button size="lg" className="mt-6 w-full" disabled={!full || status === 'checking'} onClick={verify}>
            {status === 'checking' ? <><Loader2 className="size-4 animate-spin" /> Verifying…</> : 'Verify email'}
          </Button>
          <p className="mt-6 text-center text-sm text-muted">Didn’t receive it? <button className="font-semibold text-primary">Resend code</button> <span className="text-slate-400">· available in 0:42</span></p>
        </div>
      )}
    </AuthLayout>
  )
}
