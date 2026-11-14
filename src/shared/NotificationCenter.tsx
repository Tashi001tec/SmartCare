import React, { useState } from 'react'
import { CalendarCheck, MessageSquare, FileText, Pill, ShoppingBag, AlertTriangle, Bell, CheckCheck, BellOff } from 'lucide-react'
import { Button, EmptyState, PageHeader, Panel, Tabs, cn } from './ui'
import type { Notice } from './data'

const ICON: Record<Notice['kind'], React.ElementType> = {
  appointment: CalendarCheck,
  message: MessageSquare,
  prescription: FileText,
  medication: Pill,
  order: ShoppingBag,
  alert: AlertTriangle,
  system: Bell,
}

const TINT: Record<Notice['kind'], string> = {
  appointment: 'bg-primary-soft text-primary',
  message: 'bg-primary-soft text-primary',
  prescription: 'bg-success-soft text-success',
  medication: 'bg-warning-soft text-warning-ink',
  order: 'bg-success-soft text-success',
  alert: 'bg-danger-soft text-danger',
  system: 'bg-slate-100 text-muted',
}

/** Where each kind of notice leads, per role. */
export function NotificationCenter({ items, empty = false, routes = {}, onNavigate }: { items: Notice[]; empty?: boolean; routes?: Partial<Record<Notice['kind'], string>>; onNavigate?: (to: string) => void }) {
  const [list, setList] = useState(empty ? [] : items)
  const [tab, setTab] = useState<'all' | 'unread'>('all')
  const unread = list.filter((n) => n.unread).length
  const shown = tab === 'unread' ? list.filter((n) => n.unread) : list
  const groups = (['Today', 'Yesterday', 'Earlier'] as const).map((g) => ({ g, items: shown.filter((n) => n.group === g) })).filter((x) => x.items.length)

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Notifications"
        subtitle={unread ? `You have ${unread} unread notification${unread > 1 ? 's' : ''}` : 'You’re all caught up'}
        actions={
          <Button variant="secondary" size="sm" icon={<CheckCheck className="size-4" />} disabled={!unread} onClick={() => setList((l) => l.map((n) => ({ ...n, unread: false })))}>
            Mark all as read
          </Button>
        }
      />
      <Panel>
        <Tabs className="px-4" value={tab} onChange={setTab} items={[{ value: 'all', label: 'All', count: list.length }, { value: 'unread', label: 'Unread', count: unread }]} />
        {groups.length === 0 ? (
          <EmptyState icon={<BellOff className="size-5" />} title={tab === 'unread' ? 'No unread notifications' : 'No notifications yet'} body="Appointment updates, messages, prescriptions and reminders will appear here." />
        ) : (
          groups.map(({ g, items: gi }) => (
            <div key={g}>
              <h3 className="bg-canvas px-5 py-2 text-xs font-semibold text-muted">{g}</h3>
              <ul className="divide-y divide-line">
                {gi.map((n) => {
                  const Icon = ICON[n.kind]
                  return (
                    <li key={n.id}>
                      <button
                        onClick={() => {
                          setList((l) => l.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                          const to = routes[n.kind]
                          if (to) onNavigate?.(to)
                        }}
                        className={cn('flex w-full gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-canvas', n.unread && 'bg-primary-soft/40')}
                      >
                        <span className={cn('grid size-10 shrink-0 place-items-center rounded-full', TINT[n.kind])}>
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-3">
                            <span className={cn('text-sm text-ink', n.unread ? 'font-semibold' : 'font-medium')}>{n.title}</span>
                            <span className="shrink-0 text-xs text-muted">{n.time}</span>
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">{n.body}</span>
                        </span>
                        {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))
        )}
      </Panel>
    </div>
  )
}
