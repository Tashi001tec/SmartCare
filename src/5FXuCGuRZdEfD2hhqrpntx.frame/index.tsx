import React from 'react'
import { AppShell } from '../shared/AppShell'
import { SettingsView } from '../shared/SettingsView'

export const args = {}

export const argTypes = {}

type Props = { onNavigate?: (to: string) => void }

export default function PatientSettings({ onNavigate }: Props) {
  return (
    <AppShell role="patient" active="p-settings" onNavigate={onNavigate}>
      <SettingsView
        onNavigate={onNavigate}
        notifications={[
          { label: 'Medication reminders', desc: 'Alerts at each scheduled dose time.', on: true },
          { label: 'Appointment reminders', desc: '24 hours and 2 hours before each visit.', on: true },
          { label: 'Doctor messages', desc: 'When a doctor replies to you.', on: true },
          { label: 'Pharmacy order updates', desc: 'Accepted, rejected and ready for collection.', on: true },
          { label: 'Health tips', desc: 'Occasional general wellness articles.', on: false },
        ]}
        privacy={[
          { label: 'Share medication adherence with my doctors', desc: 'Doctors treating you can see which doses you’ve marked as taken or missed.', on: true },
          { label: 'Allow doctors to see my full prescription history', desc: 'Otherwise each doctor sees only prescriptions they issued.', on: false },
          { label: 'Use my chat history to personalise SmartCare AI', desc: 'Conversations stay private and are never shared with providers.', on: false },
          { label: 'Show my first name on public reviews', desc: 'Otherwise reviews appear as “Anonymous”.', on: true },
        ]}
      />
    </AppShell>
  )
}
