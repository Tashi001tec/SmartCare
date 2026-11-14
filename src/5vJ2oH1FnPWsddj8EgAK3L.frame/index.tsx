import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Check, Clock, X, Lock, Smartphone, Mail, Volume2 } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Alert, Button, Input, PageHeader, Panel, Toggle, cn } from '../shared/ui'
import { todaysMeds } from '../shared/data'

export const args = {
  alert: true,
}

export const argTypes = {
  alert: { control: 'boolean' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const to24 = (t: string) => {
  const [hm, ap] = t.split(' ')
  let [h, m] = hm.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function MedicineReminder(props: Props) {
  const { alert, onNavigate } = { ...args, ...props }
  const [showAlert, setShowAlert] = useState(alert)
  const [result, setResult] = useState<string | null>(null)
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(todaysMeds.map((m) => [m.id, true])))
  const [channels, setChannels] = useState({ push: true, sms: true, email: false, sound: true })
  const [saved, setSaved] = useState(false)
  const due = todaysMeds.find((m) => m.status === 'due')!

  return (
    <AppShell role="patient" active="p-reminder" onNavigate={onNavigate}>
      <div className="mx-auto max-w-4xl">
        <AnimatePresence>
          {showAlert && (
            <motion.section
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              role="alertdialog"
              aria-label="Medicine reminder"
              className="mb-8 overflow-hidden rounded-2xl border border-warning bg-white shadow-lg"
            >
              <div className="flex items-center gap-2 bg-warning-soft px-5 py-2.5 text-sm font-medium text-warning-ink"><BellRing className="size-4" /> Reminder · 1:00 PM</div>
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-semibold text-ink">Time to take {due.name}</p>
                  <p className="mt-1 text-ink">{due.dose}</p>
                  <p className="mt-1 text-sm text-muted">{due.instructions}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:flex">
                  <Button size="lg" variant="success" icon={<Check className="size-5" />} onClick={() => { setShowAlert(false); setResult('Marked as taken at 1:02 PM. Your medication history is updated.') }}>Taken</Button>
                  <Button size="lg" variant="secondary" icon={<Clock className="size-5" />} onClick={() => { setShowAlert(false); setResult('Snoozed — we’ll remind you again at 1:15 PM.') }}>15 min</Button>
                  <Button size="lg" variant="secondary" icon={<X className="size-5" />} onClick={() => { setShowAlert(false); setResult('Marked as missed. Don’t take a double dose later — message your doctor if unsure.') }}>Skip</Button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        {result && <Alert tone={result.startsWith('Marked as missed') ? 'warning' : 'success'} className="mb-6" title={result} />}

        <PageHeader title="Medicine reminders" subtitle="Choose when and how you’re reminded. Doses themselves are set by your doctor." actions={<Button variant="secondary" onClick={() => onNavigate?.('p-meds')}>Today’s schedule</Button>} />

        <Panel>
          <ul className="divide-y divide-line">
            {todaysMeds.map((m) => (
              <li key={m.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{m.name} <span className="font-normal text-muted">· {m.dose}</span></p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted"><Lock className="size-3" /> {m.frequency} · {m.instructions}</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted">
                    Remind at
                    <Input type="time" aria-label={`Reminder time for ${m.name}`} defaultValue={to24(m.time)} disabled={!on[m.id]} className="h-10 w-32" />
                  </label>
                  <Toggle label={`Reminder for ${m.name}`} checked={on[m.id]} onChange={(v) => setOn({ ...on, [m.id]: v })} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="mt-6 p-5">
          <h2 className="text-[15px] font-semibold text-ink">How to remind me</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {([['push', Smartphone, 'App notification'], ['sms', Smartphone, 'Text message'], ['email', Mail, 'Email'], ['sound', Volume2, 'Play a sound']] as const).map(([k, Icon, l]) => (
              <label key={k} className={cn('flex items-center justify-between gap-3 rounded-lg border px-4 py-3', channels[k] ? 'border-primary/40' : 'border-line')}>
                <span className="flex items-center gap-2.5 text-sm text-ink"><Icon className="size-4 text-muted" /> {l}</span>
                <Toggle label={l} checked={channels[k]} onChange={(v) => setChannels({ ...channels, [k]: v })} />
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button onClick={() => setSaved(true)}>Save reminder settings</Button>
            {!showAlert && <Button variant="ghost" icon={<BellRing className="size-4" />} onClick={() => { setShowAlert(true); setResult(null) }}>Preview a reminder</Button>}
            {saved && <span className="text-sm font-medium text-success">Saved</span>}
          </div>
        </Panel>
      </div>
    </AppShell>
  )
}
