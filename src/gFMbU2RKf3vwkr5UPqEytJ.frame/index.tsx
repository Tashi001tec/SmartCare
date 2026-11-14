import React from 'react'
import { AppShell } from '../shared/AppShell'
import { NotificationCenter } from '../shared/NotificationCenter'
import { doctorNotices } from '../shared/data'

export const args = {
  empty: false,
}

export const argTypes = {
  empty: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function DoctorNotifications(props: Props) {
  const { empty, onNavigate } = { ...args, ...props }
  return (
    <AppShell role="doctor" active="d-notifications" onNavigate={onNavigate}>
      <NotificationCenter key={String(empty)} items={doctorNotices} empty={empty} onNavigate={onNavigate} routes={{ appointment: 'd-appointments', message: 'd-messages', prescription: 'd-rx-history' }} />
    </AppShell>
  )
}
