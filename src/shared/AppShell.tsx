import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, Stethoscope, Building2, CalendarDays, FileText, BellRing, HeartPulse, MessageSquare, Sparkles, Siren,
  Bell, UserRound, Settings, LogOut, Users, CalendarRange, Clock, ClipboardList, QrCode, Package, ShoppingBag, History,
  Store, ShieldCheck, BadgeCheck, Activity, Hospital, Menu, X, Search, Lock,
} from 'lucide-react'
import { Avatar, Logo, cn } from './ui'
import { IMG } from './data'

export type Role = 'patient' | 'doctor' | 'pharmacy' | 'admin'
type Item = { key: string; label: string; icon: React.ElementType; badge?: number }

const NAV: Record<Role, Item[]> = {
  patient: [
    { key: 'p-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'p-doctors', label: 'Find Doctors', icon: Stethoscope },
    { key: 'p-hospitals', label: 'Find Hospitals', icon: Building2 },
    { key: 'p-appointments', label: 'Appointments', icon: CalendarDays },
    { key: 'p-prescriptions', label: 'My Prescriptions', icon: FileText },
    { key: 'p-reminder', label: 'Medicine Reminders', icon: BellRing },
    { key: 'p-meds', label: 'My Health Routine', icon: HeartPulse },
    { key: 'p-messages', label: 'Messages', icon: MessageSquare, badge: 2 },
    { key: 'p-ai', label: 'AI Assistant', icon: Sparkles },
    { key: 'p-emergency', label: 'Emergency Support', icon: Siren },
    { key: 'p-notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { key: 'p-profile', label: 'My Profile', icon: UserRound },
    { key: 'p-settings', label: 'Settings', icon: Settings },
  ],
  doctor: [
    { key: 'd-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'd-patients', label: 'My Patients', icon: Users },
    { key: 'd-appointments', label: 'Appointments', icon: CalendarDays, badge: 3 },
    { key: 'd-calendar', label: 'My Calendar', icon: CalendarRange },
    { key: 'd-availability', label: 'Availability', icon: Clock },
    { key: 'd-rx-history', label: 'Prescriptions', icon: FileText },
    { key: 'd-messages', label: 'Messages', icon: MessageSquare, badge: 4 },
    { key: 'd-profile', label: 'My Profile', icon: UserRound },
    { key: 'd-notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { key: 'd-settings', label: 'Settings', icon: Settings },
  ],
  pharmacy: [
    { key: 'ph-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'ph-requests', label: 'Prescription Requests', icon: ClipboardList, badge: 3 },
    { key: 'ph-scan', label: 'QR Verification', icon: QrCode },
    { key: 'ph-inventory', label: 'Medicine Inventory', icon: Package },
    { key: 'ph-orders', label: 'Orders', icon: ShoppingBag },
    { key: 'ph-history', label: 'Order History', icon: History },
    { key: 'ph-notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { key: 'ph-profile', label: 'Pharmacy Profile', icon: Store },
    { key: 'ph-settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { key: 'a-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'a-users', label: 'User Management', icon: Users },
    { key: 'a-doctors', label: 'Doctor Verification', icon: BadgeCheck, badge: 7 },
    { key: 'a-pharmacies', label: 'Pharmacy Verification', icon: ShieldCheck, badge: 3 },
    { key: 'a-hospitals', label: 'Hospital Management', icon: Hospital },
    { key: 'a-activity', label: 'System Activity', icon: Activity },
  ],
}

const BOTTOM: Record<Role, string[]> = {
  patient: ['p-dashboard', 'p-appointments', 'p-meds', 'p-messages'],
  doctor: ['d-dashboard', 'd-appointments', 'd-patients', 'd-messages'],
  pharmacy: ['ph-dashboard', 'ph-requests', 'ph-scan', 'ph-inventory'],
  admin: ['a-dashboard', 'a-doctors', 'a-pharmacies', 'a-users'],
}

const USER: Record<Role, { name: string; sub: string; photo?: string; initials: string }> = {
  patient: { name: 'Michael Thompson', sub: 'Patient · PT-204871', initials: 'MT' },
  doctor: { name: 'Dr. Kwame Adebayo', sub: 'Cardiologist', photo: IMG.doctorM, initials: 'KA' },
  pharmacy: { name: 'CityCare Pharmacy', sub: 'Verified pharmacy', initials: 'CC' },
  admin: { name: 'Hannah Lee', sub: 'Platform administrator', initials: 'HL' },
}

const ROLE_LABEL: Record<Role, string> = { patient: 'Patient', doctor: 'Doctor', pharmacy: 'Pharmacy', admin: 'Admin' }
const NOTIF_KEY: Record<Role, string> = { patient: 'p-notifications', doctor: 'd-notifications', pharmacy: 'ph-notifications', admin: 'a-activity' }

export function AppShell({ role, active, onNavigate, children, search = 'Search…' }: { role: Role; active: string; onNavigate?: (to: string) => void; children: React.ReactNode; search?: string }) {
  const [open, setOpen] = useState(false)
  const go = (k: string) => {
    setOpen(false)
    onNavigate?.(k)
  }
  const user = USER[role]
  const items = NAV[role]

  const nav = (
    <nav className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {items.map((it) => {
          const Icon = it.icon
          const on = it.key === active
          const sos = it.key === 'p-emergency'
          return (
            <button
              key={it.key}
              onClick={() => go(it.key)}
              aria-current={on ? 'page' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150',
                on ? 'bg-primary-soft text-primary' : sos ? 'text-danger hover:bg-danger-soft' : 'text-slate-600 hover:bg-canvas hover:text-ink',
              )}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={on ? 2.25 : 2} />
              <span className="flex-1 truncate">{it.label}</span>
              {it.badge ? <span className={cn('rounded-full px-1.5 text-xs font-semibold', on ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600')}>{it.badge}</span> : null}
            </button>
          )
        })}
      </div>
      <div className="border-t border-line p-3">
        <button onClick={() => go('login')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-canvas hover:text-ink">
          <LogOut className="size-[18px]" /> Logout
        </button>
      </div>
    </nav>
  )

  return (
    <div className="flex h-screen bg-canvas text-ink">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <Logo />
          <span className="ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-muted">{ROLE_LABEL[role]}</span>
        </div>
        {nav}
      </aside>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div className="absolute inset-0 bg-slate-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <Logo />
                <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-md p-1.5 text-muted hover:bg-canvas">
                  <X className="size-5" />
                </button>
              </div>
              {nav}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-white px-4 sm:px-6">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-md p-1.5 text-muted hover:bg-canvas lg:hidden">
            <Menu className="size-5" />
          </button>
          <span className="lg:hidden">
            <Logo />
          </span>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input placeholder={search} className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none" />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 text-xs text-muted xl:flex">
              <Lock className="size-3.5 text-success" /> Secure session
            </span>
            {role === 'patient' && (
              <button onClick={() => go('p-emergency')} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-danger px-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-700">
                <Siren className="size-4" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
            )}
            <button onClick={() => go(NOTIF_KEY[role])} aria-label="Notifications" className="relative rounded-lg p-2 text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink">
              <Bell className="size-5" />
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-semibold text-white">3</span>
            </button>
            <div className="flex items-center gap-2.5 pl-1">
              <Avatar src={user.photo} initials={user.initials} name={user.name} size={36} />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-ink">{user.name}</p>
                <p className="text-xs text-muted">{user.sub}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white md:hidden">
          {BOTTOM[role].map((k) => {
            const it = items.find((i) => i.key === k)!
            const Icon = it.icon
            const on = k === active
            return (
              <button key={k} onClick={() => go(k)} className={cn('flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium', on ? 'text-primary' : 'text-muted')}>
                <Icon className="size-5" />
                <span className="max-w-full truncate px-1">{it.label.replace('My ', '').replace('Prescription ', '').replace('Medicine ', '')}</span>
              </button>
            )
          })}
          <button onClick={() => setOpen(true)} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-muted">
            <Menu className="size-5" />
            More
          </button>
        </nav>
      </div>
    </div>
  )
}
