import React, { useState } from 'react'
import { Pencil, Camera, Phone, Lock, Plus } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Avatar, Badge, Button, Field, Input, PageHeader, Panel, Select, Textarea } from '../shared/ui'
import { patient } from '../shared/data'

export const args = {
  editing: false,
}

export const argTypes = {
  editing: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PatientProfile(props: Props) {
  const { editing: e0, onNavigate } = { ...args, ...props }
  const [editing, setEditing] = useState(e0)
  const [saved, setSaved] = useState(false)

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]"><dt className="text-sm text-muted">{label}</dt><dd className="text-sm font-medium text-ink">{value}</dd></div>
  )

  return (
    <AppShell role="patient" active="p-profile" onNavigate={onNavigate}>
      <div className="mx-auto max-w-5xl">
        <PageHeader
          title="My profile"
          subtitle="Keep your details current so your care team can reach you"
          actions={editing ? <><Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button><Button onClick={() => { setEditing(false); setSaved(true) }}>Save changes</Button></> : <Button variant="secondary" icon={<Pencil className="size-4" />} onClick={() => { setEditing(true); setSaved(false) }}>Edit profile</Button>}
        />
        {saved && <Alert tone="success" className="mb-6" title="Profile updated" />}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Panel className="h-fit p-6 text-center">
            <div className="relative mx-auto w-fit">
              <Avatar initials="MT" size={96} />
              <button aria-label="Change photo" className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border-2 border-white bg-primary text-white"><Camera className="size-4" /></button>
            </div>
            <p className="mt-4 text-lg font-semibold text-ink">{patient.name}</p>
            <p className="text-sm text-muted">Patient ID {patient.id}</p>
            <div className="mt-4 grid grid-cols-3 border-t border-line pt-4 text-sm">
              <div><p className="font-semibold text-ink">{patient.age}</p><p className="text-xs text-muted">Age</p></div>
              <div><p className="font-semibold text-ink">{patient.blood}</p><p className="text-xs text-muted">Blood</p></div>
              <div><p className="font-semibold text-ink">{patient.weight}</p><p className="text-xs text-muted">Weight</p></div>
            </div>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted"><Lock className="size-3.5 text-success" /> Visible to you and your doctors only</p>
          </Panel>

          <div className="min-w-0 space-y-6">
            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">Personal details</h2>
              {editing ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name"><Input defaultValue={patient.name} /></Field>
                  <Field label="Date of birth"><Input type="date" defaultValue="1961-03-14" /></Field>
                  <Field label="Gender"><Select defaultValue={patient.gender}><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></Select></Field>
                </div>
              ) : (
                <dl className="mt-2 divide-y divide-line"><Row label="Full name" value={patient.name} /><Row label="Date of birth" value={patient.dob} /><Row label="Gender" value={patient.gender} /></dl>
              )}
            </Panel>

            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">Contact details</h2>
              {editing ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Email"><Input type="email" defaultValue={patient.email} /></Field>
                  <Field label="Phone"><Input type="tel" defaultValue={patient.phone} /></Field>
                  <Field label="Address" className="sm:col-span-2"><Textarea rows={2} className="min-h-0" defaultValue={patient.address} /></Field>
                </div>
              ) : (
                <dl className="mt-2 divide-y divide-line"><Row label="Email" value={patient.email} /><Row label="Phone" value={patient.phone} /><Row label="Address" value={patient.address} /></dl>
              )}
            </Panel>

            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">Medical profile</h2>
              <dl className="mt-2 divide-y divide-line">
                <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]"><dt className="text-sm text-muted">Conditions</dt><dd className="flex flex-wrap gap-1.5">{patient.conditions.map((c) => <Badge key={c}>{c}</Badge>)}</dd></div>
                <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]"><dt className="text-sm text-muted">Allergies</dt><dd className="flex flex-wrap gap-1.5">{patient.allergies.map((c) => <Badge key={c} tone="red">{c}</Badge>)}{editing && <button className="inline-flex items-center gap-1 text-xs font-medium text-primary"><Plus className="size-3" /> Add allergy</button>}</dd></div>
                <Row label="Height / weight" value={`${patient.height} · ${patient.weight}`} />
                <Row label="Blood type" value={patient.blood} />
              </dl>
              <p className="mt-3 text-xs text-muted">Diagnoses are added by your doctors. You can add allergies and measurements.</p>
            </Panel>

            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">Emergency contact</h2>
              {editing ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <Field label="Name"><Input defaultValue={patient.emergency.name} /></Field>
                  <Field label="Relationship"><Input defaultValue={patient.emergency.relation} /></Field>
                  <Field label="Phone"><Input type="tel" defaultValue={patient.emergency.phone} /></Field>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-4 rounded-lg bg-canvas p-4">
                  <Avatar initials="LT" size={44} />
                  <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{patient.emergency.name}</p><p className="text-sm text-muted">{patient.emergency.relation} · {patient.emergency.phone}</p></div>
                  <Button size="sm" variant="secondary" icon={<Phone className="size-4" />}>Call</Button>
                </div>
              )}
            </Panel>
            <p className="text-sm text-muted">Password and privacy options are in <button onClick={() => onNavigate?.('p-settings')} className="font-medium text-primary">Settings</button>.</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
