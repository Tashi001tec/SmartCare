import React from 'react'
import { AppShell } from '../shared/AppShell'
import { SettingsView } from '../shared/SettingsView'
import { Button, Field, Input, Panel } from '../shared/ui'

export const args = {}

export const argTypes = {}

type Props = { onNavigate?: (to: string) => void }

export default function DoctorSettings({ onNavigate }: Props) {
  return (
    <AppShell role="doctor" active="d-settings" onNavigate={onNavigate}>
      <SettingsView
        onNavigate={onNavigate}
        notifications={[
          { label: 'New appointment requests', desc: 'As soon as a patient requests a time.', on: true },
          { label: 'Patient messages', desc: 'New messages from patients under your care.', on: true },
          { label: 'Appointment changes', desc: 'Cancellations and reschedules.', on: true },
          { label: 'Pharmacy alternative requests', desc: 'When a pharmacy needs your approval for a substitute.', on: true },
          { label: 'Daily schedule summary', desc: 'Every morning at 7:00 AM.', on: false },
        ]}
        privacy={[
          { label: 'Show my profile in patient search', desc: 'Turn off to accept referrals only.', on: true },
          { label: 'Allow messages from new patients', desc: 'Otherwise only patients you’ve seen can message you.', on: false },
          { label: 'Show my rating publicly', desc: 'Based on verified visits only.', on: true },
        ]}
        extra={{
          id: 'registration',
          label: 'Registration & hospital',
          node: (
            <Panel className="p-5 sm:p-6">
              <h2 className="text-base font-semibold text-ink">Medical registration</h2>
              <p className="mt-1 text-sm text-muted">Changes are re-verified by an administrator before they take effect.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Registration number"><Input defaultValue="MC-CA-A118842" /></Field>
                <Field label="Licence expiry"><Input type="date" defaultValue="2027-03-31" /></Field>
                <Field label="Hospital association" className="sm:col-span-2"><Input defaultValue="St. Mary's General Hospital — Cardiology" /></Field>
              </div>
              <Button className="mt-5" variant="secondary">Submit for re-verification</Button>
            </Panel>
          ),
        }}
      />
    </AppShell>
  )
}
