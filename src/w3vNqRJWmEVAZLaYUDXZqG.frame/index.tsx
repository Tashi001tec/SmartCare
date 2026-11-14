import React, { useState } from 'react'
import { Phone, Siren, MapPin, Navigation, Clock, HeartPulse, Brain, Droplet, Wind, UserRound, Share2, Check } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, Button, Modal, Panel, cn } from '../shared/ui'
import { hospitals, patient } from '../shared/data'

export const args = {
  calling: false,
}

export const argTypes = {
  calling: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const SIGNS = [
  { icon: HeartPulse, title: 'Chest pain or pressure', body: 'Especially spreading to the arm, jaw or back, with sweating or breathlessness.' },
  { icon: Brain, title: 'Signs of stroke', body: 'Face drooping, arm weakness, slurred speech. Note the time symptoms started.' },
  { icon: Wind, title: 'Severe difficulty breathing', body: 'Can’t speak in full sentences, lips turning blue, or choking.' },
  { icon: Droplet, title: 'Heavy bleeding', body: 'Apply firm pressure with a clean cloth and keep it there.' },
]

export default function EmergencySupport(props: Props) {
  const { calling, onNavigate } = { ...args, ...props }
  const [open, setOpen] = useState(calling)
  const [shared, setShared] = useState(false)
  const er = hospitals.filter((h) => h.er24)

  return (
    <AppShell role="patient" active="p-emergency" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Need help right now?</h1>
              <p className="mt-2 text-muted">If someone’s life may be in danger, call emergency services immediately. Don’t wait for a reply from your doctor or SmartCare AI.</p>
            </div>
            <button onClick={() => setOpen(true)} className="flex h-16 shrink-0 items-center justify-center gap-3 rounded-xl bg-danger px-8 text-lg font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-red-700 active:scale-[0.98]">
              <Phone className="size-6" /> Call 911
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            <Button variant="secondary" icon={<Phone className="size-4" />}>Call {patient.emergency.name.split(' ')[0]} ({patient.emergency.relation})</Button>
            <Button variant="secondary" icon={shared ? <Check className="size-4 text-success" /> : <Share2 className="size-4" />} onClick={() => setShared(true)}>{shared ? 'Location shared with Linda' : 'Share my location'}</Button>
            <Button variant="secondary" icon={<Phone className="size-4" />}>Poison control · 1-800-222-1222</Button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Panel>
            <h2 className="px-5 pb-2 pt-4 text-[15px] font-semibold text-ink">Nearest emergency departments</h2>
            <ul className="divide-y divide-line">
              {er.map((h, i) => (
                <li key={h.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-semibold text-ink">{h.name} {i === 0 && <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">Closest</span>}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted"><MapPin className="size-3.5" /> {h.distance} · about {i === 0 ? 8 : i === 1 ? 12 : 19} min by car</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted"><Clock className="size-3.5" /> Emergency open 24 hours · {h.emergency}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" icon={<Phone className="size-4" />}>Call ER</Button>
                    <Button size="sm" icon={<Navigation className="size-4" />} onClick={() => onNavigate?.('p-hospital-map')}>Directions</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15px] font-semibold text-ink">Information for responders</h2>
            <p className="mt-1 text-sm text-muted">Show this screen to paramedics or ER staff.</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar initials="MT" size={44} />
              <div><p className="font-semibold text-ink">{patient.name}, {patient.age}</p><p className="text-sm text-muted">Blood type {patient.blood}</p></div>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3 rounded-lg bg-danger-soft px-3 py-2"><dt className="text-red-800">Allergy</dt><dd className="font-semibold text-red-800">Penicillin</dd></div>
              <div className="flex justify-between gap-3 px-3"><dt className="text-muted">Conditions</dt><dd className="text-right font-medium text-ink">{patient.conditions.join(', ')}</dd></div>
              <div className="flex justify-between gap-3 px-3"><dt className="text-muted">Medicines</dt><dd className="text-right font-medium text-ink">Amlodipine, Atorvastatin, Aspirin, Metformin</dd></div>
              <div className="flex justify-between gap-3 px-3"><dt className="text-muted">Emergency contact</dt><dd className="text-right font-medium text-ink">{patient.emergency.name} · {patient.emergency.phone}</dd></div>
            </dl>
          </Panel>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ink">Call 911 straight away for</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {SIGNS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <s.icon className="mt-0.5 size-5 shrink-0 text-danger" />
                <div><p className="font-semibold text-ink">{s.title}</p><p className="mt-0.5 text-sm text-muted">{s.body}</p></div>
              </li>
            ))}
          </ul>
          <Alert tone="info" className="mt-8">Not an emergency but need advice? Message your doctor or ask <button onClick={() => onNavigate?.('p-ai')} className="font-semibold underline">SmartCare AI</button> for general guidance.</Alert>
        </section>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Call emergency services?" size="sm" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><a href="tel:911" onClick={() => setOpen(false)} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-danger px-4 text-sm font-semibold text-white')}><Siren className="size-4" /> Call 911 now</a></>}>
        <p className="text-sm text-muted">Your phone will dial 911. Stay on the line and follow the dispatcher’s instructions. If you can, unlock your door and keep your phone nearby.</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink"><UserRound className="size-4 text-muted" /> We’ll also text Linda Thompson that you’ve called for help.</p>
      </Modal>
    </AppShell>
  )
}
