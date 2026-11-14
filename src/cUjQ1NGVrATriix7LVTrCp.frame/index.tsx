import React, { useState } from 'react'
import { Camera, X, BadgeCheck, Eye } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Badge, Button, Field, Input, PageHeader, Panel, Select, Textarea, cn } from '../shared/ui'
import { IMG } from '../shared/data'

export const args = {
  saved: false,
}

export const argTypes = {
  saved: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DoctorProfileManagement(props: Props) {
  const { saved: s0, onNavigate } = { ...args, ...props }
  const [saved, setSaved] = useState(s0)
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const [conds, setConds] = useState(['Hypertension', 'Coronary artery disease', 'Heart failure', 'Arrhythmia', 'High cholesterol'])
  const [c, setC] = useState('')

  return (
    <AppShell role="doctor" active="d-profile" onNavigate={onNavigate}>
      <div className="mx-auto max-w-5xl">
        <PageHeader title="My profile" subtitle="This is what patients see when they find you" actions={<><Button variant="secondary" icon={<Eye className="size-4" />} onClick={() => onNavigate?.('p-doctor-profile')}>Preview public profile</Button><Button onClick={() => setSaved(true)}>Save changes</Button></>} />
        {saved && <Alert tone="success" className="mb-6" title="Profile updated">Changes to your hospital or registration details are re-checked by an administrator.</Alert>}

        <div className="space-y-6">
          <Panel className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative w-fit">
                <img src={IMG.doctorM} alt="Dr. Kwame Adebayo" className="size-24 rounded-2xl object-cover" />
                <button aria-label="Change photo" className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border-2 border-white bg-primary text-white"><Camera className="size-4" /></button>
              </div>
              <div>
                <p className="flex items-center gap-2 text-lg font-semibold text-ink">Dr. Kwame Adebayo <Badge tone="green"><BadgeCheck className="size-3.5" /> Verified</Badge></p>
                <p className="text-sm text-muted">Registration MC-CA-A118842 · verified 17 Jun 2023</p>
              </div>
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ink">Professional information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Qualifications"><Input defaultValue="MBBS, MD (Cardiology), FACC" /></Field>
              <Field label="Specialization"><Select defaultValue="Cardiology"><option>Cardiology</option><option>Endocrinology</option><option>General Medicine</option></Select></Field>
              <Field label="Years of experience"><Input type="number" defaultValue={16} /></Field>
              <Field label="Associated hospital" hint="Changing this requires re-verification"><Select defaultValue="St. Mary's General Hospital"><option>St. Mary's General Hospital</option><option>Northgate Heart & Vascular Institute</option></Select></Field>
              <Field label="About" className="sm:col-span-2"><Textarea rows={3} defaultValue="Cardiologist focused on long-term management of hypertension and coronary artery disease, helping patients stay well at home between visits." /></Field>
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ink">Diseases and conditions treated</h2>
            <div className="mt-4 flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-line px-2 py-1.5">
              {conds.map((x) => <Badge key={x} tone="blue">{x}<button aria-label={`Remove ${x}`} onClick={() => setConds(conds.filter((y) => y !== x))}><X className="size-3" /></button></Badge>)}
              <input value={c} onChange={(e) => setC(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && c.trim()) { setConds([...conds, c.trim()]); setC('') } }} placeholder="Add condition and press Enter" className="min-w-40 flex-1 px-1 text-sm focus:outline-none" />
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-ink">Working days & hours</h2>
              <button onClick={() => onNavigate?.('d-availability')} className="text-sm font-medium text-primary">Detailed availability</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {DAYS.map((d) => {
                const on = days.includes(d)
                return <button key={d} aria-pressed={on} onClick={() => setDays(on ? days.filter((x) => x !== d) : [...days, d])} className={cn('h-10 w-14 rounded-lg border text-sm font-medium transition-colors duration-150', on ? 'border-primary bg-primary text-white' : 'border-line text-muted')}>{d}</button>
              })}
            </div>
            <div className="mt-4 grid max-w-md grid-cols-2 gap-4">
              <Field label="From"><Input type="time" defaultValue="09:00" /></Field>
              <Field label="To"><Input type="time" defaultValue="16:00" /></Field>
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ink">Contact details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Work email"><Input type="email" defaultValue="k.adebayo@stmarys.org" /></Field>
              <Field label="Clinic phone"><Input type="tel" defaultValue="+1 (555) 300-1244" /></Field>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  )
}
