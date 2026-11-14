import React from 'react'
import { MapPin, Plus, Minus, Navigation } from 'lucide-react'
import { cn } from './ui'
import type { Hospital } from './data'

/** A deterministic QR-style code drawn from a reference string. It encodes the reference only, never medical data. */
export function QRCode({ value, size = 180 }: { value: string; size?: number }) {
  const n = 25
  let seed = 0
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7
    for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
      if (inBox(ox, oy)) {
        const dx = x - ox
        const dy = y - oy
        const ring = Math.min(dx, dy, 6 - dx, 6 - dy)
        return ring === 0 || ring >= 2 ? 1 : 0
      }
    }
    return -1
  }
  const cells: React.ReactNode[] = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y)
      const on = f === -1 ? rand() > 0.52 : f === 1
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />)
    }
  }
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} width={size} height={size} className="rounded-lg bg-white fill-ink" role="img" aria-label={`QR code for ${value}`}>
      {cells}
    </svg>
  )
}

/** Stylised street map of Riverside with hospital markers. */
export function MapView({ items, selected, onSelect, className, showControls = true }: { items: Hospital[]; selected?: string; onSelect?: (id: string) => void; className?: string; showControls?: boolean }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-line bg-[#eef2f6]', className)}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
        <path d="M0 78 C 20 70, 30 86, 52 80 S 85 72, 100 84 L100 100 L0 100 Z" fill="#cfe3f5" />
        <rect x="8" y="10" width="14" height="12" rx="1" fill="#dcebd9" />
        <rect x="56" y="44" width="10" height="9" rx="1" fill="#dcebd9" />
        <g stroke="#ffffff" strokeLinecap="round">
          <path d="M0 30 L100 26" strokeWidth="2.2" />
          <path d="M0 55 L100 50" strokeWidth="1.4" />
          <path d="M30 0 L36 100" strokeWidth="2.2" />
          <path d="M62 0 L58 100" strokeWidth="1.4" />
          <path d="M84 0 L90 100" strokeWidth="1.2" />
          <path d="M10 0 L14 100" strokeWidth="0.9" />
          <path d="M0 12 L100 8" strokeWidth="0.9" />
          <path d="M0 70 L60 64" strokeWidth="0.9" />
          <path d="M0 95 L100 40" strokeWidth="1.6" />
        </g>
      </svg>
      <div className="absolute left-[48%] top-[52%] -translate-x-1/2 -translate-y-1/2" aria-label="Your location">
        <span className="block size-4 rounded-full border-[3px] border-white bg-primary shadow" />
      </div>
      {items.map((h) => {
        const on = h.id === selected
        return (
          <button
            key={h.id}
            onClick={() => onSelect?.(h.id)}
            style={{ left: `${h.pos.x}%`, top: `${h.pos.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-full"
            aria-label={h.name}
          >
            <span
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-md transition-[background-color,color,transform] duration-150 ease-out group-hover:-translate-y-0.5',
                on ? 'bg-primary text-white' : 'bg-white text-ink',
              )}
            >
              <MapPin className={cn('size-3.5', on ? 'text-white' : h.er24 ? 'text-danger' : 'text-primary')} />
              <span className={cn(on ? 'inline' : 'hidden sm:inline')}>{h.name.split(' ').slice(0, 2).join(' ')}</span>
            </span>
            <span className={cn('mx-auto block h-2 w-0.5', on ? 'bg-primary' : 'bg-slate-400')} />
          </button>
        )
      })}
      {showControls && (
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          <button aria-label="Zoom in" className="p-2 text-muted hover:bg-canvas"><Plus className="size-4" /></button>
          <button aria-label="Zoom out" className="border-t border-line p-2 text-muted hover:bg-canvas"><Minus className="size-4" /></button>
          <button aria-label="My location" className="border-t border-line p-2 text-primary hover:bg-canvas"><Navigation className="size-4" /></button>
        </div>
      )}
    </div>
  )
}

/** Month grid for June 2025. `marks` maps a day to a dot colour. */
export function MonthCalendar({ selected, onSelect, marks = {}, disabled = [], compact = false, today = 16 }: { selected?: number; onSelect?: (d: number) => void; marks?: Record<number, 'blue' | 'green' | 'orange' | 'red'>; disabled?: number[]; compact?: boolean; today?: number }) {
  const days = 30
  const offset = 0 // 1 June 2025 is a Sunday; week starts Sunday
  const cells = Array.from({ length: 35 }, (_, i) => i - offset + 1)
  return (
    <div>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-2">{compact ? d[0] : d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d < 1 || d > days) return <div key={i} />
          const off = disabled.includes(d) || d < today
          const on = d === selected
          const mark = marks[d]
          return (
            <button
              key={i}
              disabled={off}
              onClick={() => onSelect?.(d)}
              className={cn(
                'relative flex flex-col items-center justify-center rounded-lg text-sm transition-colors duration-150',
                compact ? 'h-10' : 'h-12',
                on ? 'bg-primary font-semibold text-white' : off ? 'text-slate-300' : 'text-ink hover:bg-primary-soft',
                d === today && !on && 'font-semibold text-primary ring-1 ring-primary/40',
              )}
            >
              {d}
              {mark && (
                <span
                  className={cn(
                    'absolute bottom-1.5 size-1 rounded-full',
                    on ? 'bg-white' : mark === 'blue' ? 'bg-primary' : mark === 'green' ? 'bg-success' : mark === 'orange' ? 'bg-warning' : 'bg-danger',
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function BarChart({ data, height = 160, highlight }: { data: { label: string; value: number; secondary?: number }[]; height?: number; highlight?: string }) {
  const max = Math.max(...data.map((d) => d.value + (d.secondary ?? 0)), 1)
  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height }}>
      {data.map((d) => {
        const on = d.label === highlight
        return (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-xs font-semibold text-ink">{d.value + (d.secondary ?? 0)}</span>
            <div className="flex w-full max-w-10 flex-col-reverse overflow-hidden rounded-md" style={{ height: `${((d.value + (d.secondary ?? 0)) / max) * 100}%` }}>
              <div className={cn(on ? 'bg-primary' : 'bg-blue-300')} style={{ height: `${(d.value / (d.value + (d.secondary ?? 0))) * 100}%` }} />
              {d.secondary ? <div className="flex-1 bg-blue-100" /> : null}
            </div>
            <span className={cn('text-xs', on ? 'font-semibold text-ink' : 'text-muted')}>{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export function ProgressRing({ value, size = 96, stroke = 9, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#16a34a" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: 'stroke-dashoffset 300ms cubic-bezier(0.23,1,0.32,1)' }} />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-semibold text-ink">{value}%</p>
        {label && <p className="text-[11px] text-muted">{label}</p>}
      </div>
    </div>
  )
}
