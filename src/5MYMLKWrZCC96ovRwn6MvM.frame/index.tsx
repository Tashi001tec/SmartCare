import React from 'react'
import { Check, Clock, FileSearch, ShieldCheck, XCircle, Lock } from 'lucide-react'
import { AuthLayout } from '../shared/PublicLayout'
import { Alert, Badge, Button, cn } from '../shared/ui'

export const args = {
  role: 'doctor',
  status: 'pending',
}

export const argTypes = {
  role: { control: 'radio', options: ['doctor', 'pharmacy'] },
  status: { control: 'radio', options: ['pending', 'approved', 'rejected'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PendingVerification(props: Props) {
  const { role, status, onNavigate } = { ...args, ...props }
  const isDoc = role === 'doctor'
  const steps = [
    { icon: Check, title: 'Application submitted', meta: '16 Jun 2025, 10:42 AM', state: 'done' },
    { icon: Check, title: 'Email verified', meta: '16 Jun 2025, 10:44 AM', state: 'done' },
    { icon: FileSearch, title: isDoc ? 'Medical registration review' : 'Pharmacy licence review', meta: status === 'pending' ? 'In progress · usually 1–2 working days' : status === 'approved' ? 'Completed 17 Jun 2025' : 'Completed 17 Jun 2025', state: status === 'pending' ? 'current' : status === 'approved' ? 'done' : 'failed' },
    { icon: ShieldCheck, title: 'Account activated', meta: status === 'approved' ? 'Full access granted' : 'Waiting', state: status === 'approved' ? 'done' : 'todo' },
  ]

  return (
    <AuthLayout onNavigate={onNavigate} wide>
      <Badge tone={status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange'} dot className="self-start">
        {status === 'approved' ? 'Verified' : status === 'rejected' ? 'Action needed' : 'Pending verification'}
      </Badge>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
        {status === 'approved' ? 'You’re verified — welcome to SmartCare' : status === 'rejected' ? 'We couldn’t verify your details' : isDoc ? 'Thanks, Dr. Adebayo. We’re checking your registration.' : 'Thanks, CityCare Pharmacy. We’re checking your licence.'}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {status === 'pending' && 'Your account is created. Until an administrator approves it, features that involve patient data stay locked.'}
        {status === 'approved' && 'All features are now unlocked. Patients can find and book you.'}
        {status === 'rejected' && 'Please review the note from our verification team and resubmit.'}
      </p>

      <ol className="mt-8 space-y-0">
        {steps.map((s, i) => {
          const Icon = s.state === 'failed' ? XCircle : s.state === 'current' ? Clock : s.icon
          return (
            <li key={s.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={cn('grid size-9 place-items-center rounded-full', s.state === 'done' && 'bg-success text-white', s.state === 'current' && 'bg-warning-soft text-warning-ink ring-1 ring-warning', s.state === 'failed' && 'bg-danger-soft text-danger', s.state === 'todo' && 'bg-slate-100 text-slate-400')}>
                  <Icon className="size-4" />
                </span>
                {i < steps.length - 1 && <span className={cn('w-px flex-1', s.state === 'done' ? 'bg-success' : 'bg-line')} style={{ minHeight: 28 }} />}
              </div>
              <div className="pb-6 pt-1.5">
                <p className={cn('text-sm font-semibold', s.state === 'todo' ? 'text-muted' : 'text-ink')}>{s.title}</p>
                <p className="mt-0.5 text-xs text-muted">{s.meta}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {status === 'rejected' && (
        <Alert tone="danger" title="Note from verification team">
          {isDoc ? 'The registration number MC-CA-A118842 doesn’t match the name on the uploaded certificate. Upload a clearer copy or contact support.' : 'The uploaded licence has expired. Upload your current licence to continue.'}
        </Alert>
      )}

      {status === 'pending' && (
        <div className="rounded-xl border border-line p-5">
          <p className="text-sm font-semibold text-ink">Locked until approval</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {(isDoc ? ['Patient records', 'Issuing prescriptions', 'Patient messages', 'Public profile listing'] : ['Prescription requests', 'QR verification', 'Patient orders', 'Public pharmacy listing']).map((x) => (
              <li key={x} className="flex items-center gap-2"><Lock className="size-3.5 text-slate-400" /> {x}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {status === 'approved' ? (
          <Button size="lg" className="w-full" onClick={() => onNavigate?.(isDoc ? 'd-dashboard' : 'ph-dashboard')}>Go to dashboard</Button>
        ) : status === 'rejected' ? (
          <Button size="lg" className="w-full" onClick={() => onNavigate?.(isDoc ? 'reg-doctor' : 'reg-pharmacy')}>Update and resubmit</Button>
        ) : (
          <>
            <Button size="lg" variant="secondary" className="w-full" onClick={() => onNavigate?.(isDoc ? 'd-profile' : 'ph-profile')}>Complete your profile</Button>
            <Button size="lg" variant="ghost" className="w-full" onClick={() => onNavigate?.('login')}>Sign out</Button>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
