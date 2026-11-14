import React, { useState } from 'react'
import { ArrowLeft, MailCheck, Loader2 } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Button, Field, Input } from '../shared/ui'

export const args = {
  state: 'request',
  email: 'michael.thompson@mail.com',
}

export const argTypes = {
  state: { control: 'radio', options: ['request', 'sending', 'sent'] },
  email: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function ForgotPassword(props: Props) {
  const { state, email: initialEmail, onNavigate } = { ...args, ...props }
  const [step, setStep] = useState(state)
  const [email, setEmail] = useState(state === 'request' ? '' : initialEmail)
  const [touched, setTouched] = useState(false)
  const bad = touched && !/^\S+@\S+\.\S+$/.test(email)

  return (
    <AuthLayout onNavigate={onNavigate}>
      <button onClick={() => onNavigate?.('login')} className="mb-8 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Back to sign in
      </button>
      {step === 'sent' ? (
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary"><MailCheck className="size-6" /></span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Check your email</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">If an account exists for <strong className="font-semibold text-ink">{email}</strong>, we’ve sent a link to reset your password. It expires in 30 minutes.</p>
          <Button size="lg" className="mt-8 w-full" onClick={() => onNavigate?.('reset')}>Open reset link</Button>
          <p className="mt-6 text-center text-sm text-muted">Didn’t get it? Check spam, or <button onClick={() => setStep('request')} className="font-semibold text-primary">try another email</button></p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            setTouched(true)
            if (!/^\S+@\S+\.\S+$/.test(email)) return
            setStep('sending')
            setTimeout(() => setStep('sent'), 800)
          }}
        >
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Forgot your password?</h1>
          <p className="mt-1.5 text-sm text-muted">Enter the email you registered with and we’ll send you a secure reset link.</p>
          <Field label="Email address" className="mt-8" error={bad ? 'Enter a valid email address' : undefined}>
            <Input type="email" value={email} invalid={bad} placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={step === 'sending'}>
            {step === 'sending' ? <><Loader2 className="size-4 animate-spin" /> Sending link…</> : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
