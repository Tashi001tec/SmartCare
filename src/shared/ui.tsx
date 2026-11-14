import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { HeartPulse, Lock, X, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

export const cn = (...c: (string | false | null | undefined)[]) => twMerge(c.filter(Boolean).join(' '))

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}>
      <span className={cn('grid size-8 place-items-center rounded-lg', light ? 'bg-white text-primary' : 'bg-primary text-white')}>
        <HeartPulse className="size-[18px]" strokeWidth={2.25} />
      </span>
      <span className={cn('text-lg', light ? 'text-white' : 'text-ink')}>
        Smart<span className={light ? 'text-blue-200' : 'text-primary'}>Care</span>
      </span>
    </span>
  )
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'soft' | 'success'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, className, children, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'h-8 px-3 text-sm',
        size === 'md' && 'h-10 px-4 text-sm',
        size === 'lg' && 'h-12 px-6 text-base',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark',
        variant === 'secondary' && 'border border-line bg-white text-ink hover:border-slate-300 hover:bg-canvas',
        variant === 'ghost' && 'text-muted hover:bg-canvas hover:text-ink',
        variant === 'danger' && 'bg-danger text-white hover:bg-red-700',
        variant === 'soft' && 'bg-primary-soft text-primary hover:bg-blue-100',
        variant === 'success' && 'bg-success text-white hover:bg-green-700',
        className,
      )}
    >
      {icon}
      {children}
    </button>
  )
}

export type Tone = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'navy'
export function Badge({ tone = 'gray', children, className, dot }: { tone?: Tone; children: React.ReactNode; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium',
        tone === 'blue' && 'bg-primary-soft text-primary',
        tone === 'green' && 'bg-success-soft text-success',
        tone === 'orange' && 'bg-warning-soft text-warning-ink',
        tone === 'red' && 'bg-danger-soft text-danger',
        tone === 'gray' && 'bg-slate-100 text-muted',
        tone === 'navy' && 'bg-primary-dark text-white',
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

const STATUS_TONE: Record<string, Tone> = {
  Pending: 'orange',
  'Under Review': 'blue',
  Confirmed: 'blue',
  Accepted: 'blue',
  Active: 'green',
  Completed: 'green',
  'Ready for Collection': 'green',
  Verified: 'green',
  Stable: 'green',
  Taken: 'green',
  Cancelled: 'red',
  Rejected: 'red',
  Missed: 'red',
  Suspended: 'red',
  Expired: 'gray',
  Draft: 'gray',
  Monitoring: 'orange',
  New: 'blue',
  'In stock': 'green',
  'Low stock': 'orange',
  'Out of stock': 'red',
  'Pending review': 'orange',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge tone={STATUS_TONE[status] ?? 'gray'} dot className={className}>
      {status}
    </Badge>
  )
}

export function Panel({ className, children, as: As = 'section' }: { className?: string; children: React.ReactNode; as?: 'section' | 'div' | 'article' }) {
  return <As className={cn('rounded-xl border border-line bg-white', className)}>{children}</As>
}

export function PanelHeader({ title, action, sub }: { title: string; action?: React.ReactNode; sub?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
      <div className="min-w-0">
        <h2 className="truncate text-[15px] font-semibold text-ink">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function PageHeader({ title, subtitle, actions, back }: { title: string; subtitle?: React.ReactNode; actions?: React.ReactNode; back?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back}
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function BackLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors duration-150 hover:text-primary">
      <span aria-hidden>←</span> {label}
    </button>
  )
}

export function Field({ label, hint, error, children, className, required }: { label: string; hint?: string; error?: string; children: React.ReactNode; className?: string; required?: boolean }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-danger"> *</span>}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  )
}

const fieldBase =
  'w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-150 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 disabled:bg-canvas disabled:text-muted'

export function Input({ invalid, className, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input {...rest} className={cn(fieldBase, 'h-11', invalid ? 'border-danger' : 'border-line', className)} />
}

export function Select({ invalid, className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select {...rest} className={cn(fieldBase, 'h-11 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272%27%3E%3Cpath d=%27m4 6 4 4 4-4%27/%3E%3C/svg%3E")] bg-[right_0.75rem_center] bg-no-repeat pr-9', invalid ? 'border-danger' : 'border-line', className)}>
      {children}
    </select>
  )
}

export function Textarea({ className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...rest} className={cn(fieldBase, 'min-h-24 border-line py-2.5', className)} />
}

export function Avatar({ name, initials, src, size = 40, className }: { name?: string; initials?: string; src?: string; size?: number; className?: string }) {
  const text = initials ?? (name ? name.replace('Dr. ', '').split(' ').map((p) => p[0]).slice(0, 2).join('') : '?')
  return src ? (
    <img src={src} alt={name ?? ''} style={{ width: size, height: size }} className={cn('shrink-0 rounded-full object-cover', className)} />
  ) : (
    <span style={{ width: size, height: size, fontSize: size * 0.36 }} className={cn('grid shrink-0 place-items-center rounded-full bg-primary-soft font-semibold text-primary', className)}>
      {text}
    </span>
  )
}

export function EmptyState({ icon, title, body, action }: { icon: React.ReactNode; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid size-12 place-items-center rounded-full bg-primary-soft text-primary">{icon}</div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Alert({ tone = 'info', title, children, className }: { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: string; children?: React.ReactNode; className?: string }) {
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'warning' ? AlertTriangle : tone === 'danger' ? XCircle : Info
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-lg border px-4 py-3 text-sm',
        tone === 'info' && 'border-blue-200 bg-primary-soft text-primary-dark',
        tone === 'success' && 'border-green-200 bg-success-soft text-green-800',
        tone === 'warning' && 'border-amber-200 bg-warning-soft text-amber-900',
        tone === 'danger' && 'border-red-200 bg-danger-soft text-red-800',
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-0.5' : ''}>{children}</div>}
      </div>
    </div>
  )
}

export function SecureNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-start gap-2 text-xs text-muted', className)}>
      <Lock className="mt-px size-3.5 shrink-0 text-success" />
      <span>{children}</span>
    </p>
  )
}

export function Modal({ open, onClose, title, children, footer, size = 'md' }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-slate-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              'relative max-h-[90%] w-full overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl',
              size === 'sm' && 'sm:max-w-md',
              size === 'md' && 'sm:max-w-lg',
              size === 'lg' && 'sm:max-w-2xl',
            )}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="text-base font-semibold text-ink">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-md p-1 text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink">
                <X className="size-5" />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && <div className="flex flex-col-reverse gap-2 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function Tabs({ items, value, onChange, className }: { items: { value: string; label: string; count?: number }[]; value: string; onChange: (v: any) => void; className?: string }) {
  return (
    <div role="tablist" className={cn('flex gap-1 overflow-x-auto border-b border-line', className)}>
      {items.map((it) => {
        const active = it.value === value
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={cn(
              '-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150',
              active ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {it.label}
            {it.count !== undefined && (
              <span className={cn('rounded-full px-1.5 text-xs', active ? 'bg-primary-soft text-primary' : 'bg-slate-100 text-muted')}>{it.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function Segmented({ items, value, onChange }: { items: { value: string; label: string }[]; value: string; onChange: (v: any) => void }) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={cn(
            'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150',
            it.value === value ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink',
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150', checked ? 'bg-primary' : 'bg-slate-300')}
    >
      <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-150 ease-out', checked ? 'translate-x-5' : 'translate-x-0.5')} />
    </button>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-slate-200/70', className)} />
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <svg viewBox="0 0 20 20" className="size-4 fill-warning" aria-hidden>
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>
  )
}
