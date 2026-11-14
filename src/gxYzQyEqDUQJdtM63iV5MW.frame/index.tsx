import React from 'react'
import { AppShell } from '../shared/AppShell'
import { ChatView } from '../shared/ChatView'

export const args = {}

export const argTypes = {}

type Props = { onNavigate?: (to: string) => void }

export default function PatientMessages({ onNavigate }: Props) {
  return (
    <AppShell role="patient" active="p-messages" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <h1 className="sr-only">Messages</h1>
        <ChatView role="patient" />
      </div>
    </AppShell>
  )
}
