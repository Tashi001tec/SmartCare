import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Siren, Loader2 } from 'lucide-react'
import { PublicFooter, PublicHeader } from '../shared/PublicLayout'
import { Alert, Button, Field, Input, Select, Textarea } from '../shared/ui'

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'select', options: ['default', 'sending', 'sent', 'error'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function ContactUs(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [status, setStatus] = useState(state)
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [touched, setTouched] = useState(state === 'error')
  const errs = {
    name: !form.name.trim() ? 'Enter your name' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Enter a valid email address' : '',
    topic: !form.topic ? 'Choose a topic' : '',
    message: form.message.trim().length < 10 ? 'Tell us a little more (at least 10 characters)' : '',
  }
  const valid = !Object.values(errs).some(Boolean)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 800)
  }

  return (
    <div className="min-h-full bg-white text-ink">
      <PublicHeader active="contact" onNavigate={onNavigate} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8 lg:py-24">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
          <p className="mt-4 max-w-md text-muted">Questions about your account, provider verification or partnering with SmartCare. We reply within one working day.</p>
          <div className="mt-8 flex gap-3 rounded-xl border border-red-200 bg-danger-soft p-4">
            <Siren className="mt-0.5 size-5 shrink-0 text-danger" />
            <p className="text-sm text-red-800"><strong className="font-semibold">This form is not for medical emergencies.</strong> If you or someone else needs urgent help, call 911 now.</p>
          </div>
          <dl className="mt-10 space-y-6">
            {[
              [Phone, 'Phone', '+1 (555) 010-2200'],
              [Mail, 'Email', 'support@smartcare.health'],
              [MapPin, 'Office', '500 Innovation Way, Riverside, CA 92507'],
              [Clock, 'Support hours', 'Mon – Fri, 08:00 AM – 06:00 PM'],
            ].map(([Icon, l, v]) => {
              const I = Icon as React.ElementType
              return (
                <div key={l as string} className="flex gap-4">
                  <I className="mt-0.5 size-5 text-primary" />
                  <div>
                    <dt className="text-sm text-muted">{l as string}</dt>
                    <dd className="font-medium">{v as string}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          {status === 'sent' ? (
            <div className="py-10 text-center">
              <Alert tone="success" title="Message sent">Thanks, we’ve received your message and emailed you a copy. Reference: SC-11829.</Alert>
              <Button variant="secondary" className="mt-6" onClick={() => { setStatus('default'); setForm({ name: '', email: '', topic: '', message: '' }); setTouched(false) }}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <h2 className="text-lg font-semibold">Send us a message</h2>
              {touched && !valid && <Alert tone="danger" title="Please fix the highlighted fields" />}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={touched ? errs.name : undefined}><Input value={form.name} invalid={touched && !!errs.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
                <Field label="Email" required error={touched ? errs.email : undefined}><Input type="email" value={form.email} invalid={touched && !!errs.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
              </div>
              <Field label="Topic" required error={touched ? errs.topic : undefined}>
                <Select value={form.topic} invalid={touched && !!errs.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  <option value="">Choose a topic</option>
                  <option>My patient account</option>
                  <option>Doctor verification</option>
                  <option>Pharmacy verification</option>
                  <option>Hospital partnership</option>
                  <option>Privacy or data request</option>
                </Select>
              </Field>
              <Field label="Message" required error={touched ? errs.message : undefined} hint="Please don’t include medical details here.">
                <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={touched && errs.message ? 'border-danger' : ''} />
              </Field>
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'sending'}>
                {status === 'sending' ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </section>
      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}
