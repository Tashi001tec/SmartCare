import React from 'react'
import { AppShell } from '../shared/AppShell'
import { NotificationCenter } from '../shared/NotificationCenter'
import { patientNotices } from '../shared/data'

export const args = {
  empty: false,
}

export const argTypes = {
  empty: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function PatientNotifications(props: Props) {
  const { empty, onNavigate } = { ...args, ...props }
  return (
    <AppShell role="patient" active="p-notifications" onNavigate={onNavigate}>
      <NotificationCenter
        key={String(empty)}
        items={patientNotices}
        empty={empty}
        onNavigate={onNavigate}
        routes={{ medication: 'p-reminder', order: 'p-rx-detail', message: 'p-messages', appointment: 'p-appointments', prescription: 'p-rx-detail' }}
      />
    </AppShell>
  )
}
