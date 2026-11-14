import React from 'react'
import { AppShell } from '../shared/AppShell'
import { ChatView } from '../shared/ChatView'

export const args = {}

export const argTypes = {}

type Props = { onNavigate?: (to: string) => void }

export default function DoctorMessages({ onNavigate }: Props) {
  return (
    <AppShell role="doctor" active="d-messages" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <h1 className="sr-only">Patient messages</h1>
        <ChatView role="doctor" />
      </div>
    </AppShell>
  )
}
