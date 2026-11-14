import React, { useState } from 'react'
import { Download, Check, X } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { BackLink, Badge, Button, PageHeader, Panel, Segmented, cn } from '../shared/ui'

export const args = {
  range: '14',
}

export const argTypes = {
  range: { control: 'radio', options: ['7', '14', '30'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const MEDS = ['Amlodipine 5 mg', 'Metformin 500 mg (AM)', 'Aspirin 75 mg', 'Metformin 500 mg (PM)', 'Atorvastatin 20 mg']
// t = taken, m = missed, l = taken late
const GRID: string[] = [
  'tttttttttttttt',
  'tttttttttttttt',
  'ttltttmtttlttt',
  'tttmtttttttttt',
  'tttttmtttttttt',
]
const LOG = [
  { date: 'Mon 16 Jun', time: '08:31 AM', med: 'Metformin 500 mg', status: 'Taken', note: 'On time' },
  { date: 'Mon 16 Jun', time: '08:02 AM', med: 'Amlodipine 5 mg', status: 'Taken', note: 'On time' },
  { date: 'Sun 15 Jun', time: '09:44 PM', med: 'Atorvastatin 20 mg', status: 'Taken', note: 'On time' },
  { date: 'Sun 15 Jun', time: '07:38 PM', med: 'Metformin 500 mg', status: 'Taken', note: 'On time' },
  { date: 'Sun 15 Jun', time: '01:52 PM', med: 'Aspirin 75 mg', status: 'Taken', note: '52 min late' },
  { date: 'Fri 13 Jun', time: '01:00 PM', med: 'Aspirin 75 mg', status: 'Missed', note: 'Marked missed at 4:10 PM' },
  { date: 'Thu 12 Jun', time: '09:30 PM', med: 'Atorvastatin 20 mg', status: 'Missed', note: 'No response to reminder' },
]

export default function MedicationHistory(props: Props) {
  const { range: r0, onNavigate } = { ...args, ...props }
  const [range, setRange] = useState(r0)
  const n = Number(range) > 14 ? 14 : Number(range)
  const cells = GRID.map((row) => row.slice(14 - n))
  const total = cells.join('').length
  const taken = cells.join('').replace(/m/g, '').length
  const missed = total - taken
  const late = (cells.join('').match(/l/g) ?? []).length

  return (
    <AppShell role="patient" active="p-meds" onNavigate={onNavigate}>
      <div className="mx-auto max-w-6xl">
        <BackLink label="My health routine" onClick={() => onNavigate?.('p-meds')} />
        <PageHeader title="Medication history" subtitle="Every dose you’ve marked, kept in sync with your prescriptions" actions={<><Segmented value={range} onChange={setRange} items={[{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]} /><Button variant="secondary" icon={<Download className="size-4" />}>Export</Button></>} />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Panel className="p-6">
            <p className="text-sm text-muted">Adherence</p>
            <p className="mt-1 text-5xl font-semibold tracking-tight text-ink">{Math.round((taken / total) * 100)}%</p>
            <p className="mt-1 text-sm text-success">+3% vs previous period</p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Doses taken</dt><dd className="font-semibold text-ink">{taken}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Taken late (30 min+)</dt><dd className="font-semibold text-warning-ink">{late}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Missed</dt><dd className="font-semibold text-danger">{missed}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Best streak</dt><dd className="font-semibold text-ink">6 days</dd></div>
            </dl>
          </Panel>

          <Panel className="min-w-0 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-ink">Dose by dose</h2>
              <div className="flex gap-3 text-xs text-muted">
                <span className="flex items-center gap-1"><span className="size-3 rounded-sm bg-success" /> Taken</span>
                <span className="flex items-center gap-1"><span className="size-3 rounded-sm bg-warning" /> Late</span>
                <span className="flex items-center gap-1"><span className="size-3 rounded-sm bg-danger" /> Missed</span>
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="w-44" />
                    {Array.from({ length: n }, (_, i) => 16 - n + 1 + i).map((d) => <th key={d} className="text-center text-[11px] font-medium text-muted">{d > 0 ? d : d + 31}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {MEDS.map((m, r) => (
                    <tr key={m}>
                      <td className="truncate pr-2 text-sm text-ink">{m}</td>
                      {cells[r].split('').map((c, i) => (
                        <td key={i}>
                          <span title={c === 't' ? 'Taken' : c === 'l' ? 'Taken late' : 'Missed'} className={cn('mx-auto block h-7 rounded', c === 't' ? 'bg-success' : c === 'l' ? 'bg-warning' : 'bg-danger')} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <Panel className="mt-6">
          <h2 className="px-5 pb-2 pt-4 text-[15px] font-semibold text-ink">Activity log</h2>
          <ul className="divide-y divide-line">
            {LOG.map((l, i) => (
              <li key={i} className="flex items-center gap-4 px-5 py-3">
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', l.status === 'Taken' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger')}>{l.status === 'Taken' ? <Check className="size-4" /> : <X className="size-4" />}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{l.med}</p>
                  <p className="text-xs text-muted">{l.date} · {l.time} · {l.note}</p>
                </div>
                <Badge tone={l.status === 'Taken' ? (l.note.includes('late') ? 'orange' : 'green') : 'red'}>{l.note.includes('late') ? 'Late' : l.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  )
}
