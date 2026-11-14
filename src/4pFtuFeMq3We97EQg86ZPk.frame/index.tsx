import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Button, PageHeader, Panel, Segmented, cn } from '../shared/ui'
import { MonthCalendar } from '../shared/widgets'
import { doctorToday } from '../shared/data'

export const args = {
  view: 'week',
}

export const argTypes = {
  view: { control: 'radio', options: ['day', 'week', 'month'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const DAYS = [{ d: 'Mon', n: 16 }, { d: 'Tue', n: 17 }, { d: 'Wed', n: 18 }, { d: 'Thu', n: 19 }, { d: 'Fri', n: 20 }]
type Blk = { day: number; start: number; len: number; title: string; kind: 'booked' | 'pending' | 'blocked' | 'video' }
const BLOCKS: Blk[] = [
  { day: 16, start: 9, len: 0.5, title: 'Grace Okonkwo', kind: 'booked' },
  { day: 16, start: 9.5, len: 0.5, title: 'Michael Thompson', kind: 'booked' },
  { day: 16, start: 10.5, len: 0.5, title: 'Daniel Novak', kind: 'booked' },
  { day: 16, start: 11, len: 0.5, title: 'Sofia Martinez', kind: 'video' },
  { day: 16, start: 12, len: 1, title: 'Lunch', kind: 'blocked' },
  { day: 16, start: 14, len: 0.5, title: 'Henry Walsh', kind: 'pending' },
  { day: 16, start: 15.5, len: 0.5, title: 'Robert Hughes', kind: 'booked' },
  { day: 17, start: 9.5, len: 0.5, title: 'Michael Thompson', kind: 'booked' },
  { day: 17, start: 10.5, len: 0.5, title: 'Daniel Novak', kind: 'booked' },
  { day: 17, start: 12, len: 1, title: 'Lunch', kind: 'blocked' },
  { day: 17, start: 15.5, len: 0.5, title: 'Robert Hughes', kind: 'booked' },
  { day: 18, start: 8, len: 10, title: 'Cardiology conference', kind: 'blocked' },
  { day: 19, start: 10.5, len: 0.5, title: 'Olivia Bennett', kind: 'pending' },
  { day: 19, start: 11, len: 0.5, title: 'Fatima Al-Sayed', kind: 'booked' },
  { day: 19, start: 12, len: 1, title: 'Lunch', kind: 'blocked' },
  { day: 20, start: 9, len: 0.5, title: 'Thomas Reid', kind: 'pending' },
  { day: 20, start: 12, len: 1, title: 'Lunch', kind: 'blocked' },
]
const ROW = 56
const STYLE: Record<Blk['kind'], string> = {
  booked: 'border-l-primary bg-primary-soft text-primary-dark',
  video: 'border-l-primary bg-primary-soft text-primary-dark',
  pending: 'border-l-warning bg-warning-soft text-warning-ink',
  blocked: 'border-l-slate-400 bg-slate-100 text-muted',
}

export default function DoctorCalendar(props: Props) {
  const { view: v0, onNavigate } = { ...args, ...props }
  const [view, setView] = useState(v0)
  const [day, setDay] = useState(16)
  const cols = view === 'day' ? DAYS.filter((d) => d.n === day) : DAYS
  const fmt = (h: number) => `${((Math.floor(h) + 11) % 12) + 1}:${h % 1 ? '30' : '00'} ${h < 12 ? 'AM' : 'PM'}`

  return (
    <AppShell role="doctor" active="d-calendar" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="My calendar"
          subtitle="Week of 16 – 20 June 2025"
          actions={<><Segmented value={view} onChange={setView} items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} /><Button onClick={() => onNavigate?.('d-availability')}>Edit availability</Button></>}
        />
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted">
          <div className="flex gap-1">
            <button aria-label="Previous" className="rounded-md border border-line bg-white p-1.5 hover:bg-canvas"><ChevronLeft className="size-4" /></button>
            <button aria-label="Next" className="rounded-md border border-line bg-white p-1.5 hover:bg-canvas"><ChevronRight className="size-4" /></button>
          </div>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm bg-primary-soft ring-1 ring-primary" /> Booked</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm bg-warning-soft ring-1 ring-warning" /> Pending</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm bg-slate-100 ring-1 ring-slate-400" /> Blocked</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm border border-line bg-white" /> Available</span>
        </div>

        {view === 'month' ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <Panel className="p-5">
              <MonthCalendar selected={day} onSelect={setDay} today={1} marks={{ 16: 'blue', 17: 'blue', 18: 'red', 19: 'orange', 20: 'orange', 23: 'blue', 24: 'blue', 25: 'blue', 26: 'blue', 27: 'blue' }} disabled={[1, 7, 8, 14, 15, 21, 22, 28, 29]} />
            </Panel>
            <Panel className="p-5">
              <h2 className="font-semibold text-ink">{day} June</h2>
              <ul className="mt-3 space-y-2">
                {BLOCKS.filter((b) => b.day === day).map((b) => (
                  <li key={b.start} className={cn('rounded-md border-l-[3px] px-3 py-2 text-sm', STYLE[b.kind])}><span className="font-semibold">{fmt(b.start)}</span> · {b.title}</li>
                ))}
                {!BLOCKS.some((b) => b.day === day) && <p className="text-sm text-muted">No bookings. Available {day % 7 === 0 || day % 7 === 1 ? '— day off' : '09:00 AM – 04:00 PM'}.</p>}
              </ul>
            </Panel>
          </div>
        ) : (
          <Panel className="overflow-x-auto">
            <div className={cn('grid', view === 'day' ? 'min-w-[360px] grid-cols-[64px_1fr]' : 'min-w-[760px] grid-cols-[64px_repeat(5,1fr)]')}>
              <div className="border-b border-line" />
              {cols.map((c) => (
                <button key={c.n} onClick={() => { setDay(c.n); setView('day') }} className={cn('border-b border-l border-line py-3 text-center', c.n === 16 && 'bg-primary-soft')}>
                  <p className="text-xs text-muted">{c.d}</p>
                  <p className={cn('text-lg font-semibold', c.n === 16 ? 'text-primary' : 'text-ink')}>{c.n}</p>
                </button>
              ))}
              <div>
                {HOURS.map((h) => <div key={h} style={{ height: ROW }} className="border-b border-line pr-2 pt-1 text-right text-[11px] text-muted">{fmt(h).replace(':00', '')}</div>)}
              </div>
              {cols.map((c) => (
                <div key={c.n} className="relative border-l border-line">
                  {HOURS.map((h) => <div key={h} style={{ height: ROW }} className={cn('border-b border-line', h >= 16 && 'bg-canvas')} />)}
                  {BLOCKS.filter((b) => b.day === c.n).map((b) => (
                    <button
                      key={b.start}
                      onClick={() => b.kind !== 'blocked' && onNavigate?.('d-patient')}
                      style={{ top: (b.start - 8) * ROW + 2, height: Math.min(b.len, 10) * ROW - 4 }}
                      className={cn('absolute inset-x-1 overflow-hidden rounded-md border-l-[3px] px-2 py-1 text-left text-xs', STYLE[b.kind])}
                    >
                      <p className="truncate font-semibold">{b.title}</p>
                      {b.len >= 0.5 && <p className="flex items-center gap-1 truncate opacity-80"><Clock className="size-3" /> {fmt(b.start)}{b.kind === 'video' ? ' · Video' : ''}</p>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    </AppShell>
  )
}
